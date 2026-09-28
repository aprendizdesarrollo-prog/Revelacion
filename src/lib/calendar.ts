import { CALENDAR_EVENT, EVENT } from '../config/event'

/** 2026-10-17T17:00:00-05:00 → 20261017T220000Z */
const toUtcStamp = (iso: string) =>
  new Date(iso).toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '')

/**
 * Enlace de creación de eventos de Google Calendar (sin API ni OAuth).
 * Al guardar el evento se aplican las notificaciones predeterminadas de la persona.
 */
export function googleCalendarUrl(): string {
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: CALENDAR_EVENT.title,
    dates: `${toUtcStamp(EVENT.startsAt)}/${toUtcStamp(EVENT.endsAt)}`,
    details: CALENDAR_EVENT.description,
    location: EVENT.address,
    ctz: EVENT.timeZone,
  })
  return `https://calendar.google.com/calendar/render?${params.toString()}`
}
