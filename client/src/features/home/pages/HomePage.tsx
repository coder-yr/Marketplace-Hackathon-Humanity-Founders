import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/shared/components/ui/button'
import { productsApi } from '@/features/products/api/products.api'
import { Product } from '@/features/products/types/products.types'
import { 
  Search, Layers, Sparkles, CheckCircle2, Factory, ChevronRight, Truck, FileText, CheckCircle, RefreshCw, Cpu
} from 'lucide-react'
import { motion } from 'framer-motion'
import { presets } from '@/shared/animations/presets'

export function HomePage() {
  const navigate = useNavigate()
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)
  
  // Hero Living Animation State
  const [heroStep, setHeroStep] = useState(0)

  useEffect(() => {
    productsApi.getFeaturedProducts(6)
      .then((res) => {
        if (res.data) setFeaturedProducts(res.data)
        setIsLoading(false)
      })
      .catch((err) => {
        console.error('Failed to load homepage data', err)
        setIsLoading(false)
      })

    // Hero Live Simulation Loop
    const heroInterval = setInterval(() => {
      setHeroStep((s) => (s >= 5 ? 0 : s + 1))
    }, 2200)

    return () => clearInterval(heroInterval)
  }, [])

  const heroSimulationSteps = [
    { title: 'Parsing Intent...', detail: 'Extracting GSM, Composition, & Target Price', progress: 20 },
    { title: '2,540 Mills Found', detail: 'Querying global mill vector index', progress: 45 },
    { title: 'Ranking Suppliers...', detail: 'Scoring Trust, Capacity, & Lead Times', progress: 70 },
    { title: 'Comparing Prices...', detail: 'Benchmarking against spot market rates', progress: 85 },
    { title: 'AI Confidence 98%', detail: 'Optimal match identified: Vardhman Mills', progress: 95 },
    { title: 'RFQ Ready to Send', detail: 'Draft generated for 5,000m Organic Cotton', progress: 100 },
  ]

  const lifecycleStages = [
    { label: 'AI Search', icon: Search, desc: 'Semantic Query' },
    { label: 'Supplier Comparison', icon: Layers, desc: 'Spec Matrix' },
    { label: 'RFQ Submission', icon: FileText, desc: 'Instant Draft' },
    { label: 'Negotiation', icon: RefreshCw, desc: 'Spot Pricing' },
    { label: 'Purchase Order', icon: CheckCircle, desc: 'Smart Contract' },
    { label: 'Production', icon: Factory, desc: 'Live Monitoring' },
    { label: 'Shipment', icon: Truck, desc: 'Global Customs' },
    { label: 'Delivered', icon: CheckCircle2, desc: 'Quality Sign-off' },
  ]

  return (
    <div className="bg-[#F7F8FA] min-h-screen pb-24 font-sans text-[var(--body)]">
      
      {/* 1. HERO SECTION — Living Operating System Simulation */}
      <motion.section 
        {...presets.scrollReveal}
        className="max-w-[1400px] mx-auto px-4 lg:px-8 mt-4 relative z-10"
      >
        <div className="bg-[#0A2540] rounded-[32px] p-8 lg:p-14 text-white shadow-2xl flex flex-col lg:flex-row gap-12 items-center relative overflow-hidden border border-[#1E293B]">
          

          
          {/* Subtle Background Blueprint Mesh Grid & Glows */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:32px_32px] opacity-40 pointer-events-none" />
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#0066FF]/20 rounded-full blur-[140px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#38BDF8]/10 rounded-full blur-[120px] pointer-events-none" />

          {/* Left Column: Core Value Proposition */}
          <div className="lg:w-[50%] relative z-20">
            <div className="bg-[#0066FF]/20 text-[#38BDF8] border border-[#0066FF]/40 px-3.5 py-1.5 rounded-full text-[12px] font-bold mb-6 inline-flex items-center gap-2">
              <Cpu className="w-4 h-4 text-[#FDE047] animate-pulse" /> Enterprise Sourcing OS v2.4
            </div>
            
            <h1 className="text-white text-[44px] lg:text-[60px] font-display font-extrabold leading-[1.08] mb-6 tracking-tight">
              How can I source textile materials <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#38BDF8] to-[#0066FF]">faster?</span>
            </h1>
            
            <p className="text-[16px] text-[#94A3B8] mb-8 leading-relaxed font-medium max-w-[540px]">
              Manage your entire procurement lifecycle—from AI vector searches and mill comparisons to instant RFQ drafting and production tracking.
            </p>
            
            {/* Procurement Search Bar */}
            <div className="bg-[#1E293B] border border-[#334155] rounded-[16px] p-2 mb-6 flex flex-col sm:flex-row gap-2 shadow-lg">
              <div className="flex-1 flex items-center gap-3 px-3">
                <Search className="w-5 h-5 text-[#94A3B8]" />
                <input 
                  type="text" 
                  placeholder="Need 5000m Organic Cotton under ₹250 with MOQ below 500..." 
                  className="w-full bg-transparent text-[14px] font-medium text-white outline-none placeholder:text-[#64748B]"
                  onKeyDown={(e) => { if (e.key === 'Enter') navigate('/marketplace') }}
                />
              </div>
              <Button onClick={() => navigate('/marketplace')} className="bg-[#0066FF] hover:bg-[#0052CC] text-white font-bold h-12 px-6 rounded-[12px] text-[14px] shrink-0 shadow-md">
                Start Sourcing
              </Button>
            </div>

            {/* Popular Searches */}
            <div className="flex items-center gap-2 flex-wrap text-[12px]">
              <span className="font-bold text-[#64748B] uppercase tracking-wider text-[10px]">Popular:</span>
              {['Organic Cotton', '14oz Denim', 'French Linen', 'Recycled Poly', 'Mulberry Silk'].map((term) => (
                <button key={term} onClick={() => navigate(`/marketplace?search=${encodeURIComponent(term)}`)} className="bg-[#1E293B] hover:bg-[#334155] text-[#94A3B8] hover:text-white font-bold px-3 py-1 rounded-[8px] transition-colors border border-[#334155]">
                  {term}
                </button>
              ))}
            </div>
          </div>
          
          {/* Right Column: Mini Operating System Simulation (ALIVE) */}
          <div className="lg:w-[50%] w-full relative z-20">
            <div className="bg-[#0F172A] rounded-[24px] p-6 text-white shadow-2xl border border-[#334155] space-y-4">
              
              {/* OS Header Bar */}
              <div className="flex items-center justify-between border-b border-[#1E293B] pb-3 text-[12px]">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-[#EF4444]" />
                  <span className="w-3 h-3 rounded-full bg-[#F59E0B]" />
                  <span className="w-3 h-3 rounded-full bg-[#10B981]" />
                  <span className="font-bold text-[#94A3B8] ml-2 font-mono text-[11px]">TEXTILEHUB_OS // LIVE_AGENT</span>
                </div>
                <span className="bg-[#10B981]/20 text-[#34D399] font-mono text-[10px] font-bold px-2 py-0.5 rounded border border-[#10B981]/30">LIVE RUNTIME</span>
              </div>

              {/* Mini OS Top KPIs */}
              <div className="grid grid-cols-4 gap-2">
                {[
                  { label: 'Active RFQs', val: '32' },
                  { label: 'In Production', val: '12' },
                  { label: 'Shipments', val: '8' },
                  { label: 'Saved Mills', val: '240' },
                ].map((kpi, idx) => (
                  <div key={idx} className="bg-[#1E293B] p-2.5 rounded-[10px] border border-[#334155] text-center">
                    <span className="text-[9px] font-bold uppercase tracking-wider text-[#94A3B8] block">{kpi.label}</span>
                    <span className="text-[16px] font-display font-bold text-white">{kpi.val}</span>
                  </div>
                ))}
              </div>

              {/* Dynamic Living AI Simulation Panel */}
              <div className="bg-[#1E293B] rounded-[16px] p-4 border border-[#0066FF]/40 relative overflow-hidden">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2 text-[#38BDF8] font-bold text-[13px]">
                    <Sparkles className="w-4 h-4 text-[#FDE047] animate-spin" /> {heroSimulationSteps[heroStep].title}
                  </div>
                  <span className="text-[11px] font-mono text-[#38BDF8] font-bold">{heroSimulationSteps[heroStep].progress}%</span>
                </div>
                
                <p className="text-[12px] text-[#94A3B8] mb-3 font-medium">{heroSimulationSteps[heroStep].detail}</p>
                
                {/* Animated Progress Bar */}
                <div className="w-full h-1.5 bg-[#0F172A] rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-gradient-to-r from-[#0066FF] to-[#38BDF8]"
                    animate={{ width: `${heroSimulationSteps[heroStep].progress}%` }}
                    transition={{ duration: 0.4 }}
                  />
                </div>
              </div>

              {/* Mini OS Bottom Data Widgets */}
              <div className="grid grid-cols-2 gap-3 pt-1 text-[12px]">
                <div className="bg-[#1E293B] p-3 rounded-[12px] border border-[#334155]">
                  <span className="text-[10px] uppercase font-bold text-[#94A3B8] block mb-1">Top Supplier Match</span>
                  <span className="font-bold text-white block">Vardhman Mills</span>
                  <span className="text-[11px] text-[#34D399] font-bold">98% Trust Score</span>
                </div>
                <div className="bg-[#1E293B] p-3 rounded-[12px] border border-[#334155]">
                  <span className="text-[10px] uppercase font-bold text-[#94A3B8] block mb-1">Spot Price Benchmark</span>
                  <span className="font-bold text-white block">$3.85 / meter</span>
                  <span className="text-[11px] text-[#34D399] font-bold">-14% vs Market Avg</span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </motion.section>

      {/* 2. TRUSTED BY BRAND LOGOS BAR */}
      <section className="max-w-[1400px] mx-auto px-4 lg:px-8 mt-12 text-center">
        <p className="text-[11px] font-bold text-[#94A3B8] uppercase tracking-[0.2em] mb-6">
          Trusted by sourcing & procurement teams at leading global fashion brands
        </p>
        <div className="flex flex-wrap justify-center items-center gap-8 lg:gap-16 opacity-60">
          {['NIKE SOURCING', 'H&M GROUP', 'ZARA GLOBAL', 'UNIQLO SUPPLY', 'DECATHLON LABS'].map((brand) => (
            <span key={brand} className="text-[18px] font-display font-extrabold text-[#0A2540] tracking-tighter">
              {brand}
            </span>
          ))}
        </div>
      </section>

      {/* Cinematic Live Video Section */}
      <motion.section 
        {...presets.scrollReveal}
        className="max-w-[1400px] mx-auto px-4 lg:px-8 mt-16 flex justify-center"
      >
        <div className="rounded-[32px] overflow-hidden relative shadow-xl border border-[#E2E8F0] w-full max-w-[1200px] aspect-video max-h-[600px]">
          <video 
            autoPlay 
            loop 
            muted 
            playsInline 
            className="w-full h-full object-cover"
          >
            <source src="/media/hero-bg.mp4" type="video/mp4" />
          </video>
        </div>
      </motion.section>

      {/* 3. ENTERPRISE METRICS ROW */}
      <motion.section 
        {...presets.staggeredList}
        className="max-w-[1400px] mx-auto px-4 lg:px-8 mt-16"
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { label: 'Active Suppliers', val: '4,000+', desc: 'Verified facilities' },
            { label: 'Material Matches', val: '1M+', desc: 'In our AI index' },
            { label: 'Time to Quote', val: '< 2hrs', desc: 'Average response' },
            { label: 'GMV Managed', val: '$500M+', desc: 'Annual volume' }
          ].map((stat, i) => (
            <motion.div key={i} {...presets.staggeredItem} className="bg-white rounded-[24px] p-6 text-center border border-[#E2E8F0] shadow-sm">
              <div className="text-[32px] font-display font-extrabold text-[#0066FF] mb-1">{stat.val}</div>
              <div className="font-bold text-[#0A2540] text-[14px]">{stat.label}</div>
              <div className="text-[#64748B] text-[13px] font-medium mt-1">{stat.desc}</div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* 4. FEATURED MATERIALS (Direct Catalog Discovery) */}
      <motion.section 
        {...presets.staggeredList}
        className="max-w-[1400px] mx-auto px-4 lg:px-8 mt-20"
      >
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-[28px] font-display font-bold text-[#0A2540]">Featured Verified Materials</h2>
            <p className="text-[14px] text-[#64748B] font-medium">Explore benchmarked specs available for immediate sample and RFQ dispatch.</p>
          </div>
          <Button variant="ghost" onClick={() => navigate('/marketplace')} className="text-[#0066FF] font-bold text-[14px]">
            View All Materials <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => <div key={i} className="h-64 bg-white rounded-[24px] animate-pulse border border-[#E2E8F0]" />)}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredProducts.slice(0, 6).map((product) => (
              <motion.div 
                {...presets.staggeredItem}
                key={product._id} 
                onClick={() => navigate(`/products/${product._id}`)}
                className="bg-white rounded-[24px] border border-[#E2E8F0] p-5 shadow-sm hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
                whileHover={{ y: -4 }}
              >
                <div>
                  <div className="h-40 rounded-[16px] bg-[#F7F8FA] overflow-hidden mb-4 relative">
                    <img src={product.images?.[0]} alt={product.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <span className="absolute top-3 left-3 bg-white/95 px-2 py-1 rounded-[6px] text-[10px] font-bold text-[#0A2540]">
                      {product.fabricType}
                    </span>
                  </div>
                  <h3 className="font-bold text-[16px] text-[#0A2540] mb-1 group-hover:text-[#0066FF] transition-colors">{product.title}</h3>
                  <p className="text-[12px] text-[#64748B] mb-3">MOQ: {product.moq?.value}m • Lead Time: {product.leadTime || '14 Days'}</p>
                </div>
                <div className="flex items-center justify-between border-t border-[#F1F5F9] pt-3">
                  <span className="text-[16px] font-display font-bold text-[#0066FF]">${product.priceRange?.min} - ${product.priceRange?.max}/m</span>
                  <Button size="sm" className="bg-[#0A2540] hover:bg-[#0066FF] text-white text-[12px] font-bold rounded-[8px]">Request RFQ</Button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </motion.section>

      {/* 5. FULL SOURCING LIFECYCLE ROADMAP */}
      <motion.section 
        {...presets.scrollReveal}
        className="max-w-[1400px] mx-auto px-4 lg:px-8 mt-24"
      >
        <div className="bg-white rounded-[32px] p-8 lg:p-12 border border-[#E2E8F0] shadow-sm">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-[11px] font-bold uppercase tracking-widest text-[#0066FF] bg-[#0066FF]/10 px-3 py-1 rounded-full">End-to-End Control</span>
            <h2 className="text-[32px] font-display font-extrabold text-[#0A2540] mt-3 mb-2">The Complete Procurement Lifecycle</h2>
            <p className="text-[14px] text-[#64748B] font-medium">TextileHub powers your entire sourcing workflow within a single enterprise dashboard.</p>
          </div>

          <motion.div 
            {...presets.staggeredList}
            className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3 relative"
          >
            {lifecycleStages.map((stage, idx) => (
              <motion.div key={idx} {...presets.staggeredItem} className="bg-[#F7F8FA] p-4 rounded-[16px] border border-[#E2E8F0] text-center flex flex-col items-center justify-center relative group hover:border-[#0066FF] transition-colors">
                <div className="w-10 h-10 rounded-[12px] bg-white text-[#0066FF] border border-[#E2E8F0] flex items-center justify-center mb-3 shadow-sm group-hover:bg-[#0066FF] group-hover:text-white transition-colors">
                  <stage.icon className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-bold text-[#94A3B8] uppercase block mb-0.5">Stage 0{idx + 1}</span>
                <span className="text-[12px] font-bold text-[#0A2540]">{stage.label}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* 6. AI WORKFLOW WITH ANIMATED CONNECTED STEPS */}
      <motion.section 
        {...presets.scrollReveal}
        className="max-w-[1400px] mx-auto px-4 lg:px-8 mt-20"
      >
        <div className="bg-[#0A2540] rounded-[32px] p-8 lg:p-12 text-white border border-[#1E293B] shadow-xl">
          <div className="mb-8">
            <span className="bg-[#38BDF8]/20 text-[#38BDF8] text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full border border-[#38BDF8]/30">Intelligent Pipeline</span>
            <h2 className="text-[32px] font-display font-extrabold mt-3">AI Sourcing Pipeline</h2>
          </div>

          <motion.div 
            {...presets.staggeredList}
            className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3"
          >
            {[
              'Need', 'Intent Parsing', 'Semantic Search', 'Supplier Ranking',
              'Cost Benchmark', 'Draft RFQ', 'Review', 'Send'
            ].map((stepName, index) => (
              <motion.div key={index} {...presets.staggeredItem} className="bg-[#1E293B] p-4 rounded-[16px] border border-[#334155] relative text-center">
                <span className="text-[10px] font-bold text-[#38BDF8] block mb-1">Step 0{index + 1}</span>
                <h4 className="font-bold text-[13px] leading-tight text-white">{stepName}</h4>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

    </div>
  )
}
