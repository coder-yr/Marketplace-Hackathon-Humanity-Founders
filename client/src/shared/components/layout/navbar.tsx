import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { cn } from '@/shared/utils/cn'
import { Button } from '@/shared/components/ui/button'
import { useThemeContext } from '@/shared/context/theme-context'
import { Sun, Moon, Menu, Search, Hexagon, Bell } from 'lucide-react'
import { motion } from 'framer-motion'

export interface NavItem {
  label: string
  href: string
  icon?: React.ReactNode
  badge?: string
}

export interface NavbarProps extends React.HTMLAttributes<HTMLElement> {
  logoText?: string
  navItems?: NavItem[]
  actions?: React.ReactNode
  onMobileMenuToggle?: () => void
  user?: { name: string; avatar?: string } | null
}

export function Navbar({
  logoText = 'TextileHub',
  navItems = [],
  onMobileMenuToggle,
  user,
  className
}: NavbarProps) {
  const { theme, toggleTheme } = useThemeContext()
  const location = useLocation()
  const [scrolled, setScrolled] = useState(false)

  // Track scroll for sticky elevation
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className={cn(
        'fixed top-0 left-0 right-0 z-[var(--z-sticky)] h-[72px]',
        'px-6',
        'flex items-center justify-between gap-4 transition-all duration-[var(--duration-normal)]',
        scrolled 
          ? 'bg-[var(--surface-0)]/80 backdrop-blur-md shadow-sm border-b border-[var(--border-color)]' 
          : 'bg-[var(--surface-0)] border-b border-[var(--border-color)]',
        className
      )}
    >
      {/* Brand Logo & Main Nav */}
      <div className="flex items-center gap-10">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-8 h-8 rounded-lg bg-[var(--text-primary)] flex items-center justify-center text-[var(--surface-0)] shadow-md group-hover:scale-105 transition-transform">
            <Hexagon className="w-5 h-5 fill-current" />
          </div>
          <span className="font-display font-extrabold text-xl tracking-tight text-[var(--text-primary)]">
            {logoText}
          </span>
        </Link>

        {/* Desktop Links */}
        <nav className="hidden lg:flex items-center gap-2">
          {navItems.map((item) => {
            const isActive = location.pathname === item.href || (item.href !== '/' && location.pathname.startsWith(item.href))
            
            return (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  "relative px-3 py-2 rounded-lg text-sm font-semibold transition-colors flex items-center gap-2 group",
                  isActive ? "text-[var(--text-primary)] bg-[var(--surface-1)]" : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-1)]"
                )}
              >
                {item.icon}
                {item.label}
                {item.badge && (
                  <span className="px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider rounded border border-[var(--border-color-subtle)] bg-[var(--surface-0)] text-[var(--text-primary)]">
                    {item.badge}
                  </span>
                )}
              </Link>
            )
          })}
        </nav>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-3">
        {/* Universal Search Trigger */}
        <button className="hidden md:flex items-center gap-3 px-3 py-1.5 rounded-lg border border-[var(--border-color)] bg-[var(--surface-1)] hover:bg-[var(--surface-2)] text-[var(--text-secondary)] text-sm transition-colors group">
          <Search className="w-4 h-4 group-hover:text-brand-primary transition-colors" />
          <span className="mr-8">Search anything...</span>
          <kbd className="hidden sm:inline-flex items-center justify-center h-5 px-1.5 rounded border border-[var(--border-color)] text-[10px] font-mono bg-[var(--surface-0)] text-[var(--text-secondary)]">
            ⌘K
          </kbd>
        </button>

        <div className="w-px h-6 bg-[var(--border-color)] mx-2 hidden md:block"></div>

        {/* Action Icons */}
        <button className="p-2 rounded-lg text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-1)] transition-colors relative">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-2 w-2 h-2 rounded-full bg-brand-primary border-2 border-[var(--surface-0)]"></span>
        </button>

        <button 
          onClick={toggleTheme}
          className="p-2 rounded-lg text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-1)] transition-colors hidden sm:block"
        >
          {theme === 'dark' ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5" />}
        </button>

        {/* User / Auth */}
        {user ? (
          <button className="flex items-center gap-2 pl-2 pr-3 py-1.5 ml-2 rounded-lg border border-[var(--border-color)] bg-[var(--surface-1)] hover:bg-[var(--surface-2)] transition-colors">
            <div className="w-7 h-7 rounded-md bg-[var(--text-primary)] text-[var(--surface-0)] flex items-center justify-center text-xs font-bold shadow-sm">
              {user.name.charAt(0)}
            </div>
            <span className="text-sm font-semibold text-[var(--text-primary)] hidden sm:block">
              {user.name.split(' ')[0]}
            </span>
          </button>
        ) : (
          <div className="flex items-center gap-2 ml-2">
            <Button variant="ghost" size="sm" className="hidden sm:flex font-semibold">Log in</Button>
            <Button variant="primary" size="sm" className="font-bold shadow-sm">Sign Up</Button>
          </div>
        )}

        {/* Mobile Menu Trigger */}
        <button
          className="lg:hidden p-2 rounded-lg text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-1)] transition-colors"
          onClick={onMobileMenuToggle}
        >
          <Menu className="w-5 h-5" />
        </button>
      </div>
    </motion.header>
  )
}
