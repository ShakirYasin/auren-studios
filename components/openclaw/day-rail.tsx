"use client"

import { useScroll } from "./scroll-provider"

const DAYS = [
  { n: 0, label: "Hook", anchor: "hero" },
  { n: 1, label: "Examples", anchor: "work" },
  { n: 2, label: "Safety", anchor: "safety" },
  { n: 3, label: "Tools", anchor: "services" },
  { n: 4, label: "Build", anchor: "services" },
  { n: 5, label: "Approval", anchor: "safety" },
  { n: 6, label: "Launch", anchor: "process" },
  { n: 7, label: "Train", anchor: "process" },
  { n: 8, label: "Pricing", anchor: "pricing" },
  { n: 9, label: "FAQ", anchor: "faq" },
  { n: 10, label: "Start", anchor: "handover" },
]

export function DayRail() {
  const { day, lenis } = useScroll()
  const activeIndex = Math.min(Math.floor(day), DAYS.length - 1)

  const jump = (anchor: string) => {
    const el = document.getElementById(anchor)
    if (!el) return
    if (lenis) {
      lenis.scrollTo(el, { offset: -40, duration: 1.4 })
    } else {
      el.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }

  const fillPct = Math.min(100, (day / 10) * 100)

  return (
    <aside
      aria-label="OpenClaw services page timeline"
      className="pointer-events-none fixed right-6 top-0 z-40 hidden h-screen flex-col items-end justify-center lg:flex"
    >
      <div className="pointer-events-auto relative flex h-[72vh] w-[140px] flex-col items-end">
       
        <div className="absolute right-[6px] top-0 h-full w-[2px] bg-[rgb(245_235_220_/_0.1)]">
          <div
            className="absolute left-0 top-0 w-full origin-top bg-gradient-to-b from-ember via-amber-glow to-ember"
            style={{
              height: `${fillPct}%`,
              boxShadow:
                "0 0 12px 1px color-mix(in oklch, var(--ember) 60%, transparent)",
              transition: "height 120ms linear",
            }}
          />
        </div>

        <ul className="relative flex h-full w-full flex-col justify-between">
          {DAYS.map((d, i) => {
            const past = i < activeIndex
            const active = i === activeIndex
            const tickColor = active
              ? "bg-ember day-tick-active"
              : past
                ? "bg-bone/70"
                : "bg-[rgb(245_235_220_/_0.25)]"
            return (
              <li
                key={d.n}
                className="group relative flex items-center justify-end gap-3"
              >
                <button
                  type="button"
                  onClick={() => jump(d.anchor)}
                  aria-label={`Jump to day ${d.n}: ${d.label}`}
                  className="press flex items-center gap-3 pr-1"
                >
                  <span
                    className={`label whitespace-nowrap text-[9px] transition-opacity ${
                      active
                        ? "text-ember opacity-100"
                        : "text-ash opacity-0 group-hover:opacity-100"
                    }`}
                  >
                    D{String(d.n).padStart(2, "0")} / {d.label}
                  </span>
                  <span
                    className={`block rounded-full transition-all ${tickColor} ${
                      active
                        ? "h-[6px] w-[6px]"
                        : past
                          ? "h-[4px] w-[4px]"
                          : "h-[3px] w-[3px]"
                    }`}
                  />
                </button>
              </li>
            )
          })}
        </ul>
      </div>
    </aside>
  )
}

export function DayRailMobile() {
  const { day } = useScroll()
  const fill = Math.min(100, (day / 10) * 100)
  const activeIndex = Math.min(Math.floor(day), DAYS.length - 1)
  const activeLabel = DAYS[activeIndex]
  return (
    <div className="pointer-events-none fixed left-0 right-0 top-0 z-40 h-[2px] bg-[rgb(245_235_220_/_0.06)] lg:hidden">
      <div
        className="h-full bg-gradient-to-r from-ember via-amber-glow to-ember"
        style={{ width: `${fill}%`, transition: "width 140ms linear" }}
      />
      <div className="label absolute left-4 top-2 text-[9px] text-ash">
        D{String(activeLabel.n).padStart(2, "0")} / {activeLabel.label}
      </div>
    </div>
  )
}
