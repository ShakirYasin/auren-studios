"use client"

import { useRef, useEffect, type ReactNode } from "react"
import { cn } from "@/lib/utils"
import { playClick } from "@/lib/sound"

type Props = {
  children: ReactNode
  className?: string
  href?: string
  onClick?: () => void
  strength?: number
  ariaLabel?: string
}

export function MagneticButton({
  children,
  className,
  href,
  onClick,
  strength = 6,
  ariaLabel,
}: Props) {
  const ref = useRef<HTMLAnchorElement | HTMLButtonElement | null>(null)
  const inner = useRef<HTMLSpanElement | null>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    let raf = 0
    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect()
      const x = e.clientX - rect.left - rect.width / 2
      const y = e.clientY - rect.top - rect.height / 2
      const d = Math.min(1, Math.hypot(x, y) / (rect.width * 0.7))
      const tx = (x / rect.width) * strength * (1 - d * 0.5)
      const ty = (y / rect.height) * strength * (1 - d * 0.5)
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        if (el) el.style.transform = `translate3d(${tx}px, ${ty}px, 0)`
        if (inner.current) inner.current.style.transform = `translate3d(${tx * 0.4}px, ${ty * 0.4}px, 0)`
      })
    }
    const onLeave = () => {
      cancelAnimationFrame(raf)
      if (el) el.style.transform = ""
      if (inner.current) inner.current.style.transform = ""
    }
    const handler = onMove as (e: Event) => void
    const leave = onLeave as (e: Event) => void
    el.addEventListener("mousemove", handler)
    el.addEventListener("mouseleave", leave)
    return () => {
      el.removeEventListener("mousemove", handler)
      el.removeEventListener("mouseleave", leave)
      cancelAnimationFrame(raf)
    }
  }, [strength])

  const sharedClass = cn(
    "press group inline-flex items-center gap-2 will-change-transform",
    className,
  )
  const commonStyle = { transition: "transform 380ms cubic-bezier(0.22, 1, 0.36, 1)" }
  const handleClick = () => {
    playClick()
    onClick?.()
  }

  if (href) {
    return (
      <a
        ref={ref as React.MutableRefObject<HTMLAnchorElement | null>}
        href={href}
        aria-label={ariaLabel}
        className={sharedClass}
        style={commonStyle}
        onClick={handleClick}
      >
        <span ref={inner} className="inline-flex items-center gap-2" style={commonStyle}>
          {children}
        </span>
      </a>
    )
  }
  return (
    <button
      ref={ref as React.MutableRefObject<HTMLButtonElement | null>}
      type="button"
      aria-label={ariaLabel}
      className={sharedClass}
      style={commonStyle}
      onClick={handleClick}
    >
      <span ref={inner} className="inline-flex items-center gap-2" style={commonStyle}>
        {children}
      </span>
    </button>
  )
}
