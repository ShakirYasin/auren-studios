import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google"

import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { ScrollProvider } from "@/components/openclaw/scroll-provider"
import { DayRail } from "@/components/openclaw/day-rail"
import { Nav } from "@/components/auren/nav"
import { Footer } from "@/components/auren/footer"
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
  title: "Auren Studios — Studio for AI, web, and mobile craft",
  description:
    "Auren Studios designs and builds AI agents, automations, web, and mobile products. A boutique studio shipping with cinematic care.",
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
            <DayRail />
            <Nav />
            {children}
            <Footer />
          </ScrollProvider>
          <div aria-hidden className="grain-overlay" />
          <div
            aria-hidden
            className="vignette pointer-events-none fixed inset-0 z-[55]"
          />
        </ThemeProvider>
      </body>
    </html>
  )
}
