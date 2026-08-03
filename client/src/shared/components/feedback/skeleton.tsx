import { cn } from '@/shared/utils/cn'

export type SkeletonVariant = 'text' | 'circular' | 'rectangular' | 'rounded'

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: SkeletonVariant
  width?: string | number
  height?: string | number
  /** Number of text lines */
  lines?: number
  /** Animation type */
  animation?: 'pulse' | 'shimmer' | 'none'
}

const shimmerStyle: React.CSSProperties = {
  backgroundImage: 'linear-gradient(90deg, var(--surface-3) 25%, var(--surface-4) 50%, var(--surface-3) 75%)',
  backgroundSize: '200% 100%',
  animation: 'shimmer 1.8s ease-in-out infinite',
}

/**
 * Skeleton loader with pulse/shimmer animations and text/card/avatar variants.
 */
export function Skeleton({
  variant = 'rectangular',
  width,
  height,
  lines,
  animation = 'shimmer',
  className,
  style,
  ...props
}: SkeletonProps) {
  const baseClass = cn(
    'bg-[var(--surface-3)]',
    animation === 'pulse' && 'animate-pulse',
    variant === 'circular' && 'rounded-full',
    variant === 'rounded' && 'rounded-lg',
    variant === 'text' && 'rounded',
    variant === 'rectangular' && 'rounded-md',
    className,
  )

  const shimmer = animation === 'shimmer' ? shimmerStyle : {}

  const inlineStyle: React.CSSProperties = {
    width: typeof width === 'number' ? `${width}px` : width,
    height: typeof height === 'number' ? `${height}px` : height,
    ...shimmer,
    ...style,
  }

  // Multi-line text skeleton
  if (variant === 'text' && lines && lines > 1) {
    return (
      <div className="flex flex-col gap-2" role="status" aria-busy="true">
        {Array.from({ length: lines }).map((_, i) => (
          <div
            key={i}
            className={cn(baseClass, 'h-4')}
            style={{
              width: i === lines - 1 ? '70%' : '100%',
              ...shimmer,
            }}
          />
        ))}
        <span className="sr-only">Loading...</span>
      </div>
    )
  }

  return (
    <div
      className={baseClass}
      style={inlineStyle}
      role="status"
      aria-busy="true"
      {...props}
    >
      <span className="sr-only">Loading...</span>
    </div>
  )
}

// ── Preset skeletons for common patterns ──────────────────────────

export function SkeletonCard() {
  return (
    <div className="surface-card p-5 space-y-4" role="status" aria-busy="true">
      <div className="flex items-center gap-3">
        <Skeleton variant="circular" width={40} height={40} />
        <div className="flex-1 space-y-2">
          <Skeleton variant="text" height={14} width="60%" />
          <Skeleton variant="text" height={12} width="40%" />
        </div>
      </div>
      <Skeleton height={120} variant="rounded" />
      <Skeleton variant="text" lines={3} />
      <span className="sr-only">Loading card...</span>
    </div>
  )
}

export function SkeletonTableRow({ cols = 4 }: { cols?: number }) {
  return (
    <div className="flex items-center gap-4 py-3 px-4 border-b border-[var(--border-color)]">
      {Array.from({ length: cols }).map((_, i) => (
        <Skeleton key={i} height={14} className="flex-1" />
      ))}
    </div>
  )
}

export function SkeletonAvatar({ size = 40 }: { size?: number }) {
  return <Skeleton variant="circular" width={size} height={size} />
}
