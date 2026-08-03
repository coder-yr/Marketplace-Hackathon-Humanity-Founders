import React from 'react'
import { cn } from '@/shared/utils/cn'

export interface DividerProps extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: 'horizontal' | 'vertical'
  label?: string
}

export function Divider({
  orientation = 'horizontal',
  label,
  className,
  ...props
}: DividerProps) {
  if (orientation === 'vertical') {
    return (
      <div
        className={cn('w-px h-full bg-[var(--border-color)] self-stretch mx-2', className)}
        {...props}
      />
    )
  }

  if (label) {
    return (
      <div className={cn('flex items-center gap-4 my-4 w-full', className)} {...props}>
        <div className="flex-1 h-px bg-[var(--border-color)]" />
        <span className="text-xs font-medium text-[var(--text-muted)] uppercase tracking-wider">
          {label}
        </span>
        <div className="flex-1 h-px bg-[var(--border-color)]" />
      </div>
    )
  }

  return (
    <div
      className={cn('w-full h-px bg-[var(--border-color)] my-4', className)}
      {...props}
    />
  )
}
