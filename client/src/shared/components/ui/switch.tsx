import { forwardRef, useId } from 'react'
import { cn } from '@/shared/utils/cn'

export interface SwitchProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
  label?: string
  description?: string
  size?: 'sm' | 'md' | 'lg'
}

const sizeStyles = {
  sm: { track: 'w-8 h-4',  thumb: 'w-3 h-3',  translate: 'translate-x-4' },
  md: { track: 'w-11 h-6', thumb: 'w-5 h-5',  translate: 'translate-x-5' },
  lg: { track: 'w-14 h-7', thumb: 'w-6 h-6',  translate: 'translate-x-7' },
}

/**
 * Enterprise Toggle Switch
 */
export const Switch = forwardRef<HTMLInputElement, SwitchProps>(
  ({ label, description, size = 'md', disabled, className, id: externalId, ...props }, ref) => {
    const generatedId = useId()
    const id = externalId ?? generatedId
    const sz = sizeStyles[size]

    return (
      <div className={cn('flex items-start gap-3', className)}>
        <div className="relative shrink-0">
          <input
            ref={ref}
            type="checkbox"
            role="switch"
            id={id}
            disabled={disabled}
            className="sr-only peer"
            {...props}
          />
          {/* Track */}
          <div
            className={cn(
              sz.track,
              'rounded-full border border-[var(--border)] bg-[#F1F5F9] cursor-pointer',
              'transition-all duration-[120ms]',
              'peer-checked:bg-[var(--primary)] peer-checked:border-[var(--primary)]',
              'peer-focus-visible:ring-4 peer-focus-visible:ring-[var(--focus-ring-color)]',
              disabled && 'opacity-50 cursor-not-allowed',
            )}
            aria-hidden="true"
          >
            {/* Thumb */}
            <div
              className={cn(
                sz.thumb,
                'rounded-full bg-white absolute top-1/2 left-0.5 -translate-y-1/2',
                'transition-all duration-[120ms] shadow-sm',
                'peer-checked:bg-white peer-checked:' + sz.translate,
              )}
            />
          </div>
        </div>

        {(label || description) && (
          <label
            htmlFor={id}
            className={cn('flex flex-col cursor-pointer', disabled && 'cursor-not-allowed opacity-50')}
          >
            {label && <span className="text-[14px] font-bold text-[var(--heading)]">{label}</span>}
            {description && <span className="text-[12px] font-medium text-[var(--body)] mt-0.5">{description}</span>}
          </label>
        )}
      </div>
    )
  },
)
Switch.displayName = 'Switch'
