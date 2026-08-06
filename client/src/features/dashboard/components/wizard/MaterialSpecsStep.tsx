import { useProductWizardStore } from '../../store/useProductWizardStore'
import { Input } from '@/shared/components/ui/input'
import { Button } from '@/shared/components/ui/button'
import { Plus, Trash2 } from 'lucide-react'

export function MaterialSpecsStep() {
  const { draft, updateDraft } = useProductWizardStore()
  
  const specifications = draft.specifications || {}
  const variants = draft.variants || []

  const updateSpec = (key: string, value: string) => {
    updateDraft({
      specifications: { ...specifications, [key]: value }
    })
  }

  const addVariant = () => {
    updateDraft({
      variants: [...variants, { color: '', stock: 0, image: '' }]
    })
  }

  const updateVariant = (index: number, field: string, value: any) => {
    const newVariants = [...variants]
    newVariants[index] = { ...newVariants[index], [field]: value }
    updateDraft({ variants: newVariants })
  }

  const removeVariant = (index: number) => {
    const newVariants = variants.filter((_, i) => i !== index)
    updateDraft({ variants: newVariants })
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-[20px] font-display font-bold text-[#0A2540] mb-1">Technical Specifications</h2>
        <p className="text-[14px] text-[#64748B] font-medium">Define the physical properties and variations of this material.</p>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-1.5">
          <label className="text-[#0A2540] font-bold text-[13px] block">Composition</label>
          <Input 
            placeholder="e.g. 100% Organic Cotton" 
            value={specifications.composition || ''}
            onChange={(e) => updateSpec('composition', e.target.value)}
            className="bg-[#F8FAFC] border-[#E2E8F0] focus:bg-white"
          />
        </div>
        <div className="space-y-1.5">
          <label className="text-[#0A2540] font-bold text-[13px] block">GSM (Grams per Square Meter)</label>
          <Input 
            type="number"
            placeholder="e.g. 220" 
            value={specifications.gsm || ''}
            onChange={(e) => updateSpec('gsm', e.target.value)}
            className="bg-[#F8FAFC] border-[#E2E8F0] focus:bg-white"
          />
        </div>
        <div className="space-y-1.5">
          <label className="text-[#0A2540] font-bold text-[13px] block">Width</label>
          <Input 
            placeholder="e.g. 58/60 inches" 
            value={specifications.width || ''}
            onChange={(e) => updateSpec('width', e.target.value)}
            className="bg-[#F8FAFC] border-[#E2E8F0] focus:bg-white"
          />
        </div>
        <div className="space-y-1.5">
          <label className="text-[#0A2540] font-bold text-[13px] block">Weave / Knit</label>
          <Input 
            placeholder="e.g. Twill, Jersey" 
            value={specifications.weave || ''}
            onChange={(e) => updateSpec('weave', e.target.value)}
            className="bg-[#F8FAFC] border-[#E2E8F0] focus:bg-white"
          />
        </div>
      </div>

      <div className="pt-6 border-t border-[#E2E8F0]">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-[16px] font-bold text-[#0A2540]">Color Variants</h3>
            <p className="text-[13px] text-[#64748B]">Add different colors and their available stock.</p>
          </div>
          <Button variant="outline" size="sm" onClick={addVariant} className="h-8 text-[12px] font-bold border-[#E2E8F0] text-[#0A2540]">
            <Plus className="w-3.5 h-3.5 mr-1.5" /> Add Variant
          </Button>
        </div>

        {variants.length === 0 ? (
          <div className="bg-[#F8FAFC] border border-dashed border-[#CBD5E1] rounded-[12px] p-8 text-center">
            <p className="text-[13px] font-bold text-[#94A3B8]">No variants added yet.</p>
            <p className="text-[12px] text-[#94A3B8] mt-1">Click the button above to add colors for this material.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {variants.map((variant, index) => (
              <div key={index} className="flex items-end gap-3 bg-[#F8FAFC] p-3 rounded-[8px] border border-[#E2E8F0]">
                <div className="flex-1 space-y-1">
                  <label className="text-[11px] font-bold text-[#64748B] uppercase block">Color Name</label>
                  <Input 
                    placeholder="e.g. Navy Blue" 
                    value={variant.color}
                    onChange={(e) => updateVariant(index, 'color', e.target.value)}
                    className="h-8 text-[13px] bg-white"
                  />
                </div>
                <div className="w-32 space-y-1">
                  <label className="text-[11px] font-bold text-[#64748B] uppercase block">Stock Qty</label>
                  <Input 
                    type="number"
                    value={variant.stock || 0}
                    onChange={(e) => updateVariant(index, 'stock', Number(e.target.value))}
                    className="h-8 text-[13px] bg-white"
                  />
                </div>
                <div className="flex-1 space-y-1">
                  <label className="text-[11px] font-bold text-[#64748B] uppercase block">Image URL (Optional)</label>
                  <Input 
                    placeholder="https://..." 
                    value={variant.image || ''}
                    onChange={(e) => updateVariant(index, 'image', e.target.value)}
                    className="h-8 text-[13px] bg-white"
                  />
                </div>
                <Button variant="ghost" onClick={() => removeVariant(index)} className="text-[#64748B] hover:text-red-500 hover:bg-red-50 h-8 px-2">
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
