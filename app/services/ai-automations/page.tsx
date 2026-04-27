import Link from "next/link"
import { ArrowRight, ArrowUpRight } from "lucide-react"

import { SectionHeader } from "@/components/auren/section-header"
import { CaseStudyTile } from "@/components/auren/case-study-tile"
import { MagneticButton } from "@/components/openclaw/magnetic-button"
import { LiveCounter } from "@/components/openclaw/live-counter"
import { Reveal } from "@/components/reveal"

export const metadata = {
  title: "AI Automations — Auren Studios",
  description:
    "Workflow automations and background AI agents that take repetitive operations off your team's plate.",
}

const DELIVERABLES = [
  "Workflow audit",
  "Pipeline build",
  "API integrations",
  "Live monitoring",
  "Handover playbook",
]

const SHIPS = [
  {
    n: "01",
    t: "Workflow audits",
    d: "Map current ops, identify automation candidates, agree the order.",
    tags: ["discovery", "scoping"],
  },
  {
    n: "02",
    t: "Pipeline builds",
    d: "Make, Zapier, n8n, or custom Node — with monitoring baked in.",
    tags: ["n8n", "zapier", "node"],
  },
  {
    n: "03",
    t: "AI-routed actions",
    d: "An agent decides which path to take, asks for approval where it should.",
    tags: ["LLM", "router", "guardrails"],
  },
  {
    n: "04",
    t: "Reliability scaffold",
    d: "Retries, alerts, and a small dashboard so failures are loud, not silent.",
    tags: ["alerts", "metrics"],
  },
]

const WORK = [
  {
    slug: "acme-onboarding",
    eyebrow: "automation",
    title: "Halved onboarding time",
    result: "−51% time-to-first-value",
  },
  {
    slug: "northwind-ops",
    eyebrow: "ops",
    title: "Field tech in your pocket",
    result: "+38% NPS in 90 days",
  },
]

const PROCESS = [
  {
    n: "01",
    t: "Brief",
    d: "One call, one workflow. We map the path and lock the scope before code.",
  },
  {
    n: "02",
    t: "Build",
    d: "Pipeline, integrations, and monitoring — weekly demos as it lands.",
  },
  {
    n: "03",
    t: "Handover",
    d: "Plain-English runbook, dashboards, and a Loom so your team can drive.",
  },
]

export default function Page() {
  return (
    <main className="relative z-10 min-h-svh bg-transparent text-bone">
      {/* 00 — header */}
      <SectionHeader
        no="00"
        kicker="ai automations"
        title={
          <>
            automate the <em className="font-serif italic">unglamorous</em>{" "}
            work.
          </>
        }
        lede="Background pipelines, integrations, and AI agents that handle ops you shouldn't be doing manually."
      />

      {/* hero block — what you get + stat panel */}
      <section className="border-hairline relative border-t">
        <div className="border-hairline mx-auto grid max-w-[1440px] grid-cols-1 border-x md:grid-cols-12">
          {/* left: what you get */}
          <div className="border-hairline col-span-1 border-b p-8 md:col-span-7 md:border-b-0 md:border-r md:p-12">
            <span className="label text-ash">what you get</span>
            <h3 className="mt-6 font-display text-[clamp(2rem,4.5vw,3.75rem)] leading-[0.96] font-medium tracking-[-0.03em] text-bone">
              A boring layer that runs <em className="font-serif italic">itself</em>.
            </h3>
            <p className="mt-6 max-w-md text-sm leading-relaxed text-ash">
              We map the workflow, build the pipeline, wire the integrations,
              and leave you a dashboard you can actually read.
            </p>

            <ul className="border-hairline divide-hairline mt-10 divide-y border-y">
              {DELIVERABLES.map((it) => (
                <li
                  key={it}
                  className="label flex items-center justify-between px-4 py-3 text-ash"
                >
                  <span>{it}</span>
                  <span className="text-ember">+</span>
                </li>
              ))}
            </ul>

            <div className="mt-10">
              <MagneticButton
                href="/contact"
                className="ember-glow inline-flex items-center gap-2 rounded-sm bg-ember px-5 py-3 text-sm font-medium text-coal hover:brightness-110"
              >
                Start a project
                <ArrowUpRight className="magnetic h-4 w-4" />
              </MagneticButton>
            </div>
          </div>

          {/* right: stat panel */}
          <aside className="col-span-1 flex flex-col md:col-span-5">
            <div className="border-hairline flex flex-col gap-3 border-b p-8 md:p-10">
              <span className="label text-ash">hrs / month saved</span>
              <div className="font-display text-[clamp(2.5rem,5vw,4.5rem)] leading-none font-medium tracking-tight text-bone">
                <LiveCounter value={127} />
              </div>
              <span className="label text-ash">on average across builds</span>
            </div>
            <div className="border-hairline flex flex-col gap-3 border-b p-8 md:p-10">
              <span className="label text-ash">typical engagement</span>
              <div className="font-display text-[clamp(2.5rem,5vw,4.5rem)] leading-none font-medium tracking-tight text-bone">
                <LiveCounter value={4} />
                <span className="ml-2 text-2xl text-ash">weeks</span>
              </div>
              <span className="label text-ash">brief → handover</span>
            </div>
            <div className="border-hairline flex flex-col gap-3 border-b p-8 md:p-10">
              <span className="label text-ash">reliability</span>
              <div className="font-display text-[clamp(2.5rem,5vw,4.5rem)] leading-none font-medium tracking-tight text-bone">
                <LiveCounter value={98} suffix="%" />
              </div>
              <span className="label text-ash">monitored uptime</span>
            </div>
            <div className="flex items-center justify-between gap-4 px-8 py-6 md:px-10">
              <span className="label text-ash">pricing anchor</span>
              <span className="font-mono text-xs text-ash">
                from <span className="text-ember">$4,500</span> · fixed-scope
              </span>
            </div>
          </aside>
        </div>
      </section>

      {/* 01 — what we ship */}
      <section className="border-hairline relative border-t">
        <SectionHeader
          no="01"
          kicker="what we ship"
          title={
            <>
              four <em className="font-serif italic">pieces</em>, every time.
            </>
          }
        />
        <div className="border-hairline mx-auto max-w-[1440px] border-x">
          <Reveal
            as="div"
            stagger={80}
            className="grid grid-cols-1 md:grid-cols-2"
          >
            {SHIPS.map((s, i) => (
              <div
                key={s.n}
                className={`border-hairline border-b p-8 md:p-10 ${
                  i % 2 === 0 ? "md:border-r" : ""
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="label text-ember">{s.n}</span>
                  <span className="font-mono text-xs text-ash">
                    {s.n} / 04
                  </span>
                </div>
                <h4 className="mt-6 font-display text-2xl font-medium tracking-tight text-bone">
                  {s.t}
                </h4>
                <p className="mt-4 max-w-prose text-sm leading-relaxed text-ash">
                  {s.d}
                </p>
                <div className="mt-6 flex flex-wrap gap-1.5">
                  {s.tags.map((t) => (
                    <span
                      key={t}
                      className="border-hairline rounded-sm border bg-surface-1 px-2 py-0.5 font-mono text-[10px] tracking-wider text-ash"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* 02 — sample work */}
      <section className="border-hairline relative border-t">
        <SectionHeader
          no="02"
          kicker="sample work"
          title={
            <>
              what it looks like <em className="font-serif italic">shipped</em>.
            </>
          }
        />
        <div className="border-hairline mx-auto max-w-[1440px] border-x">
          <div className="grid grid-cols-1 md:grid-cols-3">
            {WORK.map((t) => (
              <CaseStudyTile key={t.slug} {...t} />
            ))}
            <Link
              href="/case-studies"
              className="group relative flex flex-col justify-between border-hairline border-b border-r p-8 transition-colors hover:bg-surface-1/40 md:p-10"
            >
              <span className="label text-ash transition-colors group-hover:text-ember">
                more / case studies
              </span>
              <div className="flex items-end justify-between gap-4">
                <h3 className="font-display text-2xl font-medium tracking-tight text-bone md:text-[1.85rem]">
                  or browse all
                </h3>
                <ArrowUpRight
                  className="magnetic h-5 w-5 text-ash transition-colors group-hover:text-ember"
                  strokeWidth={1.5}
                />
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* 03 — process */}
      <section className="border-hairline relative border-t">
        <SectionHeader
          no="03"
          kicker="process"
          title={
            <>
              brief → build → <em className="font-serif italic">handover</em>.
            </>
          }
        />
        <div className="border-hairline mx-auto max-w-[1440px] border-x">
          <Reveal
            as="ol"
            stagger={90}
            className="grid grid-cols-1 md:grid-cols-3"
          >
            {PROCESS.map((s, i) => (
              <li
                key={s.t}
                className={`border-hairline relative flex flex-col gap-4 border-b p-8 md:border-b-0 md:p-10 ${
                  i < PROCESS.length - 1 ? "md:border-r" : ""
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="label text-ember">{s.n} / step</span>
                  <span className="font-mono text-xs text-ash">
                    {s.n} / 03
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
                <h4 className="font-display text-2xl font-medium tracking-tight text-bone">
                  {s.t}
                </h4>
                <p className="text-sm leading-relaxed text-ash">{s.d}</p>
              </li>
            ))}
          </Reveal>
        </div>
      </section>

      {/* 04 — pricing */}
      <section className="border-hairline relative border-t">
        <SectionHeader
          no="04"
          kicker="pricing"
          title={
            <>
              one <em className="font-serif italic">number</em>, no surprises.
            </>
          }
        />
        <div className="border-hairline mx-auto max-w-[1440px] border-x">
          <div className="border-hairline flex flex-col items-start justify-between gap-6 border-t p-8 md:flex-row md:items-center md:p-10">
            <div className="flex flex-col gap-2">
              <span className="font-display text-[clamp(1.75rem,3vw,2.5rem)] leading-tight font-medium tracking-tight text-bone">
                from <span className="text-ember">$4,500</span> · fixed-scope ·
                weekly demos
              </span>
              <span className="label font-mono text-ash">
                scope locked at brief · revisions inside scope · payment in
                two halves
              </span>
            </div>
            <Link
              href="/contact"
              className="group inline-flex items-center gap-2 rounded-sm border border-hairline px-5 py-3 text-sm text-bone transition-colors hover:border-bone/60"
            >
              Start a project
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 05 — next */}
      <section
        id="next"
        className="border-hairline relative isolate overflow-hidden border-t"
      >
        <SectionHeader
          no="05"
          kicker="next"
          title={
            <>
              shall we <em className="font-serif italic">build</em> it?
            </>
          }
        />
        <div className="border-hairline mx-auto max-w-[1440px] border-x">
          <div className="relative isolate overflow-hidden">
            <div className="spotlight absolute inset-0 -z-10 opacity-80" />
            <div className="bg-grid absolute inset-0 -z-10 opacity-30" />
            <div className="flex flex-col items-center gap-10 px-6 py-24 text-center md:py-32">
              <Reveal>
                <h3 className="font-display text-[clamp(2.25rem,5vw,4.5rem)] leading-[0.95] font-medium tracking-[-0.035em] text-bone">
                  <em className="font-serif italic text-ember">
                    we build the boring layer.
                  </em>
                </h3>
              </Reveal>
              <Reveal delay={140}>
                <div className="flex flex-wrap items-center justify-center gap-3">
                  <MagneticButton
                    href="/contact"
                    className="ember-glow inline-flex items-center gap-2 rounded-sm bg-ember px-6 py-3.5 text-sm font-medium text-coal hover:brightness-110"
                  >
                    Start a project
                    <ArrowUpRight className="magnetic h-4 w-4" />
                  </MagneticButton>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
