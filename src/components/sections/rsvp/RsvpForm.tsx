import { useId, useState, type FormEvent } from 'react'
import type { Gender } from '../../../config/reveal'
import type { RsvpAnswer } from '../../../lib/whatsapp'
import { Button } from '../../ui/Button'
import { ChoicePill } from '../../ui/ChoicePill'
import { Icon } from '../../ui/Icon'
import { FieldError, focusFirstError, PredictionField } from './FormParts'

interface Props {
  initial: RsvpAnswer | null
  prediction: Gender | null
  onPredictionChange: (gender: Gender) => void
  onSubmit: (answer: RsvpAnswer) => void
}

type Errors = { nombre?: string; asistencia?: string; prediccion?: string }

const inputClass =
  'w-full border-0 border-b-2 border-sand bg-transparent px-1 py-3 font-display text-2xl text-espresso transition-colors placeholder:text-latte focus:border-terracotta focus:outline-none'

export function RsvpForm({ initial, prediction, onPredictionChange, onSubmit }: Props) {
  const uid = useId()
  const [nombre, setNombre] = useState(initial?.nombre ?? '')
  const [asistencia, setAsistencia] = useState<boolean | null>(initial?.asistencia ?? null)
  const [errors, setErrors] = useState<Errors>({})

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    const found: Errors = {
      nombre: nombre.trim().length < 3 ? 'Escribe tu nombre completo.' : undefined,
      asistencia: asistencia === null ? 'Cuéntanos si podrás acompañarnos.' : undefined,
      prediccion: prediction ? undefined : 'Elige tu predicción: niña o niño.',
    }
    setErrors(found)
    if (found.nombre || found.asistencia || found.prediccion) return focusFirstError(uid, found)

    onSubmit({
      nombre: nombre.trim(),
      asistencia: asistencia!,
      prediccion: prediction!,
    })
  }

  const errorId = (field: keyof Errors) => (errors[field] ? `${uid}-${field}-error` : undefined)

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-8">
      <div>
        <label htmlFor={`${uid}-nombre`} className="eyebrow mb-3 block text-cocoa">
          Nombre completo
        </label>
        <input
          id={`${uid}-nombre`}
          type="text"
          autoComplete="name"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          aria-invalid={!!errors.nombre}
          aria-describedby={errorId('nombre')}
          placeholder="Tu nombre"
          className={inputClass}
        />
        <FieldError id={`${uid}-nombre-error`} message={errors.nombre} />
      </div>

      <fieldset>
        <legend className="eyebrow mb-3 text-cocoa">¿Nos acompañas?</legend>
        <div className="grid grid-cols-2 gap-3" id={`${uid}-asistencia`} tabIndex={-1}>
          <ChoicePill name={`${uid}-att`} value="si" checked={asistencia === true} onChange={() => setAsistencia(true)} describedBy={errorId('asistencia')}>
            ¡Sí, allí estaré!
          </ChoicePill>
          <ChoicePill name={`${uid}-att`} value="no" checked={asistencia === false} onChange={() => setAsistencia(false)} describedBy={errorId('asistencia')}>
            No podré ir
          </ChoicePill>
        </div>
        <FieldError id={`${uid}-asistencia-error`} message={errors.asistencia} />
      </fieldset>

      <PredictionField
        uid={uid}
        legend="¿Qué crees que será?"
        prediction={prediction}
        onChange={onPredictionChange}
        error={errors.prediccion}
      />

      <div>
        <Button type="submit" className="w-full">
          <Icon name="send" className="h-5 w-5" />
          Confirmar por WhatsApp
        </Button>
        <p className="mt-3 text-center text-sm text-cocoa">Se abrirá WhatsApp con tu mensaje listo para enviar.</p>
      </div>
    </form>
  )
}
