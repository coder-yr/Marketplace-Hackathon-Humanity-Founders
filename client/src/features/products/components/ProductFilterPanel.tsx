import { SearchInput } from '@/shared/components/data/search-input'
import { Button } from '@/shared/components/ui/button'
import { Category, ProductFilterParams } from '../types/products.types'
import { Filter, RotateCcw, Bookmark, ChevronDown } from 'lucide-react'

interface ProductFilterPanelProps {
  filters: ProductFilterParams
  categories: Category[]
  onChange: (newFilters: ProductFilterParams) => void
  onReset: () => void
}

const FABRIC_TYPES = ['Cotton', 'Silk', 'Wool', 'Polyester', 'Linen', 'Denim']
const PRESETS = ['Luxury Apparel', 'Organic Cotton', 'Hotel Linen', 'Technical Textile', 'Premium Denim']

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
    <div className="bg-white flex flex-col gap-8 shadow-none h-full">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-4">
        <div className="flex items-center gap-2 text-[#0A2540] font-bold text-[16px]">
          <Filter className="w-4 h-4 text-[#0066FF]" />
          <span>Procurement Filters</span>
        </div>
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onReset}
            className="text-[12px] font-bold text-[#64748B] hover:text-[#0066FF] flex items-center gap-1.5 h-7 px-2"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset</span>
          </Button>
        )}
      </div>

      <div className="flex flex-col gap-6">
        
        {/* Keyword Search */}
        <div>
          <label className="block text-[10px] font-bold text-[#94A3B8] uppercase tracking-widest mb-3">
            Keyword Search
          </label>
          <SearchInput
            placeholder="Search specs, tags..."
            value={filters.search || ''}
            onChange={(e) => handleSearchChange(e.target.value)}
            onClear={() => handleSearchChange('')}
          />
        </div>

        {/* Enterprise Group: Material */}
        <div className="border-t border-[#F1F5F9] pt-4">
          <label className="block text-[12px] font-bold text-[#0A2540] mb-3">Material & Composition</label>
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => {
              const isSelected = filters.category === cat.slug
              return (
                <button
                  key={cat._id}
                  onClick={() => handleCategoryChange(cat.slug)}
                  className={`text-[11px] px-3 py-1.5 rounded-[8px] font-bold transition-all border ${
                    isSelected
                      ? 'bg-[#0A2540] text-white border-[#0A2540]'
                      : 'bg-white text-[#64748B] border-[#E2E8F0] hover:border-[#0A2540] hover:text-[#0A2540]'
                  }`}
                >
                  {cat.name}
                </button>
              )
            })}
          </div>
          
          <div className="flex flex-wrap gap-2 mt-3">
            {FABRIC_TYPES.map((fabric) => {
              const isSelected = filters.fabricType === fabric
              return (
                <button
                  key={fabric}
                  onClick={() => handleFabricChange(fabric)}
                  className={`text-[11px] px-3 py-1.5 rounded-[8px] font-bold transition-all border ${
                    isSelected
                      ? 'bg-[#0066FF] text-white border-[#0066FF]'
                      : 'bg-[#F8FAFC] text-[#64748B] border-[#E2E8F0] hover:border-[#0066FF]/50 hover:text-[#0066FF]'
                  }`}
                >
                  {fabric}
                </button>
              )
            })}
          </div>
        </div>

        {/* Enterprise Group: Logistics & MOQ */}
        <div className="border-t border-[#F1F5F9] pt-4">
          <label className="block text-[12px] font-bold text-[#0A2540] mb-3">Logistics & Constraints</label>
          
          <div className="mb-4">
            <span className="block text-[10px] font-bold text-[#94A3B8] uppercase tracking-widest mb-2">Maximum MOQ</span>
            <div className="grid grid-cols-4 gap-1.5">
              {[100, 300, 500, 1000].map((val) => (
                <button
                  key={val}
                  onClick={() => handleMoqChange(filters.maxMoq === val ? undefined : val)}
                  className={`text-[11px] py-1.5 rounded-[8px] border font-bold transition-all ${
                    filters.maxMoq === val
                      ? 'bg-[#0066FF] text-white border-[#0066FF]'
                      : 'bg-white text-[#64748B] border-[#E2E8F0] hover:border-[#0066FF]/50'
                  }`}
                >
                  ≤ {val}m
                </button>
              ))}
            </div>
          </div>

          <div>
            <span className="block text-[10px] font-bold text-[#94A3B8] uppercase tracking-widest mb-2">Availability</span>
            <div className="flex gap-2">
              <button
                onClick={() => handleStockStatusChange('in_stock')}
                className={`flex-1 text-[11px] py-1.5 rounded-[8px] border font-bold transition-all ${
                  filters.stockStatus === 'in_stock'
                    ? 'bg-[#16A34A] text-white border-[#16A34A]'
                    : 'bg-white text-[#64748B] border-[#E2E8F0] hover:border-[#16A34A]/50'
                }`}
              >
                In Stock Now
              </button>
              <button
                onClick={() => handleStockStatusChange('made_to_order')}
                className={`flex-1 text-[11px] py-1.5 rounded-[8px] border font-bold transition-all ${
                  filters.stockStatus === 'made_to_order'
                    ? 'bg-[#F59E0B] text-white border-[#F59E0B]'
                    : 'bg-white text-[#64748B] border-[#E2E8F0] hover:border-[#F59E0B]/50'
                }`}
              >
                Made to Order
              </button>
            </div>
          </div>
        </div>

        {/* Collapsed Enterprise Groups (UI placeholders for hackathon) */}
        <div className="border-t border-[#F1F5F9] pt-4 flex flex-col gap-2">
          {['Supplier Trust & Rating', 'Certifications & Sustainability', 'Export Markets & Capacity'].map(label => (
            <button key={label} className="flex items-center justify-between py-2 text-[12px] font-bold text-[#0A2540] hover:text-[#0066FF] transition-colors">
              {label}
              <ChevronDown className="w-4 h-4 text-[#94A3B8]" />
            </button>
          ))}
        </div>

        {/* Saved Procurement Presets */}
        <div className="border-t border-[#E2E8F0] pt-6 mt-2">
          <div className="flex items-center gap-2 text-[#0A2540] font-bold text-[14px] mb-4">
            <Bookmark className="w-4 h-4 text-[#8B5CF6]" />
            <span>Saved Presets</span>
          </div>
          
          <div className="flex flex-col gap-2">
            {PRESETS.map((preset) => (
              <button key={preset} className="text-left px-3 py-2.5 rounded-[8px] border border-[#E2E8F0] bg-[#F8FAFC] hover:bg-white hover:border-[#0066FF] hover:shadow-sm transition-all text-[12px] font-bold text-[#64748B] hover:text-[#0066FF]">
                {preset}
              </button>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}
