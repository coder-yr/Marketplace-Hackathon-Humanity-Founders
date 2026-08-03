import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/shared/utils/cn'

export interface TabItem {
  id: string
  label: string
  content: React.ReactNode
  icon?: React.ReactNode
  badge?: string | number
  disabled?: boolean
}

export interface TabsProps {
  items: TabItem[]
  defaultTabId?: string
  variant?: 'underline' | 'pills' | 'segmented'
  className?: string
  onChange?: (id: string) => void
}

export function Tabs({
  items,
  defaultTabId,
  variant = 'underline',
  className,
  onChange,
}: TabsProps) {
  const [activeTab, setActiveTab] = useState<string>(
    defaultTabId ?? items[0]?.id ?? ''
  )

  const handleTabClick = (id: string, disabled?: boolean) => {
    if (disabled) return
    setActiveTab(id)
    onChange?.(id)
  }

  const activeItem = items.find((item) => item.id === activeTab)

  return (
    <div className={cn('w-full space-y-6', className)}>
      {/* Tab Navigation List */}
      <div
        role="tablist"
        className={cn(
          'flex items-center gap-2 overflow-x-auto scrollbar-none',
          variant === 'underline' && 'border-b border-[var(--border-color)] pb-px',
          variant === 'segmented' && 'bg-[var(--surface-3)] p-1 rounded-xl'
        )}
      >
        {items.map((tab) => {
          const isActive = tab.id === activeTab
          return (
            <button
              key={tab.id}
              id={`tab-${tab.id}`}
              role="tab"
              aria-selected={isActive}
              aria-controls={`panel-${tab.id}`}
              disabled={tab.disabled}
              onClick={() => handleTabClick(tab.id, tab.disabled)}
              className={cn(
                'relative px-4 py-2.5 text-sm font-semibold transition-colors flex items-center gap-2 whitespace-nowrap rounded-lg',
                tab.disabled && 'opacity-40 cursor-not-allowed',
                variant === 'underline' &&
                  (isActive
                    ? 'text-[var(--color-brand-primary)]'
                    : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'),
                variant === 'pills' &&
                  (isActive
                    ? 'bg-[var(--color-brand-primary)] text-white shadow-sm'
                    : 'bg-[var(--surface-2)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-3)]'),
                variant === 'segmented' &&
                  (isActive
                    ? 'bg-[var(--surface-1)] text-[var(--text-primary)] shadow-sm'
                    : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]')
              )}
            >
              {tab.icon}
              {tab.label}
              {tab.badge !== undefined && (
                <span
                  className={cn(
                    'px-2 py-0.5 text-xs rounded-full font-bold',
                    isActive && variant === 'pills'
                      ? 'bg-white/20 text-white'
                      : 'bg-[var(--surface-4)] text-[var(--text-secondary)]'
                  )}
                >
                  {tab.badge}
                </span>
              )}

              {/* Animated underline indicator */}
              {variant === 'underline' && isActive && (
                <motion.div
                  layoutId="activeTabUnderline"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-[var(--color-brand-primary)] rounded-full"
                  transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                />
              )}
            </button>
          )
        })}
      </div>

      {/* Active Tab Panel */}
      <div
        id={`panel-${activeItem?.id}`}
        role="tabpanel"
        aria-labelledby={`tab-${activeItem?.id}`}
        className="animate-fade-in"
      >
        {activeItem?.content}
      </div>
    </div>
  )
}
