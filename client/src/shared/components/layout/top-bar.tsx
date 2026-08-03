import React from 'react'
import { cn } from '@/shared/utils/cn'

export interface TopBarProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'brand' | 'announcement'
  closable?: boolean
  onClose?: () => void
}

export function TopBar({
  variant = 'default',
  closable,
  onClose,
  className,
  children,
  ...props
}: TopBarProps) {
  const variantStyles = {
    default: 'bg-[var(--surface-3)] text-[var(--text-secondary)] border-b border-[var(--border-color)]',
    brand: 'bg-[var(--color-brand-primary)] text-white font-medium',
    announcement: 'gradient-brand text-white font-medium',
  }

  return (
    <div
      className={cn(
        'h-[var(--topbar-height)] px-4 flex items-center justify-between text-xs transition-colors',
        variantStyles[variant],
        className
      )}
      {...props}
    >
      <div className="flex-1 flex items-center justify-center gap-2 text-center">
        {children}
      </div>
      {closable && (
        <button
          onClick={onClose}
          className="ml-2 p-1 hover:opacity-80 rounded focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-current"
          aria-label="Close announcement"
        >
          ✕
        </button>
      )}
    </div>
  )
}
