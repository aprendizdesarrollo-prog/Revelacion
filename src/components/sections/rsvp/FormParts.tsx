import { motion } from 'framer-motion'
import { GENDER_COPY, type Gender } from '../../../config/reveal'
import { ChoicePill } from '../../ui/ChoicePill'
import { Icon } from '../../ui/Icon'

export function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null
  return (
    <motion.p id={id} initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} className="mt-2 text-sm text-terracotta-deep">
      {message}
    </motion.p>
  )
}

export function PredictionField({
  uid,
  legend,
  prediction,
  onChange,
  error,
}: {
  uid: string
  legend: string
  prediction: Gender | null
  onChange: (g: Gender) => void
  error?: string
}) {
  const errorId = `${uid}-prediccion-error`
  return (
    <fieldset>
      <legend className="eyebrow mb-3 text-cocoa">{legend}</legend>
      <div className="grid grid-cols-2 gap-3" id={`${uid}-prediccion`} tabIndex={-1}>
        {(Object.keys(GENDER_COPY) as Gender[]).map((g) => (
          <ChoicePill
            key={g}
            name={`${uid}-pred`}
            value={g}
            checked={prediction === g}
            onChange={() => onChange(g)}
            describedBy={error ? errorId : undefined}
          >
            <Icon name="heart" filled className={`mr-2 h-4 w-4 ${g === 'nina' ? 'text-blush' : 'text-mist'}`} />
            {GENDER_COPY[g].label}
          </ChoicePill>
        ))}
      </div>
      <FieldError id={errorId} message={error} />
    </fieldset>
  )
}

/** Mueve el foco al primer campo con error. */
export function focusFirstError(uid: string, errors: Record<string, string | undefined>) {
  const first = Object.keys(errors).find((k) => errors[k])
  if (first) document.getElementById(`${uid}-${first}`)?.focus()
}
