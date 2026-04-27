import { ArrowUpRight } from "lucide-react"

import { SectionHeader } from "@/components/auren/section-header"
import { MagneticButton } from "@/components/openclaw/magnetic-button"
import { Reveal } from "@/components/reveal"

export const metadata = {
  title: "About — Auren Studios",
  description:
    "A small studio building AI, web, and mobile work with cinematic care.",
}

const PRINCIPLES = [
  {
    n: "01",
    t: "clarity over cleverness",
    d: "We pick the boring solution that you can read in six months.",
  },
  {
    n: "02",
    t: "weekly demos, no exceptions",
    d: "Every Friday, the work runs. If it doesn't, the email says so.",
  },
  {
    n: "03",
    t: "handover always",
    d: "Runbooks, dashboards, and a Loom — your team owns it after us.",
  },
]

const TEAM = [
  {
    initials: "SL",
    name: "Studio Lead",
    role: "Design + Eng",
    tag: "[ founder ]",
  },
  {
    initials: "EN",
    name: "Engineer",
    role: "AI + Backend",
    tag: "[ ai ]",
  },
  {
    initials: "DS",
    name: "Designer",
    role: "Brand + Motion",
    tag: "[ brand ]",
  },
  {
    initials: "PR",
    name: "Producer",
    role: "Ops + Delivery",
    tag: "[ ops ]",
  },
]

const TIMELINE = [
  { year: "2025", label: "studio formed", note: "small, cinematic, no fluff." },
  {
    year: "2025",
    label: "first 4 clients",
    note: "founders, agencies, operators.",
  },
  {
    year: "2026",
    label: "openclaw service line",
    note: "the AI-ops practice spins up.",
  },
  {
    year: "2026",
    label: "auren rebrand",
    note: "studio shell, six service lines.",
  },
  { year: "2026", label: "present", note: "shipping weekly.", live: true },
]

export default function Page() {
  return (
    <main className="relative z-10 min-h-svh bg-transparent text-bone">
      {/* 00 — header */}
      <SectionHeader
        no="00"
        kicker="about"
        title={
          <>
            a studio that <em className="font-serif italic">ships</em>.
          </>
        }
        lede="A short note on who we are, how we work, and where we're going."
      />

      {/* studio story + timeline */}
      <section className="border-hairline relative border-t">
        <div className="border-hairline mx-auto grid max-w-[1440px] grid-cols-1 border-x md:grid-cols-12">
          {/* left — studio story */}
          <div className="border-hairline col-span-1 border-b p-8 md:col-span-7 md:border-b-0 md:border-r md:p-12">
            <span className="label text-ash">studio note</span>
            <div className="mt-8 space-y-6">
              <p className="text-base leading-relaxed text-bone">
                Founded recently. Distributed by{" "}
                <em className="font-serif italic">design</em>. We started Auren
                because we wanted a small place to do careful work — design and
                engineering paired on the same call, weekly demos that prove the
                thing actually runs.
              </p>
              <p className="text-base leading-relaxed text-ash">
                We're four people who used to ship at larger studios and
                stopped enjoying the meetings about meetings. The studio is
                deliberately small so the founders are still the ones writing
                the code and pushing the pixels.
              </p>
              <p className="text-base leading-relaxed text-ash">
                Our work splits across six lines — AI automations, AI agents,
                web design, mobile, brand identity, SaaS engineering. Most
                projects pull from two or three at once, which is why the
                studio sits around them rather than under any single one.
              </p>
              <p className="text-base leading-relaxed text-bone">
                We've shipped for early-stage founders, agencies, and a couple
                of operators we still <em className="font-serif italic">can't
                name</em>. Distributed across UAE, US, and EU — which means
                someone is awake when your build breaks.
              </p>
              <p className="text-base leading-relaxed text-ash">
                Things we don't do: body-shopping, fixed monthly retainers
                without scope, or "AI strategy" decks that never compile.
                Things we do: brief, build, demo, hand it over.
              </p>
            </div>
          </div>

          {/* right — timeline */}
          <aside className="col-span-1 flex flex-col md:col-span-5">
            <div className="flex items-center justify-between border-b border-hairline px-6 py-3 md:px-8">
              <div className="flex items-center gap-2">
                <span className="pulse-dot h-[6px] w-[6px] rounded-full bg-ember" />
                <span className="label text-[10px] text-ash">
                  studio.timeline
                </span>
              </div>
              <span className="label text-[10px] text-live">live</span>
            </div>
            <div className="font-mono text-xs leading-relaxed text-ash p-6 md:p-8 space-y-4">
              {TIMELINE.map((row, i) => (
                <div key={i} className="flex gap-3">
                  <span
                    className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${
                      row.live
                        ? "bg-ember pulse-dot"
                        : "bg-[rgb(245_235_220_/_0.25)]"
                    }`}
                  />
                  <div className="flex-1">
                    <div className="flex items-baseline gap-2">
                      <span className="text-ember/70">&gt;</span>
                      <span className="text-bone">{row.year}</span>
                      <span className="text-ash/60">/</span>
                      <span className={row.live ? "text-ember" : "text-bone"}>
                        {row.label}
                      </span>
                    </div>
                    <div className="mt-1 pl-6 text-[11px] text-ash/70">
                      {row.note}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-auto border-t border-hairline px-6 py-3 md:px-8">
              <span className="label text-[10px] text-ash">
                last update / today
              </span>
            </div>
          </aside>
        </div>
      </section>

      {/* 01 — principles */}
      <section className="border-hairline relative border-t">
        <SectionHeader
          no="01"
          kicker="principles"
          title={
            <>
              three working <em className="font-serif italic">rules</em>.
            </>
          }
        />
        <div className="border-hairline mx-auto max-w-[1440px] border-x">
          <Reveal
            as="div"
            stagger={80}
            className="grid grid-cols-1 md:grid-cols-3"
          >
            {PRINCIPLES.map((p, i) => (
              <div
                key={p.n}
                className={`border-hairline border-b p-8 md:border-b-0 md:p-10 ${
                  i < PRINCIPLES.length - 1 ? "md:border-r" : ""
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="label text-ember">{p.n}</span>
                  <span className="font-mono text-xs text-ash">
                    {p.n} / 03
                  </span>
                </div>
                <h4 className="mt-6 font-display text-2xl font-medium tracking-tight text-bone">
                  {p.t}
                </h4>
                <p className="mt-4 max-w-prose text-sm leading-relaxed text-ash">
                  {p.d}
                </p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* 02 — team */}
      <section className="border-hairline relative border-t">
        <SectionHeader
          no="02"
          kicker="team"
          title={
            <>
              the people who <em className="font-serif italic">do</em> the work.
            </>
          }
          lede="A small core, with collaborators rotated in by discipline."
        />
        <div className="border-hairline mx-auto max-w-[1440px] border-x">
          <Reveal
            as="div"
            stagger={70}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
          >
            {TEAM.map((m, i) => (
              <div
                key={m.tag}
                className={`border-hairline border-b p-8 md:p-10 ${
                  i < TEAM.length - 1 ? "lg:border-r" : ""
                } ${i % 2 === 0 ? "sm:border-r lg:border-r" : ""}`}
              >
                <div className="h-14 w-14 rounded-full bg-surface-2 border border-hairline grid place-items-center">
                  <span className="font-mono text-xs text-ash">
                    {m.initials}
                  </span>
                </div>
                <div className="mt-6">
                  <div className="font-sans text-base font-medium text-bone">
                    {m.name}
                  </div>
                  <div className="mt-1 text-sm text-ash">{m.role}</div>
                  <div className="mt-3 font-mono text-[10px] tracking-wider text-ember">
                    {m.tag}
                  </div>
                </div>
              </div>
            ))}
          </Reveal>
          <div className="border-t border-hairline px-8 py-4 md:px-10">
            <span className="label text-ash">
              team listing in progress · names rotated in by discipline
            </span>
          </div>
        </div>
      </section>

      {/* 03 — next */}
      <section
        id="next"
        className="border-hairline relative isolate overflow-hidden border-t"
      >
        <SectionHeader no="03" kicker="next" title={<>next</>} />
        <div className="border-hairline mx-auto max-w-[1440px] border-x">
          <div className="relative isolate overflow-hidden">
            <div className="spotlight absolute inset-0 -z-10 opacity-80" />
            <div className="bg-grid absolute inset-0 -z-10 opacity-30" />
            <div className="flex flex-col items-center gap-10 px-6 py-24 text-center md:py-32">
              <Reveal>
                <h3 className="font-display text-[clamp(2.25rem,5vw,4.5rem)] leading-[0.95] font-medium tracking-[-0.035em] text-bone">
                  <em className="font-serif italic text-ember">
                    talk to us. ↘
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
    </main>
  )
}
