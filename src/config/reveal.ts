import { EVENT } from './event'

export type Gender = 'nina' | 'nino'

export const isGender = (value: unknown): value is Gender => value === 'nina' || value === 'nino'

/**
 * Gran revelación. Deja `result` en null hasta el día del evento y cámbialo
 * a 'nina' o 'nino' justo antes de revelar (el valor queda dentro de la página
 * publicada, así que no lo pongas antes). `unlocksAt` es desde cuándo funciona
 * el botón "Descubrir". Para ensayar la animación: ?ensayo=nina o ?ensayo=nino.
 */
export const REVEAL_CONFIG: { result: Gender | null; unlocksAt: string } = {
  result: null,
  unlocksAt: EVENT.startsAt,
}

export const GENDER_COPY: Record<
  Gender,
  {
    label: string
    guess: string
    betMessage: string
    reveal: string
    gift: string
    confetti: string[]
  }
> = {
  nina: {
    label: 'Niña',
    guess: 'Creo que es niña',
    betMessage: '¡Apostaste por niña! Ahora solo queda esperar al gran momento.',
    reveal: '¡Es niña!',
    gift: 'pañales',
    confetti: ['#D4A5A0', '#E8C4BE', '#B87B76', '#F3E9DA', '#C9A27E'],
  },
  nino: {
    label: 'Niño',
    guess: 'Creo que es niño',
    betMessage: '¡Apostaste por niño! El 17 de octubre descubriremos si acertaste.',
    reveal: '¡Es niño!',
    gift: 'pañitos húmedos',
    confetti: ['#9DB0BD', '#C3D0D8', '#6E8798', '#F3E9DA', '#C9A27E'],
  },
}

export const EARTH_CONFETTI = ['#B8653F', '#D8C3A5', '#7D8461', '#C4A484', '#F3E9DA', '#6B4A3A']
