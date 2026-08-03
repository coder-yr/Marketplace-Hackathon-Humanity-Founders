import { forwardRef } from 'react'
import { cn } from '@/shared/utils/cn'

type ContainerSize = 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full'

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: ContainerSize
  /** Remove horizontal padding */
  flush?: boolean
}

const sizeMap: Record<ContainerSize, string> = {
  sm:   'max-w-[640px]',
  md:   'max-w-[768px]',
  lg:   'max-w-[1024px]',
  xl:   'max-w-[1280px]',
  '2xl':'max-w-[1400px]',
  full: 'max-w-full',
}

/**
 * Centers content horizontally with responsive padding.
 * Use this as the outer wrapper for all page content.
 */
export const Container = forwardRef<HTMLDivElement, ContainerProps>(
  ({ size = 'xl', flush = false, className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'mx-auto w-full',
          sizeMap[size],
          !flush && 'px-4 sm:px-6 lg:px-8',
          className,
        )}
        {...props}
      >
        {children}
      </div>
    )
  },
)
Container.displayName = 'Container'
