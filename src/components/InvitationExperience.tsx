import { useEffect, type ReactNode } from 'react'
import { usePrediction } from '../hooks/usePrediction'
import type { InvitationRecord } from '../services/db'
import { Footer } from './layout/Footer'
import { Header } from './layout/Header'
import { Countdown } from './sections/Countdown'
import { DressCode } from './sections/DressCode'
import { Hero } from './sections/Hero'
import { Invitation } from './sections/Invitation'
import { Location } from './sections/Location'
import { Mission } from './sections/Mission'
import { Prediction } from './sections/Prediction'
import { BigReveal } from './sections/reveal/BigReveal'
import type { RsvpFormProps } from './sections/rsvp/FormParts'
import { Rsvp } from './sections/rsvp/Rsvp'

interface Props {
  record: InvitationRecord
  onRecordChange: (record: InvitationRecord) => void
  renderForm: (props: RsvpFormProps) => ReactNode
}

/**
 * Narrativa completa de la invitación:
 * Llegada → Misterio → Predicción → Confirmación → Dress Code → Regalo →
 * Ubicación → Cuenta regresiva → Gran revelación.
 */
export function InvitationExperience({ record, onRecordChange, renderForm }: Props) {
  const [prediction, setPrediction] = usePrediction()
  const plural = record.cupos > 1

  // Si ya había confirmado desde otro dispositivo, recupera su apuesta guardada.
  const savedPrediction = record.rsvp?.prediccion
  useEffect(() => {
    if (savedPrediction && !prediction) setPrediction(savedPrediction)
  }, [savedPrediction, prediction, setPrediction])

  return (
    <>
      <a
        href="#confirmar"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[70] focus:rounded-full focus:bg-espresso focus:px-4 focus:py-2 focus:text-cream"
      >
        Saltar a confirmar asistencia
      </a>
      <div className="paper">
        <Header />
        <main>
          <Hero invitation={record} plural={plural} />
          <Invitation invitation={record} plural={plural} />
          <Prediction prediction={prediction} onPredict={setPrediction} />
          <Rsvp
            record={record}
            onRecordChange={onRecordChange}
            prediction={prediction}
            onPredictionChange={setPrediction}
            renderForm={renderForm}
          />
          <DressCode />
          <Mission prediction={prediction} />
          <Location />
          <Countdown />
          <BigReveal prediction={prediction} />
        </main>
        <Footer />
      </div>
    </>
  )
}
