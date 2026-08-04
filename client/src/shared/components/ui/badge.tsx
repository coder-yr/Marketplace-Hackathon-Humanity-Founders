import { forwardRef } from 'react'
import { X } from 'lucide-react'
import { cn } from '@/shared/utils/cn'

export type BadgeVariant = 'default' | 'primary' | 'success' | 'warning' | 'error' | 'outline'
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
  default: 'bg-[#F1F5F9] text-[var(--body)] border-transparent',
  primary: 'bg-[var(--primary)]/10 text-[var(--primary)] border-[var(--primary)]/20',
  success: 'bg-[var(--success)]/10 text-[var(--success)] border-[var(--success)]/20',
  warning: 'bg-[var(--warning)]/10 text-[var(--warning)] border-[var(--warning)]/20',
  error:   'bg-[var(--error)]/10 text-[var(--error)] border-[var(--error)]/20',
  outline: 'bg-transparent text-[var(--body)] border-[var(--border)]',
}

const dotColors: Record<BadgeVariant, string> = {
  default: 'bg-[var(--body)]',
  primary: 'bg-[var(--primary)]',
  success: 'bg-[var(--success)]',
  warning: 'bg-[var(--warning)]',
  error:   'bg-[var(--error)]',
  outline: 'bg-[var(--body)]',
}

const sizeStyles: Record<BadgeSize, string> = {
  sm: 'text-[9px] px-1.5 py-0.5 gap-1',
  md: 'text-[10px] px-2 py-0.5 gap-1.5',
  lg: 'text-[11px] px-3 py-1 gap-1.5',
}

/**
 * Enterprise Badge / Tag
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
          'inline-flex items-center font-bold uppercase tracking-widest border',
          'transition-colors duration-[120ms]',
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
            className="shrink-0 ml-0.5 rounded-full hover:opacity-70 transition-opacity focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--primary)]"
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
