import { useCallback, useState } from 'react'
import { isGender, type Gender } from '../config/reveal'

const KEY = 'revelacion:prediccion'

/** Apuesta del invitado, compartida entre la sección de predicción y el formulario. */
export function usePrediction() {
  const [prediction, setPredictionState] = useState<Gender | null>(() => {
    try {
      const stored = localStorage.getItem(KEY)
      return isGender(stored) ? stored : null
    } catch {
      return null
    }
  })

  const setPrediction = useCallback((value: Gender | null) => {
    setPredictionState(value)
    try {
      if (value) localStorage.setItem(KEY, value)
      else localStorage.removeItem(KEY)
    } catch {
      /* sin almacenamiento disponible */
    }
  }, [])

  return [prediction, setPrediction] as const
}
