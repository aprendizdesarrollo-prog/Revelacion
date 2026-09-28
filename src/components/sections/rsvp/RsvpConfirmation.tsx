import { motion } from 'framer-motion'
import { useEffect, useRef } from 'react'
import { EASE_OUT, fadeUp, stagger } from '../../../animations/variants'
import { EVENT } from '../../../config/event'
import { GENDER_COPY } from '../../../config/reveal'
import { whatsappUrl, type RsvpAnswer } from '../../../lib/whatsapp'
import { Button } from '../../ui/Button'
import { Icon } from '../../ui/Icon'
import { CalendarActions } from './CalendarActions'

interface Props {
  answer: RsvpAnswer
  focusOnMount: boolean
  onEdit: () => void
}

export function RsvpConfirmation({ answer, focusOnMount, onEdit }: Props) {
  const headingRef = useRef<HTMLHeadingElement>(null)
  const firstName = answer.nombre.split(' ')[0]
  const gift = GENDER_COPY[answer.prediccion]

  // Tras enviar, lleva el foco al mensaje para lectores de pantalla.
  useEffect(() => {
    if (focusOnMount) headingRef.current?.focus({ preventScroll: true })
  }, [focusOnMount])

  return (
    <motion.div variants={stagger(0.09)} initial="hidden" animate="visible" className="text-center">
      <motion.div
        variants={{
          hidden: { scale: 0, rotate: -30 },
          visible: { scale: 1, rotate: 0, transition: { type: 'spring', stiffness: 220, damping: 14 } },
        }}
        aria-hidden
        className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-terracotta/10 text-terracotta"
      >
        <Icon name="heart" filled className="h-9 w-9" />
      </motion.div>

      <motion.h3
        ref={headingRef}
        tabIndex={-1}
        variants={fadeUp}
        className="mt-6 font-display text-[2.6rem] leading-tight font-medium text-balance focus:outline-none sm:text-6xl"
      >
        {answer.asistencia ? '¡Te esperamos!' : '¡Gracias por avisarnos!'}
      </motion.h3>
      <motion.p variants={fadeUp} className="mt-3 text-lg text-pretty text-cocoa">
        {firstName}, solo falta que presiones <strong className="font-medium text-espresso">Enviar</strong> en WhatsApp
        para que tu respuesta nos llegue.
      </motion.p>

      <motion.div variants={fadeUp} className="mt-6">
        <Button href={whatsappUrl(answer)} target="_blank" rel="noopener noreferrer" className="w-full">
          <Icon name="send" className="h-5 w-5" />
          Abrir WhatsApp de nuevo
        </Button>
      </motion.div>

      {answer.asistencia && (
        <>
          <motion.ul variants={fadeUp} className="mx-auto mt-8 max-w-sm space-y-3 rounded-2xl bg-linen/70 p-5 text-left">
            <li className="flex gap-3">
              <Icon name="calendar" className="mt-0.5 h-5 w-5 text-terracotta" />
              <span>{EVENT.dateLabel}</span>
            </li>
            <li className="flex gap-3">
              <Icon name="clock" className="mt-0.5 h-5 w-5 text-terracotta" />
              <span>{EVENT.timeLabel}</span>
            </li>
            <li className="flex gap-3">
              <Icon name="pin" className="mt-0.5 h-5 w-5 text-terracotta" />
              <span>{EVENT.address}</span>
            </li>
          </motion.ul>

          <motion.p variants={fadeUp} className="mx-auto mt-6 max-w-sm text-cocoa">
            Apostaste por <strong className="font-medium text-espresso">{gift.label.toLowerCase()}</strong> · Tu misión:
            traer {gift.gift}
          </motion.p>

          <motion.div variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.8, ease: EASE_OUT } } }}>
            <CalendarActions />
          </motion.div>
        </>
      )}

      <motion.div variants={fadeUp}>
        <Button variant="ghost" onClick={onEdit} className="mt-6 text-sm">
          Modificar mi respuesta
        </Button>
      </motion.div>
    </motion.div>
  )
}
