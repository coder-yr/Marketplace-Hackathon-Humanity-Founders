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
  sm: 'h-10 text-[13px] pl-3 pr-9',
  md: 'h-12 text-[14px] pl-4 pr-10',
  lg: 'h-14 text-[15px] pl-5 pr-10',
}

/**
 * Enterprise Native Select
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
          <label htmlFor={id} className="text-[13px] font-bold text-[var(--heading)]">
            {label}
            {props.required && (
              <span className="ml-1 text-[var(--error)]" aria-hidden="true">*</span>
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
              'w-full appearance-none rounded-[14px] border bg-[#F7F8FA]',
              'text-[var(--heading)] font-medium outline-none cursor-pointer',
              'transition-all duration-[120ms] ease-out',
              sizeStyles[selectSize],
              !hasError &&
                'border-[var(--border)] hover:border-[#CBD5E1] focus:border-[var(--primary)] focus:bg-white focus:ring-4 focus:ring-[var(--focus-ring-color)] focus:shadow-sm',
              hasError &&
                'border-[var(--error)] focus:bg-white focus:ring-4 focus:ring-[var(--error)]/20',
              disabled && 'opacity-50 cursor-not-allowed bg-[#F1F5F9]',
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
            className="absolute right-4 text-[#94A3B8] pointer-events-none shrink-0"
            size={16}
            aria-hidden="true"
          />
        </div>

        {hint && !error && (
          <p className="text-[12px] font-medium text-[var(--body)] mt-0.5">{hint}</p>
        )}
        {error && (
          <p id={errorId} role="alert" className="text-[12px] font-bold text-[var(--error)] flex items-center gap-1 mt-0.5">
            <span aria-hidden="true">⚠</span>{error}
          </p>
        )}
      </div>
    )
  },
)
Select.displayName = 'Select'
