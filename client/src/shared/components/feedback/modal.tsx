import { useEffect, useCallback } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { cn } from '@/shared/utils/cn'
import { modalVariants, overlayVariants } from '@/shared/animations'

export type ModalSize = 'sm' | 'md' | 'lg' | 'xl' | 'full'

export interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  description?: string
  size?: ModalSize
  /** Prevent closing on overlay click */
  closeOnOverlayClick?: boolean
  /** Prevent closing on Escape key */
  closeOnEsc?: boolean
  /** Show close button */
  showCloseButton?: boolean
  children?: React.ReactNode
  /** Slot for footer actions */
  footer?: React.ReactNode
  className?: string
}

const sizeMap: Record<ModalSize, string> = {
  sm:   'max-w-sm',
  md:   'max-w-md',
  lg:   'max-w-lg',
  xl:   'max-w-xl',
  full: 'max-w-[95vw] max-h-[95vh]',
}

/**
 * Accessible modal dialog with AnimatePresence, portal rendering, Escape key, focus trap.
 */
export function Modal({
  isOpen,
  onClose,
  title,
  description,
  size = 'md',
  closeOnOverlayClick = true,
  closeOnEsc = true,
  showCloseButton = true,
  children,
  footer,
  className,
}: ModalProps) {
  const handleEsc = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape' && closeOnEsc) onClose()
    },
    [closeOnEsc, onClose],
  )

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleEsc)
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.removeEventListener('keydown', handleEsc)
      document.body.style.overflow = ''
    }
  }, [isOpen, handleEsc])

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center p-4"
          style={{ zIndex: 100 }}
          role="dialog"
          aria-modal="true"
          aria-labelledby={title ? 'modal-title' : undefined}
          aria-describedby={description ? 'modal-description' : undefined}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-[#0A2540]/60 backdrop-blur-sm"
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={closeOnOverlayClick ? onClose : undefined}
            aria-hidden="true"
          />

          {/* Dialog */}
          <motion.div
            className={cn(
              'relative w-full rounded-[24px] bg-white shadow-2xl',
              'border border-[var(--border)]',
              'flex flex-col max-h-[90vh]',
              sizeMap[size],
              className,
            )}
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {/* Header */}
            {(title || showCloseButton) && (
              <div className="flex items-start justify-between gap-4 p-6 pb-0">
                <div>
                  {title && (
                    <h2 id="modal-title" className="text-[20px] font-display font-bold text-[var(--heading)]">
                      {title}
                    </h2>
                  )}
                  {description && (
                    <p id="modal-description" className="text-[14px] text-[var(--body)] font-medium mt-1">
                      {description}
                    </p>
                  )}
                </div>
                {showCloseButton && (
                  <button
                    type="button"
                    onClick={onClose}
                    className={cn(
                      'shrink-0 p-1.5 rounded-[12px] text-[#94A3B8]',
                      'hover:bg-[#F1F5F9] hover:text-[var(--heading)]',
                      'transition-colors duration-[var(--duration-fast)]',
                      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring-color)]',
                    )}
                    aria-label="Close modal"
                  >
                    <X size={18} />
                  </button>
                )}
              </div>
            )}

            {/* Body */}
            <div className="flex-1 overflow-y-auto p-6">
              {children}
            </div>

            {/* Footer */}
            {footer && (
              <div className="flex items-center justify-end gap-3 p-6 pt-0 border-t border-[var(--border)] mt-0">
                {footer}
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body,
  )
}
