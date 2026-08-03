import { forwardRef, useId } from 'react'
import { cn } from '@/shared/utils/cn'

// ── Types ─────────────────────────────────────────────────────────
export type InputSize = 'sm' | 'md' | 'lg'

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'prefix' | 'suffix'> {
  label?: string
  hint?: string
  error?: string
  inputSize?: InputSize
  /** Icon or element rendered before the input text */
  prefix?: React.ReactNode
  /** Icon or element rendered after the input text */
  suffix?: React.ReactNode
  /** Full-width — default true */
  fullWidth?: boolean
  loading?: boolean
}

const sizeStyles: Record<InputSize, string> = {
  sm: 'h-8 text-sm px-3',
  md: 'h-10 text-sm px-4',
  lg: 'h-12 text-base px-4',
}

/**
 * Text input with label, hint, error, prefix/suffix support, full a11y.
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      hint,
      error,
      inputSize = 'md',
      prefix,
      suffix,
      fullWidth = true,
      loading,
      disabled,
      className,
      id: externalId,
      ...props
    },
    ref
  ) => {
    const generatedId = useId()
    const id = externalId ?? generatedId
    const errorId = `${id}-error`
    const hintId = `${id}-hint`
    const isDisabled = disabled || loading
    const hasError = Boolean(error)

    return (
      <div className={cn('flex flex-col gap-1.5', fullWidth && 'w-full')}>
        {label && (
          <label
            htmlFor={id}
            className="text-sm font-medium text-[var(--text-primary)]"
          >
            {label}
            {props.required && (
              <span className="ml-1 text-[var(--color-error)]" aria-hidden="true">
                *
              </span>
            )}
          </label>
        )}

        <div className="relative flex items-center">
          {/* Prefix */}
          {prefix && (
            <span
              className="absolute left-3 flex items-center text-[var(--text-muted)] pointer-events-none"
              aria-hidden="true"
            >
              {prefix}
            </span>
          )}

          <input
            ref={ref}
            id={id}
            disabled={isDisabled}
            aria-invalid={hasError}
            aria-describedby={
              [error && errorId, hint && hintId].filter(Boolean).join(' ') ||
              undefined
            }
            className={cn(
              // Base
              'w-full rounded-lg border bg-[var(--surface-2)] text-[var(--text-primary)]',
              'placeholder:text-[var(--text-muted)]',
              'transition-all duration-[var(--duration-fast)]',
              'outline-none',
              // Size
              sizeStyles[inputSize],
              // Prefix/suffix padding
              prefix && 'pl-10',
              suffix && 'pr-10',
              // Normal border
              !hasError &&
                'border-[var(--border-color)] focus:border-[var(--color-brand-primary)] focus:ring-2 focus:ring-[var(--color-brand-primary)]/20',
              // Error border
              hasError &&
                'border-[var(--color-error)] focus:border-[var(--color-error)] focus:ring-2 focus:ring-[var(--color-error)]/20',
              // Disabled
              isDisabled && 'opacity-50 cursor-not-allowed',
              className
            )}
            {...props}
          />

          {/* Suffix */}
          {suffix && (
            <span
              className="absolute right-3 flex items-center text-[var(--text-muted)]"
              aria-hidden="true"
            >
              {suffix}
            </span>
          )}
        </div>

        {/* Hint */}
        {hint && !error && (
          <p id={hintId} className="text-xs text-[var(--text-muted)]">
            {hint}
          </p>
        )}

        {/* Error */}
        {error && (
          <p
            id={errorId}
            role="alert"
            className="text-xs text-[var(--color-error)] flex items-center gap-1"
          >
            <span aria-hidden="true">⚠</span>
            {error}
          </p>
        )}
      </div>
    )
  }
)
Input.displayName = 'Input'
