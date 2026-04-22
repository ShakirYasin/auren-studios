# Auren Studios — Rebrand & Restructure Plan

Status: proposed, not yet executed.
Date: 2026-04-23.
Scope: transform the current single-page OpenClaw Services site into a multi-page Auren Studios website, where OpenClaw becomes one sub-service under a broader services offering. Preserve the existing design language end-to-end.

## 1. Design Language (preserved verbatim)

All tokens, components, and motion primitives from the current site stay. Specifically:

- **Palette unchanged**: coal / surface-1..3 / bone / ash / ember / amber-glow / deep-rust / live. Warm cinematic dark theme is on-brand for a name like "Auren" (aura / golden).
- **Typography unchanged**: Geist (sans), Instrument Serif italic accents, Geist Mono for `.label`.
- **Layout unchanged**: 1440px max, 12-col, hairline dividers, left rail with rotated vertical label, numbered section headers (`00 / …`, `01 / …`).
- **Motion unchanged**: Lenis smooth scroll, Reveal stagger, MagneticButton, pulse/breathe/scan, rise animation on hero.
- **Decorative motifs unchanged**: `.bg-grid`, `.grain-overlay`, `.spotlight`, `.vignette`, marquee fades, terminal/RFC/pipeline blocks.
- **Accent**: keep `--ember` as Auren's signature gold-orange. No CSS rename needed.

**Mascot decision**: the 3D OpenClaw mascot is brand-specific to OpenClaw, not Auren. Move it from the global `layout.tsx` onto the OpenClaw sub-service page only. Replace the global background with the original calmer ember-glow `CoreCanvas` (from git history) as the Auren ambient backdrop. Preserves mood without tying Auren to the claw creature.

## 2. Information Architecture

```
/                           → Auren Studios landing
/about                      → Studio story, team, values
/services                   → Services index (grid of all services)
/services/ai-automations    → AI workflow automations
/services/ai-agents         → Custom AI agents — OpenClaw lives here (current page, lifted wholesale)
/services/web-design        → Web design & development
/services/mobile-apps       → iOS / Android / React Native
/services/brand-identity    → Brand + design systems
/services/saas-engineering  → MVP & SaaS product engineering
/case-studies               → Case study index
/case-studies/[slug]        → Individual case study (2–3 seed entries)
/portfolio                  → Visual portfolio grid
/contact                    → Contact form + calendar
```

### Recommended services

User specified: **AI Automations, Web Design, Mobile App Development**.

Adding **3 more** to fit an AI-forward boutique studio without bloating the nav:

1. **AI Agents & Assistants** — proper home for OpenClaw. Distinct from AI Automations (automations = workflows/pipelines; agents = conversational/autonomous).
2. **Brand Identity & Design Systems** — "Studios" implies craft + brand, not just engineering.
3. **SaaS / MVP Engineering** — natural upsell from web/mobile, differentiates from pure agencies.

Skipped (bundled instead): UX Research (→ Web Design), Data & Analytics (→ AI Automations), DevOps (→ SaaS Engineering). Six top-level services is the ceiling before the dropdown feels cluttered.

## 3. Navbar Structure

Sticky header, same visual treatment as current (bone logo + mono/sans hybrid). Desktop shows inline links; mobile collapses to a drawer.

```
[Auren mark]  Auren Studios
                ├─ Home              → /
                ├─ About             → /about
                ├─ Services ▾        → /services
                │    ├─ AI Automations
                │    ├─ AI Agents (inc. OpenClaw)
                │    ├─ Web Design
                │    ├─ Mobile Apps
                │    ├─ Brand Identity
                │    └─ SaaS Engineering
                ├─ Case Studies      → /case-studies
                ├─ Portfolio         → /portfolio
                └─ Contact           → /contact
                                       [CTA: Start a project]
```

- Dropdown uses the existing hairline + surface-1 aesthetic — no shadow, just bordered cells.
- Mobile: off-canvas drawer with the same vertical label rail as the hero.
- CTA uses `MagneticButton` for the primary action on desktop.

## 4. Landing Page Sections (`/`)

Same rhythm, numbering, and component vocabulary as current landing:

| # | Section | Pattern |
|---|---------|---------|
| Nav | Sticky | Auren logo + links + Magnetic CTA |
| 00 | **Hero** | Big clamp headline with serif-italic accent ("we build the *quiet machines*…"), live clock, Magnetic CTAs, right-side terminal preview (typewriter of a live client message) |
| 01 | **Services overview** | 6-card grid, one per service, each links to its sub-page; hairline borders, hover→ember, icons + tags |
| 02 | **Why Auren / Positioning** | Left-copy + right-RFC-style doc (reuse `RFCDocument`) describing the studio's principles |
| 03 | **Featured work** | 3 case-study tiles (big image + label + 1-line result), links to `/case-studies/[slug]` |
| 04 | **Process / Cadence** | Reuse existing 4-step timeline pattern (Discover → Design → Build → Handover) |
| 05 | **Tech & platform strip** | Horizontal marquee of stack (Next, Three, OpenClaw, Figma, Supabase, etc.) |
| 06 | **Metrics** | 4 live-counter stat cells (projects shipped, retention %, avg handover, client NPS) |
| 07 | **Testimonials** | NEW — 2-col grid of pull-quotes. Each card: serif-italic quote, small avatar dot, mono name/role/company, hairline border. Auto-cycling highlight on one card via `.breathe` animation. |
| 08 | **Portfolio preview** | 6-tile image grid (varied row heights), CTA "see full portfolio → /portfolio" |
| 09 | **FAQ** | Reuse existing `details/summary` pattern, 6–8 questions |
| 10 | **Handover / CTA** | Existing `.spotlight` + `.bg-grid` pattern, serif-italic close, two CTAs (Start a project / Book a call) |
| — | Footer | Existing 5-col pattern, giant `auren` watermark at 5% opacity |

## 5. Per-page Plans (sub-pages)

Each service page follows the same template so they feel like a set:

```
Section header (##  / Service name)
Hero: headline + deliverables + Magnetic CTA
What we ship: 3–5 bullets with hairline cells
Sample work: 2–3 tiles linking to case studies
Process snippet: reuse cadence pattern (abbreviated 3-step)
Pricing anchor: "from $X, fixed-scope"
CTA: inquiry link
```

**Special case — `/services/ai-agents`**: the current landing page is lifted wholesale here. The 3D mascot canvas renders *only on this page*. All current content (examples, safety, pipeline, pricing, FAQ, handover) becomes this page's body. Numbering re-anchors to `00/` here since it's its own section.

**`/about`**: left column is a studio story written in the existing clipped-voice style with serif-italic emphasis; right column is a terminal-style `.label`-driven timeline (founded, clients, milestones); team grid at bottom (name + role + mono tag).

**`/case-studies`**: grid of cases. `[slug]` page uses the RFC/terminal pattern for the problem/solution block and live-counter for results.

**`/portfolio`**: pure image grid with hover→surface-2 label reveal. No copy.

**`/contact`**: two-col — left is a terminal-styled form (input borders use hairline), right is a mono block showing "office hours / response time / current load" live counters.

## 6. File / Folder Plan

```
app/
  layout.tsx                           ← update metadata, wire new Nav/Footer, remove mascot from global
  page.tsx                             ← NEW Auren landing (old page.tsx content moves to services/ai-agents)
  about/page.tsx                       ← NEW
  services/
    page.tsx                           ← NEW index
    ai-automations/page.tsx            ← NEW
    ai-agents/page.tsx                 ← MOVED current landing; mascot canvas scoped here
    web-design/page.tsx                ← NEW
    mobile-apps/page.tsx               ← NEW
    brand-identity/page.tsx            ← NEW
    saas-engineering/page.tsx          ← NEW
  case-studies/
    page.tsx                           ← NEW
    [slug]/page.tsx                    ← NEW
  portfolio/page.tsx                   ← NEW
  contact/page.tsx                     ← NEW

components/
  auren/                               ← NEW (shared studio-wide shell)
    nav.tsx                            ← header with dropdown
    footer.tsx                         ← shared footer
    testimonials.tsx                   ← NEW testimonial grid component
    service-card.tsx                   ← re-usable service tile
    case-study-tile.tsx                ← re-usable case tile
    section-header.tsx                 ← extracted from current page.tsx
  openclaw/                            ← unchanged (used by ai-agents page)
    ...
  ui/                                  ← unchanged
```

No existing components are deleted. `SectionHeader`, `Mark`, etc. currently defined inline in `app/page.tsx` get extracted into `components/auren/` so they're reusable across pages.

## 7. Content & copy strategy

- Seed copy is placeholder (descriptive but non-fabricated — no fake client names/testimonials). Testimonials use `"— Lorem Ipsum, Role at [TBD]"` style to fill in later.
- Metrics use ranges or TBD so nothing reads as fabricated. Wire counters, swap numbers later.
- Case studies: 2 placeholder slugs (`acme-onboarding`, `northwind-ops`) with full template content — easy to replace.

## 8. Execution Phases

Phase 1 — **Shell & routing**
- Extract `Nav`, `Footer`, `SectionHeader`, `Mark` into `components/auren/`
- Add new Nav with dropdown
- Move mascot out of `layout.tsx`, scope to `/services/ai-agents`
- Update metadata to Auren

Phase 2 — **Move OpenClaw page**
- `app/page.tsx` → `app/services/ai-agents/page.tsx` (rename internal anchors where needed)
- Landing anchors (`#hero`, `#work`, etc.) remain scoped to that page

Phase 3 — **New landing page**
- Build `app/page.tsx` with the 11-section plan above
- Build `Testimonials` component

Phase 4 — **Service sub-pages** (template-driven, 5 new pages)

Phase 5 — **About / Contact / Portfolio / Case Studies**

Phase 6 — Typecheck pass + visual sweep

Each phase typechecks before the next starts.

## 9. Non-goals / explicit exclusions

- No CMS integration (static content, easy to port later)
- No auth/backend changes
- No payment or booking integration (CTAs link to existing `/api` routes or plain `mailto:`/calendly placeholder)
- No new design tokens — strictly reuse the current palette
- No removal of the existing `/assessment` page — left untouched
