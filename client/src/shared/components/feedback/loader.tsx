import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/shared/utils/cn'

export interface LoaderProps {
  /** Full-screen overlay or section overlay */
  fullScreen?: boolean
  /** Text shown below spinner */
  text?: string
  className?: string
}

/**
 * Loading overlay for pages or sections.
 */
export function Loader({ fullScreen = false, text, className }: LoaderProps) {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className={cn(
          'flex flex-col items-center justify-center gap-4',
          fullScreen
            ? 'fixed inset-0 z-[var(--z-overlay)] overlay-bg'
            : 'w-full py-16',
          className,
        )}
        role="status"
        aria-label={text ?? 'Loading'}
      >
        <div className="relative w-12 h-12">
          {/* Outer ring */}
          <div className="absolute inset-0 rounded-full border-4 border-[var(--surface-3)]" />
          {/* Spinning arc */}
          <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-[var(--color-brand-primary)] animate-spin" />
        </div>
        {text && (
          <p className="text-sm text-[var(--text-secondary)] animate-pulse">{text}</p>
        )}
      </motion.div>
    </AnimatePresence>
  )
}
