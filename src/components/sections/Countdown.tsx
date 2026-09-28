import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useRef } from 'react'
import { EASE_OUT, fadeUp, inViewOnce, stagger } from '../../animations/variants'
import { EVENT } from '../../config/event'
import { EARTH_CONFETTI } from '../../config/reveal'
import { useCountdown } from '../../hooks/useCountdown'
import { celebrate } from '../../lib/confetti'
import { Icon } from '../ui/Icon'
import { Section } from '../ui/Section'
import { SectionHeading } from '../ui/SectionHeading'

function Unit({ value, label }: { value: number; label: string }) {
  const text = String(value).padStart(2, '0')
  return (
    <motion.div variants={fadeUp} className="card-surface flex flex-col items-center px-2 py-6 sm:px-4 sm:py-9">
      <span className="relative flex h-[1.05em] overflow-hidden font-display text-[clamp(2.6rem,11vw,5.5rem)] leading-none font-medium lining-nums tabular-nums text-espresso">
        {text.split('').map((digit, i) => (
          <span key={i} className="relative inline-block w-[0.55em] text-center">
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.span
                key={digit}
                initial={{ y: '-100%', opacity: 0 }}
                animate={{ y: '0%', opacity: 1 }}
                exit={{ y: '100%', opacity: 0 }}
                transition={{ duration: 0.45, ease: EASE_OUT }}
                className="inline-block"
              >
                {digit}
              </motion.span>
            </AnimatePresence>
          </span>
        ))}
      </span>
      <span className="eyebrow mt-3 text-[0.62rem] text-cocoa sm:text-[0.72rem]">{label}</span>
    </motion.div>
  )
}

/** Capítulo VII · Cuenta regresiva hasta el evento. */
export function Countdown() {
  const { days, hours, minutes, seconds, done } = useCountdown(EVENT.startsAt)
  const celebrated = useRef(false)
  const wasCounting = useRef(!done)

  // Si la página está abierta justo cuando llega la hora, celebra.
  useEffect(() => {
    if (done && wasCounting.current && !celebrated.current) {
      celebrated.current = true
      celebrate(EARTH_CONFETTI)
    }
  }, [done])

  return (
    <Section id="cuenta-regresiva" labelledBy="countdown-title" className="bg-linen/60">
      <AnimatePresence mode="wait">
        {done ? (
          <motion.div
            key="done"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, ease: EASE_OUT }}
            className="py-10 text-center"
          >
            <p className="eyebrow text-terracotta-deep">Hoy es el día</p>
            <h2 id="countdown-title" className="mt-5 font-display text-[clamp(2.6rem,9vw,5.5rem)] leading-tight font-medium text-balance">
              ¡Llegó el gran momento! <Icon name="party" className="inline h-[0.8em] w-[0.8em] align-baseline text-terracotta" />
            </h2>
          </motion.div>
        ) : (
          <motion.div key="counting" exit={{ opacity: 0, y: -20 }}>
            <SectionHeading id="countdown-title" chapter="VII" eyebrow="Cuenta regresiva" title="Falta muy poco">
              {EVENT.dateLong} · {EVENT.timeLabel}
            </SectionHeading>
            <motion.div
              variants={stagger(0.1)}
              initial="hidden"
              whileInView="visible"
              viewport={inViewOnce}
              className="mx-auto grid max-w-4xl grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-5"
              role="timer"
              aria-label={`Faltan ${days} días, ${hours} horas y ${minutes} minutos`}
            >
              <Unit value={days} label="Días" />
              <Unit value={hours} label="Horas" />
              <Unit value={minutes} label="Minutos" />
              <Unit value={seconds} label="Segundos" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Section>
  )
}
