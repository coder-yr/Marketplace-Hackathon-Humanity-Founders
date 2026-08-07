import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { useAuthStore } from '@/features/auth/store/auth.store'
import { useCartStore } from '@/features/cart/store/cart.store'
import { useAiTask } from '@/shared/hooks/useAiTask'
import { Container } from '@/shared/components/layout/container'
import { Badge } from '@/shared/components/ui/badge'
import { Button } from '@/shared/components/ui/button'
import { Skeleton } from '@/shared/components/feedback/skeleton'
import { ProductGallery } from '../components/ProductGallery'
import { productsApi } from '../api/products.api'
import { rfqsApi } from '@/features/dashboard/api/rfqs.api'
import { Product, SupplierProfileSummary } from '../types/products.types'
import {
  ChevronRight, Sparkles, Star, FileText, ShoppingCart, CheckCircle2, TrendingUp, ShieldCheck, Bookmark, Clock, X, BarChart3, AlertTriangle, Zap, Globe, Factory, ArrowDownToLine, Scale
} from 'lucide-react'
import { toast } from 'sonner'
import { motion, AnimatePresence } from 'framer-motion'

export function ProductDetailPage() {
  const { idOrSlug } = useParams<{ idOrSlug: string }>()
  const navigate = useNavigate()
  const [product, setProduct] = useState<Product | null>(null)
  const [supplierProfile, setSupplierProfile] = useState<SupplierProfileSummary | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const { isAuthenticated, user } = useAuthStore()
  const { addToCart } = useCartStore()

  const [selectedQuantity, setSelectedQuantity] = useState<number>(1)
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [isAssistantOpen, setIsAssistantOpen] = useState(false)
  
  // RFQ State
  const [isRfqModalOpen, setIsRfqModalOpen] = useState(false)
  const [rfqForm, setRfqForm] = useState({ quantity: '', targetPrice: '', notes: '', deliveryAddress: '' })
  const [isSubmittingRfq, setIsSubmittingRfq] = useState(false)
  
  // AI Task State
  const [aiData, setAiData] = useState<any>(null)
  const { runAiTask, isThinking: isAiThinking, progress, step: aiStepLabel } = useAiTask()

  const triggerAiWorkflow = () => {
    setIsAssistantOpen(true)
    runAiTask({
      endpoint: '/ai/product-intelligence',
      payload: { product, supplier: supplierProfile },
      onSuccess: (data) => {
        setAiData(data)
        if (product?._id) {
          localStorage.setItem(`aiData_${product._id}`, JSON.stringify(data))
        }
        toast.success('AI Analysis Complete')
      },
      onError: (err) => {
        toast.error(err.message)
      }
    })
  }

  useEffect(() => {
    if (!idOrSlug) return
    setIsLoading(true)

    productsApi
      .getProductBySlugOrId(idOrSlug)
      .then((res) => {
        if (res.data) {
          const p = res.data.product;
          setProduct(p)
          setSupplierProfile(res.data.supplierProfile || null)
          
          if (p.moq) {
            setSelectedQuantity(p.moq.value)
          }
        }
        setIsLoading(false)
      })
      .catch((err) => {
        console.error('Failed to load product details', err)
        setIsLoading(false)
      })
  }, [idOrSlug])

  // Load cached AI Data on product load
  useEffect(() => {
    if (product?._id) {
      const cached = localStorage.getItem(`aiData_${product._id}`)
      if (cached) {
        try {
          setAiData(JSON.parse(cached))
        } catch (e) {
          // ignore cache errors
        }
      }
    }
  }, [product?._id])

  const handleAddToCart = async () => {
    if (!isAuthenticated) return navigate('/login')
    if (user?.role !== 'buyer') return toast.error('Only buyers can add items to cart')
    if (!product) return

    try {
      await addToCart({
        productId: product._id,
        supplierId: typeof product.supplierId === 'object' ? product.supplierId._id : product.supplierId,
        quantity: selectedQuantity,
        price: product.priceRange.min
      })
      toast.success('Added to Procurement Cart Prototype')
    } catch (error: any) {
      toast.error(error.message || 'Failed to add to cart')
    }
  }

  const handleToggleBookmark = () => {
    setIsBookmarked(!isBookmarked)
    toast.success(isBookmarked ? 'Removed from saved materials' : 'Saved to Procurement List')
  }

  const handleSubmitRfq = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!isAuthenticated) return navigate('/login')
    if (user?.role !== 'buyer') return toast.error('Only buyers can request quotes')
    if (!product || !supplierProfile) return

    setIsSubmittingRfq(true)
    try {
      await rfqsApi.createRfq({
        supplierId: typeof product.supplierId === 'object' ? product.supplierId._id : product.supplierId,
        productId: product._id,
        quantity: parseInt(rfqForm.quantity) || product.moq?.value || 100,
        targetPrice: parseFloat(rfqForm.targetPrice) || undefined,
        notes: rfqForm.notes,
        deliveryAddress: rfqForm.deliveryAddress
      })
      toast.success('RFQ Submitted successfully!')
      setIsRfqModalOpen(false)
      navigate('/dashboard/procurement')
    } catch (err: any) {
      toast.error(err.message || 'Failed to submit RFQ')
    } finally {
      setIsSubmittingRfq(false)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#F7F8FA] py-12">
        <Container className="max-w-[1400px]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-5"><Skeleton className="aspect-[4/3] w-full rounded-[24px]" /></div>
            <div className="lg:col-span-4 flex flex-col gap-4">
              <Skeleton className="h-8 w-3/4" />
              <Skeleton className="h-6 w-1/2" />
              <Skeleton className="h-24 w-full rounded-[16px]" />
            </div>
            <div className="lg:col-span-3"><Skeleton className="h-64 w-full rounded-[24px]" /></div>
          </div>
        </Container>
      </div>
    )
  }

  if (!product) return null
  const supplierName = supplierProfile?.companyName || (typeof product.supplierId === 'object' ? product.supplierId.fullName : 'Enterprise Supplier')

  // --- DYNAMIC AI DATA MAPPING ---
  const trustScore = aiData?.supplier?.trustScore || '--';
  const supplierCountry = supplierProfile?.factoryAddress?.split(',').pop()?.trim() || 'India';
  const exportsCount = 15;
  const ordersCount = supplierProfile?.totalOrders || 120;
  const capacity = '50k';
  const responseHours = 24;

  const basePrice = product.priceRange?.min || 9.50;
  const savingsOpp = aiData?.comparison?.estimatedSavings || '--';
  const riskLevel = aiData?.procurement?.risk || 'UNKNOWN';

  const specMatch = aiData?.material?.score || '--';
  const supplierRel = aiData?.supplier?.trustScore || '--';
  const marketVal = aiData?.market?.marketValue || '--';
  const sustainability = 85;

  const alt1Trust = aiData?.comparison?.comparison?.[0]?.trustScore || '--';
  const alt2Trust = aiData?.comparison?.comparison?.[1]?.trustScore || '--';

  const leadTimeDays = parseInt(String(product.leadTime)) || 14;
  const alt1LeadTime = aiData?.comparison?.comparison?.[0]?.leadTime?.match(/\d+/)?.[0] || String(Math.max(1, leadTimeDays - 2));
  const alt2LeadTime = aiData?.comparison?.comparison?.[1]?.leadTime?.match(/\d+/)?.[0] || String(Math.max(1, leadTimeDays - 1));

  const savingsAmount = (parseFloat(String(savingsOpp || 1.7)) * (product.moq?.value || 500)).toLocaleString(); 
  
  const tags = product.tags?.length ? product.tags : ['Fashion', 'Textile', 'Apparel'];

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-24 font-sans relative">
      
      {/* ── BREADCRUMBS ────────────────────────────────────────────── */}
      <div className="bg-[#0A2540] sticky top-[72px] z-30">
        <Container className="max-w-[1400px] py-3 flex justify-between items-center">
           <div className="flex items-center gap-2 text-[11px] font-bold text-white/70 uppercase tracking-widest">
             <Link to="/" className="hover:text-white transition-colors">Home</Link>
             <ChevronRight className="w-3 h-3 text-white/40" />
             <Link to="/products" className="hover:text-white transition-colors">Marketplace</Link>
             <ChevronRight className="w-3 h-3 text-white/40" />
             <span className="text-white truncate max-w-[200px]">{product.title}</span>
           </div>
           
           <div className="flex items-center gap-3">
             <Button variant="ghost" onClick={handleToggleBookmark} className="h-8 text-white/70 hover:text-white hover:bg-white/10 text-[12px] font-bold px-3">
               <Bookmark className={`w-3.5 h-3.5 mr-1.5 ${isBookmarked ? 'fill-white text-white' : ''}`} /> {isBookmarked ? 'Saved' : 'Save Spec'}
             </Button>
           </div>
        </Container>
      </div>

      <Container className="max-w-[1400px] py-8 space-y-8">

        {/* ── TOP SECTION: HERO & DECISION CENTER ──────────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Left: Product Gallery */}
          <div className="lg:col-span-5">
            <ProductGallery images={product.images || []} title={product.title} />
          </div>

          {/* Middle/Right: Title, KPIs, & Decision Center */}
          <div className="lg:col-span-7 flex flex-col">
            
            <div className="mb-6">
              <Badge className="bg-[#E0E7FF] text-[#4F46E5] font-bold text-[10px] tracking-widest uppercase mb-3 border-transparent">
                {product.category?.name || 'Textile'} • {product.subCategory || product.fabricType}
              </Badge>
              
              <h1 className="text-[32px] lg:text-[40px] font-display font-extrabold text-[#0A2540] leading-tight mb-4 tracking-tight">
                {product.title}
              </h1>

              {/* Compact Row of Procurement KPIs */}
              <div className="flex flex-wrap items-center gap-3 mb-6">
                <div className="flex items-center gap-1 text-[13px] font-bold text-[#F59E0B] bg-[#FFFBEB] px-2.5 py-1 rounded-md border border-[#FEF3C7]">
                  <Star className="w-4 h-4 fill-[#F59E0B]" /> 4.9 <span className="text-[#928261] font-medium ml-1">(128)</span>
                </div>
                <div className="flex items-center gap-1.5 text-[13px] font-bold text-[#0066FF] bg-[#EFF6FF] px-2.5 py-1 rounded-md border border-[#DBEAFE]">
                  <Sparkles className="w-4 h-4" /> {specMatch}% AI Match
                </div>
                <div className="flex items-center gap-1.5 text-[13px] font-bold text-[#0A2540] bg-white px-2.5 py-1 rounded-md border border-[#E2E8F0]">
                  <Factory className="w-4 h-4 text-[#64748B]" /> {capacity} m/month
                </div>
                <div className="flex items-center gap-1.5 text-[13px] font-bold text-[#0A2540] bg-white px-2.5 py-1 rounded-md border border-[#E2E8F0]">
                  <Clock className="w-4 h-4 text-[#64748B]" /> {product.leadTime || '7-14 Days'}
                </div>
                <div className="flex items-center gap-1.5 text-[13px] font-bold text-[#16A34A] bg-[#F0FDF4] px-2.5 py-1 rounded-md border border-[#DCFCE7]">
                  ISO • OEKO • GOTS
                </div>
                <div className="flex items-center gap-1.5 text-[13px] font-bold text-[#0A2540] bg-white px-2.5 py-1 rounded-md border border-[#E2E8F0]">
                  <Globe className="w-4 h-4 text-[#64748B]" /> {exportsCount} Countries Exported
                </div>
              </div>

              <p className="text-[#475569] text-[15px] leading-relaxed max-w-3xl">
                {product.description || product.shortDescription}
              </p>
            </div>

            {/* AI DECISION CENTER */}
            <div className="bg-white rounded-[24px] border border-[#E2E8F0] shadow-sm p-6 mt-auto relative overflow-hidden">
              
              {/* --- DYNAMIC STATES --- */}
              {isAiThinking && (
                <div className="absolute inset-0 bg-white/95 backdrop-blur-md z-10 flex flex-col items-center justify-center p-6 text-center animate-in fade-in duration-300">
                  <div className="relative w-16 h-16 mb-4">
                    <div className="absolute inset-0 rounded-full border-[3px] border-[#E2E8F0]"></div>
                    <div className="absolute inset-0 rounded-full border-[3px] border-[#0066FF] border-t-transparent animate-spin"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Sparkles className="w-6 h-6 text-[#0066FF] animate-pulse" />
                    </div>
                  </div>
                  <p className="text-[15px] font-bold text-[#0A2540] mb-3">{aiStepLabel || 'Analyzing specifications...'}</p>
                  <div className="w-full max-w-[200px] h-1.5 bg-[#F1F5F9] rounded-full overflow-hidden">
                    <div className="h-full bg-[#0066FF] transition-all duration-300" style={{ width: `${progress}%` }} />
                  </div>
                </div>
              )}

              {!aiData && !isAiThinking && (
                <div className="absolute inset-0 bg-white/80 backdrop-blur-[3px] z-10 flex flex-col items-center justify-center p-6 text-center animate-in fade-in">
                  <div className="w-12 h-12 bg-[#EFF6FF] text-[#0066FF] rounded-full flex items-center justify-center mb-3">
                    <Sparkles className="w-6 h-6" />
                  </div>
                  <h4 className="text-[15px] font-bold text-[#0A2540] mb-1">AI Intelligence Inactive</h4>
                  <p className="text-[13px] text-[#64748B] mb-4">Run analysis to unlock procurement insights.</p>
                  <Button onClick={triggerAiWorkflow} className="h-10 bg-[#0A2540] hover:bg-[#0066FF] text-white font-bold text-[13px] shadow-sm rounded-full px-6">
                    Run AI Analysis
                  </Button>
                </div>
              )}
              {/* ----------------------- */}

              <div className="flex items-center justify-between mb-5">
                <h3 className="text-[16px] font-display font-bold text-[#0A2540] flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-[#0066FF]" /> Procurement Decision Center
                </h3>
                <span className="text-[12px] font-bold text-[#64748B]">Analyzed just now</span>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="space-y-1">
                  <span className="text-[11px] font-bold text-[#94A3B8] uppercase tracking-wider">AI Score</span>
                  <div className="flex justify-between items-end gap-2">
                    <span className="text-[32px] font-display font-extrabold text-[#0A2540] leading-none truncate max-w-[50%]" title={String(marketVal)}>{marketVal}</span>
                    <span className="text-[14px] font-bold text-[#10B981] flex items-center gap-1 mb-1 truncate max-w-[50%]" title={String(aiData?.market?.priceTrend || 'Stable')}>
                      {aiData?.market?.priceTrend === 'DOWN' ? <TrendingUp className="w-4 h-4 rotate-180 flex-shrink-0" /> : <TrendingUp className="w-4 h-4 flex-shrink-0" />} 
                      <span className="truncate">{aiData?.market?.priceTrend || 'Stable'}</span>
                    </span>
                  </div>
                </div>
                <div className="space-y-1">
                  <span className="text-[11px] font-bold text-[#94A3B8] uppercase tracking-wider">Supplier Trust</span>
                  <div className="text-[20px] font-bold text-[#10B981] flex items-center gap-1">
                    {trustScore} <ShieldCheck className="w-4 h-4" />
                  </div>
                </div>
                <div className="space-y-1">
                  <span className="text-[11px] font-bold text-[#94A3B8] uppercase tracking-wider">Savings Opp.</span>
                  <div className="text-[20px] font-bold text-[#0066FF] flex items-center gap-1 truncate" title={savingsOpp !== '--' ? `$${savingsOpp}/m` : '--'}>
                    <span className="truncate">{savingsOpp !== '--' ? `$${savingsOpp}/m` : '--'}</span>
                  </div>
                </div>
                <div className="space-y-1">
                  <span className="text-[11px] font-bold text-[#94A3B8] uppercase tracking-wider">Risk</span>
                  <div className={`text-[20px] font-bold flex items-center gap-1 ${riskLevel === 'LOW' ? 'text-[#10B981]' : riskLevel === 'MEDIUM' ? 'text-[#F59E0B]' : 'text-[#EF4444]'}`}>
                    {riskLevel}
                  </div>
                </div>
              </div>

              <div className="h-px w-full bg-[#E2E8F0] mb-6" />

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-3">
                <Button 
                  onClick={triggerAiWorkflow} 
                  disabled={isAiThinking}
                  className="h-12 bg-[#0A2540] hover:bg-[#0066FF] text-white font-bold text-[14px] shadow-sm rounded-[12px]"
                >
                  {isAiThinking ? 'Analyzing...' : 'Refresh AI Quote'} <Sparkles className="w-4 h-4 ml-1.5 opacity-70" />
                </Button>
                <Button 
                  variant="outline" 
                  onClick={handleAddToCart}
                  className="h-12 border-[#E2E8F0] bg-[#F8FAFC] hover:bg-white text-[#0A2540] font-bold text-[14px] rounded-[12px]"
                >
                  <ShoppingCart className="w-4 h-4 mr-2" /> Add to Plan
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => {
                    const el = document.getElementById('comparison-matrix');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="h-10 border-[#E2E8F0] text-[#0A2540] font-bold text-[13px] rounded-[10px]"
                >
                  Compare Suppliers
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => setIsRfqModalOpen(true)}
                  className="h-10 border-[#E2E8F0] text-[#0A2540] font-bold text-[13px] rounded-[10px]"
                >
                  <FileText className="w-4 h-4 mr-2" /> Request Custom Quote
                </Button>
              </div>
            </div>

          </div>
        </div>


        {/* ── MIDDLE SECTION 1: INTELLIGENCE & INSIGHTS ─────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Market Intelligence */}
          <div className="bg-white rounded-[24px] border border-[#E2E8F0] shadow-sm p-6">
            <h3 className="text-[15px] font-bold text-[#0A2540] flex items-center gap-2 mb-5">
              <BarChart3 className="w-4 h-4 text-[#0066FF]" /> Live Market Intelligence
            </h3>
            
            <div className="space-y-4">
              <div className="flex justify-between items-end border-b border-[#F1F5F9] pb-3">
                <div className="space-y-1">
                  <span className="text-[11px] font-bold text-[#94A3B8] uppercase tracking-wider block">Price Trend</span>
                  <div className="flex items-center gap-1.5 text-[15px] font-bold text-[#0A2540]">
                    <TrendingUp className="w-4 h-4 text-[#EF4444]" /> +3% <span className="text-[12px] text-[#64748B] font-medium font-normal">this month</span>
                  </div>
                </div>
                {/* Mini sparkline mock */}
                <svg width="60" height="20" viewBox="0 0 60 20" className="opacity-70">
                  <path d="M0 15 Q 10 15, 20 10 T 40 10 T 60 5" fill="none" stroke="#EF4444" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </div>

              <div className="flex justify-between items-center border-b border-[#F1F5F9] pb-3">
                <span className="text-[13px] font-bold text-[#64748B]">Demand</span>
                <div className="flex items-center gap-2">
                  <div className="flex gap-0.5">
                    <div className="w-1.5 h-3 bg-[#0A2540] rounded-sm" />
                    <div className="w-1.5 h-3 bg-[#0A2540] rounded-sm" />
                    <div className="w-1.5 h-3 bg-[#0A2540] rounded-sm" />
                    <div className="w-1.5 h-3 bg-[#0A2540] rounded-sm" />
                    <div className="w-1.5 h-3 bg-[#E2E8F0] rounded-sm" />
                  </div>
                  <span className="text-[12px] font-bold text-[#0A2540] w-10 text-right">High</span>
                </div>
              </div>

              <div className="flex justify-between items-center border-b border-[#F1F5F9] pb-3">
                <span className="text-[13px] font-bold text-[#64748B]">Supply</span>
                <div className="flex items-center gap-2">
                  <div className="flex gap-0.5">
                    <div className="w-1.5 h-3 bg-[#0066FF] rounded-sm" />
                    <div className="w-1.5 h-3 bg-[#0066FF] rounded-sm" />
                    <div className="w-1.5 h-3 bg-[#0066FF] rounded-sm" />
                    <div className="w-1.5 h-3 bg-[#E2E8F0] rounded-sm" />
                    <div className="w-1.5 h-3 bg-[#E2E8F0] rounded-sm" />
                  </div>
                  <span className="text-[12px] font-bold text-[#0A2540] w-10 text-right">Med</span>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-[13px] font-bold text-[#64748B]">Volatility</span>
                <Badge className="bg-[#ECFDF5] text-[#10B981] border-transparent font-bold text-[10px]">Low</Badge>
              </div>
            </div>
          </div>

          {/* AI Insights Progress Bars */}
          <div className="bg-[#0A2540] rounded-[24px] shadow-sm p-6 text-white relative overflow-hidden">
             
             {/* --- DYNAMIC STATES --- */}
             {isAiThinking && (
               <div className="absolute inset-0 bg-[#0A2540]/90 backdrop-blur-md z-20 flex flex-col items-center justify-center p-6 text-center animate-in fade-in duration-300">
                  <Zap className="w-10 h-10 text-[#FDE047] animate-pulse mb-3" />
                  <p className="text-[14px] font-bold text-white mb-2">{aiStepLabel || 'Analyzing...'}</p>
                  <div className="w-full max-w-[150px] h-1 bg-white/20 rounded-full overflow-hidden">
                    <div className="h-full bg-[#FDE047] transition-all duration-300" style={{ width: `${progress}%` }} />
                  </div>
               </div>
             )}
             
             {!aiData && !isAiThinking && (
               <div className="absolute inset-0 bg-[#0A2540]/80 backdrop-blur-[3px] z-20 flex flex-col items-center justify-center p-6 text-center animate-in fade-in cursor-pointer" onClick={triggerAiWorkflow}>
                  <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center mb-3">
                    <Zap className="w-5 h-5 text-[#FDE047]" />
                  </div>
                  <p className="text-[14px] font-bold text-white">Click to Analyze</p>
               </div>
             )}
             {/* ----------------------- */}

             <div className="absolute top-0 right-0 p-6 opacity-5 z-0">
               <Sparkles className="w-32 h-32" />
             </div>
             
             <h3 className="text-[15px] font-bold text-white flex items-center gap-2 mb-6 relative z-10">
              <Zap className="w-4 h-4 text-[#FDE047]" /> AI Material Analysis
            </h3>

            <div className="space-y-4 relative z-10">
              <div>
                <div className="flex justify-between text-[12px] font-bold mb-1">
                  <span className="text-white/80">Specification Match</span>
                  <span className="text-white">{specMatch}%</span>
                </div>
                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-[#38BDF8] rounded-full" style={{ width: `${specMatch}%` }} />
                </div>
              </div>
              
              <div>
                <div className="flex justify-between text-[12px] font-bold mb-1">
                  <span className="text-white/80">Supplier Reliability</span>
                  <span className="text-white">{supplierRel}%</span>
                </div>
                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-[#10B981]" style={{ width: `${supplierRel}%` }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[12px] font-bold mb-1">
                  <span className="text-white/80">Market Value</span>
                  <span className="text-white">{marketVal}%</span>
                </div>
                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-[#FDE047]" style={{ width: `${marketVal}%` }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[12px] font-bold mb-1">
                  <span className="text-white/80">Sustainability</span>
                  <span className="text-white">{sustainability}%</span>
                </div>
                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-[#A78BFA]" style={{ width: `${sustainability}%` }} />
                </div>
              </div>
            </div>
          </div>

          {/* AI Scannable Cards */}
          <div className="bg-white rounded-[24px] border border-[#E2E8F0] shadow-sm p-6 flex flex-col justify-between">
            <div>
              <h3 className="text-[12px] font-bold text-[#94A3B8] uppercase tracking-widest mb-3">Applications</h3>
              <div className="flex flex-wrap gap-2 mb-5">
                {tags.slice(0, 3).map((tag, i) => (
                   <span key={i} className="text-[11px] font-bold bg-[#F1F5F9] text-[#475569] px-2 py-1 rounded-md">{tag}</span>
                ))}
              </div>

              <h3 className="text-[12px] font-bold text-[#94A3B8] uppercase tracking-widest mb-2">Advantages</h3>
                {aiData?.material?.advantages ? (
                  <ul className="space-y-2 mt-4">
                    {aiData.material.advantages.map((adv: string, i: number) => (
                      <li key={i} className="flex items-start gap-2 text-[13px] text-[#475569]">
                        <CheckCircle2 className="w-4 h-4 text-[#0066FF] mt-0.5 shrink-0" />
                        <span>{adv}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <ul className="space-y-2 mt-4">
                    <li className="flex items-start gap-2 text-[13px] text-[#475569]">
                      <CheckCircle2 className="w-4 h-4 text-[#0066FF] mt-0.5 shrink-0" />
                      <span>Consistent thread count across production batches</span>
                    </li>
                    <li className="flex items-start gap-2 text-[13px] text-[#475569]">
                      <CheckCircle2 className="w-4 h-4 text-[#0066FF] mt-0.5 shrink-0" />
                      <span>Color fastness meets international export standards</span>
                    </li>
                    <li className="flex items-start gap-2 text-[13px] text-[#475569]">
                      <CheckCircle2 className="w-4 h-4 text-[#0066FF] mt-0.5 shrink-0" />
                      <span>Shrinkage rate &lt; 2% after industrial washing</span>
                    </li>
                  </ul>
                )}
            </div>
            
            <div className="bg-[#FEF2F2] rounded-[12px] p-3 border border-[#FECACA]">
              <h3 className="text-[11px] font-bold text-[#991B1B] uppercase tracking-widest mb-1 flex items-center gap-1"><AlertTriangle className="w-3 h-3"/> Risks</h3>
              <p className="text-[11px] text-[#991B1B] font-medium">MOQ High • Seasonal Pricing</p>
            </div>
          </div>
        </div>

        {/* ── AI RECOMMENDATION MATRIX ────────────────────────────────────────────── */}
        <div id="comparison-matrix" className="bg-white rounded-[24px] border border-[#E2E8F0] shadow-sm p-6 overflow-x-auto mt-6 relative">
           
           {/* --- DYNAMIC STATES --- */}
           {isAiThinking && (
             <div className="absolute inset-0 bg-white/95 backdrop-blur-md z-20 flex flex-col items-center justify-center p-6 text-center animate-in fade-in duration-300 rounded-[24px]">
                <Sparkles className="w-10 h-10 text-[#0066FF] animate-pulse mb-3" />
                <p className="text-[14px] font-bold text-[#0A2540] mb-2">{aiStepLabel || 'Comparing suppliers...'}</p>
                <div className="w-full max-w-[200px] h-1.5 bg-[#F1F5F9] rounded-full overflow-hidden">
                  <div className="h-full bg-[#0066FF] transition-all duration-300" style={{ width: `${progress}%` }} />
                </div>
             </div>
           )}
           
           {!aiData && !isAiThinking && (
             <div className="absolute inset-0 bg-white/80 backdrop-blur-[3px] z-20 flex flex-col items-center justify-center p-6 text-center animate-in fade-in cursor-pointer rounded-[24px]" onClick={triggerAiWorkflow}>
                <div className="w-12 h-12 bg-[#EFF6FF] text-[#0066FF] rounded-full flex items-center justify-center mb-3">
                  <Sparkles className="w-6 h-6" />
                </div>
                <h4 className="text-[15px] font-bold text-[#0A2540] mb-1">AI Intelligence Inactive</h4>
                <p className="text-[13px] text-[#64748B]">Run analysis to unlock supplier comparisons.</p>
             </div>
           )}
           {/* ----------------------- */}

           <h3 className="text-[18px] font-display font-bold text-[#0A2540] flex items-center gap-2 mb-6 relative z-10">
             <Sparkles className="w-5 h-5 text-[#0066FF]" /> Supplier Comparison Matrix
           </h3>

           <div className="min-w-[800px] relative z-10">
             <div className="grid grid-cols-4 gap-4 text-[12px] font-bold text-[#94A3B8] uppercase tracking-wider mb-4 px-4">
               <div>Criteria</div>
               <div className="text-[#0A2540]">Current Supplier</div>
               <div>Alternative A</div>
               <div>Alternative B</div>
             </div>

             <div className="grid grid-cols-4 gap-4 bg-[#F8FAFC] rounded-[16px] p-4 items-center mb-2">
               <div className="text-[13px] font-bold text-[#64748B]">Price</div>
               <div className="text-[15px] font-bold text-[#0A2540]">${basePrice.toFixed(2)}/{product.priceRange?.unit || 'm'}</div>
               <div className="text-[15px] font-bold text-[#10B981] flex items-center gap-1">{aiData?.comparison?.comparison?.[0]?.price || '--'} <ArrowDownToLine className="w-3.5 h-3.5"/></div>
               <div className="text-[15px] font-bold text-[#0A2540]">{aiData?.comparison?.comparison?.[1]?.price || '--'}</div>
             </div>

             <div className="grid grid-cols-4 gap-4 bg-white rounded-[16px] p-4 items-center mb-2">
               <div className="text-[13px] font-bold text-[#64748B]">Lead Time</div>
               <div className="text-[14px] font-bold text-[#0A2540]">{leadTimeDays} Days</div>
               <div className="text-[14px] font-bold text-[#10B981]">{alt1LeadTime} Days</div>
               <div className="text-[14px] font-bold text-[#0A2540]">{alt2LeadTime} Days</div>
             </div>

             <div className="grid grid-cols-4 gap-4 bg-[#F8FAFC] rounded-[16px] p-4 items-center mb-4">
               <div className="text-[13px] font-bold text-[#64748B]">Trust Score</div>
               <div className="text-[14px] font-bold text-[#0A2540]">{trustScore}/100</div>
               <div className="text-[14px] font-bold text-[#0066FF]">{alt1Trust}/100</div>
               <div className="text-[14px] font-bold text-[#0A2540]">{alt2Trust}/100</div>
             </div>

             <div className="grid grid-cols-4 gap-4 px-4 items-center">
                <div />
                <div />
                <div>
                  <div className="bg-[#EFF6FF] border border-[#BFDBFE] p-3 rounded-[12px]">
                    <span className="block text-[11px] font-bold text-[#0066FF] uppercase mb-1">Recommended</span>
                    <span className="block text-[14px] font-bold text-[#0A2540]">Save ${savingsAmount}</span>
                  </div>
                </div>
                <div />
             </div>
           </div>
        </div>

        {/* ── MIDDLE SECTION 2: SPECIFICATIONS & SUPPLIER INTEL ────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white rounded-[24px] border border-[#E2E8F0] shadow-sm p-8">
            <h3 className="text-[18px] font-display font-bold text-[#0A2540] mb-6">Technical Specifications</h3>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-6">
              <div>
                <span className="text-[11px] font-bold text-[#94A3B8] uppercase tracking-wider block mb-1">Composition</span>
                <span className="text-[14px] font-bold text-[#0A2540]">{product.specifications?.Composition || product.specifications?.composition || '100% Organic Cotton'}</span>
              </div>
              <div>
                <span className="text-[11px] font-bold text-[#94A3B8] uppercase tracking-wider block mb-1">Weight (GSM)</span>
                <span className="text-[14px] font-bold text-[#0A2540]">{product.specifications?.Weight || product.specifications?.weight || '180 GSM'}</span>
              </div>
              <div>
                <span className="text-[11px] font-bold text-[#94A3B8] uppercase tracking-wider block mb-1">Width</span>
                <span className="text-[14px] font-bold text-[#0A2540]">{product.specifications?.Width || product.specifications?.width || '58/60 inches'}</span>
              </div>
              <div>
                <span className="text-[11px] font-bold text-[#94A3B8] uppercase tracking-wider block mb-1">Weave/Knit</span>
                <span className="text-[14px] font-bold text-[#0A2540]">{product.specifications?.Weave || 'Twill Weave'}</span>
              </div>
              <div>
                <span className="text-[11px] font-bold text-[#94A3B8] uppercase tracking-wider block mb-1">Dye Technique</span>
                <span className="text-[14px] font-bold text-[#0A2540]">{product.specifications?.Dye || 'Reactive Yarn Dyed'}</span>
              </div>
              <div>
                <span className="text-[11px] font-bold text-[#94A3B8] uppercase tracking-wider block mb-1">Certifications</span>
                <div className="flex gap-2 mt-1">
                  {product.certifications?.map(c => (
                    <Badge key={c} className="bg-[#F1F5F9] text-[#64748B] text-[10px] font-bold">{c}</Badge>
                  ))}
                  {!product.certifications?.length && <span className="text-[14px] font-bold text-[#0A2540]">Oeko-Tex Standard 100</span>}
                </div>
              </div>
            </div>
          </div>

          {/* Supplier Intelligence Profile */}
          <div className="bg-white rounded-[24px] border border-[#E2E8F0] shadow-sm p-6 flex flex-col">
            <div className="flex items-start justify-between mb-4">
               <div>
                 <h3 className="text-[18px] font-display font-bold text-[#0A2540]">{supplierName}</h3>
                 <p className="text-[13px] text-[#64748B] font-medium flex items-center gap-1 mt-1">
                   <ShieldCheck className="w-4 h-4 text-[#10B981]" /> Verified Enterprise Mill
                 </p>
               </div>
               <div className="w-12 h-12 bg-[#F8FAFC] rounded-full border border-[#E2E8F0] flex items-center justify-center text-[#0A2540] font-bold">
                 {supplierName.charAt(0)}
               </div>
            </div>

            <div className="grid grid-cols-2 gap-y-4 gap-x-4 flex-1 mt-4">
               <div>
                 <span className="text-[10px] font-bold text-[#94A3B8] uppercase block">Trust Score</span>
                 <span className="text-[14px] font-bold text-[#10B981]">{trustScore}/100</span>
               </div>
               <div>
                 <span className="text-[10px] font-bold text-[#94A3B8] uppercase block">Factory</span>
                 <span className="text-[14px] font-bold text-[#0A2540]">{supplierCountry}</span>
               </div>
               <div>
                 <span className="text-[10px] font-bold text-[#94A3B8] uppercase block">Exports</span>
                 <span className="text-[14px] font-bold text-[#0A2540]">{exportsCount} Countries</span>
               </div>
               <div>
                 <span className="text-[10px] font-bold text-[#94A3B8] uppercase block">Orders</span>
                 <span className="text-[14px] font-bold text-[#0A2540]">{ordersCount.toLocaleString()}</span>
               </div>
               <div>
                 <span className="text-[10px] font-bold text-[#94A3B8] uppercase block">Capacity</span>
                 <span className="text-[14px] font-bold text-[#0A2540]">{capacity} m/month</span>
               </div>
               <div>
                 <span className="text-[10px] font-bold text-[#94A3B8] uppercase block">Response</span>
                 <span className="text-[14px] font-bold text-[#0A2540]">{responseHours} hrs</span>
               </div>
            </div>
            
            <div className="mt-6 flex gap-2">
              <Badge className="bg-[#ECFDF5] text-[#10B981] border-transparent">AI Risk: {riskLevel}</Badge>
              <Badge className="bg-[#EFF6FF] text-[#0066FF] border-transparent">Verified Since 2013</Badge>
            </div>
          </div>
        </div>

        {/* ── BOTTOM WIDGETS ─────────────────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Recent Enterprise Procurement */}
          <div className="bg-white rounded-[24px] border border-[#E2E8F0] shadow-sm p-6">
            <h3 className="text-[14px] font-bold text-[#0A2540] mb-4">Recent Enterprise Procurement</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <span className="text-[13px] font-bold text-[#0A2540] block">Nike</span>
                  <span className="text-[11px] text-[#64748B]">2 days ago</span>
                </div>
                <span className="text-[13px] font-bold text-[#0066FF] bg-[#EFF6FF] px-2 py-1 rounded">15,000m</span>
              </div>
              <div className="h-px bg-[#F1F5F9]" />
              <div className="flex justify-between items-center">
                <div>
                  <span className="text-[13px] font-bold text-[#0A2540] block">Adidas</span>
                  <span className="text-[11px] text-[#64748B]">Yesterday</span>
                </div>
                <span className="text-[13px] font-bold text-[#0066FF] bg-[#EFF6FF] px-2 py-1 rounded">22,000m</span>
              </div>
            </div>
          </div>

          {/* AI Alternative Mills */}
          <div className="bg-white rounded-[24px] border border-[#E2E8F0] shadow-sm p-6">
            <h3 className="text-[14px] font-bold text-[#0A2540] mb-4">AI Alternative Mills</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <span className="text-[13px] font-bold text-[#0A2540] flex items-center gap-1">Alternative A <Badge className="h-4 text-[9px] bg-[#ECFDF5] text-[#10B981] border-transparent px-1">{alt1Trust} Score</Badge></span>
                  <span className="text-[11px] text-[#10B981] font-bold">Save ${(parseFloat(savingsOpp) / basePrice * 100).toFixed(1)}%</span>
                </div>
                <Button variant="outline" className="h-7 text-[11px] px-2 font-bold">Compare</Button>
              </div>
              <div className="h-px bg-[#F1F5F9]" />
              <div className="flex justify-between items-center">
                <div>
                  <span className="text-[13px] font-bold text-[#0A2540] flex items-center gap-1">Alternative B <Badge className="h-4 text-[9px] bg-[#ECFDF5] text-[#10B981] border-transparent px-1">{alt2Trust} Score</Badge></span>
                  <span className="text-[11px] text-[#0066FF] font-bold">{leadTimeDays - parseInt(String(alt2LeadTime)) > 0 ? leadTimeDays - parseInt(String(alt2LeadTime)) + ' days faster' : 'Matching'}</span>
                </div>
                <Button variant="outline" className="h-7 text-[11px] px-2 font-bold">Compare</Button>
              </div>
            </div>
          </div>

          {/* Market RFQ Trends */}
          <div className="bg-white rounded-[24px] border border-[#E2E8F0] shadow-sm p-6">
            <h3 className="text-[14px] font-bold text-[#0A2540] mb-4">Market RFQ Trends</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="text-[11px] font-bold text-[#94A3B8] uppercase block">Today's RFQs</span>
                <span className="text-[16px] font-bold text-[#0A2540]">34</span>
              </div>
              <div>
                <span className="text-[11px] font-bold text-[#94A3B8] uppercase block">Avg Price</span>
                <span className="text-[16px] font-bold text-[#0A2540]">${basePrice.toFixed(2)}/{product.priceRange?.unit || 'm'}</span>
              </div>
              <div>
                <span className="text-[11px] font-bold text-[#94A3B8] uppercase block">Lead Time</span>
                <span className="text-[16px] font-bold text-[#0A2540]">{leadTimeDays} Days</span>
              </div>
              <div>
                <span className="text-[11px] font-bold text-[#94A3B8] uppercase block">Demand</span>
                <span className="text-[14px] font-bold text-[#EF4444] flex items-center gap-1"><TrendingUp className="w-3.5 h-3.5"/> Rising</span>
              </div>
            </div>
          </div>

        </div>

      </Container>
      
      {/* ── FOOTER PLATFORM METRICS ─────────────────────────────────────────────────── */}
      <div className="bg-[#0A2540] border-t border-[#1E3A5F] py-12 mt-12">
         <Container className="max-w-[1400px]">
           <h3 className="text-center text-[13px] font-bold text-white/50 uppercase tracking-widest mb-8">Trusted Global Procurement Infrastructure</h3>
           <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-6 text-center">
             <div>
               <span className="block text-[24px] font-display font-bold text-white">400+</span>
               <span className="text-[11px] font-bold text-white/70 uppercase">Manufacturers</span>
             </div>
             <div>
               <span className="block text-[24px] font-display font-bold text-white">42</span>
               <span className="text-[11px] font-bold text-white/70 uppercase">Countries</span>
             </div>
             <div>
               <span className="block text-[24px] font-display font-bold text-[#38BDF8]">12.5k</span>
               <span className="text-[11px] font-bold text-white/70 uppercase">Monthly RFQs</span>
             </div>
             <div>
               <span className="block text-[24px] font-display font-bold text-white">8,400</span>
               <span className="text-[11px] font-bold text-white/70 uppercase">Orders Delivered</span>
             </div>
             <div>
               <span className="block text-[24px] font-display font-bold text-white">2.1M</span>
               <span className="text-[11px] font-bold text-white/70 uppercase">Material Variations</span>
             </div>
             <div>
               <span className="block text-[24px] font-display font-bold text-white">850</span>
               <span className="text-[11px] font-bold text-white/70 uppercase">Verified Suppliers</span>
             </div>
             <div>
               <span className="block text-[24px] font-display font-bold text-[#10B981]">2 hrs</span>
               <span className="text-[11px] font-bold text-white/70 uppercase">Avg Response Time</span>
             </div>
           </div>
         </Container>
      </div>

      {/* ── FLOATING AI ASSISTANT ───────────────────────────────────────────────────── */}
      <div className="fixed bottom-6 right-6 z-50">
        <AnimatePresence>
          {isAssistantOpen ? (
            <motion.div 
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              className="bg-white w-[320px] rounded-[24px] border border-[#E2E8F0] shadow-2xl overflow-hidden flex flex-col"
            >
                <div className="flex justify-between items-center px-4 pt-4 pb-2">
                  <h4 className="text-[16px] font-display font-bold text-[#0A2540] flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-[#0066FF]" /> Intelligence Copilot
                  </h4>
                  <Button variant="ghost" size="sm" className="w-8 h-8 rounded-full p-0" onClick={() => setIsAssistantOpen(false)}>
                    <X className="w-4 h-4" />
                  </Button>
                </div>

                {!aiData ? (
                  <div className="flex items-center justify-center h-[200px] flex-col gap-4 p-4">
                    <div className="w-8 h-8 border-4 border-[#0066FF]/20 border-t-[#0066FF] rounded-full animate-spin" />
                    <div className="text-center">
                      <p className="text-[14px] font-bold text-[#0A2540] mb-1">
                        {isAiThinking ? aiStepLabel : 'Initializing...'}
                      </p>
                      <div className="w-48 h-1.5 bg-[#F1F5F9] rounded-full overflow-hidden">
                        <div className="h-full bg-[#0066FF] transition-all duration-300" style={{ width: `${progress}%` }} />
                      </div>
                    </div>
                  </div>
                 ) : (
                   <div className="space-y-4 px-4 pb-4">
                     <p className="text-[12px] font-medium text-[#64748B]">You're viewing <strong className="text-[#0A2540]">{product.title}</strong>. What would you like to do?</p>
                     <div className="space-y-2">
                       <Button variant="outline" className="w-full justify-start text-[12px] font-bold h-9 bg-white border-[#E2E8F0]" onClick={triggerAiWorkflow}>
                         <Scale className="w-3.5 h-3.5 mr-2 text-[#94A3B8]" /> Compare suppliers
                       </Button>
                       <Button variant="outline" className="w-full justify-start text-[12px] font-bold h-9 bg-white border-[#E2E8F0]" onClick={triggerAiWorkflow}>
                         <BarChart3 className="w-3.5 h-3.5 mr-2 text-[#94A3B8]" /> Analyze pricing
                       </Button>
                       <Button variant="outline" className="w-full justify-start text-[12px] font-bold h-9 bg-white border-[#E2E8F0]" onClick={triggerAiWorkflow}>
                         <FileText className="w-3.5 h-3.5 mr-2 text-[#94A3B8]" /> Generate RFQ
                       </Button>
                       <Button variant="outline" className="w-full justify-start text-[12px] font-bold h-9 bg-white border-[#E2E8F0]" onClick={triggerAiWorkflow}>
                         <ShieldCheck className="w-3.5 h-3.5 mr-2 text-[#94A3B8]" /> Explain certification
                       </Button>
                     </div>
                   </div>
                 )}
            </motion.div>
          ) : (
            <motion.button 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              onClick={() => setIsAssistantOpen(true)} 
              className="w-14 h-14 bg-[#0A2540] text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-105 transition-transform border-4 border-white"
            >
              <Sparkles className="w-6 h-6 text-[#38BDF8]" />
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      {/* RFQ MODAL */}
      <AnimatePresence>
        {isRfqModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="absolute inset-0 bg-[#0A2540]/60 backdrop-blur-sm"
              onClick={() => setIsRfqModalOpen(false)}
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white rounded-[24px] shadow-xl w-full max-w-md relative z-10 overflow-hidden"
            >
              <div className="px-6 py-5 border-b border-[#E2E8F0] flex justify-between items-center bg-[#F8FAFC]">
                <h3 className="text-[18px] font-bold text-[#0A2540] font-display">Request Custom Quote</h3>
                <button onClick={() => setIsRfqModalOpen(false)} className="text-[#94A3B8] hover:text-[#0A2540]">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <form onSubmit={handleSubmitRfq} className="p-6 space-y-4">
                <div>
                  <label className="block text-[13px] font-bold text-[#0A2540] mb-1.5">Required Quantity ({product?.priceRange?.unit || 'units'})</label>
                  <input 
                    type="number" 
                    required 
                    min={product?.moq?.value || 1}
                    value={rfqForm.quantity}
                    onChange={(e) => setRfqForm({...rfqForm, quantity: e.target.value})}
                    placeholder={`MOQ is ${product?.moq?.value || 1}`}
                    className="w-full h-11 px-4 rounded-[10px] border border-[#E2E8F0] focus:border-[#0066FF] focus:ring-1 focus:ring-[#0066FF] outline-none text-[14px]"
                  />
                </div>
                <div>
                  <label className="block text-[13px] font-bold text-[#0A2540] mb-1.5">Target Price (Optional)</label>
                  <input 
                    type="number"
                    step="0.01"
                    value={rfqForm.targetPrice}
                    onChange={(e) => setRfqForm({...rfqForm, targetPrice: e.target.value})}
                    placeholder={`Current price ~ $${product?.priceRange?.min}`}
                    className="w-full h-11 px-4 rounded-[10px] border border-[#E2E8F0] focus:border-[#0066FF] focus:ring-1 focus:ring-[#0066FF] outline-none text-[14px]"
                  />
                </div>
                <div>
                  <label className="block text-[13px] font-bold text-[#0A2540] mb-1.5">Additional Requirements</label>
                  <textarea 
                    rows={2}
                    value={rfqForm.notes}
                    onChange={(e) => setRfqForm({...rfqForm, notes: e.target.value})}
                    placeholder="E.g., custom colors, faster shipping, testing certificates needed..."
                    className="w-full p-4 rounded-[10px] border border-[#E2E8F0] focus:border-[#0066FF] focus:ring-1 focus:ring-[#0066FF] outline-none text-[14px] resize-none"
                  />
                </div>
                <div>
                  <label className="block text-[13px] font-bold text-[#0A2540] mb-1.5">Delivery Address</label>
                  <input 
                    type="text"
                    value={rfqForm.deliveryAddress}
                    onChange={(e) => setRfqForm({...rfqForm, deliveryAddress: e.target.value})}
                    placeholder="Shipping address"
                    className="w-full h-11 px-4 rounded-[10px] border border-[#E2E8F0] focus:border-[#0066FF] focus:ring-1 focus:ring-[#0066FF] outline-none text-[14px]"
                  />
                </div>
                <div className="pt-4 flex gap-3">
                  <Button type="button" variant="outline" onClick={() => setIsRfqModalOpen(false)} className="flex-1 h-12 rounded-[12px] font-bold">Cancel</Button>
                  <Button type="submit" disabled={isSubmittingRfq} className="flex-1 h-12 rounded-[12px] font-bold bg-[#0066FF] hover:bg-[#0052CC] text-white">
                    {isSubmittingRfq ? 'Submitting...' : 'Submit RFQ'}
                  </Button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  )
}
