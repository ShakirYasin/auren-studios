import {
  ArrowUpRight,
  Check,
  ChevronDown,
  CircleDot,
  Database,
  GitBranch,
  Gauge,
  Layers,
  Plug,
  Shield,
  Workflow,
  Zap,
} from "lucide-react"

import { Reveal } from "@/components/reveal"
import { MagneticButton } from "@/components/openclaw/magnetic-button"
import { Terminal } from "@/components/openclaw/terminal"
import { RFCDocument } from "@/components/openclaw/rfc-document"
import { PipelineGraph } from "@/components/openclaw/pipeline-graph"
import { LiveCounter } from "@/components/openclaw/live-counter"
import { SLODial } from "@/components/openclaw/slo-dial"
import { SoundToggle } from "@/components/openclaw/sound-toggle"
import { LiveClock } from "@/components/openclaw/live-clock"
import { DayRailMobile } from "@/components/openclaw/day-rail"

export default function Page() {
  return (
    <main className="relative z-10 min-h-svh bg-transparent text-bone">
      <DayRailMobile />
      <Nav />
      <Hero />
      <Logos />
      <Scoping />
      <Services />
      <Process />
      <Stats />
      <Pricing />
      <Testimonials />
      <Faq />
      <Handover />
      <Footer />
    </main>
  )
}

/* -------------------------------------------------------------------------- */
/*  NAV                                                                       */
/* -------------------------------------------------------------------------- */

function Nav() {
  return (
    <header className="sticky top-0 z-40 border-b border-hairline bg-coal/55 backdrop-blur-xl">
      <div className="mx-auto flex h-14 max-w-[1440px] items-center justify-between px-6 lg:px-10">
        <a href="#" className="flex items-center gap-2.5">
          <Mark />
          <span className="font-display text-xl font-medium leading-none tracking-tight">
            Openclaw
          </span>
          <span className="label ml-2 hidden md:inline">
            <span className="inline-block h-1.5 w-1.5 translate-y-[-1px] rounded-full bg-ember pulse-dot" />
            <span className="ml-2 text-ash">Shipping · Q2</span>
          </span>
        </a>
        <nav className="hidden items-center gap-8 text-sm md:flex">
          {[
            ["Scoping", "scoping"],
            ["Build", "services"],
            ["Pricing", "pricing"],
            ["Work", "work"],
            ["Handover", "handover"],
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
          <span className="label hidden items-center gap-2 rounded-full border border-hairline px-3 py-1.5 md:inline-flex">
            <span className="h-1.5 w-1.5 rounded-full bg-live pulse-dot" />
            <span className="text-ash">all systems · ok</span>
          </span>
          <SoundToggle />
          <MagneticButton
            href="#handover"
            className="inline-flex items-center gap-1.5 rounded-full bg-bone px-4 py-1.5 text-sm font-medium text-coal hover:bg-ember hover:text-coal"
          >
            Book a call
            <ArrowUpRight className="h-3.5 w-3.5 magnetic" />
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
        boxShadow: "inset 0 0 12px color-mix(in oklch, var(--ember) 35%, transparent)",
      }}
    >
      <svg
        viewBox="0 0 24 24"
        className="h-4 w-4 text-ember"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      >
        <path d="M4 20 L10 4" />
        <path d="M10 20 L16 4" />
        <path d="M16 20 L20 12" />
        <path d="M3 14 H21" />
      </svg>
    </span>
  )
}

/* -------------------------------------------------------------------------- */
/*  HERO — DAY 0                                                              */
/* -------------------------------------------------------------------------- */

const HERO_LOG: { text: string; kind?: "prompt" | "step" | "ok" | "warn" | "final" }[] = [
  { text: "openclaw init --pipeline=ingest --client=acme", kind: "prompt" },
  { text: "provisioning airflow · eks · spot", kind: "step" },
  { text: "wiring kafka → s3 → iceberg", kind: "step" },
  { text: "dbt models · 41 tests · green", kind: "ok" },
  { text: "grafana board pinned", kind: "ok" },
  { text: "shipped in 7d 04h 12m · slo 99.973% · cost $412.80/mo", kind: "final" },
]

function Hero() {
  return (
    <section id="hero" className="relative isolate">
      <div className="absolute inset-0 -z-10 bg-grid opacity-40" />
      <div className="absolute inset-x-0 top-0 -z-10 h-[120%] bg-gradient-to-b from-transparent via-transparent to-coal" />

      <div className="mx-auto grid max-w-[1440px] grid-cols-12 gap-0 border-x border-hairline px-0">
        <aside className="col-span-12 hidden border-r border-hairline px-4 py-6 md:col-span-1 md:block">
          <div className="label rotate-180 [writing-mode:vertical-rl] text-ash">
            § 00 / openclaw.services
          </div>
        </aside>

        <div className="col-span-12 md:col-span-11">
          <div className="grid grid-cols-12 gap-0">
            <div className="col-span-12 border-b border-hairline px-6 py-5 md:px-10">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="label flex items-center gap-3 text-ash">
                  <span>§ 00 · day 0 · scope</span>
                  <span className="hidden h-[10px] w-px bg-[rgb(245_235_220_/_0.15)] md:block" />
                  <span className="hidden text-[9px] md:inline">
                    <LiveClock /> · pipeline.status
                    <span className="text-ember"> idle</span> · awaiting kickoff
                  </span>
                </div>
                <div className="label text-ash">Edition 04 · Vol. ii</div>
              </div>
            </div>

            <div className="relative col-span-12 px-6 pt-14 pb-10 md:col-span-8 md:px-10 md:pt-28 md:pb-24 lg:pt-32">
              <div className="label mb-8 inline-flex items-center gap-2 text-ash">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-ember pulse-dot" />
                Booking May cohort — 3 slots left
              </div>

              <h1 className="font-display text-[clamp(2.75rem,7vw,7rem)] font-medium leading-[0.88] tracking-[-0.04em] rise">
                Pipelines,
                <br />
                <span
                  className="font-serif-italic font-normal text-ember"
                  style={{
                    textShadow:
                      "0 0 40px color-mix(in oklch, var(--ember) 42%, transparent), 0 0 80px color-mix(in oklch, var(--ember) 18%, transparent)",
                  }}
                >
                  shipped
                </span>
                <span className="text-ash/70"> — </span>not
                <br />
                scheduled.
              </h1>

              <p
                className="mt-10 max-w-xl text-lg leading-relaxed text-ash rise"
                style={{ animationDelay: "140ms" }}
              >
                Openclaw is a small, senior crew that stands up production data
                and ML pipelines in{" "}
                <span className="text-bone">days, not quarters.</span> Flat
                pricing, open-source first, and every artefact handed over —
                repo, runbook, and keys.
              </p>

              <div
                className="mt-10 flex flex-wrap items-center gap-3 rise"
                style={{ animationDelay: "240ms" }}
              >
                <MagneticButton
                  href="#handover"
                  className="inline-flex items-center gap-2 rounded-sm bg-ember px-5 py-3 text-sm font-medium text-coal ember-glow hover:brightness-110"
                >
                  Start a pipeline
                  <ArrowUpRight className="h-4 w-4 magnetic" />
                </MagneticButton>
                <MagneticButton
                  href="#services"
                  className="inline-flex items-center gap-2 rounded-sm border border-hairline px-5 py-3 text-sm text-bone hover:border-bone/60"
                  strength={4}
                >
                  See the 10-day build
                </MagneticButton>
                <span className="label ml-2 hidden text-ash md:inline">
                  avg. ship time · 9.2 days
                </span>
              </div>

              <dl
                className="mt-16 grid max-w-2xl grid-cols-3 gap-0 rise"
                style={{ animationDelay: "320ms" }}
              >
                <StatCell k="Pipelines shipped" v={247} />
                <StatCell k="Median cost cut" v={61.4} suffix="%" decimals={1} variance={0.05} border />
                <StatCell k="Contractual SLO" v={99.973} suffix="%" decimals={3} variance={0.005} border />
              </dl>
            </div>

            {/* artefact.log */}
            <aside className="relative col-span-12 flex flex-col border-t border-hairline px-6 py-10 md:col-span-4 md:border-t-0 md:border-l md:px-6 md:py-14">
              <div className="mb-4">
                <Terminal lines={HERO_LOG} title="artefact.log · ingest" />
              </div>

              <div className="mt-8 space-y-3">
                {[
                  { icon: GitBranch, k: "repo", v: "handed over, day one" },
                  { icon: Shield, k: "SOC2", v: "runbooks + access review" },
                  { icon: Gauge, k: "observability", v: "metrics · logs · traces" },
                ].map(({ icon: Icon, k, v }) => (
                  <div key={k} className="flex items-start gap-3">
                    <Icon className="mt-0.5 h-4 w-4 text-ember" strokeWidth={1.5} />
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
                  &ldquo;Felt like hiring a staff engineer for a week.&rdquo; —{" "}
                  <span className="text-bone/80">
                    Ines Vasconcelos, Head of Data · Nox
                  </span>
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
  suffix,
  decimals,
  variance,
  border,
}: {
  k: string
  v: number
  suffix?: string
  decimals?: number
  variance?: number
  border?: boolean
}) {
  return (
    <div className={`px-1 ${border ? "border-l border-hairline pl-6" : ""}`}>
      <dt className="label text-ash">{k}</dt>
      <dd className="font-display mt-2 text-4xl font-medium leading-none tracking-tight text-bone">
        <LiveCounter
          value={v}
          suffix={suffix}
          decimals={decimals}
          variance={variance}
        />
      </dd>
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/*  LOGO MARQUEE                                                              */
/* -------------------------------------------------------------------------- */

function Logos() {
  const names = [
    "Northwind Labs",
    "Helios AI",
    "Parallax",
    "Drift / Delta",
    "Meridian",
    "Corvus",
    "Lumen Bio",
    "Fieldnote",
    "Astra Logistics",
    "Pagefold",
  ]
  const items = [...names, ...names]
  return (
    <section className="relative overflow-hidden border-y border-hairline bg-coal/60 py-6 backdrop-blur">
      <div className="mx-auto flex max-w-[1440px] items-center gap-6 px-6 lg:px-10">
        <span className="label shrink-0 border-r border-hairline pr-6 text-ash">
          Trusted by ops & data teams
        </span>
        <div className="marquee-wrap relative flex-1 overflow-hidden">
          <div className="marquee">
            {items.map((n, i) => (
              <span
                key={i}
                className="font-display whitespace-nowrap text-2xl font-medium text-ash/70"
              >
                {n}
                <span className="mx-8 text-ember/60">✦</span>
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

/* -------------------------------------------------------------------------- */
/*  SCOPING — DAY 1-2                                                         */
/* -------------------------------------------------------------------------- */

function Scoping() {
  return (
    <section id="scoping" className="relative border-t border-hairline">
      <SectionHeader
        no="§ 01"
        day="Day 01 — 02"
        kicker="Scoping & Architecture"
        title={
          <>
            The RFC comes{" "}
            <span className="font-serif-italic font-normal text-ember">before</span>
            <br />a single line of Terraform.
          </>
        }
        lede="60-minute call, then an RFC you'd actually read. Cost estimate, tool matrix, trade-offs. Nothing gets built before you sign off."
      />
      <div className="mx-auto grid max-w-[1440px] grid-cols-1 border-x border-hairline md:grid-cols-12">
        <div className="col-span-1 border-b border-hairline p-8 md:col-span-7 md:border-b-0 md:border-r md:p-12">
          <RFCDocument />
        </div>
        <div className="col-span-1 p-8 md:col-span-5 md:p-12">
          <div className="space-y-8">
            {[
              {
                k: "60 minutes",
                v: "scoping call",
                p: "We sketch the diagram, name the trade-offs, quote flat. If it's wrong for us, we say so.",
              },
              {
                k: "written",
                v: "RFC, not slides",
                p: "A document you can annotate, share, and archive. No recurring status meeting.",
              },
              {
                k: "signed off",
                v: "before build",
                p: "You approve the architecture and the cost envelope. We stake our fee on it.",
              },
            ].map((s) => (
              <div key={s.k} className="border-t border-hairline pt-6 first:border-t-0 first:pt-0">
                <div className="label text-ember">{s.k}</div>
                <div className="font-display mt-2 text-2xl tracking-tight text-bone">
                  {s.v}
                </div>
                <p className="mt-3 max-w-sm text-sm leading-relaxed text-ash">
                  {s.p}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/* -------------------------------------------------------------------------- */
/*  SERVICES — DAY 3-8 — Pipeline self-assembles                              */
/* -------------------------------------------------------------------------- */

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
      icon: Database,
      n: "01",
      t: "Ingestion",
      p: "Kafka, Kinesis, Debezium, Fivetran — we pick the cheap one that actually fits the throughput you have.",
      tags: ["kafka", "cdc", "batch"],
      span: "md:col-span-4 lg:col-span-5",
      accent: true,
    },
    {
      icon: Workflow,
      n: "02",
      t: "Orchestration",
      p: "Airflow, Dagster, or Temporal. Opinionated DAGs, retries, lineage, and SLAs wired on day one.",
      tags: ["airflow", "dagster", "cron"],
      span: "md:col-span-4 lg:col-span-4",
    },
    {
      icon: Layers,
      n: "03",
      t: "Warehouse & Lake",
      p: "BigQuery, Snowflake, Iceberg on S3. Partitioning, clustering, storage class — tuned to your bill.",
      tags: ["iceberg", "bq", "dbt"],
      span: "md:col-span-4 lg:col-span-3",
    },
    {
      icon: Zap,
      n: "04",
      t: "ML pipelines",
      p: "Feature stores, training loops, and model serving on Modal, Ray, or SageMaker. Reproducible by default.",
      tags: ["feast", "modal", "ray"],
      span: "md:col-span-4 lg:col-span-4",
    },
    {
      icon: Plug,
      n: "05",
      t: "Integrations",
      p: "Webhooks, APIs, event busses. The connective tissue that usually gets left for &ldquo;next sprint&rdquo;.",
      tags: ["rest", "grpc", "sqs"],
      span: "md:col-span-4 lg:col-span-3",
    },
    {
      icon: Shield,
      n: "06",
      t: "Reliability",
      p: "SLOs, alerting, on-call playbooks, chaos-tested runbooks. We break it before your customers do.",
      tags: ["slo", "oncall", "chaos"],
      span: "md:col-span-4 lg:col-span-5",
      accent: true,
    },
  ]

  return (
    <section id="services" className="relative border-t border-hairline">
      <SectionHeader
        no="§ 02"
        day="Day 03 — 08"
        kicker="The Build"
        title={
          <>
            Six crafts.{" "}
            <span className="font-serif-italic font-normal text-ash">One crew.</span>
          </>
        }
        lede="We don't do slides. Every engagement ends with a running system, a handover doc, and a git sha you own."
      />

      {/* Pipeline assembly graph */}
      <div className="mx-auto max-w-[1440px] border-x border-hairline px-6 py-10 md:px-10 md:py-14">
        <PipelineGraph />
      </div>

      <Reveal
        as="div"
        stagger={70}
        className="mx-auto grid max-w-[1440px] grid-cols-1 border-x border-t border-hairline md:grid-cols-8 lg:grid-cols-12"
      >
        {items.map((s, i) => {
          const Icon = s.icon
          return (
            <article
              key={s.t}
              className={[
                "lift group relative flex min-h-[280px] flex-col justify-between border-b border-hairline p-8 hover:bg-surface-1/50 md:p-10",
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
                <p
                  className="mt-3 max-w-[52ch] text-sm leading-relaxed text-ash"
                  dangerouslySetInnerHTML={{ __html: s.p }}
                />
              </div>
              <div className="mt-8 flex flex-wrap gap-1.5">
                {s.tags.map((t) => (
                  <span
                    key={t}
                    className="rounded-sm border border-hairline px-2 py-0.5 font-mono text-[10px] tracking-wider text-ash"
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

/* -------------------------------------------------------------------------- */
/*  PROCESS                                                                   */
/* -------------------------------------------------------------------------- */

function Process() {
  const steps = [
    {
      d: "Day 0",
      t: "Scoping call",
      p: "60 minutes. We sketch the diagram, name the trade-offs, and quote flat. If it's wrong for us, we say so.",
    },
    {
      d: "Day 1–2",
      t: "Architecture",
      p: "Written RFC. Cost estimate. Tool matrix with reasons. Nothing gets built before you sign off.",
    },
    {
      d: "Day 3–8",
      t: "Build & wire",
      p: "You're in the Slack channel. Daily loom. Staging environment goes up on day four, instrumented from day one.",
    },
    {
      d: "Day 9–10",
      t: "Harden & hand over",
      p: "Load test, chaos test, runbook, on-call rotation, and a walkthrough. Then your team owns it — with us on standby.",
    },
  ]
  return (
    <section id="process" className="relative border-t border-hairline">
      <SectionHeader
        no="§ 03"
        day="Cadence"
        kicker="Process"
        title={
          <>
            Ten working days,
            <br className="hidden md:block" />{" "}
            <span className="font-serif-italic font-normal text-ember">honestly priced.</span>
          </>
        }
        lede="No discovery quarter. No status-meeting tax. One sprint, one artefact, one price."
      />
      <div className="mx-auto max-w-[1440px] border-x border-hairline">
        <Reveal as="ol" stagger={90} className="grid grid-cols-1 md:grid-cols-4">
          {steps.map((s, i) => (
            <li
              key={s.t}
              className={`relative flex flex-col gap-4 border-b border-hairline p-8 md:border-b-0 md:p-10 ${
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
                  className="absolute left-0 top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-ember"
                  style={{
                    boxShadow: "0 0 10px color-mix(in oklch, var(--ember) 60%, transparent)",
                  }}
                />
              </div>
              <h4 className="font-display text-2xl font-medium tracking-tight">{s.t}</h4>
              <p className="text-sm leading-relaxed text-ash">{s.p}</p>
            </li>
          ))}
        </Reveal>
      </div>
    </section>
  )
}

/* -------------------------------------------------------------------------- */
/*  STATS — DAY 8 Telemetry                                                   */
/* -------------------------------------------------------------------------- */

function Stats() {
  return (
    <section id="stats" className="relative border-t border-hairline">
      <SectionHeader
        no="§ 04"
        day="Day 08"
        kicker="Telemetry"
        title={
          <>
            The system,{" "}
            <span className="font-serif-italic font-normal text-ember">instrumented.</span>
          </>
        }
        lede="Every number on this page is measured from our last 42 engagements. We print the variance, not just the headline."
      />
      <div className="mx-auto max-w-[1440px] border-x border-hairline">
        <Reveal as="div" stagger={120} className="grid grid-cols-1 md:grid-cols-4">
          <TelemetryCell
            k="Median ship time"
            value={9.2}
            suffix="d"
            decimals={1}
            sub="scope → prod · n=38"
            variance={0.03}
          />
          <TelemetryCell
            k="Cost reduction"
            value={61.4}
            suffix="%"
            decimals={1}
            sub="avg across 42 audits"
            variance={0.04}
            border
          />
          <TelemetryCellSLO />
          <TelemetryCell
            k="Handover rate"
            value={1.0}
            decimals={2}
            sub="every artefact · yours"
            border
          />
        </Reveal>
      </div>
    </section>
  )
}

function TelemetryCell({
  k,
  value,
  suffix,
  decimals,
  sub,
  variance,
  border,
}: {
  k: string
  value: number
  suffix?: string
  decimals?: number
  sub: string
  variance?: number
  border?: boolean
}) {
  return (
    <div
      className={`relative p-8 md:p-12 ${
        border ? "border-t border-hairline md:border-l md:border-t-0" : ""
      }`}
    >
      <div className="label text-ash">{k}</div>
      <div className="font-display mt-4 text-6xl font-medium leading-none tracking-tight text-bone">
        <LiveCounter
          value={value}
          suffix={suffix}
          decimals={decimals}
          variance={variance}
        />
      </div>
      <div className="mt-3 font-mono text-[11px] text-ash">{sub}</div>
      {variance !== undefined && (
        <div className="mt-4 h-[18px] w-24">
          <MiniWave />
        </div>
      )}
    </div>
  )
}

function TelemetryCellSLO() {
  return (
    <div className="relative p-8 md:p-12 border-t border-hairline md:border-l md:border-t-0">
      <div className="label text-ash">Contractual SLO</div>
      <div className="mt-4">
        <SLODial />
      </div>
      <div className="mt-3 font-mono text-[11px] text-ash">
        p99 · uptime · 90d rolling
      </div>
    </div>
  )
}

function MiniWave() {
  return (
    <svg viewBox="0 0 100 18" className="h-full w-full">
      <defs>
        <linearGradient id="wv" x1="0" x2="1">
          <stop offset="0" stopColor="transparent" />
          <stop offset="0.1" stopColor="var(--ember)" />
          <stop offset="1" stopColor="var(--amber-glow)" />
        </linearGradient>
      </defs>
      <path
        d="M0 9 Q 10 4, 20 9 T 40 9 T 60 9 T 80 9 T 100 9"
        stroke="url(#wv)"
        strokeWidth="1.25"
        fill="none"
      >
        <animate
          attributeName="d"
          dur="5s"
          repeatCount="indefinite"
          values="
            M0 9 Q 10 4, 20 9 T 40 9 T 60 9 T 80 9 T 100 9;
            M0 9 Q 10 14, 20 9 T 40 6 T 60 12 T 80 7 T 100 9;
            M0 9 Q 10 4, 20 9 T 40 9 T 60 9 T 80 9 T 100 9"
        />
      </path>
    </svg>
  )
}

/* -------------------------------------------------------------------------- */
/*  PRICING — DAY 9                                                           */
/* -------------------------------------------------------------------------- */

function Pricing() {
  const tiers = [
    {
      name: "Diagnostic",
      price: "$1,900",
      unit: "one-time",
      blurb: "Audit your current stack, find the leaks, leave a written report.",
      features: [
        "Architecture review",
        "Cost + bottleneck audit",
        "Tooling recommendation",
        "Async delivery in 5 days",
      ],
      cta: "Start audit",
      featured: false,
    },
    {
      name: "Pipeline",
      price: "$12k",
      unit: "flat · 10 days",
      blurb: "One production pipeline, built and handed over. The core offer.",
      features: [
        "Full build + staging",
        "Runbook + observability",
        "30-day warranty",
        "Direct Slack channel",
        "Repo + IaC handover",
      ],
      cta: "Book pipeline",
      featured: true,
    },
    {
      name: "Retainer",
      price: "$6k",
      unit: "per month",
      blurb: "On-call engineering for teams already running on what we built.",
      features: [
        "Up to 20h / month",
        "Incident response",
        "Quarterly roadmap review",
        "No rollover lock-in",
      ],
      cta: "Talk retainer",
      featured: false,
    },
  ]
  return (
    <section id="pricing" className="relative border-t border-hairline">
      <SectionHeader
        no="§ 05"
        day="Day 09"
        kicker="The Invoice, Published"
        title={
          <>
            Flat rates.{" "}
            <span className="font-serif-italic font-normal text-ash">No surprises.</span>
          </>
        }
        lede="Published numbers. The same price whether you're seed or post-B. We win on speed, not quotes."
      />
      <Reveal as="div" stagger={120} className="mx-auto grid max-w-[1440px] grid-cols-1 border-x border-hairline md:grid-cols-3">
        {tiers.map((t, i) => (
          <article
            key={t.name}
            className={[
              "lift relative flex flex-col p-8 md:p-12",
              i < tiers.length - 1 ? "border-b border-hairline md:border-b-0 md:border-r" : "",
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
              <span className="label absolute right-6 top-6 rounded-sm border border-ember/60 bg-ember/10 px-2 py-1 text-ember">
                ★ most booked
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
                    className={`mt-0.5 h-4 w-4 shrink-0 ${t.featured ? "text-ember" : "text-ash"}`}
                  />
                  <span className={t.featured ? "text-bone" : "text-bone/80"}>{f}</span>
                </li>
              ))}
            </ul>
            <MagneticButton
              href="#handover"
              className={[
                "mt-10 inline-flex items-center justify-between rounded-sm px-4 py-3 text-sm",
                t.featured
                  ? "bg-ember text-coal ember-glow hover:brightness-110"
                  : "border border-hairline hover:border-bone/60",
              ].join(" ")}
            >
              {t.cta}
              <ArrowUpRight className="h-4 w-4 magnetic" />
            </MagneticButton>
          </article>
        ))}
      </Reveal>
      <div className="mx-auto max-w-[1440px] border-x border-t border-hairline px-8 py-5">
        <p className="label text-ash">
          Invoiced in USD · NET15 · cancel anytime · no lock-in, no retainer
          minimums
        </p>
      </div>
    </section>
  )
}

/* -------------------------------------------------------------------------- */
/*  TESTIMONIALS                                                              */
/* -------------------------------------------------------------------------- */

function Testimonials() {
  const quotes = [
    {
      q: "Openclaw rebuilt our ingest in nine days. The bill went from $18,400 to $3,120 a month and nothing broke. I keep waiting for the catch.",
      a: "Priya Ravikumar",
      r: "VP Data · Helios AI",
      hash: "a7c3f91",
    },
    {
      q: "They handed us a repo, a runbook, and a pinned Grafana board. No hand-waving, no platform-team gatekeeping. It just shipped.",
      a: "Johann Albrecht",
      r: "Staff Engineer · Parallax",
      hash: "de02b14",
    },
    {
      q: "What stood out was the written RFC before a single line of Terraform. It's how I wish my own team operated.",
      a: "Camille Okonkwo",
      r: "CTO · Fieldnote",
      hash: "41b8c2d",
    },
  ]
  return (
    <section id="work" className="relative border-t border-hairline">
      <SectionHeader
        no="§ 06"
        day="Field notes"
        kicker="Handover receipts"
        title={
          <>
            What teams say
            <br className="hidden md:block" />{" "}
            <span className="font-serif-italic font-normal text-ash">after handover.</span>
          </>
        }
      />
      <Reveal as="div" stagger={140} className="mx-auto grid max-w-[1440px] grid-cols-1 border-x border-hairline md:grid-cols-3">
        {quotes.map((q, i) => (
          <figure
            key={i}
            className={`lift flex flex-col justify-between p-8 md:p-12 ${
              i < quotes.length - 1 ? "border-b border-hairline md:border-b-0 md:border-r" : ""
            }`}
          >
            <div className="flex items-center justify-between">
              <CircleDot className="h-5 w-5 text-ember" />
              <span className="font-mono text-[10px] text-ash">#{q.hash}</span>
            </div>
            <blockquote className="font-display mt-8 text-2xl font-medium leading-snug tracking-tight text-bone">
              &ldquo;{q.q}&rdquo;
            </blockquote>
            <figcaption className="mt-8 flex items-center gap-3 border-t border-hairline pt-5">
              <span className="grid h-9 w-9 place-items-center rounded-full border border-hairline bg-surface-1 font-mono text-xs text-bone">
                {q.a
                  .split(" ")
                  .map((s) => s[0])
                  .join("")}
              </span>
              <span>
                <div className="text-sm text-bone">{q.a}</div>
                <div className="label mt-0.5 text-ash">{q.r}</div>
              </span>
            </figcaption>
          </figure>
        ))}
      </Reveal>
    </section>
  )
}

/* -------------------------------------------------------------------------- */
/*  FAQ                                                                       */
/* -------------------------------------------------------------------------- */

function Faq() {
  const items = [
    {
      q: "Why flat pricing?",
      a: "Because scope-creep billing rewards the wrong behaviour. We estimate tightly, eat the variance, and if we're wrong that's on us — not on a change order.",
    },
    {
      q: "What stack do you use?",
      a: "Opinionated but not dogmatic: Airflow / Dagster, dbt, Iceberg or the warehouse you already pay for, Terraform, and Grafana. If your stack is different, we adapt — we don't re-platform.",
    },
    {
      q: "Do you work on-site?",
      a: "Remote by default, with a shared Slack channel and daily loom. We fly in for kickoff or handover when it matters.",
    },
    {
      q: "What happens after the 10 days?",
      a: "You own the repo and the runbook. You can walk away, keep us on retainer, or hand the keys to your team. We write the documentation assuming we'll never touch it again.",
    },
    {
      q: "Do you sign DPAs / SOC2?",
      a: "Yes. DPA and MSA templates on request. SOC2 Type II completion timeline available under NDA.",
    },
    {
      q: "Is there a minimum engagement?",
      a: "The Diagnostic ($1,900) is a valid front door. Most teams then upgrade to a Pipeline. No retainer minimums after that.",
    },
  ]
  return (
    <section id="faq" className="relative border-t border-hairline">
      <SectionHeader
        no="§ 07"
        day="Reference"
        kicker="FAQ"
        title={
          <>
            Straight answers,{" "}
            <span className="font-serif-italic font-normal text-ash">no fluff.</span>
          </>
        }
      />
      <div className="mx-auto max-w-[1440px] border-x border-hairline">
        <div className="divide-y divide-[rgb(245_235_220_/_0.08)]">
          {items.map((it, i) => (
            <details
              key={i}
              className="group px-6 py-6 transition-colors open:bg-surface-1/40 md:px-10 md:py-7"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6">
                <span className="flex items-center gap-6">
                  <span className="label w-10 shrink-0 text-ash">
                    0{i + 1}
                  </span>
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

/* -------------------------------------------------------------------------- */
/*  HANDOVER — DAY 10 (CTA + closing scene)                                   */
/* -------------------------------------------------------------------------- */

function Handover() {
  return (
    <section
      id="handover"
      className="relative isolate overflow-hidden border-t border-hairline"
    >
      <div className="absolute inset-0 -z-10 spotlight opacity-80" />
      <div className="absolute inset-0 -z-10 bg-grid opacity-30" />
      <div className="mx-auto grid max-w-[1440px] grid-cols-12 border-x border-hairline">
        <div className="col-span-12 px-6 py-24 md:col-span-8 md:px-12 md:py-32">
          <div className="label mb-8 flex items-center gap-3 text-ash">
            <span>§ 08 · day 10 · handover</span>
            <span className="hidden h-[10px] w-px bg-[rgb(245_235_220_/_0.15)] md:block" />
            <span className="hidden text-[9px] md:inline">
              keys handed over · <span className="text-live">status: yours</span>
            </span>
          </div>
          <h2 className="font-display text-[clamp(2.5rem,5.6vw,5rem)] font-medium leading-[0.95] tracking-[-0.035em]">
            Got a pipeline
            <br />
            that should already
            <br />
            <span
              className="font-serif-italic font-normal text-ember"
              style={{
                textShadow:
                  "0 0 40px color-mix(in oklch, var(--ember) 38%, transparent), 0 0 80px color-mix(in oklch, var(--ember) 18%, transparent)",
              }}
            >
              be running?
            </span>
          </h2>
          <p className="mt-8 max-w-xl text-lg leading-relaxed text-ash">
            Book a 60-minute scoping call. If we&rsquo;re the wrong crew,
            we&rsquo;ll point you at the right one — no retainer, no pitch deck.
          </p>
          <div className="mt-12 flex flex-wrap items-center gap-3">
            <MagneticButton
              href="mailto:crew@openclaw.dev"
              className="inline-flex items-center gap-2 rounded-sm bg-ember px-6 py-3.5 text-sm font-medium text-coal ember-glow hover:brightness-110"
            >
              crew@openclaw.dev
              <ArrowUpRight className="h-4 w-4 magnetic" />
            </MagneticButton>
            <MagneticButton
              href="#"
              className="inline-flex items-center gap-2 rounded-sm border border-hairline px-6 py-3.5 text-sm hover:border-bone/60"
              strength={4}
            >
              Book 60 min · Cal.com
            </MagneticButton>
          </div>
        </div>
        <aside className="col-span-12 flex flex-col justify-between border-t border-hairline px-6 py-12 md:col-span-4 md:border-l md:border-t-0 md:px-10 md:py-32">
          <div>
            <div className="label text-ash">Next cohort</div>
            <div className="font-display mt-3 text-5xl font-medium tracking-tight text-bone">
              May
            </div>
            <div className="mt-1 font-mono text-xs text-ash">
              3 of 5 slots remaining
            </div>
          </div>
          <div className="mt-10 space-y-4">
            {[
              ["Scope", "60-min call, no slides"],
              ["Quote", "flat, in writing, same day"],
              ["Kickoff", "Monday of next sprint"],
            ].map(([k, v]) => (
              <div
                key={k}
                className="flex items-center justify-between border-t border-hairline pt-4"
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

/* -------------------------------------------------------------------------- */
/*  FOOTER                                                                    */
/* -------------------------------------------------------------------------- */

function Footer() {
  return (
    <footer className="relative border-t border-hairline bg-coal">
      <div className="mx-auto max-w-[1440px] border-x border-hairline px-6 py-14 md:px-10">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-5">
          <div className="col-span-2">
            <div className="flex items-center gap-2.5">
              <Mark />
              <span className="font-display text-2xl font-medium tracking-tight">
                Openclaw
              </span>
            </div>
            <p className="mt-5 max-w-xs text-sm text-ash">
              A small, senior crew. We configure the plumbing so your product
              team can ship the feature.
            </p>
            <div className="label mt-8 flex items-center gap-2 text-ash">
              <span className="h-1.5 w-1.5 rounded-full bg-live pulse-dot" />
              All systems operational
            </div>
          </div>

          {[
            {
              h: "Services",
              l: ["Ingestion", "Orchestration", "Warehouse", "ML pipelines", "Reliability"],
            },
            {
              h: "Company",
              l: ["Process", "Pricing", "Field notes", "Changelog", "Contact"],
            },
            {
              h: "Legal",
              l: ["Terms", "Privacy", "DPA", "Sub-processors", "Security"],
            },
          ].map((c) => (
            <div key={c.h}>
              <div className="label text-ash">{c.h}</div>
              <ul className="mt-5 space-y-2.5 text-sm">
                {c.l.map((x) => (
                  <li key={x}>
                    <a
                      href="#"
                      className="text-ash transition hover:text-bone"
                    >
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
            © {new Date().getFullYear()} Openclaw Services, LLC · crafted
            offline in Lisbon / Berlin / NYC
          </span>
          <span className="flex items-center gap-5">
            <span>v4.2.0</span>
            <span>build · a7c3f91</span>
            <a href="#" className="press hover:text-bone">
              status.openclaw.dev ↗
            </a>
          </span>
        </div>
      </div>

      {/* massive watermark */}
      <div className="pointer-events-none select-none overflow-hidden border-t border-hairline">
        <div className="mx-auto max-w-[1440px] px-4">
          <div className="font-display flex justify-center py-6 text-[clamp(4rem,18vw,18rem)] font-medium leading-[0.8] tracking-[-0.06em] text-bone/[0.05]">
            openclaw
          </div>
        </div>
      </div>
    </footer>
  )
}

/* -------------------------------------------------------------------------- */
/*  Shared                                                                    */
/* -------------------------------------------------------------------------- */

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
    <div className="mx-auto grid max-w-[1440px] grid-cols-12 border-x border-hairline">
      <div className="col-span-12 grid grid-cols-12 border-b border-hairline">
        <div className="col-span-12 flex items-center justify-between px-6 py-5 md:px-10">
          <span className="label flex items-center gap-3 text-ash">
            <span>{no} · {kicker}</span>
            {day && (
              <>
                <span className="hidden h-[10px] w-px bg-[rgb(245_235_220_/_0.15)] md:block" />
                <span className="hidden text-ember md:inline">{day}</span>
              </>
            )}
          </span>
          <span className="label hidden text-ash md:inline">openclaw / services</span>
        </div>
      </div>
      <div className="col-span-12 grid grid-cols-12 gap-0 px-6 py-20 md:px-10 md:py-28">
        <h2 className="font-display col-span-12 text-[clamp(2.25rem,4.8vw,4.5rem)] font-medium leading-[0.94] tracking-[-0.035em] md:col-span-8">
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
