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
          'flex items-center gap-2 overflow-x-auto custom-scrollbar',
          variant === 'underline' && 'border-b border-[var(--border)] pb-px',
          variant === 'segmented' && 'bg-[#F1F5F9] p-1.5 rounded-[12px]'
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
                'relative px-4 py-2 text-[14px] font-bold transition-all duration-[120ms] flex items-center gap-2 whitespace-nowrap rounded-[10px]',
                tab.disabled && 'opacity-40 cursor-not-allowed',
                variant === 'underline' &&
                  (isActive
                    ? 'text-[var(--primary)]'
                    : 'text-[#64748B] hover:text-[var(--heading)]'),
                variant === 'pills' &&
                  (isActive
                    ? 'bg-[var(--primary)] text-white shadow-sm'
                    : 'bg-[#F1F5F9] text-[#64748B] hover:text-[var(--heading)] hover:bg-[#E2E8F0]'),
                variant === 'segmented' &&
                  (isActive
                    ? 'bg-white text-[var(--heading)] shadow-sm'
                    : 'text-[#64748B] hover:text-[var(--heading)]')
              )}
            >
              {tab.icon}
              {tab.label}
              {tab.badge !== undefined && (
                <span
                  className={cn(
                    'px-2 py-0.5 text-[11px] rounded-full font-bold uppercase tracking-widest',
                    isActive && variant === 'pills'
                      ? 'bg-white/20 text-white'
                      : 'bg-[#E2E8F0] text-[var(--heading)]'
                  )}
                >
                  {tab.badge}
                </span>
              )}

              {/* Animated underline indicator */}
              {variant === 'underline' && isActive && (
                <motion.div
                  layoutId="activeTabUnderline"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-[var(--primary)] rounded-full"
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
