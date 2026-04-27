import { ContactForm } from "@/components/auren/contact-form"
import { SectionHeader } from "@/components/auren/section-header"
import { LiveClock } from "@/components/openclaw/live-clock"
import { LiveCounter } from "@/components/openclaw/live-counter"
import { Terminal } from "@/components/openclaw/terminal"

export const metadata = {
  title: "Contact — Auren Studios",
  description:
    "Tell us about your project. We respond within one business day.",
}

export default function Page() {
  return (
    <main className="relative z-10 min-h-svh bg-transparent text-bone">
      {/* 00 — header */}
      <SectionHeader
        no="00"
        kicker="contact"
        title={
          <>
            start a <em className="font-serif italic">project</em>.
          </>
        }
        lede="Tell us what you're building. We'll reply within one working day."
      />

      {/* form + info */}
      <section className="border-hairline relative border-t">
        <div className="border-hairline mx-auto grid max-w-[1440px] grid-cols-1 border-x md:grid-cols-12">
          {/* left — form */}
          <div className="border-hairline col-span-1 border-b p-8 md:col-span-7 md:border-b-0 md:border-r md:p-12">
            <div className="flex items-center justify-between">
              <span className="label text-ash">brief.form</span>
              <span className="font-mono text-[10px] text-ash">
                /contact/inquiry
              </span>
            </div>

            <ContactForm />
          </div>

          {/* right — info panel */}
          <aside className="col-span-1 flex flex-col md:col-span-5">
            {/* office hours */}
            <div className="border-hairline flex flex-col gap-3 border-b p-8 md:p-10">
              <span className="label text-ash">office hours</span>
              <div className="font-display text-[clamp(1.5rem,2.4vw,2rem)] leading-tight font-medium tracking-tight text-bone">
                <LiveClock />
              </div>
              <span className="text-sm text-ash">9–18 GST · Mon–Thu</span>
            </div>

            {/* response time */}
            <div className="border-hairline flex flex-col gap-3 border-b p-8 md:p-10">
              <span className="label text-ash">response time</span>
              <div className="font-display text-[clamp(2.5rem,5vw,4.5rem)] leading-none font-medium tracking-tight text-bone">
                <LiveCounter value={1} />
                <span className="ml-3 text-2xl text-ash">business day</span>
              </div>
              <span className="text-sm text-ash">measured across last 90d</span>
            </div>

            {/* current load */}
            <div className="border-hairline flex flex-col gap-3 border-b p-8 md:p-10">
              <span className="label text-ash">current load</span>
              <div className="mt-1 flex gap-2">
                {[0, 1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className={`h-2 flex-1 rounded-sm border border-hairline ${
                      i < 3 ? "bg-ember" : "bg-transparent"
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-ash">
                3 of 5 slots booked through Q2
              </span>
            </div>

            {/* where we are */}
            <div className="flex flex-col gap-3 p-8 md:p-10">
              <span className="label text-ash">where we are</span>
              <div className="font-display text-[clamp(1.25rem,2vw,1.5rem)] leading-tight font-medium tracking-tight text-bone">
                distributed across UAE / US / EU
              </div>
              <span className="font-mono text-[11px] text-ash">
                25.27, 55.30 · 40.71, -74.01 · 52.52, 13.40
              </span>
            </div>
          </aside>
        </div>
      </section>

      {/* live thread terminal */}
      <section className="border-hairline relative border-t">
        <div className="border-hairline mx-auto max-w-[1440px] border-x p-8 md:p-12">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-12">
            <div className="md:col-span-4">
              <span className="label text-ash">studio.thread</span>
              <p className="mt-3 max-w-xs text-sm leading-relaxed text-ash">
                What happens after you hit send.
              </p>
            </div>
            <div className="md:col-span-8">
              <Terminal
                title="studio.thread"
                lines={[
                  {
                    text: "studio: brief received → producer assigned",
                    kind: "step",
                  },
                  {
                    text: "producer: kickoff scheduled within 24h",
                    kind: "step",
                  },
                  {
                    text: "studio: next demo every friday 14:00 GST",
                    kind: "final",
                  },
                ]}
              />
            </div>
          </div>
        </div>
      </section>

      {/* 01 — alternative */}
      <section className="border-hairline relative border-t">
        <SectionHeader
          no="01"
          kicker="alternative"
          title={
            <>
              other <em className="font-serif italic">routes</em>.
            </>
          }
        />
        <div className="border-hairline mx-auto max-w-[1440px] border-x">
          <div className="flex flex-col items-start justify-between gap-6 p-8 md:flex-row md:items-center md:p-10">
            <p className="max-w-2xl text-base leading-relaxed text-bone">
              Prefer email?{" "}
              <a
                className="text-ember hover:underline"
                href="mailto:hello@aurenstudios.com"
              >
                hello@aurenstudios.com
              </a>{" "}
              · Calendly:{" "}
              <a className="text-ember hover:underline" href="#">
                book a 20-min intro
              </a>
            </p>
            <span className="font-mono text-xs text-ash">
              we read everything · usually reply same day
            </span>
          </div>
        </div>
      </section>
    </main>
  )
}
