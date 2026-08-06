import { useState } from 'react'
import { useProductWizardStore } from '../../store/useProductWizardStore'
import { Input } from '@/shared/components/ui/input'
import { Button } from '@/shared/components/ui/button'
import { Image as ImageIcon, UploadCloud, X } from 'lucide-react'

export function MaterialMediaStep() {
  const { draft, updateDraft } = useProductWizardStore()
  const images = draft.images || []
  const [newUrl, setNewUrl] = useState('')

  const addImageUrl = () => {
    if (newUrl.trim()) {
      updateDraft({ images: [...images, newUrl.trim()] })
      setNewUrl('')
    }
  }

  const removeImage = (index: number) => {
    updateDraft({ images: images.filter((_, i) => i !== index) })
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-[20px] font-display font-bold text-[#0A2540] mb-1">Product Media</h2>
        <p className="text-[14px] text-[#64748B] font-medium">Upload high-quality images of the material, factory, and textures.</p>
      </div>

      {/* Future-proof File Upload Placeholder */}
      <div className="border-2 border-dashed border-[#CBD5E1] rounded-[16px] bg-[#F8FAFC] flex flex-col items-center justify-center py-12 px-4 transition-colors hover:bg-[#F1F5F9] cursor-pointer">
        <div className="bg-white p-4 rounded-full shadow-sm mb-4">
          <UploadCloud className="w-8 h-8 text-[#0066FF]" />
        </div>
        <h3 className="text-[15px] font-bold text-[#0A2540] mb-1">Click or drag images to upload</h3>
        <p className="text-[13px] text-[#64748B] mb-6">Supports JPG, PNG, WEBP (Max 5MB per file)</p>
        <span className="text-[11px] font-bold bg-[#E2E8F0] text-[#475569] px-3 py-1 rounded-full uppercase tracking-wide">
          Cloud Upload Coming Soon
        </span>
      </div>

      <div className="bg-white border border-[#E2E8F0] rounded-[12px] p-5">
        <label className="text-[#0A2540] font-bold text-[13px] mb-3 block">Or add via Image URL (Hackathon Mode) <span className="text-red-500">*</span></label>
        <div className="flex gap-3 mb-6">
          <div className="flex-1 relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8]">
              <ImageIcon className="w-4 h-4" />
            </span>
            <Input 
              placeholder="https://example.com/image.jpg" 
              value={newUrl}
              onChange={(e) => setNewUrl(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && addImageUrl()}
              className="bg-[#F8FAFC] border-[#E2E8F0] pl-10"
            />
          </div>
          <Button onClick={addImageUrl} className="bg-[#0A2540] text-white hover:bg-[#1E3A5F]">
            Add URL
          </Button>
        </div>

        <div className="grid grid-cols-4 gap-4">
          {images.map((url, idx) => (
            <div key={idx} className="relative group rounded-[8px] overflow-hidden border border-[#E2E8F0] aspect-square bg-[#F8FAFC]">
              <img src={url} alt={`Material ${idx + 1}`} className="w-full h-full object-cover" onError={(e) => { e.currentTarget.src = 'https://placehold.co/400x400?text=Invalid+Image' }} />
              
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <Button variant="ghost" onClick={() => removeImage(idx)} className="text-white hover:bg-white/20 hover:text-white rounded-full h-8 w-8 px-0">
                  <X className="w-4 h-4" />
                </Button>
              </div>
              
              {idx === 0 && (
                <div className="absolute top-2 left-2 bg-[#0066FF] text-white text-[10px] font-bold px-2 py-0.5 rounded-[4px] uppercase tracking-wider">
                  Primary
                </div>
              )}
            </div>
          ))}
          {images.length === 0 && (
            <div className="col-span-4 py-8 text-center text-[#94A3B8] text-[13px] font-bold">
              At least one image is required to publish.
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
