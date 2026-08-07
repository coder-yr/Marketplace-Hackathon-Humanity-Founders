import { useState, useEffect } from 'react'
import { Pagination } from '@/shared/components/data/pagination'
import { ProductCard } from '../components/ProductCard'
import { ProductFilterPanel } from '../components/ProductFilterPanel'
import { productsApi } from '../api/products.api'
import { Product, Category, ProductFilterParams, Pagination as PaginationType } from '../types/products.types'
import { AiSearchBar } from '@/features/ai/components/AiSearchBar'
import { LiveAiAnalysisPanel } from '@/features/ai/components/LiveAiAnalysisPanel'
import { SearchIntentFilters } from '@/features/ai/types/ai.types'
import { 
  SlidersHorizontal,
  Building2,
  LayoutGrid,
  ListFilter
} from 'lucide-react'
import { Button } from '@/shared/components/ui/button'
import { motion, AnimatePresence } from 'framer-motion'
import { presets } from '@/shared/animations/presets'

export function MarketplacePage() {
  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [pagination, setPagination] = useState<PaginationType>({ page: 1, limit: 12, total: 0, pages: 1 })
  const [isLoading, setIsLoading] = useState(true)
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false)

  const [filters, setFilters] = useState<ProductFilterParams>({
    page: 1,
    limit: 12,
    sort: 'newest',
  })

  // Comparison State
  const [selectedForCompare, setSelectedForCompare] = useState<Product[]>([])

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
          const dataWithScores = (res.data || []).map((p, i) => ({
            ...p,
            aiScore: p.aiScore || Math.max(78, 96 - i * 4)
          }))
          setProducts(dataWithScores)
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
      }
    } else {
      setSelectedForCompare(selectedForCompare.filter((p) => p._id !== product._id))
    }
  }

  return (
    <div className="min-h-screen bg-[#F4F6F8] flex flex-col font-sans text-[#0A2540]">
      
      {/* 1. Hero Command Bar & Key Metrics Strip */}
      <div className="max-w-[1400px] w-full mx-auto px-4 lg:px-8 pt-6 pb-4">
        
        {/* Search Header Container */}
        <div className="bg-white rounded-[28px] border border-[#E2E8F0] p-6 shadow-sm mb-4">
          <AiSearchBar onFiltersExtracted={handleAiFilters} />
          
          {/* Key Metrics Strip (Horizontal Row) */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 pt-5 mt-5 border-t border-[#F1F5F9] items-center text-center sm:text-left">
            <div>
              <span className="block text-[9px] font-black text-[#94A3B8] uppercase tracking-wider">MATERIALS</span>
              <span className="text-[18px] font-display font-extrabold text-[#0A2540]">124</span>
            </div>

            <div>
              <span className="block text-[9px] font-black text-[#94A3B8] uppercase tracking-wider">VERIFIED SUPPLIERS</span>
              <span className="text-[18px] font-display font-extrabold text-[#0A2540]">87</span>
            </div>

            <div>
              <span className="block text-[9px] font-black text-[#94A3B8] uppercase tracking-wider">AVG PRICE</span>
              <span className="text-[18px] font-display font-extrabold text-[#0A2540]">$6.80/m</span>
            </div>

            <div>
              <span className="block text-[9px] font-black text-[#94A3B8] uppercase tracking-wider">LEAD TIME</span>
              <span className="text-[18px] font-display font-extrabold text-[#0A2540]">12 Days</span>
            </div>

            <div className="bg-[#E0F2FE] p-2.5 rounded-2xl flex flex-col items-center justify-center">
              <span className="block text-[8px] font-black text-[#0284C7] uppercase tracking-wider">AI MATCH</span>
              <span className="text-[16px] font-display font-black text-[#0284C7]">96%</span>
            </div>

            <div className="bg-[#DCFCE7] p-2.5 rounded-2xl flex flex-col items-center justify-center">
              <span className="block text-[8px] font-black text-[#15803D] uppercase tracking-wider">MARKET DEMAND</span>
              <span className="text-[14px] font-display font-black text-[#15803D]">Demand ↑</span>
            </div>
          </div>
        </div>

      </div>

      {/* 2. Main 3-Column Marketplace Layout */}
      <div className="max-w-[1400px] w-full mx-auto px-4 lg:px-8 flex-1 flex gap-6 pb-12">
        
        {/* Left Filter Sidebar */}
        <aside className="w-64 flex-shrink-0 bg-white border border-[#E2E8F0] rounded-[24px] p-5 shadow-sm hidden lg:block self-start sticky top-24">
          <ProductFilterPanel 
            filters={filters} 
            categories={categories} 
            onChange={handleFilterChange} 
            onReset={handleResetFilters} 
          />
        </aside>

        {/* Center Main Stream: AI Recommended Sources */}
        <main className="flex-1 min-w-0 flex flex-col gap-5">
          
          {/* Header Controls */}
          <div className="flex items-center justify-between">
            <h2 className="text-[20px] font-display font-black text-[#0A2540] flex items-center gap-2">
              <span>AI Recommended Sources</span>
              <span className="text-[13px] font-bold text-[#94A3B8] font-sans">
                (Showing {products.length} of {pagination.total || 124} results)
              </span>
            </h2>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
                className="lg:hidden flex items-center gap-2 px-3 py-2 rounded-xl bg-white border border-[#E2E8F0] text-[#0A2540] text-[13px] font-bold shadow-sm"
              >
                <SlidersHorizontal className="w-4 h-4" /> Filters
              </button>

              <div className="flex items-center bg-white border border-[#E2E8F0] rounded-xl p-1 shadow-sm">
                <button className="p-1.5 rounded-lg bg-[#F1F5F9] text-[#2563EB]">
                  <LayoutGrid className="w-4 h-4" />
                </button>
                <button className="p-1.5 rounded-lg text-[#94A3B8] hover:text-[#0A2540]">
                  <ListFilter className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Product Feed */}
          {isLoading ? (
            <div className="flex flex-col gap-4">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="bg-white rounded-[24px] border border-[#E2E8F0] h-[240px] animate-pulse" />
              ))}
            </div>
          ) : products.length === 0 ? (
            <div className="bg-white rounded-[24px] border border-[#E2E8F0] p-12 text-center flex flex-col items-center">
              <Building2 className="w-12 h-12 text-[#CBD5E1] mb-3" />
              <h3 className="text-[18px] font-bold text-[#0A2540] mb-1">No Matching Materials Found</h3>
              <p className="text-[#64748B] text-[13px] mb-4">Try relaxing your MOQ or Composition filters.</p>
              <Button onClick={handleResetFilters} className="bg-[#2563EB] text-white font-bold h-10 px-5 rounded-xl">
                Reset Filters
              </Button>
            </div>
          ) : (
            <motion.div 
              {...presets.staggeredList}
              layout
              className="flex flex-col gap-4"
            >
              <AnimatePresence mode="popLayout">
                {products.map((product) => (
                  <motion.div 
                    key={product._id} 
                    layout
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                  >
                    <ProductCard 
                      product={product} 
                      onSelectForCompare={handleSelectForCompare} 
                      isSelectedForCompare={selectedForCompare.some(p => p._id === product._id)} 
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}

          {/* Pagination */}
          {!isLoading && pagination.pages > 1 && (
            <div className="mt-6 flex justify-center">
              <Pagination page={pagination.page} totalPages={pagination.pages} onPageChange={handlePageChange} />
            </div>
          )}
        </main>

        {/* Right Workspace Sidebar */}
        <aside className="w-80 flex-shrink-0 hidden xl:block self-start sticky top-24">
          <LiveAiAnalysisPanel />
        </aside>

      </div>
    </div>
  )
}
