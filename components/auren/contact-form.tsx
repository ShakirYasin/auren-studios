"use client"

import { ArrowUpRight, Loader2 } from "lucide-react"
import { useState, type FormEvent } from "react"

const INPUT_BASE =
  "border-hairline bg-surface-1 w-full border px-4 py-3 text-sm text-bone placeholder:text-ash focus:outline-none focus:border-ember/60"

const PROJECT_TYPES = [
  "AI Automations",
  "AI Agents",
  "Web Design",
  "Mobile App",
  "Brand Identity",
  "SaaS Engineering",
  "Not sure yet",
]

const BUDGETS = [
  "<$10K",
  "$10K–$25K",
  "$25K–$50K",
  "$50K–$100K",
  "$100K+",
  "Just exploring",
]

const TIMELINES = [
  "This month",
  "Next month",
  "This quarter",
  "Just exploring",
]

type Status =
  | { kind: "idle" }
  | { kind: "submitting" }
  | { kind: "success" }
  | { kind: "error"; message: string }

export function ContactForm() {
  const [status, setStatus] = useState<Status>({ kind: "idle" })

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (status.kind === "submitting") return

    const fd = new FormData(e.currentTarget)
    const payload = {
      name: String(fd.get("name") || ""),
      email: String(fd.get("email") || ""),
      projectType: String(fd.get("project_type") || ""),
      budget: String(fd.get("budget") || ""),
      timeline: String(fd.get("timeline") || ""),
      message: String(fd.get("message") || ""),
    }

    setStatus({ kind: "submitting" })

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
      const data = (await res.json().catch(() => ({}))) as {
        ok?: boolean
        error?: string
      }
      if (!res.ok || !data.ok) {
        setStatus({
          kind: "error",
          message: data.error || `Send failed (${res.status}).`,
        })
        return
      }
      setStatus({ kind: "success" })
      e.currentTarget.reset()
    } catch (err) {
      setStatus({
        kind: "error",
        message: err instanceof Error ? err.message : "Network error.",
      })
    }
  }

  if (status.kind === "success") {
    return (
      <div className="border-hairline bg-surface-1 mt-10 border p-8 md:p-10">
        <span className="label text-ember">brief.received</span>
        <p className="mt-4 text-base leading-relaxed text-bone">
          Thanks — your brief is in. A producer will reply within one working
          day at the email you provided.
        </p>
        <p className="mt-3 font-mono text-[11px] text-ash">
          if you don&apos;t see a reply, check spam — then ping{" "}
          <a
            href="mailto:hello@aurenstudios.com"
            className="text-ember hover:underline"
          >
            hello@aurenstudios.com
          </a>
        </p>
        <button
          type="button"
          onClick={() => setStatus({ kind: "idle" })}
          className="border-hairline mt-6 inline-flex items-center gap-2 border px-4 py-2 text-xs text-ash hover:text-bone"
        >
          send another
        </button>
      </div>
    )
  }

  const submitting = status.kind === "submitting"

  return (
    <form onSubmit={onSubmit} className="mt-10 space-y-6">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div>
          <label htmlFor="name" className="label text-ash">
            name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            autoComplete="name"
            placeholder="your name"
            className={`mt-2 ${INPUT_BASE}`}
          />
        </div>
        <div>
          <label htmlFor="email" className="label text-ash">
            email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="you@company.com"
            className={`mt-2 ${INPUT_BASE}`}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div>
          <label htmlFor="project" className="label text-ash">
            project type
          </label>
          <select
            id="project"
            name="project_type"
            defaultValue=""
            className={`mt-2 ${INPUT_BASE}`}
          >
            <option value="" disabled>
              select one
            </option>
            {PROJECT_TYPES.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="budget" className="label text-ash">
            budget range
          </label>
          <select
            id="budget"
            name="budget"
            defaultValue=""
            className={`mt-2 ${INPUT_BASE}`}
          >
            <option value="" disabled>
              select one
            </option>
            {BUDGETS.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="timeline" className="label text-ash">
          timeline
        </label>
        <select
          id="timeline"
          name="timeline"
          defaultValue=""
          className={`mt-2 ${INPUT_BASE}`}
        >
          <option value="" disabled>
            select one
          </option>
          {TIMELINES.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="message" className="label text-ash">
          message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={6}
          placeholder="Tell us about the project — what, why, and any links."
          className={`mt-2 ${INPUT_BASE} resize-y`}
        />
      </div>

      {status.kind === "error" && (
        <div
          role="alert"
          className="border-hairline border px-4 py-3 font-mono text-xs text-deep-rust"
          style={{ borderColor: "color-mix(in oklch, var(--deep-rust) 50%, transparent)" }}
        >
          send failed: {status.message}
        </div>
      )}

      <div className="pt-2">
        <button
          type="submit"
          disabled={submitting}
          aria-busy={submitting}
          className="ember-glow press group inline-flex w-full items-center justify-center gap-2 rounded-sm bg-ember px-6 py-3.5 text-sm font-medium text-coal transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {submitting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Sending…
            </>
          ) : (
            <>
              Send brief
              <ArrowUpRight className="h-4 w-4" />
            </>
          )}
        </button>
        <p className="mt-3 text-center font-mono text-[11px] text-ash">
          or email us directly:{" "}
          <a
            href="mailto:hello@aurenstudios.com"
            className="text-ember hover:underline"
          >
            hello@aurenstudios.com
          </a>
        </p>
      </div>
    </form>
  )
}
