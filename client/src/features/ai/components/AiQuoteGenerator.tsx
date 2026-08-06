import { useState } from 'react'
import { Sparkles, Send, Edit3 } from 'lucide-react'
import { Button } from '@/shared/components/ui/button'
import { generateRfqDraft } from '../api/ai.api'
import type { RfqDraftResult } from '../types/ai.types'

interface AiQuoteGeneratorProps {
  productId?: string
  productTitle?: string
  fabricType?: string
}

export function AiQuoteGenerator({ productTitle, fabricType }: AiQuoteGeneratorProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [step, setStep] = useState<'input' | 'result'>('input')
  const [description, setDescription] = useState(
    productTitle && fabricType
      ? `I need ${fabricType} (${productTitle}), please generate an RFQ.`
      : ''
  )
  const [draft, setDraft] = useState<RfqDraftResult | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleGenerate = async () => {
    if (!description.trim() || description.trim().length < 5) {
      setError('Please describe your procurement requirement (at least 5 characters).')
      return
    }
    setError('')
    setIsLoading(true)
    try {
      const result = await generateRfqDraft(description)
      setDraft(result.data)
      setStep('result')
    } catch (err) {
      setError('AI generation failed. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleClose = () => {
    setIsOpen(false)
    setStep('input')
    setDraft(null)
    setError('')
  }

  return (
    <>
      <Button 
        variant="outline" 
        className="w-full justify-center gap-2 h-10 text-[12px] font-bold border-[#E2E8F0] text-[#0A2540] hover:bg-[#F8FAFC]" 
        onClick={() => setIsOpen(true)}
      >
        <Sparkles className="w-3.5 h-3.5 text-[#0066FF]" />
        Generate AI Quote
      </Button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white w-full max-w-lg rounded-[24px] shadow-2xl border border-[#E2E8F0] p-6 flex flex-col max-h-[90vh]">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-9 h-9 rounded-[10px] bg-[#0066FF]/10 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-[#0066FF]" />
              </div>
              <div>
                <h3 className="text-[16px] font-bold text-[#0A2540]">
                  {step === 'input' ? 'AI RFQ Generator' : 'AI-Generated RFQ Draft'}
                </h3>
                <p className="text-[12px] text-[#64748B] font-medium">
                  {step === 'input' ? 'Describe your procurement need in plain language' : 'Review and edit before sending'}
                </p>
              </div>
            </div>

            {step === 'input' ? (
              <>
                <div className="mb-4">
                  <label className="text-[11px] font-bold text-[#64748B] uppercase tracking-widest block mb-2">
                    Describe Your Requirement
                  </label>
                  <textarea
                    value={description}
                    onChange={(e) => { setDescription(e.target.value); setError('') }}
                    placeholder={`Example:\nNeed 5000 meters organic cotton\n220 GSM, enzyme washed\nDelivery within 30 days\nBudget $4/meter\nOEKO-TEX certified preferred`}
                    className="w-full p-4 rounded-[12px] border border-[#E2E8F0] bg-[#F8FAFC] text-[13px] font-medium text-[#0A2540] placeholder:text-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#0066FF]/30 focus:border-[#0066FF]/30 min-h-[160px] resize-none"
                  />
                  {error && <p className="text-[#F87171] text-[12px] font-bold mt-2">{error}</p>}
                </div>

                <div className="flex items-center justify-end gap-3 mt-2">
                  <Button variant="ghost" className="font-bold" onClick={handleClose}>Cancel</Button>
                  <Button 
                    disabled={isLoading || description.trim().length < 5} 
                    onClick={handleGenerate}
                    className="bg-[#0A2540] hover:bg-[#0066FF] text-white font-bold gap-2 rounded-[10px]"
                  >
                    {isLoading ? (
                      <><div className="w-4 h-4 rounded-full border-2 border-t-white border-white/30 animate-spin" /> Generating...</>
                    ) : (
                      <><Sparkles className="w-4 h-4" /> Generate RFQ</>
                    )}
                  </Button>
                </div>
              </>
            ) : draft ? (
              <>
                <div className="flex-1 overflow-y-auto space-y-3 mb-4">
                  {[
                    { label: 'Material', key: 'material', value: draft.material },
                    { label: 'Quantity', key: 'quantity', value: draft.quantity },
                    { label: 'GSM / Weight', key: 'gsm', value: draft.gsm },
                    { label: 'Budget', key: 'budget', value: draft.budget },
                    { label: 'Lead Time', key: 'leadTime', value: draft.leadTime },
                    { label: 'Notes', key: 'notes', value: draft.notes },
                  ].map(({ label, key, value }) => (
                    <div key={key} className="bg-[#F8FAFC] rounded-[12px] border border-[#E2E8F0] p-3">
                      <label className="text-[10px] font-bold text-[#94A3B8] uppercase tracking-widest block mb-1">{label}</label>
                      <input
                        type="text"
                        defaultValue={value}
                        className="w-full bg-transparent text-[13px] font-bold text-[#0A2540] focus:outline-none"
                        placeholder={`Enter ${label.toLowerCase()}`}
                      />
                    </div>
                  ))}
                  {draft.certifications.length > 0 && (
                    <div className="bg-[#F8FAFC] rounded-[12px] border border-[#E2E8F0] p-3">
                      <label className="text-[10px] font-bold text-[#94A3B8] uppercase tracking-widest block mb-1">Certifications</label>
                      <p className="text-[13px] font-bold text-[#0A2540]">{draft.certifications.join(', ')}</p>
                    </div>
                  )}
                  {draft.suggestedSuppliers.length > 0 && (
                    <div className="bg-[#0066FF]/5 rounded-[12px] border border-[#0066FF]/20 p-3">
                      <label className="text-[10px] font-bold text-[#0066FF] uppercase tracking-widest block mb-1 flex items-center gap-1">
                        <Sparkles className="w-3 h-3" /> AI Suggested Regions
                      </label>
                      <p className="text-[13px] font-bold text-[#0A2540]">{draft.suggestedSuppliers.join(' • ')}</p>
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-3 pt-3 border-t border-[#E2E8F0]">
                  <Button variant="ghost" className="font-bold text-[#64748B]" onClick={() => setStep('input')}>
                    <Edit3 className="w-4 h-4 mr-1.5" /> Re-describe
                  </Button>
                  <Button className="flex-1 bg-[#0A2540] hover:bg-[#0066FF] text-white font-bold gap-2 rounded-[10px]" onClick={handleClose}>
                    <Send className="w-4 h-4" /> Submit RFQ
                  </Button>
                </div>
              </>
            ) : null}
          </div>
        </div>
      )}
    </>
  )
}
