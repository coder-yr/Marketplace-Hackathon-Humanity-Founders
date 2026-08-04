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
    <div className="bg-white rounded-[24px] flex flex-col gap-8 shadow-none h-full">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-4">
        <div className="flex items-center gap-2 text-[#0A2540] font-bold text-[18px]">
          <Filter className="w-5 h-5 text-[#0066FF]" />
          <span>Filters</span>
        </div>
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onReset}
            className="text-[13px] text-[#64748B] hover:text-[#0A2540] hover:bg-[#F8FAFC] flex items-center gap-1.5 h-8 px-2"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </Button>
        )}
      </div>

      {/* Search Input */}
      <div>
        <label className="block text-[10px] font-bold text-[#94A3B8] uppercase tracking-widest mb-3">
          Keyword Search
        </label>
        <SearchInput
          placeholder="Search fabrics, tags..."
          value={filters.search || ''}
          onChange={(e) => handleSearchChange(e.target.value)}
          onClear={() => handleSearchChange('')}
        />
      </div>

      {/* Categories */}
      <div>
        <label className="block text-[10px] font-bold text-[#94A3B8] uppercase tracking-widest mb-3">
          Categories
        </label>
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => {
            const isSelected = filters.category === cat.slug
            return (
              <button
                key={cat._id}
                onClick={() => handleCategoryChange(cat.slug)}
                className={`text-[12px] px-3 py-1.5 rounded-[8px] font-bold transition-all duration-200 border ${
                  isSelected
                    ? 'bg-[#0066FF] text-white border-[#0066FF]'
                    : 'bg-[#F8FAFC] text-[#64748B] border-[#E2E8F0] hover:border-[#0066FF]/30 hover:text-[#0A2540]'
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
        <label className="block text-[10px] font-bold text-[#94A3B8] uppercase tracking-widest mb-3">
          Fabric Type
        </label>
        <div className="flex flex-wrap gap-2">
          {FABRIC_TYPES.map((fabric) => {
            const isSelected = filters.fabricType === fabric
            return (
              <button
                key={fabric}
                onClick={() => handleFabricChange(fabric)}
                className={`text-[12px] px-3 py-1.5 rounded-[8px] font-bold transition-all duration-200 border ${
                  isSelected
                    ? 'bg-[#0066FF] text-white border-[#0066FF]'
                    : 'bg-[#F8FAFC] text-[#64748B] border-[#E2E8F0] hover:border-[#0066FF]/30 hover:text-[#0A2540]'
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
        <div className="flex items-center justify-between mb-3">
          <label className="block text-[10px] font-bold text-[#94A3B8] uppercase tracking-widest">
            Max MOQ Requirement
          </label>
          <span className="text-[10px] font-bold text-[#0066FF] bg-[#0066FF]/10 px-2 py-0.5 rounded-[4px]">
            {filters.maxMoq ? `< ${filters.maxMoq} meters` : 'Any'}
          </span>
        </div>
        <div className="grid grid-cols-4 gap-1.5">
          {[100, 300, 500, 1000].map((val) => (
            <button
              key={val}
              onClick={() => handleMoqChange(filters.maxMoq === val ? undefined : val)}
              className={`text-[11px] py-1.5 rounded-[8px] border font-bold transition-all ${
                filters.maxMoq === val
                  ? 'bg-[#0066FF] text-white border-[#0066FF]'
                  : 'bg-[#F8FAFC] text-[#64748B] border-[#E2E8F0] hover:border-[#0066FF]/30 hover:text-[#0A2540]'
              }`}
            >
              ≤ {val}m
            </button>
          ))}
        </div>
      </div>

      {/* Availability / Stock Status */}
      <div>
        <label className="block text-[10px] font-bold text-[#94A3B8] uppercase tracking-widest mb-3">
          Stock Status
        </label>
        <div className="flex gap-2">
          <button
            onClick={() => handleStockStatusChange('in_stock')}
            className={`flex-1 text-[12px] py-2 rounded-[10px] border font-bold transition-all ${
              filters.stockStatus === 'in_stock'
                ? 'bg-[#0A2540] text-white border-[#0A2540]'
                : 'bg-[#F8FAFC] text-[#64748B] border-[#E2E8F0] hover:border-[#0A2540]/30 hover:text-[#0A2540]'
            }`}
          >
            In Stock
          </button>
          <button
            onClick={() => handleStockStatusChange('made_to_order')}
            className={`flex-1 text-[12px] py-2 rounded-[10px] border font-bold transition-all ${
              filters.stockStatus === 'made_to_order'
                ? 'bg-[#0A2540] text-white border-[#0A2540]'
                : 'bg-[#F8FAFC] text-[#64748B] border-[#E2E8F0] hover:border-[#0A2540]/30 hover:text-[#0A2540]'
            }`}
          >
            Made to Order
          </button>
        </div>
      </div>
    </div>
  )
}
