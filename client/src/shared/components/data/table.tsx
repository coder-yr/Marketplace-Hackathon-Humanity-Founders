import React from 'react'
import { cn } from '@/shared/utils/cn'
import { SkeletonTableRow } from '@/shared/components/feedback/skeleton'

export interface Column<T> {
  key: string
  title: string
  render?: (item: T) => React.ReactNode
  align?: 'left' | 'center' | 'right'
  width?: string
}

export interface TableProps<T> {
  columns: Column<T>[]
  data: T[]
  loading?: boolean
  emptyMessage?: string
  onRowClick?: (item: T) => void
  className?: string
}

export function Table<T extends { id?: string | number }>({
  columns,
  data,
  loading = false,
  emptyMessage = 'No records found',
  onRowClick,
  className,
}: TableProps<T>) {
  return (
    <div className={cn('w-full overflow-x-auto surface-card scrollbar-thin', className)}>
      <table className="w-full text-left border-collapse text-sm">
        <thead>
          <tr className="border-b border-[var(--border-color)] bg-[var(--surface-3)]/50 text-[var(--text-secondary)] font-semibold">
            {columns.map((col) => (
              <th
                key={col.key}
                style={{ width: col.width }}
                className={cn(
                  'py-3.5 px-4 font-display font-medium text-xs tracking-wider uppercase',
                  col.align === 'center' && 'text-center',
                  col.align === 'right' && 'text-right'
                )}
              >
                {col.title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-[var(--border-color-subtle)]">
          {loading ? (
            Array.from({ length: 5 }).map((_, i) => (
              <tr key={i}>
                <td colSpan={columns.length} className="p-0">
                  <SkeletonTableRow cols={columns.length} />
                </td>
              </tr>
            ))
          ) : data.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length}
                className="py-12 text-center text-[var(--text-muted)] font-medium"
              >
                {emptyMessage}
              </td>
            </tr>
          ) : (
            data.map((item, rowIdx) => (
              <tr
                key={item.id ?? rowIdx}
                onClick={() => onRowClick?.(item)}
                className={cn(
                  'transition-colors hover:bg-[var(--surface-3)]/40',
                  onRowClick && 'cursor-pointer'
                )}
              >
                {columns.map((col) => (
                  <td
                    key={col.key}
                    className={cn(
                      'py-4 px-4 text-[var(--text-primary)] font-normal',
                      col.align === 'center' && 'text-center',
                      col.align === 'right' && 'text-right'
                    )}
                  >
                    {col.render
                      ? col.render(item)
                      : (item as Record<string, unknown>)[col.key] as React.ReactNode}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}
