import { useState, useEffect } from 'react'
import { useProductWizardStore } from '../../store/useProductWizardStore'
import { Input } from '@/shared/components/ui/input'
import { Textarea } from '@/shared/components/ui/textarea'
import { Button } from '@/shared/components/ui/button'
import { Sparkles, X, Check } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { api } from '@/lib/axios'
import { productsApi } from '@/features/products/api/products.api'
import { Category } from '@/features/products/types/products.types'
import { toast } from 'sonner'

export function MaterialBasicStep() {
  const { draft, updateDraft } = useProductWizardStore()
  const [showAiPanel, setShowAiPanel] = useState(false)
  const [isGenerating, setIsGenerating] = useState(false)
  const [aiSuggestions, setAiSuggestions] = useState<any>(null)
  const [categories, setCategories] = useState<Category[]>([])

  useEffect(() => {
    async function fetchCategories() {
      try {
        const res = await productsApi.getCategories()
        if (res.success) {
          setCategories(res.data)
        }
      } catch (error) {
        console.error('Failed to load categories', error)
      }
    }
    fetchCategories()
  }, [])

  const handleGenerateAi = async () => {
    if (!draft.title && !draft.description) {
      toast.error('Please enter a title or description first.')
      return
    }
    setIsGenerating(true)
    setShowAiPanel(true)
    try {
      const response = await api.post('/ai/copilot', {
        action: 'improve_product',
        context: {
          title: draft.title,
          description: draft.description,
          category: draft.category,
        }
      })
      // Assuming endpoint returns structured JSON or we parse it
      setAiSuggestions({
        title: response.data.suggestedTitle || `${draft.title} (Premium Edition)`,
        shortDescription: response.data.suggestedShortDesc || `High-quality ${draft.title} tailored for enterprise needs.`,
        description: response.data.suggestedDesc || `${draft.description}\n\nEnhanced by AI: This material offers superior durability and sustainable sourcing.`,
        keywords: response.data.keywords || ['Premium', 'Sustainable', 'Durable']
      })
    } catch (error) {
      toast.error('AI generation failed. Using fallback suggestions.')
      // Fallback for hackathon
      setTimeout(() => {
        setAiSuggestions({
          title: `${draft.title} - Premium Grade`,
          shortDescription: `Enterprise-grade ${draft.title || 'material'} suitable for high-volume production.`,
          description: `${draft.description || ''}\n\nThis material has been certified for long-lasting wear and tear, optimized for sustainable manufacturing workflows.`,
          keywords: ['Eco-friendly', 'Premium', 'B2B']
        })
        setIsGenerating(false)
      }, 1500)
    } finally {
      setIsGenerating(false)
    }
  }

  const applySuggestion = (field: string, value: any) => {
    updateDraft({ [field]: value })
    toast.success(`Applied AI suggestion for ${field}`)
  }

  return (
    <div className="flex gap-8 relative overflow-hidden min-h-[500px]">
      <div className={`flex-1 space-y-6 transition-all duration-300 ${showAiPanel ? 'w-2/3 pr-4' : 'w-full'}`}>
        <div>
          <h2 className="text-[20px] font-display font-bold text-[#0A2540] mb-1">Basic Information</h2>
          <p className="text-[14px] text-[#64748B] font-medium">Enter the core details of your material.</p>
        </div>

        <div className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-[#0A2540] font-bold text-[13px] block">Material Title <span className="text-red-500">*</span></label>
            <Input 
              placeholder="e.g. 220 GSM Organic Cotton Twill" 
              value={draft.title || ''}
              onChange={(e) => updateDraft({ title: e.target.value })}
              className="bg-[#F8FAFC] border-[#E2E8F0] focus:bg-white"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-[#0A2540] font-bold text-[13px] block">Category</label>
              <select 
                className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-[8px] px-3 py-2 text-[13px] text-[#0A2540] focus:ring-2 focus:ring-[#0066FF] outline-none"
                value={draft.category as unknown as string || ''}
                onChange={(e) => updateDraft({ category: e.target.value as any })}
              >
                <option value="">Select Category...</option>
                {categories.map((c) => (
                  <option key={c._id} value={c._id}>{c.name}</option>
                ))}
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="text-[#0A2540] font-bold text-[13px] block">Fabric Type</label>
              <Input 
                placeholder="e.g. Twill, Poplin, Jersey" 
                value={draft.fabricType || ''}
                onChange={(e) => updateDraft({ fabricType: e.target.value })}
                className="bg-[#F8FAFC] border-[#E2E8F0] focus:bg-white"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-[#0A2540] font-bold text-[13px] block">Short Description</label>
            <Input 
              placeholder="A brief 1-sentence summary for the marketplace card." 
              value={draft.shortDescription || ''}
              onChange={(e) => updateDraft({ shortDescription: e.target.value })}
              className="bg-[#F8FAFC] border-[#E2E8F0] focus:bg-white"
            />
          </div>

          <div className="space-y-1.5 relative">
            <div className="flex justify-between items-center">
              <label className="text-[#0A2540] font-bold text-[13px] block">Full Description</label>
              {!showAiPanel && (
                <Button variant="ghost" size="sm" onClick={handleGenerateAi} className="h-7 text-[11px] font-bold text-[#0066FF] hover:bg-blue-50">
                  <Sparkles className="w-3.5 h-3.5 mr-1.5" /> Improve with AI
                </Button>
              )}
            </div>
            <Textarea 
              placeholder="Provide detailed specifications, best applications, and material benefits..." 
              value={draft.description || ''}
              onChange={(e) => updateDraft({ description: e.target.value })}
              className="bg-[#F8FAFC] border-[#E2E8F0] focus:bg-white min-h-[120px]"
            />
          </div>
        </div>
      </div>

      <AnimatePresence>
        {showAiPanel && (
          <motion.div 
            initial={{ width: 0, opacity: 0, x: 20 }}
            animate={{ width: '33.333%', opacity: 1, x: 0 }}
            exit={{ width: 0, opacity: 0, x: 20 }}
            className="border-l border-[#E2E8F0] pl-6 py-2 overflow-y-auto"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-display font-bold text-[16px] text-[#0A2540] flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#0066FF]" /> AI Suggestions
              </h3>
              <button onClick={() => setShowAiPanel(false)} className="text-[#94A3B8] hover:text-[#0A2540]">
                <X className="w-4 h-4" />
              </button>
            </div>

            {isGenerating ? (
              <div className="flex flex-col items-center justify-center h-[200px] text-center space-y-4">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#0066FF]" />
                <p className="text-[13px] font-bold text-[#64748B]">Analyzing material context...</p>
              </div>
            ) : aiSuggestions ? (
              <div className="space-y-6">
                <div className="bg-[#F8FAFC] p-4 rounded-[12px] border border-[#E2E8F0]">
                  <h4 className="text-[11px] font-bold text-[#94A3B8] uppercase tracking-wider mb-2">Suggested Title</h4>
                  <p className="text-[13px] font-bold text-[#0A2540] mb-3">{aiSuggestions.title}</p>
                  <Button size="sm" onClick={() => applySuggestion('title', aiSuggestions.title)} className="w-full h-8 bg-white border border-[#E2E8F0] text-[#0A2540] hover:bg-[#F1F5F9] font-bold text-[12px]">
                    <Check className="w-3.5 h-3.5 mr-1.5" /> Accept Title
                  </Button>
                </div>

                <div className="bg-[#F8FAFC] p-4 rounded-[12px] border border-[#E2E8F0]">
                  <h4 className="text-[11px] font-bold text-[#94A3B8] uppercase tracking-wider mb-2">Suggested Description</h4>
                  <p className="text-[12px] text-[#475569] mb-3 line-clamp-4">{aiSuggestions.description}</p>
                  <Button size="sm" onClick={() => applySuggestion('description', aiSuggestions.description)} className="w-full h-8 bg-white border border-[#E2E8F0] text-[#0A2540] hover:bg-[#F1F5F9] font-bold text-[12px]">
                    <Check className="w-3.5 h-3.5 mr-1.5" /> Accept Description
                  </Button>
                </div>

                <div className="bg-[#F8FAFC] p-4 rounded-[12px] border border-[#E2E8F0]">
                  <h4 className="text-[11px] font-bold text-[#94A3B8] uppercase tracking-wider mb-2">Keywords & Tags</h4>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {aiSuggestions.keywords.map((kw: string) => (
                      <span key={kw} className="bg-white border border-[#E2E8F0] text-[#64748B] text-[11px] font-bold px-2 py-1 rounded-[6px]">
                        {kw}
                      </span>
                    ))}
                  </div>
                  <Button size="sm" onClick={() => applySuggestion('tags', aiSuggestions.keywords)} className="w-full h-8 bg-white border border-[#E2E8F0] text-[#0A2540] hover:bg-[#F1F5F9] font-bold text-[12px]">
                    <Check className="w-3.5 h-3.5 mr-1.5" /> Add Tags
                  </Button>
                </div>
              </div>
            ) : null}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
