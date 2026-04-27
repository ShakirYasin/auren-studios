import Link from "next/link"

import { SectionHeader } from "@/components/auren/section-header"
import { Reveal } from "@/components/reveal"

export const metadata = {
  title: "Portfolio — Auren Studios",
  description: "Selected visual work from the studio.",
}

const TILES = [
  { title: "northwind ops", tag: "automation" },
  { title: "acme onboarding", tag: "ai agent" },
  { title: "helio platform", tag: "saas" },
  { title: "studio mark explorations", tag: "brand" },
  { title: "lumen mobile", tag: "ios" },
  { title: "cobalt admin", tag: "web" },
  { title: "voltway dashboard", tag: "saas" },
  { title: "halcyon onboarding", tag: "automation" },
  { title: "ember type system", tag: "brand" },
  { title: "ridge field app", tag: "mobile" },
  { title: "stratus pricing page", tag: "web" },
  { title: "atlas knowledge agent", tag: "ai agent" },
] as const

export default function Page() {
  return (
    <main className="relative z-10 min-h-svh bg-transparent text-bone">
      {/* 00 — header */}
      <SectionHeader
        no="00"
        kicker="portfolio"
        title={
          <>
            selected <em className="font-serif italic">visual</em> work.
          </>
        }
        lede="Snippets, builds, and brand work from the studio."
      />

      {/* image grid */}
      <section className="border-hairline relative border-t">
        <div className="border-hairline mx-auto max-w-[1440px] border-x">
          <Reveal
            as="div"
            stagger={50}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
          >
            {TILES.map((tile) => (
              <Link
                key={`${tile.title}-${tile.tag}`}
                href="#"
                className="group relative block aspect-[4/3] border-hairline border-b border-r bg-surface-1 bg-grid overflow-hidden"
              >
                <span className="label absolute top-3 left-3 text-ash">
                  image / placeholder
                </span>
                <span className="absolute inset-0 grid place-items-center text-bone opacity-0 transition-opacity group-hover:opacity-100 bg-coal/40">
                  <span className="label">
                    {tile.title} · {tile.tag}
                  </span>
                </span>
              </Link>
            ))}
          </Reveal>
        </div>
      </section>

      {/* CTA cell */}
      <section className="border-hairline relative border-t">
        <div className="border-hairline mx-auto max-w-[1440px] border-x">
          <div className="flex flex-col items-start justify-between gap-4 p-8 md:flex-row md:items-center md:p-10">
            <span className="font-display text-[clamp(1.25rem,2vw,1.75rem)] leading-tight font-medium tracking-tight text-bone">
              want the deeper read?{" "}
              <Link
                href="/case-studies"
                className="text-ember hover:underline"
              >
                see case studies →
              </Link>
            </span>
            <span className="label font-mono text-ash">
              portfolio / 12 tiles
            </span>
          </div>
        </div>
      </section>
    </main>
  )
}
