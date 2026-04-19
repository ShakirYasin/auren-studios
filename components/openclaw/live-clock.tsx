"use client"

import { useEffect, useState } from "react"

export function LiveClock({ className = "" }: { className?: string }) {
  const [mounted, setMounted] = useState(false)
  const [now, setNow] = useState<Date | null>(null)

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true)
    setNow(new Date())
    const i = setInterval(() => setNow(new Date()), 60_000)
    return () => clearInterval(i)
  }, [])

  if (!mounted || !now) return <span className={className}>-- UTC</span>
  const iso =
    now.toISOString().slice(0, 10) +
    " / " +
    now.toISOString().slice(11, 16) +
    " UTC"
  return <span className={className}>{iso}</span>
}
