import Link from "next/link"
import {
  ArrowRight,
  ArrowUpRight,
  Compass,
  Layers,
  PenTool,
  Smartphone,
  Sparkles,
  Workflow,
} from "lucide-react"

import { SectionHeader } from "@/components/auren/section-header"
import { ServiceCard } from "@/components/auren/service-card"
import { MagneticButton } from "@/components/openclaw/magnetic-button"
import { Reveal } from "@/components/reveal"

export const metadata = {
  title: "Services — Auren Studios",
  description:
    "Six disciplines under one roof: AI automations, AI agents, web, mobile, brand, and SaaS engineering.",
}

const SERVICES = [
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

const HOW_WE_WORK = [
  {
    k: "shared standup",
    v: "One studio thread. Designers, engineers, and AI folks see the same brief move every morning.",
  },
  {
    k: "design ↔ engineering pairing",
    v: "Type, motion, and code reviewed together — not thrown over a wall. The product feels like the brand.",
  },
  {
    k: "weekly client demo",
    v: "Every Friday, a working preview link and a five-minute Loom. No surprises, no theatre.",
  },
]

export default function Page() {
  return (
    <main className="relative z-10 min-h-svh bg-transparent text-bone">
      {/* 00 — overview */}
      <section id="overview" className="relative">
        <SectionHeader
          no="00"
          kicker="services"
          title={
            <>
              everything in one{" "}
              <em className="font-serif italic">studio</em>.
            </>
          }
          lede="A short tour of what Auren offers as production-ready service lines."
        />
        <Reveal
          as="div"
          stagger={70}
          className="border-hairline mx-auto grid max-w-[1440px] grid-cols-1 border-x sm:grid-cols-2 md:grid-cols-3"
        >
          {SERVICES.map((s) => (
            <ServiceCard key={s.no} {...s} />
          ))}
        </Reveal>

        <div className="border-hairline mx-auto max-w-[1440px] border-x">
          <div className="border-hairline flex flex-col items-start justify-between gap-4 border-t px-6 py-6 md:flex-row md:items-center md:px-10">
            <span className="label text-ash">
              not sure which one fits?
            </span>
            <Link
              href="/contact"
              className="group inline-flex items-center gap-2 text-sm text-bone transition-colors hover:text-ember"
            >
              tell us about your project
              <ArrowUpRight className="magnetic h-4 w-4" strokeWidth={1.5} />
            </Link>
          </div>
        </div>
      </section>

      {/* 01 — how we work */}
      <section id="how-we-work" className="border-hairline relative border-t">
        <SectionHeader
          no="01"
          kicker="how we work"
          title={
            <>
              one <em className="font-serif italic">team</em>, one cadence.
            </>
          }
          lede="Six disciplines that ship like one studio."
        />
        <div className="border-hairline mx-auto max-w-[1440px] border-x">
          <Reveal
            as="div"
            stagger={80}
            className="grid grid-cols-1 md:grid-cols-3"
          >
            {HOW_WE_WORK.map((s, i) => (
              <div
                key={s.k}
                className={`border-hairline flex flex-col gap-4 border-b p-8 md:border-b-0 md:p-10 ${
                  i < HOW_WE_WORK.length - 1 ? "md:border-r" : ""
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="label text-ember">
                    0{i + 1} / step
                  </span>
                  <span className="font-mono text-xs text-ash">
                    0{i + 1} / 03
                  </span>
                </div>
                <h4 className="font-display text-xl font-medium tracking-tight text-bone md:text-2xl">
                  {s.k}
                </h4>
                <p className="text-sm leading-relaxed text-ash">{s.v}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* 02 — next */}
      <section
        id="next"
        className="border-hairline relative isolate overflow-hidden border-t"
      >
        <SectionHeader
          no="02"
          kicker="next"
          title={
            <>
              pick a <em className="font-serif italic">line</em> — or talk to us.
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
                    one studio. six service lines.
                  </em>
                </h3>
              </Reveal>
              <Reveal delay={120}>
                <p className="max-w-md text-base leading-relaxed text-ash">
                  Bring the brief — we&apos;ll point at the right line and
                  hand back a thing your team is proud to ship.
                </p>
              </Reveal>
              <Reveal delay={220}>
                <div className="flex flex-wrap items-center justify-center gap-3">
                  <MagneticButton
                    href="/contact"
                    className="ember-glow inline-flex items-center gap-2 rounded-sm bg-ember px-6 py-3.5 text-sm font-medium text-coal hover:brightness-110"
                  >
                    Start a project
                    <ArrowUpRight className="magnetic h-4 w-4" />
                  </MagneticButton>
                  <Link
                    href="/case-studies"
                    className="border-hairline inline-flex items-center gap-2 rounded-sm border px-6 py-3.5 text-sm text-bone transition-colors hover:border-bone/60"
                  >
                    See case studies
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
