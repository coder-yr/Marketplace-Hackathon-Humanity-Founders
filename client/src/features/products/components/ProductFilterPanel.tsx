import { SearchInput } from '@/shared/components/data/search-input'
import { Button } from '@/shared/components/ui/button'
import { Category, ProductFilterParams } from '../types/products.types'
import { Filter, RotateCcw } from 'lucide-react'

interface ProductFilterPanelProps {
  filters: ProductFilterParams
  categories: Category[]
  onChange: (newFilters: ProductFilterParams) => void
  onReset: () => void
}

const FABRIC_TYPES = ['Cotton', 'Silk', 'Wool', 'Polyester', 'Linen', 'Denim']

export function ProductFilterPanel({
  filters,
  categories,
  onChange,
  onReset,
}: ProductFilterPanelProps) {
  const handleSearchChange = (value: string) => {
    onChange({ ...filters, search: value || undefined, page: 1 })
  }

  const handleCategoryChange = (slug: string) => {
    const nextCat = filters.category === slug ? undefined : slug
    onChange({ ...filters, category: nextCat, page: 1 })
  }

  const handleFabricChange = (fabric: string) => {
    const nextFabric = filters.fabricType === fabric ? undefined : fabric
    onChange({ ...filters, fabricType: nextFabric, page: 1 })
  }

  const handleMoqChange = (maxMoq?: number) => {
    onChange({ ...filters, maxMoq, page: 1 })
  }

  const handleStockStatusChange = (status?: string) => {
    const nextStatus = filters.stockStatus === status ? undefined : status
    onChange({ ...filters, stockStatus: nextStatus, page: 1 })
  }

  const hasActiveFilters = Boolean(
    filters.search || filters.category || filters.fabricType || filters.maxMoq || filters.stockStatus
  )

  return (
    <div className="bg-surface-1 border border-border-color rounded-2xl p-5 flex flex-col gap-6 shadow-xs">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border-color/60 pb-4">
        <div className="flex items-center gap-2 text-text-primary font-semibold text-base">
          <Filter className="w-4 h-4 text-brand-primary" />
          <span>Filter Products</span>
        </div>
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onReset}
            className="text-xs text-text-secondary hover:text-brand-primary flex items-center gap-1.5 h-8 px-2"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </Button>
        )}
      </div>

      {/* Search Input */}
      <div>
        <label className="block text-xs font-semibold text-text-primary uppercase tracking-wider mb-2">
          Keyword Search
        </label>
        <SearchInput
          placeholder="Search fabrics, tags, GSM..."
          value={filters.search || ''}
          onChange={(e) => handleSearchChange(e.target.value)}
          onClear={() => handleSearchChange('')}
        />
      </div>

      {/* Categories */}
      <div>
        <label className="block text-xs font-semibold text-text-primary uppercase tracking-wider mb-2.5">
          Categories
        </label>
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => {
            const isSelected = filters.category === cat.slug
            return (
              <button
                key={cat._id}
                onClick={() => handleCategoryChange(cat.slug)}
                className={`text-xs px-3 py-1.5 rounded-xl border font-medium transition-all duration-200 ${
                  isSelected
                    ? 'bg-brand-primary text-white border-brand-primary shadow-xs'
                    : 'bg-surface-2 text-text-secondary border-border-color hover:border-brand-primary/40 hover:text-text-primary'
                }`}
              >
                {cat.name}
              </button>
            )
          })}
        </div>
      </div>

      {/* Fabric Types */}
      <div>
        <label className="block text-xs font-semibold text-text-primary uppercase tracking-wider mb-2.5">
          Fabric Type
        </label>
        <div className="flex flex-wrap gap-2">
          {FABRIC_TYPES.map((fabric) => {
            const isSelected = filters.fabricType === fabric
            return (
              <button
                key={fabric}
                onClick={() => handleFabricChange(fabric)}
                className={`text-xs px-3 py-1.5 rounded-xl border font-medium transition-all duration-200 ${
                  isSelected
                    ? 'bg-brand-primary text-white border-brand-primary shadow-xs'
                    : 'bg-surface-2 text-text-secondary border-border-color hover:border-brand-primary/40 hover:text-text-primary'
                }`}
              >
                {fabric}
              </button>
            )
          })}
        </div>
      </div>

      {/* Max MOQ Filter */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="block text-xs font-semibold text-text-primary uppercase tracking-wider">
            Max MOQ Requirement
          </label>
          <span className="text-xs font-bold text-brand-primary">
            {filters.maxMoq ? `< ${filters.maxMoq} meters` : 'Any'}
          </span>
        </div>
        <div className="grid grid-cols-4 gap-1.5">
          {[100, 300, 500, 1000].map((val) => (
            <button
              key={val}
              onClick={() => handleMoqChange(filters.maxMoq === val ? undefined : val)}
              className={`text-xs py-1.5 rounded-lg border font-medium transition-all ${
                filters.maxMoq === val
                  ? 'bg-brand-primary text-white border-brand-primary'
                  : 'bg-surface-2 text-text-secondary border-border-color hover:border-brand-primary/40'
              }`}
            >
              ≤ {val}m
            </button>
          ))}
        </div>
      </div>

      {/* Availability / Stock Status */}
      <div>
        <label className="block text-xs font-semibold text-text-primary uppercase tracking-wider mb-2.5">
          Stock Status
        </label>
        <div className="flex gap-2">
          <button
            onClick={() => handleStockStatusChange('in_stock')}
            className={`flex-1 text-xs py-2 rounded-xl border font-medium transition-all ${
              filters.stockStatus === 'in_stock'
                ? 'bg-brand-primary text-white border-brand-primary'
                : 'bg-surface-2 text-text-secondary border-border-color hover:border-brand-primary/40'
            }`}
          >
            In Stock
          </button>
          <button
            onClick={() => handleStockStatusChange('made_to_order')}
            className={`flex-1 text-xs py-2 rounded-xl border font-medium transition-all ${
              filters.stockStatus === 'made_to_order'
                ? 'bg-brand-primary text-white border-brand-primary'
                : 'bg-surface-2 text-text-secondary border-border-color hover:border-brand-primary/40'
            }`}
          >
            Made to Order
          </button>
        </div>
      </div>
    </div>
  )
}
