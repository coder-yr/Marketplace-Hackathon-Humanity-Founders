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
 * Enterprise Textarea
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
          <label htmlFor={id} className="text-[13px] font-bold text-[var(--heading)]">
            {label}
            {props.required && (
              <span className="ml-1 text-[var(--error)]" aria-hidden="true">*</span>
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
            'w-full min-h-[100px] rounded-[14px] border bg-[#F7F8FA]',
            'text-[14px] font-medium text-[var(--heading)] placeholder:text-[#94A3B8]',
            'px-4 py-3 outline-none',
            'transition-all duration-[120ms] ease-out',
            resizeMap[resize],
            !hasError &&
              'border-[var(--border)] hover:border-[#CBD5E1] focus:border-[var(--primary)] focus:bg-white focus:ring-4 focus:ring-[var(--focus-ring-color)] focus:shadow-sm',
            hasError &&
              'border-[var(--error)] focus:bg-white focus:ring-4 focus:ring-[var(--error)]/20',
            disabled && 'opacity-50 cursor-not-allowed bg-[#F1F5F9]',
            className,
          )}
          {...props}
        />

        <div className="flex items-start justify-between gap-4 mt-0.5">
          <div>
            {hint && !error && (
              <p id={hintId} className="text-[12px] font-medium text-[var(--body)]">{hint}</p>
            )}
            {error && (
              <p id={errorId} role="alert" className="text-[12px] font-bold text-[var(--error)] flex items-center gap-1">
                <span aria-hidden="true">⚠</span>{error}
              </p>
            )}
          </div>
          {showCount && maxLength && (
            <p className={cn('text-[11px] font-bold shrink-0 ml-auto tracking-widest', charCount >= maxLength ? 'text-[var(--error)]' : 'text-[#94A3B8]')}>
              {charCount}/{maxLength}
            </p>
          )}
        </div>
      </div>
    )
  },
)
Textarea.displayName = 'Textarea'
