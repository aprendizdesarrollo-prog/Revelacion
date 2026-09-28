import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import { fadeUp, inViewOnce, stagger } from '../../animations/variants'

interface Props {
  id: string
  chapter: string
  eyebrow: string
  title: ReactNode
  children?: ReactNode
  tone?: 'light' | 'dark'
}

/** Encabezado de capítulo: numeral romano, antetítulo, título y bajada. */
export function SectionHeading({ id, chapter, eyebrow, title, children, tone = 'light' }: Props) {
  const dark = tone === 'dark'
  return (
    <motion.header
      className="mx-auto mb-12 max-w-2xl text-center md:mb-16"
      variants={stagger(0.1)}
      initial="hidden"
      whileInView="visible"
      viewport={inViewOnce}
    >
      <motion.div variants={fadeUp} className="mb-5 flex items-center justify-center gap-4" aria-hidden>
        <span className={`h-px w-10 ${dark ? 'bg-sand/40' : 'bg-latte'}`} />
        <span className={`font-display text-lg italic ${dark ? 'text-latte' : 'text-terracotta'}`}>{chapter}</span>
        <span className={`h-px w-10 ${dark ? 'bg-sand/40' : 'bg-latte'}`} />
      </motion.div>
      <motion.p variants={fadeUp} className={`eyebrow mb-4 ${dark ? 'text-sand/80' : 'text-cocoa'}`}>
        {eyebrow}
      </motion.p>
      <motion.h2
        id={id}
        variants={fadeUp}
        className={`font-display text-[clamp(2.4rem,7vw,4.25rem)] leading-[1.02] font-medium text-balance ${
          dark ? 'text-cream' : 'text-espresso'
        }`}
      >
        {title}
      </motion.h2>
      {children && (
        <motion.p
          variants={fadeUp}
          className={`mx-auto mt-5 max-w-xl text-base leading-relaxed text-pretty md:text-lg ${
            dark ? 'text-sand/85' : 'text-cocoa'
          }`}
        >
          {children}
        </motion.p>
      )}
    </motion.header>
  )
}
