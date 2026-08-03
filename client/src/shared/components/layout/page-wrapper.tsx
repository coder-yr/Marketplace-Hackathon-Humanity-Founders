import { forwardRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { pageVariants } from '@/shared/animations'
import { cn } from '@/shared/utils/cn'

interface PageWrapperProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Animate page entry */
  animate?: boolean
  /** Add top padding to account for fixed navbar */
  withNavbar?: boolean
}

/**
 * Full-page wrapper that handles entry animations and navbar spacing.
 * Use as the root element of every page component.
 */
export const PageWrapper = forwardRef<HTMLDivElement, PageWrapperProps>(
  ({ animate = true, withNavbar = true, className, children, ...props }, ref) => {
    const content = (
      <div
        ref={ref}
        className={cn(
          'min-h-screen flex flex-col',
          withNavbar && 'pt-[var(--navbar-height)]',
          className,
        )}
        {...props}
      >
        {children}
      </div>
    )

    if (!animate) return content

    return (
      <AnimatePresence mode="wait">
        <motion.div
          key={typeof window !== 'undefined' ? window.location.pathname : 'page'}
          variants={pageVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className={cn(
            'min-h-screen flex flex-col',
            withNavbar && 'pt-[var(--navbar-height)]',
            className,
          )}
          {...(props as object)}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    )
  },
)
PageWrapper.displayName = 'PageWrapper'
