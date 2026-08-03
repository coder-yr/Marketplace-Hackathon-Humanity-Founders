import React from 'react'
import { Filter, RotateCcw } from 'lucide-react'
import { Button } from '@/shared/components/ui/button'
import { cn } from '@/shared/utils/cn'

export interface FilterPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string
  onReset?: () => void
  onApply?: () => void
}

export function FilterPanel({
  title = 'Filters',
  onReset,
  onApply,
  className,
  children,
  ...props
}: FilterPanelProps) {
  return (
    <div
      className={cn(
        'surface-card p-5 space-y-6 w-full max-w-xs shrink-0',
        className
      )}
      {...props}
    >
      <div className="flex items-center justify-between pb-4 border-b border-[var(--border-color)]">
        <h3 className="font-display font-bold text-base text-[var(--text-primary)] flex items-center gap-2">
          <Filter size={18} className="text-[var(--color-brand-primary)]" />
          {title}
        </h3>
        {onReset && (
          <button
            onClick={onReset}
            className="text-xs text-[var(--text-muted)] hover:text-[var(--text-primary)] flex items-center gap-1 transition-colors"
          >
            <RotateCcw size={12} /> Reset
          </button>
        )}
      </div>

      <div className="space-y-5">{children}</div>

      {onApply && (
        <div className="pt-4 border-t border-[var(--border-color)]">
          <Button variant="primary" fullWidth onClick={onApply}>
            Apply Filters
          </Button>
        </div>
      )}
    </div>
  )
}
