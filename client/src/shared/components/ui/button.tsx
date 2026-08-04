import { forwardRef } from 'react'
import { motion } from 'framer-motion'
import { Loader2 } from 'lucide-react'
import { cn } from '@/shared/utils/cn'

// ── Types ─────────────────────────────────────────────────────────
export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'outline'
  | 'ghost'
  | 'danger'
  | 'success'
  | 'link'

export type ButtonSize = 'sm' | 'md' | 'lg'

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  loading?: boolean
  /** Icon before label */
  leftIcon?: React.ReactNode
  /** Icon after label */
  rightIcon?: React.ReactNode
  /** Renders as icon-only button (square aspect ratio) */
  iconOnly?: boolean
  /** Full width button */
  fullWidth?: boolean
  /** Suppress press animation */
  noAnimation?: boolean
}

// ── Style maps ────────────────────────────────────────────────────
const variantStyles: Record<ButtonVariant, string> = {
  primary: [
    'bg-[var(--primary)] text-white font-bold',
    'hover:bg-[var(--primary-hover)] hover:shadow-md hover:-translate-y-px',
    'active:bg-[var(--primary-hover)]',
    'border border-transparent'
  ].join(' '),

  secondary: [
    'bg-[#F8FAFC] text-[var(--heading)] font-bold',
    'hover:bg-[#F1F5F9] hover:shadow-sm hover:-translate-y-px',
    'active:bg-[#E2E8F0]',
    'border border-[var(--border)]',
  ].join(' '),

  outline: [
    'bg-transparent text-[var(--body)] font-bold',
    'border border-[var(--border)]',
    'hover:border-[var(--primary)] hover:text-[var(--primary)] hover:bg-[#F8FAFC] hover:-translate-y-px',
    'active:bg-[#F1F5F9]',
  ].join(' '),

  ghost: [
    'bg-transparent text-[var(--body)] font-bold',
    'hover:bg-[#F8FAFC] hover:text-[var(--heading)]',
    'active:bg-[#F1F5F9]',
  ].join(' '),

  danger: [
    'bg-[var(--error)] text-white font-bold',
    'hover:bg-[#B91C1C] hover:shadow-md hover:-translate-y-px',
    'active:bg-[#991B1B]',
    'border border-transparent'
  ].join(' '),

  success: [
    'bg-[var(--success)] text-white font-bold',
    'hover:bg-[#15803D] hover:shadow-md hover:-translate-y-px',
    'active:bg-[#166534]',
    'border border-transparent'
  ].join(' '),

  link: [
    'bg-transparent text-[var(--primary)] underline-offset-4 font-bold',
    'hover:underline hover:text-[var(--primary-hover)]',
    'p-0 h-auto',
  ].join(' '),
}

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'h-8 px-4 text-[13px] gap-1.5 rounded-[10px]',
  md: 'h-10 px-5 text-[14px] gap-2 rounded-[12px]',
  lg: 'h-12 px-6 text-[15px] gap-2.5 rounded-[12px]',
}

const iconOnlySizeStyles: Record<ButtonSize, string> = {
  sm: 'h-8 w-8 rounded-[10px]',
  md: 'h-10 w-10 rounded-[12px]',
  lg: 'h-12 w-12 rounded-[12px]',
}

// ── Component ─────────────────────────────────────────────────────
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      loading = false,
      leftIcon,
      rightIcon,
      iconOnly = false,
      fullWidth = false,
      noAnimation = false,
      disabled,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || loading

    const baseStyles = cn(
      // Base
      'inline-flex items-center justify-center',
      'select-none whitespace-nowrap',
      'transition-all duration-[120ms]', // Hover animation timing
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] focus-visible:ring-offset-2',
      fullWidth && 'w-full',
      // Disabled
      isDisabled && 'opacity-50 pointer-events-none cursor-not-allowed',
      // Variant
      variantStyles[variant],
      // Size
      iconOnly ? iconOnlySizeStyles[size] : sizeStyles[size],
      // Override for link variant
      variant === 'link' && 'h-auto px-0 rounded-none',
      className
    )

    const content = (
      <>
        {loading ? (
          <Loader2
            className={cn('animate-spin', iconOnly ? '' : 'shrink-0')}
            size={size === 'sm' ? 14 : size === 'lg' ? 18 : 16}
            aria-hidden="true"
          />
        ) : leftIcon ? (
          <span className="shrink-0" aria-hidden="true">
            {leftIcon}
          </span>
        ) : null}
        {!iconOnly && children}
        {!loading && rightIcon && (
          <span className="shrink-0" aria-hidden="true">
            {rightIcon}
          </span>
        )}
      </>
    )

    if (noAnimation) {
      return (
        <button
          ref={ref}
          className={baseStyles}
          disabled={isDisabled}
          aria-disabled={isDisabled}
          aria-busy={loading}
          {...props}
        >
          {content}
        </button>
      )
    }

    return (
      <motion.button
        ref={ref}
        className={baseStyles}
        disabled={isDisabled}
        aria-disabled={isDisabled}
        aria-busy={loading}
        whileTap={!isDisabled ? { scale: 0.97 } : undefined}
        transition={{ duration: 0.08, ease: 'easeOut' }} // 80ms button press
        {...(props as object)}
      >
        {content}
      </motion.button>
    )
  }
)
Button.displayName = 'Button'
