import { googleCalendarUrl } from '../../../lib/calendar'
import { Button } from '../../ui/Button'
import { Icon } from '../../ui/Icon'

/** Botón para guardar el evento en Google Calendar. */
export function CalendarActions() {
  return (
    <div className="mt-8">
      <Button href={googleCalendarUrl()} target="_blank" rel="noopener noreferrer" className="w-full">
        <Icon name="calendar" />
        Agregar a Google Calendar
      </Button>
    </div>
  )
}
