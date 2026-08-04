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
 * Enterprise Checkbox
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
                'w-[18px] h-[18px] rounded-[6px] border-2 flex items-center justify-center shrink-0 cursor-pointer bg-white',
                'transition-all duration-[120ms] ease-out',
                'peer-focus-visible:ring-4 peer-focus-visible:ring-[var(--focus-ring-color)]',
                hasError
                  ? 'border-[var(--error)]'
                  : 'border-[var(--border)] hover:border-[#CBD5E1]',
                'peer-checked:bg-[var(--primary)] peer-checked:border-[var(--primary)]',
                disabled && 'opacity-50 cursor-not-allowed bg-[#F1F5F9]',
              )}
              aria-hidden="true"
            >
              {indeterminate ? (
                <span className="w-2.5 h-[2px] bg-white rounded-full" />
              ) : (
                <Check size={12} className="text-white opacity-0 peer-checked:opacity-100" strokeWidth={3} />
              )}
            </div>
          </div>

          {(label || description) && (
            <label htmlFor={id} className={cn('flex flex-col cursor-pointer', disabled && 'cursor-not-allowed opacity-50')}>
              {label && (
                <span className="text-[14px] font-bold text-[var(--heading)]">{label}</span>
              )}
              {description && (
                <span className="text-[12px] font-medium text-[var(--body)] mt-0.5">{description}</span>
              )}
            </label>
          )}
        </div>

        {error && (
          <p role="alert" className="text-[12px] font-bold text-[var(--error)] ml-[30px] flex items-center gap-1 mt-0.5">
            <span aria-hidden="true">⚠</span>{error}
          </p>
        )}
      </div>
    )
  },
)
Checkbox.displayName = 'Checkbox'
