"use client"

import { useEffect, useRef, useState } from "react"

export function SLODial({
  target = 99.973,
  variance = 0.02,
  size = 120,
}: {
  target?: number
  variance?: number
  size?: number
}) {
  const ref = useRef<SVGSVGElement | null>(null)
  const [v, setV] = useState(0)
  const started = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting && !started.current) {
            started.current = true
            runSettle()
            io.unobserve(e.target)
          }
        }
      },
      { threshold: 0.3 },
    )
    io.observe(el)

    let raf = 0
    const runSettle = () => {
      const start = performance.now()
      const dur = 1400
      const tick = (now: number) => {
        const t = Math.min(1, (now - start) / dur)
        const eased = 1 - Math.pow(1 - t, 3)
        setV(target * eased)
        if (t < 1) raf = requestAnimationFrame(tick)
        else runWiggle()
      }
      raf = requestAnimationFrame(tick)
    }
    const runWiggle = () => {
      const t0 = performance.now()
      const tick = (now: number) => {
        const s = (now - t0) / 1000
        const n = Math.sin(s * 1.1) * 0.6 + Math.sin(s * 2.6 + 1.2) * 0.4
        setV(target + n * variance * 0.5)
        raf = requestAnimationFrame(tick)
      }
      raf = requestAnimationFrame(tick)
    }
    return () => {
      io.disconnect()
      cancelAnimationFrame(raf)
    }
  }, [target, variance])

  const r = size / 2 - 6
  const circ = 2 * Math.PI * r
  const pct = Math.min(1, v / 100)
  const dashOffset = circ * (1 - pct)

  return (
    <div className="inline-flex items-center gap-4">
      <svg
        ref={ref}
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="-rotate-90"
        aria-label={`SLO gauge ${v.toFixed(3)} percent`}
      >
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="rgb(245 235 220 / 0.08)"
          strokeWidth={3}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="var(--ember)"
          strokeWidth={3}
          strokeDasharray={circ}
          strokeDashoffset={dashOffset}
          strokeLinecap="round"
          style={{
            filter:
              "drop-shadow(0 0 8px color-mix(in oklch, var(--ember) 60%, transparent))",
            transition: "stroke-dashoffset 80ms linear",
          }}
        />
        <circle
          cx={size / 2 + r * Math.cos(2 * Math.PI * pct)}
          cy={size / 2 + r * Math.sin(2 * Math.PI * pct)}
          r={3}
          fill="var(--amber-glow)"
        />
      </svg>
      <div>
        <div className="font-display text-4xl tracking-tight tabular-nums">
          {v.toFixed(3)}%
        </div>
        <div className="label mt-1">live slo / +/-{variance}</div>
      </div>
    </div>
  )
}
