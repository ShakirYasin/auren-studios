"use client"

import { useEffect, useRef, useState } from "react"

type Line =
  | { kind: "h"; text: string }
  | { kind: "p"; text: string }
  | { kind: "code"; text: string }
  | { kind: "ok"; text: string }
  | { kind: "sep" }

const LINES: Line[] = [
  { kind: "h", text: "Workflow plan / first assistant" },
  {
    kind: "p",
    text: "Goal: reduce manual customer follow-up without letting the assistant send risky messages on its own.",
  },
  { kind: "sep" },
  { kind: "h", text: "1. What the assistant reads" },
  {
    kind: "code",
    text: "Slack intake / Gmail inbox / customer spreadsheet",
  },
  {
    kind: "p",
    text: "The agent summarizes new requests, checks the customer record, and prepares the next action.",
  },
  { kind: "sep" },
  { kind: "h", text: "2. What the assistant can do" },
  {
    kind: "code",
    text: "draft reply / create task / update status / prepare report",
  },
  {
    kind: "p",
    text: "Drafts and internal updates can be automated first. External messages stay review-only.",
  },
  { kind: "sep" },
  { kind: "h", text: "3. What stays blocked" },
  {
    kind: "code",
    text: "send email / delete data / export lists / move money",
  },
  {
    kind: "p",
    text: "Sensitive actions require a named owner to approve them before anything happens.",
  },
  { kind: "sep" },
  { kind: "h", text: "4. Handover" },
  {
    kind: "code",
    text: "working assistant / approval rules / plain operating guide",
  },
  { kind: "sep" },
  { kind: "ok", text: "Ready to build. One assistant, one workflow, clear limits." },
]

export function RFCDocument() {
  const ref = useRef<HTMLDivElement | null>(null)
  const [visible, setVisible] = useState(false)
  const [rendered, setRendered] = useState<string[]>([])
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
    const out: string[] = []
    const run = async () => {
      for (let i = 0; i < LINES.length; i++) {
        const l = LINES[i]
        if (l.kind === "sep") {
          out.push("\u200b")
          setRendered([...out])
          await sleep(120)
          continue
        }
        const delay = l.kind === "h" ? 14 : l.kind === "code" ? 11 : 9
        let buf = ""
        for (const ch of l.text) {
          if (canceled) return
          buf += ch
          out[i] = buf
          setRendered([...out])
          await sleep(delay)
        }
        await sleep(l.kind === "h" ? 260 : 120)
      }
      setDone(true)
    }
    run()
    return () => {
      canceled = true
    }
  }, [visible])

  return (
    <div
      ref={ref}
      className="relative overflow-hidden rounded-sm border border-hairline bg-surface-1/70 backdrop-blur-md"
    >
      <div className="flex items-center justify-between border-b border-hairline px-4 py-2.5">
        <span className="label text-[9px] text-ash">workflow-plan.md</span>
        <span className="label text-[9px] text-ember">
          {done ? "approved" : "mapping"}
        </span>
      </div>
      <div className="px-5 py-5 font-mono text-[11.5px] leading-[1.75] text-ash">
        {LINES.map((l, i) => {
          const r = rendered[i] || ""
          if (l.kind === "sep") {
            return r ? (
              <div
                key={i}
                className="my-2 h-px bg-[rgb(245_235_220_/_0.08)]"
              />
            ) : null
          }
          if (l.kind === "h") {
            return (
              <div
                key={i}
                className="font-display mt-2 text-[13px] font-medium tracking-tight text-bone"
              >
                {r}
              </div>
            )
          }
          if (l.kind === "code") {
            return (
              <div
                key={i}
                className="my-1 rounded-sm border border-hairline bg-coal/60 px-2 py-1 text-ember"
              >
                {r || "\u00a0"}
              </div>
            )
          }
          if (l.kind === "ok") {
            return (
              <div key={i} className="mt-3 flex gap-2 text-live">
                <span>ok</span>
                <span>{r}</span>
              </div>
            )
          }
          return (
            <div key={i} className="text-ash">
              {r}
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
