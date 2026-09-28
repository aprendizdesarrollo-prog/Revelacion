import { motion, type HTMLMotionProps } from 'framer-motion'
import type { ReactNode } from 'react'

type Variant = 'primary' | 'secondary' | 'ghost' | 'light'

const styles: Record<Variant, string> = {
  primary:
    'bg-terracotta text-cream shadow-[0_12px_30px_-12px_rgba(143,74,42,0.7)] hover:bg-terracotta-deep',
  secondary: 'border border-espresso/25 bg-cream/60 text-espresso backdrop-blur hover:border-espresso/60 hover:bg-cream',
  ghost: 'text-terracotta-deep underline-offset-4 hover:underline',
  light: 'bg-cream text-espresso shadow-[0_12px_30px_-12px_rgba(0,0,0,0.5)] hover:bg-white',
}

const base =
  'group relative inline-flex min-h-12 items-center justify-center gap-2 overflow-hidden rounded-full px-7 py-3 text-[0.95rem] font-medium tracking-wide transition-colors duration-300 disabled:opacity-60'

interface CommonProps {
  variant?: Variant
  className?: string
  children: ReactNode
}

type ButtonProps = CommonProps & Omit<HTMLMotionProps<'button'>, 'children'> & { href?: undefined }
type LinkProps = CommonProps & Omit<HTMLMotionProps<'a'>, 'children'> & { href: string }

const Shine = () => (
  <span
    aria-hidden
    className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/3 -skew-x-12 bg-white/25 opacity-0 transition-all duration-700 group-hover:left-[120%] group-hover:opacity-100"
  />
)

export function Button(props: ButtonProps | LinkProps) {
  const { variant = 'primary', className = '', children, ...rest } = props
  const classes = `${base} ${styles[variant]} ${className}`
  const motionProps = { whileHover: { y: -2 }, whileTap: { scale: 0.97 } }

  if ('href' in rest && rest.href) {
    return (
      <motion.a className={classes} {...motionProps} {...(rest as HTMLMotionProps<'a'>)}>
        {variant !== 'ghost' && <Shine />}
        <span className="relative inline-flex items-center gap-2">{children}</span>
      </motion.a>
    )
  }
  return (
    <motion.button type="button" className={classes} {...motionProps} {...(rest as HTMLMotionProps<'button'>)}>
      {variant !== 'ghost' && <Shine />}
      <span className="relative inline-flex items-center gap-2">{children}</span>
    </motion.button>
  )
}
