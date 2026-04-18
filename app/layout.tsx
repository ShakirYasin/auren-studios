import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google"

import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { cn } from "@/lib/utils"

const fontSans = Geist({ subsets: ["latin"], variable: "--font-sans" })

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

const fontDisplay = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-display",
})

export const metadata = {
  title: "Openclaw — pipelines, shipped.",
  description:
    "A specialist engineering crew that configures data & ML pipelines in days, not quarters. Low cost. Full reliability.",
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
        fontDisplay.variable,
        "font-sans"
      )}
    >
      <body>
        <ThemeProvider defaultTheme="dark" forcedTheme="dark">
          {children}
          <div aria-hidden className="grain-overlay" />
        </ThemeProvider>
      </body>
    </html>
  )
}
