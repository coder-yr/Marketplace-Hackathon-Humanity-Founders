import { forwardRef } from 'react'
import { User } from 'lucide-react'
import { cn } from '@/shared/utils/cn'

export type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string
  alt?: string
  /** Fallback initials (up to 2 chars) */
  initials?: string
  size?: AvatarSize
  /** Show online indicator */
  online?: boolean
  /** Shape variant */
  shape?: 'circle' | 'square'
}

const sizeMap: Record<AvatarSize, { container: string; text: string; indicator: string }> = {
  xs:  { container: 'w-6 h-6',   text: 'text-[10px]', indicator: 'w-1.5 h-1.5 border' },
  sm:  { container: 'w-8 h-8',   text: 'text-xs',     indicator: 'w-2 h-2 border' },
  md:  { container: 'w-10 h-10', text: 'text-sm',     indicator: 'w-2.5 h-2.5 border-2' },
  lg:  { container: 'w-12 h-12', text: 'text-base',   indicator: 'w-3 h-3 border-2' },
  xl:  { container: 'w-16 h-16', text: 'text-xl',     indicator: 'w-3.5 h-3.5 border-2' },
  '2xl':{ container: 'w-20 h-20',text: 'text-2xl',    indicator: 'w-4 h-4 border-2' },
}

/**
 * Avatar with image, initials fallback, icon fallback, size variants, online indicator.
 */
export const Avatar = forwardRef<HTMLDivElement, AvatarProps>(
  ({ src, alt, initials, size = 'md', online, shape = 'circle', className, ...props }, ref) => {
    const sz = sizeMap[size]
    const shapeClass = shape === 'circle' ? 'rounded-full' : 'rounded-lg'

    return (
      <div
        ref={ref}
        className={cn('relative inline-flex shrink-0', sz.container, className)}
        {...props}
      >
        {src ? (
          <img
            src={src}
            alt={alt ?? 'Avatar'}
            className={cn('w-full h-full object-cover', shapeClass)}
          />
        ) : initials ? (
          <div
            className={cn(
              'w-full h-full flex items-center justify-center gradient-brand',
              shapeClass,
              sz.text,
              'font-semibold text-white select-none',
            )}
            aria-label={alt ?? initials}
          >
            {initials.slice(0, 2).toUpperCase()}
          </div>
        ) : (
          <div
            className={cn(
              'w-full h-full flex items-center justify-center bg-[var(--surface-3)]',
              shapeClass,
            )}
            aria-label={alt ?? 'User avatar'}
          >
            <User className="text-[var(--text-muted)]" size={parseInt(sz.container.split('-')[1]) * 5} />
          </div>
        )}

        {online !== undefined && (
          <span
            className={cn(
              'absolute bottom-0 right-0 rounded-full border-[var(--surface-1)]',
              sz.indicator,
              online ? 'bg-[var(--color-success)]' : 'bg-[var(--surface-4)]',
            )}
            aria-label={online ? 'Online' : 'Offline'}
          />
        )}
      </div>
    )
  },
)
Avatar.displayName = 'Avatar'
