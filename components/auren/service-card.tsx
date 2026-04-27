import Link from "next/link"
import type { ReactNode } from "react"
import { ArrowUpRight } from "lucide-react"

import { cn } from "@/lib/utils"

type Props = {
  no: string
  title: string
  href: string
  tags: string[]
  description: string
  icon?: ReactNode
  className?: string
}

/**
 * ServiceCard — hairline-bordered cell for the Services overview grid.
 * Server-rendered; relies on Tailwind `group-hover:` for transitions.
 */
export function ServiceCard({
  no,
  title,
  href,
  tags,
  description,
  icon,
  className,
}: Props) {
  const kicker = title.toLowerCase()
  return (
    <Link
      href={href}
      className={cn(
        "group lift relative flex min-h-[260px] flex-col justify-between border-hairline border-b border-r p-8 transition-colors hover:bg-surface-2 md:p-10",
        className
      )}
    >
      <div className="flex items-start justify-between">
        <span className="label text-ash">
          {no} / {kicker}
        </span>
        <span className="flex items-center gap-2 text-ash transition-colors group-hover:text-ember">
          {icon}
          <ArrowUpRight
            className="magnetic h-4 w-4 opacity-0 transition-opacity group-hover:opacity-100"
            strokeWidth={1.5}
          />
        </span>
      </div>
      <div className="mt-12">
        <h3 className="font-display text-2xl font-medium tracking-tight text-bone md:text-[1.85rem]">
          {title}
        </h3>
        <p className="mt-3 max-w-[44ch] text-sm leading-relaxed text-ash">
          {description}
        </p>
      </div>
      <div className="mt-8 flex items-center justify-between gap-3">
        <div className="flex flex-wrap gap-1.5">
          {tags.map((t) => (
            <span
              key={t}
              className="border-hairline rounded-sm border bg-surface-1 px-2 py-0.5 font-mono text-[10px] tracking-wider text-ash"
            >
              {t}
            </span>
          ))}
        </div>
        <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-ember opacity-0 transition-opacity group-hover:opacity-100" />
      </div>
    </Link>
  )
}
