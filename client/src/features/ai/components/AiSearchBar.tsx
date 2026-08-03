import { useState } from 'react'
import { Sparkles, ArrowRight, Loader2 } from 'lucide-react'
import { parseSearchIntent } from '../api/ai.api'
import { SearchIntentFilters } from '../types/ai.types'

interface AiSearchBarProps {
  onFiltersExtracted: (filters: SearchIntentFilters) => void
}

export function AiSearchBar({ onFiltersExtracted }: AiSearchBarProps) {
  const [query, setQuery] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!query.trim() || isLoading) return

    setIsLoading(true)
    try {
      const { filters } = await parseSearchIntent(query)
      onFiltersExtracted(filters)
      setQuery('')
    } catch (error) {
      console.error('Failed to parse search intent', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form 
      onSubmit={handleSubmit}
      className="relative flex items-center w-full max-w-2xl bg-surface-1 border border-brand-primary/30 rounded-2xl p-2 shadow-sm focus-within:ring-2 focus-within:ring-brand-primary/50 transition-all"
    >
      <div className="pl-3 pr-2 text-brand-primary flex-shrink-0">
        <Sparkles className="w-5 h-5" />
      </div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="e.g., Need organic cotton under $200 MOQ below 500"
        className="flex-1 bg-transparent border-none text-sm text-text-primary px-2 focus:outline-none placeholder:text-text-tertiary w-full"
        disabled={isLoading}
      />
      <button
        type="submit"
        disabled={!query.trim() || isLoading}
        className="ml-2 bg-brand-primary hover:bg-brand-secondary text-white px-4 py-2 rounded-xl text-sm font-semibold transition-colors flex items-center justify-center min-w-[100px] disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          <>
            <span>AI Search</span>
            <ArrowRight className="w-4 h-4 ml-1" />
          </>
        )}
      </button>
    </form>
  )
}
