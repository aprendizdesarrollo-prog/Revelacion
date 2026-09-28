import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { EASE_OUT } from '../../../animations/variants'
import { GENDER_COPY, type Gender } from '../../../config/reveal'
import { celebrate } from '../../../lib/confetti'
import { Icon } from '../../ui/Icon'

interface Props {
  result: Gender
  rehearsal: boolean
  prediction: Gender | null
  onClose: () => void
}

const floodColor: Record<Gender, string> = {
  nina: 'radial-gradient(circle at 50% 45%, #F1DCD6 0%, #D4A5A0 55%, #9E5F5A 100%)',
  nino: 'radial-gradient(circle at 50% 45%, #DBE4EA 0%, #9DB0BD 55%, #4F6A7C 100%)',
}

/** Pantalla completa: suspenso 3·2·1 → inundación de color → confeti. */
export function RevealOverlay({ result, rehearsal, prediction, onClose }: Props) {
  const [count, setCount] = useState(3)
  const closeRef = useRef<HTMLButtonElement>(null)
  const copy = GENDER_COPY[result]
  const revealed = count === 0

  useEffect(() => {
    if (count === 0) {
      celebrate(copy.confetti, 4000)
      closeRef.current?.focus()
      return
    }
    const t = window.setTimeout(() => setCount((c) => c - 1), 1000)
    return () => window.clearTimeout(t)
  }, [count, copy.confetti])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', onKey)
    }
  }, [onClose])

  return createPortal(
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-labelledby="reveal-result"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] grid place-items-center overflow-hidden bg-ink px-4 text-center"
    >
      <AnimatePresence>
        {revealed && (
          <motion.div
            aria-hidden
            className="absolute inset-0"
            style={{ background: floodColor[result] }}
            initial={{ clipPath: 'circle(0% at 50% 50%)' }}
            animate={{ clipPath: 'circle(150% at 50% 50%)' }}
            transition={{ duration: 1.2, ease: EASE_OUT }}
          />
        )}
      </AnimatePresence>

      <div className="relative" aria-live="assertive">
        <AnimatePresence mode="wait">
          {!revealed ? (
            <motion.p
              key={count}
              initial={{ opacity: 0, scale: 1.6, filter: 'blur(8px)' }}
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              exit={{ opacity: 0, scale: 0.6 }}
              transition={{ duration: 0.5, ease: EASE_OUT }}
              className="font-display text-[clamp(5rem,min(30vw,45svh),16rem)] leading-none text-cream italic"
            >
              {count}
            </motion.p>
          ) : (
            <motion.div
              key="result"
              initial={{ opacity: 0, y: 40, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 1, ease: EASE_OUT, delay: 0.5 }}
            >
              {rehearsal && (
                <p className="eyebrow mb-6 inline-block rounded-full bg-ink/80 px-4 py-2 text-cream">Modo ensayo</p>
              )}
              <p className="eyebrow text-ink/70">Nuestro bebé es…</p>
              <h2
                id="reveal-result"
                className="mt-4 font-display text-[clamp(3rem,min(17vw,22svh),11rem)] leading-[0.95] font-medium text-ink"
              >
                {copy.reveal}
              </h2>
              <Icon name="heart" filled className="mx-auto mt-5 h-14 w-14 text-ink/80" />
              {prediction && (
                <p className="mx-auto mt-6 max-w-md font-display text-2xl text-ink/85">
                  {prediction === result ? '¡Acertaste! Tu intuición no falló.' : '¡Casi! Pero igual ganamos todos.'}
                </p>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <button
        ref={closeRef}
        type="button"
        onClick={onClose}
        className="absolute top-4 right-4 min-h-11 rounded-full bg-cream/90 px-5 py-2 text-sm font-medium text-espresso shadow-lg transition-colors hover:bg-white sm:top-6 sm:right-6"
      >
        <span className="inline-flex items-center gap-2">Cerrar <Icon name="close" className="h-4 w-4" /></span>
      </button>
    </motion.div>,
    document.body,
  )
}
