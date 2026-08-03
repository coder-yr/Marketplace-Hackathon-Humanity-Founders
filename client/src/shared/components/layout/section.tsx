import { forwardRef } from 'react'
import { cn } from '@/shared/utils/cn'

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  /** Optional heading */
  title?: string
  /** Optional subtitle */
  subtitle?: string
  /** Visual separator line above */
  bordered?: boolean
  /** Extra vertical padding */
  padded?: boolean
}

/**
 * Semantic <section> wrapper with optional title/subtitle heading.
 */
export const Section = forwardRef<HTMLElement, SectionProps>(
  ({ title, subtitle, bordered, padded = true, className, children, ...props }, ref) => {
    return (
      <section
        ref={ref}
        className={cn(
          padded && 'py-12 md:py-16',
          bordered && 'border-t border-[var(--border-color)]',
          className,
        )}
        {...props}
      >
        {(title || subtitle) && (
          <div className="mb-8">
            {title && (
              <h2 className="text-2xl font-display font-bold text-[var(--text-primary)] mb-2">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="text-[var(--text-secondary)] text-base max-w-2xl">
                {subtitle}
              </p>
            )}
          </div>
        )}
        {children}
      </section>
    )
  },
)
Section.displayName = 'Section'
