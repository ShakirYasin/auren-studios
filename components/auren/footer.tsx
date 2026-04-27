/**
 * Auren Studios global footer.
 *
 * Five-column hairline grid with the studio brand, services, studio links,
 * connect channels, and legal — capped by a giant ghost-watermark and a
 * tiny mono build row.
 */

import Link from "next/link"

import { Mark } from "@/components/auren/mark"

type FooterLink = { label: string; href: string }

const SERVICES: FooterLink[] = [
  { label: "AI Automations", href: "/services/ai-automations" },
  { label: "AI Agents — inc. OpenClaw", href: "/services/ai-agents" },
  { label: "Web Design", href: "/services/web-design" },
  { label: "Mobile Apps", href: "/services/mobile-apps" },
  { label: "Brand Identity", href: "/services/brand-identity" },
  { label: "SaaS Engineering", href: "/services/saas-engineering" },
]

const STUDIO: FooterLink[] = [
  { label: "About", href: "/about" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Contact", href: "/contact" },
]

const CONNECT: FooterLink[] = [
  { label: "hello@aurenstudios.com", href: "mailto:hello@aurenstudios.com" },
  { label: "X / Twitter", href: "#" },
  { label: "GitHub", href: "#" },
  { label: "LinkedIn", href: "#" },
]

const LEGAL: FooterLink[] = [
  { label: "Privacy", href: "#" },
  { label: "Terms", href: "#" },
]

function FooterColumn({
  heading,
  links,
}: {
  heading: string
  links: FooterLink[]
}) {
  return (
    <div>
      <div className="label text-ash">{heading}</div>
      <ul className="mt-5 space-y-2.5 text-sm">
        {links.map((l) => (
          <li key={`${heading}-${l.label}`}>
            {l.href.startsWith("/") ? (
              <Link
                href={l.href}
                className="text-ash transition hover:text-bone"
              >
                {l.label}
              </Link>
            ) : (
              <a
                href={l.href}
                className="text-ash transition hover:text-bone"
              >
                {l.label}
              </a>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}

export function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="border-hairline relative border-t bg-coal">
      <div className="border-hairline mx-auto max-w-[1440px] border-x px-6 py-14 md:px-10">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-5">
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2.5">
              <Mark />
              <span className="font-display text-xl font-medium tracking-tight">
                Auren Studios
              </span>
            </Link>
            <p className="mt-5 max-w-xs text-sm text-ash">
              A boutique studio for AI agents, automations, web, and mobile —
              shipped with cinematic care.
            </p>
            <div className="label mt-8 flex items-center gap-2 text-ash">
              <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-live" />
              Studio open / taking briefs
            </div>
          </div>

          <FooterColumn heading="Services" links={SERVICES} />
          <FooterColumn heading="Studio" links={STUDIO} />
          <FooterColumn heading="Connect" links={CONNECT} />
          <FooterColumn heading="Legal" links={LEGAL} />
        </div>

        <div className="rule mt-12" />

        <div className="mt-6 flex flex-col items-start justify-between gap-4 font-mono text-[11px] text-ash md:flex-row md:items-center">
          <span>(c) {year} Auren Studios. All rights reserved.</span>
          <span className="flex items-center gap-5">
            <span>v0.1.0</span>
            <span>build / auren-shell</span>
            <a href="#" className="press hover:text-bone">
              status.aurenstudios.com
            </a>
          </span>
        </div>
      </div>

      <div className="border-hairline pointer-events-none overflow-hidden border-t select-none">
        <div className="mx-auto max-w-[1440px] px-4">
          <div className="flex justify-center py-6 font-display text-[clamp(6rem,18vw,16rem)] leading-[0.8] font-medium tracking-[-0.06em] text-bone/[0.05]">
            auren
          </div>
        </div>
      </div>
    </footer>
  )
}
