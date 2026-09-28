import { AnimatePresence, motion } from 'framer-motion'
import { EASE_OUT, fadeUp, inViewOnce, stagger } from '../../animations/variants'
import { GENDER_COPY, type Gender } from '../../config/reveal'
import { burstFrom } from '../../lib/confetti'
import { Button } from '../ui/Button'
import { Section } from '../ui/Section'
import { SectionHeading } from '../ui/SectionHeading'

interface Props {
  prediction: Gender | null
  onPredict: (gender: Gender) => void
}

const cardTone: Record<Gender, { idle: string; active: string; ring: string; ink: string }> = {
  nina: {
    idle: 'from-blush-soft/70 to-cream',
    active: 'from-blush-soft to-blush/60',
    ring: 'ring-blush-deep',
    ink: 'text-blush-deep',
  },
  nino: {
    idle: 'from-mist-soft/70 to-cream',
    active: 'from-mist-soft to-mist/60',
    ring: 'ring-mist-deep',
    ink: 'text-mist-deep',
  },
}

function Heart({ className }: { className: string }) {
  return (
    <svg viewBox="0 0 48 44" aria-hidden className={className}>
      <path
        d="M24 42S2 29 2 14C2 7 7.5 2 14 2c4.5 0 8 2.4 10 6 2-3.6 5.5-6 10-6 6.5 0 12 5 12 12 0 15-22 28-22 28z"
        fill="currentColor"
      />
    </svg>
  )
}

/** Capítulo II · Predicción: el invitado apuesta sin que se revele nada. */
export function Prediction({ prediction, onPredict }: Props) {
  const choose = (gender: Gender, target: HTMLElement) => {
    if (prediction !== gender) burstFrom(target, GENDER_COPY[gender].confetti)
    onPredict(gender)
  }

  return (
    <Section id="prediccion" labelledBy="prediccion-title">
      <SectionHeading id="prediccion-title" chapter="II" eyebrow="Tu predicción" title="¿Qué crees que será?">
        Confía en tu intuición. Nadie sabrá la respuesta hasta el gran día… ni siquiera nosotros te daremos pistas.
      </SectionHeading>

      <motion.div
        variants={stagger(0.15)}
        initial="hidden"
        whileInView="visible"
        viewport={inViewOnce}
        className="mx-auto grid max-w-3xl gap-4 sm:grid-cols-2 sm:gap-6"
        role="group"
        aria-label="Elige tu predicción"
      >
        {(Object.keys(GENDER_COPY) as Gender[]).map((gender) => {
          const copy = GENDER_COPY[gender]
          const tone = cardTone[gender]
          const selected = prediction === gender
          const dimmed = prediction !== null && !selected
          return (
            <motion.button
              key={gender}
              type="button"
              variants={fadeUp}
              aria-pressed={selected}
              onClick={(e) => choose(gender, e.currentTarget)}
              whileHover={{ y: -6 }}
              whileTap={{ scale: 0.98 }}
              animate={{ opacity: dimmed ? 0.6 : 1, scale: selected ? 1.02 : 1 }}
              transition={{ duration: 0.4, ease: EASE_OUT }}
              className={`relative overflow-hidden rounded-[2rem] border border-sand bg-gradient-to-br p-8 text-left transition-shadow duration-300 sm:p-10 ${
                selected ? `${tone.active} shadow-xl ring-2 ${tone.ring}` : `${tone.idle} hover:shadow-lg`
              }`}
            >
              <motion.span
                className={`block ${tone.ink}`}
                animate={selected ? { scale: [1, 1.25, 1], rotate: [0, -8, 0] } : { scale: 1 }}
                transition={{ duration: 0.7 }}
              >
                <Heart className="h-10 w-10 opacity-80" />
              </motion.span>
              <span className="mt-8 block font-display text-[2rem] leading-tight font-medium text-espresso sm:text-4xl">
                {copy.guess}
              </span>
              <span className="mt-3 flex items-center gap-2 text-sm text-cocoa">
                <span
                  aria-hidden
                  className={`grid h-5 w-5 place-items-center rounded-full border ${
                    selected ? 'border-espresso bg-espresso text-cream' : 'border-cocoa/40'
                  }`}
                >
                  {selected && (
                    <svg viewBox="0 0 12 12" className="h-3 w-3">
                      <path d="M2.5 6.5 5 9l4.5-5.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                    </svg>
                  )}
                </span>
                {selected ? 'Tu apuesta' : 'Elegir esta opción'}
              </span>
              <span
                aria-hidden
                className={`pointer-events-none absolute -right-6 -bottom-10 font-display text-[9rem] leading-none italic opacity-[0.08] ${tone.ink}`}
              >
                {copy.label}
              </span>
            </motion.button>
          )
        })}
      </motion.div>

      <div aria-live="polite" className="mx-auto mt-10 min-h-[8rem] max-w-xl text-center">
        <AnimatePresence mode="wait">
          {prediction ? (
            <motion.div
              key={prediction}
              initial={{ opacity: 0, y: 16, filter: 'blur(6px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -10, filter: 'blur(6px)' }}
              transition={{ duration: 0.55, ease: EASE_OUT }}
            >
              <p className="font-display text-2xl leading-snug text-pretty text-espresso sm:text-3xl">
                {GENDER_COPY[prediction].betMessage}
              </p>
              <p className="mt-3 text-sm text-cocoa">Tu apuesta quedará registrada cuando confirmes tu asistencia.</p>
              <Button href="#confirmar" variant="ghost" className="mt-2">
                Confirmar con mi apuesta →
              </Button>
            </motion.div>
          ) : (
            <motion.p
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="pt-4 font-display text-xl text-cocoa italic"
            >
              Elige una opción… el misterio sigue intacto.
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </Section>
  )
}
