import { useState } from 'react'
import { ProductFilterParams, Category } from '../types/products.types'
import { ChevronRight } from 'lucide-react'

interface ProductFilterPanelProps {
  filters: ProductFilterParams
  categories: Category[]
  onChange: (newFilters: ProductFilterParams) => void
  onReset: () => void
}

const COMPOSITION_TYPES = ['Cotton', 'Silk', 'Wool', 'Polyester', 'Linen', 'Denim']
const PRESETS = ['Luxury Apparel', 'Organic Cotton', 'Hotel Linen']

export function ProductFilterPanel({
  filters,
  onChange,
  onReset,
}: ProductFilterPanelProps) {
  const [selectedComposition, setSelectedComposition] = useState<string>('Cotton')
  const [verifiedOnly, setVerifiedOnly] = useState<boolean>(true)
  const [platinumOnly, setPlatinumOnly] = useState<boolean>(false)
  const [moqValue, setMoqValue] = useState<number>(5000)

  const handleCompositionClick = (comp: string) => {
    setSelectedComposition(comp)
    onChange({ ...filters, fabricType: comp, page: 1 })
  }

  const handleMoqChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value)
    setMoqValue(val)
    onChange({ ...filters, maxMoq: val, page: 1 })
  }

  return (
    <div className="bg-white flex flex-col gap-6 h-full text-[#0A2540]">
      
      {/* Header */}
      <div className="flex items-center justify-between pb-2 border-b border-[#F1F5F9]">
        <span className="text-[11px] font-black tracking-widest text-[#94A3B8] uppercase">FILTERS</span>
        <button
          onClick={() => {
            setSelectedComposition('Cotton')
            setVerifiedOnly(true)
            setPlatinumOnly(false)
            setMoqValue(5000)
            onReset()
          }}
          className="text-[12px] font-bold text-[#2563EB] hover:underline"
        >
          Clear All
        </button>
      </div>

      {/* 1. Composition */}
      <div>
        <h4 className="text-[13px] font-bold text-[#0A2540] mb-3">Composition</h4>
        <div className="flex flex-wrap gap-2">
          {COMPOSITION_TYPES.map((comp) => {
            const isActive = selectedComposition === comp
            return (
              <button
                key={comp}
                onClick={() => handleCompositionClick(comp)}
                className={`text-[12px] font-bold px-3.5 py-1.5 rounded-full transition-all ${
                  isActive
                    ? 'bg-[#2563EB] text-white shadow-sm'
                    : 'bg-[#F1F5F9] text-[#64748B] hover:bg-[#E2E8F0] hover:text-[#0A2540]'
                }`}
              >
                {comp}
              </button>
            )
          })}
        </div>
      </div>

      {/* 2. Supplier Trust */}
      <div className="border-t border-[#F1F5F9] pt-5">
        <h4 className="text-[13px] font-bold text-[#0A2540] mb-3">Supplier Trust</h4>
        <div className="flex flex-col gap-2.5">
          <label className="flex items-center gap-2.5 cursor-pointer text-[13px] font-medium text-[#334155]">
            <input 
              type="checkbox" 
              checked={verifiedOnly} 
              onChange={(e) => setVerifiedOnly(e.target.checked)}
              className="w-4 h-4 rounded border-[#CBD5E1] text-[#2563EB] focus:ring-[#2563EB]" 
            />
            <span className="font-semibold text-[#0A2540]">Verified Only</span>
          </label>
          
          <label className="flex items-center gap-2.5 cursor-pointer text-[13px] font-medium text-[#334155]">
            <input 
              type="checkbox" 
              checked={platinumOnly} 
              onChange={(e) => setPlatinumOnly(e.target.checked)}
              className="w-4 h-4 rounded border-[#CBD5E1] text-[#2563EB] focus:ring-[#2563EB]" 
            />
            <span className="font-medium text-[#64748B]">Top 1% Platinum</span>
          </label>
        </div>
      </div>

      {/* 3. MOQ Requirement */}
      <div className="border-t border-[#F1F5F9] pt-5">
        <div className="flex items-center justify-between mb-2">
          <h4 className="text-[13px] font-bold text-[#0A2540]">MOQ Requirement</h4>
          <span className="text-[12px] font-bold text-[#2563EB]">{moqValue.toLocaleString()}m</span>
        </div>
        <input 
          type="range" 
          min="0" 
          max="10000" 
          step="250"
          value={moqValue}
          onChange={handleMoqChange}
          className="w-full h-2 bg-[#E2E8F0] rounded-lg appearance-none cursor-pointer accent-[#2563EB]" 
        />
        <div className="flex items-center justify-between text-[10px] font-bold text-[#94A3B8] mt-1.5">
          <span>0m</span>
          <span>10,000m</span>
        </div>
      </div>

      {/* 4. PROCUREMENT PRESETS */}
      <div className="border-t border-[#F1F5F9] pt-5 mt-auto">
        <span className="block text-[11px] font-black tracking-widest text-[#94A3B8] uppercase mb-3">PROCUREMENT PRESETS</span>
        <div className="flex flex-col gap-2">
          {PRESETS.map((preset) => (
            <button
              key={preset}
              onClick={() => {
                setSelectedComposition('Cotton')
                onChange({ ...filters, search: preset, page: 1 })
              }}
              className="w-full flex items-center justify-between p-3 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] hover:bg-white hover:border-[#2563EB] hover:shadow-sm transition-all text-left text-[13px] font-bold text-[#0A2540]"
            >
              <span>{preset}</span>
              <ChevronRight className="w-4 h-4 text-[#94A3B8]" />
            </button>
          ))}
        </div>
      </div>

    </div>
  )
}
