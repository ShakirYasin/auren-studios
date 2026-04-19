"use client"

import { useEffect, useRef, useState } from "react"

type Line = {
  text: string
  kind?: "prompt" | "step" | "ok" | "warn" | "final"
}

export function Terminal({
  lines,
  title = "artefact.log",
  live = true,
  loopAfterComplete = true,
}: {
  lines: Line[]
  title?: string
  live?: boolean
  loopAfterComplete?: boolean
}) {
  const ref = useRef<HTMLDivElement | null>(null)
  const [visible, setVisible] = useState(false)
  const [rendered, setRendered] = useState<string[]>([])
  const [cursorOn, setCursorOn] = useState(true)
  const [done, setDone] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setVisible(true)
      },
      { threshold: 0.25 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    if (!visible) return
    let canceled = false
    let out: string[] = []
    const run = async () => {
      for (let i = 0; i < lines.length; i++) {
        const l = lines[i]
        const charDelay =
          l.kind === "final" ? 18 : l.kind === "prompt" ? 14 : 10
        let buf = ""
        for (const ch of l.text) {
          if (canceled) return
          buf += ch
          out = [...out.slice(0, i), buf]
          setRendered(out)
          await sleep(charDelay)
        }
        out = [...out.slice(0, i), l.text]
        setRendered(out)
        await sleep(l.kind === "final" ? 260 : 120)
      }
      setDone(true)
      if (loopAfterComplete) {
        await sleep(2200)
        if (canceled) return
        out = []
        setRendered([])
        setDone(false)
        run()
      }
    }
    run()
    return () => {
      canceled = true
    }
  }, [visible, lines, loopAfterComplete])

  useEffect(() => {
    const i = setInterval(() => setCursorOn((c) => !c), 560)
    return () => clearInterval(i)
  }, [])

  return (
    <div
      ref={ref}
      className="relative overflow-hidden rounded-sm border border-hairline bg-surface-1/75 backdrop-blur-md"
      role="log"
      aria-live="polite"
    >
      <div className="flex items-center justify-between border-b border-hairline px-3 py-2">
        <div className="flex items-center gap-2">
          <span className="pulse-dot h-[6px] w-[6px] rounded-full bg-ember" />
          <span className="label text-[9px] text-ash">{title}</span>
        </div>
        {live && (
          <span className="label text-[9px] text-live">
            {done ? "ready" : "streaming"}
          </span>
        )}
      </div>
      <div className="scan relative px-4 py-4 font-mono text-[11.5px] leading-[1.75] text-ash">
        {rendered.map((r, i) => {
          const l = lines[i]
          const color =
            l?.kind === "final"
              ? "text-bone"
              : l?.kind === "ok"
                ? "text-live"
                : l?.kind === "warn"
                  ? "text-amber-glow"
                  : "text-ash"
          const prefix =
            l?.kind === "prompt"
              ? { char: "$", color: "text-ember" }
              : l?.kind === "step"
                ? { char: ">", color: "text-ember/70" }
                : l?.kind === "ok"
                  ? { char: "ok", color: "text-live" }
                  : l?.kind === "warn"
                    ? { char: "!", color: "text-amber-glow" }
                    : l?.kind === "final"
                      ? { char: "=>", color: "text-ember" }
                      : { char: "-", color: "text-ash/50" }
          const isLast = i === rendered.length - 1 && !done
          return (
            <div key={i} className={`flex gap-2 ${color}`}>
              <span className={`${prefix.color} w-5 shrink-0`}>
                {prefix.char}
              </span>
              <span className="flex-1 whitespace-pre-wrap break-words">
                {r}
                {isLast && (
                  <span
                    className="ml-0.5 inline-block"
                    style={{ opacity: cursorOn ? 1 : 0 }}
                  >
                    |
                  </span>
                )}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms))
}
