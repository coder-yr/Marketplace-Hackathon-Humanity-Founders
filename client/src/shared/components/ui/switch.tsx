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
 * Toggle switch with label, description, size variants, full keyboard accessibility.
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
              'rounded-full border border-[var(--border-color)] bg-[var(--surface-3)] cursor-pointer',
              'transition-all duration-[var(--duration-normal)]',
              'peer-checked:bg-[var(--color-brand-primary)] peer-checked:border-[var(--color-brand-primary)]',
              'peer-focus-visible:ring-2 peer-focus-visible:ring-[var(--color-brand-primary)] peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-[var(--surface-1)]',
              disabled && 'opacity-50 cursor-not-allowed',
            )}
            aria-hidden="true"
          >
            {/* Thumb */}
            <div
              className={cn(
                sz.thumb,
                'rounded-full bg-[var(--text-muted)] absolute top-1/2 left-0.5 -translate-y-1/2',
                'transition-all duration-[var(--duration-normal)] shadow-sm',
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
            {label && <span className="text-sm font-medium text-[var(--text-primary)]">{label}</span>}
            {description && <span className="text-xs text-[var(--text-muted)] mt-0.5">{description}</span>}
          </label>
        )}
      </div>
    )
  },
)
Switch.displayName = 'Switch'
