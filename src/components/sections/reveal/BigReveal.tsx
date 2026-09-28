import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import { EASE_OUT } from '../../../animations/variants'
import { EVENT } from '../../../config/event'
import type { Gender } from '../../../config/reveal'
import { getRevealStatus, type RevealStatus } from '../../../lib/reveal'
import { Particles } from '../../decor/Particles'
import { Button } from '../../ui/Button'
import { Icon } from '../../ui/Icon'
import { SectionHeading } from '../../ui/SectionHeading'
import { RevealOverlay } from './RevealOverlay'

type Revealing = Extract<RevealStatus, { kind: 'ready' }>

/** Capítulo VIII · La gran revelación. */
export function BigReveal({ prediction }: { prediction: Gender | null }) {
  const [message, setMessage] = useState<string | null>(null)
  const [shakeKey, setShakeKey] = useState(0)
  const [revealing, setRevealing] = useState<Revealing | null>(null)

  const discover = () => {
    const status = getRevealStatus()
    if (status.kind === 'ready') {
      setMessage(null)
      setRevealing(status)
      return
    }
    setShakeKey((k) => k + 1)
    setMessage(
      status.kind === 'locked'
        ? `Paciencia… El secreto se revelará el ${EVENT.dateLabel} a las ${EVENT.timeLabel}, cuando estemos todos juntos.`
        : '¡Ya casi! Estamos preparando la gran sorpresa… mantente atento.',
    )
  }

  return (
    <section
      id="revelacion"
      aria-labelledby="revelacion-title"
      className="relative isolate overflow-hidden bg-espresso px-4 py-28 text-cream sm:px-6 md:py-36"
    >
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="absolute top-1/2 left-1/2 h-[36rem] w-[36rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-terracotta/25 blur-3xl" />
      </div>
      <Particles density={26} />

      <div className="relative mx-auto max-w-3xl text-center">
        <SectionHeading id="revelacion-title" chapter="VIII" eyebrow="La gran pregunta..." title="¿Será niña o será niño?" tone="dark">
          Todo este misterio tiene un final feliz. Cuando llegue el momento, este botón lo cambiará todo.
        </SectionHeading>

        {/* Esfera misteriosa */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 1.1, ease: EASE_OUT }}
          className="mx-auto mb-12 grid place-items-center"
        >
          <div key={shakeKey} className={shakeKey ? 'animate-shake' : ''}>
            <div className="relative grid h-44 w-44 animate-float place-items-center rounded-full bg-[radial-gradient(circle_at_35%_30%,#E2D1B9,#C4A484_45%,#8F4A2A)] shadow-[0_30px_80px_-20px_rgba(184,101,63,0.8)] sm:h-52 sm:w-52">
              <div aria-hidden className="absolute inset-3 rounded-full border border-cream/30" />
              <span aria-hidden className="font-display text-8xl text-cream italic drop-shadow">
                ?
              </span>
            </div>
          </div>
        </motion.div>

        <Button variant="light" onClick={discover} className="px-10 text-base">
          Descubrir <Icon name="sparkle" filled className="h-4 w-4 text-terracotta" />
        </Button>

        <div aria-live="polite" className="mx-auto mt-8 min-h-16 max-w-md">
          <AnimatePresence mode="wait">
            {message && (
              <motion.p
                key={shakeKey}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="font-display text-xl leading-snug text-sand sm:text-2xl"
              >
                {message}
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </div>

      <AnimatePresence>
        {revealing && (
          <RevealOverlay
            result={revealing.result}
            rehearsal={revealing.rehearsal}
            prediction={prediction}
            onClose={() => setRevealing(null)}
          />
        )}
      </AnimatePresence>
    </section>
  )
}
