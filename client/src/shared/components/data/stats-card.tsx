import React from 'react'
import { ArrowUpRight, ArrowDownRight } from 'lucide-react'
import { Card } from '@/shared/components/ui/card'
import { cn } from '@/shared/utils/cn'

export interface StatsCardProps {
  title: string
  value: string | number
  trend?: {
    value: string | number
    isPositive?: boolean
    label?: string
  }
  icon?: React.ReactNode
  description?: string
  className?: string
}

export function StatsCard({
  title,
  value,
  trend,
  icon,
  description,
  className,
}: StatsCardProps) {
  return (
    <Card hoverable className={cn('space-y-3', className)}>
      <div className="flex items-center justify-between gap-2">
        <span className="text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">
          {title}
        </span>
        {icon && (
          <div className="w-9 h-9 rounded-xl bg-[var(--surface-3)] text-[var(--color-brand-primary)] flex items-center justify-center">
            {icon}
          </div>
        )}
      </div>

      <div className="flex items-baseline justify-between gap-2">
        <span className="text-2xl md:text-3xl font-display font-extrabold text-[var(--text-primary)]">
          {value}
        </span>
        {trend && (
          <div
            className={cn(
              'inline-flex items-center text-xs font-bold px-2 py-0.5 rounded-full',
              trend.isPositive
                ? 'bg-[var(--color-success)]/15 text-[var(--color-success)]'
                : 'bg-[var(--color-error)]/15 text-[var(--color-error)]'
            )}
          >
            {trend.isPositive ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
            {trend.value}
          </div>
        )}
      </div>

      {(description || trend?.label) && (
        <p className="text-xs text-[var(--text-secondary)]">
          {trend?.label ?? description}
        </p>
      )}
    </Card>
  )
}
