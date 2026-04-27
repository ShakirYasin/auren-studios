"use client"

/**
 * Auren Studios global header.
 *
 * Sticky, hairline-bordered, backdrop-blurred. Houses the studio mark + wordmark,
 * primary navigation with a Services dropdown, and a magnetic CTA. On mobile it
 * collapses into an off-canvas drawer with a vertical label rail.
 */

import Link from "next/link"
import { useEffect, useId, useRef, useState } from "react"
import { ArrowUpRight, ChevronDown, Menu, X } from "lucide-react"

import { Mark } from "@/components/auren/mark"
import { MagneticButton } from "@/components/openclaw/magnetic-button"
import { cn } from "@/lib/utils"

type ServiceLink = {
  href: string
  label: string
  description: string
}

const SERVICES: ServiceLink[] = [
  {
    href: "/services/ai-automations",
    label: "AI Automations",
    description: "Workflow agents that run in the background.",
  },
  {
    href: "/services/ai-agents",
    label: "AI Agents — inc. OpenClaw",
    description: "Done-for-you assistants for non-technical teams.",
  },
  {
    href: "/services/web-design",
    label: "Web Design",
    description: "Cinematic marketing sites, end to end.",
  },
  {
    href: "/services/mobile-apps",
    label: "Mobile Apps",
    description: "Native-feel iOS and Android product builds.",
  },
  {
    href: "/services/brand-identity",
    label: "Brand Identity",
    description: "Marks, systems, and motion for new ventures.",
  },
  {
    href: "/services/saas-engineering",
    label: "SaaS Engineering",
    description: "Production-grade platforms with shipping cadence.",
  },
]

const PRIMARY_LINKS: { href: string; label: string }[] = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/case-studies", label: "Case Studies" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/contact", label: "Contact" },
]

export function Nav() {
  const [servicesOpen, setServicesOpen] = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false)
  const servicesWrapRef = useRef<HTMLDivElement | null>(null)
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const dropdownId = useId()
  const mobileServicesId = useId()

  // Close dropdown / drawer on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return
      if (servicesOpen) setServicesOpen(false)
      if (drawerOpen) setDrawerOpen(false)
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [servicesOpen, drawerOpen])

  // Close dropdown when focus leaves the wrapper
  useEffect(() => {
    if (!servicesOpen) return
    const onFocusIn = (e: FocusEvent) => {
      if (
        servicesWrapRef.current &&
        e.target instanceof Node &&
        !servicesWrapRef.current.contains(e.target)
      ) {
        setServicesOpen(false)
      }
    }
    document.addEventListener("focusin", onFocusIn)
    return () => document.removeEventListener("focusin", onFocusIn)
  }, [servicesOpen])

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (!drawerOpen) return
    const original = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = original
    }
  }, [drawerOpen])

  const openServices = () => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current)
      closeTimer.current = null
    }
    setServicesOpen(true)
  }
  const scheduleCloseServices = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current)
    closeTimer.current = setTimeout(() => setServicesOpen(false), 140)
  }

  return (
    <header className="border-hairline sticky top-0 z-50 border-b bg-coal/70 backdrop-blur-xl">
      <div className="mx-auto flex h-14 max-w-[1440px] items-center justify-between px-6 lg:px-10">
        <Link href="/" className="flex items-center gap-2.5">
          <Mark />
          <span className="font-display text-xl leading-none font-medium tracking-tight">
            Auren Studios
          </span>
          <span className="label hidden pl-1 text-ash sm:inline">
            [ studio ]
          </span>
        </Link>

        <nav
          aria-label="Primary"
          className="hidden items-center gap-7 text-sm md:flex"
        >
          {PRIMARY_LINKS.slice(0, 2).map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-ash transition-colors hover:text-bone"
            >
              {l.label}
            </Link>
          ))}

          {/* Services dropdown */}
          <div
            ref={servicesWrapRef}
            className="relative"
            onMouseEnter={openServices}
            onMouseLeave={scheduleCloseServices}
          >
            <button
              type="button"
              aria-haspopup="true"
              aria-expanded={servicesOpen}
              aria-controls={dropdownId}
              onClick={() => setServicesOpen((v) => !v)}
              onFocus={openServices}
              className={cn(
                "inline-flex items-center gap-1 text-ash transition-colors hover:text-bone",
                servicesOpen && "text-bone",
              )}
            >
              Services
              <ChevronDown
                aria-hidden
                className={cn(
                  "h-3.5 w-3.5 transition-transform",
                  servicesOpen && "rotate-180",
                )}
              />
            </button>

            {servicesOpen && (
              <div
                id={dropdownId}
                role="menu"
                aria-label="Services"
                className="border-hairline absolute top-full left-1/2 z-50 mt-3 w-[min(720px,90vw)] -translate-x-1/2 border bg-surface-1"
                onMouseEnter={openServices}
                onMouseLeave={scheduleCloseServices}
              >
                <div className="grid grid-cols-1 sm:grid-cols-2">
                  {SERVICES.map((s, i) => (
                    <Link
                      key={s.href}
                      href={s.href}
                      role="menuitem"
                      onClick={() => setServicesOpen(false)}
                      className={cn(
                        "border-hairline group block px-5 py-4 transition-colors hover:bg-surface-2",
                        // hairline borders between cells
                        "border-b",
                        i % 2 === 0 && "sm:border-r",
                        // last row removes bottom borders
                        i >= SERVICES.length - 2 && "sm:border-b-0",
                        i === SERVICES.length - 1 && "border-b-0",
                      )}
                    >
                      <div className="flex items-center justify-between gap-3">
                        <span className="text-sm text-bone">{s.label}</span>
                        <ArrowUpRight
                          aria-hidden
                          className="magnetic h-3.5 w-3.5 text-ash group-hover:text-ember"
                        />
                      </div>
                      <div className="mt-1 text-xs text-ash">
                        {s.description}
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {PRIMARY_LINKS.slice(2).map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-ash transition-colors hover:text-bone"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden md:block">
            <MagneticButton
              href="/contact"
              className="inline-flex items-center gap-1.5 rounded-full bg-bone px-4 py-1.5 text-sm font-medium text-coal hover:bg-ember hover:text-coal"
            >
              Start a project
              <ArrowUpRight className="magnetic h-3.5 w-3.5" />
            </MagneticButton>
          </div>

          <button
            type="button"
            aria-label="Open menu"
            aria-expanded={drawerOpen}
            aria-controls="auren-mobile-drawer"
            onClick={() => setDrawerOpen(true)}
            className="border-hairline grid h-9 w-9 place-items-center rounded-sm border text-ash transition-colors hover:text-bone md:hidden"
          >
            <Menu className="h-4 w-4" aria-hidden />
          </button>
        </div>
      </div>

      {/* Mobile off-canvas drawer */}
      {drawerOpen && (
        <div className="fixed inset-0 z-[60] md:hidden">
          {/* Backdrop */}
          <button
            type="button"
            aria-label="Close menu"
            tabIndex={-1}
            onClick={() => setDrawerOpen(false)}
            className="absolute inset-0 cursor-default bg-coal/70 backdrop-blur-sm"
          />

          {/* Panel */}
          <div
            id="auren-mobile-drawer"
            role="dialog"
            aria-modal="true"
            aria-label="Site navigation"
            className="border-hairline absolute top-0 right-0 flex h-full w-[min(360px,88vw)] flex-row border-l bg-coal"
          >
            {/* Vertical label rail */}
            <div className="border-hairline flex w-10 shrink-0 items-start justify-center border-r py-5">
              <span className="label rotate-180 text-ash [writing-mode:vertical-rl]">
                auren / studios
              </span>
            </div>

            <div className="flex min-w-0 flex-1 flex-col">
              <div className="border-hairline flex h-14 items-center justify-between border-b px-5">
                <Link
                  href="/"
                  onClick={() => setDrawerOpen(false)}
                  className="flex items-center gap-2.5"
                >
                  <Mark />
                  <span className="font-display text-lg leading-none font-medium tracking-tight">
                    Auren Studios
                  </span>
                </Link>
                <button
                  type="button"
                  aria-label="Close menu"
                  onClick={() => setDrawerOpen(false)}
                  className="border-hairline grid h-9 w-9 place-items-center rounded-sm border text-ash transition-colors hover:text-bone"
                >
                  <X className="h-4 w-4" aria-hidden />
                </button>
              </div>

              <nav
                aria-label="Mobile primary"
                className="flex flex-col px-2 py-3"
              >
                {PRIMARY_LINKS.slice(0, 2).map((l) => (
                  <Link
                    key={l.href}
                    href={l.href}
                    onClick={() => setDrawerOpen(false)}
                    className="border-hairline border-b px-3 py-3 text-base text-bone transition-colors hover:text-ember"
                  >
                    {l.label}
                  </Link>
                ))}

                {/* Mobile services accordion */}
                <button
                  type="button"
                  aria-expanded={mobileServicesOpen}
                  aria-controls={mobileServicesId}
                  onClick={() => setMobileServicesOpen((v) => !v)}
                  className="border-hairline flex items-center justify-between border-b px-3 py-3 text-left text-base text-bone transition-colors hover:text-ember"
                >
                  Services
                  <ChevronDown
                    aria-hidden
                    className={cn(
                      "h-4 w-4 text-ash transition-transform",
                      mobileServicesOpen && "rotate-180",
                    )}
                  />
                </button>
                {mobileServicesOpen && (
                  <div
                    id={mobileServicesId}
                    className="border-hairline flex flex-col border-b bg-surface-1"
                  >
                    {SERVICES.map((s) => (
                      <Link
                        key={s.href}
                        href={s.href}
                        onClick={() => setDrawerOpen(false)}
                        className="border-hairline border-b px-5 py-3 text-sm text-bone last:border-b-0 hover:text-ember"
                      >
                        <div>{s.label}</div>
                        <div className="mt-0.5 text-xs text-ash">
                          {s.description}
                        </div>
                      </Link>
                    ))}
                  </div>
                )}

                {PRIMARY_LINKS.slice(2).map((l) => (
                  <Link
                    key={l.href}
                    href={l.href}
                    onClick={() => setDrawerOpen(false)}
                    className="border-hairline border-b px-3 py-3 text-base text-bone transition-colors hover:text-ember"
                  >
                    {l.label}
                  </Link>
                ))}
              </nav>

              <div className="mt-auto border-hairline border-t p-5">
                <Link
                  href="/contact"
                  onClick={() => setDrawerOpen(false)}
                  className="ember-glow inline-flex w-full items-center justify-center gap-2 rounded-sm bg-ember px-5 py-3 text-sm font-medium text-coal hover:brightness-110"
                >
                  Start a project
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
