import { useState } from 'react'
import { Sparkles, Zap, FileText, ClipboardList, Loader2 } from 'lucide-react'
import { parseSearchIntent } from '../api/ai.api'
import { SearchIntentFilters } from '../types/ai.types'
import { useNavigate } from 'react-router-dom'

interface AiSearchBarProps {
  onFiltersExtracted: (filters: SearchIntentFilters) => void
}

export function AiSearchBar({ onFiltersExtracted }: AiSearchBarProps) {
  const [query, setQuery] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

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
      className="bg-white border border-[#E2E8F0] rounded-[24px] p-2 sm:p-2.5 shadow-sm flex flex-col md:flex-row items-center gap-2 w-full transition-all focus-within:border-[#2563EB] focus-within:ring-4 focus-within:ring-[#2563EB]/10"
    >
      <div className="flex items-center flex-1 w-full pl-3 pr-2">
        <Sparkles className="w-5 h-5 text-[#2563EB] flex-shrink-0 mr-3" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Describe your sourcing requirement... Example: Need 5000m Organic Cott"
          className="w-full bg-transparent border-none text-[14px] sm:text-[15px] font-medium text-[#0A2540] placeholder:text-[#94A3B8] focus:outline-none"
          disabled={isLoading}
        />
      </div>

      <div className="flex items-center gap-2 w-full md:w-auto justify-end flex-wrap sm:flex-nowrap">
        <button
          type="submit"
          disabled={isLoading}
          className="bg-[#2563EB] hover:bg-[#1D4ED8] text-white px-5 py-2.5 rounded-2xl text-[13px] font-black transition-all flex items-center justify-center gap-1.5 shadow-md shadow-[#2563EB]/20 disabled:opacity-50 min-w-[120px]"
        >
          {isLoading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <>
              <Zap className="w-4 h-4 fill-white" />
              <span>AI Search</span>
            </>
          )}
        </button>

        <button
          type="button"
          onClick={() => navigate('/marketplace')}
          className="border border-[#E2E8F0] bg-white hover:bg-[#F8FAFC] text-[#0A2540] px-4 py-2.5 rounded-2xl text-[13px] font-bold transition-all flex items-center justify-center gap-1.5 whitespace-nowrap"
        >
          <FileText className="w-4 h-4 text-[#64748B]" />
          <span>Spec Sheet</span>
        </button>

        <button
          type="button"
          onClick={() => navigate('/dashboard/procurement')}
          className="border border-[#E2E8F0] bg-white hover:bg-[#F8FAFC] text-[#0A2540] px-4 py-2.5 rounded-2xl text-[13px] font-bold transition-all flex items-center justify-center gap-1.5 whitespace-nowrap"
        >
          <ClipboardList className="w-4 h-4 text-[#64748B]" />
          <span>RFQ</span>
        </button>
      </div>
    </form>
  )
}
