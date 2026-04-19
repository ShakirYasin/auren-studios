"use client"

import { useEffect, useRef, useState } from "react"

type Props = {
  /** Final settled value. */
  value: number
  /** Decimal places. */
  decimals?: number
  /** Prefix (e.g. "$"). */
  prefix?: string
  /** Suffix (e.g. "%"). */
  suffix?: string
  /** Live variance after settle (±). */
  variance?: number
  /** Settle duration ms. */
  duration?: number
  /** Minimum absolute change per wiggle frame to keep it subtle. */
  wiggleHz?: number
}

/**
 * Counter that settles (overshoot → pull back) then enters a low-amplitude
 * live wiggle. Uses IntersectionObserver so it only animates when visible.
 */
export function LiveCounter({
  value,
  decimals = 0,
  prefix = "",
  suffix = "",
  variance = 0,
  duration = 1600,
  wiggleHz = 1.4,
}: Props) {
  const ref = useRef<HTMLSpanElement | null>(null)
  const [display, setDisplay] = useState(0)
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
      { threshold: 0.4 }
    )
    io.observe(el)

    let raf = 0

    const runSettle = () => {
      const start = performance.now()
      const overshoot = value * 1.12
      const tick = (now: number) => {
        const t = Math.min(1, (now - start) / duration)
        // ease: fast rise, overshoot around 0.7, settle to value
        const eased = easeOutBack(t)
        const v =
          t < 0.7
            ? lerp(0, overshoot, eased)
            : lerp(overshoot, value, (t - 0.7) / 0.3)
        setDisplay(v)
        if (t < 1) raf = requestAnimationFrame(tick)
        else if (variance > 0) runWiggle()
      }
      raf = requestAnimationFrame(tick)
    }

    const runWiggle = () => {
      const t0 = performance.now()
      const tick = (now: number) => {
        const s = (now - t0) / 1000
        const n =
          Math.sin(s * wiggleHz) * 0.6 +
          Math.sin(s * wiggleHz * 2.3 + 1.1) * 0.25 +
          Math.sin(s * wiggleHz * 4.1 + 2.3) * 0.15
        setDisplay(value + n * variance)
        raf = requestAnimationFrame(tick)
      }
      raf = requestAnimationFrame(tick)
    }

    return () => {
      io.disconnect()
      cancelAnimationFrame(raf)
    }
  }, [value, variance, duration, wiggleHz])

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}
      {new Intl.NumberFormat("en-US", {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      }).format(Number(display.toFixed(decimals)))}
      {suffix}
    </span>
  )
}

function easeOutBack(t: number) {
  const c1 = 1.42
  const c3 = c1 + 1
  return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2)
}
function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t
}
