import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google"

import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { ScrollProvider } from "@/components/openclaw/scroll-provider"
import { CoreCanvas } from "@/components/openclaw/core-canvas"
import { DayRail } from "@/components/openclaw/day-rail"
import { cn } from "@/lib/utils"

const fontSans = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["300", "400", "500", "600", "700"],
})

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500"],
})

const fontSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["italic", "normal"],
  variable: "--font-serif",
})

export const metadata = {
  title: "Openclaw — pipelines, shipped.",
  description:
    "A senior crew that stands up production data & ML pipelines in days, not quarters. Flat pricing. Repo, runbook, and keys handed over on day ten.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        "antialiased",
        fontMono.variable,
        fontSans.variable,
        fontSerif.variable,
        "font-sans"
      )}
    >
      <body className="bg-coal text-bone">
        <ThemeProvider defaultTheme="dark" forcedTheme="dark">
          <ScrollProvider>
            <CoreCanvas />
            <DayRail />
            {children}
          </ScrollProvider>
          <div aria-hidden className="grain-overlay" />
          <div aria-hidden className="vignette pointer-events-none fixed inset-0 z-[55]" />
        </ThemeProvider>
      </body>
    </html>
  )
}
