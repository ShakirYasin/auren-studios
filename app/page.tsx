import { SectionHeader } from "@/components/auren/section-header"

export const metadata = {
  title: "Auren Studios — Studio for AI, web, and mobile craft",
}

export default function Page() {
  return (
    <main>
      <SectionHeader
        no="00"
        kicker="incoming"
        title={
          <>
            landing in <em className="font-serif italic">progress</em>
          </>
        }
        lede="The new Auren Studios homepage is being assembled. In the meantime, browse Services, Case Studies, or get in touch."
      />
      <div className="mx-auto grid max-w-[1440px] grid-cols-12 border-x border-hairline">
        <div className="col-span-12 px-6 py-24 md:px-10 md:py-32 text-ash">
          <p className="max-w-prose text-base leading-relaxed">
            Auren Studios — design, AI, web, mobile, and brand. We&apos;re
            putting the rest of the site together. Use the nav above to explore
            in the meantime.
          </p>
        </div>
      </div>
    </main>
  )
}
