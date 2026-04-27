/**
 * SectionHeader — the studio-shared section opener.
 *
 * Mirrors the OpenClaw landing's section header but stamps the
 * studio-level "auren / studios" label on the right.
 */

export function SectionHeader({
  no,
  day,
  kicker,
  title,
  lede,
}: {
  no: string
  day?: string
  kicker: string
  title: React.ReactNode
  lede?: string
}) {
  return (
    <div className="border-hairline mx-auto grid max-w-[1440px] grid-cols-12 border-x">
      <div className="border-hairline col-span-12 grid grid-cols-12 border-b">
        <div className="col-span-12 flex items-center justify-between px-6 py-5 md:px-10">
          <span className="label flex items-center gap-3 text-ash">
            <span>
              {no} / {kicker}
            </span>
            {day && (
              <>
                <span className="hidden h-[10px] w-px bg-[rgb(245_235_220_/_0.15)] md:block" />
                <span className="hidden text-ember md:inline">{day}</span>
              </>
            )}
          </span>
          <span className="label hidden text-ash md:inline">
            auren / studios
          </span>
        </div>
      </div>
      <div className="col-span-12 grid grid-cols-12 gap-0 px-6 py-20 md:px-10 md:py-28">
        <h2 className="col-span-12 font-display text-[clamp(2.25rem,4.8vw,4.5rem)] leading-[0.94] font-medium tracking-[-0.035em] md:col-span-8">
          {title}
        </h2>
        {lede && (
          <p className="col-span-12 mt-8 max-w-md self-end text-base leading-relaxed text-ash md:col-span-4 md:mt-0 md:pl-10">
            {lede}
          </p>
        )}
      </div>
    </div>
  )
}
