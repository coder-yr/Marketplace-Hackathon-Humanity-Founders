import { forwardRef } from 'react'
import { X } from 'lucide-react'
import { cn } from '@/shared/utils/cn'

export type BadgeVariant = 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info' | 'outline'
export type BadgeSize = 'sm' | 'md' | 'lg'

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant
  size?: BadgeSize
  /** Makes it pill-shaped */
  rounded?: boolean
  /** Icon before text */
  icon?: React.ReactNode
  /** Show × close button */
  onRemove?: () => void
  /** Dot indicator instead of text */
  dot?: boolean
}

const variantStyles: Record<BadgeVariant, string> = {
  default:   'bg-[var(--surface-3)] text-[var(--text-secondary)] border-transparent',
  primary:   'bg-[var(--color-brand-primary)]/15 text-[var(--color-brand-primary)] border-[var(--color-brand-primary)]/20',
  secondary: 'bg-[var(--color-brand-secondary)]/15 text-[var(--color-brand-secondary)] border-[var(--color-brand-secondary)]/20',
  success:   'bg-[var(--color-success)]/15 text-[var(--color-success)] border-[var(--color-success)]/20',
  warning:   'bg-[var(--color-warning)]/15 text-[var(--color-warning)] border-[var(--color-warning)]/20',
  error:     'bg-[var(--color-error)]/15 text-[var(--color-error)] border-[var(--color-error)]/20',
  info:      'bg-[var(--color-info)]/15 text-[var(--color-info)] border-[var(--color-info)]/20',
  outline:   'bg-transparent text-[var(--text-secondary)] border-[var(--border-color)]',
}

const dotColors: Record<BadgeVariant, string> = {
  default:   'bg-[var(--text-muted)]',
  primary:   'bg-[var(--color-brand-primary)]',
  secondary: 'bg-[var(--color-brand-secondary)]',
  success:   'bg-[var(--color-success)]',
  warning:   'bg-[var(--color-warning)]',
  error:     'bg-[var(--color-error)]',
  info:      'bg-[var(--color-info)]',
  outline:   'bg-[var(--text-muted)]',
}

const sizeStyles: Record<BadgeSize, string> = {
  sm: 'text-xs px-1.5 py-0.5 gap-1',
  md: 'text-xs px-2 py-1 gap-1.5',
  lg: 'text-sm px-2.5 py-1 gap-1.5',
}

/**
 * Badge / tag with 8 variants, 3 sizes, dot, icon, and removable variants.
 */
export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  (
    {
      variant = 'default',
      size = 'md',
      rounded = true,
      icon,
      onRemove,
      dot,
      className,
      children,
      ...props
    },
    ref,
  ) => {
    return (
      <span
        ref={ref}
        className={cn(
          'inline-flex items-center font-medium border',
          'transition-colors duration-[var(--duration-fast)]',
          rounded ? 'rounded-full' : 'rounded-md',
          variantStyles[variant],
          sizeStyles[size],
          className,
        )}
        {...props}
      >
        {dot && (
          <span className={cn('w-1.5 h-1.5 rounded-full shrink-0', dotColors[variant])} aria-hidden="true" />
        )}
        {!dot && icon && <span className="shrink-0" aria-hidden="true">{icon}</span>}
        {!dot && children}
        {onRemove && (
          <button
            type="button"
            onClick={onRemove}
            className="shrink-0 ml-0.5 rounded-full hover:opacity-70 transition-opacity focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-current"
            aria-label="Remove"
          >
            <X size={12} strokeWidth={2.5} />
          </button>
        )}
      </span>
    )
  },
)
Badge.displayName = 'Badge'
