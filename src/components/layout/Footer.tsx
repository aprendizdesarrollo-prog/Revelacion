import { EVENT } from '../../config/event'
import { OliveBranch } from '../decor/Illustrations'

export function Footer() {
  return (
    <footer className="bg-ink px-4 py-14 text-center text-sand/80">
      <OliveBranch className="mx-auto w-32 text-olive" />
      <p className="mt-5 font-display text-2xl text-cream italic">Con amor, te esperamos</p>
      <p className="mt-2 text-sm">
        {EVENT.dateShort} · {EVENT.timeLabel} · {EVENT.address}
      </p>
      <a href="#inicio" className="mt-6 inline-block text-sm text-sand underline-offset-4 hover:text-cream hover:underline">
        Volver al inicio ↑
      </a>
    </footer>
  )
}
