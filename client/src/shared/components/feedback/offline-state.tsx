import { WifiOff } from 'lucide-react'
import { Button } from '@/shared/components/ui/button'
import { cn } from '@/shared/utils/cn'

export interface OfflineStateProps {
  onRetry?: () => void
  className?: string
}

export function OfflineState({ onRetry, className }: OfflineStateProps) {
  return (
    <div className={cn('flex flex-col items-center justify-center p-8 text-center gap-4', className)}>
      <div className="w-16 h-16 rounded-full bg-[var(--surface-3)] text-[var(--text-muted)] flex items-center justify-center">
        <WifiOff size={32} />
      </div>
      <div className="space-y-1">
        <h3 className="text-xl font-display font-bold text-[var(--text-primary)]">You are currently offline</h3>
        <p className="text-sm text-[var(--text-secondary)] max-w-xs mx-auto">
          Please check your network connection and try again.
        </p>
      </div>
      {onRetry && (
        <Button variant="secondary" onClick={onRetry}>
          Refresh Connection
        </Button>
      )}
    </div>
  )
}
