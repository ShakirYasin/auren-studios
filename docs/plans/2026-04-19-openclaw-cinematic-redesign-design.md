# Openclaw — Cinematic Redesign Design Doc

**Date:** 2026-04-19
**Status:** Approved, ready for implementation planning
**Current site:** editorial/newsprint with ember accent — feels like "a project," not an experience

## Brief

Redesign the Openclaw marketing site so it feels like a **cinematic experience**, not a template. Two problems to solve simultaneously:

- **Identity is generic.** The editorial layout reads as template. Need distinctive visual language.
- **No narrative, no "wow."** Sections are a checklist. Need a story with interactive moments.

## Creative direction (locked)

- **Aesthetic lane:** cinematic dark-tech × organic "living system." Linear/Vercel Ship precision crossed with Modal/Replicate organic warmth.
- **Central metaphor:** *The 10-day build, cinematically.* The page IS a time-lapse of a pipeline being built. Scroll advances days.
- **Motion tier:** full cinematic — scroll-directed R3F/WebGL, Lenis smooth scroll, pinned sections, per-section choreography (Rauno / Basement / Active Theory energy).

## Moodboard

### References — what to steal

| Project | Steal |
|---|---|
| [Rauno Freiberg Portfolio 2025](https://rauno.me) | Warm-dark tone calibration, interface sounds, scroll rhythm |
| [Basement Studio](https://basement.studio) + [BSMNT Scrollytelling](https://scrollytelling.basement.studio) | Pinned-scene choreography — scroll infrastructure |
| [14islands r3f-scroll-rig](https://github.com/14islands/r3f-scroll-rig) | 3D-to-DOM scroll sync — backbone of the Core |
| [Vercel Ship](https://orpetron.com/sites/vercel-ship/) | 8% opacity borders, 96–160px section padding, spatial confidence |
| [Modal](https://modal.com) | One saturated accent on warm-dark reads more confident than rainbow |
| [Codrops Cartier Yearbook / Control / Chipsa](https://tympanus.net/codrops/2025/05/02/developer-spotlight-reksa-andhika/) | "One WebGL moment, done right" discipline |
| [Vercel Geist](https://vercel.com/geist/typography) | Technical typeface as whole identity |

### Typography

- **Display sans:** Geist Sans — technical precision, free.
- **Editorial italic accent:** [Instrument Serif](https://fonts.google.com/specimen/Instrument+Serif) Italic — used only on emotional pivot words ("shipped", "running"). Free. Warmth vector.
- **Mono:** Geist Mono — terminal/artefact/labels.

Three fonts, all free. No Inter.

### Color tokens

| Token | Hex | Role |
|---|---|---|
| `--coal` | `#0A0908` | base, warm near-black |
| `--surface-1` | `#13110F` | cards, terminals |
| `--surface-2` | `#1C1916` | elevated panels |
| `--surface-3` | `#242019` | hover states |
| `--border` | `rgb(245 235 220 / 0.08)` | warm-tint hairlines |
| `--bone` | `#F5F1EA` | primary text |
| `--ash` | `#9B9186` | muted |
| `--ember` | `#FF6B2C` | signature accent (hotter than current amber) |
| `--amber-glow` | `#F4A83B` | volumetric light midpoint |
| `--deep-rust` | `#7A2410` | shadow side of ember glow |
| `--live` | `#6ED8C7` | single cyan accent, data-pulse only |

### Signature motion (the 5 things people screenshot)

1. **The Day Rail** — fixed right-edge timeline. Day 0 → Day 10 ticks. Fills with ember as you scroll. Clickable.
2. **The Core** — persistent R3F volumetric sphere. Dormant at hero, ignites at Day 3, fully bright by Day 10. Cursor parallax.
3. **Streaming artefact.log** — scroll-driven typewriter terminal, ending in an ember-flash "shipped" line.
4. **Pipeline self-assembly** — Services restaged as a graph that builds node-by-node with light packets flowing between them.
5. **Numbers that breathe** — stats settle (overshoot → pullback) then wiggle with live variance.

### Anti-references (banned)

- Cold-blue SaaS palette.
- Aurora / purple-pink-blue gradient smoke (AI-slop tell).
- Bento grid of floating UI screenshots.
- Particle/starfield bg; "beam on CTA."
- More than one accent color competing.

## 1. Architecture & Stack

**Additions on top of existing Next 15 / Tailwind v4 / shadcn:**

- `@studio-freight/lenis` — smooth scroll foundation.
- `gsap` + `ScrollTrigger` + `@bsmnt/scrollytelling` — pinned-scene choreography.
- `@react-three/fiber` + `@react-three/drei` + `@react-three/postprocessing` — Core + pipeline.
- `@14islands/r3f-scroll-rig` — binds 3D to DOM element rects.
- `motion` — DOM micro-interactions.
- `next/font` — self-hosted Geist Sans, Geist Mono, Instrument Serif.

**Rendering strategy**

- **One persistent fixed `<Canvas>`** behind whole page. r3f-scroll-rig positions 3D to track DOM anchors. Core survives all section transitions.
- DPR capped `[1, 1.75]`.
- Postprocessing behind quality flag: high (desktop ≥1280), medium (tablet), off (mobile — replaced by baked PNG/video).

**Progressive enhancement**

- No-JS: full copy, layout, CTAs.
- `prefers-reduced-motion`: Lenis off, Core→static image, Day Rail becomes static indicator.
- Mobile (`pointer: coarse` + <768): R3F replaced with 8s looped AV1 MP4, 800KB max.

**Budget:** LCP <2.0s desktop / <3.5s 4G. JS <200KB gz above fold. Total weight <1.5MB.

**Section order (same content, restaged):**
Hero (Day 0) → Scoping (Day 1–2) → Build/Services (Day 3–8) → Telemetry/Stats (Day 8) → Pricing (Day 9) → Handover/Testimonials+CTA (Day 10) → Footer.

## 2. Hero (Day 0)

Full 100svh. Page opens in deliberate quiet state. Core is dormant.

**Layout (12-col, editorial border-x preserved):**

- Left 7 cols: hero type + CTAs.
- Right 5 cols: artefact panel (terminal + metadata), floats above the Core.
- Full-bleed behind: the Core.

**The Core (hero state).** R3F sphere ~480px radius, slightly right-of-center. Fragment shader: flow-field noise → volumetric distance field with bloom. Day 0 renders only in `--deep-rust` / `--surface-1` — unlit, dormant. Cursor adds parallax ±8px + subtle heat near cursor.

**Headline:**

> Pipelines,<br>*shipped* — not<br>scheduled.

- "Pipelines," / "scheduled." in Geist Sans 500, `clamp(3rem, 7vw, 7rem)`, `-0.04em`, `0.88` leading.
- "*shipped*" in Instrument Serif Italic, same size, `--ember`, text-shadow ember-40%. Emotional pivot.
- "— not" in `--ash`.

**Pre-headline label (live mono):**
`§ 00 · 2026-04-19 14:32 UTC · pipeline.status: idle · awaiting kickoff` — timestamp updates hourly, "awaiting kickoff" pulses.

**CTAs.** Primary ember-filled, magnetic (±4px cursor deform). Secondary ghost. Click sound gated behind opt-in (defaults off).

**Scroll cue.** Day Rail introduces itself at right edge — only Day 0 lit.

**Artefact panel.** Terminal streams on scroll-enter, not instantly. At 0–5% scroll progress, `$ openclaw init` types itself → **first log line ignites the Core's first faint ember pulse.**

## 3. Day Rail + Section Choreography

**Day Rail.** Fixed right edge, desktop ≥1024. 2px vertical line, ~15vh–85vh. Ten ticks (Day 0 → Day 10), driven by Lenis scroll progress.

- **Ahead:** `--ash` 30%, 1px.
- **Active:** `--ember`, 3px, soft glow, full label visible.
- **Past:** `--bone` 60%, small filled dot.
- Fill bar ember-bright from top to current day.
- Day-change pulse travels rail: 600ms `cubic-bezier(0.32, 0.72, 0, 1)`.
- Hover tick → expand + 1-line preview. Click → smooth-scroll.
- Mobile: collapses to top-of-viewport thin progress bar + nav label.

**Section-by-section:**

- **Day 0 · Hero** — 100vh pin, terminal streams, Core ignition pulse.
- **Day 1–2 · Scoping.** Pinned. Left: RFC document self-writes (line/300ms, monospaced, green cursor). Right: architecture wireframe traces over Core in ember lines, boxes (Kafka, S3, Iceberg) appear as RFC mentions them.
- **Day 3–8 · Build (Services restaged).** Core recedes upper-right. Horizontal SVG/R3F pipeline graph grows L→R across viewport. Each service card = a node. Scroll-entering a card lights its node + starts packets from prev node. End state: whole graph live and looping.
- **Day 8 · Telemetry (Stats).** Core fully ignited. Four stat tiles arrange around it. Numbers settle (+12% overshoot → pullback → live variance). SLO shows ±0.001% wiggle with mini live graph behind.
- **Day 9 · Pricing.** Framed as "*the invoice, published.*" Pipeline tier card glows in sync with Core. Label: `deliverable · priced · shipped`.
- **Day 10 · Handover (Testimonials + CTA merged).** Core drifts center-screen, fully bright. Testimonials rise from below staggered, styled as handover receipts (hash, timestamp, signature). Closing beat: Core dims slightly — *"keys handed over."* → CTA band.
- **Footer.** Watermark becomes closing credit. "End of edition" label.

**Global scroll feel.** Lenis `lerp: 0.08`, `wheelMultiplier: 1.0`. Anchor nav disables Lenis during jump.

## 4. Tokens, Components, Spacing

**Tailwind v4** via `@theme inline`. Kill current `ember` token, rename shadcn `background`/`foreground` to `--coal`/`--bone` so existing components inherit.

**Spacing:** section `py-24 md:py-32 lg:py-40` (96/128/160). Max width `1440px`. Hairline borders at 8% opacity. Scale: 4/8/12/20/32/52/84/136.

**Type scale:**

| Role | Font | Size | Leading | Tracking |
|---|---|---|---|---|
| Display XL | Geist 500 | `clamp(3rem, 7vw, 7rem)` | 0.88 | -0.04em |
| Display L | Geist 500 | `clamp(2.25rem, 4.8vw, 4.5rem)` | 0.94 | -0.035em |
| Display M | Geist 500 | `clamp(1.75rem, 2.4vw, 2.5rem)` | 1.02 | -0.02em |
| Italic accent | Instrument Serif Italic | match | match | -0.01em |
| Body L | Geist 400 | 18px | 1.55 | -0.005em |
| Body | Geist 400 | 15px | 1.55 | -0.005em |
| Label | Geist Mono 500 | 11px | 1.3 | 0.14em caps |
| Artefact | Geist Mono 400 | 12px | 1.6 | 0 |

**Components (new in `components/openclaw/`):**

- `<CoreCanvas/>` — persistent R3F canvas + scroll-rig provider, mounted in `layout.tsx`.
- `<CoreObject scrollProgress/>` — shader sphere, ignition level 0–1.
- `<DayRail days/>` — right-edge timeline bound to Lenis.
- `<PipelineGraph/>` — self-assembling SVG graph (uses BSMNT `Scrollytelling.Animation`).
- `<Terminal lines streamOnScroll/>` — scroll-typewriter.
- `<LiveCounter target variance/>` — settle + wiggle.
- `<SLODial value/>` — circular gauge with ±variance.
- `<RFCDocument lines scrollRange/>` — self-writing Day 1–2 doc.
- `<MagneticButton/>` — cursor deform + sound hook.
- `<Reveal/>` — upgraded to GSAP ScrollTrigger (replaces IntersectionObserver).

**Audio.** `<SoundToggle/>` in nav. Default OFF, `localStorage`. Three assets <10KB each: `tick.wav` (day change), `click.wav` (buttons), `ignite.wav` (Core state).

**Content.** All copy, pricing, testimonials, FAQ verbatim from current site. Restaging, not rewriting.

## 5. Performance, QA, Execution

**Budgets.**
- LCP <2.0s desktop cable / <3.5s 4G. LCP = hero headline, not Core.
- JS above-fold <200KB gz. R3F + drei + shader via `dynamic(..., { ssr: false })` after first idle.
- CLS = 0 — canvas + Day Rail space reserved.
- 60fps scroll on M2 Air + Iris Xe. 30fps floor on iPhone 12.
- Total first load <1.5MB.

**Tactics.**
- `next/font` swap, latin subset, preload Geist 500 + Instrument Serif Italic.
- No above-fold images.
- Single-pass fragment shader; bloom gated `quality=high` only.
- Lenis `autoRaf: true` piped through R3F's `useFrame` via `invalidate()` — one rAF, not two.
- Mobile: detect coarse pointer + <768 → `<video autoplay muted playsinline loop>`, saves ~180KB.
- `prefers-reduced-motion`: Lenis off, GSAP timelines `.progress(1)`, Core → static PNG.

**Accessibility.**
- Day Rail ticks = `<button>` with aria-labels, keyboard, smooth-scroll.
- Terminal `role="log" aria-live="polite"`.
- Magnetic button: visual deform only, focus ring unaffected.
- Contrast: bone/coal 16.2:1, ash/coal 5.8:1, ember/coal 4.9:1 (display sizes + CTAs only — confirmed AA).
- Sound defaults OFF, keyboard-reachable toggle, state persists.

**QA gates.**
- Lighthouse desktop: Perf ≥90, A11y 100.
- Chrome / Firefox / Safari desktop + iOS Safari + Android Chrome.
- `prefers-reduced-motion` manual verify.
- JS-disabled: copy + CTAs functional.
- Throttled 4G + 4× CPU: no jank during hero scroll.
- Zero console errors/warnings.

**Execution phases (each commit-able):**

1. **Tokens + spacing swap.** globals.css rewrite, Tailwind theme, rename shadcn tokens. ~2h.
2. **Typography.** next/font for three families, apply scale. ~1h.
3. **Lenis + Day Rail skeleton.** Install Lenis, mount Day Rail wired to scroll. No R3F yet. ~2h.
4. **CoreCanvas + shader.** R3F + 14islands scroll-rig. Dormant hero Core + ignition pulses. Mobile video fallback. ~6h.
5. **Section choreography.** BSMNT install. Pin Day 1–2, Day 3–8, Day 8, Day 10. ~8h.
6. **Micro + audio.** MagneticButton, LiveCounter wiggle, SLODial, sound subsystem. ~3h.
7. **Perf + QA.** Lighthouse, throttled, reduced-motion, a11y, cross-browser. ~3h.

**Estimate:** ~25h focused. Ship as one PR or in phase clusters 1–3 / 4 / 5 / 6–7.

**Risks.**
- Shader tuning eats time. Keep single-file, <80 lines, iterate isolated first.
- BSMNT Scrollytelling + bleeding React/Next may need pin — verify on install.
- iOS audio autoplay — opt-in toggle sidesteps but test.
