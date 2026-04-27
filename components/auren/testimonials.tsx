import { Reveal } from "@/components/reveal"
import { cn } from "@/lib/utils"

type Testimonial = {
  quote: string
  name: string
  role: string
  company: string
}

const TESTIMONIALS: Testimonial[] = [
  {
    quote: "We shipped twice as fast and the result felt cinematic.",
    name: "Lorem Ipsum",
    role: "Head of Product",
    company: "[TBD]",
  },
  {
    quote:
      "They treated our automations like a craft. The handover doc alone was worth it.",
    name: "Lorem Ipsum",
    role: "Founder",
    company: "[TBD]",
  },
  {
    quote:
      "A studio that says less and ships more. Weekly demos kept everyone honest.",
    name: "Lorem Ipsum",
    role: "VP Engineering",
    company: "[TBD]",
  },
  {
    quote:
      "From brief to launch in four weeks. The site moves like a film, not a template.",
    name: "Lorem Ipsum",
    role: "Brand Director",
    company: "[TBD]",
  },
]

/**
 * Testimonials body. Caller renders the SectionHeader.
 */
export function Testimonials() {
  return (
    <div className="border-hairline mx-auto grid max-w-[1440px] grid-cols-1 border-x md:grid-cols-2">
      {TESTIMONIALS.map((t, i) => (
        <Reveal
          key={`${t.name}-${i}`}
          delay={i * 80}
          className={cn(
            "border-hairline border-b p-8 md:p-10",
            i % 2 === 0 ? "md:border-r" : "",
            i === 0 ? "breathe" : ""
          )}
        >
          <blockquote className="font-serif italic text-2xl leading-snug text-bone md:text-[1.7rem]">
            “{t.quote}”
          </blockquote>
          <div className="my-6 h-px bg-[rgb(245_235_220_/_0.08)]" />
          <div className="flex items-center gap-3">
            <span className="h-2 w-2 rounded-full bg-ember" />
            <span className="font-mono text-xs tracking-wider text-ash">
              {t.name} · {t.role} · {t.company}
            </span>
          </div>
        </Reveal>
      ))}
    </div>
  )
}
