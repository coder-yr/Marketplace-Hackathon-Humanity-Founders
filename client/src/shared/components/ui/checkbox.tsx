import { forwardRef, useId } from 'react'
import { Check } from 'lucide-react'
import { cn } from '@/shared/utils/cn'

export interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string
  description?: string
  error?: string
  indeterminate?: boolean
}

/**
 * Accessible styled checkbox with label, description, error, and indeterminate state.
 */
export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, description, error, indeterminate, disabled, className, id: externalId, ...props }, ref) => {
    const generatedId = useId()
    const id = externalId ?? generatedId
    const hasError = Boolean(error)

    return (
      <div className={cn('flex flex-col gap-1', className)}>
        <div className="flex items-start gap-3">
          <div className="relative flex items-center justify-center mt-0.5">
            <input
              ref={ref}
              type="checkbox"
              id={id}
              disabled={disabled}
              aria-invalid={hasError}
              className="sr-only peer"
              {...props}
            />
            <div
              className={cn(
                'w-4 h-4 rounded border-2 flex items-center justify-center shrink-0 cursor-pointer',
                'transition-all duration-[var(--duration-fast)]',
                'peer-focus-visible:ring-2 peer-focus-visible:ring-[var(--color-brand-primary)] peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-[var(--surface-1)]',
                hasError
                  ? 'border-[var(--color-error)]'
                  : 'border-[var(--border-color)]',
                'peer-checked:bg-[var(--color-brand-primary)] peer-checked:border-[var(--color-brand-primary)]',
                disabled && 'opacity-50 cursor-not-allowed',
              )}
              aria-hidden="true"
            >
              {indeterminate ? (
                <span className="w-2 h-0.5 bg-white rounded-full" />
              ) : (
                <Check size={10} className="text-white opacity-0 peer-checked:opacity-100" strokeWidth={3} />
              )}
            </div>
          </div>

          {(label || description) && (
            <label htmlFor={id} className={cn('flex flex-col cursor-pointer', disabled && 'cursor-not-allowed opacity-50')}>
              {label && (
                <span className="text-sm font-medium text-[var(--text-primary)]">{label}</span>
              )}
              {description && (
                <span className="text-xs text-[var(--text-muted)] mt-0.5">{description}</span>
              )}
            </label>
          )}
        </div>

        {error && (
          <p role="alert" className="text-xs text-[var(--color-error)] ml-7 flex items-center gap-1">
            <span aria-hidden="true">⚠</span>{error}
          </p>
        )}
      </div>
    )
  },
)
Checkbox.displayName = 'Checkbox'
