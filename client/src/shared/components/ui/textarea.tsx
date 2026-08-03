import { forwardRef, useId } from 'react'
import { cn } from '@/shared/utils/cn'

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  hint?: string
  error?: string
  /** Show character count (requires maxLength) */
  showCount?: boolean
  fullWidth?: boolean
  resize?: 'none' | 'vertical' | 'horizontal' | 'both'
}

/**
 * Styled textarea with label, error, hint, and optional character count.
 */
export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      label,
      hint,
      error,
      showCount,
      fullWidth = true,
      resize = 'vertical',
      disabled,
      className,
      id: externalId,
      maxLength,
      value,
      ...props
    },
    ref,
  ) => {
    const generatedId = useId()
    const id = externalId ?? generatedId
    const errorId = `${id}-error`
    const hintId = `${id}-hint`
    const hasError = Boolean(error)
    const charCount = typeof value === 'string' ? value.length : 0

    const resizeMap = {
      none: 'resize-none',
      vertical: 'resize-y',
      horizontal: 'resize-x',
      both: 'resize',
    }

    return (
      <div className={cn('flex flex-col gap-1.5', fullWidth && 'w-full')}>
        {label && (
          <label htmlFor={id} className="text-sm font-medium text-[var(--text-primary)]">
            {label}
            {props.required && (
              <span className="ml-1 text-[var(--color-error)]" aria-hidden="true">*</span>
            )}
          </label>
        )}

        <textarea
          ref={ref}
          id={id}
          disabled={disabled}
          maxLength={maxLength}
          value={value}
          aria-invalid={hasError}
          aria-describedby={
            [error && errorId, hint && hintId].filter(Boolean).join(' ') || undefined
          }
          className={cn(
            'w-full min-h-[100px] rounded-lg border bg-[var(--surface-2)]',
            'text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)]',
            'px-4 py-3 outline-none',
            'transition-all duration-[var(--duration-fast)]',
            resizeMap[resize],
            !hasError &&
              'border-[var(--border-color)] focus:border-[var(--color-brand-primary)] focus:ring-2 focus:ring-[var(--color-brand-primary)]/20',
            hasError &&
              'border-[var(--color-error)] focus:border-[var(--color-error)] focus:ring-2 focus:ring-[var(--color-error)]/20',
            disabled && 'opacity-50 cursor-not-allowed',
            className,
          )}
          {...props}
        />

        <div className="flex items-start justify-between gap-4">
          <div>
            {hint && !error && (
              <p id={hintId} className="text-xs text-[var(--text-muted)]">{hint}</p>
            )}
            {error && (
              <p id={errorId} role="alert" className="text-xs text-[var(--color-error)] flex items-center gap-1">
                <span aria-hidden="true">⚠</span>{error}
              </p>
            )}
          </div>
          {showCount && maxLength && (
            <p className={cn('text-xs shrink-0 ml-auto', charCount >= maxLength ? 'text-[var(--color-error)]' : 'text-[var(--text-muted)]')}>
              {charCount}/{maxLength}
            </p>
          )}
        </div>
      </div>
    )
  },
)
Textarea.displayName = 'Textarea'
