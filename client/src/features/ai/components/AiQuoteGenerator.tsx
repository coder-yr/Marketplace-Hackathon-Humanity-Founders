import { useState } from 'react'
import { Sparkles, Send } from 'lucide-react'
import { Button } from '@/shared/components/ui/button'
import { generateQuoteDraft } from '../api/ai.api'

interface AiQuoteGeneratorProps {
  productId: string
}

export function AiQuoteGenerator({ productId }: AiQuoteGeneratorProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [draft, setDraft] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleGenerate = async () => {
    setIsOpen(true)
    setIsLoading(true)
    try {
      const { draft } = await generateQuoteDraft(productId)
      setDraft(draft)
    } catch (error) {
      setDraft('Failed to generate draft. Please write your request manually.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <Button 
        variant="outline" 
        className="w-full justify-center gap-2" 
        onClick={handleGenerate}
      >
        <Sparkles className="w-4 h-4" />
        Request Quote with AI
      </Button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-surface-50 w-full max-w-lg rounded-2xl shadow-xl border border-border-color p-6 flex flex-col max-h-[90vh]">
            <h3 className="text-xl font-bold text-text-primary mb-4 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-brand-primary" />
              RFQ Draft
            </h3>
            
            {isLoading ? (
              <div className="flex-1 flex items-center justify-center py-12">
                <div className="animate-pulse flex gap-1 items-center">
                  Generating draft...
                </div>
              </div>
            ) : (
              <textarea
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                className="flex-1 w-full p-4 rounded-xl border border-border-color bg-surface-1 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/50 min-h-[250px] resize-none"
              />
            )}

            <div className="flex items-center justify-end gap-3 mt-6">
              <Button variant="ghost" onClick={() => setIsOpen(false)}>Cancel</Button>
              <Button disabled={isLoading} className="gap-2">
                <Send className="w-4 h-4" />
                Send Request
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
