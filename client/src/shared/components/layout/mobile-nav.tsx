import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { Button } from '@/shared/components/ui/button'
import { drawerRightVariants, overlayVariants } from '@/shared/animations'
import type { NavItem } from './navbar'

export interface MobileNavProps {
  isOpen: boolean
  onClose: () => void
  navItems: NavItem[]
  logoText?: string
}

export function MobileNav({
  isOpen,
  onClose,
  navItems,
  logoText = 'TexMarket',
}: MobileNavProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[var(--z-modal)] md:hidden flex justify-end">
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 overlay-bg"
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={onClose}
          />

          {/* Sliding Panel */}
          <motion.aside
            className="relative w-4/5 max-w-xs h-full bg-[var(--surface-2)] border-l border-[var(--border-color)] p-6 flex flex-col justify-between shadow-2xl z-10"
            variants={drawerRightVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-[var(--border-color)]">
                <span className="font-display font-bold text-lg text-[var(--text-primary)]">
                  {logoText}
                </span>
                <Button variant="ghost" size="sm" iconOnly onClick={onClose} aria-label="Close menu">
                  <X size={20} />
                </Button>
              </div>

              <nav className="mt-6 flex flex-col gap-2">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    to={item.href}
                    onClick={onClose}
                    className="flex items-center justify-between p-3 rounded-lg text-base font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-3)] transition-colors"
                  >
                    <span className="flex items-center gap-3">
                      {item.icon}
                      {item.label}
                    </span>
                    {item.badge && (
                      <span className="px-2 py-0.5 text-xs font-semibold rounded-full bg-[var(--color-brand-primary)]/20 text-[var(--color-brand-primary)]">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                ))}
              </nav>
            </div>

            <div className="pt-6 border-t border-[var(--border-color)] flex flex-col gap-3">
              <Button variant="primary" fullWidth onClick={onClose}>
                Sign In
              </Button>
            </div>
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  )
}
