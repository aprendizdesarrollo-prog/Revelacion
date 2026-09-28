import { AnimatePresence, motion, useMotionValueEvent, useScroll, useSpring } from 'framer-motion'
import { useState } from 'react'

/** Barra superior discreta que aparece al dejar el Hero, con progreso de lectura. */
export function Header() {
  const { scrollY, scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 })
  const [shown, setShown] = useState(false)

  useMotionValueEvent(scrollY, 'change', (y) => setShown(y > window.innerHeight * 0.75))

  return (
    <AnimatePresence>
      {shown && (
        <motion.header
          initial={{ y: -80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -80, opacity: 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-x-0 top-0 z-50 border-b border-sand/70 bg-cream/85 backdrop-blur-md"
        >
          <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
            <a href="#inicio" className="font-display text-xl whitespace-nowrap text-espresso">
              <span className="text-terracotta">¿</span>Niña <span className="italic text-terracotta">o</span> Niño
              <span className="text-terracotta">?</span>
            </a>
            <nav aria-label="Accesos rápidos" className="flex items-center gap-1 sm:gap-3">
              <a href="#ubicacion" className="hidden rounded-full px-3 py-2 text-sm text-cocoa hover:text-espresso sm:inline">
                Ubicación
              </a>
              <a href="#cuenta-regresiva" className="hidden rounded-full px-3 py-2 text-sm text-cocoa hover:text-espresso md:inline">
                Cuenta regresiva
              </a>
              <a
                href="#confirmar"
                className="rounded-full bg-espresso px-4 py-2 text-sm font-medium text-cream transition-colors hover:bg-terracotta-deep"
              >
                Confirmar
              </a>
            </nav>
          </div>
          <motion.div aria-hidden style={{ scaleX: progress }} className="h-[2px] origin-left bg-terracotta" />
        </motion.header>
      )}
    </AnimatePresence>
  )
}
