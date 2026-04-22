"use client"

/**
 * The Core — persistent 3D OpenClaw mascot sitting on the right of the viewport.
 *
 * Procedural character (round red body, cyan eyes, antennae, side nubs, legs)
 * built from three.js primitives. Always animating:
 *   — scroll drives y-axis rotation so the mascot turns with the page
 *   — idle hops, body squash, antenna sway, nub wiggle
 *   — eyes dart around and blink on a randomized timer
 */

import { useEffect, useMemo, useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import * as THREE from "three"
import { useScroll } from "./scroll-provider"

type ProgressRef = React.MutableRefObject<number>

function OpenClawMascot({ progressRef }: { progressRef: ProgressRef }) {
  const rootRef = useRef<THREE.Group>(null)
  const bodyRef = useRef<THREE.Group>(null)
  const antennaLRef = useRef<THREE.Group>(null)
  const antennaRRef = useRef<THREE.Group>(null)
  const eyeLRef = useRef<THREE.Group>(null)
  const eyeRRef = useRef<THREE.Group>(null)
  const pupilLRef = useRef<THREE.Group>(null)
  const pupilRRef = useRef<THREE.Group>(null)
  const shineLRef = useRef<THREE.Mesh>(null)
  const shineRRef = useRef<THREE.Mesh>(null)
  const nubLRef = useRef<THREE.Mesh>(null)
  const nubRRef = useRef<THREE.Mesh>(null)
  const browLRef = useRef<THREE.Group>(null)
  const browRRef = useRef<THREE.Group>(null)

  // Scroll-velocity tracking — smoothed for reactive excitement.
  const lastProgress = useRef(0)
  const scrollVel = useRef(0)
  const scrollDir = useRef(0) // signed smoothed velocity

  // Blink state — full eye close, rare.
  const blinkPhase = useRef(0)
  const nextBlinkIn = useRef(3.5 + Math.random() * 3)
  const BLINK_DURATION = 0.2
  // Happy-squint state — partial close, more frequent.
  const squintPhase = useRef(0)
  const nextSquintIn = useRef(1.8 + Math.random() * 1.5)
  const SQUINT_DURATION = 0.55

  const mats = useMemo(() => {
    const body = new THREE.MeshStandardMaterial({
      color: new THREE.Color("#d93a38"),
      roughness: 0.45,
      metalness: 0.08,
    })
    const bodyDark = new THREE.MeshStandardMaterial({
      color: new THREE.Color("#a3241f"),
      roughness: 0.5,
      metalness: 0.08,
    })
    const iris = new THREE.MeshStandardMaterial({
      color: new THREE.Color("#35d1cf"),
      emissive: new THREE.Color("#0d5e5d"),
      emissiveIntensity: 0.4,
      roughness: 0.32,
      metalness: 0.15,
    })
    const irisRim = new THREE.MeshStandardMaterial({
      color: new THREE.Color("#1d7372"),
      roughness: 0.5,
      metalness: 0.05,
    })
    const pupil = new THREE.MeshStandardMaterial({
      color: new THREE.Color("#0a0a0a"),
      roughness: 0.2,
      metalness: 0,
    })
    const shine = new THREE.MeshBasicMaterial({
      color: new THREE.Color("#ffffff"),
    })
    const brow = new THREE.MeshStandardMaterial({
      color: new THREE.Color("#7a1b17"),
      roughness: 0.45,
      metalness: 0.1,
    })
    const cheek = new THREE.MeshStandardMaterial({
      color: new THREE.Color("#ff7a6d"),
      emissive: new THREE.Color("#a33028"),
      emissiveIntensity: 0.35,
      roughness: 0.6,
      metalness: 0,
      transparent: true,
      opacity: 0.65,
    })
    return { body, bodyDark, iris, irisRim, pupil, shine, brow, cheek }
  }, [])

  const browGeo = useMemo(() => {
    const curve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-0.32, 0, 0),
      new THREE.Vector3(-0.1, 0.1, 0),
      new THREE.Vector3(0.1, 0.1, 0),
      new THREE.Vector3(0.32, 0, 0),
    ])
    return new THREE.TubeGeometry(curve, 32, 0.055, 14, false)
  }, [])

  useEffect(() => () => browGeo.dispose(), [browGeo])

  useEffect(() => {
    return () => {
      Object.values(mats).forEach((m) => m.dispose())
    }
  }, [mats])

  useFrame((state, delta) => {
    const root = rootRef.current
    if (!root) return
    const p = progressRef.current
    const t = state.clock.elapsedTime

    // Scroll velocity (per second) + smoothed signed direction for reactions.
    const rawVel = delta > 0 ? (p - lastProgress.current) / delta : 0
    lastProgress.current = p
    const absVel = Math.min(Math.abs(rawVel) * 8, 1) // 0..1 excitement envelope
    // exponential smoothing
    scrollVel.current += (absVel - scrollVel.current) * Math.min(delta * 6, 1)
    scrollDir.current += (rawVel * 8 - scrollDir.current) * Math.min(delta * 4, 1)
    const excite = scrollVel.current // 0..1
    const dir = Math.max(-1, Math.min(1, scrollDir.current))

    // Multi-axis scroll rotation — not just Y; mascot tumbles playfully.
    root.rotation.y = p * Math.PI * 2.6
    root.rotation.x =
      Math.sin(p * Math.PI * 3) * 0.45 + // nod-forward waves tied to scroll
      Math.sin(t * 0.5) * 0.04
    root.rotation.z =
      Math.sin(p * Math.PI * 2) * 0.28 + // barrel-ish lean driven by scroll
      Math.sin(t * 0.5) * 0.05 +
      dir * 0.1 // lean in scroll direction

    // Scroll-driven X/Y drift — mascot travels across the right side.
    // x path: gentle arc (stays on right, nudges toward center/edge with scroll)
    const scrollX = 3.4 + Math.sin(p * Math.PI) * -0.5 + Math.sin(p * Math.PI * 2) * 0.2
    // y path: figure-eight-ish with scroll
    const scrollY = Math.sin(p * Math.PI * 2) * 0.6 + Math.cos(p * Math.PI * 4) * 0.2
    root.position.x = scrollX
    root.position.y =
      0.1 +
      scrollY +
      Math.sin(t * 1.2) * 0.14 +
      Math.sin(t * 0.55) * 0.03 +
      excite * 0.08

    // Scroll-driven scale pulse — grows subtly toward mid-page, breathes with excite.
    const scrollScale = 0.72 * (1 + Math.sin(p * Math.PI) * 0.08 + excite * 0.05)
    root.scale.setScalar(scrollScale)

    // Volume-preserving body squash — single sin signal drives both axes, so
    // it's perfectly smooth (no hop pops, no conditional branches).
    if (bodyRef.current) {
      const s = Math.sin(t * 1.2) * 0.05 // ±5% primary
      const s2 = Math.sin(t * 2.4 + 0.8) * 0.015 // subtle secondary
      const sy = 1 + s + s2
      const sx = 1 - (s + s2) * 0.5 // squish x/z as y stretches → keeps volume
      bodyRef.current.scale.set(sx, sy, sx)
    }

    // Antennae sway — calm idle only. Scroll doesn't whip them.
    if (antennaLRef.current) {
      antennaLRef.current.rotation.z =
        0.28 + Math.sin(t * 1.6) * 0.12 + Math.sin(t * 0.9) * 0.03
    }
    if (antennaRRef.current) {
      antennaRRef.current.rotation.z =
        -0.28 + Math.sin(t * 1.6 + 0.9) * 0.12 + Math.sin(t * 0.9 + 0.5) * 0.03
    }

    // Side nubs flap — gentle, steady.
    if (nubLRef.current) {
      nubLRef.current.rotation.z = Math.sin(t * 2.2) * 0.26
    }
    if (nubRRef.current) {
      nubRRef.current.rotation.z = -Math.sin(t * 2.2 + 0.4) * 0.26
    }

    // Joyful eye movement — steady circle, tiny scroll-direction lean. No excite-driven speed/radius.
    const circleR = 0.05
    const ang = t * 1.5
    const scrollGlanceX = dir * 0.02 // very subtle lean
    const lookX =
      Math.cos(ang) * circleR + Math.sin(t * 3.1) * 0.01 + scrollGlanceX
    const lookY = Math.sin(ang) * circleR * 0.7 + 0.02 + Math.sin(t * 2.3) * 0.008
    if (pupilLRef.current) pupilLRef.current.position.set(lookX, lookY, 0)
    if (pupilRRef.current) pupilRRef.current.position.set(lookX, lookY, 0)

    // Shine sparkle — pulsing highlight for joyful glint.
    const sparkle = 1 + Math.sin(t * 4.2) * 0.2 + Math.sin(t * 7.1) * 0.08
    if (shineLRef.current) shineLRef.current.scale.setScalar(sparkle)
    if (shineRRef.current) shineRRef.current.scale.setScalar(sparkle)

    // Blink — full close, rare.
    nextBlinkIn.current -= delta
    if (nextBlinkIn.current <= 0 && blinkPhase.current <= 0) {
      blinkPhase.current = BLINK_DURATION
      nextBlinkIn.current = 4 + Math.random() * 4
    }
    // Squint (happy) — partial close, more frequent, longer & softer than blink.
    nextSquintIn.current -= delta
    if (
      nextSquintIn.current <= 0 &&
      squintPhase.current <= 0 &&
      blinkPhase.current <= 0
    ) {
      squintPhase.current = SQUINT_DURATION
      nextSquintIn.current = 2.2 + Math.random() * 2
    }

    let eyeScaleY = 1
    let eyeYLift = 0
    if (blinkPhase.current > 0) {
      const u = 1 - blinkPhase.current / BLINK_DURATION
      eyeScaleY *= 1 - Math.sin(u * Math.PI) * 0.92
      blinkPhase.current -= delta
    }
    if (squintPhase.current > 0) {
      const u = 1 - squintPhase.current / SQUINT_DURATION
      // smooth bell: close to ~55% for the duration, ease in/out
      const bell = Math.sin(u * Math.PI)
      eyeScaleY *= 1 - bell * 0.45
      eyeYLift += bell * 0.03 // eyes rise slightly — happy arc
      squintPhase.current -= delta
    }
    if (eyeLRef.current) {
      eyeLRef.current.scale.y = eyeScaleY
      eyeLRef.current.position.y = 0.22 + eyeYLift
    }
    if (eyeRRef.current) {
      eyeRRef.current.scale.y = eyeScaleY
      eyeRRef.current.position.y = 0.22 + eyeYLift
    }

    // Brows — bounce gently, lift higher on squint (joy!), mirrored phase.
    const browBaseY = 0.72
    const browBounce = Math.sin(t * 2.6) * 0.025
    const browJoyLift = eyeYLift * 3.5 // brows rise more than eyes during squint
    if (browLRef.current) {
      browLRef.current.position.y = browBaseY + browBounce + browJoyLift
      // tilt outer edge up a bit more when excited
      browLRef.current.rotation.z = -0.18 - eyeYLift * 2 - Math.sin(t * 1.8) * 0.03
    }
    if (browRRef.current) {
      browRRef.current.position.y =
        browBaseY + Math.sin(t * 2.6 + 0.7) * 0.025 + browJoyLift
      browRRef.current.rotation.z = 0.18 + eyeYLift * 2 + Math.sin(t * 1.8 + 0.4) * 0.03
    }

    // Iris glow pulses extra during a squint AND when scrolling fast.
    const squintGlow =
      squintPhase.current > 0
        ? Math.sin((1 - squintPhase.current / SQUINT_DURATION) * Math.PI) * 0.7
        : 0
    mats.iris.emissiveIntensity = 0.4 + squintGlow + Math.sin(t * 3.4) * 0.08

  })

  return (
    <group ref={rootRef} position={[3.4, 0.1, 0]}>
      {/* Body — slightly squashed sphere */}
      <group ref={bodyRef}>
        <mesh material={mats.body} scale={[1.15, 1.05, 1.1]}>
          <sphereGeometry args={[1.5, 64, 48]} />
        </mesh>
      </group>

      {/* Brows — arched tubes above each eye, tilted up at the outer end for joy */}
      <group
        ref={browLRef}
        position={[-0.55, 0.72, 1.38]}
        rotation={[0, 0, -0.18]}
        scale={[0.95, 1, 0.6]}
      >
        <mesh geometry={browGeo} material={mats.brow} />
      </group>
      <group
        ref={browRRef}
        position={[0.55, 0.72, 1.38]}
        rotation={[0, 0, 0.18]}
        scale={[0.95, 1, 0.6]}
      >
        <mesh geometry={browGeo} material={mats.brow} />
      </group>

      {/* Cheek blushes — soft translucent spots under each eye */}
      <mesh material={mats.cheek} position={[-0.85, -0.2, 1.25]} scale={[1, 0.7, 0.35]}>
        <sphereGeometry args={[0.22, 24, 20]} />
      </mesh>
      <mesh material={mats.cheek} position={[0.85, -0.2, 1.25]} scale={[1, 0.7, 0.35]}>
        <sphereGeometry args={[0.22, 24, 20]} />
      </mesh>

      {/* Eyes: big cyan iris with rim + small black pupil + tiny white shine */}
      <group ref={eyeLRef} position={[-0.55, 0.22, 1.4]}>
        <mesh material={mats.irisRim} scale={[1.02, 1.02, 0.4]}>
          <sphereGeometry args={[0.34, 32, 24]} />
        </mesh>
        <mesh material={mats.iris} position={[0, 0, 0.02]}>
          <sphereGeometry args={[0.32, 32, 24]} />
        </mesh>
        <group ref={pupilLRef}>
          <mesh material={mats.pupil} position={[0, 0, 0.3]}>
            <sphereGeometry args={[0.12, 24, 20]} />
          </mesh>
          <mesh
            ref={shineLRef}
            material={mats.shine}
            position={[-0.06, 0.07, 0.4]}
          >
            <sphereGeometry args={[0.04, 16, 12]} />
          </mesh>
        </group>
      </group>
      <group ref={eyeRRef} position={[0.55, 0.22, 1.4]}>
        <mesh material={mats.irisRim} scale={[1.02, 1.02, 0.4]}>
          <sphereGeometry args={[0.34, 32, 24]} />
        </mesh>
        <mesh material={mats.iris} position={[0, 0, 0.02]}>
          <sphereGeometry args={[0.32, 32, 24]} />
        </mesh>
        <group ref={pupilRRef}>
          <mesh material={mats.pupil} position={[0, 0, 0.3]}>
            <sphereGeometry args={[0.12, 24, 20]} />
          </mesh>
          <mesh
            ref={shineRRef}
            material={mats.shine}
            position={[-0.06, 0.07, 0.4]}
          >
            <sphereGeometry args={[0.04, 16, 12]} />
          </mesh>
        </group>
      </group>

      {/* Antennae (stem + bulb) */}
      <group ref={antennaLRef} position={[-0.4, 1.45, 0.1]}>
        <mesh material={mats.bodyDark} position={[0, 0.45, 0]}>
          <cylinderGeometry args={[0.055, 0.055, 0.9, 16]} />
        </mesh>
        <mesh material={mats.body} position={[0, 0.95, 0]}>
          <sphereGeometry args={[0.16, 24, 20]} />
        </mesh>
      </group>
      <group ref={antennaRRef} position={[0.4, 1.45, 0.1]}>
        <mesh material={mats.bodyDark} position={[0, 0.45, 0]}>
          <cylinderGeometry args={[0.055, 0.055, 0.9, 16]} />
        </mesh>
        <mesh material={mats.body} position={[0, 0.95, 0]}>
          <sphereGeometry args={[0.16, 24, 20]} />
        </mesh>
      </group>

      {/* Side nubs / little arms — wiggle */}
      <mesh
        ref={nubLRef}
        material={mats.body}
        position={[-1.55, -0.1, 0]}
        scale={[0.85, 0.75, 0.85]}
      >
        <sphereGeometry args={[0.58, 32, 24]} />
      </mesh>
      <mesh
        ref={nubRRef}
        material={mats.body}
        position={[1.55, -0.1, 0]}
        scale={[0.85, 0.75, 0.85]}
      >
        <sphereGeometry args={[0.58, 32, 24]} />
      </mesh>

      {/* Legs */}
      <mesh material={mats.body} position={[-0.45, -1.55, 0.2]}>
        <capsuleGeometry args={[0.13, 0.35, 8, 16]} />
      </mesh>
      <mesh material={mats.body} position={[0.45, -1.55, 0.2]}>
        <capsuleGeometry args={[0.13, 0.35, 8, 16]} />
      </mesh>
    </group>
  )
}

export function CoreCanvas() {
  const { progress, reducedMotion } = useScroll()
  const progressRef = useRef(progress)

  useEffect(() => {
    progressRef.current = progress
  }, [progress])

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0"
      style={{ willChange: "transform" }}
    >
      <Canvas
        camera={{ position: [0, 0, 8], fov: 38 }}
        dpr={[1, 1.75]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        frameloop={reducedMotion ? "demand" : "always"}
      >
        <ambientLight intensity={0.6} />
        <hemisphereLight args={["#fff0e0", "#1a0f0a", 0.5]} />
        <directionalLight position={[4, 5, 6]} intensity={1.4} color="#fff1d8" />
        <pointLight
          position={[-4, -2, 4]}
          intensity={0.9}
          color="#ffa36b"
          distance={18}
          decay={2}
        />
        <OpenClawMascot progressRef={progressRef} />
      </Canvas>
    </div>
  )
}
