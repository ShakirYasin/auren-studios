import {
  ArrowUpRight,
  Check,
  ChevronDown,
  ClipboardCheck,
  Database,
  Gauge,
  GitBranch,
  LockKeyhole,
  MailCheck,
  MessageSquareText,
  Plug,
  Shield,
  Sparkles,
  Workflow,
} from "lucide-react"

import { Reveal } from "@/components/reveal"
import { MagneticButton } from "@/components/openclaw/magnetic-button"
import { Terminal } from "@/components/openclaw/terminal"
import { RFCDocument } from "@/components/openclaw/rfc-document"
import { PipelineGraph } from "@/components/openclaw/pipeline-graph"
import { LiveCounter } from "@/components/openclaw/live-counter"
import { LiveClock } from "@/components/openclaw/live-clock"
import { DayRailMobile } from "@/components/openclaw/day-rail"

export default function Page() {
  return (
    <main
      data-day-rail-page
      className="relative z-10 min-h-svh bg-transparent text-bone"
    >
      <DayRailMobile />
      <Nav />
      <Hero />
      <Examples />
      <Safety />
      <PlatformStrip />
      <Services />
      <Process />
      <Pricing />
      <Faq />
      <Handover />
      <Footer />
    </main>
  )
}

function Nav() {
  return (
    <header className="border-hairline sticky top-0 z-40 border-b bg-coal/55 backdrop-blur-xl">
      <div className="mx-auto flex h-14 max-w-[1440px] items-center justify-between px-6 lg:px-10">
        <a href="#" className="flex items-center gap-2.5">
          <Mark />
          <span className="font-display text-xl leading-none font-medium tracking-tight">
            OpenClaw Services
          </span>
        </a>
        <nav className="hidden items-center gap-8 text-sm md:flex">
          {[
            ["Examples", "work"],
            ["Safety", "safety"],
            ["Build", "services"],
            ["Pricing", "pricing"],
            ["Start", "handover"],
          ].map(([label, id]) => (
            <a
              key={id}
              href={`#${id}`}
              className="text-ash transition-colors hover:text-bone"
            >
              {label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <MagneticButton
            href="/assessment"
            className="inline-flex items-center gap-1.5 rounded-full bg-bone px-4 py-1.5 text-sm font-medium text-coal hover:bg-ember hover:text-coal"
          >
            Check my workflow
            <ArrowUpRight className="magnetic h-3.5 w-3.5" />
          </MagneticButton>
        </div>
      </div>
    </header>
  )
}

function Mark() {
  return (
    <span
      className="relative grid h-7 w-7 place-items-center rounded-sm border border-ember/60 bg-ember/10"
      style={{
        boxShadow:
          "inset 0 0 12px color-mix(in oklch, var(--ember) 35%, transparent)",
      }}
    >
      <svg
        viewBox="0 0 24 24"
        className="h-4 w-4 text-ember"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="2"
      >
        <path d="M4 20 L10 4" />
        <path d="M10 20 L16 4" />
        <path d="M16 20 L20 12" />
        <path d="M3 14 H21" />
      </svg>
    </span>
  )
}

const HERO_LOG: {
  text: string
  kind?: "prompt" | "step" | "ok" | "warn" | "final"
}[] = [
  { text: "workflow: customer messages -> draft replies", kind: "prompt" },
  { text: "connected: Slack, Gmail, Sheets", kind: "step" },
  { text: "agent can summarize, draft, update tasks", kind: "step" },
  { text: "sending emails requires owner approval", kind: "ok" },
  { text: "payments, deletes, and exports blocked", kind: "ok" },
  { text: "handover: working assistant + plain guide", kind: "final" },
]

function Hero() {
  return (
    <section id="hero" className="relative isolate">
      <div className="bg-grid absolute inset-0 -z-10 opacity-40" />
      <div className="absolute inset-x-0 top-0 -z-10 h-[120%] bg-gradient-to-b from-transparent via-transparent to-coal" />

      <div className="border-hairline mx-auto grid max-w-[1440px] grid-cols-12 gap-0 border-x px-0">
        <aside className="border-hairline col-span-12 hidden border-r px-4 py-6 md:col-span-1 md:block">
          <div className="label rotate-180 text-ash [writing-mode:vertical-rl]">
            openclaw.services / done-for-you AI assistants
          </div>
        </aside>

        <div className="col-span-12 md:col-span-11">
          <div className="grid grid-cols-12 gap-0">
            <div className="border-hairline col-span-12 border-b px-6 py-5 md:px-10">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="label flex items-center gap-3 text-ash">
                  <span>00 / business workflow automation</span>
                  <span className="hidden h-[10px] w-px bg-[rgb(245_235_220_/_0.15)] md:block" />
                  <span className="hidden text-[9px] md:inline">
                    <LiveClock /> / first call
                    <span className="text-ember"> maps one workflow</span>
                  </span>
                </div>
                <div className="label text-ash">built on OpenClaw</div>
              </div>
            </div>

            <div className="relative col-span-12 px-6 pt-14 pb-10 md:col-span-8 md:px-10 md:pt-28 md:pb-24 lg:pt-32">
              <div className="label mb-8 inline-flex items-center gap-2 text-ash">
                <span className="pulse-dot inline-block h-1.5 w-1.5 rounded-full bg-ember" />
                For owners, operators, and teams buried in repeat work
              </div>

              <h1 className="rise font-display text-[clamp(2.65rem,6.8vw,6.7rem)] leading-[0.9] font-medium tracking-[-0.04em]">
                AI assistants
                <br />
                that do the
                <br />
                <span
                  className="font-serif-italic font-normal text-ember"
                  style={{
                    textShadow:
                      "0 0 40px color-mix(in oklch, var(--ember) 42%, transparent), 0 0 80px color-mix(in oklch, var(--ember) 18%, transparent)",
                  }}
                >
                  actual work.
                </span>
              </h1>

              <p
                className="rise mt-10 max-w-2xl text-lg leading-relaxed text-ash"
                style={{ animationDelay: "140ms" }}
              >
                We set up OpenClaw agents that read messages, prepare replies,
                update your tools, check records, and run repeatable business
                workflows. Sensitive actions stay behind your approval.
              </p>

              <div
                className="rise mt-10 flex flex-wrap items-center gap-3"
                style={{ animationDelay: "240ms" }}
              >
                <MagneticButton
                  href="/assessment"
                  className="ember-glow inline-flex items-center gap-2 rounded-sm bg-ember px-5 py-3 text-sm font-medium text-coal hover:brightness-110"
                >
                  Check my workflow
                  <ArrowUpRight className="magnetic h-4 w-4" />
                </MagneticButton>
                <MagneticButton
                  href="#work"
                  className="border-hairline inline-flex items-center gap-2 rounded-sm border px-5 py-3 text-sm text-bone hover:border-bone/60"
                  strength={4}
                >
                  See example agents
                </MagneticButton>
                <span className="label ml-2 hidden text-ash md:inline">
                  free fit check / starter build / owned by you
                </span>
              </div>

              <dl
                className="rise mt-16 grid max-w-2xl grid-cols-3 gap-0"
                style={{ animationDelay: "320ms" }}
              >
                <StatCell k="Starts at" value="$0" />
                <StatCell k="First agent" value="$1,499" border />
                <StatCell k="Starter build" value="5-7d" border />
              </dl>
            </div>

            <aside className="border-hairline relative col-span-12 flex flex-col border-t px-6 py-10 md:col-span-4 md:border-t-0 md:border-l md:px-6 md:py-14">
              <div className="mb-4">
                <Terminal lines={HERO_LOG} title="workflow.preview" />
              </div>

              <div className="mt-8 space-y-3">
                {[
                  {
                    icon: MessageSquareText,
                    k: "handles",
                    v: "inbox, support, follow-ups",
                  },
                  {
                    icon: Shield,
                    k: "protects",
                    v: "approval before risky actions",
                  },
                  {
                    icon: ClipboardCheck,
                    k: "handover",
                    v: "plain guide your team can use",
                  },
                ].map(({ icon: Icon, k, v }) => (
                  <div key={k} className="flex items-start gap-3">
                    <Icon
                      className="mt-0.5 h-4 w-4 text-ember"
                      strokeWidth={1.5}
                    />
                    <div>
                      <div className="label text-ash">{k}</div>
                      <div className="text-sm text-bone">{v}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-auto pt-10">
                <div className="rule" />
                <p className="label mt-4 text-ash">
                  OpenClaw is the engine. We handle setup, connections, safety
                  rules, and handover.
                </p>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </section>
  )
}

function StatCell({
  k,
  v,
  value,
  prefix,
  suffix,
  decimals,
  variance,
  border,
}: {
  k: string
  v?: number
  value?: string
  prefix?: string
  suffix?: string
  decimals?: number
  variance?: number
  border?: boolean
}) {
  return (
    <div className={`px-1 ${border ? "border-hairline border-l pl-6" : ""}`}>
      <dt className="label text-ash">{k}</dt>
      <dd className="mt-2 font-display text-4xl leading-none font-medium tracking-tight text-bone">
        {value ?? (
          <LiveCounter
            value={v ?? 0}
            prefix={prefix}
            suffix={suffix}
            decimals={decimals}
            variance={variance}
          />
        )}
      </dd>
    </div>
  )
}

function Examples() {
  const examples = [
    {
      icon: MessageSquareText,
      t: "Customer support assistant",
      p: "Reads support messages, drafts replies, opens tickets, and asks before sending anything to a customer.",
      proof: "Good for teams with a busy inbox or Slack intake.",
    },
    {
      icon: MailCheck,
      t: "Sales follow-up assistant",
      p: "Watches new leads, drafts follow-ups, updates CRM notes, and reminds your team when a deal stalls.",
      proof: "Good for agencies, service firms, and small sales teams.",
    },
    {
      icon: Database,
      t: "Finance admin assistant",
      p: "Checks invoices, flags unusual charges, prepares payment summaries, and keeps money movement approval-only.",
      proof: "Good for founders and operators who review bills manually.",
    },
    {
      icon: ClipboardCheck,
      t: "Operations checklist assistant",
      p: "Tracks recurring tasks, chases missing information, updates spreadsheets, and summarizes what changed.",
      proof: "Good for teams running the same checklist every week.",
    },
    {
      icon: Sparkles,
      t: "Founder briefing assistant",
      p: "Summarizes inbox, Slack, calendar, and documents into a morning brief with drafts ready to review.",
      proof: "Good when the owner is the bottleneck.",
    },
    {
      icon: Workflow,
      t: "Custom workflow assistant",
      p: "Bring the repeated task. We turn it into a working agent connected to the tools your team already uses.",
      proof: "Good when the workflow is specific to your business.",
    },
  ]
  return (
    <section id="work" className="border-hairline relative border-t">
      <SectionHeader
        no="01"
        day="Examples"
        kicker="What agents can do"
        title={
          <>
            Start with the work
            <br className="hidden md:block" /> your team keeps repeating.
          </>
        }
        lede="Non-technical teams do not need an AI platform lecture. They need one useful assistant doing one clear job."
      />
      <Reveal
        as="div"
        stagger={80}
        className="border-hairline mx-auto grid max-w-[1440px] grid-cols-1 border-x md:grid-cols-8 lg:grid-cols-12"
      >
        {examples.map((item, i) => {
          const Icon = item.icon
          return (
            <article
              key={item.t}
              className={[
                "lift group border-hairline relative flex min-h-[270px] flex-col justify-between border-b p-8 hover:bg-surface-1/50 md:p-10",
                i % 2 === 0 ? "md:border-r" : "",
                i === 0 || i === 5
                  ? "md:col-span-4 lg:col-span-5"
                  : "md:col-span-4 lg:col-span-3",
              ].join(" ")}
            >
              <div className="flex items-start justify-between">
                <div className="label text-ash">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <Icon
                  strokeWidth={1.5}
                  className="h-5 w-5 text-ash transition-colors group-hover:text-ember"
                />
              </div>
              <div className="mt-12">
                <h3 className="font-display text-3xl font-medium tracking-tight md:text-[2.25rem]">
                  {item.t}
                </h3>
                <p className="mt-3 max-w-[52ch] text-sm leading-relaxed text-ash">
                  {item.p}
                </p>
              </div>
              <p className="label border-hairline mt-8 border-t pt-4 text-ash">
                {item.proof}
              </p>
            </article>
          )
        })}
      </Reveal>
    </section>
  )
}

function Safety() {
  const rules = [
    {
      k: "Drafts are safe",
      v: "The assistant can prepare replies, summaries, reports, and task updates without touching customers or money.",
    },
    {
      k: "Risky actions ask first",
      v: "Sending emails, deleting records, moving files, exporting data, or spending money can require your approval.",
    },
    {
      k: "Clear limits",
      v: "We write down exactly what the agent can do, what it cannot do, and who is allowed to approve exceptions.",
    },
    {
      k: "You own the setup",
      v: "OpenClaw is open-source and self-hosted. Your configuration, guide, and operating notes are handed over.",
    },
  ]
  return (
    <section id="safety" className="border-hairline relative border-t">
      <SectionHeader
        no="02"
        day="Safety"
        kicker="Human control"
        title={
          <>
            Useful automation,
            <br className="hidden md:block" /> with approval where it matters.
          </>
        }
        lede="The agent can do the repetitive prep work. Your team keeps control over sensitive decisions."
      />
      <div className="border-hairline mx-auto grid max-w-[1440px] grid-cols-1 border-x md:grid-cols-12">
        <div className="border-hairline col-span-1 border-b p-8 md:col-span-7 md:border-r md:border-b-0 md:p-12">
          <RFCDocument />
        </div>
        <div className="col-span-1 p-8 md:col-span-5 md:p-12">
          <div className="space-y-8">
            {rules.map((rule) => (
              <div
                key={rule.k}
                className="border-hairline border-t pt-6 first:border-t-0 first:pt-0"
              >
                <div className="label text-ember">{rule.k}</div>
                <p className="mt-3 max-w-sm text-sm leading-relaxed text-ash">
                  {rule.v}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function PlatformStrip() {
  const names = [
    "Customer support",
    "Lead follow-up",
    "Invoice review",
    "Meeting prep",
    "Weekly reports",
    "Slack summaries",
    "CRM updates",
    "Google Sheets",
    "Gmail",
    "Notion",
    "HubSpot",
    "Stripe",
    "Calendar",
    "Human approval",
  ]
  const items = [...names, ...names]
  return (
    <section className="border-hairline relative overflow-hidden border-y bg-coal/60 py-6 backdrop-blur">
      <div className="mx-auto flex max-w-[1440px] items-center gap-6 px-6 lg:px-10">
        <span className="label border-hairline shrink-0 border-r pr-6 text-ash">
          Common starting points
        </span>
        <div className="marquee-wrap relative flex-1 overflow-hidden">
          <div className="marquee">
            {items.map((n, i) => (
              <span
                key={`${n}-${i}`}
                className="font-display text-2xl font-medium whitespace-nowrap text-ash/70"
              >
                {n}
                <span className="mx-8 text-ember/60">/</span>
              </span>
            ))}
          </div>
          <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-coal to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-coal to-transparent" />
        </div>
      </div>
    </section>
  )
}

function Services() {
  const items: {
    icon: typeof Database
    n: string
    t: string
    p: string
    tags: string[]
    span: string
    accent?: boolean
  }[] = [
    {
      icon: ClipboardCheck,
      n: "01",
      t: "Workflow mapping",
      p: "We turn a messy repeated task into a simple map: inputs, decisions, outputs, approvals, and edge cases.",
      tags: ["task map", "owner review", "scope"],
      span: "md:col-span-4 lg:col-span-5",
      accent: true,
    },
    {
      icon: Plug,
      n: "02",
      t: "Tool connection",
      p: "We connect the assistant to the tools your team already uses: inboxes, chat, documents, spreadsheets, CRMs, and calendars.",
      tags: ["email", "chat", "crm"],
      span: "md:col-span-4 lg:col-span-4",
    },
    {
      icon: Sparkles,
      n: "03",
      t: "Agent build",
      p: "We build the OpenClaw agent, give it the right instructions, and test it against real examples from your business.",
      tags: ["assistant", "examples", "testing"],
      span: "md:col-span-4 lg:col-span-3",
    },
    {
      icon: LockKeyhole,
      n: "04",
      t: "Safety rules",
      p: "We define what the agent can do alone, what needs approval, and what should stay blocked.",
      tags: ["approval", "limits", "safety map"],
      span: "md:col-span-4 lg:col-span-4",
      accent: true,
    },
    {
      icon: GitBranch,
      n: "05",
      t: "Launch and handover",
      p: "Your team gets the working assistant, the setup, the plain-English guide, and a live walkthrough.",
      tags: ["handover", "guide", "owned"],
      span: "md:col-span-4 lg:col-span-3",
    },
    {
      icon: Gauge,
      n: "06",
      t: "Ongoing improvements",
      p: "After launch, we can tune prompts, add workflows, review failures, and keep the assistant useful as your work changes.",
      tags: ["tuning", "support", "new tasks"],
      span: "md:col-span-4 lg:col-span-5",
    },
  ]

  return (
    <section id="services" className="border-hairline relative border-t">
      <SectionHeader
        no="03"
        day="Build"
        kicker="What we set up"
        title={
          <>
            You bring the workflow.
            <br className="hidden md:block" /> We build the assistant.
          </>
        }
        lede="The technical OpenClaw setup happens behind the scenes. What you see is a working agent your team can actually use."
      />

      <div className="border-hairline mx-auto max-w-[1440px] border-x px-6 py-10 md:px-10 md:py-14">
        <PipelineGraph />
      </div>

      <Reveal
        as="div"
        stagger={70}
        className="border-hairline mx-auto grid max-w-[1440px] grid-cols-1 border-x border-t md:grid-cols-8 lg:grid-cols-12"
      >
        {items.map((s, i) => {
          const Icon = s.icon
          return (
            <article
              key={s.t}
              className={[
                "lift group border-hairline relative flex min-h-[280px] flex-col justify-between border-b p-8 hover:bg-surface-1/50 md:p-10",
                i % 2 === 0 ? "md:border-r" : "",
                s.span,
                s.accent ? "stripes" : "",
              ].join(" ")}
            >
              <div className="flex items-start justify-between">
                <div className="label text-ash">{s.n}</div>
                <Icon
                  strokeWidth={1.5}
                  className="h-5 w-5 text-ash transition-colors group-hover:text-ember"
                />
              </div>
              <div className="mt-12">
                <h3 className="font-display text-3xl font-medium tracking-tight md:text-[2.25rem]">
                  {s.t}
                </h3>
                <p className="mt-3 max-w-[52ch] text-sm leading-relaxed text-ash">
                  {s.p}
                </p>
              </div>
              <div className="mt-8 flex flex-wrap gap-1.5">
                {s.tags.map((t) => (
                  <span
                    key={t}
                    className="border-hairline rounded-sm border px-2 py-0.5 font-mono text-[10px] tracking-wider text-ash"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </article>
          )
        })}
      </Reveal>
    </section>
  )
}

function Process() {
  const steps = [
    {
      d: "15 min",
      t: "Free fit check",
      p: "We look at one repeated task and tell you if an agent is worth building, what it should handle, and where a human should approve.",
    },
    {
      d: "48 hours",
      t: "Blueprint the build",
      p: "You get OpenClaw agent setup, the workflow map, required tool connections, approval rules, savings estimate, and a fixed quote.",
    },
    {
      d: "5-7 days",
      t: "Launch starter agent",
      p: "A simple assistant goes live for one narrow workflow so your team can feel the value before committing to a larger automation program.",
    },
    {
      d: "10-14 days",
      t: "Build business agent",
      p: "For lower-risk operations, we add more guardrails, stricter approval paths, deeper testing, team training, and a plain operating guide.",
    },
  ]
  return (
    <section id="process" className="border-hairline relative border-t">
      <SectionHeader
        no="04"
        day="Cadence"
        kicker="5-14 day path"
        title={
          <>
            Start with a check.
            <br className="hidden md:block" /> Pay only when the case is clear.
          </>
        }
        lede="The entry path is intentionally small: prove one workflow, then expand only when the team sees the work coming off their plate."
      />
      <div className="border-hairline mx-auto max-w-[1440px] border-x">
        <Reveal
          as="ol"
          stagger={90}
          className="grid grid-cols-1 md:grid-cols-4"
        >
          {steps.map((s, i) => (
            <li
              key={s.t}
              className={`border-hairline relative flex flex-col gap-4 border-b p-8 md:border-b-0 md:p-10 ${
                i < steps.length - 1 ? "md:border-r" : ""
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="label text-ember">{s.d}</span>
                <span className="font-mono text-xs text-ash">
                  0{i + 1} / 04
                </span>
              </div>
              <div className="relative my-2 h-px bg-[rgb(245_235_220_/_0.12)]">
                <span
                  className="absolute top-1/2 left-0 h-2 w-2 -translate-y-1/2 rounded-full bg-ember"
                  style={{
                    boxShadow:
                      "0 0 10px color-mix(in oklch, var(--ember) 60%, transparent)",
                  }}
                />
              </div>
              <h4 className="font-display text-2xl font-medium tracking-tight">
                {s.t}
              </h4>
              <p className="text-sm leading-relaxed text-ash">{s.p}</p>
            </li>
          ))}
        </Reveal>
      </div>
    </section>
  )
}

function Pricing() {
  const tiers = [
    {
      name: "Free Fit Check",
      price: "$0",
      unit: "15 min",
      blurb: "For owners who want a quick yes/no before spending money.",
      features: [
        "Identify one repeated task",
        "Confirm if an agent is realistic",
        "Recommend the first workflow",
        "No technical prep needed",
      ],
      cta: "Check my workflow",
      featured: false,
    },
    {
      name: "Workflow Blueprint",
      price: "$299",
      unit: "48 hours",
      blurb:
        "OpenClaw agent setup plus the first workflow plan before a full build.",
      features: [
        "60-minute workflow interview",
        "OpenClaw agent setup included",
        "Workflow map and tool plan",
        "Multiple tool connections as needed",
        "Approval and guardrail plan",
        "Fixed build quote",
        "$299 credited toward build",
      ],
      cta: "Get blueprint",
      featured: false,
    },
    {
      name: "Starter Agent",
      price: "$1,499",
      unit: "5-7 days",
      blurb: "One simple assistant live for a narrow, repeatable workflow.",
      features: [
        "One simple workflow live",
        "OpenClaw setup included",
        "Multiple tools connected as needed",
        "Drafts, summaries, or task updates",
        "Basic guardrails and approval rule",
        "Plain operating guide",
        "14 days of fixes",
      ],
      cta: "Start small",
      featured: false,
    },
    {
      name: "Business Agent",
      price: "$3,499",
      unit: "10-14 days",
      blurb:
        "The recommended build when mistakes are costly and approvals matter.",
      features: [
        "One complete workflow live",
        "Multiple tools connected as needed",
        "OpenClaw setup included",
        "More guardrails for lower risk",
        "Approval rules for sensitive actions",
        "Team walkthrough",
        "30 days of fixes",
      ],
      cta: "Build business agent",
      featured: true,
    },
  ]
  const powerOffers = [
    {
      name: "Agency Agent Team",
      price: "$6,499",
      unit: "2-3 weeks",
      details: [
        "Multiple agents or workflows",
        "Tools connected per workflow need",
        "For development, research, design, SEO, or content teams",
        "Shared guardrail and approval system",
        "Basic KPI dashboard",
        "45 days of fixes",
      ],
    },
    {
      name: "Monthly Care",
      price: "$499/mo",
      unit: "after launch",
      details: [
        "Monitoring and small fixes",
        "Monthly guardrail review",
        "Support for questions",
        "Good for a stable first agent",
      ],
    },
    {
      name: "Improve Plan",
      price: "$999/mo",
      unit: "ongoing",
      details: [
        "Everything in Monthly Care",
        "One small improvement each month",
        "Agent and guardrail tune-ups",
        "Best for agencies adding workflows",
      ],
    },
    {
      name: "Partner Plan",
      price: "$1,999/mo",
      unit: "ongoing",
      details: [
        "Priority support",
        "Up to 2 improvements monthly",
        "New agent and workflow planning",
        "Best for agency multi-agent operations",
      ],
    },
  ]
  return (
    <section id="pricing" className="border-hairline relative border-t">
      <SectionHeader
        no="05"
        day="Pricing"
        kicker="Offers"
        title={
          <>
            Competitive entry.
            <br className="hidden md:block" /> Clear scope before big spend.
          </>
        }
        lede="Most teams should not start with a vague five-figure AI project. Start with setup and a scoped workflow, then pay more only when you need stronger guardrails or multiple agents."
      />
      <Reveal
        as="div"
        stagger={120}
        className="border-hairline mx-auto grid max-w-[1440px] grid-cols-1 border-x md:grid-cols-2 xl:grid-cols-4"
      >
        {tiers.map((t, i) => (
          <article
            key={t.name}
            className={[
              "lift border-hairline relative flex flex-col border-b p-8 md:p-10 xl:border-b-0",
              i % 2 === 0 ? "md:border-r" : "",
              i < tiers.length - 1 ? "xl:border-r" : "",
              t.featured ? "bg-surface-1/70" : "",
            ].join(" ")}
            style={
              t.featured
                ? {
                    boxShadow:
                      "inset 0 0 80px color-mix(in oklch, var(--ember) 8%, transparent)",
                  }
                : {}
            }
          >
            {t.featured && (
              <span className="label absolute top-6 right-6 rounded-sm border border-ember/60 bg-ember/10 px-2 py-1 text-ember">
                Most useful
              </span>
            )}
            <div className="label text-ash">{t.name}</div>
            <div className="mt-6 flex items-baseline gap-2">
              <span className="font-display text-6xl font-medium tracking-tight text-bone">
                {t.price}
              </span>
              <span className="font-mono text-xs text-ash">/ {t.unit}</span>
            </div>
            <p className="mt-4 max-w-xs text-sm text-ash">{t.blurb}</p>
            <ul className="mt-8 space-y-2.5 text-sm">
              {t.features.map((f) => (
                <li key={f} className="flex items-start gap-2.5">
                  <Check
                    className={`mt-0.5 h-4 w-4 shrink-0 ${
                      t.featured ? "text-ember" : "text-ash"
                    }`}
                  />
                  <span className={t.featured ? "text-bone" : "text-bone/80"}>
                    {f}
                  </span>
                </li>
              ))}
            </ul>
            <MagneticButton
              href={t.cta === "Check my workflow" ? "/assessment" : "#handover"}
              className={[
                "mt-10 inline-flex items-center justify-between rounded-sm px-4 py-3 text-sm",
                t.featured
                  ? "ember-glow bg-ember text-coal hover:brightness-110"
                  : "border-hairline border hover:border-bone/60",
              ].join(" ")}
            >
              {t.cta}
              <ArrowUpRight className="magnetic h-4 w-4" />
            </MagneticButton>
          </article>
        ))}
      </Reveal>
      <div className="border-hairline mx-auto max-w-[1440px] border-x border-t">
        <div className="grid grid-cols-1 md:grid-cols-12">
          <div className="border-hairline border-b p-8 md:col-span-4 md:border-r md:border-b-0 md:p-10">
            <div className="label text-ember">
              More power after the first win
            </div>
            <h3 className="mt-4 font-display text-3xl font-medium tracking-tight md:text-4xl">
              Expand only when the agent is earning its place.
            </h3>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-ash">
              Built for agencies that need more than one agent across
              development, research, design, SEO, content, and operations.
              Higher tiers add more guardrails, lower-risk approvals, and
              ongoing improvement.
            </p>
          </div>
          <div className="grid grid-cols-1 md:col-span-8 md:grid-cols-2">
            {powerOffers.map((offer, i) => (
              <article
                key={offer.name}
                className={[
                  "p-8 md:p-10",
                  i < powerOffers.length - 1 ? "border-hairline border-b" : "",
                  i === 2 ? "md:border-b-0" : "",
                  i % 2 === 0 ? "md:border-r" : "",
                ].join(" ")}
              >
                <div className="flex flex-wrap items-baseline justify-between gap-3">
                  <div className="label text-ash">{offer.name}</div>
                  <div className="font-mono text-xs text-ash">{offer.unit}</div>
                </div>
                <div className="mt-4 font-display text-4xl font-medium tracking-tight text-bone">
                  {offer.price}
                </div>
                <ul className="mt-6 space-y-2 text-sm text-bone/80">
                  {offer.details.map((detail) => (
                    <li key={detail} className="flex items-start gap-2.5">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-ash" />
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
        <div className="border-hairline border-t px-8 py-5">
          <p className="label text-ash">
            Fixed scopes protect the low entry price. Platform subscriptions,
            paid APIs, and unusually complex integrations are quoted separately
            before work starts.
          </p>
        </div>
      </div>
    </section>
  )
}

function Faq() {
  const items = [
    {
      q: "What is OpenClaw, in plain English?",
      a: "OpenClaw is open-source software for running AI agents. We use it as the engine for assistants that can work across your tools, while you keep ownership of the setup.",
    },
    {
      q: "Do we need a technical team?",
      a: "No. You need to know the workflow you want help with. We handle setup, connections, agent instructions, safety rules, testing, and handover.",
    },
    {
      q: "Why is the entry price so low?",
      a: "The first step is tightly scoped. A free fit check or $299 blueprint helps both sides avoid a vague, expensive project. The $299 blueprint includes OpenClaw agent setup, required tool connections for the workflow, and the plan for the safer full build.",
    },
    {
      q: "What counts as a simple workflow?",
      a: "A simple workflow has one main trigger and one clear output, even if it needs multiple connected tools. Examples include drafting support replies, summarizing leads, updating a sheet, or preparing a weekly report.",
    },
    {
      q: "Why do higher plans cost more?",
      a: "Higher plans are not just more tools. They include more guardrails, lower-risk approval paths, deeper testing, clearer handover, and support for agencies that need multiple agents across development, research, design, SEO, content, or operations.",
    },
    {
      q: "What costs are not included?",
      a: "Third-party software subscriptions, paid API usage, unusual enterprise security reviews, and complex custom integrations are not bundled into the low fixed prices. We call those out before work starts.",
    },
    {
      q: "What should we automate first?",
      a: "Start with a repeated task that has clear inputs and a human review step: support replies, lead follow-up, invoice review, meeting prep, weekly reporting, or CRM updates.",
    },
    {
      q: "Can the assistant make mistakes?",
      a: "Yes, which is why we design it around drafts, summaries, checklists, and approval rules. Sensitive actions can require a human click before anything happens.",
    },
    {
      q: "Will this replace our people?",
      a: "The first agent should remove repetitive prep work, not remove judgment. Your team still decides, approves, and handles edge cases.",
    },
    {
      q: "What do we own at the end?",
      a: "You own the OpenClaw setup, agent instructions, connected workflow, approval rules, operating guide, and handover notes.",
    },
  ]
  return (
    <section id="faq" className="border-hairline relative border-t">
      <SectionHeader
        no="06"
        day="Reference"
        kicker="FAQ"
        title={
          <>
            Plain answers
            <span className="font-serif-italic font-normal text-ash">
              {" "}
              before the call.
            </span>
          </>
        }
      />
      <div className="border-hairline mx-auto max-w-[1440px] border-x">
        <div className="divide-y divide-[rgb(245_235_220_/_0.08)]">
          {items.map((it, i) => (
            <details
              key={it.q}
              className="group px-6 py-6 transition-colors open:bg-surface-1/40 md:px-10 md:py-7"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6">
                <span className="flex items-center gap-6">
                  <span className="label w-10 shrink-0 text-ash">0{i + 1}</span>
                  <span className="font-display text-xl font-medium tracking-tight text-bone md:text-2xl">
                    {it.q}
                  </span>
                </span>
                <ChevronDown
                  className="h-5 w-5 shrink-0 text-ash group-open:-rotate-180 group-open:text-ember"
                  style={{
                    transition:
                      "transform 320ms cubic-bezier(0.32, 0.72, 0, 1), color 220ms cubic-bezier(0.22, 1, 0.36, 1)",
                  }}
                />
              </summary>
              <div className="faq-body">
                <p className="mt-4 max-w-3xl pl-0 text-sm leading-relaxed text-ash md:pl-16">
                  {it.a}
                </p>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}

function Handover() {
  return (
    <section
      id="handover"
      className="border-hairline relative isolate overflow-hidden border-t"
    >
      <div className="spotlight absolute inset-0 -z-10 opacity-80" />
      <div className="bg-grid absolute inset-0 -z-10 opacity-30" />
      <div className="border-hairline mx-auto grid max-w-[1440px] grid-cols-12 border-x">
        <div className="col-span-12 px-6 py-24 md:col-span-8 md:px-12 md:py-32">
          <div className="label mb-8 flex items-center gap-3 text-ash">
            <span>07 / start</span>
            <span className="hidden h-[10px] w-px bg-[rgb(245_235_220_/_0.15)] md:block" />
            <span className="hidden text-[9px] md:inline">
              bring one task /{" "}
              <span className="text-live">leave with a plan</span>
            </span>
          </div>
          <h2 className="font-display text-[clamp(2.5rem,5.6vw,5rem)] leading-[0.95] font-medium tracking-[-0.035em]">
            What task should
            <br />
            your team stop
            <br />
            <span
              className="font-serif-italic font-normal text-ember"
              style={{
                textShadow:
                  "0 0 40px color-mix(in oklch, var(--ember) 38%, transparent), 0 0 80px color-mix(in oklch, var(--ember) 18%, transparent)",
              }}
            >
              doing by hand?
            </span>
          </h2>
          <p className="mt-8 max-w-xl text-lg leading-relaxed text-ash">
            Send us the repeated workflow: the messages, spreadsheets, tools,
            approvals, and annoying steps. We will tell you what an OpenClaw
            assistant can safely handle first, starting with a free fit check.
          </p>
          <div className="mt-12 flex flex-wrap items-center gap-3">
            <MagneticButton
              href="/assessment"
              className="ember-glow inline-flex items-center gap-2 rounded-sm bg-ember px-6 py-3.5 text-sm font-medium text-coal hover:brightness-110"
            >
              Check my workflow
              <ArrowUpRight className="magnetic h-4 w-4" />
            </MagneticButton>
            <MagneticButton
              href="mailto:crew@openclaw.dev?subject=Workflow%20blueprint"
              className="border-hairline inline-flex items-center gap-2 rounded-sm border px-6 py-3.5 text-sm hover:border-bone/60"
              strength={4}
            >
              Get $299 blueprint
            </MagneticButton>
          </div>
        </div>
        <aside className="border-hairline col-span-12 flex flex-col justify-between border-t px-6 py-12 md:col-span-4 md:border-t-0 md:border-l md:px-10 md:py-32">
          <div>
            <div className="label text-ash">First call output</div>
            <div className="mt-3 font-display text-5xl font-medium tracking-tight text-bone">
              Workflow map
            </div>
            <div className="mt-1 font-mono text-xs text-ash">
              task / tools / approvals / first agent
            </div>
          </div>
          <div className="mt-10 space-y-4">
            {[
              ["Bring", "one repeated task"],
              ["Get", "a buildable assistant plan"],
              ["Decide", "blueprint, starter, or business build"],
            ].map(([k, v]) => (
              <div
                key={k}
                className="border-hairline flex items-center justify-between border-t pt-4"
              >
                <span className="label text-ash">{k}</span>
                <span className="text-sm text-bone/80">{v}</span>
              </div>
            ))}
          </div>
        </aside>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="border-hairline relative border-t bg-coal">
      <div className="border-hairline mx-auto max-w-[1440px] border-x px-6 py-14 md:px-10">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-5">
          <div className="col-span-2">
            <div className="flex items-center gap-2.5">
              <Mark />
              <span className="font-display text-2xl font-medium tracking-tight">
                OpenClaw Services
              </span>
            </div>
            <p className="mt-5 max-w-xs text-sm text-ash">
              Done-for-you OpenClaw assistants for support, sales, finance,
              operations, and founder workflows.
            </p>
            <div className="label mt-8 flex items-center gap-2 text-ash">
              <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-live" />
              Built for non-technical teams
            </div>
          </div>

          {[
            {
              h: "Agents",
              l: [
                "Support",
                "Sales follow-up",
                "Finance admin",
                "Operations",
                "Founder briefings",
              ],
            },
            {
              h: "Company",
              l: ["Examples", "Safety", "Process", "Pricing", "Fit check"],
            },
            {
              h: "Safety",
              l: [
                "Approvals",
                "Blocked actions",
                "Ownership",
                "Blueprint",
                "Guide",
              ],
            },
          ].map((c) => (
            <div key={c.h}>
              <div className="label text-ash">{c.h}</div>
              <ul className="mt-5 space-y-2.5 text-sm">
                {c.l.map((x) => (
                  <li key={x}>
                    <a href="#" className="text-ash transition hover:text-bone">
                      {x}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="rule mt-12" />

        <div className="mt-6 flex flex-col items-start justify-between gap-4 font-mono text-[11px] text-ash md:flex-row md:items-center">
          <span>
            (c) {new Date().getFullYear()} OpenClaw Services, LLC / remote
            implementation crew
          </span>
          <span className="flex items-center gap-5">
            <span>v5.1.0</span>
            <span>build / business-workflows</span>
            <a href="#" className="press hover:text-bone">
              status.openclaw.dev
            </a>
          </span>
        </div>
      </div>

      <div className="border-hairline pointer-events-none overflow-hidden border-t select-none">
        <div className="mx-auto max-w-[1440px] px-4">
          <div className="flex justify-center py-6 font-display text-[clamp(4rem,18vw,18rem)] leading-[0.8] font-medium tracking-[-0.06em] text-bone/[0.05]">
            openclaw
          </div>
        </div>
      </div>
    </footer>
  )
}

function SectionHeader({
  no,
  day,
  kicker,
  title,
  lede,
}: {
  no: string
  day?: string
  kicker: string
  title: React.ReactNode
  lede?: string
}) {
  return (
    <div className="border-hairline mx-auto grid max-w-[1440px] grid-cols-12 border-x">
      <div className="border-hairline col-span-12 grid grid-cols-12 border-b">
        <div className="col-span-12 flex items-center justify-between px-6 py-5 md:px-10">
          <span className="label flex items-center gap-3 text-ash">
            <span>
              {no} / {kicker}
            </span>
            {day && (
              <>
                <span className="hidden h-[10px] w-px bg-[rgb(245_235_220_/_0.15)] md:block" />
                <span className="hidden text-ember md:inline">{day}</span>
              </>
            )}
          </span>
          <span className="label hidden text-ash md:inline">
            openclaw / services
          </span>
        </div>
      </div>
      <div className="col-span-12 grid grid-cols-12 gap-0 px-6 py-20 md:px-10 md:py-28">
        <h2 className="col-span-12 font-display text-[clamp(2.25rem,4.8vw,4.5rem)] leading-[0.94] font-medium tracking-[-0.035em] md:col-span-8">
          {title}
        </h2>
        {lede && (
          <p className="col-span-12 mt-8 max-w-md self-end text-base leading-relaxed text-ash md:col-span-4 md:mt-0 md:pl-10">
            {lede}
          </p>
        )}
      </div>
    </div>
  )
}
