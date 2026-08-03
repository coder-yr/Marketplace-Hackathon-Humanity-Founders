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
  SlidersHorizontal
} from 'lucide-react'
import { motion } from 'framer-motion'
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
      className="min-h-screen bg-[var(--surface-0)] flex flex-col"
    >
      {/* 1. Top Workspace Toolbar */}
      <div className="sticky top-[72px] z-30 bg-[var(--surface-0)] border-b border-[var(--border-color)] py-3 px-6 shadow-sm">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Left: AI & Standard Search */}
          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="w-full md:w-96 relative flex items-center group">
              <Sparkles className="w-4 h-4 text-brand-primary absolute left-3 z-10" />
              <div className="w-full relative z-0">
                <AiSearchBar onFiltersExtracted={handleAiFilters} />
              </div>
            </div>
          </div>

          {/* Right: Quick Filters & Sort */}
          <div className="flex items-center gap-3 w-full md:w-auto overflow-x-auto pb-2 md:pb-0 hide-scrollbar">
            <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-[var(--border-color)] bg-[var(--surface-1)] hover:bg-[var(--surface-2)] text-xs font-semibold text-[var(--text-secondary)] whitespace-nowrap transition-colors">
              <Bookmark className="w-3.5 h-3.5" /> Saved Searches
            </button>
            <div className="w-px h-6 bg-[var(--border-color)] mx-1" />
            <button 
              onClick={() => setFilters({ ...filters, stockStatus: 'in_stock', page: 1 })}
              className={`px-3 py-1.5 rounded-lg border text-xs font-semibold whitespace-nowrap transition-colors ${filters.stockStatus === 'in_stock' ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400' : 'border-[var(--border-color)] bg-[var(--surface-1)] hover:bg-[var(--surface-2)] text-[var(--text-secondary)]'}`}
            >
              In Stock Only
            </button>
            <button className="px-3 py-1.5 rounded-lg border border-[var(--border-color)] bg-[var(--surface-1)] hover:bg-[var(--surface-2)] text-xs font-semibold text-[var(--text-secondary)] whitespace-nowrap transition-colors">
              Eco-Certified
            </button>
            <div className="w-px h-6 bg-[var(--border-color)] mx-1" />
            <SortDropdown options={SORT_OPTIONS} value={filters.sort || 'newest'} onChange={handleSortChange} />
          </div>
        </div>
      </div>

      {/* 2. Main Sourcing Workspace */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* Left Sidebar (Filters) */}
        <aside className="w-72 flex-shrink-0 border-r border-[var(--border-color)] bg-[var(--surface-0)] overflow-y-auto hidden lg:block p-6">
          <ProductFilterPanel filters={filters} categories={categories} onChange={handleFilterChange} onReset={handleResetFilters} />
        </aside>

        {/* Center Grid (Products) */}
        <main className="flex-1 overflow-y-auto bg-[var(--surface-1)] p-6 relative">
          <div className="max-w-[1200px] mx-auto">
            {/* Results Header */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-display font-bold text-[var(--text-primary)]">
                Marketplace Results
                <span className="ml-2 text-sm font-normal text-[var(--text-tertiary)]">({pagination.total} materials)</span>
              </h2>
              
              <button
                onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
                className="lg:hidden flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[var(--surface-2)] border border-[var(--border-color)] text-[var(--text-primary)] text-xs font-semibold"
              >
                <SlidersHorizontal className="w-3.5 h-3.5" /> Filters
              </button>
            </div>

            {/* Mobile Filter Drawer */}
            {isMobileFilterOpen && (
              <div className="lg:hidden mb-6 bg-[var(--surface-0)] p-4 rounded-xl border border-[var(--border-color)]">
                <ProductFilterPanel filters={filters} categories={categories} onChange={handleFilterChange} onReset={handleResetFilters} />
              </div>
            )}

            {/* Content */}
            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div key={i} className="bg-[var(--surface-0)] rounded-xl border border-[var(--border-color)] p-4 flex flex-col gap-3">
                    <Skeleton className="aspect-[4/3] w-full rounded-lg" />
                    <Skeleton className="h-4 w-2/3" />
                    <Skeleton className="h-3 w-1/2" />
                    <Skeleton className="h-12 w-full rounded-lg mt-4" />
                  </div>
                ))}
              </div>
            ) : products.length === 0 ? (
              <EmptyState type="search-empty" action={{ label: 'Clear Filters', onClick: handleResetFilters }} />
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
              >
                {products.map((product) => (
                  <ProductCard key={product._id} product={product} onSelectForCompare={handleSelectForCompare} isSelectedForCompare={selectedForCompare.some(p => p._id === product._id)} />
                ))}
              </motion.div>
            )}

            {/* Pagination */}
            {!isLoading && pagination.pages > 1 && (
              <div className="mt-10 mb-10 flex justify-center">
                <Pagination page={pagination.page} totalPages={pagination.pages} onPageChange={handlePageChange} />
              </div>
            )}
          </div>
        </main>

        {/* Right Inspector Panel */}
        <aside className="w-80 flex-shrink-0 border-l border-[var(--border-color)] bg-[var(--surface-0)] flex flex-col hidden xl:flex">
          {/* Inspector Tabs */}
          <div className="flex items-center border-b border-[var(--border-color)] p-2 gap-1 bg-[var(--surface-1)]">
            {[
              { id: 'recent', icon: Clock, label: 'Recent' },
              { id: 'compared', icon: Scale, label: 'Compare' },
              { id: 'saved', icon: Bookmark, label: 'Saved' },
              { id: 'rfqs', icon: FileText, label: 'RFQs' }
            ].map(tab => (
              <button 
                key={tab.id}
                onClick={() => setInspectorTab(tab.id as any)}
                className={`flex-1 flex flex-col items-center gap-1.5 py-2 px-1 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-colors ${inspectorTab === tab.id ? 'bg-[var(--surface-0)] text-brand-primary shadow-sm border border-[var(--border-color)]' : 'text-[var(--text-tertiary)] hover:text-[var(--text-secondary)] hover:bg-[var(--surface-2)] border border-transparent'}`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
                {tab.id === 'compared' && selectedForCompare.length > 0 && (
                  <span className="absolute top-2 right-2 w-2 h-2 bg-brand-primary rounded-full" />
                )}
              </button>
            ))}
          </div>

          {/* Inspector Content */}
          <div className="flex-1 overflow-y-auto p-4 bg-[var(--surface-0)]">
            {inspectorTab === 'compared' ? (
              <div className="flex flex-col gap-4 h-full">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-[var(--text-primary)]">Compare Queue</h3>
                  <span className="text-xs font-semibold text-brand-primary bg-brand-primary/10 px-2 py-0.5 rounded-md">{selectedForCompare.length}/4</span>
                </div>
                
                {selectedForCompare.length === 0 ? (
                  <EmptyState type="generic" title="Queue Empty" description="Select up to 4 materials to compare specs side-by-side." compact />
                ) : (
                  <div className="flex flex-col gap-3 flex-1">
                    {selectedForCompare.map(p => (
                      <div key={p._id} className="flex gap-3 bg-[var(--surface-1)] p-2 rounded-xl border border-[var(--border-color)] relative group">
                        <img src={p.images?.[0]} className="w-16 h-16 rounded-lg object-cover" alt="" />
                        <div className="flex-1 min-w-0 flex flex-col justify-center">
                          <h4 className="text-xs font-bold text-[var(--text-primary)] truncate">{p.title}</h4>
                          <p className="text-[10px] text-[var(--text-secondary)] truncate mt-0.5">{p.fabricType}</p>
                        </div>
                        <button onClick={() => handleSelectForCompare(p, false)} className="absolute -top-1.5 -right-1.5 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-md hover:bg-red-600">
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
                
                {selectedForCompare.length > 1 && (
                  <div className="mt-auto pt-4 border-t border-[var(--border-color)]">
                    <Button className="w-full font-bold shadow-md" onClick={() => setIsCompareModalOpen(true)}>
                      <Scale className="w-4 h-4 mr-2" /> Launch Comparison
                    </Button>
                  </div>
                )}
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center">
                <EmptyState type="generic" title={`No ${inspectorTab}`} description="This section of the inspector is currently empty." compact />
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
