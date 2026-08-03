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
    'bg-gradient-to-b from-[var(--color-brand-primary-light)] to-[var(--color-brand-primary)] text-white',
    'hover:from-[var(--color-brand-primary)] hover:to-[var(--color-brand-primary-hover)]',
    'active:from-[var(--color-brand-primary-hover)] active:to-[var(--color-brand-primary-hover)]',
    'shadow-[0_4px_14px_0_rgb(37_99_235_/_39%)] hover:shadow-[0_6px_20px_rgba(37,99,235,0.23)]',
    'hover:-translate-y-0.5',
    'border border-transparent'
  ].join(' '),

  secondary: [
    'bg-[var(--surface-2)] text-[var(--text-primary)]',
    'hover:bg-[var(--surface-3)]',
    'active:bg-[var(--surface-4)]',
    'border border-[var(--border-color)]',
    'shadow-sm hover:shadow-md hover:-translate-y-px'
  ].join(' '),

  outline: [
    'bg-transparent text-[var(--color-brand-primary)]',
    'border border-[var(--color-brand-primary)]',
    'hover:bg-[var(--color-brand-primary)] hover:text-white hover:shadow-md hover:-translate-y-px',
    'active:bg-[var(--color-brand-primary-hover)]',
  ].join(' '),

  ghost: [
    'bg-transparent text-[var(--text-secondary)]',
    'hover:bg-[var(--surface-2)] hover:text-[var(--text-primary)]',
    'active:bg-[var(--surface-3)]',
  ].join(' '),

  danger: [
    'bg-gradient-to-b from-red-500 to-[var(--color-error)] text-white',
    'hover:from-[var(--color-error)] hover:to-[var(--color-error-dark)]',
    'active:from-[var(--color-error-dark)] active:to-[var(--color-error-dark)]',
    'shadow-[0_4px_14px_0_rgb(239_68_68_/_39%)] hover:shadow-[0_6px_20px_rgba(239,68,68,0.23)] hover:-translate-y-0.5',
  ].join(' '),

  success: [
    'bg-gradient-to-b from-emerald-500 to-[var(--color-success)] text-white',
    'hover:from-[var(--color-success)] hover:to-[var(--color-success-dark)]',
    'active:from-[var(--color-success-dark)] active:to-[var(--color-success-dark)]',
    'shadow-[0_4px_14px_0_rgb(16_185_129_/_39%)] hover:shadow-[0_6px_20px_rgba(16,185,129,0.23)] hover:-translate-y-0.5',
  ].join(' '),

  link: [
    'bg-transparent text-[var(--color-brand-primary)] underline-offset-4',
    'hover:underline hover:text-[var(--color-brand-primary-hover)]',
    'p-0 h-auto',
  ].join(' '),
}

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'h-8 px-3 text-sm gap-1.5 rounded-md',
  md: 'h-10 px-4 text-sm gap-2 rounded-lg',
  lg: 'h-12 px-6 text-base gap-2.5 rounded-lg',
}

const iconOnlySizeStyles: Record<ButtonSize, string> = {
  sm: 'h-8 w-8 rounded-md',
  md: 'h-10 w-10 rounded-lg',
  lg: 'h-12 w-12 rounded-lg',
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
      'inline-flex items-center justify-center font-semibold',
      'select-none whitespace-nowrap',
      'transition-all duration-[var(--duration-fast)]',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--surface-1)]',
      fullWidth && 'w-full',
      // Disabled
      isDisabled && 'opacity-50 pointer-events-none',
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
        whileTap={!isDisabled ? { scale: 0.95 } : undefined}
        transition={{ duration: 0.1, ease: 'easeOut' }}
        {...(props as object)}
      >
        {content}
      </motion.button>
    )
  }
)
Button.displayName = 'Button'
