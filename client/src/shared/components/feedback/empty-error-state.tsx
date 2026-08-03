import { motion } from 'framer-motion'
import { cn } from '@/shared/utils/cn'
import { fadeVariants } from '@/shared/animations'
import { Button, type ButtonProps } from '@/shared/components/ui/button'
import { 
  PackageSearch, 
  WifiOff, 
  Bot, 
  Lock, 
  SearchX, 
  FileQuestion, 
  Box, 
  FileText, 
  ShoppingBag,
  AlertCircle
} from 'lucide-react'

interface StateProps {
  icon: React.ReactNode
  title: string
  description?: string
  action?: {
    label: string
    onClick: () => void
    variant?: ButtonProps['variant']
  }
  className?: string
  compact?: boolean
}

function BaseState({ icon, title, description, action, className, compact = false }: StateProps) {
  return (
    <motion.div
      variants={fadeVariants}
      initial="hidden"
      animate="visible"
      className={cn(
        'flex flex-col items-center justify-center text-center',
        compact ? 'gap-3 py-8 px-4' : 'gap-4 py-16 px-8',
        className,
      )}
    >
      <div className={cn(
        "rounded-2xl bg-[var(--surface-2)] flex items-center justify-center mb-2 border border-border-color shadow-sm",
        compact ? 'w-12 h-12' : 'w-16 h-16'
      )}>
        {icon}
      </div>
      <div>
        <h3 className={cn(
          "font-display font-semibold text-[var(--text-primary)] mb-1.5",
          compact ? 'text-base' : 'text-lg'
        )}>
          {title}
        </h3>
        {description && (
          <p className={cn(
            "text-[var(--text-secondary)] mx-auto leading-relaxed",
            compact ? 'text-xs max-w-xs' : 'text-sm max-w-sm'
          )}>
            {description}
          </p>
        )}
      </div>
      {action && (
        <Button
          variant={action.variant ?? 'primary'}
          size={compact ? 'sm' : 'md'}
          onClick={action.onClick}
          className="mt-2"
        >
          {action.label}
        </Button>
      )}
    </motion.div>
  )
}

// Pre-defined premium empty states
export type EmptyStateType = 
  | 'generic' 
  | 'offline' 
  | 'ai-error' 
  | 'permission' 
  | 'search-empty' 
  | '404' 
  | 'no-products' 
  | 'no-rfqs' 
  | 'no-orders'

export interface EmptyStateProps {
  type: EmptyStateType
  title?: string
  description?: string
  action?: StateProps['action']
  className?: string
  compact?: boolean
}

export function EmptyState({
  type,
  title,
  description,
  action,
  className,
  compact = false
}: EmptyStateProps) {
  const config = {
    'generic': {
      icon: <PackageSearch className={cn("text-[var(--text-tertiary)]", compact ? 'w-5 h-5' : 'w-7 h-7')} />,
      defaultTitle: 'Nothing to see here',
      defaultDescription: 'There is no data available for this section yet.',
    },
    'offline': {
      icon: <WifiOff className={cn("text-[var(--color-error)]", compact ? 'w-5 h-5' : 'w-7 h-7')} />,
      defaultTitle: 'You are offline',
      defaultDescription: 'Please check your internet connection to continue sourcing.',
    },
    'ai-error': {
      icon: <Bot className={cn("text-[var(--color-warning)]", compact ? 'w-5 h-5' : 'w-7 h-7')} />,
      defaultTitle: 'AI Copilot Unavailable',
      defaultDescription: 'Our AI services are temporarily degraded. Standard functions are active.',
    },
    'permission': {
      icon: <Lock className={cn("text-[var(--color-error)]", compact ? 'w-5 h-5' : 'w-7 h-7')} />,
      defaultTitle: 'Access Restricted',
      defaultDescription: 'You do not have the required permissions to view this workspace.',
    },
    'search-empty': {
      icon: <SearchX className={cn("text-[var(--text-tertiary)]", compact ? 'w-5 h-5' : 'w-7 h-7')} />,
      defaultTitle: 'No results found',
      defaultDescription: 'Try adjusting your filters, or use the AI Copilot to discover alternatives.',
    },
    '404': {
      icon: <FileQuestion className={cn("text-[var(--text-tertiary)]", compact ? 'w-5 h-5' : 'w-7 h-7')} />,
      defaultTitle: 'Page Not Found',
      defaultDescription: 'The resource you requested may have been moved or deleted.',
    },
    'no-products': {
      icon: <Box className={cn("text-[var(--text-tertiary)]", compact ? 'w-5 h-5' : 'w-7 h-7')} />,
      defaultTitle: 'No Products Listed',
      defaultDescription: 'Start publishing your material catalog to receive wholesale RFQs.',
    },
    'no-rfqs': {
      icon: <FileText className={cn("text-[var(--text-tertiary)]", compact ? 'w-5 h-5' : 'w-7 h-7')} />,
      defaultTitle: 'No Active RFQs',
      defaultDescription: 'When buyers request quotes for your products, they will appear here.',
    },
    'no-orders': {
      icon: <ShoppingBag className={cn("text-[var(--text-tertiary)]", compact ? 'w-5 h-5' : 'w-7 h-7')} />,
      defaultTitle: 'No Active Orders',
      defaultDescription: 'You have no active orders in your pipeline right now.',
    }
  }

  const selectedConfig = config[type]

  return (
    <BaseState
      icon={selectedConfig.icon}
      title={title || selectedConfig.defaultTitle}
      description={description || selectedConfig.defaultDescription}
      action={action}
      className={className}
      compact={compact}
    />
  )
}

// ── Error State ───────────────────────────────────────────────────
export interface ErrorStateProps {
  title?: string
  description?: string
  onRetry?: () => void
  className?: string
  compact?: boolean
}

export function ErrorState({
  title = 'System Error',
  description = 'An unexpected error occurred while communicating with the procurement server.',
  onRetry,
  className,
  compact = false
}: ErrorStateProps) {
  return (
    <BaseState
      icon={<AlertCircle className={cn("text-[var(--color-error)]", compact ? 'w-5 h-5' : 'w-7 h-7')} />}
      title={title}
      description={description}
      action={onRetry ? { label: 'Retry Connection', onClick: onRetry, variant: 'outline' } : undefined}
      className={className}
      compact={compact}
    />
  )
}
