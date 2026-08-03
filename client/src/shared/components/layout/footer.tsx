import React from 'react'
import { Link } from 'react-router-dom'
import { cn } from '@/shared/utils/cn'
import { Container } from './container'
import { Hexagon, Globe, Shield, Activity } from 'lucide-react'

export interface FooterColumn {
  title: string
  links: { label: string; href: string; badge?: string }[]
}

export interface FooterProps extends React.HTMLAttributes<HTMLElement> {
  columns?: FooterColumn[]
  copyright?: string
}

export function Footer({
  columns = [
    {
      title: 'Procurement',
      links: [
        { label: 'Browse Materials', href: '#' },
        { label: 'Global Suppliers', href: '#' },
        { label: 'Eco-Certifications', href: '#' },
        { label: 'Bulk RFQs', href: '#' },
      ],
    },
    {
      title: 'AI Platform',
      links: [
        { label: 'Semantic Matching', href: '#' },
        { label: 'Automated Quoting', href: '#' },
        { label: 'Price Trends', href: '#', badge: 'New' },
        { label: 'Market Insights', href: '#' },
      ],
    },
    {
      title: 'Enterprise',
      links: [
        { label: 'Supplier Portal', href: '#' },
        { label: 'API Access', href: '#' },
        { label: 'Trust & Safety', href: '#' },
        { label: 'Contact Sales', href: '#' },
      ],
    },
  ],
  copyright = '© 2026 TextileHub Inc. All rights reserved.',
  className,
  ...props
}: FooterProps) {
  return (
    <footer
      className={cn(
        'bg-[var(--surface-0)] border-t border-[var(--border-color)] mt-auto pt-16 pb-8',
        className
      )}
      {...props}
    >
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-16">
          {/* Brand & System Status */}
          <div className="lg:col-span-2 flex flex-col justify-between">
            <div className="space-y-5">
              <div className="flex items-center gap-3 group">
                <div className="w-8 h-8 rounded-lg bg-[var(--text-primary)] flex items-center justify-center text-[var(--surface-0)] shadow-md">
                  <Hexagon className="w-5 h-5 fill-current" />
                </div>
                <span className="font-display font-extrabold text-xl tracking-tight text-[var(--text-primary)]">
                  TextileHub
                </span>
              </div>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed max-w-sm">
                The global standard for AI-powered B2B textile procurement. Source verified materials at enterprise scale.
              </p>
            </div>
            
            <div className="mt-8 flex flex-col gap-3">
              <div className="flex items-center gap-2 text-xs font-semibold text-[var(--text-secondary)]">
                <Activity className="w-4 h-4 text-emerald-500" />
                All Systems Operational
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-[var(--text-secondary)]">
                <Globe className="w-4 h-4 text-[var(--text-tertiary)]" />
                Global Supplier Network
              </div>
            </div>
          </div>

          {/* Columns */}
          {columns.map((col, i) => (
            <div key={i} className="space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--text-primary)]">
                {col.title}
              </h4>
              <ul className="space-y-3">
                {col.links.map((link, j) => (
                  <li key={j}>
                    <Link
                      to={link.href}
                      className="text-sm text-[var(--text-secondary)] hover:text-brand-primary transition-colors flex items-center gap-2"
                    >
                      {link.label}
                      {link.badge && (
                        <span className="px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider rounded border border-[var(--color-brand-primary)]/30 bg-brand-primary/5 text-brand-primary">
                          {link.badge}
                        </span>
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[var(--border-color)] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-medium text-[var(--text-tertiary)]">
          <p>{copyright}</p>
          <div className="flex items-center gap-6">
            <Link to="#" className="hover:text-[var(--text-primary)] transition-colors">Privacy Policy</Link>
            <Link to="#" className="hover:text-[var(--text-primary)] transition-colors">Terms of Service</Link>
            <Link to="#" className="flex items-center gap-1.5 hover:text-[var(--text-primary)] transition-colors">
              <Shield className="w-3.5 h-3.5" /> Security & Trust
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  )
}
