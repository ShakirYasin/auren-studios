"use client"

import { createContext, useContext, useEffect, useRef, useState } from "react"
import Lenis from "lenis"

type ScrollCtx = {
  lenis: Lenis | null
  /** 0..1 total page progress */
  progress: number
  /** 0..10 day index (fractional) derived from progress */
  day: number
  reducedMotion: boolean
}

const Ctx = createContext<ScrollCtx>({
  lenis: null,
  progress: 0,
  day: 0,
  reducedMotion: false,
})

export function useScroll() {
  return useContext(Ctx)
}

export function ScrollProvider({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null)
  const [state, setState] = useState<ScrollCtx>({
    lenis: null,
    progress: 0,
    day: 0,
    reducedMotion: false,
  })

  useEffect(() => {
    const reducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches

    if (reducedMotion) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setState((s) => ({ ...s, reducedMotion: true }))
      return
    }

    const lenis = new Lenis({
      lerp: 0.08,
      wheelMultiplier: 1.0,
      smoothWheel: true,
      syncTouch: false,
    })
    lenisRef.current = lenis

    let raf = 0
    const tick = (t: number) => {
      lenis.raf(t)
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    const onScroll = ({ progress }: { progress: number }) => {
      setState({
        lenis,
        progress,
        day: progress * 10,
        reducedMotion: false,
      })
    }
    lenis.on("scroll", onScroll)
    setState((s) => ({ ...s, lenis }))

    return () => {
      cancelAnimationFrame(raf)
      lenis.destroy()
      lenisRef.current = null
    }
  }, [])

  return <Ctx.Provider value={state}>{children}</Ctx.Provider>
}
