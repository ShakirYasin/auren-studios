"use client"

import { useEffect, useState } from "react"
import { Volume2, VolumeX } from "lucide-react"
import {
  initSound,
  isSoundEnabled,
  playIgnite,
  setSoundEnabled,
} from "@/lib/sound"

export function SoundToggle() {
  const [on, setOn] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    initSound()
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setOn(isSoundEnabled())
    setMounted(true)
  }, [])

  const toggle = () => {
    const next = !on
    setSoundEnabled(next)
    setOn(next)
    if (next) playIgnite()
  }

  if (!mounted) return null

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={on}
      aria-label={on ? "Mute interface sounds" : "Enable interface sounds"}
      className="press inline-flex h-8 w-8 items-center justify-center rounded-sm border border-hairline text-ash hover:border-ember hover:text-ember"
      title={on ? "sound / on" : "sound / off"}
    >
      {on ? (
        <Volume2 className="h-3.5 w-3.5" strokeWidth={1.5} />
      ) : (
        <VolumeX className="h-3.5 w-3.5" strokeWidth={1.5} />
      )}
    </button>
  )
}
