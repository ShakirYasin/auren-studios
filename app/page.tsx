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

export default function Page() {
  return (
    <main className="relative min-h-svh overflow-hidden bg-background text-foreground">
      <Nav />
      <Hero />
      <Logos />
      <Services />
      <Process />
      <Pricing />
      <Stats />
      <Testimonials />
      <Faq />
      <CtaBand />
      <Footer />
    </main>
  )
}

/* -------------------------------------------------------------------------- */
/*  NAV                                                                       */
/* -------------------------------------------------------------------------- */

function Nav() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/70 backdrop-blur-xl">
      <div className="mx-auto flex h-14 max-w-[1400px] items-center justify-between px-6 lg:px-10">
        <a href="#" className="flex items-center gap-2.5">
          <Mark />
          <span className="font-display text-xl leading-none tracking-tight">
            Openclaw
          </span>
          <span className="label ml-2 hidden md:inline">
            <span className="inline-block h-1.5 w-1.5 translate-y-[-1px] rounded-full bg-ember pulse-dot" />
            <span className="ml-2">Shipping · Q2</span>
          </span>
        </a>
        <nav className="hidden items-center gap-8 text-sm md:flex">
          {["Services", "Process", "Pricing", "Work", "FAQ"].map((i) => (
            <a
              key={i}
              href={`#${i.toLowerCase()}`}
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              {i}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <a
            href="#"
            className="label press hidden rounded-full border border-border px-3 py-1.5 hover:border-ember hover:text-foreground md:inline-flex"
          >
            status · operational
          </a>
          <a
            href="#cta"
            className="group press inline-flex items-center gap-1.5 rounded-full bg-foreground px-4 py-1.5 text-sm font-medium text-background hover:bg-ember hover:text-ember-foreground"
          >
            Book a call
            <ArrowUpRight className="h-3.5 w-3.5 magnetic" />
          </a>
        </div>
      </div>
    </header>
  )
}

function Mark() {
  return (
    <span className="relative grid h-7 w-7 place-items-center rounded-sm border border-ember/60 bg-ember/10">
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
/*  HERO                                                                      */
/* -------------------------------------------------------------------------- */

function Hero() {
  return (
    <section className="relative isolate">
      <div className="absolute inset-0 -z-10 bg-grid opacity-50" />
      <div className="absolute inset-0 -z-10 spotlight" />
      <div className="absolute inset-x-0 top-0 -z-10 h-[120%] bg-gradient-to-b from-transparent via-transparent to-background" />

      <div className="mx-auto grid max-w-[1400px] grid-cols-12 gap-0 border-x border-border/60 px-0">
        {/* side label */}
        <aside className="col-span-12 hidden border-r border-border/60 px-4 py-6 md:col-span-1 md:block">
          <div className="label rotate-180 [writing-mode:vertical-rl]">
            § 00 / openclaw.services
          </div>
        </aside>

        <div className="col-span-12 md:col-span-11">
          <div className="grid grid-cols-12 gap-0">
            <div className="col-span-12 border-b border-border/60 px-6 py-5 md:px-10">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="label">
                  Edition 04 · Vol. ii · Pipelines as a service
                </div>
                <div className="label">
                  Filed from remote · {new Date().getFullYear()}
                </div>
              </div>
            </div>

            <div className="col-span-12 px-6 pt-14 pb-10 md:col-span-8 md:px-10 md:pt-24 md:pb-20 lg:pt-28">
              <div className="label mb-8 inline-flex items-center gap-2">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-ember pulse-dot" />
                Booking May cohort — 3 slots left
              </div>

              <h1 className="font-display text-[clamp(2.75rem,6.4vw,5.75rem)] leading-[0.92] tracking-[-0.035em] rise">
                Pipelines,
                <br />
                <span className="italic text-ember">shipped</span>
                <span className="text-muted-foreground/80">—</span> not
                <br />
                scheduled.
              </h1>

              <p
                className="mt-10 max-w-xl text-lg leading-relaxed text-muted-foreground rise"
                style={{ animationDelay: "120ms" }}
              >
                Openclaw is a small, senior crew that stands up production data
                and ML pipelines in{" "}
                <span className="text-foreground">days, not quarters.</span>{" "}
                Flat pricing, open-source first, and every artefact handed over
                — repo, runbook, and keys.
              </p>

              <div
                className="mt-10 flex flex-wrap items-center gap-3 rise"
                style={{ animationDelay: "220ms" }}
              >
                <a
                  href="#cta"
                  className="group press inline-flex items-center gap-2 rounded-sm bg-ember px-5 py-3 text-sm font-medium text-ember-foreground ember-glow hover:brightness-110"
                >
                  Start a pipeline
                  <ArrowUpRight className="h-4 w-4 magnetic" />
                </a>
                <a
                  href="#process"
                  className="group press inline-flex items-center gap-2 rounded-sm border border-border px-5 py-3 text-sm text-foreground hover:border-foreground/60"
                >
                  See how we work
                </a>
                <span className="label ml-2 hidden md:inline">
                  avg. ship time · 9.2 days
                </span>
              </div>

              <dl
                className="mt-16 grid max-w-2xl grid-cols-3 gap-0 rise"
                style={{ animationDelay: "300ms" }}
              >
                {[
                  { k: "Pipelines shipped", v: "247" },
                  { k: "Median cost cut", v: "61.4%" },
                  { k: "Contractual SLO", v: "99.973%" },
                ].map((s, i) => (
                  <div
                    key={s.k}
                    className={`px-1 ${i > 0 ? "border-l border-border/60 pl-6" : ""}`}
                  >
                    <dt className="label">{s.k}</dt>
                    <dd className="font-display mt-2 text-4xl leading-none tracking-tight">
                      {s.v}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>

            {/* terminal / artefact card */}
            <aside className="relative col-span-12 flex flex-col border-t border-border/60 px-6 py-10 md:col-span-4 md:border-t-0 md:border-l md:px-6 md:py-14">
              <div className="label mb-4 flex items-center justify-between">
                <span>artefact.log</span>
                <span className="flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-ember pulse-dot" />
                  live
                </span>
              </div>
              <div className="relative overflow-hidden rounded-sm border border-border bg-card/60 p-4 font-mono text-[11px] leading-relaxed text-muted-foreground scan">
                <p>
                  <span className="text-ember">$</span> openclaw init
                  --pipeline=ingest
                </p>
                <p>→ provisioning airflow · eks · spot</p>
                <p>→ wiring kafka → s3 → iceberg</p>
                <p>→ dbt models · 41 tests · green</p>
                <p>→ grafana board pinned</p>
                <p className="text-foreground">shipped in 7d 04h 12m</p>
                <p className="mt-2 text-foreground/70">
                  cost <span className="text-ember">$412.80/mo</span> · slo
                  99.973%
                  <span className="caret" />
                </p>
              </div>

              <div className="mt-8 space-y-3">
                {[
                  { icon: GitBranch, k: "repo", v: "handed over, day one" },
                  { icon: Shield, k: "SOC2", v: "runbooks + access review" },
                  { icon: Gauge, k: "observability", v: "metrics · logs · traces" },
                ].map(({ icon: Icon, k, v }) => (
                  <div key={k} className="flex items-start gap-3">
                    <Icon className="mt-0.5 h-4 w-4 text-ember" />
                    <div>
                      <div className="label text-foreground/70">{k}</div>
                      <div className="text-sm">{v}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-auto pt-10">
                <div className="rule" />
                <p className="label mt-4">
                  &ldquo;Felt like hiring a staff engineer for a week.&rdquo; —
                  <span className="text-foreground/80">
                    {" "}
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
    <section className="relative overflow-hidden border-y border-border/60 bg-background py-6">
      <div className="mx-auto flex max-w-[1400px] items-center gap-6 px-6 lg:px-10">
        <span className="label shrink-0 border-r border-border/60 pr-6">
          Trusted by ops & data teams
        </span>
        <div className="marquee-wrap relative flex-1 overflow-hidden">
          <div className="marquee">
            {items.map((n, i) => (
              <span
                key={i}
                className="font-display whitespace-nowrap text-2xl text-muted-foreground/70"
              >
                {n}
                <span className="mx-8 text-ember/60">✦</span>
              </span>
            ))}
          </div>
          <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-background to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-background to-transparent" />
        </div>
      </div>
    </section>
  )
}

/* -------------------------------------------------------------------------- */
/*  SERVICES                                                                  */
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
    <section id="services" className="relative border-t border-border/60">
      <SectionHeader
        no="§ 01"
        kicker="Services"
        title={
          <>
            Six crafts.{" "}
            <span className="italic text-muted-foreground">One crew.</span>
          </>
        }
        lede="We don&rsquo;t do slides. Every engagement ends with a running system, a handover doc, and a git sha you own."
      />
      <Reveal
        as="div"
        stagger={70}
        className="mx-auto grid max-w-[1400px] grid-cols-1 border-x border-border/60 md:grid-cols-8 lg:grid-cols-12"
      >
        {items.map((s, i) => {
          const Icon = s.icon
          return (
            <article
              key={s.t}
              className={[
                "lift group relative flex min-h-[260px] flex-col justify-between border-b border-border/60 p-8 hover:bg-card/50",
                i % 2 === 0 ? "md:border-r" : "",
                s.span,
                s.accent ? "stripes" : "",
              ].join(" ")}
            >
              <div className="flex items-start justify-between">
                <div className="label text-foreground/70">{s.n}</div>
                <Icon
                  strokeWidth={1.5}
                  className="h-5 w-5 text-muted-foreground transition-colors group-hover:text-ember"
                />
              </div>
              <div className="mt-10">
                <h3 className="font-display text-3xl tracking-tight md:text-[2rem]">
                  {s.t}
                </h3>
                <p
                  className="mt-3 max-w-[52ch] text-sm leading-relaxed text-muted-foreground"
                  dangerouslySetInnerHTML={{ __html: s.p }}
                />
              </div>
              <div className="mt-8 flex flex-wrap gap-1.5">
                {s.tags.map((t) => (
                  <span
                    key={t}
                    className="rounded-sm border border-border px-2 py-0.5 font-mono text-[10px] tracking-wider text-muted-foreground"
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
    <section id="process" className="relative border-t border-border/60">
      <SectionHeader
        no="§ 02"
        kicker="Process"
        title={
          <>
            Ten working days,
            <br className="hidden md:block" />{" "}
            <span className="italic text-ember">honestly priced.</span>
          </>
        }
        lede="No discovery quarter. No status-meeting tax. One sprint, one artefact, one price."
      />
      <div className="mx-auto max-w-[1400px] border-x border-border/60">
        <Reveal as="ol" stagger={90} className="grid grid-cols-1 md:grid-cols-4">
          {steps.map((s, i) => (
            <li
              key={s.t}
              className={`relative flex flex-col gap-4 border-b border-border/60 p-8 md:border-b-0 ${
                i < steps.length - 1 ? "md:border-r" : ""
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="label text-ember">{s.d}</span>
                <span className="font-mono text-xs text-muted-foreground">
                  0{i + 1} / 04
                </span>
              </div>
              <div className="relative my-2 h-px bg-border">
                <span className="absolute left-0 top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-ember" />
              </div>
              <h4 className="font-display text-2xl tracking-tight">{s.t}</h4>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {s.p}
              </p>
            </li>
          ))}
        </Reveal>
      </div>
    </section>
  )
}

/* -------------------------------------------------------------------------- */
/*  PRICING                                                                   */
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
    <section id="pricing" className="relative border-t border-border/60">
      <SectionHeader
        no="§ 03"
        kicker="Pricing"
        title={
          <>
            Flat rates.{" "}
            <span className="italic text-muted-foreground">No surprises.</span>
          </>
        }
        lede="Published numbers. The same price whether you're seed or post-B. We win on speed, not quotes."
      />
      <Reveal as="div" stagger={100} className="mx-auto grid max-w-[1400px] grid-cols-1 border-x border-border/60 md:grid-cols-3">
        {tiers.map((t, i) => (
          <article
            key={t.name}
            className={[
              "lift relative flex flex-col p-8 md:p-10",
              i < tiers.length - 1 ? "border-b border-border/60 md:border-b-0 md:border-r" : "",
              t.featured ? "bg-card/60" : "",
            ].join(" ")}
          >
            {t.featured && (
              <span className="label absolute right-6 top-6 rounded-sm border border-ember/60 bg-ember/10 px-2 py-1 text-ember">
                ★ most booked
              </span>
            )}
            <div className="label">{t.name}</div>
            <div className="mt-6 flex items-baseline gap-2">
              <span className="font-display text-6xl tracking-tight">
                {t.price}
              </span>
              <span className="font-mono text-xs text-muted-foreground">
                / {t.unit}
              </span>
            </div>
            <p className="mt-4 max-w-xs text-sm text-muted-foreground">
              {t.blurb}
            </p>
            <ul className="mt-8 space-y-2.5 text-sm">
              {t.features.map((f) => (
                <li key={f} className="flex items-start gap-2.5">
                  <Check
                    className={`mt-0.5 h-4 w-4 shrink-0 ${t.featured ? "text-ember" : "text-muted-foreground"}`}
                  />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
            <a
              href="#cta"
              className={[
                "group press mt-10 inline-flex items-center justify-between rounded-sm px-4 py-3 text-sm",
                t.featured
                  ? "bg-ember text-ember-foreground ember-glow hover:brightness-110"
                  : "border border-border hover:border-foreground/60",
              ].join(" ")}
            >
              {t.cta}
              <ArrowUpRight className="h-4 w-4 magnetic" />
            </a>
          </article>
        ))}
      </Reveal>
      <div className="mx-auto max-w-[1400px] border-x border-t border-border/60 px-8 py-5">
        <p className="label">
          Invoiced in USD · NET15 · cancel anytime · no lock-in, no retainer
          minimums
        </p>
      </div>
    </section>
  )
}

/* -------------------------------------------------------------------------- */
/*  STATS                                                                     */
/* -------------------------------------------------------------------------- */

function Stats() {
  const stats = [
    { k: "Median ship time", v: "9.2d", s: "scope → prod · n=38" },
    { k: "Cost reduction", v: "61.4%", s: "avg across 42 audits" },
    { k: "Uptime floor", v: "99.973%", s: "contractual SLO" },
    { k: "Handover rate", v: "1.00", s: "every artefact · yours" },
  ]
  return (
    <section className="relative border-t border-border/60">
      <div className="mx-auto max-w-[1400px] border-x border-border/60">
        <Reveal as="div" stagger={80} className="grid grid-cols-2 md:grid-cols-4">
          {stats.map((s, i) => (
            <div
              key={s.k}
              className={`p-8 md:p-12 ${
                i < stats.length - 1 ? "border-b border-border/60 md:border-b-0 md:border-r" : ""
              } ${i === 1 ? "border-b border-border/60" : ""} ${
                i === 2 ? "md:border-b-0" : ""
              }`}
            >
              <div className="label">{s.k}</div>
              <div className="font-display mt-4 text-6xl leading-none tracking-tight text-foreground">
                {s.v}
              </div>
              <div className="mt-3 font-mono text-[11px] text-muted-foreground">
                {s.s}
              </div>
            </div>
          ))}
        </Reveal>
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
    },
    {
      q: "They handed us a repo, a runbook, and a pinned Grafana board. No hand-waving, no platform-team gatekeeping. It just shipped.",
      a: "Johann Albrecht",
      r: "Staff Engineer · Parallax",
    },
    {
      q: "What stood out was the written RFC before a single line of Terraform. It's how I wish my own team operated.",
      a: "Camille Okonkwo",
      r: "CTO · Fieldnote",
    },
  ]
  return (
    <section id="work" className="relative border-t border-border/60">
      <SectionHeader
        no="§ 04"
        kicker="Field notes"
        title={
          <>
            What teams say
            <br className="hidden md:block" />{" "}
            <span className="italic text-muted-foreground">after handover.</span>
          </>
        }
      />
      <Reveal as="div" stagger={110} className="mx-auto grid max-w-[1400px] grid-cols-1 border-x border-border/60 md:grid-cols-3">
        {quotes.map((q, i) => (
          <figure
            key={i}
            className={`lift flex flex-col justify-between p-8 md:p-10 ${
              i < quotes.length - 1 ? "border-b border-border/60 md:border-b-0 md:border-r" : ""
            }`}
          >
            <CircleDot className="h-5 w-5 text-ember" />
            <blockquote className="font-display mt-8 text-2xl leading-snug tracking-tight">
              &ldquo;{q.q}&rdquo;
            </blockquote>
            <figcaption className="mt-8 flex items-center gap-3 border-t border-border/60 pt-5">
              <span className="grid h-9 w-9 place-items-center rounded-full border border-border bg-card font-mono text-xs">
                {q.a
                  .split(" ")
                  .map((s) => s[0])
                  .join("")}
              </span>
              <span>
                <div className="text-sm">{q.a}</div>
                <div className="label mt-0.5">{q.r}</div>
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
    <section id="faq" className="relative border-t border-border/60">
      <SectionHeader
        no="§ 05"
        kicker="FAQ"
        title={
          <>
            Straight answers,{" "}
            <span className="italic text-muted-foreground">no fluff.</span>
          </>
        }
      />
      <div className="mx-auto max-w-[1400px] border-x border-border/60">
        <div className="divide-y divide-border/60">
          {items.map((it, i) => (
            <details
              key={i}
              className="group px-6 py-6 md:px-10 md:py-7 open:bg-card/40 transition-colors"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6">
                <span className="flex items-center gap-6">
                  <span className="label w-10 shrink-0 text-muted-foreground">
                    0{i + 1}
                  </span>
                  <span className="font-display text-xl tracking-tight md:text-2xl">
                    {it.q}
                  </span>
                </span>
                <ChevronDown
                  className="h-5 w-5 shrink-0 text-muted-foreground group-open:-rotate-180 group-open:text-ember"
                  style={{ transition: "transform 320ms cubic-bezier(0.32, 0.72, 0, 1), color 220ms cubic-bezier(0.22, 1, 0.36, 1)" }}
                />
              </summary>
              <div className="faq-body">
                <p className="mt-4 max-w-3xl pl-0 text-sm leading-relaxed text-muted-foreground md:pl-16">
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
/*  CTA BAND                                                                  */
/* -------------------------------------------------------------------------- */

function CtaBand() {
  return (
    <section
      id="cta"
      className="relative isolate overflow-hidden border-t border-border/60"
    >
      <div className="absolute inset-0 -z-10 spotlight opacity-70" />
      <div className="absolute inset-0 -z-10 bg-grid opacity-40" />
      <div className="mx-auto grid max-w-[1400px] grid-cols-12 border-x border-border/60">
        <div className="col-span-12 px-6 py-20 md:col-span-8 md:px-10 md:py-28">
          <div className="label mb-8">§ 06 · Start</div>
          <h2 className="font-display text-[clamp(2.25rem,5.2vw,4.75rem)] leading-[0.95] tracking-[-0.035em]">
            Got a pipeline
            <br />
            that should already
            <br />
            <span className="italic text-ember">be running?</span>
          </h2>
          <p className="mt-8 max-w-xl text-lg text-muted-foreground">
            Book a 60-minute scoping call. If we're the wrong crew, we&apos;ll
            point you at the right one — no retainer, no pitch deck.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-3">
            <a
              href="mailto:crew@openclaw.dev"
              className="group press inline-flex items-center gap-2 rounded-sm bg-ember px-6 py-3.5 text-sm font-medium text-ember-foreground ember-glow hover:brightness-110"
            >
              crew@openclaw.dev
              <ArrowUpRight className="h-4 w-4 magnetic" />
            </a>
            <a
              href="#"
              className="press inline-flex items-center gap-2 rounded-sm border border-border px-6 py-3.5 text-sm hover:border-foreground/60"
            >
              Book 60 min · Cal.com
            </a>
          </div>
        </div>
        <aside className="col-span-12 flex flex-col justify-between border-t border-border/60 px-6 py-10 md:col-span-4 md:border-l md:border-t-0 md:px-10 md:py-28">
          <div>
            <div className="label">Next cohort</div>
            <div className="font-display mt-3 text-5xl tracking-tight">May</div>
            <div className="mt-1 font-mono text-xs text-muted-foreground">
              3 of 5 slots remaining
            </div>
          </div>
          <div className="mt-10 space-y-4">
            {[
              ["Scope", "60-min call, no slides"],
              ["Quote", "flat, in writing, same day"],
              ["Kickoff", "Monday of next sprint"],
            ].map(([k, v]) => (
              <div key={k} className="flex items-center justify-between border-t border-border/60 pt-4">
                <span className="label">{k}</span>
                <span className="text-sm text-foreground/80">{v}</span>
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
    <footer className="relative border-t border-border/60 bg-background">
      <div className="mx-auto max-w-[1400px] border-x border-border/60 px-6 py-14 md:px-10">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-5">
          <div className="col-span-2">
            <div className="flex items-center gap-2.5">
              <Mark />
              <span className="font-display text-2xl tracking-tight">
                Openclaw
              </span>
            </div>
            <p className="mt-5 max-w-xs text-sm text-muted-foreground">
              A small, senior crew. We configure the plumbing so your product
              team can ship the feature.
            </p>
            <div className="label mt-8 flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-ember pulse-dot" />
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
              <div className="label">{c.h}</div>
              <ul className="mt-5 space-y-2.5 text-sm">
                {c.l.map((x) => (
                  <li key={x}>
                    <a
                      href="#"
                      className="text-muted-foreground transition hover:text-foreground"
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

        <div className="mt-6 flex flex-col items-start justify-between gap-4 font-mono text-[11px] text-muted-foreground md:flex-row md:items-center">
          <span>
            © {new Date().getFullYear()} Openclaw Services, LLC · crafted offline in Lisbon / Berlin / NYC
          </span>
          <span className="flex items-center gap-5">
            <span>v4.2.0</span>
            <span>build · a7c3f91</span>
            <a href="#" className="press hover:text-foreground">
              status.openclaw.dev ↗
            </a>
          </span>
        </div>
      </div>

      {/* massive watermark */}
      <div className="pointer-events-none select-none overflow-hidden border-t border-border/60">
        <div className="mx-auto max-w-[1400px] px-4">
          <div className="font-display flex justify-center py-6 text-[clamp(4rem,18vw,18rem)] leading-[0.8] tracking-[-0.05em] text-foreground/[0.06]">
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
  kicker,
  title,
  lede,
}: {
  no: string
  kicker: string
  title: React.ReactNode
  lede?: string
}) {
  return (
    <div className="mx-auto grid max-w-[1400px] grid-cols-12 border-x border-border/60">
      <div className="col-span-12 grid grid-cols-12 border-b border-border/60">
        <div className="col-span-12 flex items-center justify-between px-6 py-5 md:px-10">
          <span className="label">
            {no} · {kicker}
          </span>
          <span className="label hidden md:inline">openclaw / services</span>
        </div>
      </div>
      <div className="col-span-12 grid grid-cols-12 gap-0 px-6 py-14 md:px-10 md:py-20">
        <h2 className="font-display col-span-12 text-[clamp(2.25rem,4.6vw,4.25rem)] leading-[0.96] tracking-[-0.035em] md:col-span-8">
          {title}
        </h2>
        {lede && (
          <p className="col-span-12 mt-8 max-w-md self-end text-base leading-relaxed text-muted-foreground md:col-span-4 md:mt-0 md:pl-10">
            {lede}
          </p>
        )}
      </div>
    </div>
  )
}
