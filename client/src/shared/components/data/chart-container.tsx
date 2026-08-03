import React from 'react'
import { Card, CardHeader, CardBody } from '@/shared/components/ui/card'
import { cn } from '@/shared/utils/cn'

export interface ChartContainerProps {
  title: string
  subtitle?: string
  action?: React.ReactNode
  height?: number | string
  className?: string
  children?: React.ReactNode
}

export function ChartContainer({
  title,
  subtitle,
  action,
  height = 300,
  className,
  children,
}: ChartContainerProps) {
  return (
    <Card className={cn('w-full', className)}>
      <CardHeader title={title} subtitle={subtitle} action={action} />
      <CardBody>
        <div
          style={{ height }}
          className="w-full flex items-center justify-center bg-[var(--surface-3)]/30 rounded-lg border border-[var(--border-color-subtle)] relative overflow-hidden"
        >
          {children ?? (
            <span className="text-sm font-medium text-[var(--text-muted)]">
              Chart visualization slot
            </span>
          )}
        </div>
      </CardBody>
    </Card>
  )
}
