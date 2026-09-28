import { motion } from 'framer-motion'
import { fadeUp, inViewOnce, stagger } from '../../animations/variants'
import { DRESS_CODE_PALETTE } from '../../config/event'
import { Section } from '../ui/Section'
import { SectionHeading } from '../ui/SectionHeading'

/** Capítulo IV · Dress code con la paleta en forma de arcos. */
export function DressCode() {
  return (
    <Section id="dress-code" labelledBy="dress-title">
      <SectionHeading id="dress-title" chapter="IV" eyebrow="Dress Code" title={<>Colores <em className="text-terracotta">tierra</em></>}>
        Tonos cálidos y naturales para que todos luzcamos en armonía en las fotos del gran día.
      </SectionHeading>

      <motion.ul
        variants={stagger(0.08)}
        initial="hidden"
        whileInView="visible"
        viewport={inViewOnce}
        className="mx-auto grid max-w-3xl grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-4 sm:gap-x-6"
        aria-label="Paleta de colores sugerida"
      >
        {DRESS_CODE_PALETTE.map((color) => (
          <motion.li key={color.name} variants={fadeUp} className="group flex flex-col items-center">
            <motion.div
              whileHover={{ y: -10 }}
              transition={{ type: 'spring', stiffness: 300, damping: 18 }}
              className="relative aspect-[3/4] w-full max-w-[8.5rem] overflow-hidden rounded-t-full border border-espresso/10 shadow-[0_18px_40px_-22px_rgba(59,42,34,0.6)]"
              style={{ backgroundColor: color.hex }}
            >
              {/* Brillo tipo tela */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/25 via-transparent to-black/10" />
            </motion.div>
            <p className="mt-3 font-display text-lg text-espresso sm:text-xl">{color.name}</p>
          </motion.li>
        ))}
      </motion.ul>

      <motion.blockquote
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={inViewOnce}
        transition={{ duration: 0.9 }}
        className="mx-auto mt-16 max-w-2xl text-center"
      >
        <p className="font-display text-2xl leading-snug text-pretty text-cocoa italic sm:text-3xl">
          “Ven con tu mejor look en tonos tierra y prepárate para descubrir la gran sorpresa.”
        </p>
      </motion.blockquote>
    </Section>
  )
}
