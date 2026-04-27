import { Resend } from "resend"

type ContactBody = {
  name?: string
  email?: string
  projectType?: string
  budget?: string
  timeline?: string
  message?: string
}

const TO_ADDRESS = process.env.CONTACT_TO_EMAIL || "hello@aurenstudios.com"
const FROM_ADDRESS =
  process.env.CONTACT_FROM_EMAIL || "Auren Studios <onboarding@resend.dev>"

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    return Response.json(
      { ok: false, error: "Contact endpoint is not configured." },
      { status: 500 },
    )
  }

  let body: ContactBody
  try {
    body = (await request.json()) as ContactBody
  } catch {
    return Response.json(
      { ok: false, error: "Invalid request body." },
      { status: 400 },
    )
  }

  const name = body.name?.trim()
  const email = body.email?.trim()
  const message = body.message?.trim()
  const projectType = body.projectType?.trim() || "—"
  const budget = body.budget?.trim() || "—"
  const timeline = body.timeline?.trim() || "—"

  if (!name || !email || !message) {
    return Response.json(
      { ok: false, error: "Name, email, and message are required." },
      { status: 400 },
    )
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return Response.json(
      { ok: false, error: "Please provide a valid email." },
      { status: 400 },
    )
  }

  const subject = `New brief — ${name} (${projectType})`
  const text = [
    `Name: ${name}`,
    `Email: ${email}`,
    `Project type: ${projectType}`,
    `Budget: ${budget}`,
    `Timeline: ${timeline}`,
    "",
    "Message:",
    message,
  ].join("\n")

  const html = `
    <div style="font-family:ui-monospace,SFMono-Regular,Menlo,monospace;font-size:13px;line-height:1.6;color:#1a1815">
      <h2 style="font-family:ui-sans-serif,system-ui,sans-serif;font-size:18px;margin:0 0 16px">New brief from ${escapeHtml(name)}</h2>
      <table cellpadding="0" cellspacing="0" style="border-collapse:collapse;margin-bottom:20px">
        <tr><td style="padding:4px 12px 4px 0;color:#6b6660">name</td><td>${escapeHtml(name)}</td></tr>
        <tr><td style="padding:4px 12px 4px 0;color:#6b6660">email</td><td><a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></td></tr>
        <tr><td style="padding:4px 12px 4px 0;color:#6b6660">project type</td><td>${escapeHtml(projectType)}</td></tr>
        <tr><td style="padding:4px 12px 4px 0;color:#6b6660">budget</td><td>${escapeHtml(budget)}</td></tr>
        <tr><td style="padding:4px 12px 4px 0;color:#6b6660">timeline</td><td>${escapeHtml(timeline)}</td></tr>
      </table>
      <div style="border-top:1px solid #e5e0d6;padding-top:16px;white-space:pre-wrap">${escapeHtml(message)}</div>
    </div>
  `.trim()

  const resend = new Resend(apiKey)
  const { error } = await resend.emails.send({
    from: FROM_ADDRESS,
    to: TO_ADDRESS,
    replyTo: email,
    subject,
    text,
    html,
  })

  if (error) {
    return Response.json(
      { ok: false, error: error.message || "Failed to send email." },
      { status: 502 },
    )
  }

  return Response.json({ ok: true })
}

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;")
}
