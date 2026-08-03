import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/shared/components/ui/button'
import { productsApi } from '@/features/products/api/products.api'
import { Product } from '@/features/products/types/products.types'
import { 
  ShieldCheck, Search, ArrowRight, Layers,
  MapPin, Star, Sparkles, Box, Bookmark, Hexagon,
  CheckCircle2, Globe2, Factory, Clock, ChevronRight
} from 'lucide-react'
import { motion, AnimatePresence, useScroll, useTransform, Variants } from 'framer-motion'

export function HomePage() {
  const navigate = useNavigate()
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [demoStep, setDemoStep] = useState(0)
  const { scrollY } = useScroll()
  const heroY = useTransform(scrollY, [0, 500], [0, 150])

  useEffect(() => {
    productsApi.getFeaturedProducts(12)
      .then((res) => {
        if (res.data) setFeaturedProducts(res.data)
        setIsLoading(false)
      })
      .catch((err) => {
        console.error('Failed to load homepage data', err)
        setIsLoading(false)
      })

    const interval = setInterval(() => {
      setDemoStep((s) => (s >= 5 ? 0 : s + 1))
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  // Animation variants for scroll reveals
  const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  }
  const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  }

  return (
    <div className="bg-[#F7F8FA] min-h-screen pb-20 overflow-hidden font-sans">
      
      {/* 1. HERO SECTION (Dynamic, Floating, Premium SaaS) */}
      <section className="max-w-[1400px] mx-auto px-4 lg:px-8 mt-6 relative z-10">
        <div className="bg-[#0A192F] rounded-[32px] p-10 lg:p-16 flex flex-col md:flex-row items-center justify-between relative overflow-hidden shadow-2xl border border-[#1E2D3D]">
          
          {/* Animated Background Mesh/Grid */}
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
          <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-[#0066FF]/20 rounded-full blur-[120px] pointer-events-none animate-pulse" />
          <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-[#4F46E5]/20 rounded-full blur-[120px] pointer-events-none" />

          <div className="md:w-[55%] relative z-20 text-white">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}
              className="bg-white/5 border border-white/10 backdrop-blur-md text-[#66A3FF] px-4 py-2 rounded-full text-[13px] font-bold mb-8 flex items-center gap-2 w-fit shadow-[0_0_15px_rgba(0,102,255,0.3)]"
            >
              <Sparkles className="w-4 h-4 text-[#FDE047]" /> Introducing TextileHub AI <ChevronRight className="w-3 h-3 ml-1" />
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
              className="text-[56px] lg:text-[72px] font-display font-extrabold leading-[1.05] mb-6 tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-white/70"
            >
              Procure the world's best textiles. <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0066FF] to-[#38BDF8]">Powered by AI.</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
              className="text-[18px] text-[#94A3B8] mb-10 max-w-[500px] leading-relaxed font-medium"
            >
              Access 2,500+ verified global mills, compare MOQs instantly, and generate automated RFQs using our intelligent sourcing engine.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Button onClick={() => navigate('/marketplace')} className="bg-[#0066FF] hover:bg-[#2563EB] text-white font-bold h-14 px-8 rounded-[14px] text-[16px] shadow-[0_0_40px_rgba(0,102,255,0.4)] border-none transition-all hover:scale-[1.02]">
                Start Sourcing
              </Button>
              <Button variant="outline" className="bg-white/5 border-white/10 hover:bg-white/10 text-white font-bold h-14 px-8 rounded-[14px] text-[16px] transition-all hover:scale-[1.02] backdrop-blur-sm">
                Book Demo
              </Button>
            </motion.div>
          </div>
          
          <div className="md:w-[45%] mt-16 md:mt-0 relative z-20 flex justify-end h-[500px]">
            <motion.div style={{ y: heroY }} className="w-[380px] h-full relative hidden lg:block perspective-1000">
              
              {/* Floating Widget 1: Product Preview */}
              <motion.div 
                animate={{ y: [0, -15, 0] }} transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
                className="absolute top-10 right-0 w-[300px] bg-white/10 backdrop-blur-xl rounded-[24px] p-5 shadow-[0_30px_60px_rgba(0,0,0,0.4)] border border-white/10 z-20"
              >
                <div className="h-[120px] rounded-[16px] bg-[#1E2D3D] mb-4 overflow-hidden relative group">
                  <img src="https://images.unsplash.com/photo-1596484552834-6a58f850d0d7?auto=format&fit=crop&w=600&q=80" alt="Denim" className="w-full h-full object-cover opacity-90 group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute top-2 left-2 bg-black/50 backdrop-blur-md px-2 py-1 rounded-lg flex items-center gap-1 text-[10px] font-bold text-white uppercase tracking-wider">
                    <ShieldCheck className="w-3 h-3 text-emerald-400" /> Verified
                  </div>
                </div>
                <h5 className="font-bold text-[16px] text-white tracking-tight mb-1">14oz Japanese Selvedge Denim</h5>
                <div className="flex items-center gap-1.5 text-[12px] text-[#94A3B8] mb-4 font-medium">
                  <Factory className="w-3.5 h-3.5" /> Kuroki Mills, Okayama
                </div>
                <div className="flex justify-between items-end border-t border-white/10 pt-3">
                  <div>
                    <span className="text-[10px] text-[#64748B] font-bold uppercase tracking-wider block mb-0.5">MOQ</span>
                    <span className="text-[14px] font-bold text-white">300m</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-[#64748B] font-bold uppercase tracking-wider block mb-0.5">Wholesale</span>
                    <span className="text-[16px] font-display font-bold text-[#38BDF8]">$4.20/m</span>
                  </div>
                </div>
              </motion.div>

              {/* Floating Widget 2: AI Match Badge */}
              <motion.div 
                animate={{ y: [0, 15, 0] }} transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }}
                className="absolute bottom-24 -left-16 w-[280px] bg-[#0066FF] rounded-[20px] p-5 shadow-[0_20px_40px_rgba(0,102,255,0.3)] border border-[#38BDF8]/30 z-30 overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-[20px]" />
                <div className="flex items-center gap-4 relative z-10">
                  <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm text-white flex items-center justify-center shadow-inner">
                    <Sparkles className="w-6 h-6" />
                  </div>
                  <div>
                    <h5 className="font-bold text-[16px] text-white">99% AI Match</h5>
                    <p className="text-[12px] text-white/80 font-medium">Analyzed 2.4k supplier profiles.</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. LOGO CLOUD (Trust markers) */}
      <section className="max-w-[1400px] mx-auto px-4 lg:px-8 mt-16 text-center">
        <p className="text-[13px] font-bold text-[#94A3B8] uppercase tracking-[0.2em] mb-8">Trusted by sourcing teams at modern brands</p>
        <div className="flex flex-wrap justify-center gap-10 lg:gap-20 opacity-50 grayscale">
          {['ACME Corp', 'GlobalTex', 'Nordic Weave', 'Elevate Supply', 'Quantum Apparel'].map((brand, i) => (
            <div key={i} className="text-[20px] font-display font-bold text-[#0A2540]">{brand}</div>
          ))}
        </div>
      </section>

      {/* 3. CATEGORIES ROW (Interactive SaaS tiles) */}
      <section className="max-w-[1400px] mx-auto px-4 lg:px-8 mt-24">
        <motion.div 
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={staggerContainer}
          className="flex items-center gap-4 overflow-x-auto pb-6 scrollbar-hide snap-x"
        >
          {[
            { name: 'Cotton', count: '450+', icon: Box, color: 'text-blue-500', bg: 'bg-blue-50' },
            { name: 'Denim', count: '300+', icon: Layers, color: 'text-indigo-500', bg: 'bg-indigo-50' },
            { name: 'Silk', count: '120+', icon: Sparkles, color: 'text-purple-500', bg: 'bg-purple-50' },
            { name: 'Technical', count: '210+', icon: Hexagon, color: 'text-emerald-500', bg: 'bg-emerald-50' },
            { name: 'Organic', count: '340+', icon: ShieldCheck, color: 'text-amber-500', bg: 'bg-amber-50' },
          ].map((cat, i) => (
            <motion.div key={i} variants={fadeInUp} className="snap-start shrink-0">
              <div 
                onClick={() => navigate(`/marketplace?category=${cat.name}`)} 
                className="bg-white rounded-[20px] p-5 w-[240px] shadow-sm hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:-translate-y-1 transition-all duration-300 cursor-pointer border border-[#E2E8F0] group relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-transparent to-[#F1F5F9] opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-bl-[100px]" />
                <div className="flex items-center justify-between relative z-10">
                  <div>
                    <h4 className="font-bold text-[#0A2540] text-[16px] mb-1">{cat.name}</h4>
                    <p className="text-[12px] font-bold text-[#64748B] group-hover:text-[#0066FF] transition-colors">{cat.count} Suppliers</p>
                  </div>
                  <div className={`w-12 h-12 ${cat.bg} rounded-[14px] flex items-center justify-center ${cat.color} group-hover:scale-110 transition-transform duration-300`}>
                    <cat.icon className="w-6 h-6" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
          
          <motion.div variants={fadeInUp} className="snap-start shrink-0">
            <button onClick={() => navigate('/categories')} className="bg-[#0A2540] hover:bg-[#0066FF] transition-colors duration-300 rounded-[20px] h-[88px] px-8 flex items-center justify-center shadow-md group">
              <span className="text-white font-bold text-[14px] mr-2">View All</span>
              <ArrowRight className="w-5 h-5 text-white group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        </motion.div>
      </section>

      {/* 4. FEATURED MATERIALS (Premium Procurement Cards) */}
      <section className="max-w-[1400px] mx-auto px-4 lg:px-8 mt-24">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeInUp} className="flex items-end justify-between mb-10">
          <div>
            <h2 className="text-[32px] md:text-[40px] font-display font-bold text-[#0A2540] tracking-tight mb-2">Featured Materials</h2>
            <p className="text-[#64748B] text-[15px] font-medium">Discover highly-rated fabrics from verified enterprise mills.</p>
          </div>
          <Button variant="ghost" onClick={() => navigate('/marketplace')} className="text-[#0066FF] hover:bg-[#0066FF]/10 text-[14px] font-bold hidden md:flex items-center gap-2 h-10 px-4 rounded-[10px]">
            Explore Marketplace <ArrowRight className="w-4 h-4" />
          </Button>
        </motion.div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: 4 }).map((_, i) => <div key={i} className="h-[460px] bg-white rounded-[24px] animate-pulse border border-[#E2E8F0]" />)}
          </div>
        ) : (
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.slice(0, 4).map((product, i) => (
              <motion.div key={i} variants={fadeInUp}>
                <div 
                  onClick={() => navigate(`/products/${product._id}`)}
                  className="bg-white rounded-[24px] border border-[#E2E8F0] overflow-hidden shadow-sm hover:shadow-[0_20px_40px_rgb(0,0,0,0.06)] hover:-translate-y-1 transition-all duration-300 flex flex-col group cursor-pointer h-full relative"
                >
                  {/* Image Gallery Area */}
                  <div className="h-[240px] bg-[#F8FAFC] relative overflow-hidden">
                    {product.images?.[0] ? (
                      <img src={product.images[0]} alt={product.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-[#CBD5E1]"><Box className="w-12 h-12" /></div>
                    )}
                    
                    {/* Floating Badges */}
                    <div className="absolute top-4 left-4 right-4 flex justify-between items-start z-10">
                      <div className="bg-white/95 backdrop-blur-md px-2.5 py-1.5 rounded-[8px] text-[10px] font-bold text-[#0A2540] shadow-sm flex items-center gap-1.5 border border-[#E2E8F0]">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" /> Verified Mill
                      </div>
                      <div className="w-8 h-8 bg-white/95 backdrop-blur-md rounded-[8px] shadow-sm border border-[#E2E8F0] flex items-center justify-center text-[#64748B] hover:text-[#0066FF] transition-colors">
                        <Bookmark className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                  
                  {/* Content Area */}
                  <div className="p-5 flex-1 flex flex-col">
                    <div className="flex items-center justify-between mb-2.5">
                      <p className="text-[11px] font-bold text-[#64748B] tracking-widest uppercase bg-[#F1F5F9] px-2 py-0.5 rounded-[4px]">
                        {product.fabricType}
                      </p>
                      <div className="flex items-center gap-1 text-[12px] font-bold text-[#0A2540]">
                        <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" /> 4.9
                      </div>
                    </div>

                    <h3 className="text-[18px] font-bold text-[#0A2540] mb-5 line-clamp-2 leading-snug group-hover:text-[#0066FF] transition-colors">
                      {product.title}
                    </h3>
                    
                    {/* Dense B2B Data Grid */}
                    <div className="grid grid-cols-2 gap-y-4 gap-x-3 mb-5 flex-1 p-3 bg-[#F8FAFC] rounded-[12px] border border-[#E2E8F0]/50">
                      <div>
                        <p className="text-[10px] uppercase font-bold tracking-widest text-[#94A3B8] mb-1 flex items-center gap-1"><MapPin className="w-3 h-3"/> Location</p>
                        <p className="text-[13px] font-bold text-[#0A2540] truncate">
                          {typeof product.supplierId === 'object' ? product.supplierId.fullName : 'Asia'}
                        </p>
                      </div>
                      <div>
                        <p className="text-[10px] uppercase font-bold tracking-widest text-[#94A3B8] mb-1 flex items-center gap-1"><Layers className="w-3 h-3"/> MOQ</p>
                        <p className="text-[13px] font-bold text-[#0A2540]">{product.moq?.value} {product.moq?.unit}</p>
                      </div>
                      <div className="col-span-2 pt-2 border-t border-[#E2E8F0]">
                        <p className="text-[10px] uppercase font-bold tracking-widest text-[#94A3B8] mb-1">Wholesale Price</p>
                        <p className="text-[16px] font-display font-bold text-[#0066FF]">
                          ${product.priceRange?.min} - ${product.priceRange?.max} <span className="text-[12px] text-[#64748B] font-medium">/{product.priceRange?.unit}</span>
                        </p>
                      </div>
                    </div>
                    
                    {/* Bottom Action */}
                    <Button onClick={(e) => { e.stopPropagation(); navigate(`/products/${product._id}`); }} className="w-full bg-[#0A2540] hover:bg-[#0066FF] text-white h-12 rounded-[12px] text-[14px] font-bold shadow-none transition-colors group/btn">
                      Request RFQ <ArrowRight className="w-4 h-4 ml-2 opacity-70 group-hover/btn:opacity-100 group-hover/btn:translate-x-1 transition-all" />
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </section>

      {/* 5. ENTERPRISE INFO METRICS (SaaS Stats Row) */}
      <section className="max-w-[1400px] mx-auto px-4 lg:px-8 mt-32">
        <motion.div 
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {[
            { tag: 'Global Network', value: '2.5K+', desc: 'Strictly vetted enterprise manufacturers', icon: Factory },
            { tag: 'Inventory', value: '15K+', desc: 'Materials across 40+ different countries', icon: Layers },
            { tag: 'AI Matching', value: '98%', desc: 'Sourcing accuracy out of the box', icon: Sparkles },
            { tag: 'Speed', value: '24h', desc: 'Average time for initial RFQ drafts', icon: Clock },
          ].map((promo, i) => (
            <motion.div key={i} variants={fadeInUp}>
              <div className="bg-white rounded-[24px] p-8 flex flex-col relative shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-[#E2E8F0] hover:border-[#0066FF]/30 hover:shadow-[0_8px_30px_rgb(0,102,255,0.08)] transition-all duration-300">
                <div className="w-12 h-12 bg-[#F1F5F9] rounded-[12px] flex items-center justify-center mb-6 text-[#0066FF]">
                  <promo.icon className="w-6 h-6" />
                </div>
                <div className="text-[48px] font-display font-extrabold text-[#0A2540] leading-none mb-3 tracking-tight">{promo.value}</div>
                <h4 className="text-[14px] font-bold text-[#0A2540] mb-2">{promo.tag}</h4>
                <p className="text-[14px] text-[#64748B] leading-relaxed font-medium">{promo.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* 6. AI PROCUREMENT WORKSPACE (Interactive Demo) */}
      <section className="max-w-[1400px] mx-auto px-4 lg:px-8 mt-32 mb-10">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeInUp}>
          <div className="bg-[#0A2540] rounded-[32px] p-10 lg:p-20 flex flex-col lg:flex-row gap-16 items-center relative overflow-hidden shadow-2xl border border-[#1E2D3D]">
            
            {/* Ambient Backgrounds */}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay pointer-events-none" />
            <div className="absolute top-0 left-1/2 w-[800px] h-[800px] bg-[#0066FF]/10 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
            
            <div className="flex-1 relative z-10 text-white">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 text-[#38BDF8] text-[12px] font-bold uppercase tracking-widest mb-6">
                <Sparkles className="w-3.5 h-3.5" /> Copilot
              </div>
              <h2 className="text-[40px] md:text-[48px] font-display font-bold leading-[1.1] mb-6 tracking-tight">
                Stop manually searching PDF catalogs.
              </h2>
              <p className="text-[#94A3B8] text-[18px] mb-10 leading-relaxed font-medium max-w-[480px]">
                Our AI Copilot transforms your natural language requirements into ranked supplier matches and instantly drafts professional RFQs.
              </p>
              <div className="space-y-6">
                {[
                  { title: 'Natural Language Search', desc: 'Type what you need exactly how you think it.' },
                  { title: 'Intelligent Ranking', desc: 'AI scores mills based on your precise constraints.' },
                  { title: 'Automated RFQs', desc: 'Generate a professional draft in one click.' }
                ].map((item) => (
                  <div key={item.title} className="flex gap-4">
                    <div className="w-8 h-8 rounded-full bg-[#0066FF]/20 flex items-center justify-center shrink-0 mt-0.5">
                      <CheckCircle2 className="w-5 h-5 text-[#38BDF8]" />
                    </div>
                    <div>
                      <h4 className="font-bold text-[16px] text-white mb-1">{item.title}</h4>
                      <p className="text-[#94A3B8] text-[14px]">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Interactive Demo UI */}
            <div className="flex-1 w-full max-w-[500px] relative z-10">
              <div className="bg-white rounded-[24px] p-2 shadow-[0_30px_60px_rgba(0,0,0,0.4)] border border-white/10 relative overflow-hidden">
                <div className="bg-[#F8FAFC] rounded-[20px] p-6 h-[400px] flex flex-col relative border border-[#E2E8F0]">
                  
                  {/* Progress Bar */}
                  <div className="absolute top-0 left-0 h-1 bg-[#0066FF] transition-all duration-[3000ms] ease-linear" style={{ width: `${(demoStep / 5) * 100}%` }} />

                  <AnimatePresence mode="wait">
                    <motion.div 
                      key={demoStep}
                      initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }}
                      transition={{ duration: 0.4 }}
                      className="flex-1 flex flex-col justify-center"
                    >
                      {/* Step 0: Input */}
                      <div className="bg-white rounded-[16px] p-5 shadow-sm border border-[#E2E8F0] mb-6 relative">
                        <div className="absolute -top-3 -left-3 w-8 h-8 bg-[#0A2540] rounded-full border-4 border-[#F8FAFC] flex items-center justify-center text-white"><Hexagon className="w-4 h-4 fill-current"/></div>
                        <p className="text-[15px] text-[#0A2540] font-medium leading-relaxed mt-1">
                          "I need 2000m of Heavyweight Denim, under $5/m. Must be from a verified supplier in Japan."
                        </p>
                      </div>
                      
                      {demoStep >= 1 && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-3 text-[14px] text-[#64748B] pl-2 font-medium mb-4">
                          <Sparkles className="w-4 h-4 text-[#0066FF] animate-pulse" /> AI extracting parameters...
                        </motion.div>
                      )}

                      {demoStep >= 2 && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-3 text-[14px] text-[#64748B] pl-2 font-medium mb-4">
                          <Search className="w-4 h-4 text-[#0066FF] animate-pulse" /> Querying 2,500+ suppliers...
                        </motion.div>
                      )}

                      {demoStep >= 3 && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-3 text-[14px] text-[#64748B] pl-2 font-medium mb-4">
                          <Globe2 className="w-4 h-4 text-[#0066FF] animate-spin-slow" /> Ranking by logistics & price...
                        </motion.div>
                      )}

                      {demoStep >= 4 && (
                        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-white rounded-[16px] border-2 border-[#0066FF] p-5 shadow-lg relative overflow-hidden">
                          <div className="absolute top-0 right-0 w-20 h-20 bg-[#0066FF]/5 rounded-bl-[40px] pointer-events-none" />
                          <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-2 text-[#0066FF] font-bold text-[12px] uppercase tracking-wider">
                              <ShieldCheck className="w-4 h-4" /> Best Match
                            </div>
                            <span className="text-[12px] font-bold bg-[#F1F5F9] text-[#0A2540] px-2 py-1 rounded-[6px]">99% Score</span>
                          </div>
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-[12px] bg-[#0A2540] text-white flex items-center justify-center font-display font-bold text-[18px]">KT</div>
                            <div>
                              <h4 className="font-bold text-[16px] text-[#0A2540] mb-0.5">Kuroki Textiles</h4>
                              <p className="text-[12px] font-medium text-[#64748B]">Okayama, Japan • $4.20/m</p>
                            </div>
                          </div>
                        </motion.div>
                      )}
                      
                      {demoStep >= 5 && (
                        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-6">
                           <Button className="w-full bg-[#0A2540] hover:bg-[#0066FF] text-white font-bold h-12 rounded-[12px] shadow-lg transition-colors">
                             Generate RFQ Draft <ChevronRight className="w-4 h-4 ml-1" />
                           </Button>
                        </motion.div>
                      )}
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </div>
            
          </div>
        </motion.div>
      </section>

      {/* 7. FINAL CTA (Premium SaaS Footer Callout) */}
      <section className="max-w-[1400px] mx-auto px-4 lg:px-8 mt-32">
        <motion.div 
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeInUp}
          className="bg-white border border-[#E2E8F0] rounded-[32px] p-12 lg:p-24 flex flex-col items-center text-center shadow-[0_8px_30px_rgb(0,0,0,0.04)] relative overflow-hidden"
        >
          {/* Subtle grid bg */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#f1f5f9_1px,transparent_1px),linear-gradient(to_bottom,#f1f5f9_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none opacity-50" />
          
          <div className="w-16 h-16 bg-[#F1F5F9] rounded-[16px] flex items-center justify-center mb-8 relative z-10 border border-[#E2E8F0]">
            <Hexagon className="w-8 h-8 text-[#0066FF] fill-[#0066FF]/20" />
          </div>
          
          <h2 className="text-[40px] md:text-[56px] font-display font-extrabold text-[#0A2540] leading-[1.1] mb-6 tracking-tight relative z-10">
            Ready to upgrade your supply chain?
          </h2>
          <p className="text-[#64748B] text-[18px] mb-12 max-w-[600px] font-medium leading-relaxed relative z-10">
            Join thousands of modern enterprises using TextileHub's AI network to source smarter, faster, and more reliably.
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-4 relative z-10">
            <Button onClick={() => navigate('/marketplace')} className="bg-[#0066FF] hover:bg-[#2563EB] text-white rounded-[14px] h-14 px-10 font-bold shadow-lg shadow-[#0066FF]/20 text-[16px] transition-transform hover:scale-[1.02]">
              Start Sourcing Now
            </Button>
            <Button onClick={() => navigate('/register')} variant="outline" className="border-[#E2E8F0] text-[#0A2540] hover:bg-[#F8FAFC] rounded-[14px] h-14 px-10 font-bold text-[16px] transition-transform hover:scale-[1.02]">
              Become a Supplier
            </Button>
          </div>
        </motion.div>
      </section>

    </div>
  )
}
