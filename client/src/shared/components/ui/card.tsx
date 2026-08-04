import { forwardRef } from 'react'
import { cn } from '@/shared/utils/cn'
import { motion, HTMLMotionProps } from 'framer-motion'

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
  default:  'bg-white border border-[var(--border)] shadow-sm',
  glass:    'bg-white/90 backdrop-blur-md border border-[var(--border)]',
  elevated: 'bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-[var(--border)]',
  flat:     'bg-[#F8FAFC]',
  bordered: 'bg-transparent border-2 border-[var(--border)]',
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
    
    const baseClasses = cn(
      'rounded-[24px] overflow-hidden',
      'transition-all duration-[120ms] ease-out',
      variantStyles[variant],
      !noPadding && (compact ? 'p-5' : 'p-8'),
      hoverable && 'hover:shadow-lg hover:-translate-y-1 hover:border-[var(--primary)]',
      clickable && 'cursor-pointer select-none',
      className,
    )

    if (clickable) {
      return (
        <motion.div
          ref={ref as any}
          className={baseClasses}
          whileTap={{ scale: 0.98 }}
          transition={{ duration: 0.12 }}
          {...(props as unknown as HTMLMotionProps<"div">)}
        >
          {children}
        </motion.div>
      )
    }

    return (
      <div
        ref={ref}
        className={baseClasses}
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
      className={cn('flex items-start justify-between gap-4 mb-6', className)}
      {...props}
    >
      <div className="flex-1 min-w-0">
        {title && (
          <h3 className="text-[18px] font-display font-bold text-[var(--heading)] truncate">
            {title}
          </h3>
        )}
        {subtitle && (
          <p className="text-[14px] font-medium text-[var(--body)] mt-1">{subtitle}</p>
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
    <div ref={ref} className={cn('text-[var(--body)]', className)} {...props}>
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
        'flex items-center gap-3 mt-6',
        bordered && 'pt-6 border-t border-[var(--border)]',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  ),
)
CardFooter.displayName = 'CardFooter'
