import type { ReactNode } from 'react'

interface Props {
  name: string
  value: string
  checked: boolean
  onChange: () => void
  children: ReactNode
  describedBy?: string
  size?: 'md' | 'sm'
}

/** Opción tipo radio con apariencia de botón. */
export function ChoicePill({ name, value, checked, onChange, children, describedBy, size = 'md' }: Props) {
  return (
    <label
      className={`relative flex cursor-pointer items-center justify-center rounded-2xl border text-center transition-all duration-300 has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-terracotta ${
        size === 'md' ? 'min-h-14 px-4 py-3' : 'min-h-12 px-3 py-2 text-sm'
      } ${
        checked
          ? 'border-espresso bg-espresso text-cream shadow-md'
          : 'border-sand bg-white/60 text-espresso hover:border-latte hover:bg-white'
      }`}
    >
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        aria-describedby={describedBy}
        className="sr-only"
      />
      {children}
    </label>
  )
}
