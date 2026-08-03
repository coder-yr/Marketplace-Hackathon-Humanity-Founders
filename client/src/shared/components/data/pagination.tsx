import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react'
import { cn } from '@/shared/utils/cn'

export interface PaginationProps {
  /** Current page (1-indexed) */
  page: number
  /** Total number of pages */
  totalPages: number
  /** Items per page */
  pageSize?: number
  /** Total item count */
  total?: number
  onPageChange: (page: number) => void
  onPageSizeChange?: (size: number) => void
  pageSizeOptions?: number[]
  /** Show first/last buttons */
  showEdgeButtons?: boolean
  /** Show page size selector */
  showPageSize?: boolean
  className?: string
  disabled?: boolean
}

function PageButton({
  children,
  onClick,
  active = false,
  disabled = false,
  label,
}: {
  children: React.ReactNode
  onClick: () => void
  active?: boolean
  disabled?: boolean
  label?: string
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      aria-current={active ? 'page' : undefined}
      className={cn(
        'w-9 h-9 rounded-lg flex items-center justify-center text-sm font-medium',
        'transition-all duration-[var(--duration-fast)]',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand-primary)]',
        active
          ? 'bg-[var(--color-brand-primary)] text-white shadow-sm'
          : 'text-[var(--text-secondary)] hover:bg-[var(--surface-3)] hover:text-[var(--text-primary)]',
        disabled && 'opacity-40 cursor-not-allowed pointer-events-none',
      )}
    >
      {children}
    </button>
  )
}

function getPageRange(current: number, total: number): (number | '...')[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1)

  const pages: (number | '...')[] = []
  const delta = 2

  pages.push(1)
  if (current - delta > 2) pages.push('...')
  for (let i = Math.max(2, current - delta); i <= Math.min(total - 1, current + delta); i++) {
    pages.push(i)
  }
  if (current + delta < total - 1) pages.push('...')
  pages.push(total)

  return pages
}

/**
 * Full pagination control with page numbers, first/last, optional page size selector.
 */
export function Pagination({
  page,
  totalPages,
  pageSize = 10,
  total,
  onPageChange,
  onPageSizeChange,
  pageSizeOptions = [10, 25, 50, 100],
  showEdgeButtons = true,
  showPageSize = false,
  className,
  disabled = false,
}: PaginationProps) {
  const pages = getPageRange(page, totalPages)

  return (
    <div
      className={cn(
        'flex flex-wrap items-center justify-between gap-4',
        disabled && 'opacity-50 pointer-events-none',
        className,
      )}
      role="navigation"
      aria-label="Pagination"
    >
      {/* Page size + count info */}
      <div className="flex items-center gap-3 text-sm text-[var(--text-secondary)]">
        {total !== undefined && (
          <span>
            Showing{' '}
            <span className="font-medium text-[var(--text-primary)]">
              {Math.min((page - 1) * pageSize + 1, total)}–{Math.min(page * pageSize, total)}
            </span>{' '}
            of{' '}
            <span className="font-medium text-[var(--text-primary)]">{total.toLocaleString()}</span>
          </span>
        )}
        {showPageSize && onPageSizeChange && (
          <select
            value={pageSize}
            onChange={(e) => onPageSizeChange(Number(e.target.value))}
            className="h-8 px-2 text-sm rounded-lg border border-[var(--border-color)] bg-[var(--surface-2)] text-[var(--text-primary)] outline-none focus:border-[var(--color-brand-primary)]"
            aria-label="Items per page"
          >
            {pageSizeOptions.map((s) => (
              <option key={s} value={s}>{s} / page</option>
            ))}
          </select>
        )}
      </div>

      {/* Page buttons */}
      <div className="flex items-center gap-1" role="group" aria-label="Page navigation">
        {showEdgeButtons && (
          <PageButton
            onClick={() => onPageChange(1)}
            disabled={page === 1}
            label="First page"
          >
            <ChevronsLeft size={16} />
          </PageButton>
        )}

        <PageButton
          onClick={() => onPageChange(page - 1)}
          disabled={page === 1}
          label="Previous page"
        >
          <ChevronLeft size={16} />
        </PageButton>

        {pages.map((p, i) =>
          p === '...' ? (
            <span key={`ellipsis-${i}`} className="w-9 h-9 flex items-center justify-center text-sm text-[var(--text-muted)]">
              ···
            </span>
          ) : (
            <PageButton
              key={p}
              onClick={() => onPageChange(p)}
              active={p === page}
              label={`Page ${p}`}
            >
              {p}
            </PageButton>
          ),
        )}

        <PageButton
          onClick={() => onPageChange(page + 1)}
          disabled={page === totalPages}
          label="Next page"
        >
          <ChevronRight size={16} />
        </PageButton>

        {showEdgeButtons && (
          <PageButton
            onClick={() => onPageChange(totalPages)}
            disabled={page === totalPages}
            label="Last page"
          >
            <ChevronsRight size={16} />
          </PageButton>
        )}
      </div>
    </div>
  )
}
