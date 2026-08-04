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
  sm: 'h-10 text-[13px] px-3',
  md: 'h-12 text-[14px] px-4',
  lg: 'h-14 text-[15px] px-5',
}

/**
 * Enterprise Text Input
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
            className="text-[13px] font-bold text-[var(--heading)]"
          >
            {label}
            {props.required && (
              <span className="ml-1 text-[var(--error)]" aria-hidden="true">
                *
              </span>
            )}
          </label>
        )}

        <div className="relative flex items-center">
          {/* Prefix */}
          {prefix && (
            <span
              className="absolute left-4 flex items-center text-[#94A3B8] pointer-events-none"
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
              'w-full rounded-[14px] border bg-[#F7F8FA] text-[var(--heading)] font-medium',
              'placeholder:text-[#94A3B8]',
              'transition-all duration-[120ms] ease-out',
              'outline-none',
              // Size
              sizeStyles[inputSize],
              // Prefix/suffix padding
              prefix && 'pl-11',
              suffix && 'pr-11',
              // Normal border
              !hasError &&
                'border-[var(--border)] hover:border-[#CBD5E1] focus:border-[var(--primary)] focus:bg-white focus:ring-4 focus:ring-[var(--focus-ring-color)] focus:shadow-sm',
              // Error border
              hasError &&
                'border-[var(--error)] focus:bg-white focus:ring-4 focus:ring-[var(--error)]/20',
              // Disabled
              isDisabled && 'opacity-50 cursor-not-allowed bg-[#F1F5F9]',
              className
            )}
            {...props}
          />

          {/* Suffix */}
          {suffix && (
            <span
              className="absolute right-4 flex items-center text-[#94A3B8]"
              aria-hidden="true"
            >
              {suffix}
            </span>
          )}
        </div>

        {/* Hint */}
        {hint && !error && (
          <p id={hintId} className="text-[12px] font-medium text-[var(--body)] mt-0.5">
            {hint}
          </p>
        )}

        {/* Error */}
        {error && (
          <p
            id={errorId}
            role="alert"
            className="text-[12px] font-bold text-[var(--error)] flex items-center gap-1 mt-0.5"
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
