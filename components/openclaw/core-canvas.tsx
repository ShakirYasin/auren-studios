"use client"

/**
 * The Core — persistent cinematic ember artefact behind the whole page.
 *
 * Canvas 2D implementation (not R3F) so there's no WebGL shader tuning risk
 * and no large bundle hit. Delivers the same "volumetric ember orb" feel via:
 *   — layered radial gradients driven by a flow-field noise offset per frame
 *   — additive blending of warm stops for an organic plasma look
 *   — ignition level (0..1) bound to scroll progress so the Core wakes up
 *     across the Day 0 → Day 10 arc.
 */

import { useEffect, useRef } from "react"
import { useScroll } from "./scroll-provider"

export function CoreCanvas() {
  const ref = useRef<HTMLCanvasElement | null>(null)
  const { progress, reducedMotion } = useScroll()
  const progressRef = useRef(progress)
  const mouseRef = useRef({ x: 0.5, y: 0.5 })

  useEffect(() => {
    progressRef.current = progress
  }, [progress])

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext("2d", { alpha: true })
    if (!ctx) return

    let dpr = Math.min(window.devicePixelRatio || 1, 1.75)
    let w = 0
    let h = 0
    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 1.75)
      w = canvas.clientWidth
      h = canvas.clientHeight
      canvas.width = Math.floor(w * dpr)
      canvas.height = Math.floor(h * dpr)
    }
    resize()
    window.addEventListener("resize", resize)

    const onMouse = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX / window.innerWidth
      mouseRef.current.y = e.clientY / window.innerHeight
    }
    window.addEventListener("mousemove", onMouse, { passive: true })

    let raf = 0
    const t0 = performance.now()

    const draw = (now: number) => {
      const t = (now - t0) / 1000
      const p = progressRef.current // 0..1 page progress
      // ignition — crossfade from near-dormant to fully bright across first 60% of scroll
      const ign = clamp01(smoothstep(0.0, 0.6, p) + 0.12)
      const { x: mx, y: my } = mouseRef.current

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx.clearRect(0, 0, w, h)

      // subtle background warm vignette (under the core)
      const bg = ctx.createRadialGradient(
        w * 0.5,
        h * 0.45,
        0,
        w * 0.5,
        h * 0.45,
        Math.max(w, h) * 0.9,
      )
      bg.addColorStop(0, `rgba(122, 36, 16, ${0.08 * ign + 0.03})`)
      bg.addColorStop(0.4, "rgba(26, 21, 16, 0)")
      bg.addColorStop(1, "rgba(10, 9, 8, 0)")
      ctx.fillStyle = bg
      ctx.fillRect(0, 0, w, h)

      ctx.globalCompositeOperation = "lighter"

      // flow-field-ish drift
      const driftX = Math.sin(t * 0.25) * 40 + (mx - 0.5) * 22
      const driftY = Math.cos(t * 0.18) * 28 + (my - 0.5) * 14

      // core position — drifts toward upper-right in mid-scroll, center at end
      const coreXNorm = lerp(
        0.62,
        lerp(0.78, 0.5, smoothstep(0.8, 1.0, p)),
        smoothstep(0.15, 0.6, p),
      )
      const coreYNorm = lerp(0.5, 0.48, smoothstep(0.2, 0.9, p))
      const cx = w * coreXNorm + driftX * 0.4
      const cy = h * coreYNorm + driftY * 0.4

      const baseR = Math.min(w, h) * 0.22
      const r = baseR * (0.85 + 0.15 * Math.sin(t * 0.6))

      // deep rust halo (furthest, widest)
      drawGlow(
        ctx,
        cx + driftX * 0.6,
        cy + driftY * 0.6,
        r * 3.6,
        `rgba(122, 36, 16, ${0.18 * ign})`,
        "rgba(122, 36, 16, 0)",
      )

      // amber midfield
      drawGlow(
        ctx,
        cx + driftX * 0.3,
        cy + driftY * 0.3,
        r * 2.1,
        `rgba(244, 168, 59, ${0.32 * ign})`,
        "rgba(244, 168, 59, 0)",
      )

      // ember core
      drawGlow(
        ctx,
        cx,
        cy,
        r * 1.25,
        `rgba(255, 107, 44, ${0.75 * ign + 0.08})`,
        "rgba(255, 107, 44, 0)",
      )

      // hot center
      drawGlow(
        ctx,
        cx,
        cy,
        r * 0.45,
        `rgba(255, 214, 160, ${0.45 * ign + 0.08})`,
        "rgba(255, 214, 160, 0)",
      )

      // tiny brightest point (ignition pulse — stronger when crossing section boundaries)
      const pulse = 0.5 + 0.5 * Math.sin(t * 2.2 + p * 8)
      drawGlow(
        ctx,
        cx,
        cy,
        r * 0.12,
        `rgba(255, 240, 220, ${(0.6 + 0.3 * pulse) * ign})`,
        "rgba(255, 240, 220, 0)",
      )

      // secondary spark — emerges at day 3+ (build)
      if (p > 0.22) {
        const sp = smoothstep(0.22, 0.55, p)
        const sx = cx - w * 0.12 - driftX * 0.8
        const sy = cy + h * 0.08 + driftY * 0.4
        drawGlow(
          ctx,
          sx,
          sy,
          r * 0.7,
          `rgba(255, 107, 44, ${0.25 * sp})`,
          "rgba(255, 107, 44, 0)",
        )
      }

      ctx.globalCompositeOperation = "source-over"

      raf = requestAnimationFrame(draw)
    }

    if (!reducedMotion) {
      raf = requestAnimationFrame(draw)
    } else {
      // one static frame
      progressRef.current = 0.5
      draw(performance.now())
    }

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener("resize", resize)
      window.removeEventListener("mousemove", onMouse)
    }
  }, [reducedMotion])

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0"
      style={{ willChange: "transform" }}
    >
      <canvas ref={ref} className="h-full w-full" />
    </div>
  )
}

function drawGlow(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  r: number,
  inner: string,
  outer: string,
) {
  const g = ctx.createRadialGradient(x, y, 0, x, y, r)
  g.addColorStop(0, inner)
  g.addColorStop(1, outer)
  ctx.fillStyle = g
  ctx.beginPath()
  ctx.arc(x, y, r, 0, Math.PI * 2)
  ctx.fill()
}

function clamp01(v: number) {
  return Math.max(0, Math.min(1, v))
}
function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t
}
function smoothstep(edge0: number, edge1: number, x: number) {
  const t = clamp01((x - edge0) / (edge1 - edge0))
  return t * t * (3 - 2 * t)
}
