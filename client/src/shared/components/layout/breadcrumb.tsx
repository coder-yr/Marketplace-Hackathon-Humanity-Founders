import React from 'react'
import { Link } from 'react-router-dom'
import { ChevronRight, Home } from 'lucide-react'
import { cn } from '@/shared/utils/cn'

export interface BreadcrumbItem {
  label: string
  href?: string
  icon?: React.ReactNode
}

export interface BreadcrumbProps extends React.HTMLAttributes<HTMLElement> {
  items: BreadcrumbItem[]
  showHome?: boolean
}

export function Breadcrumb({
  items,
  showHome = true,
  className,
  ...props
}: BreadcrumbProps) {
  const allItems: BreadcrumbItem[] = showHome
    ? [{ label: 'Home', href: '/', icon: <Home size={14} /> }, ...items]
    : items

  return (
    <nav
      aria-label="Breadcrumb"
      className={cn('flex items-center text-sm text-[var(--text-muted)]', className)}
      {...props}
    >
      <ol className="flex items-center gap-1.5 flex-wrap">
        {allItems.map((item, idx) => {
          const isLast = idx === allItems.length - 1
          return (
            <li key={idx} className="flex items-center gap-1.5">
              {idx > 0 && <ChevronRight size={14} className="text-[var(--text-muted)] shrink-0" />}
              {isLast || !item.href ? (
                <span
                  className={cn(
                    'font-medium flex items-center gap-1.5',
                    isLast ? 'text-[var(--text-primary)]' : 'text-[var(--text-muted)]'
                  )}
                  aria-current={isLast ? 'page' : undefined}
                >
                  {item.icon}
                  {item.label}
                </span>
              ) : (
                <Link
                  to={item.href}
                  className="flex items-center gap-1.5 hover:text-[var(--text-primary)] transition-colors"
                >
                  {item.icon}
                  {item.label}
                </Link>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
