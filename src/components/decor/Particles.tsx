import { useEffect, useRef } from 'react'

interface Particle {
  x: number
  y: number
  r: number
  speed: number
  drift: number
  phase: number
  color: string
  ring: boolean
}

const COLORS = ['rgba(184,101,63,', 'rgba(196,164,132,', 'rgba(125,132,97,', 'rgba(216,195,165,']

/**
 * Partículas suaves que flotan hacia arriba. Canvas ligero: se pausa fuera
 * de pantalla o con la pestaña oculta, y queda estático con movimiento reducido.
 */
export function Particles({ density = 38 }: { density?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let width = 0
    let height = 0
    let particles: Particle[] = []
    let raf = 0
    let visible = true

    const seed = (): Particle => ({
      x: Math.random() * width,
      y: Math.random() * height,
      r: 1.5 + Math.random() * 4.5,
      speed: 0.12 + Math.random() * 0.35,
      drift: 0.3 + Math.random() * 0.8,
      phase: Math.random() * Math.PI * 2,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      ring: Math.random() < 0.25,
    })

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      width = canvas.clientWidth
      height = canvas.clientHeight
      canvas.width = width * dpr
      canvas.height = height * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      const count = Math.round(density * Math.min(1, width / 1200) + 12)
      particles = Array.from({ length: count }, seed)
    }

    const draw = (t: number) => {
      ctx.clearRect(0, 0, width, height)
      for (const p of particles) {
        if (!reduced) {
          p.y -= p.speed
          if (p.y < -10) {
            p.y = height + 10
            p.x = Math.random() * width
          }
        }
        const x = p.x + Math.sin(t / 2200 + p.phase) * 12 * p.drift
        const alpha = 0.25 + 0.2 * Math.sin(t / 1800 + p.phase)
        ctx.beginPath()
        ctx.arc(x, p.y, p.r, 0, Math.PI * 2)
        if (p.ring) {
          ctx.strokeStyle = `${p.color}${alpha + 0.15})`
          ctx.lineWidth = 1
          ctx.stroke()
        } else {
          ctx.fillStyle = `${p.color}${alpha})`
          ctx.fill()
        }
      }
    }

    const loop = (t: number) => {
      draw(t)
      if (visible && !document.hidden) raf = requestAnimationFrame(loop)
    }

    const start = () => {
      cancelAnimationFrame(raf)
      if (reduced) draw(0)
      else raf = requestAnimationFrame(loop)
    }

    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      if (visible) start()
    })
    const onVisibility = () => !document.hidden && visible && start()

    resize()
    start()
    observer.observe(canvas)
    window.addEventListener('resize', resize)
    document.addEventListener('visibilitychange', onVisibility)
    return () => {
      cancelAnimationFrame(raf)
      observer.disconnect()
      window.removeEventListener('resize', resize)
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [density])

  return <canvas ref={canvasRef} aria-hidden className="pointer-events-none absolute inset-0 h-full w-full" />
}
