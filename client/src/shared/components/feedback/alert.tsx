import { forwardRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle2, AlertCircle, AlertTriangle, Info, X } from 'lucide-react'
import { cn } from '@/shared/utils/cn'
import { slideDownVariants } from '@/shared/animations'

export type AlertVariant = 'info' | 'success' | 'warning' | 'error'

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: AlertVariant
  title?: string
  /** Show dismiss button */
  onDismiss?: () => void
  /** Show/hide controlled externally */
  visible?: boolean
  icon?: React.ReactNode
}

const variantConfig: Record<AlertVariant, {
  containerClass: string
  iconClass: string
  icon: React.ReactNode
}> = {
  info: {
    containerClass: 'bg-[var(--color-info)]/10 border-[var(--color-info)]/30 text-[var(--color-info)]',
    iconClass: 'text-[var(--color-info)]',
    icon: <Info size={18} />,
  },
  success: {
    containerClass: 'bg-[var(--color-success)]/10 border-[var(--color-success)]/30 text-[var(--color-success-dark)]',
    iconClass: 'text-[var(--color-success)]',
    icon: <CheckCircle2 size={18} />,
  },
  warning: {
    containerClass: 'bg-[var(--color-warning)]/10 border-[var(--color-warning)]/30 text-[var(--color-warning-dark)]',
    iconClass: 'text-[var(--color-warning)]',
    icon: <AlertTriangle size={18} />,
  },
  error: {
    containerClass: 'bg-[var(--color-error)]/10 border-[var(--color-error)]/30 text-[var(--color-error-dark)]',
    iconClass: 'text-[var(--color-error)]',
    icon: <AlertCircle size={18} />,
  },
}

/**
 * Alert banner with 4 semantic variants, optional title, and dismiss button.
 */
export const Alert = forwardRef<HTMLDivElement, AlertProps>(
  ({ variant = 'info', title, onDismiss, visible = true, icon, className, children, ...props }, ref) => {
    const config = variantConfig[variant]

    return (
      <AnimatePresence>
        {visible && (
          <motion.div
            ref={ref}
            role="alert"
            aria-live="polite"
            variants={slideDownVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className={cn(
              'flex gap-3 rounded-xl border p-4',
              config.containerClass,
              className,
            )}
            {...(props as object)}
          >
            <span className={cn('shrink-0 mt-0.5', config.iconClass)} aria-hidden="true">
              {icon ?? config.icon}
            </span>

            <div className="flex-1 min-w-0">
              {title && (
                <p className="font-semibold text-sm mb-1">{title}</p>
              )}
              {children && (
                <div className="text-sm opacity-90">{children}</div>
              )}
            </div>

            {onDismiss && (
              <button
                type="button"
                onClick={onDismiss}
                className="shrink-0 ml-2 opacity-60 hover:opacity-100 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-current rounded"
                aria-label="Dismiss alert"
              >
                <X size={16} />
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    )
  },
)
Alert.displayName = 'Alert'
