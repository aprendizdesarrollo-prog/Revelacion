import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { EASE_OUT } from '../../animations/variants'
import { EVENT } from '../../config/event'
import { OliveBranch } from '../decor/Illustrations'
import { Particles } from '../decor/Particles'
import { Button } from '../ui/Button'
import { Icon } from '../ui/Icon'

const words = [
  { text: '¿Niña', className: '' },
  { text: 'o', className: 'italic text-terracotta font-normal' },
  { text: 'Niño?', className: '' },
]

export function Hero() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 140])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])
  const archY = useTransform(scrollYProgress, [0, 1], [0, 60])
  const blobY = useTransform(scrollYProgress, [0, 1], [0, -120])

  return (
    <section
      id="inicio"
      ref={ref}
      aria-labelledby="hero-title"
      className="relative isolate flex min-h-svh items-center justify-center overflow-hidden px-4 pt-20 pb-28 sm:px-6"
    >
      {/* Fondo: degradados cálidos con parallax */}
      <motion.div aria-hidden style={{ y: blobY }} className="absolute inset-0 -z-10">
        <div className="absolute -top-40 -left-32 h-[28rem] w-[28rem] rounded-full bg-sand/70 blur-3xl" />
        <div className="absolute top-1/3 -right-40 h-[26rem] w-[26rem] rounded-full bg-terracotta/15 blur-3xl" />
        <div className="absolute -bottom-40 left-1/4 h-[22rem] w-[22rem] rounded-full bg-olive/15 blur-3xl" />
      </motion.div>
      <Particles />

      {/* Arco decorativo */}
      <motion.div
        aria-hidden
        style={{ y: archY }}
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.6, ease: EASE_OUT }}
        className="absolute top-1/2 left-1/2 -z-10 h-[min(94svh,820px)] w-[min(86vw,580px)] md:top-[53%] -translate-x-1/2 -translate-y-1/2 rounded-t-full border border-latte/60"
      >
        <div className="absolute inset-3 rounded-t-full border border-latte/30 sm:inset-5" />
      </motion.div>

      <motion.div style={{ y: contentY, opacity: contentOpacity }} className="relative max-w-3xl text-center">
        <motion.p
          initial={{ opacity: 0, letterSpacing: '0.6em' }}
          animate={{ opacity: 1, letterSpacing: '0.32em' }}
          transition={{ duration: 1.4, ease: EASE_OUT, delay: 0.2 }}
          className="eyebrow mb-6 text-cocoa"
        >
          {EVENT.theme}
        </motion.p>

        <h1
          id="hero-title"
          className="font-display text-[clamp(3.6rem,15vw,8.5rem)] leading-[0.95] font-medium tracking-tight text-espresso"
        >
          <span className="sr-only">¿Niña o Niño?</span>
          <span aria-hidden className="mx-auto flex flex-wrap items-baseline justify-center gap-x-[0.22em] md:max-w-[4.6em]">
            {words.map((word, i) => (
              <span key={word.text} className="inline-block overflow-hidden pb-[0.08em]">
                <motion.span
                  className={`inline-block ${word.className}`}
                  initial={{ y: '105%', opacity: 0 }}
                  animate={{ y: '0%', opacity: 1 }}
                  transition={{ duration: 1.1, ease: EASE_OUT, delay: 0.45 + i * 0.16 }}
                >
                  {word.text}
                </motion.span>
              </span>
            ))}
          </span>
        </h1>

        <motion.div
          aria-hidden
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 1.2, ease: EASE_OUT, delay: 1.1 }}
          className="mx-auto mt-4 w-44 text-olive sm:w-56"
        >
          <OliveBranch />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: EASE_OUT, delay: 1.25 }}
          className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-pretty text-cocoa sm:text-xl"
        >
          Un pequeño milagro viene en camino y queremos que estés con nosotros el día en que descubramos quién es.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: EASE_OUT, delay: 1.4 }}
          className="mt-8 flex flex-col items-center justify-center gap-x-4 gap-y-1 font-display text-2xl text-espresso sm:flex-row sm:text-3xl"
        >
          <time dateTime={EVENT.startsAt}>{EVENT.dateLong}</time>
          <Icon name="sparkle" filled className="hidden h-5 w-5 text-terracotta sm:inline-block" />
          <span>{EVENT.timeLabel}</span>
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: EASE_OUT, delay: 1.6 }}
          className="mt-10 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center"
        >
          <Button href="#confirmar">Confirmar asistencia</Button>
          <Button href="#invitacion" variant="secondary">
            Ver invitación
          </Button>
        </motion.div>
      </motion.div>

      <motion.a
        href="#invitacion"
        aria-label="Bajar a la invitación"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 1 }}
        className="absolute bottom-6 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-cocoa/80"
      >
        <span className="eyebrow text-[0.62rem]">Desliza</span>
        <span className="relative h-10 w-px overflow-hidden bg-latte/50">
          <motion.span
            className="absolute inset-x-0 top-0 h-4 bg-terracotta"
            animate={{ y: [-16, 40] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          />
        </span>
      </motion.a>
    </section>
  )
}
