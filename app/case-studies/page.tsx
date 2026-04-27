import Link from "next/link"

import { SectionHeader } from "@/components/auren/section-header"
import { CaseStudyTile } from "@/components/auren/case-study-tile"

export const metadata = {
  title: "Case Studies — Auren Studios",
  description: "Detailed write-ups from recent studio engagements.",
}

const CASES = [
  {
    slug: "acme-onboarding",
    eyebrow: "automation",
    title: "Halved onboarding time",
    result: "−51% time-to-first-value",
  },
  {
    slug: "northwind-ops",
    eyebrow: "operations",
    title: "Field tech in your pocket",
    result: "+38% NPS in 90 days",
  },
  {
    slug: "helio-platform",
    eyebrow: "saas",
    title: "From MVP to series A in 9 months",
    result: "$0 → $1.2M ARR",
  },
] as const

export default function Page() {
  return (
    <main className="relative z-10 min-h-svh bg-transparent text-bone">
      {/* 00 — header */}
      <SectionHeader
        no="00"
        kicker="case studies"
        title={
          <>
            recent <em className="font-serif italic">work</em>, in detail.
          </>
        }
        lede="Three deep dives. We'll keep adding as engagements close."
      />

      {/* grid */}
      <section className="border-hairline relative border-t">
        <div className="border-hairline mx-auto max-w-[1440px] border-x">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {CASES.map((c) => (
              <CaseStudyTile key={c.slug} {...c} />
            ))}
          </div>
        </div>
      </section>

      {/* 01 — open invitations */}
      <section className="border-hairline relative border-t">
        <SectionHeader no="01" kicker="open invitations" title={<>have something <em className="font-serif italic">worth</em> writing up?</>} />
        <div className="border-hairline mx-auto max-w-[1440px] border-x">
          <div className="border-hairline flex flex-col items-start justify-between gap-4 border-t p-8 md:flex-row md:items-center md:p-10">
            <span className="font-display text-[clamp(1.25rem,2vw,1.75rem)] leading-tight font-medium tracking-tight text-bone">
              Have an engagement worth writing up?{" "}
              <Link href="/contact" className="text-ember hover:underline">
                tell us →
              </Link>
            </span>
            <span className="label font-mono text-ash">
              case studies / 03
            </span>
          </div>
        </div>
      </section>
    </main>
  )
}
