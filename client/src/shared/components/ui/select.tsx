import { forwardRef, useId } from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/shared/utils/cn'

export interface SelectOption {
  value: string
  label: string
  disabled?: boolean
}

export interface SelectProps
  extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
  label?: string
  hint?: string
  error?: string
  options: SelectOption[]
  placeholder?: string
  selectSize?: 'sm' | 'md' | 'lg'
  fullWidth?: boolean
}

const sizeStyles = {
  sm: 'h-8 text-sm pl-3 pr-9',
  md: 'h-10 text-sm pl-4 pr-10',
  lg: 'h-12 text-base pl-4 pr-10',
}

/**
 * Styled native <select> with label, error, ARIA support.
 */
export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      label,
      hint,
      error,
      options,
      placeholder,
      selectSize = 'md',
      fullWidth = true,
      disabled,
      className,
      id: externalId,
      ...props
    },
    ref,
  ) => {
    const generatedId = useId()
    const id = externalId ?? generatedId
    const errorId = `${id}-error`
    const hasError = Boolean(error)

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

        <div className="relative flex items-center">
          <select
            ref={ref}
            id={id}
            disabled={disabled}
            aria-invalid={hasError}
            aria-describedby={error ? errorId : undefined}
            className={cn(
              'w-full appearance-none rounded-lg border bg-[var(--surface-2)]',
              'text-[var(--text-primary)] outline-none cursor-pointer',
              'transition-all duration-[var(--duration-fast)]',
              sizeStyles[selectSize],
              !hasError &&
                'border-[var(--border-color)] focus:border-[var(--color-brand-primary)] focus:ring-2 focus:ring-[var(--color-brand-primary)]/20',
              hasError &&
                'border-[var(--color-error)] focus:border-[var(--color-error)] focus:ring-2 focus:ring-[var(--color-error)]/20',
              disabled && 'opacity-50 cursor-not-allowed',
              className,
            )}
            {...props}
          >
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
            {options.map((opt) => (
              <option key={opt.value} value={opt.value} disabled={opt.disabled}>
                {opt.label}
              </option>
            ))}
          </select>

          <ChevronDown
            className="absolute right-3 text-[var(--text-muted)] pointer-events-none shrink-0"
            size={16}
            aria-hidden="true"
          />
        </div>

        {hint && !error && (
          <p className="text-xs text-[var(--text-muted)]">{hint}</p>
        )}
        {error && (
          <p id={errorId} role="alert" className="text-xs text-[var(--color-error)] flex items-center gap-1">
            <span aria-hidden="true">⚠</span>{error}
          </p>
        )}
      </div>
    )
  },
)
Select.displayName = 'Select'
