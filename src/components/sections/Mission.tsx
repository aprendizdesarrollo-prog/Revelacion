import { motion } from 'framer-motion'
import { fadeUp, inViewOnce, stagger } from '../../animations/variants'
import type { Gender } from '../../config/reveal'
import { DiaperIllustration, WipesIllustration } from '../decor/Illustrations'
import { Section } from '../ui/Section'
import { SectionHeading } from '../ui/SectionHeading'

const missions: Array<{
  gender: Gender
  bet: string
  title: string
  Illustration: typeof DiaperIllustration
  glow: string
  badge: string
}> = [
  {
    gender: 'nina',
    bet: 'Si crees que es niña',
    title: 'Trae pañales',
    Illustration: DiaperIllustration,
    glow: 'bg-blush/40',
    badge: 'bg-blush-deep',
  },
  {
    gender: 'nino',
    bet: 'Si crees que es niño',
    title: 'Trae pañitos húmedos',
    Illustration: WipesIllustration,
    glow: 'bg-mist/40',
    badge: 'bg-mist-deep',
  },
]

/** Capítulo V · Qué traer según la apuesta. */
export function Mission({ prediction }: { prediction: Gender | null }) {
  return (
    <Section id="mision" labelledBy="mision-title" className="bg-linen/60">
      <SectionHeading id="mision-title" chapter="V" eyebrow="¿Qué debes traer?" title="Tu apuesta viene con misión">
        Tu predicción decide tu regalo. Así, gane quien gane, el bebé sale ganando.
      </SectionHeading>

      <motion.div
        variants={stagger(0.18)}
        initial="hidden"
        whileInView="visible"
        viewport={inViewOnce}
        className="mx-auto grid max-w-4xl gap-6 md:grid-cols-2 md:gap-8"
      >
        {missions.map(({ gender, bet, title, Illustration, glow, badge }) => {
          const mine = prediction === gender
          return (
            <motion.article
              key={gender}
              variants={fadeUp}
              whileHover={{ y: -8, rotate: gender === 'nina' ? -0.8 : 0.8 }}
              transition={{ type: 'spring', stiffness: 260, damping: 20 }}
              className={`card-surface group relative overflow-hidden p-8 text-center sm:p-10 ${mine ? 'ring-2 ring-terracotta/60' : ''}`}
            >
              {mine && (
                <span className={`absolute top-5 right-5 rounded-full px-3 py-1 text-xs font-medium tracking-wide text-cream ${badge}`}>
                  Tu misión
                </span>
              )}
              <div className="relative mx-auto h-40 w-52">
                <div
                  aria-hidden
                  className={`absolute inset-6 rounded-full blur-2xl transition-transform duration-500 group-hover:scale-125 ${glow}`}
                />
                <Illustration className="relative h-full w-full animate-float" />
              </div>
              <p className="eyebrow mt-6 text-cocoa">{bet}</p>
              <h3 className="mt-3 font-display text-3xl font-medium text-espresso sm:text-4xl">{title}</h3>
            </motion.article>
          )
        })}
      </motion.div>
    </Section>
  )
}
