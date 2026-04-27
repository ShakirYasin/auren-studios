"use client"

import type { CSSProperties, ElementType, ReactNode } from "react"
import { createElement, useEffect, useRef, useState } from "react"

type Props = {
  as?: ElementType
  children: ReactNode
  className?: string
  delay?: number
  stagger?: number
  threshold?: number
  y?: number
  once?: boolean
  id?: string
}

export function Reveal({
  as = "div",
  children,
  className = "",
  delay = 0,
  stagger,
  threshold = 0.15,
  y = 16,
  once = true,
  id,
}: Props) {
  const ref = useRef<HTMLElement | null>(null)
  const [shown, setShown] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      const frame = requestAnimationFrame(() => setShown(true))
      return () => cancelAnimationFrame(frame)
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setShown(true)
            if (once) io.unobserve(e.target)
          } else if (!once) {
            setShown(false)
          }
        }
      },
      { threshold, rootMargin: "0px 0px -80px 0px" },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [threshold, once])

  const style: CSSProperties & { "--stagger"?: string } = {
    transitionDelay: `${delay}ms`,
    transform: shown ? "none" : `translate3d(0, ${y}px, 0)`,
    opacity: shown ? 1 : 0,
    filter: shown ? "blur(0px)" : "blur(6px)",
  }
  if (stagger) {
    style["--stagger"] = `${stagger}ms`
  }
  const setElementRef = (node: HTMLElement | null) => {
    ref.current = node
  }

  return createElement(
    as,
    {
      ref: setElementRef,
      id,
      "data-shown": shown || undefined,
      className: `reveal ${stagger ? "reveal-stagger" : ""} ${className}`,
      style,
    },
    children,
  )
}
