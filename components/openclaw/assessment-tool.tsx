"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Loader2,
  LockKeyhole,
  MailCheck,
  Server,
  ShieldCheck,
  Sparkles,
} from "lucide-react"

import {
  ACTION_RISKS,
  COMMON_TOOLS,
  type AssessmentAnswers,
  type AssessmentApiResponse,
  type AssessmentContact,
  type AssessmentPreview,
  type AssessmentReport,
} from "@/lib/assessment"

const INITIAL_ANSWERS: AssessmentAnswers = {
  industry: "",
  teamSize: "2-5 people",
  workflowOwner: "",
  urgency: "This month",
  workflowName: "",
  workflowDescription: "",
  currentTools: ["Gmail", "Google Sheets"],
  otherTools: "",
  monthlyVolume: 180,
  minutesPerItem: 12,
  peopleInvolved: 2,
  hourlyCost: 35,
  errorRate: "Sometimes",
  delayPain: "",
  sensitivity: "Medium",
  approvalNeed: "Assistant drafts, human approves",
  actionRisks: ["Sending customer messages"],
  uptimeNeed: "Business hours is enough",
  privacyConcern: "Some private business data",
  remoteTeam: "Small remote team",
  budgetComfort: "Start small, expand after proof",
}

const INITIAL_CONTACT: AssessmentContact = {
  name: "",
  email: "",
  company: "",
  phone: "",
  preferredNextStep: "Free fit check",
}

const STEPS = [
  { k: "Context", t: "Business context" },
  { k: "Workflow", t: "Current workflow" },
  { k: "Risk", t: "Risk and approvals" },
  { k: "Value", t: "Cost and time" },
  { k: "Setup", t: "Hosting direction" },
] as const

export function AssessmentTool() {
  const [answers, setAnswers] = useState<AssessmentAnswers>(INITIAL_ANSWERS)
  const [contact, setContact] = useState<AssessmentContact>(INITIAL_CONTACT)
  const [step, setStep] = useState(0)
  const [preview, setPreview] = useState<AssessmentPreview | null>(null)
  const [report, setReport] = useState<AssessmentReport | null>(null)
  const [leadDelivered, setLeadDelivered] = useState(false)
  const [loadingPreview, setLoadingPreview] = useState(false)
  const [loadingReport, setLoadingReport] = useState(false)
  const [error, setError] = useState("")

  const rough = useMemo(() => {
    const monthlyMinutes = answers.monthlyVolume * answers.minutesPerItem
    const hours = Math.max(0, Math.round((monthlyMinutes / 60) * 0.55))
    const value = Math.round(hours * answers.hourlyCost)
    return { hours, value }
  }, [answers.hourlyCost, answers.minutesPerItem, answers.monthlyVolume])

  const progress = report ? 100 : preview ? 84 : ((step + 1) / STEPS.length) * 72
  const isStepValid = validateStep(step, answers)
  const canSubmitContact =
    contact.name.trim().length > 1 &&
    contact.company.trim().length > 1 &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact.email)

  const setAnswer = <K extends keyof AssessmentAnswers>(
    key: K,
    value: AssessmentAnswers[K],
  ) => {
    setAnswers((current) => ({ ...current, [key]: value }))
    setError("")
  }

  const setContactField = <K extends keyof AssessmentContact>(
    key: K,
    value: AssessmentContact[K],
  ) => {
    setContact((current) => ({ ...current, [key]: value }))
    setError("")
  }

  const toggleAnswerItem = (key: "currentTools" | "actionRisks", item: string) => {
    setAnswers((current) => {
      const values = current[key]
      return {
        ...current,
        [key]: values.includes(item)
          ? values.filter((value) => value !== item)
          : [...values, item],
      }
    })
    setError("")
  }

  const analyzePreview = async () => {
    if (!isStepValid) {
      setError("Complete the required fields in this step before analysis.")
      return
    }
    setLoadingPreview(true)
    setError("")
    setPreview(null)
    setReport(null)

    const result = await requestAssessment({ answers })
    setLoadingPreview(false)

    if (!result.ok) {
      setError(result.error)
      return
    }
    setPreview(result.preview)
  }

  const unlockReport = async () => {
    if (!canSubmitContact) {
      setError("Add your name, company, and a valid email to unlock the full plan.")
      return
    }
    setLoadingReport(true)
    setError("")

    const result = await requestAssessment({ answers, contact })
    setLoadingReport(false)

    if (!result.ok) {
      setError(result.error)
      return
    }
    if (!result.report) {
      setError("The report came back incomplete. Please try again.")
      return
    }
    setPreview(result.preview)
    setReport(result.report)
    setLeadDelivered(Boolean(result.leadDelivered))
  }

  return (
    <main className="relative z-10 min-h-svh bg-transparent text-bone">
      <div className="bg-grid absolute inset-0 -z-10 opacity-30" />
      <div className="absolute inset-x-0 top-0 -z-10 h-[70vh] bg-gradient-to-b from-surface-1/70 via-transparent to-transparent" />

      <header className="border-hairline sticky top-0 z-40 border-b bg-coal/70 backdrop-blur-xl">
        <div className="mx-auto flex h-14 max-w-[1440px] items-center justify-between px-6 lg:px-10">
          <Link
            href="/"
            className="press inline-flex items-center gap-2 text-sm text-ash hover:text-bone"
          >
            <ArrowLeft className="h-4 w-4" strokeWidth={1.5} />
            Back to OpenClaw Services
          </Link>
          <div className="label hidden text-ash md:block">
            workflow.assessment / guided scan
          </div>
        </div>
      </header>

      <section className="border-hairline mx-auto grid max-w-[1440px] grid-cols-12 border-x">
        <div className="border-hairline col-span-12 border-b px-6 py-12 md:px-10 md:py-16">
          <div className="label mb-7 inline-flex items-center gap-2 text-ash">
            <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-ember" />
            5-7 minute workflow check
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-12">
            <h1 className="font-display text-[clamp(2.5rem,5.8vw,5.7rem)] leading-[0.92] font-medium tracking-[-0.04em] md:col-span-7">
              Find the first
              <br />
              workflow your agent
              <br />
              should take over.
            </h1>
            <div className="self-end md:col-span-5">
              <p className="max-w-xl text-lg leading-relaxed text-ash">
                Map one repeated workflow, estimate the monthly time drag, and
                get a practical recommendation for plan, tool connections, and
                local vs VPS setup.
              </p>
              <div className="mt-7 grid grid-cols-3 border-y border-[rgb(245_235_220_/_0.08)] py-4">
                <Metric label="Preview" value="instant" />
                <Metric label="Report" value="LLM" border />
                <Metric label="Gate" value="contact" border />
              </div>
            </div>
          </div>
        </div>

        <div className="border-hairline col-span-12 border-b px-6 py-5 md:px-10">
          <div className="mb-4 flex items-center justify-between gap-4">
            <span className="label text-ash">assessment progress</span>
            <span className="font-mono text-xs text-ash">{Math.round(progress)}%</span>
          </div>
          <div className="h-1 overflow-hidden rounded-sm bg-[rgb(245_235_220_/_0.08)]">
            <div
              className="h-full bg-gradient-to-r from-ember via-amber-glow to-ember"
              style={{
                width: `${progress}%`,
                transition: "width 380ms cubic-bezier(0.22, 1, 0.36, 1)",
              }}
            />
          </div>
        </div>

        <section className="border-hairline col-span-12 grid grid-cols-1 md:grid-cols-12">
          <div className="border-hairline border-b p-6 md:col-span-7 md:border-r md:border-b-0 md:p-10">
            {report ? (
              <FullReport report={report} leadDelivered={leadDelivered} />
            ) : preview ? (
              <ContactGate
                contact={contact}
                preview={preview}
                loading={loadingReport}
                canSubmit={canSubmitContact}
                onEdit={() => {
                  setPreview(null)
                  setReport(null)
                  setStep(0)
                }}
                onSubmit={unlockReport}
                setContactField={setContactField}
              />
            ) : (
              <QuestionStep
                answers={answers}
                step={step}
                loading={loadingPreview}
                canContinue={isStepValid}
                rough={rough}
                onBack={() => setStep((current) => Math.max(0, current - 1))}
                onNext={() => {
                  if (!isStepValid) {
                    setError("Complete the required fields in this step before continuing.")
                    return
                  }
                  if (step === STEPS.length - 1) {
                    void analyzePreview()
                  } else {
                    setStep((current) => Math.min(STEPS.length - 1, current + 1))
                  }
                }}
                setAnswer={setAnswer}
                toggleAnswerItem={toggleAnswerItem}
              />
            )}

            {error && (
              <div className="border-hairline mt-6 border bg-surface-2/60 p-4 text-sm leading-relaxed text-bone">
                <span className="label block text-ember">attention</span>
                <span className="mt-2 block text-ash">{error}</span>
              </div>
            )}
          </div>

          <aside className="p-6 md:col-span-5 md:p-10">
            <AssessmentSidePanel
              step={step}
              preview={preview}
              report={report}
              rough={rough}
              loading={loadingPreview || loadingReport}
            />
          </aside>
        </section>
      </section>
    </main>
  )
}

async function requestAssessment(payload: {
  answers: AssessmentAnswers
  contact?: AssessmentContact
}): Promise<AssessmentApiResponse> {
  try {
    const response = await fetch("/api/assessment/analyze", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
    const data = (await response.json()) as AssessmentApiResponse
    if (!response.ok && data.ok === false) return data
    return data
  } catch {
    return {
      ok: false,
      error:
        "The assessment service could not be reached. You can still book a fit check from the main page.",
    }
  }
}

function QuestionStep({
  answers,
  step,
  loading,
  canContinue,
  rough,
  onBack,
  onNext,
  setAnswer,
  toggleAnswerItem,
}: {
  answers: AssessmentAnswers
  step: number
  loading: boolean
  canContinue: boolean
  rough: { hours: number; value: number }
  onBack: () => void
  onNext: () => void
  setAnswer: <K extends keyof AssessmentAnswers>(
    key: K,
    value: AssessmentAnswers[K],
  ) => void
  toggleAnswerItem: (key: "currentTools" | "actionRisks", item: string) => void
}) {
  return (
    <div>
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="label text-ember">
            {String(step + 1).padStart(2, "0")} / {STEPS[step].k}
          </div>
          <h2 className="mt-3 font-display text-4xl font-medium tracking-tight md:text-5xl">
            {STEPS[step].t}
          </h2>
        </div>
        <div className="label text-ash">
          rough drag: {rough.hours}h / ${rough.value.toLocaleString()}/mo
        </div>
      </div>

      {step === 0 && (
        <div className="grid gap-5">
          <TextField
            label="Industry"
            helper="Example: home services, agency, clinic, SaaS support, ecommerce ops."
            value={answers.industry}
            onChange={(value) => setAnswer("industry", value)}
            placeholder="What business are you in?"
          />
          <div className="grid gap-5 md:grid-cols-2">
            <OptionGroup
              label="Team size"
              value={answers.teamSize}
              options={["Solo owner", "2-5 people", "6-15 people", "16-50 people", "50+ people"]}
              onChange={(value) => setAnswer("teamSize", value)}
            />
            <OptionGroup
              label="Urgency"
              value={answers.urgency}
              options={["This week", "This month", "This quarter", "Exploring only"]}
              onChange={(value) => setAnswer("urgency", value)}
            />
          </div>
          <TextField
            label="Workflow owner"
            helper="Who feels this pain every week?"
            value={answers.workflowOwner}
            onChange={(value) => setAnswer("workflowOwner", value)}
            placeholder="Founder, ops manager, support lead..."
          />
        </div>
      )}

      {step === 1 && (
        <div className="grid gap-5">
          <TextField
            label="Workflow name"
            helper="Name the repeated task in plain language."
            value={answers.workflowName}
            onChange={(value) => setAnswer("workflowName", value)}
            placeholder="Lead follow-up, support replies, invoice review..."
          />
          <TextAreaField
            label="How does it work today?"
            helper="Include inputs, decisions, outputs, handoffs, and what makes it annoying."
            value={answers.workflowDescription}
            onChange={(value) => setAnswer("workflowDescription", value)}
            placeholder="New requests arrive in Gmail, someone checks a sheet, drafts a reply..."
          />
          <CheckboxGrid
            label="Tools touched"
            values={answers.currentTools}
            options={[...COMMON_TOOLS]}
            onToggle={(value) => toggleAnswerItem("currentTools", value)}
          />
          <TextField
            label="Other tools"
            helper="Optional. Add internal portals, custom CRMs, or niche tools."
            value={answers.otherTools}
            onChange={(value) => setAnswer("otherTools", value)}
            placeholder="Internal admin, WhatsApp, ClickUp..."
          />
          <div className="grid gap-5 md:grid-cols-2">
            <NumberField
              label="Monthly volume"
              helper="How many items, messages, leads, invoices, or tasks per month?"
              value={answers.monthlyVolume}
              onChange={(value) => setAnswer("monthlyVolume", value)}
            />
            <NumberField
              label="Minutes per item"
              helper="Current manual time per item."
              value={answers.minutesPerItem}
              onChange={(value) => setAnswer("minutesPerItem", value)}
            />
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="grid gap-5">
          <div className="grid gap-5 md:grid-cols-2">
            <OptionGroup
              label="Data sensitivity"
              value={answers.sensitivity}
              options={["Low", "Medium", "High", "Regulated or very private"]}
              onChange={(value) => setAnswer("sensitivity", value)}
            />
            <OptionGroup
              label="Human approval"
              value={answers.approvalNeed}
              options={[
                "Assistant can act alone",
                "Assistant drafts, human approves",
                "Human must approve sensitive actions",
                "Only summaries and prep work",
              ]}
              onChange={(value) => setAnswer("approvalNeed", value)}
            />
          </div>
          <CheckboxGrid
            label="Risky actions in this workflow"
            values={answers.actionRisks}
            options={[...ACTION_RISKS]}
            onToggle={(value) => toggleAnswerItem("actionRisks", value)}
          />
          <OptionGroup
            label="Error or rework today"
            value={answers.errorRate}
            options={["Rarely", "Sometimes", "Often", "This is the main pain"]}
            onChange={(value) => setAnswer("errorRate", value)}
          />
        </div>
      )}

      {step === 3 && (
        <div className="grid gap-5">
          <div className="grid gap-5 md:grid-cols-3">
            <NumberField
              label="People involved"
              helper="How many people touch the workflow?"
              value={answers.peopleInvolved}
              onChange={(value) => setAnswer("peopleInvolved", value)}
            />
            <NumberField
              label="Hourly cost"
              helper="Blended cost per hour."
              value={answers.hourlyCost}
              onChange={(value) => setAnswer("hourlyCost", value)}
            />
            <NumberField
              label="Minutes per item"
              helper="Adjust if needed."
              value={answers.minutesPerItem}
              onChange={(value) => setAnswer("minutesPerItem", value)}
            />
          </div>
          <TextAreaField
            label="What delays cost you"
            helper="Mention missed leads, slow replies, owner bottlenecks, or late reports."
            value={answers.delayPain}
            onChange={(value) => setAnswer("delayPain", value)}
            placeholder="When this is late, customers wait, leads cool down, reports get skipped..."
          />
        </div>
      )}

      {step === 4 && (
        <div className="grid gap-5">
          <div className="grid gap-5 md:grid-cols-2">
            <OptionGroup
              label="Uptime need"
              value={answers.uptimeNeed}
              options={[
                "Business hours is enough",
                "Needs scheduled jobs",
                "Needs 24/7 intake",
                "Mission critical",
              ]}
              onChange={(value) => setAnswer("uptimeNeed", value)}
            />
            <OptionGroup
              label="Privacy concern"
              value={answers.privacyConcern}
              options={[
                "Mostly public info",
                "Some private business data",
                "Customer personal data",
                "Sensitive financial or regulated data",
              ]}
              onChange={(value) => setAnswer("privacyConcern", value)}
            />
          </div>
          <div className="grid gap-5 md:grid-cols-2">
            <OptionGroup
              label="Team access"
              value={answers.remoteTeam}
              options={[
                "Owner-only",
                "Small remote team",
                "Multiple departments",
                "External clients need access",
              ]}
              onChange={(value) => setAnswer("remoteTeam", value)}
            />
            <OptionGroup
              label="Budget posture"
              value={answers.budgetComfort}
              options={[
                "Start small, expand after proof",
                "Ready for a full workflow",
                "Need several agents",
                "Only exploring",
              ]}
              onChange={(value) => setAnswer("budgetComfort", value)}
            />
          </div>
        </div>
      )}

      <div className="border-hairline mt-10 flex flex-wrap items-center justify-between gap-3 border-t pt-6">
        <button
          type="button"
          onClick={onBack}
          disabled={step === 0 || loading}
          className="press border-hairline inline-flex items-center gap-2 rounded-sm border px-4 py-3 text-sm text-ash hover:border-bone/50 hover:text-bone disabled:pointer-events-none disabled:opacity-35"
        >
          <ArrowLeft className="h-4 w-4" strokeWidth={1.5} />
          Back
        </button>
        <button
          type="button"
          onClick={onNext}
          disabled={!canContinue || loading}
          className="press ember-glow inline-flex items-center gap-2 rounded-sm bg-ember px-5 py-3 text-sm font-medium text-coal hover:brightness-110 disabled:pointer-events-none disabled:opacity-45"
        >
          {loading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" strokeWidth={1.5} />
              Assessing workflow
            </>
          ) : step === STEPS.length - 1 ? (
            <>
              Generate preview
              <Sparkles className="h-4 w-4" strokeWidth={1.5} />
            </>
          ) : (
            <>
              Continue
              <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
            </>
          )}
        </button>
      </div>
    </div>
  )
}

function ContactGate({
  contact,
  preview,
  loading,
  canSubmit,
  onEdit,
  onSubmit,
  setContactField,
}: {
  contact: AssessmentContact
  preview: AssessmentPreview
  loading: boolean
  canSubmit: boolean
  onEdit: () => void
  onSubmit: () => void
  setContactField: <K extends keyof AssessmentContact>(
    key: K,
    value: AssessmentContact[K],
  ) => void
}) {
  return (
    <div>
      <div className="label mb-4 text-ember">preview ready</div>
      <h2 className="font-display text-4xl font-medium tracking-tight md:text-5xl">
        {preview.headline}
      </h2>
      <div className="border-hairline mt-8 grid grid-cols-1 border-y md:grid-cols-3">
        <Metric label="Fit score" value={`${Math.round(preview.fitScore)}/100`} />
        <Metric label="Savings" value={preview.savingsRange} border />
        <Metric label="Plan" value={preview.planTeaser} border />
      </div>

      <div className="mt-8 grid gap-5">
        <div className="border-hairline border bg-surface-1/70 p-5">
          <div className="label text-ash">strongest first move</div>
          <p className="mt-3 text-lg leading-relaxed text-bone">
            {preview.strongestRecommendation}
          </p>
          <p className="mt-4 text-sm leading-relaxed text-ash">{preview.setupTeaser}</p>
        </div>

        <div className="border-hairline border-t pt-6">
          <div className="mb-5 flex items-start gap-3">
            <LockKeyhole className="mt-1 h-5 w-5 text-ember" strokeWidth={1.5} />
            <div>
              <h3 className="font-display text-2xl font-medium tracking-tight">
                Unlock the full workflow plan
              </h3>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-ash">
                The full report includes plan choice, recommended tool add-ons,
                setup direction, objections to expect, and the safest first build.
              </p>
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <TextField
              label="Name"
              value={contact.name}
              onChange={(value) => setContactField("name", value)}
              placeholder="Your name"
            />
            <TextField
              label="Company"
              value={contact.company}
              onChange={(value) => setContactField("company", value)}
              placeholder="Company name"
            />
            <TextField
              label="Email"
              value={contact.email}
              onChange={(value) => setContactField("email", value)}
              placeholder="you@company.com"
              type="email"
            />
            <TextField
              label="Phone"
              value={contact.phone ?? ""}
              onChange={(value) => setContactField("phone", value)}
              placeholder="Optional"
            />
          </div>
          <div className="mt-5">
            <OptionGroup
              label="Preferred next step"
              value={contact.preferredNextStep}
              options={["Free fit check", "Workflow blueprint", "Starter build", "Business agent"]}
              onChange={(value) => setContactField("preferredNextStep", value)}
            />
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-between gap-3">
            <button
              type="button"
              onClick={onEdit}
              disabled={loading}
              className="press border-hairline inline-flex items-center gap-2 rounded-sm border px-4 py-3 text-sm text-ash hover:border-bone/50 hover:text-bone disabled:pointer-events-none disabled:opacity-40"
            >
              Edit answers
            </button>
            <button
              type="button"
              onClick={onSubmit}
              disabled={!canSubmit || loading}
              className="press ember-glow inline-flex items-center gap-2 rounded-sm bg-ember px-5 py-3 text-sm font-medium text-coal hover:brightness-110 disabled:pointer-events-none disabled:opacity-45"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" strokeWidth={1.5} />
                  Building report
                </>
              ) : (
                <>
                  Unlock full plan
                  <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

function FullReport({
  report,
  leadDelivered,
}: {
  report: AssessmentReport
  leadDelivered: boolean
}) {
  const mailHref = `mailto:crew@openclaw.dev?subject=${encodeURIComponent(
    report.cta.emailSubject,
  )}&body=${encodeURIComponent(report.cta.emailBody)}`

  return (
    <div>
      <div className="label mb-4 text-ember">full plan unlocked</div>
      <h2 className="font-display text-4xl font-medium tracking-tight md:text-5xl">
        {report.preview.headline}
      </h2>
      <p className="mt-6 max-w-3xl text-base leading-relaxed text-ash">
        {report.executiveSummary}
      </p>

      <div className="border-hairline mt-8 grid grid-cols-1 border-y md:grid-cols-3">
        <Metric label="Fit score" value={`${Math.round(report.preview.fitScore)}/100`} />
        <Metric
          label="Hours saved"
          value={`${Math.round(report.estimates.hoursSavedPerMonth)}/mo`}
          border
        />
        <Metric
          label="Labor value"
          value={`$${Math.round(report.estimates.monthlyLaborValue).toLocaleString()}`}
          border
        />
      </div>

      <div className="mt-10 grid gap-8">
        <ReportBlock
          icon={<Sparkles className="h-5 w-5 text-ember" strokeWidth={1.5} />}
          title={`Recommended plan: ${report.plan.recommendedPlan}`}
          body={report.plan.reason}
          lines={[report.plan.nextStep, report.plan.upsellPath]}
        />
        <ReportBlock
          icon={<Server className="h-5 w-5 text-ember" strokeWidth={1.5} />}
          title={`${report.setup.recommendation} setup direction`}
          body={report.setup.reason}
          lines={[report.setup.localCase, report.setup.vpsCase]}
        />
        <div className="grid gap-5 md:grid-cols-3">
          <ListBlock title="Required now" items={report.tools.requiredNow} />
          <ListBlock title="Useful later" items={report.tools.usefulLater} />
          <ListBlock title="Avoid for v1" items={report.tools.avoidForV1} />
        </div>
        <ReportBlock
          icon={<ShieldCheck className="h-5 w-5 text-ember" strokeWidth={1.5} />}
          title="Recommendations"
          body="Start narrow, make approvals explicit, and only expand after the first workflow proves it is earning its place."
          lines={report.recommendations}
        />
        <div className="border-hairline border-t pt-6">
          <div className="label mb-4 text-ash">likely objections</div>
          <div className="divide-y divide-[rgb(245_235_220_/_0.08)]">
            {report.objections.map((item) => (
              <div key={item.concern} className="grid gap-2 py-4 md:grid-cols-12">
                <div className="font-display text-xl font-medium tracking-tight md:col-span-4">
                  {item.concern}
                </div>
                <p className="text-sm leading-relaxed text-ash md:col-span-8">
                  {item.response}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="border-hairline mt-10 flex flex-wrap items-center justify-between gap-4 border-t pt-6">
        <div className="flex items-center gap-3 text-sm text-ash">
          <MailCheck className="h-5 w-5 text-live" strokeWidth={1.5} />
          {leadDelivered
            ? "Your assessment was sent to OpenClaw."
            : "Webhook is not configured, so use email to send the report."}
        </div>
        <a
          href={mailHref}
          className="press ember-glow inline-flex items-center gap-2 rounded-sm bg-ember px-5 py-3 text-sm font-medium text-coal hover:brightness-110"
        >
          {report.cta.label}
          <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
        </a>
      </div>
    </div>
  )
}

function AssessmentSidePanel({
  step,
  preview,
  report,
  rough,
  loading,
}: {
  step: number
  preview: AssessmentPreview | null
  report: AssessmentReport | null
  rough: { hours: number; value: number }
  loading: boolean
}) {
  if (loading) {
    return (
      <div className="sticky top-24">
        <div className="label mb-4 text-ash">analysis running</div>
        <div className="grid gap-3">
          {[0, 1, 2, 3].map((item) => (
            <div
              key={item}
              className="h-20 animate-pulse rounded-sm border border-[rgb(245_235_220_/_0.08)] bg-surface-1/70"
            />
          ))}
        </div>
      </div>
    )
  }

  if (report) {
    return (
      <div className="sticky top-24">
        <div className="label text-ember">report scorecard</div>
        <ScoreDial score={report.preview.fitScore} label={report.preview.fitBand} />
        <ScoreRows rows={report.scoreBreakdown} />
      </div>
    )
  }

  if (preview) {
    return (
      <div className="sticky top-24">
        <div className="label text-ember">preview score</div>
        <ScoreDial score={preview.fitScore} label={preview.fitBand} />
        <div className="border-hairline mt-8 border-t pt-6">
          <div className="label text-ash">what the full plan includes</div>
          <ul className="mt-5 space-y-3 text-sm text-bone/85">
            {[
              "Plan recommendation with next step",
              "Tool add-ups for v1 and later",
              "Local vs VPS setup advice",
              "Objection handling for the buying decision",
            ].map((item) => (
              <li key={item} className="flex gap-2.5">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-ember" strokeWidth={1.5} />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    )
  }

  return (
    <div className="sticky top-24">
      <div className="label text-ash">live estimate</div>
      <div className="mt-6 font-display text-6xl font-medium tracking-tight">
        {rough.hours}
        <span className="ml-2 font-mono text-sm text-ash">hours/mo</span>
      </div>
      <p className="mt-4 max-w-sm text-sm leading-relaxed text-ash">
        This rough number updates before the LLM analysis. It uses your volume,
        manual handling time, and a conservative automation capture rate.
      </p>
      <div className="border-hairline mt-8 divide-y divide-[rgb(245_235_220_/_0.08)] border-y">
        {STEPS.map((item, index) => (
          <div
            key={item.k}
            className={`flex items-center justify-between py-4 ${
              index === step ? "text-bone" : "text-ash"
            }`}
          >
            <span className="font-display text-xl font-medium tracking-tight">
              {item.t}
            </span>
            <span className="font-mono text-xs">
              {index < step ? "done" : index === step ? "active" : "queued"}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

function ScoreDial({ score, label }: { score: number; label: string }) {
  const clamped = Math.max(0, Math.min(100, Math.round(score)))
  return (
    <div className="mt-6">
      <div
        className="grid aspect-square max-w-[260px] place-items-center rounded-full border border-[rgb(245_235_220_/_0.08)]"
        style={{
          background: `conic-gradient(var(--ember) ${clamped}%, rgb(245 235 220 / 0.08) 0)`,
        }}
      >
        <div className="grid h-[78%] w-[78%] place-items-center rounded-full bg-coal text-center">
          <div>
            <div className="font-display text-6xl font-medium tracking-tight">{clamped}</div>
            <div className="label mt-2 text-ash">{label}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

function ScoreRows({
  rows,
}: {
  rows: AssessmentReport["scoreBreakdown"]
}) {
  return (
    <div className="mt-8 space-y-4">
      {Object.entries(rows).map(([key, value]) => (
        <div key={key}>
          <div className="mb-2 flex items-center justify-between gap-4">
            <span className="label text-ash">{splitCamel(key)}</span>
            <span className="font-mono text-xs text-bone">{Math.round(value)}/100</span>
          </div>
          <div className="h-1 bg-[rgb(245_235_220_/_0.08)]">
            <div className="h-full bg-ember" style={{ width: `${Math.round(value)}%` }} />
          </div>
        </div>
      ))}
    </div>
  )
}

function ReportBlock({
  icon,
  title,
  body,
  lines,
}: {
  icon: React.ReactNode
  title: string
  body: string
  lines: string[]
}) {
  return (
    <section className="border-hairline border-t pt-6">
      <div className="flex items-start gap-3">
        {icon}
        <div>
          <h3 className="font-display text-2xl font-medium tracking-tight">{title}</h3>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-ash">{body}</p>
        </div>
      </div>
      <ul className="mt-5 grid gap-3 text-sm text-bone/85">
        {lines.map((line) => (
          <li key={line} className="flex gap-2.5">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-ember" strokeWidth={1.5} />
            <span>{line}</span>
          </li>
        ))}
      </ul>
    </section>
  )
}

function ListBlock({ title, items }: { title: string; items: string[] }) {
  return (
    <section className="border-hairline border-t pt-5">
      <div className="label mb-4 text-ash">{title}</div>
      <ul className="space-y-2.5 text-sm text-bone/85">
        {items.map((item) => (
          <li key={item} className="flex gap-2.5">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-ember" strokeWidth={1.5} />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </section>
  )
}

function TextField({
  label,
  value,
  onChange,
  helper,
  placeholder,
  type = "text",
}: {
  label: string
  value: string
  onChange: (value: string) => void
  helper?: string
  placeholder?: string
  type?: string
}) {
  return (
    <label className="grid gap-2">
      <span className="label text-ash">{label}</span>
      <input
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="border-hairline min-h-12 rounded-sm border bg-surface-1/70 px-4 py-3 text-sm text-bone outline-none transition placeholder:text-ash/50 focus:border-ember"
      />
      {helper && <span className="text-xs leading-relaxed text-ash">{helper}</span>}
    </label>
  )
}

function TextAreaField({
  label,
  value,
  onChange,
  helper,
  placeholder,
}: {
  label: string
  value: string
  onChange: (value: string) => void
  helper?: string
  placeholder?: string
}) {
  return (
    <label className="grid gap-2">
      <span className="label text-ash">{label}</span>
      <textarea
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        rows={5}
        className="border-hairline min-h-36 resize-y rounded-sm border bg-surface-1/70 px-4 py-3 text-sm leading-relaxed text-bone outline-none transition placeholder:text-ash/50 focus:border-ember"
      />
      {helper && <span className="text-xs leading-relaxed text-ash">{helper}</span>}
    </label>
  )
}

function NumberField({
  label,
  value,
  onChange,
  helper,
}: {
  label: string
  value: number
  onChange: (value: number) => void
  helper?: string
}) {
  return (
    <label className="grid gap-2">
      <span className="label text-ash">{label}</span>
      <input
        type="number"
        min={0}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        className="border-hairline min-h-12 rounded-sm border bg-surface-1/70 px-4 py-3 font-mono text-sm text-bone outline-none transition focus:border-ember"
      />
      {helper && <span className="text-xs leading-relaxed text-ash">{helper}</span>}
    </label>
  )
}

function OptionGroup({
  label,
  value,
  options,
  onChange,
}: {
  label: string
  value: string
  options: string[]
  onChange: (value: string) => void
}) {
  return (
    <fieldset className="grid gap-2">
      <legend className="label text-ash">{label}</legend>
      <div className="grid gap-2">
        {options.map((option) => {
          const selected = value === option
          return (
            <button
              key={option}
              type="button"
              onClick={() => onChange(option)}
              className={`press border-hairline flex min-h-11 items-center justify-between gap-3 rounded-sm border px-3 py-2 text-left text-sm transition ${
                selected
                  ? "border-ember bg-ember/10 text-bone"
                  : "bg-surface-1/55 text-ash hover:border-bone/40 hover:text-bone"
              }`}
            >
              <span>{option}</span>
              {selected && <Check className="h-4 w-4 text-ember" strokeWidth={1.5} />}
            </button>
          )
        })}
      </div>
    </fieldset>
  )
}

function CheckboxGrid({
  label,
  values,
  options,
  onToggle,
}: {
  label: string
  values: string[]
  options: string[]
  onToggle: (value: string) => void
}) {
  return (
    <fieldset className="grid gap-3">
      <legend className="label text-ash">{label}</legend>
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
        {options.map((option) => {
          const selected = values.includes(option)
          return (
            <button
              key={option}
              type="button"
              onClick={() => onToggle(option)}
              className={`press border-hairline flex min-h-11 items-center justify-between gap-3 rounded-sm border px-3 py-2 text-left text-sm transition ${
                selected
                  ? "border-ember bg-ember/10 text-bone"
                  : "bg-surface-1/55 text-ash hover:border-bone/40 hover:text-bone"
              }`}
            >
              <span>{option}</span>
              <span
                className={`grid h-4 w-4 shrink-0 place-items-center rounded-sm border ${
                  selected ? "border-ember bg-ember text-coal" : "border-ash/40"
                }`}
              >
                {selected && <Check className="h-3 w-3" strokeWidth={2} />}
              </span>
            </button>
          )
        })}
      </div>
    </fieldset>
  )
}

function Metric({
  label,
  value,
  border,
}: {
  label: string
  value: string
  border?: boolean
}) {
  return (
    <div className={`px-4 py-3 ${border ? "border-hairline border-t md:border-t-0 md:border-l" : ""}`}>
      <div className="label text-ash">{label}</div>
      <div className="mt-2 font-display text-2xl font-medium tracking-tight text-bone">
        {value}
      </div>
    </div>
  )
}

function validateStep(step: number, answers: AssessmentAnswers) {
  if (step === 0) {
    return (
      answers.industry.trim().length > 1 &&
      answers.workflowOwner.trim().length > 1 &&
      answers.teamSize.length > 0
    )
  }
  if (step === 1) {
    return (
      answers.workflowName.trim().length > 1 &&
      answers.workflowDescription.trim().length > 20 &&
      answers.currentTools.length > 0 &&
      answers.monthlyVolume > 0 &&
      answers.minutesPerItem > 0
    )
  }
  if (step === 2) return answers.approvalNeed.length > 0 && answers.sensitivity.length > 0
  if (step === 3) {
    return (
      answers.peopleInvolved > 0 &&
      answers.hourlyCost > 0 &&
      answers.delayPain.trim().length > 10
    )
  }
  return answers.uptimeNeed.length > 0 && answers.privacyConcern.length > 0
}

function splitCamel(value: string) {
  return value.replace(/([A-Z])/g, " $1").toLowerCase()
}
