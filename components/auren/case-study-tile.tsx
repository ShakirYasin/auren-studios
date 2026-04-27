import Link from "next/link"

import { cn } from "@/lib/utils"

type Props = {
  slug: string
  eyebrow: string
  title: string
  result: string
  tone?: "default" | "muted"
  className?: string
}

/**
 * CaseStudyTile — featured-work / portfolio / case-studies tile.
 * Server-rendered; uses group-hover for state transitions.
 */
export function CaseStudyTile({
  slug,
  eyebrow,
  title,
  result,
  tone = "default",
  className,
}: Props) {
  return (
    <Link
      href={`/case-studies/${slug}`}
      className={cn(
        "group relative flex flex-col border-hairline border-b border-r transition-colors hover:bg-surface-1/40",
        tone === "muted" && "bg-surface-1/20",
        className
      )}
    >
      <div className="relative aspect-[16/10] overflow-hidden border-b border-hairline bg-surface-1">
        <div className="bg-grid absolute inset-0 opacity-60" />
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-coal/40" />
        <span className="label absolute bottom-3 left-4 text-[9px] text-ash/70">
          image / placeholder
        </span>
        <span className="label absolute right-4 top-3 text-[9px] text-ash/70">
          {slug}
        </span>
      </div>
      <div className="flex flex-1 flex-col justify-between p-8 md:p-10">
        <div>
          <span className="label text-ash transition-colors group-hover:text-ember">
            {eyebrow}
          </span>
          <h3 className="mt-4 font-display text-2xl font-medium tracking-tight text-bone md:text-[1.85rem]">
            {title}
          </h3>
        </div>
        <p
          className={cn(
            "mt-6 text-sm leading-relaxed text-ash transition-colors group-hover:text-bone"
          )}
        >
          {result}
        </p>
      </div>
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 border border-transparent transition-colors group-hover:border-ember/40"
      />
    </Link>
  )
}
