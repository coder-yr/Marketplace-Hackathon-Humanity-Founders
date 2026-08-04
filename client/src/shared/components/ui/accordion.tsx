import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/shared/utils/cn'

export interface AccordionItem {
  id: string
  title: string
  content: React.ReactNode
  icon?: React.ReactNode
}

export interface AccordionProps {
  items: AccordionItem[]
  defaultExpandedId?: string
  allowMultiple?: boolean
  className?: string
}

export function Accordion({
  items,
  defaultExpandedId,
  allowMultiple = false,
  className,
}: AccordionProps) {
  const [expandedIds, setExpandedIds] = useState<string[]>(
    defaultExpandedId ? [defaultExpandedId] : []
  )

  const toggleItem = (id: string) => {
    setExpandedIds((prev) => {
      if (allowMultiple) {
        return prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
      }
      return prev.includes(id) ? [] : [id]
    })
  }

  return (
    <div className={cn('space-y-3 w-full', className)}>
      {items.map((item) => {
        const isExpanded = expandedIds.includes(item.id)
        return (
          <div
            key={item.id}
            className="bg-white border border-[var(--border)] rounded-[16px] overflow-hidden transition-colors"
          >
            <button
              type="button"
              onClick={() => toggleItem(item.id)}
              className="w-full px-5 py-4 flex items-center justify-between gap-4 text-left focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[var(--focus-ring-color)]"
              aria-expanded={isExpanded}
            >
              <span className="font-bold text-[15px] text-[var(--heading)] flex items-center gap-3">
                {item.icon}
                {item.title}
              </span>
              <motion.div
                animate={{ rotate: isExpanded ? 180 : 0 }}
                transition={{ duration: 0.2 }}
                className="text-[#94A3B8] shrink-0"
              >
                <ChevronDown size={18} />
              </motion.div>
            </button>

            <AnimatePresence initial={false}>
              {isExpanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2, ease: 'easeInOut' }}
                >
                  <div className="px-5 pb-5 pt-1 text-[14px] font-medium text-[var(--body)] border-t border-[var(--border)] leading-relaxed">
                    {item.content}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )
      })}
    </div>
  )
}
