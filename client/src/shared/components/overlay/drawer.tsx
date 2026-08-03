import React, { useEffect, useCallback } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { cn } from '@/shared/utils/cn'
import {
  drawerRightVariants,
  slideRightVariants,
  drawerBottomVariants,
  overlayVariants,
} from '@/shared/animations'
import { Button } from '@/shared/components/ui/button'

export interface DrawerProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  position?: 'left' | 'right' | 'bottom'
  children?: React.ReactNode
  footer?: React.ReactNode
  className?: string
}

export function Drawer({
  isOpen,
  onClose,
  title,
  position = 'right',
  children,
  footer,
  className,
}: DrawerProps) {
  const handleEsc = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    },
    [onClose],
  )

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleEsc)
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.removeEventListener('keydown', handleEsc)
      document.body.style.overflow = ''
    }
  }, [isOpen, handleEsc])

  const variants =
    position === 'right'
      ? drawerRightVariants
      : position === 'left'
      ? slideRightVariants
      : drawerBottomVariants

  const posClasses = {
    right: 'top-0 right-0 h-full w-full max-w-md border-l',
    left: 'top-0 left-0 h-full w-full max-w-md border-r',
    bottom: 'bottom-0 left-0 right-0 max-h-[85vh] rounded-t-2xl border-t',
  }

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-[var(--z-modal)] flex"
          role="dialog"
          aria-modal="true"
          aria-labelledby={title ? 'drawer-title' : undefined}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 overlay-bg"
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Drawer content */}
          <motion.div
            variants={variants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className={cn(
              'relative bg-[var(--surface-2)] border-[var(--border-color)] shadow-2xl flex flex-col z-10',
              posClasses[position],
              className
            )}
          >
            {/* Header */}
            <div className="p-5 flex items-center justify-between border-b border-[var(--border-color)]">
              <h3 id="drawer-title" className="font-display font-bold text-lg text-[var(--text-primary)]">
                {title}
              </h3>
              <Button variant="ghost" size="sm" iconOnly onClick={onClose} aria-label="Close drawer">
                <X size={18} />
              </Button>
            </div>

            {/* Body */}
            <div className="flex-1 overflow-y-auto p-5 scrollbar-thin">{children}</div>

            {/* Footer */}
            {footer && (
              <div className="p-5 border-t border-[var(--border-color)] bg-[var(--surface-1)]">
                {footer}
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  )
}
