/**
 * Tiny programmatic sound subsystem — opt-in, no asset downloads.
 *
 * All three signature sounds are synthesized in the WebAudio graph so we
 * don't ship any .wav files. Defaults OFF. State in localStorage.
 */

const KEY = "openclaw:sound"

let audioCtx: AudioContext | null = null
let enabled = false

function getEnabled() {
  if (typeof window === "undefined") return false
  return window.localStorage.getItem(KEY) === "on"
}

function ensureCtx() {
  if (typeof window === "undefined") return null
  if (!audioCtx) {
    const Ctor =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext
    if (!Ctor) return null
    audioCtx = new Ctor()
  }
  if (audioCtx.state === "suspended") audioCtx.resume().catch(() => {})
  return audioCtx
}

export function initSound() {
  if (typeof window === "undefined") return
  enabled = getEnabled()
}

export function setSoundEnabled(on: boolean) {
  if (typeof window === "undefined") return
  enabled = on
  window.localStorage.setItem(KEY, on ? "on" : "off")
  if (on) ensureCtx()
}

export function isSoundEnabled() {
  return enabled
}

function tone({
  freq,
  dur,
  type = "sine",
  gain = 0.04,
  attack = 0.002,
  release = 0.08,
  detune = 0,
}: {
  freq: number
  dur: number
  type?: OscillatorType
  gain?: number
  attack?: number
  release?: number
  detune?: number
}) {
  if (!enabled) return
  const ctx = ensureCtx()
  if (!ctx) return
  const now = ctx.currentTime
  const osc = ctx.createOscillator()
  const g = ctx.createGain()
  osc.type = type
  osc.frequency.value = freq
  osc.detune.value = detune
  g.gain.setValueAtTime(0, now)
  g.gain.linearRampToValueAtTime(gain, now + attack)
  g.gain.linearRampToValueAtTime(0.0001, now + dur + release)
  osc.connect(g)
  g.connect(ctx.destination)
  osc.start(now)
  osc.stop(now + dur + release + 0.02)
}

/** Soft tick on day-change. */
export function playTick() {
  tone({ freq: 1380, dur: 0.02, type: "triangle", gain: 0.05 })
  tone({ freq: 920, dur: 0.035, type: "sine", gain: 0.025, attack: 0.004 })
}

/** Button press. */
export function playClick() {
  tone({ freq: 620, dur: 0.01, type: "square", gain: 0.025 })
  tone({ freq: 1240, dur: 0.015, type: "triangle", gain: 0.018 })
}

/** Core ignition pulse — deeper, warmer. */
export function playIgnite() {
  tone({ freq: 110, dur: 0.18, type: "sine", gain: 0.08, attack: 0.02, release: 0.18 })
  tone({ freq: 220, dur: 0.18, type: "triangle", gain: 0.04, attack: 0.01, release: 0.18 })
}
