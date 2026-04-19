# OpenClaw Service Agency

Marketing site and workflow assessment tool for OpenClaw-based agent services.

## Development

```bash
bun install
bun run dev
```

## Workflow Assessment

The `/assessment` page uses a server-side OpenRouter call to score a client's
workflow, recommend a plan, suggest useful tool connections, and choose between
local, VPS, or hybrid setup.

Required for live assessment analysis:

```bash
OPENROUTER_API_KEY=
```

Optional configuration:

```bash
OPENROUTER_MODEL=openai/gpt-5.2
ASSESSMENT_WEBHOOK_URL=
NEXT_PUBLIC_ASSESSMENT_BOOKING_URL=
NEXT_PUBLIC_SITE_URL=
```

If `ASSESSMENT_WEBHOOK_URL` is set, completed lead details and the generated
report are posted there. If it is not set, the full report still renders and the
CTA falls back to email.

## Checks

```bash
bun run typecheck
bun run lint
bun run build
```
