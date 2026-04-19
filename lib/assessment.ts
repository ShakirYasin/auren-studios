export type AssessmentAnswers = {
  industry: string
  teamSize: string
  workflowOwner: string
  urgency: string
  workflowName: string
  workflowDescription: string
  currentTools: string[]
  otherTools: string
  monthlyVolume: number
  minutesPerItem: number
  peopleInvolved: number
  hourlyCost: number
  errorRate: string
  delayPain: string
  sensitivity: string
  approvalNeed: string
  actionRisks: string[]
  uptimeNeed: string
  privacyConcern: string
  remoteTeam: string
  budgetComfort: string
}

export type AssessmentContact = {
  name: string
  email: string
  company: string
  phone?: string
  preferredNextStep: string
}

export type AssessmentPreview = {
  fitScore: number
  fitBand: string
  headline: string
  savingsRange: string
  strongestRecommendation: string
  setupTeaser: string
  planTeaser: string
}

export type AssessmentReport = {
  preview: AssessmentPreview
  executiveSummary: string
  scoreBreakdown: {
    automationFit: number
    savingsPotential: number
    implementationClarity: number
    riskReadiness: number
    setupReadiness: number
  }
  estimates: {
    hoursSavedPerMonth: number
    monthlyLaborValue: number
    acceleration: string
    paybackWindow: string
    confidence: string
  }
  plan: {
    recommendedPlan: string
    reason: string
    nextStep: string
    upsellPath: string
  }
  setup: {
    recommendation: "Local" | "VPS" | "Hybrid"
    reason: string
    localCase: string
    vpsCase: string
  }
  tools: {
    requiredNow: string[]
    usefulLater: string[]
    avoidForV1: string[]
  }
  remarks: string[]
  recommendations: string[]
  objections: {
    concern: string
    response: string
  }[]
  cta: {
    label: string
    emailSubject: string
    emailBody: string
  }
}

export type AssessmentApiResponse =
  | {
      ok: true
      preview: AssessmentPreview
      report?: AssessmentReport
      leadDelivered?: boolean
    }
  | {
      ok: false
      error: string
    }

export const SERVICE_PLANS = [
  {
    name: "Free Fit Check",
    price: "$0",
    fit: "Quick yes/no assessment before spending money.",
  },
  {
    name: "Workflow Blueprint",
    price: "$299",
    fit: "Best when the workflow is promising but scope, approvals, and tool access need a build plan.",
  },
  {
    name: "Starter Agent",
    price: "$1,499",
    fit: "Best for one narrow workflow with simple approvals and clear inputs.",
  },
  {
    name: "Business Agent",
    price: "$3,499",
    fit: "Best when mistakes are costly, approvals matter, and the workflow touches important business systems.",
  },
  {
    name: "Agency Agent Team",
    price: "$6,499",
    fit: "Best for multiple workflows, multi-agent operations, or teams spanning delivery, research, content, SEO, support, and operations.",
  },
  {
    name: "Monthly Care",
    price: "$499/mo",
    fit: "Best after launch for stable monitoring and small fixes.",
  },
  {
    name: "Improve Plan",
    price: "$999/mo",
    fit: "Best when one improvement or tuning cycle per month will keep the agent useful.",
  },
  {
    name: "Partner Plan",
    price: "$1,999/mo",
    fit: "Best for priority support and up to two improvements monthly.",
  },
] as const

export const COMMON_TOOLS = [
  "Gmail",
  "Outlook",
  "Slack",
  "Microsoft Teams",
  "Google Sheets",
  "Airtable",
  "Notion",
  "HubSpot",
  "Pipedrive",
  "Stripe",
  "QuickBooks",
  "Google Calendar",
  "Trello",
  "Asana",
  "Zendesk",
] as const

export const ACTION_RISKS = [
  "Sending customer messages",
  "Changing CRM records",
  "Moving money or invoices",
  "Deleting or archiving data",
  "Exporting private data",
  "Scheduling meetings",
] as const

export const ASSESSMENT_REPORT_SCHEMA = {
  type: "object",
  additionalProperties: false,
  required: [
    "preview",
    "executiveSummary",
    "scoreBreakdown",
    "estimates",
    "plan",
    "setup",
    "tools",
    "remarks",
    "recommendations",
    "objections",
    "cta",
  ],
  properties: {
    preview: {
      type: "object",
      additionalProperties: false,
      required: [
        "fitScore",
        "fitBand",
        "headline",
        "savingsRange",
        "strongestRecommendation",
        "setupTeaser",
        "planTeaser",
      ],
      properties: {
        fitScore: { type: "number" },
        fitBand: { type: "string" },
        headline: { type: "string" },
        savingsRange: { type: "string" },
        strongestRecommendation: { type: "string" },
        setupTeaser: { type: "string" },
        planTeaser: { type: "string" },
      },
    },
    executiveSummary: { type: "string" },
    scoreBreakdown: {
      type: "object",
      additionalProperties: false,
      required: [
        "automationFit",
        "savingsPotential",
        "implementationClarity",
        "riskReadiness",
        "setupReadiness",
      ],
      properties: {
        automationFit: { type: "number" },
        savingsPotential: { type: "number" },
        implementationClarity: { type: "number" },
        riskReadiness: { type: "number" },
        setupReadiness: { type: "number" },
      },
    },
    estimates: {
      type: "object",
      additionalProperties: false,
      required: [
        "hoursSavedPerMonth",
        "monthlyLaborValue",
        "acceleration",
        "paybackWindow",
        "confidence",
      ],
      properties: {
        hoursSavedPerMonth: { type: "number" },
        monthlyLaborValue: { type: "number" },
        acceleration: { type: "string" },
        paybackWindow: { type: "string" },
        confidence: { type: "string" },
      },
    },
    plan: {
      type: "object",
      additionalProperties: false,
      required: ["recommendedPlan", "reason", "nextStep", "upsellPath"],
      properties: {
        recommendedPlan: { type: "string" },
        reason: { type: "string" },
        nextStep: { type: "string" },
        upsellPath: { type: "string" },
      },
    },
    setup: {
      type: "object",
      additionalProperties: false,
      required: ["recommendation", "reason", "localCase", "vpsCase"],
      properties: {
        recommendation: { type: "string", enum: ["Local", "VPS", "Hybrid"] },
        reason: { type: "string" },
        localCase: { type: "string" },
        vpsCase: { type: "string" },
      },
    },
    tools: {
      type: "object",
      additionalProperties: false,
      required: ["requiredNow", "usefulLater", "avoidForV1"],
      properties: {
        requiredNow: {
          type: "array",
          items: { type: "string" },
        },
        usefulLater: {
          type: "array",
          items: { type: "string" },
        },
        avoidForV1: {
          type: "array",
          items: { type: "string" },
        },
      },
    },
    remarks: {
      type: "array",
      items: { type: "string" },
    },
    recommendations: {
      type: "array",
      items: { type: "string" },
    },
    objections: {
      type: "array",
      items: {
        type: "object",
        additionalProperties: false,
        required: ["concern", "response"],
        properties: {
          concern: { type: "string" },
          response: { type: "string" },
        },
      },
    },
    cta: {
      type: "object",
      additionalProperties: false,
      required: ["label", "emailSubject", "emailBody"],
      properties: {
        label: { type: "string" },
        emailSubject: { type: "string" },
        emailBody: { type: "string" },
      },
    },
  },
} as const
