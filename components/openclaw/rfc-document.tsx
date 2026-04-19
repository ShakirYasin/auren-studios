"use client"

import { useEffect, useRef, useState } from "react"

/**
 * Self-writing RFC document. Scroll-triggered once visible. Each line is
 * either a heading, body paragraph, or code-ish line. Typewriter with natural
 * cadence variation.
 */

type Line =
  | { kind: "h"; text: string }
  | { kind: "p"; text: string }
  | { kind: "code"; text: string }
  | { kind: "ok"; text: string }
  | { kind: "sep" }

const LINES: Line[] = [
  { kind: "h", text: "RFC-2026-04 · Openclaw × $CLIENT" },
  { kind: "p", text: "Scope — one production ingest + warehouse, delivered in ten working days." },
  { kind: "sep" },
  { kind: "h", text: "1. Architecture" },
  { kind: "code", text: "kafka → s3 (iceberg) → dbt → bigquery" },
  { kind: "p", text: "Spot EKS for airflow. Partition on event_time. Clustering on customer_id." },
  { kind: "sep" },
  { kind: "h", text: "2. Cost estimate" },
  { kind: "code", text: "$412.80 / month · ±6% · validated against 30d sample" },
  { kind: "sep" },
  { kind: "h", text: "3. Trade-offs" },
  { kind: "p", text: "We picked Iceberg over Hudi for query engine flexibility. We picked dbt over SQLMesh for team familiarity." },
  { kind: "sep" },
  { kind: "h", text: "4. SLO" },
  { kind: "code", text: "p99.973 uptime · p95 e2e < 9m · alerting via grafana/slack" },
  { kind: "sep" },
  { kind: "ok", text: "Signed off. Kickoff Monday 09:00 UTC." },
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
        <span className="label text-[9px] text-ash">rfc.md · drafted live</span>
        <span className="label text-[9px] text-ember">{done ? "signed" : "writing"}</span>
      </div>
      <div className="px-5 py-5 font-mono text-[11.5px] leading-[1.75] text-ash">
        {LINES.map((l, i) => {
          const r = rendered[i] || ""
          if (l.kind === "sep") {
            return r ? <div key={i} className="my-2 h-px bg-[rgb(245_235_220_/_0.08)]" /> : null
          }
          if (l.kind === "h") {
            return (
              <div key={i} className="mt-2 font-display text-[13px] font-medium text-bone tracking-tight">
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
                <span>✓</span>
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
