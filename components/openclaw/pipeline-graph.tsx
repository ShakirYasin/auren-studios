"use client"

import { useEffect, useRef, useState } from "react"
import {
  ClipboardCheck,
  Gauge,
  LockKeyhole,
  Plug,
  Sparkles,
  Workflow,
} from "lucide-react"

const NODES = [
  { icon: ClipboardCheck, label: "Workflow", tag: "pick the task" },
  { icon: Plug, label: "Tools", tag: "connect apps" },
  { icon: Sparkles, label: "Assistant", tag: "build agent" },
  { icon: LockKeyhole, label: "Approval", tag: "set limits" },
  { icon: Workflow, label: "Launch", tag: "run live" },
  { icon: Gauge, label: "Handover", tag: "team guide" },
]

export function PipelineGraph() {
  const ref = useRef<HTMLDivElement | null>(null)
  const [p, setP] = useState(0)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    let raf = 0
    const update = () => {
      const rect = el.getBoundingClientRect()
      const vh = window.innerHeight
      const total = rect.height + vh
      const scrolled = vh - rect.top
      const prog = Math.max(0, Math.min(1, scrolled / total))
      setP(prog)
    }
    const onScroll = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(update)
    }
    update()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll)
    return () => {
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
      cancelAnimationFrame(raf)
    }
  }, [])

  const active = Math.floor(((clamp01(p) - 0.1) / 0.75) * NODES.length)

  return (
    <div ref={ref} className="relative">
      <div
        className="pointer-events-none absolute left-0 right-0 top-1/2 hidden h-px -translate-y-1/2 md:block"
        style={{ background: "rgb(245 235 220 / 0.12)" }}
      />
      <div
        className="pointer-events-none absolute left-0 top-1/2 hidden h-px -translate-y-1/2 md:block"
        style={{
          width: `${Math.min(100, Math.max(0, ((active + 0.5) / NODES.length) * 100))}%`,
          background:
            "linear-gradient(90deg, transparent, var(--ember), var(--amber-glow))",
          boxShadow:
            "0 0 12px color-mix(in oklch, var(--ember) 50%, transparent)",
          transition: "width 420ms cubic-bezier(0.22, 1, 0.36, 1)",
        }}
      />
      <div className="grid grid-cols-2 gap-4 md:grid-cols-6 md:gap-0">
        {NODES.map((n, i) => {
          const Icon = n.icon
          const isOn = i <= active
          const isLive = i < active
          return (
            <div
              key={n.label}
              className="relative flex flex-col items-center justify-center py-8 md:py-12"
            >
              {isLive && i > 0 && (
                <span
                  aria-hidden
                  className="pointer-events-none absolute top-1/2 hidden h-1 w-1 -translate-y-1/2 rounded-full bg-ember md:block"
                  style={{
                    left: "-50%",
                    boxShadow: "0 0 10px 2px var(--ember)",
                    animation: `packet-${i} 1.8s linear infinite`,
                  }}
                />
              )}
              <div
                className={`relative flex h-12 w-12 items-center justify-center rounded-full border transition-all duration-500 ${
                  isOn
                    ? "border-ember bg-coal/80 text-ember"
                    : "border-hairline bg-surface-1 text-ash"
                }`}
                style={
                  isOn
                    ? {
                        boxShadow:
                          "0 0 0 4px color-mix(in oklch, var(--ember) 12%, transparent), 0 0 22px color-mix(in oklch, var(--ember) 45%, transparent)",
                      }
                    : {}
                }
              >
                <Icon className="h-4 w-4" strokeWidth={1.5} />
                {isOn && (
                  <span className="absolute inset-0 animate-ping rounded-full border border-ember/50" />
                )}
              </div>
              <div className="mt-3 text-center">
                <div
                  className={`font-display text-sm tracking-tight transition-colors ${
                    isOn ? "text-bone" : "text-ash"
                  }`}
                >
                  {n.label}
                </div>
                <div className="label mt-1 text-[8px]">{n.tag}</div>
              </div>
            </div>
          )
        })}
      </div>
      <style>{`
        @keyframes packet-1 { 0% { transform: translateX(0) translateY(-50%); opacity: 0; } 10% { opacity: 1; } 90% { opacity: 1; } 100% { transform: translateX(100%) translateY(-50%); opacity: 0; } }
        @keyframes packet-2 { 0% { transform: translateX(0) translateY(-50%); opacity: 0; } 10% { opacity: 1; } 90% { opacity: 1; } 100% { transform: translateX(100%) translateY(-50%); opacity: 0; } }
        @keyframes packet-3 { 0% { transform: translateX(0) translateY(-50%); opacity: 0; } 10% { opacity: 1; } 90% { opacity: 1; } 100% { transform: translateX(100%) translateY(-50%); opacity: 0; } }
        @keyframes packet-4 { 0% { transform: translateX(0) translateY(-50%); opacity: 0; } 10% { opacity: 1; } 90% { opacity: 1; } 100% { transform: translateX(100%) translateY(-50%); opacity: 0; } }
        @keyframes packet-5 { 0% { transform: translateX(0) translateY(-50%); opacity: 0; } 10% { opacity: 1; } 90% { opacity: 1; } 100% { transform: translateX(100%) translateY(-50%); opacity: 0; } }
      `}</style>
    </div>
  )
}

function clamp01(v: number) {
  return Math.max(0, Math.min(1, v))
}
