import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import { EASE_OUT } from '../../animations/variants'
import { EVENT } from '../../config/event'
import { EARTH_CONFETTI } from '../../config/reveal'
import { burstFrom } from '../../lib/confetti'
import { OliveBranch, WaxSeal } from '../decor/Illustrations'
import { Section } from '../ui/Section'
import { SectionHeading } from '../ui/SectionHeading'

const details = [
  { label: 'Fecha', value: EVENT.dateLong },
  { label: 'Hora', value: EVENT.timeLabel },
  { label: 'Lugar', value: EVENT.address },
  { label: 'Vestimenta', value: EVENT.dressCode },
]

/** Capítulo I · El misterio: un sobre sellado que se abre para mostrar la invitación. */
export function Invitation() {
  const [open, setOpen] = useState(false)
  const [opening, setOpening] = useState(false)

  const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (opening) return
    setOpening(true)
    burstFrom(event.currentTarget, EARTH_CONFETTI)
    window.setTimeout(() => setOpen(true), 900)
  }

  return (
    <Section id="invitacion" labelledBy="invitacion-title" className="bg-linen/60">
      <SectionHeading id="invitacion-title" chapter="I" eyebrow="El misterio" title="Hay un secreto guardado aquí">
        Algo muy especial está por descubrirse. Rompe el sello y lee la invitación.
      </SectionHeading>

      <div className="mx-auto grid max-w-xl place-items-center">
        <AnimatePresence mode="wait">
          {!open ? (
            <motion.div
              key="envelope"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              exit={{ opacity: 0, y: 40, scale: 0.96, transition: { duration: 0.45 } }}
              transition={{ duration: 0.9, ease: EASE_OUT }}
              className="relative w-full max-w-md [perspective:1200px]"
            >
              <div className="relative aspect-[4/3] w-full rounded-2xl bg-sand shadow-[0_30px_70px_-30px_rgba(59,42,34,0.55)]">
                {/* Carta asomándose */}
                <motion.div
                  animate={opening ? { y: '-38%' } : { y: '0%' }}
                  transition={{ duration: 0.7, ease: EASE_OUT, delay: 0.35 }}
                  className="absolute inset-x-6 top-4 bottom-6 rounded-xl bg-cream shadow-inner"
                >
                  <p className="px-4 pt-5 text-center font-display text-lg leading-snug text-balance text-cocoa italic">
                    Para ti, con cariño
                  </p>
                </motion.div>
                {/* Bolsillo del sobre */}
                <div
                  aria-hidden
                  className="absolute inset-0 rounded-2xl bg-beige [clip-path:polygon(0_28%,50%_64%,100%_28%,100%_100%,0_100%)]"
                />
                <div
                  aria-hidden
                  className="absolute inset-0 rounded-2xl bg-sand/70 [clip-path:polygon(0_100%,50%_58%,100%_100%)]"
                />
                {/* Solapa */}
                <motion.div
                  aria-hidden
                  animate={opening ? { rotateX: 180 } : { rotateX: 0 }}
                  transition={{ duration: 0.6, ease: 'easeInOut' }}
                  style={{ transformOrigin: 'top', zIndex: opening ? 0 : 2 }}
                  className="absolute inset-x-0 top-0 h-[64%] rounded-t-2xl bg-latte [clip-path:polygon(0_0,100%_0,50%_100%)] [backface-visibility:hidden]"
                />
                <motion.button
                  type="button"
                  onClick={handleOpen}
                  aria-label="Romper el sello y abrir la invitación"
                  animate={opening ? { scale: 0, opacity: 0 } : { scale: [1, 1.06, 1] }}
                  transition={opening ? { duration: 0.3 } : { duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
                  whileHover={{ scale: 1.1 }}
                  className="absolute top-[64%] left-1/2 z-10 h-20 w-20 -translate-x-1/2 -translate-y-1/2 rounded-full sm:h-24 sm:w-24"
                >
                  <WaxSeal className="h-full w-full drop-shadow-lg" />
                </motion.button>
              </div>
              <p className="mt-6 text-center text-sm text-cocoa">Toca el sello para abrir</p>
            </motion.div>
          ) : (
            <motion.article
              key="card"
              initial={{ opacity: 0, y: 40, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.9, ease: EASE_OUT }}
              className="relative w-full overflow-hidden rounded-t-[12rem] rounded-b-3xl border border-latte/60 bg-cream px-6 pt-16 pb-10 text-center shadow-[0_30px_70px_-30px_rgba(59,42,34,0.45)] sm:px-12 sm:pt-20"
              aria-label="Invitación"
            >
              <div aria-hidden className="pointer-events-none absolute inset-3 rounded-t-[11.3rem] rounded-b-2xl border border-latte/40" />
              <p className="eyebrow text-terracotta-deep">Estás invitado</p>
              <h3 className="mt-4 font-display text-4xl leading-tight font-medium text-balance sm:text-5xl">
                {EVENT.name}
              </h3>
              <OliveBranch className="mx-auto mt-3 w-36 text-olive" />
              <p className="mx-auto mt-5 max-w-sm leading-relaxed text-pretty text-cocoa">
                Con el corazón lleno de ilusión te invitamos a descubrir junto a nosotros si nuestro bebé será{' '}
                <em className="font-display text-xl">niña</em> o <em className="font-display text-xl">niño</em>.
              </p>
              <dl className="mx-auto mt-8 grid max-w-sm grid-cols-2 gap-x-4 gap-y-5 text-left">
                {details.map((d, i) => (
                  <motion.div
                    key={d.label}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + i * 0.1, duration: 0.6 }}
                    className="border-t border-sand pt-3"
                  >
                    <dt className="eyebrow text-[0.62rem] text-cocoa">{d.label}</dt>
                    <dd className="mt-1 font-display text-lg leading-snug break-words text-espresso">{d.value}</dd>
                  </motion.div>
                ))}
              </dl>
              <a
                href="#prediccion"
                className="mt-9 inline-flex items-center gap-2 font-display text-xl text-terracotta-deep italic hover:underline"
              >
                Ahora, dinos qué crees que será <span aria-hidden>↓</span>
              </a>
            </motion.article>
          )}
        </AnimatePresence>
      </div>
    </Section>
  )
}
