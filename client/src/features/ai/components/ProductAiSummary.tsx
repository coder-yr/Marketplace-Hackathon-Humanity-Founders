import { useState, useEffect } from 'react'
import { Sparkles } from 'lucide-react'
import { getProductSummary } from '../api/ai.api'
import ReactMarkdown from 'react-markdown'

interface ProductAiSummaryProps {
  productId: string
}

export function ProductAiSummary({ productId }: ProductAiSummaryProps) {
  const [summary, setSummary] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const { summary } = await getProductSummary(productId)
        setSummary(summary)
      } catch (error) {
        console.error('Failed to fetch AI summary', error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchSummary()
  }, [productId])

  if (isLoading) {
    return (
      <div className="bg-surface-2/50 border border-brand-primary/20 rounded-2xl p-5 animate-pulse">
        <div className="flex items-center gap-2 mb-3">
          <Sparkles className="w-4 h-4 text-brand-primary" />
          <div className="h-4 w-32 bg-surface-3 rounded-md" />
        </div>
        <div className="space-y-2">
          <div className="h-3 bg-surface-3 rounded-md w-full" />
          <div className="h-3 bg-surface-3 rounded-md w-5/6" />
          <div className="h-3 bg-surface-3 rounded-md w-4/6" />
        </div>
      </div>
    )
  }

  if (!summary) return null

  return (
    <div className="bg-gradient-to-br from-brand-primary/5 to-surface-1 border border-brand-primary/20 rounded-2xl p-5">
      <div className="flex items-center gap-2 mb-3">
        <Sparkles className="w-5 h-5 text-brand-primary" />
        <h3 className="font-semibold text-text-primary">AI Product Summary</h3>
      </div>
      <div className="prose prose-sm prose-slate dark:prose-invert max-w-none text-text-secondary leading-relaxed">
        <ReactMarkdown>{summary}</ReactMarkdown>
      </div>
    </div>
  )
}
