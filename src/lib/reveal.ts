import { isGender, REVEAL_CONFIG, type Gender } from '../config/reveal'

export type RevealStatus =
  | { kind: 'locked' } // aún no es la hora
  | { kind: 'pending' } // ya es la hora, pero todavía no se configuró el resultado
  | { kind: 'ready'; result: Gender; rehearsal: boolean }

/** `?ensayo=nina|nino` permite probar la animación sin publicar el resultado real. */
function rehearsalResult(): Gender | null {
  const value = new URLSearchParams(window.location.search).get('ensayo')
  return isGender(value) ? value : null
}

export function getRevealStatus(now = Date.now()): RevealStatus {
  const rehearsal = rehearsalResult()
  if (rehearsal) return { kind: 'ready', result: rehearsal, rehearsal: true }
  if (now < new Date(REVEAL_CONFIG.unlocksAt).getTime()) return { kind: 'locked' }
  if (!REVEAL_CONFIG.result) return { kind: 'pending' }
  return { kind: 'ready', result: REVEAL_CONFIG.result, rehearsal: false }
}
