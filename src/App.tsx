import { MotionConfig } from 'framer-motion'
import { Footer } from './components/layout/Footer'
import { Header } from './components/layout/Header'
import { Countdown } from './components/sections/Countdown'
import { DressCode } from './components/sections/DressCode'
import { Hero } from './components/sections/Hero'
import { Invitation } from './components/sections/Invitation'
import { Location } from './components/sections/Location'
import { Mission } from './components/sections/Mission'
import { Prediction } from './components/sections/Prediction'
import { BigReveal } from './components/sections/reveal/BigReveal'
import { Rsvp } from './components/sections/rsvp/Rsvp'
import { usePrediction } from './hooks/usePrediction'

/**
 * Landing de la invitación:
 * Llegada → Misterio → Predicción → Confirmación (WhatsApp) → Dress Code →
 * Regalo → Ubicación → Cuenta regresiva → Gran revelación.
 */
export default function App() {
  const [prediction, setPrediction] = usePrediction()

  return (
    <MotionConfig reducedMotion="user">
      <a
        href="#confirmar"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[70] focus:rounded-full focus:bg-espresso focus:px-4 focus:py-2 focus:text-cream"
      >
        Saltar a confirmar asistencia
      </a>
      <div className="paper">
        <Header />
        <main>
          <Hero />
          <Invitation />
          <Prediction prediction={prediction} onPredict={setPrediction} />
          <Rsvp prediction={prediction} onPredictionChange={setPrediction} />
          <DressCode />
          <Mission prediction={prediction} />
          <Location />
          <Countdown />
          <BigReveal prediction={prediction} />
        </main>
        <Footer />
      </div>
    </MotionConfig>
  )
}
