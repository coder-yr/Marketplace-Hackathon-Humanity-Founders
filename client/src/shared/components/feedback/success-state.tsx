import { motion } from 'framer-motion'
import { CheckCircle } from 'lucide-react'
import { Button } from '@/shared/components/ui/button'
import { cn } from '@/shared/utils/cn'

export interface SuccessStateProps {
  title?: string
  description?: string
  actionLabel?: string
  onAction?: () => void
  className?: string
}

export function SuccessState({
  title = 'Action Completed Successfully!',
  description = 'Your request has been processed and saved.',
  actionLabel,
  onAction,
  className,
}: SuccessStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className={cn('flex flex-col items-center justify-center p-8 text-center gap-4', className)}
    >
      <div className="w-16 h-16 rounded-full bg-[var(--color-success)]/15 text-[var(--color-success)] flex items-center justify-center">
        <CheckCircle size={36} />
      </div>
      <div className="space-y-1">
        <h3 className="text-xl font-display font-bold text-[var(--text-primary)]">{title}</h3>
        <p className="text-sm text-[var(--text-secondary)] max-w-sm mx-auto">{description}</p>
      </div>
      {actionLabel && onAction && (
        <Button variant="primary" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </motion.div>
  )
}
