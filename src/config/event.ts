/**
 * Datos del evento. Todo lo que se muestra en la invitación, el calendario
 * y el mapa sale de aquí: cambia un dato en este archivo y se actualiza en
 * toda la página.
 */
export const EVENT = {
  name: 'Revelación de Sexo',
  theme: 'Baby Gender Reveal',

  /** Fecha/hora con zona horaria explícita (Colombia, UTC−5). */
  startsAt: '2026-10-17T17:00:00-05:00',
  endsAt: '2026-10-17T21:00:00-05:00',
  timeZone: 'America/Bogota',

  dateLabel: '17 de octubre de 2026',
  dateLong: 'Sábado 17 de octubre de 2026',
  dateShort: '17 · 10 · 2026',
  timeLabel: '5:00 PM',

  address: 'Kra 12 D # 77 A-113',
  /**
   * Texto que se envía a Google Maps. Añade la ciudad (p. ej. ", Bogotá")
   * para que el mapa ubique la dirección con precisión.
   */
  mapsQuery: 'Carrera 12D # 77A-113, Colombia',

  dressCode: 'Colores tierra',
} as const

/**
 * WhatsApp que recibe las confirmaciones: código de país + número, sin "+"
 * ni espacios (Colombia: 57 + celular, p. ej. '573001234567').
 * Si queda vacío, WhatsApp le pide al invitado elegir a quién enviarlo.
 */
export const HOST_WHATSAPP = '573002323871'

export const CALENDAR_EVENT = {
  title: 'Revelación de Sexo 👶✨',
  description: [
    '¡Acompáñanos a descubrir si nuestro bebé será niña o niño! 💛',
    '',
    'Código de vestimenta: colores tierra.',
    '',
    'Si crees que será niña: trae pañales.',
    'Si crees que será niño: trae pañitos húmedos.',
    '',
    '¡Nos vemos para descubrir juntos la gran sorpresa! 👶✨',
  ].join('\n'),
} as const

export const DRESS_CODE_PALETTE = [
  { name: 'Beige', hex: '#D8C3A5' },
  { name: 'Arena', hex: '#E2D1B9' },
  { name: 'Crema', hex: '#F3E9DA' },
  { name: 'Café', hex: '#6B4A3A' },
] as const
