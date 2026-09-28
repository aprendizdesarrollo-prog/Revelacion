import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import { EASE_OUT } from '../../../animations/variants'
import { EARTH_CONFETTI, type Gender } from '../../../config/reveal'
import { celebrate } from '../../../lib/confetti'
import { loadAnswer, saveAnswer, whatsappUrl, type RsvpAnswer } from '../../../lib/whatsapp'
import { Section } from '../../ui/Section'
import { SectionHeading } from '../../ui/SectionHeading'
import { RsvpConfirmation } from './RsvpConfirmation'
import { RsvpForm } from './RsvpForm'

interface Props {
  prediction: Gender | null
  onPredictionChange: (gender: Gender) => void
}

/** Capítulo III · Confirmación de asistencia por WhatsApp. */
export function Rsvp({ prediction, onPredictionChange }: Props) {
  const [answer, setAnswer] = useState<RsvpAnswer | null>(loadAnswer)
  const [editing, setEditing] = useState(false)
  const [justSubmitted, setJustSubmitted] = useState(false)

  const handleSubmit = (next: RsvpAnswer) => {
    // Se abre en el mismo clic para que el navegador no lo bloquee.
    window.open(whatsappUrl(next), '_blank', 'noopener')
    saveAnswer(next)
    setAnswer(next)
    setEditing(false)
    setJustSubmitted(true)
    if (next.asistencia) celebrate(EARTH_CONFETTI, 1800)
  }

  const showConfirmation = answer && !editing

  return (
    <Section id="confirmar" labelledBy="confirmar-title" className="bg-linen/60">
      <SectionHeading id="confirmar-title" chapter="III" eyebrow="Confirmación" title="¿Nos acompañas?">
        Queremos tenerte cerca en este momento tan especial. Confírmanos por WhatsApp y deja registrada tu apuesta.
      </SectionHeading>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.9, ease: EASE_OUT }}
        className="card-surface mx-auto max-w-xl p-6 sm:p-10"
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={showConfirmation ? 'done' : 'form'}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.45, ease: EASE_OUT }}
          >
            {showConfirmation ? (
              <RsvpConfirmation answer={answer} focusOnMount={justSubmitted} onEdit={() => setEditing(true)} />
            ) : (
              <RsvpForm
                initial={answer}
                prediction={prediction}
                onPredictionChange={onPredictionChange}
                onSubmit={handleSubmit}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </Section>
  )
}
