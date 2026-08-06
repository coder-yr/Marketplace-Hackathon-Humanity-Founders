import { useState, useEffect } from 'react'
import { Pagination } from '@/shared/components/data/pagination'
import { SortDropdown } from '@/shared/components/data/sort-dropdown'
import { ProductCard } from '../components/ProductCard'
import { ProductFilterPanel } from '../components/ProductFilterPanel'
import { productsApi } from '../api/products.api'
import { Product, Category, ProductFilterParams, Pagination as PaginationType } from '../types/products.types'
import { AiSearchBar } from '@/features/ai/components/AiSearchBar'
import { SupplierComparisonMatrix } from '../components/SupplierComparisonMatrix'
import { LiveAiAnalysisPanel } from '@/features/ai/components/LiveAiAnalysisPanel'
import { SearchIntentFilters } from '@/features/ai/types/ai.types'
import { 
  Sparkles,
  Scale,
  FileText,
  SlidersHorizontal,
  Box,
  Building2,
  Mic,
  Upload,
  ClipboardPaste,
  TrendingUp,
  Clock,
  DollarSign,
  ShieldCheck,
  Leaf,
  Activity
} from 'lucide-react'
import { Button } from '@/shared/components/ui/button'
import { motion } from 'framer-motion'
import { staggerContainerVariants as staggerContainer, fadeVariants as fadeIn } from '@/shared/animations'
import { toast } from 'sonner'
import { useNavigate } from 'react-router-dom'

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
  const navigate = useNavigate()

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
          // Fake AI Score logic for the hackathon UI
          const dataWithScores = (res.data || []).map((p, i) => ({
            ...p,
            aiScore: p.aiScore || Math.max(75, 98 - i * 3) // Assign fake scores if missing
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
        toast.error("You can only compare up to 4 suppliers at a time.")
      }
    } else {
      setSelectedForCompare(selectedForCompare.filter((p) => p._id !== product._id))
    }
  }

  return (
    <div className="min-h-[calc(100vh-100px)] bg-[#F7F8FA] flex flex-col font-sans relative">
      
      {/* 1. Procurement Command Center & Live Metrics */}
      <div className="bg-white border-b border-[#E2E8F0] pt-10 pb-6 px-4 lg:px-8 relative z-20 overflow-hidden shadow-sm">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#0066FF] via-[#38BDF8] to-[#10B981]" />
        
        <div className="max-w-[1400px] mx-auto">
          {/* Top Row: AI Search */}
          <div className="max-w-4xl mx-auto text-center mb-8">
             <h1 className="text-[32px] font-display font-extrabold text-[#0A2540] mb-3 tracking-tight">Enterprise Procurement OS</h1>
             <p className="text-[#64748B] text-[15px] mb-8 font-medium">Describe your sourcing requirements. Our AI will identify the optimal verified suppliers.</p>
             
             <div className="relative mb-6 shadow-md rounded-[16px]">
               <AiSearchBar onFiltersExtracted={handleAiFilters} />
             </div>

             {/* Quick Actions */}
             <div className="flex items-center justify-center gap-3 flex-wrap">
                <Button onClick={() => navigate('/dashboard/procurement')} className="bg-[#0A2540] hover:bg-[#0066FF] text-white h-10 px-5 rounded-[10px] text-[13px] font-bold shadow-sm">
                  <Sparkles className="w-4 h-4 mr-2 text-[#FDE047]" /> Generate RFQ
                </Button>
                <Button variant="outline" className="border-[#E2E8F0] text-[#0A2540] h-10 px-4 rounded-[10px] text-[13px] font-bold bg-[#F8FAFC] hover:bg-[#F1F5F9]">
                  <Upload className="w-4 h-4 mr-2 text-[#64748B]" /> Upload Specification
                </Button>
                <Button variant="outline" className="border-[#E2E8F0] text-[#0A2540] h-10 px-4 rounded-[10px] text-[13px] font-bold bg-[#F8FAFC] hover:bg-[#F1F5F9]">
                  <ClipboardPaste className="w-4 h-4 mr-2 text-[#64748B]" /> Paste Requirement
                </Button>
                <Button variant="outline" className="border-[#E2E8F0] text-[#0A2540] h-10 w-10 p-0 rounded-[10px] flex items-center justify-center bg-[#F8FAFC] hover:bg-[#F1F5F9]" title="Voice Search">
                  <Mic className="w-4 h-4 text-[#64748B]" />
                </Button>
             </div>
          </div>
          
          {/* Bottom Row: Live Procurement Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4 border-t border-[#F1F5F9] pt-6">
             <MetricCard title="Verified Mills" value="2,450+" icon={<Building2 className="w-3.5 h-3.5" />} color="text-[#0066FF]" />
             <MetricCard title="Average Price" value="$4.12/m" icon={<DollarSign className="w-3.5 h-3.5" />} color="text-[#10B981]" />
             <MetricCard title="Avg Lead Time" value="14 Days" icon={<Clock className="w-3.5 h-3.5" />} color="text-[#F59E0B]" />
             <MetricCard title="Avg AI Match" value="94%" icon={<Sparkles className="w-3.5 h-3.5" />} color="text-[#0066FF]" />
             <MetricCard title="Est. Savings" value="12.4%" icon={<TrendingUp className="w-3.5 h-3.5" />} color="text-[#10B981]" />
             <MetricCard title="Monthly RFQs" value="45K" icon={<FileText className="w-3.5 h-3.5" />} color="text-[#8B5CF6]" />
             <MetricCard title="Supplier Trust" value="4.8/5" icon={<ShieldCheck className="w-3.5 h-3.5" />} color="text-[#F59E0B]" />
             <MetricCard title="Carbon Score" value="Class A" icon={<Leaf className="w-3.5 h-3.5" />} color="text-[#10B981]" />
          </div>
        </div>
      </div>

      {/* 2. Main Procurement Workspace Layout */}
      <div className="flex-1 flex overflow-hidden max-w-[1400px] w-full mx-auto">
        
        {/* Left Sidebar (Procurement Filters) */}
        <aside className="w-72 flex-shrink-0 border-r border-[#E2E8F0] bg-white overflow-y-auto hidden lg:block p-6">
          <ProductFilterPanel filters={filters} categories={categories} onChange={handleFilterChange} onReset={handleResetFilters} />
        </aside>

        {/* Center Grid (Procurement Intelligence Cards) */}
        <main className="flex-1 overflow-y-auto bg-[#F7F8FA] p-4 lg:p-8 relative">
          <div className="max-w-[1200px] mx-auto">
            
            {/* Results Header */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-[18px] font-display font-bold text-[#0A2540] flex items-center gap-2">
                <Activity className="w-5 h-5 text-[#0066FF]" /> Sourcing Results
                <span className="text-[13px] font-medium text-[#94A3B8] bg-[#F1F5F9] px-2 py-0.5 rounded-full">{pagination.total} verified suppliers</span>
              </h2>
              
              <div className="flex items-center gap-2">
                <SortDropdown options={SORT_OPTIONS} value={filters.sort || 'newest'} onChange={handleSortChange} />
                <button
                  onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
                  className="lg:hidden flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white border border-[#E2E8F0] text-[#0A2540] text-[13px] font-bold shadow-sm"
                >
                  <SlidersHorizontal className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Content */}
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="bg-white rounded-[24px] border border-[#E2E8F0] h-[480px] animate-pulse" />
                ))}
              </div>
            ) : products.length === 0 ? (
              <div className="bg-white rounded-[24px] border border-[#E2E8F0] p-16 text-center flex flex-col items-center">
                 <Building2 className="w-16 h-16 text-[#CBD5E1] mb-4" />
                 <h3 className="text-[20px] font-display font-bold text-[#0A2540] mb-2">No Verified Suppliers Found</h3>
                 <p className="text-[#64748B] text-[14px] mb-6 max-w-sm">We couldn't find a supplier matching these exact procurement parameters. Try adjusting MOQ or Lead Time.</p>
                 <Button onClick={handleResetFilters} className="bg-[#0A2540] hover:bg-[#0066FF] text-white font-bold h-11 px-6 rounded-[10px]">Reset Procurement Filters</Button>
              </div>
            ) : (
              <motion.div 
                variants={staggerContainer}
                initial="initial"
                animate="animate"
                className="grid grid-cols-1 xl:grid-cols-2 gap-6"
              >
                {products.map((product) => (
                  <motion.div key={product._id} variants={fadeIn} className="h-full">
                    <ProductCard 
                      product={product} 
                      onSelectForCompare={handleSelectForCompare} 
                      isSelectedForCompare={selectedForCompare.some(p => p._id === product._id)} 
                    />
                  </motion.div>
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

        {/* Right Enterprise Workspace Panel */}
        <aside className="w-[340px] flex-shrink-0 border-l border-[#E2E8F0] bg-white hidden xl:flex flex-col relative z-10 shadow-[-4px_0_24px_rgba(0,0,0,0.02)]">
          <div className="p-4 border-b border-[#E2E8F0] bg-[#F8FAFC]">
            <h2 className="text-[15px] font-display font-bold text-[#0A2540] flex items-center gap-2">
              <Box className="w-4 h-4 text-[#0066FF]" /> Enterprise Workspace
            </h2>
          </div>
          
          <div className="flex-1 overflow-y-auto bg-[#F7F8FA] p-4 flex flex-col gap-6">
            
            {/* If items are selected for comparison, show Supplier Matrix, otherwise show Live AI */}
            {selectedForCompare.length > 0 ? (
              <SupplierComparisonMatrix products={selectedForCompare} />
            ) : (
              <LiveAiAnalysisPanel />
            )}
            
            {/* Selected Materials Draft RFQ Summary */}
            <div className="bg-white rounded-[16px] border border-[#E2E8F0] p-4 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-[13px] font-bold text-[#0A2540]">Draft RFQ Status</h3>
                <span className="text-[10px] font-bold bg-[#0066FF]/10 text-[#0066FF] px-2 py-0.5 rounded">{selectedForCompare.length} Selected</span>
              </div>
              
              {selectedForCompare.length === 0 ? (
                <div className="text-center py-6">
                  <Scale className="w-8 h-8 text-[#CBD5E1] mx-auto mb-2" />
                  <p className="text-[11px] text-[#64748B] font-medium px-4">Select up to 4 suppliers to begin comparison and RFQ generation.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-[#64748B]">Est. Total Spend</span>
                    <span className="font-bold text-[#0A2540]">$0.00</span>
                  </div>
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-[#64748B]">Potential Savings</span>
                    <span className="font-bold text-[#16A34A]">--</span>
                  </div>
                  <Button className="w-full bg-[#0A2540] hover:bg-[#0066FF] text-white text-[12px] font-bold h-10 rounded-[10px] mt-2 shadow-none">
                    Generate Batch RFQ
                  </Button>
                </div>
              )}
            </div>

          </div>
        </aside>
      </div>

      {/* Floating Copilot Button */}
      <button className="fixed bottom-6 right-6 w-14 h-14 bg-[#0A2540] text-white rounded-full shadow-[0_8px_30px_rgba(10,37,64,0.3)] flex items-center justify-center hover:scale-105 transition-transform group z-50">
        <Sparkles className="w-6 h-6 group-hover:text-[#FDE047] transition-colors" />
      </button>
    </div>
  )
}

function MetricCard({ title, value, icon, color }: { title: string, value: string, icon: React.ReactNode, color: string }) {
  return (
    <div className="flex flex-col gap-1 items-center justify-center text-center">
      <div className={`w-8 h-8 rounded-full bg-[#F1F5F9] flex items-center justify-center ${color} mb-1`}>
        {icon}
      </div>
      <span className="text-[10px] font-bold text-[#94A3B8] uppercase tracking-wider">{title}</span>
      <span className="text-[18px] font-display font-extrabold text-[#0A2540]">{value}</span>
    </div>
  )
}
