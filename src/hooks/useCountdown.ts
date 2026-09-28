import { useEffect, useState } from 'react'

export interface Countdown {
  days: number
  hours: number
  minutes: number
  seconds: number
  done: boolean
}

function compute(target: number): Countdown {
  const diff = Math.max(0, target - Date.now())
  return {
    days: Math.floor(diff / 86_400_000),
    hours: Math.floor(diff / 3_600_000) % 24,
    minutes: Math.floor(diff / 60_000) % 60,
    seconds: Math.floor(diff / 1000) % 60,
    done: diff === 0,
  }
}

export function useCountdown(targetIso: string): Countdown {
  const target = new Date(targetIso).getTime()
  const [state, setState] = useState(() => compute(target))

  useEffect(() => {
    if (state.done) return
    // Se alinea con el cambio de segundo para que todos los dígitos avancen a la vez.
    let interval: number | undefined
    const timeout = window.setTimeout(() => {
      setState(compute(target))
      interval = window.setInterval(() => setState(compute(target)), 1000)
    }, 1000 - (Date.now() % 1000))
    return () => {
      window.clearTimeout(timeout)
      window.clearInterval(interval)
    }
  }, [target, state.done])

  return state
}
