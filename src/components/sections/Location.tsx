import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import { EASE_OUT } from '../../animations/variants'
import { EVENT } from '../../config/event'
import { directionsUrl } from '../../lib/maps'
import { Button } from '../ui/Button'
import { Icon } from '../ui/Icon'
import { Section } from '../ui/Section'
import { SectionHeading } from '../ui/SectionHeading'

/** Capítulo VI · Ubicación. */
export function Location() {
  const [copied, setCopied] = useState(false)

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(EVENT.address)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2200)
    } catch {
      /* portapapeles no disponible */
    }
  }

  return (
    <Section id="ubicacion" labelledBy="ubicacion-title">
      <SectionHeading id="ubicacion-title" chapter="VI" eyebrow="Ubicación" title="¿Dónde nos vemos?" />

      <div className="mx-auto max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.9, ease: EASE_OUT }}
          className="card-surface px-6 py-12 text-center sm:px-12"
        >
          <p className="eyebrow flex items-center justify-center gap-2 text-cocoa"><Icon name="pin" className="h-4 w-4 text-terracotta" /> Dirección</p>
          <address className="mt-4 font-display text-4xl leading-tight font-medium not-italic text-espresso sm:text-5xl">
            {EVENT.address}
          </address>
          <p className="mt-4 text-cocoa">
            {EVENT.dateLong} · {EVENT.timeLabel}
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Button href={directionsUrl} target="_blank" rel="noopener noreferrer">
              <Icon name="pin" />
              Cómo llegar
            </Button>
            <Button variant="secondary" onClick={copy}>
              <span className="relative grid">
                <AnimatePresence mode="popLayout" initial={false}>
                  <motion.span
                    key={copied ? 'ok' : 'copy'}
                    initial={{ y: 12, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -12, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                  >
                    {copied ? (
                      <span className="inline-flex items-center gap-2"><Icon name="check" className="h-4 w-4" /> ¡Dirección copiada!</span>
                    ) : (
                      'Copiar dirección'
                    )}
                  </motion.span>
                </AnimatePresence>
              </span>
            </Button>
          </div>
          <p className="sr-only" aria-live="polite">
            {copied ? 'Dirección copiada al portapapeles' : ''}
          </p>
        </motion.div>

      </div>
    </Section>
  )
}
