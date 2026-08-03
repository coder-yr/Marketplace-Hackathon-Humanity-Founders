import { cn } from '@/shared/utils/cn'

export type SpinnerSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'
export type SpinnerVariant = 'primary' | 'white' | 'muted'

export interface SpinnerProps {
  size?: SpinnerSize
  variant?: SpinnerVariant
  className?: string
  label?: string
}

const sizeMap: Record<SpinnerSize, string> = {
  xs: 'w-3 h-3 border-[1.5px]',
  sm: 'w-4 h-4 border-2',
  md: 'w-5 h-5 border-2',
  lg: 'w-7 h-7 border-[3px]',
  xl: 'w-9 h-9 border-4',
}

const variantMap: Record<SpinnerVariant, string> = {
  primary: 'border-[var(--color-brand-primary)]/30 border-t-[var(--color-brand-primary)]',
  white:   'border-white/30 border-t-white',
  muted:   'border-[var(--surface-4)] border-t-[var(--text-muted)]',
}

/**
 * Inline spinner for buttons and small loading areas.
 */
export function Spinner({ size = 'md', variant = 'primary', className, label = 'Loading...' }: SpinnerProps) {
  return (
    <div
      role="status"
      aria-label={label}
      className={cn(
        'rounded-full animate-spin shrink-0',
        sizeMap[size],
        variantMap[variant],
        className,
      )}
    >
      <span className="sr-only">{label}</span>
    </div>
  )
}
