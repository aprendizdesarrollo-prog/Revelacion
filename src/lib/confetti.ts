import confetti from 'canvas-confetti'

const base = { disableForReducedMotion: true, ticks: 220, scalar: 0.9 } as const

/** Ráfaga corta desde un elemento (botón, tarjeta). */
export function burstFrom(element: HTMLElement | null, colors: string[]) {
  const rect = element?.getBoundingClientRect()
  const origin = rect
    ? {
        x: (rect.left + rect.width / 2) / window.innerWidth,
        y: (rect.top + rect.height / 2) / window.innerHeight,
      }
    : { x: 0.5, y: 0.6 }
  confetti({ ...base, particleCount: 70, spread: 75, startVelocity: 32, origin, colors })
}

/** Celebración larga desde ambos lados de la pantalla. */
export function celebrate(colors: string[], durationMs = 2600) {
  const end = Date.now() + durationMs
  const frame = () => {
    confetti({ ...base, particleCount: 4, angle: 60, spread: 60, origin: { x: 0, y: 0.7 }, colors, zIndex: 200 })
    confetti({ ...base, particleCount: 4, angle: 120, spread: 60, origin: { x: 1, y: 0.7 }, colors, zIndex: 200 })
    if (Date.now() < end) requestAnimationFrame(frame)
  }
  confetti({ ...base, particleCount: 140, spread: 110, startVelocity: 45, origin: { y: 0.55 }, colors, zIndex: 200 })
  frame()
}
