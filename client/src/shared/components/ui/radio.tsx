import { forwardRef, useId } from 'react'
import { cn } from '@/shared/utils/cn'

export interface RadioProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string
  description?: string
}

/**
 * Accessible styled radio button with label and description.
 */
export const Radio = forwardRef<HTMLInputElement, RadioProps>(
  ({ label, description, disabled, className, id: externalId, ...props }, ref) => {
    const generatedId = useId()
    const id = externalId ?? generatedId

    return (
      <div className={cn('flex items-start gap-3', className)}>
        <div className="relative flex items-center justify-center mt-0.5">
          <input
            ref={ref}
            type="radio"
            id={id}
            disabled={disabled}
            className="sr-only peer"
            {...props}
          />
          <div
            className={cn(
              'w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 cursor-pointer',
              'transition-all duration-[var(--duration-fast)]',
              'border-[var(--border-color)]',
              'peer-focus-visible:ring-2 peer-focus-visible:ring-[var(--color-brand-primary)] peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-[var(--surface-1)]',
              'peer-checked:border-[var(--color-brand-primary)]',
              disabled && 'opacity-50 cursor-not-allowed',
            )}
            aria-hidden="true"
          >
            <div className="w-2 h-2 rounded-full bg-[var(--color-brand-primary)] scale-0 peer-checked:scale-100 transition-transform duration-[var(--duration-fast)]" />
          </div>
        </div>

        {(label || description) && (
          <label
            htmlFor={id}
            className={cn('flex flex-col cursor-pointer', disabled && 'cursor-not-allowed opacity-50')}
          >
            {label && <span className="text-sm font-medium text-[var(--text-primary)]">{label}</span>}
            {description && <span className="text-xs text-[var(--text-muted)] mt-0.5">{description}</span>}
          </label>
        )}
      </div>
    )
  },
)
Radio.displayName = 'Radio'
