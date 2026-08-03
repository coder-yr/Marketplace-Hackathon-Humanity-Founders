import { forwardRef, useId } from 'react'
import { Search, X } from 'lucide-react'
import { cn } from '@/shared/utils/cn'
import { Spinner } from '@/shared/components/feedback/spinner'

export interface SearchInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  inputSize?: 'sm' | 'md' | 'lg'
  /** Show spinner while results load */
  loading?: boolean
  /** Clear button handler */
  onClear?: () => void
  /** Show clear button when there's a value */
  clearable?: boolean
  value?: string
  fullWidth?: boolean
  containerClassName?: string
}

const sizeStyles = {
  sm: 'h-8 text-sm pl-9 pr-3',
  md: 'h-10 text-sm pl-10 pr-3',
  lg: 'h-12 text-base pl-12 pr-3',
}

const iconSizes = { sm: 14, md: 16, lg: 18 }

/**
 * Search input with magnifier icon, clear button, and loading spinner.
 */
export const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(
  (
    {
      inputSize = 'md',
      loading,
      onClear,
      clearable = true,
      value,
      fullWidth = true,
      containerClassName,
      disabled,
      className,
      ...props
    },
    ref,
  ) => {
    const id = useId()
    const hasValue = Boolean(value)
    const iconSize = iconSizes[inputSize]

    return (
      <div className={cn('relative flex items-center', fullWidth && 'w-full', containerClassName)}>
        {/* Search icon or spinner */}
        <span className="absolute left-3 flex items-center text-[var(--text-muted)] pointer-events-none z-10">
          {loading ? (
            <Spinner size="xs" variant="muted" />
          ) : (
            <Search size={iconSize} aria-hidden="true" />
          )}
        </span>

        <input
          ref={ref}
          id={id}
          role="searchbox"
          type="search"
          value={value}
          disabled={disabled}
          className={cn(
            'w-full rounded-lg border bg-[var(--surface-2)]',
            'text-[var(--text-primary)] placeholder:text-[var(--text-muted)]',
            'outline-none transition-all duration-[var(--duration-fast)]',
            'border-[var(--border-color)]',
            'focus:border-[var(--color-brand-primary)] focus:ring-2 focus:ring-[var(--color-brand-primary)]/20',
            sizeStyles[inputSize],
            // Extra right padding for clear button
            clearable && hasValue && 'pr-9',
            disabled && 'opacity-50 cursor-not-allowed',
            // Hide default browser clear button
            '[&::-webkit-search-cancel-button]:hidden',
            className,
          )}
          {...props}
        />

        {/* Clear button */}
        {clearable && hasValue && onClear && (
          <button
            type="button"
            onClick={onClear}
            className={cn(
              'absolute right-3 flex items-center text-[var(--text-muted)]',
              'hover:text-[var(--text-primary)] transition-colors duration-[var(--duration-fast)]',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand-primary)] rounded',
            )}
            aria-label="Clear search"
          >
            <X size={iconSize} />
          </button>
        )}
      </div>
    )
  },
)
SearchInput.displayName = 'SearchInput'
