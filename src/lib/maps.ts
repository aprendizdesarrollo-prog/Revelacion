import { EVENT } from '../config/event'

const query = encodeURIComponent(EVENT.mapsQuery)

/** Abre Google Maps (app en móvil, web en escritorio) con la ruta al lugar. */
export const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${query}`

