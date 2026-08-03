import { useState, useEffect } from 'react'
import { Sparkles, Loader2 } from 'lucide-react'
import { Button } from '@/shared/components/ui/button'
import { Modal } from '@/shared/components/feedback/modal'
import { compareProducts } from '../api/ai.api'
import { Product } from '@/features/products/types/products.types'
import ReactMarkdown from 'react-markdown'

interface ProductComparisonModalProps {
  isOpen: boolean
  onClose: () => void
  selectedProducts: Product[]
}

export function ProductComparisonModal({ isOpen, onClose, selectedProducts }: ProductComparisonModalProps) {
  const [comparisonText, setComparisonText] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (isOpen && selectedProducts.length >= 2) {
      const fetchComparison = async () => {
        setIsLoading(true)
        setComparisonText(null)
        try {
          const productIds = selectedProducts.map(p => p._id)
          const { comparison } = await compareProducts(productIds)
          setComparisonText(comparison)
        } catch (error) {
          console.error('Failed to compare products', error)
          setComparisonText('Failed to generate comparison. Please try again.')
        } finally {
          setIsLoading(false)
        }
      }
      fetchComparison()
    }
  }, [isOpen, selectedProducts])

  if (!isOpen) return null

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="AI Product Comparison"
      size="lg"
    >
      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-4 overflow-x-auto pb-4">
          {selectedProducts.map((p) => (
            <div key={p._id} className="min-w-[150px] max-w-[200px] flex-shrink-0 bg-surface-1 border border-border-color rounded-xl p-3 flex flex-col gap-2">
              <div className="aspect-square rounded-lg overflow-hidden bg-surface-2">
                <img 
                  src={p.images[0] || 'https://via.placeholder.com/150'} 
                  alt={p.title} 
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <p className="text-xs font-bold text-text-primary truncate">{p.title}</p>
                <p className="text-[10px] text-text-secondary">{p.priceRange.min}-{p.priceRange.max} {p.priceRange.currency}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-brand-primary/5 border border-brand-primary/20 rounded-2xl p-6 relative min-h-[200px]">
          <div className="flex items-center gap-2 mb-4 text-brand-primary font-bold">
            <Sparkles className="w-5 h-5" />
            <h3>Comparison Analysis</h3>
          </div>
          
          {isLoading ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center text-brand-primary/60 gap-3">
              <Loader2 className="w-8 h-8 animate-spin" />
              <p className="text-sm font-medium animate-pulse">Analyzing fabrics & specifications...</p>
            </div>
          ) : (
            <div className="prose prose-sm prose-slate dark:prose-invert max-w-none text-text-secondary leading-relaxed">
              <ReactMarkdown>{comparisonText || ''}</ReactMarkdown>
            </div>
          )}
        </div>

        <div className="flex justify-end pt-2">
          <Button onClick={onClose}>Close Comparison</Button>
        </div>
      </div>
    </Modal>
  )
}
