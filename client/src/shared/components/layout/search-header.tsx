import React from 'react'
import { cn } from '@/shared/utils/cn'
import { Container } from './container'
import { SearchInput } from '@/shared/components/data/search-input'
import { Sparkles } from 'lucide-react'

export interface SearchHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string
  subtitle?: string
  placeholder?: string
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  onSearch?: (value: string) => void
  onClear?: () => void
  aiEnabled?: boolean
}

export function SearchHeader({
  title = 'Find Quality Fabrics & Suppliers',
  subtitle = 'Search by material composition, weave type, GSM weight, or AI semantic natural language.',
  placeholder = 'Try searching "100% organic cotton 200 GSM for summer dresses"...',
  value,
  onChange,
  onClear,
  aiEnabled = true,
  className,
  ...props
}: SearchHeaderProps) {
  return (
    <div
      className={cn(
        'relative bg-[var(--surface-2)] border-b border-[var(--border-color)] py-12 md:py-16 overflow-hidden',
        className
      )}
      {...props}
    >
      <div className="absolute top-0 right-0 -mr-16 -mt-16 w-96 h-96 rounded-full bg-[var(--color-brand-primary)]/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-96 h-96 rounded-full bg-[var(--color-brand-secondary)]/10 blur-3xl pointer-events-none" />

      <Container size="lg" className="relative z-10 text-center space-y-6">
        <div className="space-y-2 max-w-2xl mx-auto">
          {aiEnabled && (
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[var(--color-brand-secondary)]/15 text-[var(--color-brand-secondary)] border border-[var(--color-brand-secondary)]/20 mb-2">
              <Sparkles size={14} /> AI Powered Semantic Search
            </div>
          )}
          <h1 className="text-3xl md:text-4xl font-display font-extrabold text-[var(--text-primary)] tracking-tight">
            {title}
          </h1>
          <p className="text-base text-[var(--text-secondary)]">
            {subtitle}
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <SearchInput
            inputSize="lg"
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            onClear={onClear}
            className="shadow-xl"
          />
        </div>
      </Container>
    </div>
  )
}
