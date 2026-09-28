import { EVENT, HOST_WHATSAPP } from '../config/event'
import { GENDER_COPY, isGender, type Gender } from '../config/reveal'

/** Respuesta del invitado. Se envía por WhatsApp y se recuerda en este dispositivo. */
export interface RsvpAnswer {
  nombre: string
  asistencia: boolean
  prediccion: Gender
}

export function rsvpMessage(a: RsvpAnswer): string {
  const bet = GENDER_COPY[a.prediccion]
  if (!a.asistencia) {
    return [
      `¡Hola! Soy ${a.nombre}.`,
      `Lamentablemente no podré asistir a la ${EVENT.name} del ${EVENT.dateLabel}.`,
      `Mi apuesta: ${bet.label}.`,
    ].join('\n')
  }
  return [
    `¡Hola! Soy ${a.nombre} y confirmo mi asistencia a la ${EVENT.name}.`,
    `${EVENT.dateLong} · ${EVENT.timeLabel}`,
    `Mi apuesta: ${bet.label} (llevo ${bet.gift}).`,
  ].join('\n')
}

/** Abre WhatsApp (app en el celular, web en el computador) con el mensaje ya escrito. */
export const whatsappUrl = (a: RsvpAnswer) =>
  `https://wa.me/${HOST_WHATSAPP}?text=${encodeURIComponent(rsvpMessage(a))}`

const KEY = 'revelacion:mi-respuesta'

export function loadAnswer(): RsvpAnswer | null {
  try {
    const a = JSON.parse(localStorage.getItem(KEY) ?? 'null') as RsvpAnswer | null
    return a && typeof a.nombre === 'string' && isGender(a.prediccion) ? a : null
  } catch {
    return null
  }
}

export function saveAnswer(a: RsvpAnswer) {
  try {
    localStorage.setItem(KEY, JSON.stringify(a))
  } catch {
    /* sin almacenamiento */
  }
}
