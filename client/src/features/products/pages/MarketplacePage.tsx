import { useState, useEffect } from 'react'
import { Skeleton } from '@/shared/components/feedback/skeleton'
import { EmptyState } from '@/shared/components/feedback/empty-error-state'
import { Pagination } from '@/shared/components/data/pagination'
import { SortDropdown } from '@/shared/components/data/sort-dropdown'
import { ProductCard } from '../components/ProductCard'
import { ProductFilterPanel } from '../components/ProductFilterPanel'
import { productsApi } from '../api/products.api'
import { Product, Category, ProductFilterParams, Pagination as PaginationType } from '../types/products.types'
import { AiSearchBar } from '@/features/ai/components/AiSearchBar'
import { ProductComparisonModal } from '@/features/ai/components/ProductComparisonModal'
import { SearchIntentFilters } from '@/features/ai/types/ai.types'
import { 
  Sparkles,
  Clock,
  Scale,
  FileText,
  X,
  Bookmark,
  SlidersHorizontal,
  Box
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { transitionPage } from '@/shared/animations'
import { Button } from '@/shared/components/ui/button'

const SORT_OPTIONS = [
  { value: 'newest', label: 'Newest Arrivals' },
  { value: 'price_asc', label: 'Price: Low to High' },
  { value: 'price_desc', label: 'Price: High to Low' },
  { value: 'moq_asc', label: 'Lowest MOQ' },
  { value: 'title_asc', label: 'Alphabetical (A-Z)' },
]

export function MarketplacePage() {
  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [pagination, setPagination] = useState<PaginationType>({ page: 1, limit: 12, total: 0, pages: 1 })
  const [isLoading, setIsLoading] = useState(true)
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false)
  const [inspectorTab, setInspectorTab] = useState<'recent' | 'compared' | 'saved' | 'rfqs'>('recent')

  const [filters, setFilters] = useState<ProductFilterParams>({
    page: 1,
    limit: 12,
    sort: 'newest',
  })

  // Comparison State
  const [selectedForCompare, setSelectedForCompare] = useState<Product[]>([])
  const [isCompareModalOpen, setIsCompareModalOpen] = useState(false)

  // Load Categories on mount
  useEffect(() => {
    productsApi.getCategories().then((res) => {
      if (res.data) setCategories(res.data)
    }).catch((err) => console.error('Failed to load categories', err))
  }, [])

  // Fetch Products whenever filters change
  useEffect(() => {
    let isMounted = true
    setIsLoading(true)

    productsApi
      .getProducts(filters)
      .then((res) => {
        if (isMounted) {
          setProducts(res.data || [])
          if (res.pagination) setPagination(res.pagination)
          setIsLoading(false)
        }
      })
      .catch((err) => {
        console.error('Failed to fetch products', err)
        if (isMounted) setIsLoading(false)
      })

    return () => {
      isMounted = false
    }
  }, [filters])

  const handleFilterChange = (newFilters: ProductFilterParams) => {
    setFilters(newFilters)
  }

  const handleResetFilters = () => {
    setFilters({ page: 1, limit: 12, sort: 'newest' })
  }

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilters({ ...filters, sort: e.target.value as any, page: 1 })
  }

  const handlePageChange = (newPage: number) => {
    setFilters({ ...filters, page: newPage })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleAiFilters = (aiFilters: SearchIntentFilters) => {
    const newFilters: ProductFilterParams = { ...filters, page: 1 }
    
    if (aiFilters.category) {
      const matchedCategory = categories.find(c => c.slug.toLowerCase() === aiFilters.category?.toLowerCase())
      if (matchedCategory) newFilters.category = matchedCategory._id
    }
    
    if (aiFilters.searchTerm) newFilters.search = aiFilters.searchTerm
    if (aiFilters.maxPrice) newFilters.maxPrice = aiFilters.maxPrice
    if (aiFilters.stockStatus === 'in_stock') newFilters.stockStatus = 'in_stock'
    
    setFilters(newFilters)
  }

  const handleSelectForCompare = (product: Product, isSelected: boolean) => {
    if (isSelected) {
      if (selectedForCompare.length < 4) {
        setSelectedForCompare([...selectedForCompare, product])
      } else {
        alert("You can only compare up to 4 products at a time.")
      }
    } else {
      setSelectedForCompare(selectedForCompare.filter((p) => p._id !== product._id))
    }
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={transitionPage}
      className="min-h-[calc(100vh-100px)] bg-[#F7F8FA] flex flex-col font-sans"
    >
      {/* 1. Top Workspace Toolbar */}
      <div className="sticky top-[72px] z-30 bg-white border-b border-[var(--border)] py-3 px-4 lg:px-8 shadow-sm">
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Left: AI & Standard Search */}
          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="w-full md:w-96 relative flex items-center group">
              <Sparkles className="w-4 h-4 text-[var(--primary)] absolute left-3 z-10" />
              <div className="w-full relative z-0">
                <AiSearchBar onFiltersExtracted={handleAiFilters} />
              </div>
            </div>
          </div>

          {/* Right: Quick Filters & Sort */}
          <div className="flex items-center gap-3 w-full md:w-auto overflow-x-auto pb-2 md:pb-0 hide-scrollbar">
            <button className="flex items-center gap-2 px-3 py-1.5 rounded-[10px] border border-[var(--border)] bg-white hover:bg-[#F8FAFC] text-[13px] font-bold text-[var(--body)] whitespace-nowrap transition-colors">
              <Bookmark className="w-3.5 h-3.5" /> Saved Searches
            </button>
            <div className="w-px h-6 bg-[var(--border)] mx-1" />
            <button 
              onClick={() => setFilters({ ...filters, stockStatus: 'in_stock', page: 1 })}
              className={`px-3 py-1.5 rounded-[10px] border text-[13px] font-bold whitespace-nowrap transition-colors ${filters.stockStatus === 'in_stock' ? 'border-[var(--success)] bg-[var(--success)]/10 text-[var(--success)]' : 'border-[var(--border)] bg-white hover:bg-[#F8FAFC] text-[var(--body)]'}`}
            >
              In Stock Only
            </button>
            <button className="px-3 py-1.5 rounded-[10px] border border-[var(--border)] bg-white hover:bg-[#F8FAFC] text-[13px] font-bold text-[var(--body)] whitespace-nowrap transition-colors">
              Eco-Certified
            </button>
            <div className="w-px h-6 bg-[var(--border)] mx-1" />
            <SortDropdown options={SORT_OPTIONS} value={filters.sort || 'newest'} onChange={handleSortChange} />
          </div>
        </div>
      </div>

      {/* 2. Main Sourcing Workspace */}
      <div className="flex-1 flex overflow-hidden max-w-[1400px] w-full mx-auto">
        
        {/* Left Sidebar (Filters) */}
        <aside className="w-72 flex-shrink-0 border-r border-[var(--border)] bg-white overflow-y-auto hidden lg:block p-6">
          <ProductFilterPanel filters={filters} categories={categories} onChange={handleFilterChange} onReset={handleResetFilters} />
        </aside>

        {/* Center Grid (Products) */}
        <main className="flex-1 overflow-y-auto bg-[#F7F8FA] p-4 lg:p-8 relative">
          <div className="max-w-[1200px] mx-auto">
            {/* Results Header */}
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-[24px] font-display font-bold text-[var(--heading)]">
                Marketplace Results
                <span className="ml-3 text-[16px] font-medium text-[#94A3B8]">({pagination.total} materials)</span>
              </h2>
              
              <button
                onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
                className="lg:hidden flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white border border-[var(--border)] text-[var(--heading)] text-[13px] font-bold shadow-sm"
              >
                <SlidersHorizontal className="w-4 h-4" /> Filters
              </button>
            </div>

            {/* Mobile Filter Drawer */}
            <AnimatePresence>
              {isMobileFilterOpen && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="lg:hidden mb-6 bg-white p-4 rounded-[16px] border border-[var(--border)] overflow-hidden">
                  <ProductFilterPanel filters={filters} categories={categories} onChange={handleFilterChange} onReset={handleResetFilters} />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Content */}
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from({ length: 9 }).map((_, i) => (
                  <div key={i} className="bg-white rounded-[24px] border border-[var(--border)] h-[460px] animate-pulse" />
                ))}
              </div>
            ) : products.length === 0 ? (
              <div className="bg-white rounded-[24px] border border-[var(--border)] p-12 text-center flex flex-col items-center">
                 <Box className="w-12 h-12 text-[#94A3B8] mb-4" />
                 <h3 className="text-[20px] font-bold text-[var(--heading)] mb-2">No materials found</h3>
                 <p className="text-[var(--body)] text-[14px] mb-6">Try adjusting your filters or search terms.</p>
                 <Button onClick={handleResetFilters} className="bg-[var(--heading)] hover:bg-[var(--primary)] text-white">Clear All Filters</Button>
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {products.map((product) => (
                  <ProductCard key={product._id} product={product} onSelectForCompare={handleSelectForCompare} isSelectedForCompare={selectedForCompare.some(p => p._id === product._id)} />
                ))}
              </motion.div>
            )}

            {/* Pagination */}
            {!isLoading && pagination.pages > 1 && (
              <div className="mt-12 mb-12 flex justify-center">
                <Pagination page={pagination.page} totalPages={pagination.pages} onPageChange={handlePageChange} />
              </div>
            )}
          </div>
        </main>

        {/* Right Inspector Panel */}
        <aside className="w-80 flex-shrink-0 border-l border-[var(--border)] bg-white flex flex-col hidden xl:flex">
          {/* Inspector Tabs */}
          <div className="flex items-center border-b border-[var(--border)] p-2 gap-1 bg-[#F8FAFC]">
            {[
              { id: 'recent', icon: Clock, label: 'Recent' },
              { id: 'compared', icon: Scale, label: 'Compare' },
              { id: 'saved', icon: Bookmark, label: 'Saved' },
              { id: 'rfqs', icon: FileText, label: 'RFQs' }
            ].map(tab => (
              <button 
                key={tab.id}
                onClick={() => setInspectorTab(tab.id as any)}
                className={`flex-1 flex flex-col items-center gap-1.5 py-3 px-1 rounded-[10px] text-[10px] font-bold uppercase tracking-widest transition-all ${inspectorTab === tab.id ? 'bg-white text-[var(--primary)] shadow-sm border border-[var(--border)]' : 'text-[#94A3B8] hover:text-[var(--heading)] hover:bg-[#F1F5F9] border border-transparent'}`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
                {tab.id === 'compared' && selectedForCompare.length > 0 && (
                  <span className="absolute top-3 right-3 w-2 h-2 bg-[var(--primary)] rounded-full" />
                )}
              </button>
            ))}
          </div>

          {/* Inspector Content */}
          <div className="flex-1 overflow-y-auto p-5 bg-[#F7F8FA]">
            {inspectorTab === 'compared' ? (
              <div className="flex flex-col gap-4 h-full">
                <div className="flex items-center justify-between">
                  <h3 className="text-[14px] font-bold text-[var(--heading)]">Compare Queue</h3>
                  <span className="text-[12px] font-bold text-[var(--primary)] bg-[var(--primary)]/10 px-2.5 py-1 rounded-[6px]">{selectedForCompare.length}/4</span>
                </div>
                
                {selectedForCompare.length === 0 ? (
                  <div className="text-center py-10">
                    <Scale className="w-8 h-8 text-[#CBD5E1] mx-auto mb-3" />
                    <p className="text-[13px] text-[var(--body)] font-medium">Select up to 4 materials to compare specs side-by-side.</p>
                  </div>
                ) : (
                  <div className="flex flex-col gap-3 flex-1">
                    {selectedForCompare.map(p => (
                      <div key={p._id} className="flex gap-3 bg-white p-3 rounded-[12px] border border-[var(--border)] relative group shadow-sm hover:border-[var(--primary)]/30 transition-colors">
                        <img src={p.images?.[0] || ''} className="w-[60px] h-[60px] rounded-[8px] object-cover" alt="" />
                        <div className="flex-1 min-w-0 flex flex-col justify-center">
                          <h4 className="text-[13px] font-bold text-[var(--heading)] truncate leading-tight">{p.title}</h4>
                          <p className="text-[11px] text-[var(--body)] font-medium truncate mt-1">{p.fabricType}</p>
                        </div>
                        <button onClick={() => handleSelectForCompare(p, false)} className="absolute -top-2 -right-2 bg-white text-[var(--error)] border border-[var(--border)] p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-sm hover:bg-[#FEE2E2]">
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
                
                {selectedForCompare.length > 1 && (
                  <div className="mt-auto pt-4">
                    <Button className="w-full font-bold bg-[var(--heading)] hover:bg-[var(--primary)] text-white h-12 rounded-[12px] shadow-none" onClick={() => setIsCompareModalOpen(true)}>
                      <Scale className="w-4 h-4 mr-2" /> Launch Comparison
                    </Button>
                  </div>
                )}
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center">
                 <Box className="w-8 h-8 text-[#CBD5E1] mb-3" />
                 <p className="text-[13px] text-[#94A3B8] font-medium">This section is empty.</p>
              </div>
            )}
          </div>
        </aside>
      </div>

      {/* Comparison Modal */}
      <ProductComparisonModal isOpen={isCompareModalOpen} onClose={() => setIsCompareModalOpen(false)} selectedProducts={selectedForCompare} />
    </motion.div>
  )
}
