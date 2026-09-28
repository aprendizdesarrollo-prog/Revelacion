import type { ReactNode } from 'react'

interface Props {
  id: string
  labelledBy: string
  className?: string
  children: ReactNode
}

export function Section({ id, labelledBy, className = '', children }: Props) {
  return (
    <section id={id} aria-labelledby={labelledBy} className={`relative px-4 py-24 sm:px-6 md:py-32 ${className}`}>
      <div className="relative mx-auto max-w-6xl">{children}</div>
    </section>
  )
}
