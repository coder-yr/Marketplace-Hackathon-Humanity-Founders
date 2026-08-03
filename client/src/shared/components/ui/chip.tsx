import React from 'react'
import { X } from 'lucide-react'
import { cn } from '@/shared/utils/cn'

export interface ChipProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'outline' | 'filled' | 'brand'
  active?: boolean
  onRemove?: () => void
  icon?: React.ReactNode
}

export function Chip({
  variant = 'outline',
  active = false,
  onRemove,
  icon,
  className,
  children,
  onClick,
  ...props
}: ChipProps) {
  const isClickable = Boolean(onClick)

  return (
    <div
      onClick={onClick}
      className={cn(
        'inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border transition-all duration-[var(--duration-fast)] select-none',
        isClickable && 'cursor-pointer hover:scale-105 active:scale-95',
        variant === 'outline' &&
          (active
            ? 'bg-[var(--color-brand-primary)] text-white border-[var(--color-brand-primary)]'
            : 'bg-[var(--surface-2)] text-[var(--text-secondary)] border-[var(--border-color)] hover:border-[var(--text-muted)]'),
        variant === 'filled' &&
          (active
            ? 'bg-[var(--color-brand-primary)] text-white border-transparent'
            : 'bg-[var(--surface-3)] text-[var(--text-primary)] border-transparent'),
        variant === 'brand' && 'gradient-brand text-white border-transparent shadow-sm',
        className
      )}
      {...props}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      <span>{children}</span>
      {onRemove && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation()
            onRemove()
          }}
          className="ml-1 rounded-full p-0.5 hover:bg-black/20 transition-colors"
          aria-label="Remove chip"
        >
          <X size={12} />
        </button>
      )}
    </div>
  )
}
