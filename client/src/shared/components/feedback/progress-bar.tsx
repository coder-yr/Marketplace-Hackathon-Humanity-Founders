import React from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/shared/utils/cn'

export interface ProgressBarProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number // 0 to 100
  showLabel?: boolean
  size?: 'sm' | 'md' | 'lg'
  variant?: 'primary' | 'success' | 'warning' | 'brand'
}

export function ProgressBar({
  value,
  showLabel = false,
  size = 'md',
  variant = 'primary',
  className,
  ...props
}: ProgressBarProps) {
  const clamped = Math.min(Math.max(value, 0), 100)

  const heightStyles = {
    sm: 'h-1.5',
    md: 'h-2.5',
    lg: 'h-4',
  }

  const variantStyles = {
    primary: 'bg-[var(--color-brand-primary)]',
    success: 'bg-[var(--color-success)]',
    warning: 'bg-[var(--color-warning)]',
    brand: 'gradient-brand',
  }

  return (
    <div className={cn('w-full flex flex-col gap-1.5', className)} {...props}>
      {showLabel && (
        <div className="flex justify-between text-xs font-semibold text-[var(--text-secondary)]">
          <span>Progress</span>
          <span>{clamped}%</span>
        </div>
      )}
      <div
        className={cn(
          'w-full bg-[var(--surface-3)] rounded-full overflow-hidden',
          heightStyles[size]
        )}
        role="progressbar"
        aria-valuenow={clamped}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${clamped}%` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className={cn('h-full rounded-full transition-all', variantStyles[variant])}
        />
      </div>
    </div>
  )
}
