import { forwardRef } from 'react'
import { cn } from '@/shared/utils/cn'

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Visual variant */
  variant?: 'default' | 'glass' | 'elevated' | 'flat' | 'bordered'
  /** Remove internal padding */
  noPadding?: boolean
  /** Hover lift effect */
  hoverable?: boolean
  /** Make entire card clickable — adds cursor-pointer */
  clickable?: boolean
  /** Compact padding */
  compact?: boolean
}

export interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string
  subtitle?: string
  action?: React.ReactNode
}

export interface CardBodyProps extends React.HTMLAttributes<HTMLDivElement> {}
export interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  bordered?: boolean
}

const variantStyles = {
  default:  'bg-[var(--surface-1)] border border-[var(--border-color)] shadow-sm',
  glass:    'glass-panel',
  elevated: 'bg-[var(--surface-1)] shadow-lg border border-[var(--border-color-subtle)]',
  flat:     'bg-[var(--surface-2)]',
  bordered: 'bg-transparent border-2 border-[var(--border-color)]',
}

/**
 * Surface card with header/body/footer slots, multiple variants, hover effects.
 */
export const Card = forwardRef<HTMLDivElement, CardProps>(
  (
    {
      variant = 'default',
      noPadding = false,
      hoverable = false,
      clickable = false,
      compact = false,
      className,
      children,
      ...props
    },
    ref,
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          'rounded-xl overflow-hidden',
          'transition-all duration-300 ease-out',
          variantStyles[variant],
          !noPadding && (compact ? 'p-4' : 'p-6'),
          hoverable && 'hover:shadow-lg hover:-translate-y-1 hover:border-[var(--border-color-hover,var(--border-color))]',
          clickable && 'cursor-pointer select-none active:scale-[0.98]',
          className,
        )}
        {...props}
      >
        {children}
      </div>
    )
  },
)
Card.displayName = 'Card'

export const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ title, subtitle, action, className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('flex items-start justify-between gap-4 mb-4', className)}
      {...props}
    >
      <div className="flex-1 min-w-0">
        {title && (
          <h3 className="text-base font-semibold text-[var(--text-primary)] truncate">
            {title}
          </h3>
        )}
        {subtitle && (
          <p className="text-sm text-[var(--text-secondary)] mt-0.5">{subtitle}</p>
        )}
        {children}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  ),
)
CardHeader.displayName = 'CardHeader'

export const CardBody = forwardRef<HTMLDivElement, CardBodyProps>(
  ({ className, children, ...props }, ref) => (
    <div ref={ref} className={cn('text-[var(--text-secondary)]', className)} {...props}>
      {children}
    </div>
  ),
)
CardBody.displayName = 'CardBody'

export const CardFooter = forwardRef<HTMLDivElement, CardFooterProps>(
  ({ bordered = false, className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'flex items-center gap-3 mt-4',
        bordered && 'pt-4 border-t border-[var(--border-color)]',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  ),
)
CardFooter.displayName = 'CardFooter'
