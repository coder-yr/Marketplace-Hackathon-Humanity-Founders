import React from 'react'
import { Card } from '@/shared/components/ui/card'
import { cn } from '@/shared/utils/cn'

export interface MetricCardProps {
  label: string
  metric: string | number
  subtext?: string
  icon?: React.ReactNode
  variant?: 'default' | 'brand' | 'glass'
  className?: string
}

export function MetricCard({
  label,
  metric,
  subtext,
  icon,
  variant = 'default',
  className,
}: MetricCardProps) {
  return (
    <Card
      variant={variant === 'glass' ? 'glass' : 'default'}
      className={cn(
        'flex items-center gap-4 p-5',
        variant === 'brand' && 'gradient-brand text-white',
        className
      )}
    >
      {icon && (
        <div
          className={cn(
            'w-12 h-12 rounded-2xl flex items-center justify-center shrink-0',
            variant === 'brand'
              ? 'bg-white/20 text-white'
              : 'bg-[var(--surface-3)] text-[var(--color-brand-primary)]'
          )}
        >
          {icon}
        </div>
      )}
      <div className="space-y-0.5">
        <span
          className={cn(
            'text-xs font-semibold uppercase tracking-wider',
            variant === 'brand' ? 'text-white/80' : 'text-[var(--text-muted)]'
          )}
        >
          {label}
        </span>
        <div className="text-xl font-display font-bold">{metric}</div>
        {subtext && (
          <p
            className={cn(
              'text-xs',
              variant === 'brand' ? 'text-white/70' : 'text-[var(--text-secondary)]'
            )}
          >
            {subtext}
          </p>
        )}
      </div>
    </Card>
  )
}
