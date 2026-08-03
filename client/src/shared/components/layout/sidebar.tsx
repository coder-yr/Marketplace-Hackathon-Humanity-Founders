import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { cn } from '@/shared/utils/cn'

export interface SidebarItem {
  label: string
  href: string
  icon: React.ReactNode
  badge?: string | number
}

export interface SidebarGroup {
  title?: string
  items: SidebarItem[]
}

export interface SidebarProps extends React.HTMLAttributes<HTMLElement> {
  groups: SidebarGroup[]
  collapsed?: boolean
  onToggleCollapse?: () => void
}

export function Sidebar({
  groups,
  collapsed = false,
  className,
  ...props
}: SidebarProps) {
  const location = useLocation()

  return (
    <aside
      className={cn(
        'h-[calc(100vh-var(--navbar-height))] sticky top-[var(--navbar-height)] flex flex-col',
        'bg-[var(--surface-2)] border-r border-[var(--border-color)] transition-all duration-[var(--duration-normal)]',
        collapsed ? 'w-[var(--sidebar-collapsed)]' : 'w-[var(--sidebar-width)]',
        className
      )}
      {...props}
    >
      <div className="flex-1 overflow-y-auto p-4 space-y-6 scrollbar-thin">
        {groups.map((group, idx) => (
          <div key={idx} className="space-y-2">
            {group.title && !collapsed && (
              <h4 className="px-3 text-[11px] font-semibold tracking-wider text-[var(--text-muted)] uppercase">
                {group.title}
              </h4>
            )}
            <div className="space-y-1">
              {group.items.map((item) => {
                const isActive = location.pathname === item.href
                return (
                  <Link
                    key={item.href}
                    to={item.href}
                    title={collapsed ? item.label : undefined}
                    className={cn(
                      'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
                      isActive
                        ? 'bg-[var(--color-brand-primary)] text-white font-semibold shadow-sm'
                        : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-3)]',
                      collapsed && 'justify-center px-0'
                    )}
                  >
                    <span className="shrink-0">{item.icon}</span>
                    {!collapsed && <span className="truncate">{item.label}</span>}
                    {!collapsed && item.badge && (
                      <span
                        className={cn(
                          'ml-auto px-2 py-0.5 text-xs font-semibold rounded-full',
                          isActive
                            ? 'bg-white/20 text-white'
                            : 'bg-[var(--surface-4)] text-[var(--text-secondary)]'
                        )}
                      >
                        {item.badge}
                      </span>
                    )}
                  </Link>
                )
              })}
            </div>
          </div>
        ))}
      </div>
    </aside>
  )
}
