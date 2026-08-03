import React from 'react'
import { X, Sparkles } from 'lucide-react'
import { cn } from '@/shared/utils/cn'

export interface BannerProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'info' | 'brand' | 'warning'
  closable?: boolean
  onClose?: () => void
  actionLabel?: string
  onAction?: () => void
}

export function Banner({
  variant = 'brand',
  closable = true,
  onClose,
  actionLabel,
  onAction,
  className,
  children,
  ...props
}: BannerProps) {
  const styles = {
    info: 'bg-[var(--surface-3)] text-[var(--text-primary)] border-b border-[var(--border-color)]',
    brand: 'gradient-brand text-white',
    warning: 'bg-[var(--color-warning)]/15 border-b border-[var(--color-warning)]/30 text-[var(--color-warning-dark)] font-medium',
  }

  return (
    <div
      className={cn(
        'w-full px-4 py-3 text-sm flex items-center justify-between gap-4 transition-colors',
        styles[variant],
        className
      )}
      {...props}
    >
      <div className="flex items-center gap-2 flex-1 justify-center text-center">
        <Sparkles size={16} className="shrink-0" />
        <span>{children}</span>
        {actionLabel && (
          <button
            onClick={onAction}
            className="ml-2 font-bold underline hover:opacity-80 transition-opacity focus-visible:outline-none"
          >
            {actionLabel}
          </button>
        )}
      </div>
      {closable && (
        <button
          onClick={onClose}
          className="p-1 rounded hover:bg-black/10 transition-colors shrink-0"
          aria-label="Close banner"
        >
          <X size={16} />
        </button>
      )}
    </div>
  )
}
