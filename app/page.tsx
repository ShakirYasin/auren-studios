import Link from "next/link"
import {
  ArrowRight,
  ArrowUpRight,
  ChevronDown,
  Compass,
  Layers,
  PenTool,
  Smartphone,
  Sparkles,
  Workflow,
} from "lucide-react"

import { SectionHeader } from "@/components/auren/section-header"
import { ServiceCard } from "@/components/auren/service-card"
import { CaseStudyTile } from "@/components/auren/case-study-tile"
import { Testimonials } from "@/components/auren/testimonials"
import { Reveal } from "@/components/reveal"
import { LiveClock } from "@/components/openclaw/live-clock"
import { LiveCounter } from "@/components/openclaw/live-counter"
import { MagneticButton } from "@/components/openclaw/magnetic-button"
import { Terminal } from "@/components/openclaw/terminal"
import { RFCDocument } from "@/components/openclaw/rfc-document"

export const metadata = {
  title: "Auren Studios — Studio for AI, web, and mobile craft",
  description:
    "Auren Studios designs and builds AI agents, automations, web, and mobile products.",
}

export default function Page() {
  return (
    <main className="relative z-10 min-h-svh bg-transparent text-bone">
      <Hero />
      <Services />
      <Positioning />
      <FeaturedWork />
      <Process />
      <PlatformStrip />
      <Metrics />
      <TestimonialsSection />
      <PortfolioPreview />
      <Faq />
      <Handover />
    </main>
  )
}

/* ------------------------------------------------------------------ 00 hero */

const HERO_TERMINAL: {
  text: string
  kind?: "prompt" | "step" | "ok" | "warn" | "final"
}[] = [
  { text: "client: can you ship the agent by friday?", kind: "prompt" },
  { text: "studio: yes — friday 14:00 GST.", kind: "step" },
  { text: "client: love that. promo goes live at 18:00.", kind: "prompt" },
  { text: "studio: handover deck + loom in your inbox.", kind: "step" },
  { text: "ci: build green / preview ready", kind: "ok" },
  { text: "studio: shipping in 30s", kind: "final" },
]

function Hero() {
  return (
    <section id="hero" className="relative isolate">
      <div className="bg-grid absolute inset-0 -z-10 opacity-40" />
      <div className="spotlight absolute inset-0 -z-10 opacity-60" />
      <div className="absolute inset-x-0 top-0 -z-10 h-[120%] bg-gradient-to-b from-transparent via-transparent to-coal" />

      <div className="border-hairline mx-auto grid max-w-[1440px] grid-cols-12 gap-0 border-x px-0">
        <div className="border-hairline col-span-12 border-b px-6 py-5 md:px-10">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <span className="label flex items-center gap-3 text-ash">
              <span>00 / hero</span>
              <span className="hidden h-[10px] w-px bg-[rgb(245_235_220_/_0.15)] md:block" />
              <LiveClock className="label hidden text-[9px] text-ash md:inline" />
            </span>
            <span className="label flex items-center gap-2 text-ash">
              <span className="pulse-dot inline-block h-1.5 w-1.5 rounded-full bg-live" />
              studio open / taking briefs
            </span>
          </div>
        </div>

        <div className="relative col-span-12 px-6 pt-14 pb-12 md:col-span-7 md:px-10 md:pt-28 md:pb-24 lg:pt-32">
          <Reveal>
            <span className="label inline-flex items-center gap-2 text-ash">
              <span className="pulse-dot inline-block h-1.5 w-1.5 rounded-full bg-ember" />
              auren studios / a studio for the quiet machine
            </span>
          </Reveal>

          <Reveal delay={120}>
            <h1 className="mt-8 font-display text-[clamp(2.5rem,7vw,7rem)] leading-[0.9] font-medium tracking-[-0.04em]">
              we build the{" "}
              <em
                className="font-serif italic text-ember"
                style={{
                  textShadow:
                    "0 0 40px color-mix(in oklch, var(--ember) 42%, transparent), 0 0 80px color-mix(in oklch, var(--ember) 18%, transparent)",
                }}
              >
                quiet machines
              </em>
              <br />
              that move modern studios.
            </h1>
          </Reveal>

          <Reveal delay={240}>
            <p className="mt-10 max-w-md text-base leading-relaxed text-ash">
              Auren Studios designs and builds AI agents, automations, web, and
              mobile products for teams who want craft without the theatre.
            </p>
          </Reveal>

          <Reveal delay={320}>
            <div className="mt-10 flex flex-wrap items-center gap-3">
              <MagneticButton
                href="/contact"
                className="ember-glow inline-flex items-center gap-2 rounded-sm bg-ember px-5 py-3 text-sm font-medium text-coal hover:brightness-110"
              >
                Start a project
                <ArrowUpRight className="magnetic h-4 w-4" />
              </MagneticButton>
              <Link
                href="/services"
                className="border-hairline inline-flex items-center gap-2 rounded-sm border px-5 py-3 text-sm text-bone transition-colors hover:border-bone/60"
              >
                See services
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </Reveal>
        </div>

        <aside className="border-hairline col-span-12 flex flex-col border-t px-6 py-10 md:col-span-5 md:border-t-0 md:border-l md:px-8 md:py-14">
          <div className="label mb-4 text-ash">live / studio thread</div>
          <Terminal lines={HERO_TERMINAL} title="studio.thread" />
          <div className="mt-auto pt-10">
            <div className="rule" />
            <p className="label mt-4 text-ash">
              quiet on the surface. loud in result.
            </p>
          </div>
        </aside>
      </div>
    </section>
  )
}

/* -------------------------------------------------------------- 01 services */

function Services() {
  const items = [
    {
      no: "01",
      title: "AI Automations",
      href: "/services/ai-automations",
      tags: ["workflows", "RPA", "API"],
      description:
        "Background agents that handle the busywork your team shouldn't.",
      icon: <Workflow className="h-4 w-4" strokeWidth={1.5} />,
    },
    {
      no: "02",
      title: "AI Agents",
      href: "/services/ai-agents",
      tags: ["OpenClaw", "RAG", "voice"],
      description:
        "Done-for-you assistants and OpenClaw deployments for non-technical teams.",
      icon: <Sparkles className="h-4 w-4" strokeWidth={1.5} />,
    },
    {
      no: "03",
      title: "Web Design",
      href: "/services/web-design",
      tags: ["Next.js", "marketing", "CMS"],
      description: "Cinematic marketing sites with a craft you can feel.",
      icon: <Layers className="h-4 w-4" strokeWidth={1.5} />,
    },
    {
      no: "04",
      title: "Mobile Apps",
      href: "/services/mobile-apps",
      tags: ["iOS", "Android", "RN"],
      description:
        "Native-feel product apps for early-stage and scaling teams.",
      icon: <Smartphone className="h-4 w-4" strokeWidth={1.5} />,
    },
    {
      no: "05",
      title: "Brand Identity",
      href: "/services/brand-identity",
      tags: ["mark", "system", "motion"],
      description: "Marks, systems, and motion for new ventures and rebrands.",
      icon: <PenTool className="h-4 w-4" strokeWidth={1.5} />,
    },
    {
      no: "06",
      title: "SaaS Engineering",
      href: "/services/saas-engineering",
      tags: ["MVP", "infra", "billing"],
      description: "MVP-to-platform engineering with shipping cadence.",
      icon: <Compass className="h-4 w-4" strokeWidth={1.5} />,
    },
  ]

  return (
    <section id="services" className="border-hairline relative border-t">
      <SectionHeader
        no="01"
        kicker="services"
        title={
          <>
            everything in one{" "}
            <em className="font-serif italic">studio</em>.
          </>
        }
        lede="Six disciplines under one roof. Each runs as its own service line, but they ship together."
      />
      <Reveal
        as="div"
        stagger={70}
        className="border-hairline mx-auto grid max-w-[1440px] grid-cols-1 border-x sm:grid-cols-2 md:grid-cols-3"
      >
        {items.map((s) => (
          <ServiceCard key={s.no} {...s} />
        ))}
      </Reveal>
    </section>
  )
}

/* ----------------------------------------------------------- 02 positioning */

function Positioning() {
  const principles = [
    {
      k: "clarity",
      v: "We strip briefs back to one moving idea. The brand, the product, the agent — all carry the same line.",
    },
    {
      k: "cadence",
      v: "Weekly demos, fixed scopes, four-week loops. You see the work move every Friday — no surprise invoices, no quiet stretches.",
    },
    {
      k: "craft",
      v: "Type, motion, and code held to the same standard. The product should feel like the brand it ships under.",
    },
  ]
  return (
    <section id="positioning" className="border-hairline relative border-t">
      <SectionHeader
        no="02"
        kicker="positioning"
        title={
          <>
            quiet on the surface.{" "}
            <em className="font-serif italic">loud</em> in result.
          </>
        }
        lede="A short doctrine of how we run."
      />
      <div className="border-hairline mx-auto grid max-w-[1440px] grid-cols-1 border-x md:grid-cols-12">
        <div className="border-hairline col-span-1 border-b p-8 md:col-span-7 md:border-b-0 md:border-r md:p-12">
          <div className="space-y-10">
            {principles.map((p) => (
              <div
                key={p.k}
                className="border-hairline border-t pt-6 first:border-t-0 first:pt-0"
              >
                <div className="label text-ember">{p.k}</div>
                <p className="mt-3 max-w-prose text-base leading-relaxed text-ash">
                  {p.v}
                </p>
              </div>
            ))}
          </div>
        </div>
        <div className="col-span-1 p-8 md:col-span-5 md:p-10">
          <RFCDocument />
        </div>
      </div>
    </section>
  )
}

/* --------------------------------------------------------- 03 featured work */

function FeaturedWork() {
  const tiles = [
    {
      slug: "acme-onboarding",
      eyebrow: "automation",
      title: "Halved onboarding time",
      result: "−51% time-to-first-value",
    },
    {
      slug: "northwind-ops",
      eyebrow: "mobile",
      title: "Field tech in your pocket",
      result: "+38% NPS in 90 days",
    },
    {
      slug: "helio-platform",
      eyebrow: "saas",
      title: "From MVP to series A in 9 months",
      result: "$0 → $1.2M ARR",
    },
  ]
  return (
    <section id="featured" className="border-hairline relative border-t">
      <SectionHeader
        no="03"
        kicker="featured work"
        title={
          <>
            recent <em className="font-serif italic">studio</em> work.
          </>
        }
      />
      <div className="mx-auto max-w-[1440px] border-x border-hairline">
        <div className="grid grid-cols-1 md:grid-cols-3">
          {tiles.map((t) => (
            <CaseStudyTile key={t.slug} {...t} />
          ))}
        </div>
        <div className="border-hairline flex items-center justify-between border-t px-6 py-6 md:px-10">
          <span className="label text-ash">selected from 42 shipped</span>
          <Link
            href="/case-studies"
            className="group inline-flex items-center gap-2 text-sm text-bone transition-colors hover:text-ember"
          >
            see all case studies
            <ArrowUpRight className="magnetic h-4 w-4" strokeWidth={1.5} />
          </Link>
        </div>
      </div>
    </section>
  )
}

/* --------------------------------------------------------------- 04 process */

function Process() {
  const steps = [
    {
      n: "01",
      t: "Discover",
      d: "Map the brief, the audience, the constraints. One page, one direction.",
      days: 5,
    },
    {
      n: "02",
      t: "Design",
      d: "Type, motion, and architecture in lockstep. Weekly demos start here.",
      days: 7,
    },
    {
      n: "03",
      t: "Build",
      d: "Engineering, agents, integrations. Tight commits, preview links daily.",
      days: 14,
    },
    {
      n: "04",
      t: "Handover",
      d: "Plain-English docs, loom walkthroughs, owner training. You drive after.",
      days: 2,
    },
  ]
  return (
    <section id="process" className="border-hairline relative border-t">
      <SectionHeader
        no="04"
        kicker="process"
        title={
          <>
            the four-week{" "}
            <em className="font-serif italic">cadence</em>.
          </>
        }
        lede="Discover, design, build, handover. Tight loop, weekly demos, no surprises."
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
                <span className="label text-ember">{s.n} / step</span>
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
              <h4 className="font-display text-2xl font-medium tracking-tight text-bone">
                {s.t}
              </h4>
              <p className="text-sm leading-relaxed text-ash">{s.d}</p>
              <div className="mt-auto flex items-baseline gap-2 pt-4">
                <span className="font-display text-4xl font-medium tracking-tight text-bone">
                  <LiveCounter value={s.days} />
                </span>
                <span className="label text-ash">typical days</span>
              </div>
            </li>
          ))}
        </Reveal>
      </div>
    </section>
  )
}

/* --------------------------------------------------- 05 platform stack strip */

const STACK_ITEMS = [
  "Next.js",
  "React",
  "Three.js",
  "OpenClaw",
  "Figma",
  "Supabase",
  "Vercel",
  "Postgres",
  "Tailwind",
  "TypeScript",
  "Node",
  "Cloudflare",
]

function PlatformStrip() {
  const items = [...STACK_ITEMS, ...STACK_ITEMS]
  return (
    <section
      id="stack"
      className="border-hairline relative overflow-hidden border-y bg-coal/60 py-6 backdrop-blur"
    >
      <div className="mx-auto flex max-w-[1440px] items-center gap-6 px-6 lg:px-10">
        <span className="label border-hairline shrink-0 border-r pr-6 text-ash">
          stack
        </span>
        <div
          className="marquee-wrap relative flex-1 overflow-hidden"
          style={{
            maskImage:
              "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
          }}
        >
          <div className="marquee">
            {items.map((n, i) => (
              <span
                key={`${n}-${i}`}
                className="font-display text-2xl font-medium whitespace-nowrap text-ash/70"
              >
                {n}
                <span className="mx-8 text-ember/60">·</span>
              </span>
            ))}
          </div>
        </div>
        <span className="label border-hairline shrink-0 border-l pl-6 text-ash">
          platform
        </span>
      </div>
    </section>
  )
}

/* --------------------------------------------------------------- 06 metrics */

function Metrics() {
  const stats = [
    { value: 42, label: "projects shipped", suffix: "" },
    { value: 94, label: "client retention", suffix: "%" },
    { value: 2.1, label: "weeks avg handover", suffix: "", decimals: 1 },
    { value: 9, label: "client NPS / 10", suffix: "" },
  ]
  return (
    <section id="metrics" className="border-hairline relative border-t">
      <SectionHeader
        no="06"
        kicker="metrics"
        title={
          <>
            numbers that <em className="font-serif italic">matter</em>.
          </>
        }
      />
      <div className="border-hairline mx-auto max-w-[1440px] border-x">
        <Reveal
          as="div"
          stagger={80}
          className="grid grid-cols-2 md:grid-cols-4"
        >
          {stats.map((s, i) => (
            <div
              key={s.label}
              className={`border-hairline border-b p-8 md:border-b-0 md:p-10 ${
                i < stats.length - 1 ? "border-r" : ""
              } ${i < 2 ? "md:border-b-0" : ""} ${i === 1 ? "border-r-0 md:border-r" : ""}`}
            >
              <div className="font-display text-[clamp(3rem,7vw,5.5rem)] leading-none font-medium tracking-tight text-bone">
                <LiveCounter
                  value={s.value}
                  suffix={s.suffix}
                  decimals={s.decimals ?? 0}
                />
              </div>
              <div className="label mt-6 text-ash">{s.label}</div>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  )
}

/* ---------------------------------------------------------- 07 testimonials */

function TestimonialsSection() {
  return (
    <section id="testimonials" className="border-hairline relative border-t">
      <SectionHeader
        no="07"
        kicker="testimonials"
        title={
          <>
            what teams <em className="font-serif italic">say</em>.
          </>
        }
        lede="Placeholder copy until brief approval. Real attributions land before launch."
      />
      <Testimonials />
    </section>
  )
}

/* ----------------------------------------------------- 08 portfolio preview */

function PortfolioPreview() {
  const tiles = [
    { slug: "atlas-launch", caption: "atlas / brand & site" },
    { slug: "rivet-os", caption: "rivet / product OS" },
    { slug: "halo-claims", caption: "halo / claims agent" },
    { slug: "northwind-ops", caption: "northwind / field app" },
    { slug: "helio-platform", caption: "helio / saas" },
    { slug: "umbra-studio", caption: "umbra / identity" },
  ]
  return (
    <section id="portfolio" className="border-hairline relative border-t">
      <SectionHeader
        no="08"
        kicker="portfolio"
        title={
          <>
            selected <em className="font-serif italic">visual</em> work.
          </>
        }
      />
      <div className="border-hairline mx-auto max-w-[1440px] border-x">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-12">
          {tiles.map((t, i) => {
            // varied spans: row1 = 4/4/4, row2 = 6/3/3
            const span =
              i === 0 || i === 1 || i === 2
                ? "md:col-span-4"
                : i === 3
                  ? "md:col-span-6"
                  : "md:col-span-3"
            return (
              <Link
                key={t.slug}
                href={`/portfolio/${t.slug}`}
                className={`group relative block border-hairline border-b border-r ${span}`}
              >
                <div className="bg-surface-1 relative aspect-[4/3] overflow-hidden">
                  <div className="bg-grid absolute inset-0 opacity-60" />
                  <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-coal/40" />
                  <div className="absolute inset-0 flex items-end p-6 opacity-0 transition-opacity group-hover:opacity-100">
                    <span className="label text-bone">{t.caption}</span>
                  </div>
                  <span className="label absolute right-3 top-3 text-[9px] text-ash/60">
                    {String(i + 1).padStart(2, "0")} / placeholder
                  </span>
                </div>
              </Link>
            )
          })}
        </div>
        <div className="border-hairline flex items-center justify-between border-t px-6 py-6 md:px-10">
          <span className="label text-ash">six of many</span>
          <Link
            href="/portfolio"
            className="group inline-flex items-center gap-2 text-sm text-bone transition-colors hover:text-ember"
          >
            see full portfolio
            <ArrowUpRight className="magnetic h-4 w-4" strokeWidth={1.5} />
          </Link>
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ 09 faq */

function Faq() {
  const items = [
    {
      q: "How small a team can you work with?",
      a: "Solo founders welcome. Minimum engagement is four weeks so the cadence has room to breathe.",
    },
    {
      q: "Do you do equity-only?",
      a: "No, but we discount cash work for early-stage teams with a clean cap table.",
    },
    {
      q: "Where are you based?",
      a: "Distributed across UAE, US, and EU. Async-first, with overlap windows arranged per engagement.",
    },
    {
      q: "What's the typical engagement?",
      a: "Four to twelve weeks, fixed-scope, weekly demos. Longer retainers exist after a first build.",
    },
    {
      q: "Do you maintain after handover?",
      a: "Optional retainer. Default is a clean handover with docs and looms so your team can drive.",
    },
    {
      q: "Is OpenClaw included with every engagement?",
      a: "Only when the brief calls for assistants. OpenClaw is one tool — we lead with the problem, not the platform.",
    },
  ]
  return (
    <section id="faq" className="border-hairline relative border-t">
      <SectionHeader
        no="09"
        kicker="faq"
        title={
          <>
            questions, <em className="font-serif italic">answered</em>.
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
                <p className="mt-4 max-w-3xl text-sm leading-relaxed text-ash md:pl-16">
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

/* -------------------------------------------------------------- 10 handover */

function Handover() {
  return (
    <section
      id="handover"
      className="border-hairline relative isolate overflow-hidden border-t"
    >
      <div className="spotlight absolute inset-0 -z-10 opacity-80" />
      <div className="bg-grid absolute inset-0 -z-10 opacity-30" />
      <div className="border-hairline mx-auto max-w-[1440px] border-x">
        <div className="border-hairline border-b px-6 py-5 md:px-10">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <span className="label flex items-center gap-3 text-ash">
              <span>10 / handover</span>
              <span className="hidden h-[10px] w-px bg-[rgb(245_235_220_/_0.15)] md:block" />
              <span className="hidden text-ember md:inline">closing frame</span>
            </span>
            <span className="label text-ash">auren / studios</span>
          </div>
        </div>
        <div className="flex flex-col items-center px-6 py-28 text-center md:py-40">
          <Reveal>
            <h2 className="font-display text-[clamp(3rem,8vw,7rem)] leading-[0.9] font-medium tracking-[-0.04em] text-bone">
              <em
                className="font-serif italic text-ember"
                style={{
                  textShadow:
                    "0 0 40px color-mix(in oklch, var(--ember) 38%, transparent), 0 0 80px color-mix(in oklch, var(--ember) 18%, transparent)",
                }}
              >
                let&apos;s make it.
              </em>
            </h2>
          </Reveal>
          <Reveal delay={120}>
            <p className="mt-8 max-w-md text-base leading-relaxed text-ash">
              One brief, one cadence, one studio. Bring the idea — we&apos;ll
              hand back a thing your team is proud to ship.
            </p>
          </Reveal>
          <Reveal delay={220}>
            <div className="mt-12 flex flex-wrap items-center justify-center gap-3">
              <MagneticButton
                href="/contact"
                className="ember-glow inline-flex items-center gap-2 rounded-sm bg-ember px-6 py-3.5 text-sm font-medium text-coal hover:brightness-110"
              >
                Start a project
                <ArrowUpRight className="magnetic h-4 w-4" />
              </MagneticButton>
              <Link
                href="mailto:hello@aurenstudios.com"
                className="border-hairline inline-flex items-center gap-2 rounded-sm border px-6 py-3.5 text-sm text-bone transition-colors hover:border-bone/60"
              >
                Or just say hi
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </Reveal>
          <Reveal delay={320}>
            <div className="label mt-10 flex flex-wrap items-center justify-center gap-3 text-ash">
              <span>office hours</span>
              <span className="h-[10px] w-px bg-[rgb(245_235_220_/_0.15)]" />
              <span>9–18 GST</span>
              <span className="h-[10px] w-px bg-[rgb(245_235_220_/_0.15)]" />
              <span>async outside hours</span>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
