import Link from "next/link"
import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { ArrowUpRight } from "lucide-react"

import { SectionHeader } from "@/components/auren/section-header"
import { LiveCounter } from "@/components/openclaw/live-counter"
import { MagneticButton } from "@/components/openclaw/magnetic-button"
import { Reveal } from "@/components/reveal"

type Metric = {
  value: number
  suffix?: string
  decimals?: number
  label: string
}

type FullCase = {
  eyebrow: string
  title: string
  client: string
  engagement: string
  summary: string
  problem: string[]
  solution: string[]
  metrics: Metric[]
  tech: string[]
  outcome: string
}

const CASES: Record<string, FullCase> = {
  "acme-onboarding": {
    eyebrow: "automation",
    title: "Halved onboarding time",
    client: "[anonymized · enterprise saas]",
    engagement: "ai automation · 6 weeks",
    summary:
      "Replaced a 14-step manual onboarding workflow with an AI-routed pipeline.",
    problem: [
      "The internal ops team ran a 14-step onboarding process by hand for every new enterprise customer. Average time-to-first-value was 11 days, with 30% of accounts stalling on a single manual approval step.",
      "Each rep was spending around 4 hours per onboarding inside their CRM, copying data between systems and emailing internal teams to chase approvals.",
    ],
    solution: [
      "We built a pipeline that ingests CRM signal at deal close, routes the new account through a tree of AI-judged steps (auto-approve / human-review / escalate), and pushes status back to the rep's dashboard in real time.",
      "Reps now intervene only on edge cases. The dashboard surfaces stalled accounts as a single live counter, and a slack thread is opened automatically when human review is needed.",
    ],
    metrics: [
      { value: 51, suffix: " %", label: "reduction in time-to-first-value" },
      { value: 4, suffix: " hrs", label: "saved per rep, per onboarding" },
      { value: 92, suffix: " %", label: "auto-approved without review" },
      { value: 0, suffix: " incidents", label: "in production since launch" },
    ],
    tech: ["Next.js", "Supabase", "OpenAI", "Slack API"],
    outcome:
      "The ops team reallocated 60% of their onboarding hours to retention work. Three months in, accounts are activating in 5 days on average and the dashboard has become the team's primary working surface.",
  },
  "northwind-ops": {
    eyebrow: "operations",
    title: "Field tech in your pocket",
    client: "[anonymized · field services]",
    engagement: "mobile · 8 weeks",
    summary:
      "Native iOS app for field technicians, replacing a paper-and-photo workflow.",
    problem: [
      "Technicians on-site were filling paper forms, taking photos on personal phones, and re-entering data when they got back to the office. Job sheets routinely came back with missing data.",
      "Operations couldn't see job status until the technician returned, which meant scheduling next-day work was always guesswork.",
    ],
    solution: [
      "A SwiftUI app with offline-first job sheets. Technicians open a job, capture photos and notes, and the app syncs when signal returns. Operations get live status in a web dashboard.",
      "Built-in voice-to-text and a single-tap 'job complete' flow brought average per-job admin time from 12 minutes to 2.",
    ],
    metrics: [
      { value: 38, suffix: " %", label: "increase in NPS over 90 days" },
      { value: 10, suffix: " min", label: "saved per job in admin" },
      { value: 4.6, suffix: "", decimals: 1, label: "App Store rating" },
      { value: 100, suffix: " %", label: "of jobs synced same-day" },
    ],
    tech: ["Swift", "SwiftUI", "Supabase", "GSAP"],
    outcome:
      "Operations got real-time visibility for the first time, and the technicians went from filing paperwork on weekends to closing jobs in-app on the way back to the depot.",
  },
  "helio-platform": {
    eyebrow: "saas",
    title: "From MVP to series A in 9 months",
    client: "[anonymized · early-stage saas]",
    engagement:
      "saas engineering · 12 weeks initial · ongoing platform partner",
    summary:
      "Took a slide-deck product spec to a billing-live SaaS platform that closed a Series A.",
    problem: [
      "The founder had a clear product vision and three pilot customers waiting, but no engineering team and a 12-week runway to demo at a category event.",
      "The market window required a fully-paying SaaS with billing, dashboards, and a credible audit story — not a clickable demo.",
    ],
    solution: [
      "We shipped the platform in three milestones: schema and core flows in weeks 1-4, billing and admin in weeks 5-8, observability and SOC2-ready logging in weeks 9-12.",
      "All three pilot customers were live by week 10. The Series A pitch ran on the production dashboard, with live ARR counters as a slide.",
    ],
    metrics: [
      { value: 1.2, suffix: "M ARR", decimals: 1, label: "in first 9 months" },
      { value: 12, suffix: " weeks", label: "from spec to live billing" },
      { value: 99.97, suffix: " %", decimals: 2, label: "uptime since launch" },
      { value: 3, suffix: " pilots", label: "live by week 10" },
    ],
    tech: ["Next.js", "Postgres", "Stripe", "Vercel", "Sentry"],
    outcome:
      "The founder closed a $4M Series A using the live platform as the primary demo. We continue as the engineering partner, with the founder now hiring a full team to take it forward.",
  },
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const c = CASES[slug]
  if (!c) return { title: "Case Study — Auren Studios" }
  return {
    title: `${c.title} — Auren Studios`,
    description: `Case study: ${c.title}. ${c.eyebrow}.`,
  }
}

export function generateStaticParams() {
  return Object.keys(CASES).map((slug) => ({ slug }))
}

/** Split title into "first words" + last word (italicized). */
function splitTitle(title: string) {
  const words = title.split(" ")
  if (words.length < 2) return { head: "", tail: title }
  return {
    head: words.slice(0, -1).join(" "),
    tail: words[words.length - 1],
  }
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const c = CASES[slug]
  if (!c) notFound()

  const { head, tail } = splitTitle(c.title)
  const others = Object.entries(CASES).filter(([s]) => s !== slug)

  return (
    <main className="relative z-10 min-h-svh bg-transparent text-bone">
      {/* 00 — header */}
      <SectionHeader
        no="00"
        kicker={c.eyebrow}
        title={
          <>
            {head}{" "}
            <em className="font-serif italic">{tail}</em>.
          </>
        }
        lede={c.summary}
      />

      {/* meta strip */}
      <section className="border-hairline relative border-t">
        <div className="border-hairline mx-auto max-w-[1440px] border-x">
          <div className="border-hairline flex flex-col gap-3 border-b px-6 py-5 md:flex-row md:items-center md:gap-6 md:px-10">
            <span className="label text-ash">
              <span className="text-ember">client</span> · {c.client}
            </span>
            <span className="hidden h-3 w-px bg-[rgb(245_235_220_/_0.15)] md:block" />
            <span className="label text-ash">
              <span className="text-ember">engagement</span> · {c.engagement}
            </span>
            <span className="hidden h-3 w-px bg-[rgb(245_235_220_/_0.15)] md:block" />
            <span className="label text-ash">
              <span className="text-ember">tech</span> · {c.tech.join(" · ")}
            </span>
          </div>
        </div>
      </section>

      {/* problem & solution */}
      <section className="border-hairline relative border-t">
        <div className="border-hairline mx-auto max-w-[1440px] border-x">
          <div className="grid grid-cols-1 md:grid-cols-12">
            {/* problem */}
            <div className="border-hairline col-span-1 border-b p-8 md:col-span-6 md:border-b-0 md:border-r md:p-10">
              <SectionHeader
                no="01"
                kicker="problem"
                title={
                  <>
                    what was <em className="font-serif italic">broken</em>.
                  </>
                }
              />
              <div className="border-hairline mt-6 border bg-surface-1">
                <div className="border-hairline flex items-center justify-between border-b px-4 py-2 font-mono text-[10px] tracking-wider text-ash">
                  <span>&gt; rfc / problem</span>
                  <span className="text-ember">●</span>
                </div>
                <div className="space-y-4 p-6 md:p-8">
                  {c.problem.map((para, i) => (
                    <p
                      key={i}
                      className="text-sm leading-relaxed text-ash"
                    >
                      {para}
                    </p>
                  ))}
                </div>
              </div>
            </div>

            {/* solution */}
            <div className="col-span-1 p-8 md:col-span-6 md:p-10">
              <SectionHeader
                no="02"
                kicker="solution"
                title={
                  <>
                    what we <em className="font-serif italic">shipped</em>.
                  </>
                }
              />
              <div className="border-hairline mt-6 border bg-surface-1">
                <div className="border-hairline flex items-center justify-between border-b px-4 py-2 font-mono text-[10px] tracking-wider text-ash">
                  <span>&gt; rfc / solution</span>
                  <span className="text-ember">●</span>
                </div>
                <div className="space-y-4 p-6 md:p-8">
                  {c.solution.map((para, i) => (
                    <p
                      key={i}
                      className="text-sm leading-relaxed text-ash"
                    >
                      {para}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* results */}
      <section className="border-hairline relative border-t">
        <SectionHeader
          no="03"
          kicker="results"
          title={
            <>
              numbers, <em className="font-serif italic">measured</em>.
            </>
          }
        />
        <div className="border-hairline mx-auto max-w-[1440px] border-x">
          <Reveal
            as="div"
            stagger={80}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4"
          >
            {c.metrics.map((m, i) => (
              <div
                key={`${m.label}-${i}`}
                className={`border-hairline flex flex-col gap-3 border-b p-8 md:p-10 ${
                  i < c.metrics.length - 1 ? "md:border-r" : ""
                }`}
              >
                <span className="label text-ash">
                  {String(i + 1).padStart(2, "0")} / metric
                </span>
                <div className="font-display text-[clamp(2rem,4vw,3.5rem)] leading-none font-medium tracking-tight text-bone">
                  <LiveCounter
                    value={m.value}
                    decimals={m.decimals ?? 0}
                    suffix={m.suffix ?? ""}
                  />
                </div>
                <span className="text-sm leading-relaxed text-ash">
                  {m.label}
                </span>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* outcome */}
      <section className="border-hairline relative border-t">
        <SectionHeader
          no="04"
          kicker="outcome"
          title={
            <>
              what <em className="font-serif italic">changed</em>.
            </>
          }
        />
        <div className="border-hairline mx-auto max-w-[1440px] border-x">
          <div className="border-hairline border-b p-8 md:p-12">
            <p className="max-w-3xl text-base leading-relaxed text-bone md:text-lg">
              {c.outcome}
            </p>
          </div>
        </div>
      </section>

      {/* next */}
      <section
        id="next"
        className="border-hairline relative isolate overflow-hidden border-t"
      >
        <SectionHeader
          no="05"
          kicker="next"
          title={
            <>
              want results <em className="font-serif italic">like these</em>?
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
                    bring us the next one. ↘
                  </em>
                </h3>
              </Reveal>
              <Reveal delay={140}>
                <MagneticButton
                  href="/contact"
                  className="ember-glow inline-flex items-center gap-2 rounded-sm bg-ember px-6 py-3.5 text-sm font-medium text-coal hover:brightness-110"
                >
                  Start a project
                  <ArrowUpRight className="magnetic h-4 w-4" />
                </MagneticButton>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* other case studies */}
      <section className="border-hairline relative border-y">
        <div className="border-hairline mx-auto max-w-[1440px] border-x">
          <div className="grid grid-cols-1 md:grid-cols-2">
            {others.map(([s, oc], i) => (
              <Link
                key={s}
                href={`/case-studies/${s}`}
                className={`group relative flex flex-col gap-3 p-8 transition-colors hover:bg-surface-1/40 md:p-10 ${
                  i === 0 ? "border-hairline border-b md:border-b-0 md:border-r" : ""
                }`}
              >
                <span className="label text-ash transition-colors group-hover:text-ember">
                  next / {oc.eyebrow}
                </span>
                <div className="flex items-end justify-between gap-4">
                  <h3 className="font-display text-2xl font-medium tracking-tight text-bone md:text-[1.85rem]">
                    {oc.title}
                  </h3>
                  <ArrowUpRight
                    className="magnetic h-5 w-5 text-ash transition-colors group-hover:text-ember"
                    strokeWidth={1.5}
                  />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
