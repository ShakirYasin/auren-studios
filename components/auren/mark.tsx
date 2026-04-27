/**
 * Mark — the Auren Studios glyph.
 *
 * Generic studio mark: a small ember-tinted square housing a 4-stroke chevron.
 * Reused by Nav, Footer, and any surface that needs the studio insignia.
 */

export function Mark() {
  return (
    <span
      className="relative grid h-7 w-7 place-items-center rounded-sm border border-ember/60 bg-ember/10"
      style={{
        boxShadow:
          "inset 0 0 12px color-mix(in oklch, var(--ember) 35%, transparent)",
      }}
    >
      <svg
        viewBox="0 0 24 24"
        className="h-4 w-4 text-ember"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="2"
      >
        <path d="M4 20 L10 4" />
        <path d="M10 20 L16 4" />
        <path d="M16 20 L20 12" />
        <path d="M3 14 H21" />
      </svg>
    </span>
  )
}
