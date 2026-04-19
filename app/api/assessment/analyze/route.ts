import {
  ASSESSMENT_REPORT_SCHEMA,
  SERVICE_PLANS,
  type AssessmentAnswers,
  type AssessmentContact,
  type AssessmentReport,
} from "@/lib/assessment"

const OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions"

type AssessmentRequestBody = {
  answers?: AssessmentAnswers
  contact?: AssessmentContact
}

export async function POST(request: Request) {
  let body: AssessmentRequestBody

  try {
    body = (await request.json()) as AssessmentRequestBody
  } catch {
    return Response.json(
      { ok: false, error: "Invalid assessment request." },
      { status: 400 },
    )
  }

  const answers = normalizeAnswers(body.answers)
  if (!answers) {
    return Response.json(
      { ok: false, error: "Assessment answers are incomplete." },
      { status: 400 },
    )
  }

  const contact = body.contact ? normalizeContact(body.contact) : undefined
  if (body.contact && !contact) {
    return Response.json(
      { ok: false, error: "Contact details are incomplete." },
      { status: 400 },
    )
  }

  if (!process.env.OPENROUTER_API_KEY) {
    return Response.json(
      {
        ok: false,
        error:
          "The assessment AI is not configured yet. Add OPENROUTER_API_KEY to enable workflow analysis.",
      },
      { status: 503 },
    )
  }

  try {
    const report = await analyzeWithOpenRouter(answers)
    const leadDelivered = contact
      ? await deliverLead({ answers, contact, report, request })
      : false

    return Response.json({
      ok: true,
      preview: report.preview,
      ...(contact ? { report, leadDelivered } : {}),
    })
  } catch (error) {
    console.error("Assessment analysis failed", error)
    return Response.json(
      {
        ok: false,
        error:
          "The assessment could not be completed. Please try again, or use the fit-check email on the main page.",
      },
      { status: 502 },
    )
  }
}

async function analyzeWithOpenRouter(
  answers: AssessmentAnswers,
): Promise<AssessmentReport> {
  const model = process.env.OPENROUTER_MODEL || "openai/gpt-5.2"
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.VERCEL_PROJECT_PRODUCTION_URL ||
    "https://openclaw.dev"

  const response = await fetch(OPENROUTER_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
      "Content-Type": "application/json",
      "HTTP-Referer": siteUrl.startsWith("http") ? siteUrl : `https://${siteUrl}`,
      "X-OpenRouter-Title": "OpenClaw Workflow Assessment",
    },
    body: JSON.stringify({
      model,
      temperature: 0.25,
      max_tokens: 2600,
      provider: {
        require_parameters: true,
      },
      response_format: {
        type: "json_schema",
        json_schema: {
          name: "openclaw_workflow_assessment",
          strict: true,
          schema: ASSESSMENT_REPORT_SCHEMA,
        },
      },
      messages: [
        {
          role: "system",
          content: [
            "You are the senior workflow assessment strategist for OpenClaw Services.",
            "You sell consultatively: be direct, commercially sharp, and useful, without hype or false urgency.",
            "Recommend the smallest credible next step that moves the buyer toward a paid engagement when the case is strong.",
            "Do not guarantee savings, revenue, uptime, compliance, or model accuracy.",
            "Use only the provided OpenClaw plans. Make the plan recommendation easy for a business owner to accept.",
            "For setup, choose Local, VPS, or Hybrid based on uptime, remote access, privacy, tool connections, and scheduled work.",
            "Keep every field concise and specific to the submitted workflow.",
          ].join(" "),
        },
        {
          role: "user",
          content: JSON.stringify(
            {
              task: "Assess this client's workflow and return the required JSON report.",
              openClawPlans: SERVICE_PLANS,
              scoringRules: {
                fitScore:
                  "0-100 based on repetition, volume, clarity, tool access, value, and approval safety.",
                automationFit:
                  "High when the workflow has repeatable inputs, repeatable decisions, and clear outputs.",
                savingsPotential:
                  "High when volume, minutes per item, and labor value are meaningful.",
                implementationClarity:
                  "High when the workflow can be scoped into one first assistant.",
                riskReadiness:
                  "High when sensitive actions can be draft-only or approval-gated.",
                setupReadiness:
                  "High when the client has clear uptime, access, and privacy requirements.",
              },
              planRules: [
                "Free Fit Check for weak, vague, or exploratory cases.",
                "Workflow Blueprint for promising cases that need mapping before a build.",
                "Starter Agent for one simple workflow with clear inputs and modest risk.",
                "Business Agent for important workflows with sensitive approvals or broader testing needs.",
                "Agency Agent Team for multiple workflows, multi-agent teams, or agency operations.",
                "Add Monthly Care, Improve Plan, or Partner Plan only when ongoing monitoring or expansion is justified.",
              ],
              answers,
            },
            null,
            2,
          ),
        },
      ],
    }),
  })

  if (!response.ok) {
    const detail = await response.text()
    throw new Error(`OpenRouter ${response.status}: ${detail.slice(0, 500)}`)
  }

  const data = (await response.json()) as {
    choices?: Array<{ message?: { content?: unknown } }>
  }
  const content = extractContent(data.choices?.[0]?.message?.content)
  const parsed = JSON.parse(content) as AssessmentReport
  return normalizeReport(parsed)
}

function extractContent(content: unknown) {
  if (typeof content === "string") return content
  if (Array.isArray(content)) {
    return content
      .map((part) => {
        if (
          part &&
          typeof part === "object" &&
          "text" in part &&
          typeof part.text === "string"
        ) {
          return part.text
        }
        return ""
      })
      .join("")
  }
  throw new Error("OpenRouter response did not include text content.")
}

async function deliverLead({
  answers,
  contact,
  report,
  request,
}: {
  answers: AssessmentAnswers
  contact: AssessmentContact
  report: AssessmentReport
  request: Request
}) {
  const webhookUrl = process.env.ASSESSMENT_WEBHOOK_URL
  if (!webhookUrl) return false

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        source: "openclaw-workflow-assessment",
        createdAt: new Date().toISOString(),
        pageUrl: request.headers.get("referer") || null,
        contact,
        answers,
        report,
      }),
    })
    return response.ok
  } catch (error) {
    console.error("Assessment webhook failed", error)
    return false
  }
}

function normalizeAnswers(value: unknown): AssessmentAnswers | null {
  if (!value || typeof value !== "object") return null
  const candidate = value as Partial<AssessmentAnswers>

  const answers: AssessmentAnswers = {
    industry: cleanString(candidate.industry),
    teamSize: cleanString(candidate.teamSize),
    workflowOwner: cleanString(candidate.workflowOwner),
    urgency: cleanString(candidate.urgency),
    workflowName: cleanString(candidate.workflowName),
    workflowDescription: cleanString(candidate.workflowDescription),
    currentTools: cleanArray(candidate.currentTools),
    otherTools: cleanString(candidate.otherTools),
    monthlyVolume: cleanNumber(candidate.monthlyVolume),
    minutesPerItem: cleanNumber(candidate.minutesPerItem),
    peopleInvolved: cleanNumber(candidate.peopleInvolved),
    hourlyCost: cleanNumber(candidate.hourlyCost),
    errorRate: cleanString(candidate.errorRate),
    delayPain: cleanString(candidate.delayPain),
    sensitivity: cleanString(candidate.sensitivity),
    approvalNeed: cleanString(candidate.approvalNeed),
    actionRisks: cleanArray(candidate.actionRisks),
    uptimeNeed: cleanString(candidate.uptimeNeed),
    privacyConcern: cleanString(candidate.privacyConcern),
    remoteTeam: cleanString(candidate.remoteTeam),
    budgetComfort: cleanString(candidate.budgetComfort),
  }

  if (
    answers.industry.length < 2 ||
    answers.workflowName.length < 2 ||
    answers.workflowDescription.length < 20 ||
    answers.currentTools.length === 0 ||
    answers.monthlyVolume <= 0 ||
    answers.minutesPerItem <= 0 ||
    answers.peopleInvolved <= 0 ||
    answers.hourlyCost <= 0
  ) {
    return null
  }

  return answers
}

function normalizeContact(value: unknown): AssessmentContact | null {
  if (!value || typeof value !== "object") return null
  const candidate = value as Partial<AssessmentContact>
  const contact: AssessmentContact = {
    name: cleanString(candidate.name),
    email: cleanString(candidate.email),
    company: cleanString(candidate.company),
    phone: cleanString(candidate.phone),
    preferredNextStep: cleanString(candidate.preferredNextStep),
  }

  if (
    contact.name.length < 2 ||
    contact.company.length < 2 ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact.email)
  ) {
    return null
  }

  return contact
}

function normalizeReport(report: AssessmentReport): AssessmentReport {
  return {
    ...report,
    preview: {
      ...report.preview,
      fitScore: clamp(report.preview.fitScore),
    },
    scoreBreakdown: {
      automationFit: clamp(report.scoreBreakdown.automationFit),
      savingsPotential: clamp(report.scoreBreakdown.savingsPotential),
      implementationClarity: clamp(report.scoreBreakdown.implementationClarity),
      riskReadiness: clamp(report.scoreBreakdown.riskReadiness),
      setupReadiness: clamp(report.scoreBreakdown.setupReadiness),
    },
    estimates: {
      ...report.estimates,
      hoursSavedPerMonth: Math.max(0, Number(report.estimates.hoursSavedPerMonth) || 0),
      monthlyLaborValue: Math.max(0, Number(report.estimates.monthlyLaborValue) || 0),
    },
    tools: {
      requiredNow: normalizeList(report.tools.requiredNow),
      usefulLater: normalizeList(report.tools.usefulLater),
      avoidForV1: normalizeList(report.tools.avoidForV1),
    },
    remarks: normalizeList(report.remarks),
    recommendations: normalizeList(report.recommendations),
    objections: Array.isArray(report.objections)
      ? report.objections
          .filter((item) => item.concern && item.response)
          .slice(0, 4)
      : [],
  }
}

function cleanString(value: unknown) {
  return typeof value === "string" ? value.trim().slice(0, 4000) : ""
}

function cleanNumber(value: unknown) {
  const number = Number(value)
  return Number.isFinite(number) ? Math.max(0, number) : 0
}

function cleanArray(value: unknown) {
  if (!Array.isArray(value)) return []
  return value
    .filter((item): item is string => typeof item === "string")
    .map((item) => item.trim())
    .filter(Boolean)
    .slice(0, 24)
}

function normalizeList(value: unknown) {
  return cleanArray(value).slice(0, 8)
}

function clamp(value: unknown) {
  const number = Number(value)
  if (!Number.isFinite(number)) return 0
  return Math.max(0, Math.min(100, number))
}
