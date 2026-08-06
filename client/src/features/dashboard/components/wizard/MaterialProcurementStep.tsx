import { useProductWizardStore } from '../../store/useProductWizardStore'
import { Input } from '@/shared/components/ui/input'

export function MaterialProcurementStep() {
  const { draft, updateDraft } = useProductWizardStore()

  const updatePrice = (field: 'min' | 'max', value: number) => {
    updateDraft({
      priceRange: { ...(draft.priceRange || { min: 0, max: 0, currency: 'USD', unit: 'meter' }), [field]: value }
    })
  }

  const updateMoq = (value: number) => {
    updateDraft({
      moq: { ...(draft.moq || { value: 1, unit: 'meters' }), value }
    })
  }

  const updateSpec = (key: string, value: string) => {
    updateDraft({
      specifications: { ...(draft.specifications || {}), [key]: value }
    })
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-[20px] font-display font-bold text-[#0A2540] mb-1">Procurement Information</h2>
        <p className="text-[14px] text-[#64748B] font-medium">Set pricing, order quantities, and shipping details for B2B buyers.</p>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-1.5">
          <label className="text-[#0A2540] font-bold text-[13px] block">Minimum Order Quantity (MOQ) <span className="text-red-500">*</span></label>
          <div className="flex">
            <Input 
              type="number"
              placeholder="e.g. 500" 
              value={draft.moq?.value || ''}
              onChange={(e) => updateMoq(Number(e.target.value))}
              className="bg-[#F8FAFC] border-[#E2E8F0] focus:bg-white rounded-r-none z-10"
            />
            <span className="inline-flex items-center px-4 rounded-r-[8px] border border-l-0 border-[#E2E8F0] bg-[#F1F5F9] text-[#64748B] text-[13px] font-bold">
              meters
            </span>
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-[#0A2540] font-bold text-[13px] block">Lead Time <span className="text-red-500">*</span></label>
          <Input 
            placeholder="e.g. 3-4 Weeks" 
            value={draft.leadTime || ''}
            onChange={(e) => updateDraft({ leadTime: e.target.value })}
            className="bg-[#F8FAFC] border-[#E2E8F0] focus:bg-white"
          />
        </div>
      </div>

      <div className="bg-[#F8FAFC] p-5 rounded-[12px] border border-[#E2E8F0] space-y-4">
        <h3 className="text-[14px] font-bold text-[#0A2540] flex items-center gap-2">
          Pricing
          <span className="bg-[#E2E8F0] text-[#475569] text-[10px] px-2 py-0.5 rounded-full uppercase tracking-wider">Per Meter</span>
        </h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-[#475569] font-bold text-[12px] block">Min Price (USD)</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8] font-bold">$</span>
              <Input 
                type="number"
                placeholder="e.g. 4.50" 
                value={draft.priceRange?.min || ''}
                onChange={(e) => updatePrice('min', Number(e.target.value))}
                className="bg-white border-[#E2E8F0] pl-7"
              />
            </div>
          </div>
          <div className="space-y-1.5">
            <label className="text-[#475569] font-bold text-[12px] block">Max Price (USD)</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8] font-bold">$</span>
              <Input 
                type="number"
                placeholder="e.g. 6.00" 
                value={draft.priceRange?.max || ''}
                onChange={(e) => updatePrice('max', Number(e.target.value))}
                className="bg-white border-[#E2E8F0] pl-7"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-1.5">
          <label className="text-[#0A2540] font-bold text-[13px] block">Production Capacity</label>
          <Input 
            placeholder="e.g. 50,000 meters / month" 
            value={draft.specifications?.productionCapacity || ''}
            onChange={(e) => updateSpec('productionCapacity', e.target.value)}
            className="bg-[#F8FAFC] border-[#E2E8F0] focus:bg-white"
          />
        </div>
        <div className="space-y-1.5">
          <label className="text-[#0A2540] font-bold text-[13px] block">Incoterms</label>
          <Input 
            placeholder="e.g. FOB, CIF" 
            value={draft.specifications?.incoterms || ''}
            onChange={(e) => updateSpec('incoterms', e.target.value)}
            className="bg-[#F8FAFC] border-[#E2E8F0] focus:bg-white"
          />
        </div>
      </div>
    </div>
  )
}
