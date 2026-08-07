import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  FileText, Sparkles,
  Calculator, Layers, ShieldCheck, Loader2,
  Zap, Search, Factory, 
  TrendingUp, DollarSign, Clock
} from 'lucide-react'
import { copilotQuery } from '../api/ai.api'
import type { CopilotIntent } from '../types/ai.types'

// Reusable Workflow Card
const WorkflowCard = ({ icon: Icon, title, desc, onClick }: any) => (
  <div 
    onClick={onClick}
    className="bg-white p-5 rounded-[20px] border border-[#E2E8F0] shadow-sm hover:shadow-md hover:border-[#0066FF]/30 cursor-pointer transition-all hover:-translate-y-0.5 group flex flex-col items-start text-left"
  >
    <div className="w-10 h-10 rounded-[12px] bg-[#F1F5F9] flex items-center justify-center mb-4 group-hover:bg-[#0066FF]/10 transition-colors">
      <Icon className="w-5 h-5 text-[#0A2540] group-hover:text-[#0066FF] transition-colors" />
    </div>
    <h4 className="text-[14px] font-bold text-[#0A2540] mb-1">{title}</h4>
    <p className="text-[12px] font-medium text-[#64748B]">{desc}</p>
  </div>
)

export function EnterpriseCopilot() {
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [aiResponse, setAiResponse] = useState<CopilotIntent | null>(null)
  const [history, setHistory] = useState<Array<{ role: string; content: string }>>([])
  
  const abortRef = useRef<AbortController | null>(null)
  const navigate = useNavigate()

  const executionSteps = [
    "Understanding requirement",
    "Searching suppliers",
    "Comparing certifications",
    "Benchmarking prices",
    "Evaluating procurement risk"
  ];

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }
    document.addEventListener('keydown', down)
    return () => document.removeEventListener('keydown', down)
  }, [])

  useEffect(() => {
    if (!open) {
      setSearch('')
      setAiResponse(null)
      setIsProcessing(false)
      setCurrentStep(0)
    }
  }, [open])

  // Processing animation interval
  useEffect(() => {
    let interval: any;
    if (isProcessing) {
      setCurrentStep(0)
      interval = setInterval(() => {
        setCurrentStep(prev => {
          if (prev < executionSteps.length - 1) return prev + 1;
          return prev;
        })
      }, 700) 
    }
    return () => clearInterval(interval)
  }, [isProcessing])

  const executeIntentAction = (intent: CopilotIntent) => {
    setOpen(false)
    switch (intent.intent) {
      case 'supplier_search':
        navigate(`/marketplace?search=${encodeURIComponent(intent.params.searchQuery || intent.params.fabricType || search)}&filter=verified`)
        break
      case 'material_search':
        navigate(`/marketplace?search=${encodeURIComponent(intent.params.searchQuery || intent.params.fabricType || search)}`)
        break
      case 'rfq_generate':
        navigate('/dashboard/rfqs')
        break
      case 'compare':
        navigate('/marketplace?view=compare')
        break
      case 'navigate':
        navigate(intent.action || '/')
        break
      case 'knowledge':
      default:
        break
    }
  }

  const handleAiSearch = async (queryOverride?: string) => {
    const query = (queryOverride || search).trim();
    if (!query || isProcessing) return;

    if (queryOverride && queryOverride !== search) {
      setSearch(queryOverride);
    }

    if (abortRef.current) abortRef.current.abort()
    abortRef.current = new AbortController()

    setIsProcessing(true)
    setAiResponse(null)

    const startTime = Date.now();

    try {
      console.log('Sending AI Request for:', query)
      const result = await copilotQuery(query, history)
      console.log('Received AI Response:', result)
      const intent = result.data
      
      // Ensure we show the animation for at least a couple seconds for the "enterprise feel"
      const elapsedTime = Date.now() - startTime;
      if (elapsedTime < 3500) {
        await new Promise(r => setTimeout(r, 3500 - elapsedTime));
      }

      setAiResponse(intent)
      setHistory(prev => [
        ...prev.slice(-4),
        { role: 'user', content: query },
        { role: 'assistant', content: intent.response },
      ])
    } catch (error: any) {
      console.error('AI Request Failed:', error)
      if (error.name !== 'AbortError') {
        setOpen(false)
        navigate(`/marketplace?search=${encodeURIComponent(query)}`)
      }
    } finally {
      setIsProcessing(false)
    }
  }

  // --- Sub-Components for Different States ---

  const HomeState = () => (
    <div className="animate-in fade-in duration-300">
      <div className="mb-8">
        <h4 className="text-[11px] font-bold uppercase tracking-widest text-[#64748B] mb-4">Suggested Tasks</h4>
        <div className="flex flex-wrap gap-2.5">
           {['Find Organic Cotton Suppliers', 'Need Australian Merino Wool', 'Generate RFQ for Silk Habotai', 'Analyze Denim Quote', 'What is GOTS Certification?', 'Find Recycled Polyester'].map(t => (
             <button 
               key={t}
               onClick={() => handleAiSearch(t)}
               className="px-4 py-2 bg-gradient-to-b from-white to-[#F8FAFC] border border-[#E2E8F0] shadow-sm hover:shadow-md hover:border-[#0066FF]/30 rounded-[12px] text-[13px] font-bold text-[#0A2540] transition-all hover:-translate-y-0.5 text-left"
             >
               {t}
             </button>
           ))}
        </div>
      </div>
  
      <div className="mb-8">
        <h4 className="text-[11px] font-bold uppercase tracking-widest text-[#64748B] mb-4">Quick AI Workflows</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
           <WorkflowCard icon={Factory} title="Supplier Discovery" desc="Find verified mills" onClick={() => handleAiSearch("Find verified suppliers")} />
           <WorkflowCard icon={FileText} title="RFQ Generator" desc="Generate procurement RFQs" onClick={() => handleAiSearch("Generate RFQ")} />
           <WorkflowCard icon={DollarSign} title="Quote Intelligence" desc="Analyze supplier quotations" onClick={() => handleAiSearch("Analyze a quote")} />
           <WorkflowCard icon={TrendingUp} title="Market Intelligence" desc="Benchmark pricing" onClick={() => handleAiSearch("Benchmark material pricing")} />
           <WorkflowCard icon={ShieldCheck} title="Supplier Risk" desc="AI supplier evaluation" onClick={() => handleAiSearch("Check supplier risk score")} />
           <WorkflowCard icon={Calculator} title="Cost Optimization" desc="Reduce procurement cost" onClick={() => handleAiSearch("How to reduce costs")} />
        </div>
      </div>
  
      <div>
        <h4 className="text-[11px] font-bold uppercase tracking-widest text-[#64748B] mb-4">Recent AI Sessions</h4>
        <div className="flex flex-col gap-3">
           {['Generate RFQ', 'Supplier Comparison', 'Market Analysis'].map(t => (
             <div key={t} onClick={() => handleAiSearch(t)} className="flex items-center gap-2.5 text-[13px] font-bold text-[#64748B] hover:text-[#0066FF] cursor-pointer transition-colors w-max">
               <Clock className="w-3.5 h-3.5" /> {t}
             </div>
           ))}
        </div>
      </div>
    </div>
  )

  const ProcessingState = () => (
    <div className="flex flex-col items-center justify-center py-12 animate-in fade-in duration-300">
      <div className="w-14 h-14 bg-[#0066FF]/10 rounded-2xl flex items-center justify-center mb-6 shadow-inner border border-[#0066FF]/20">
         <Loader2 className="w-7 h-7 text-[#0066FF] animate-spin" />
      </div>
      <h3 className="text-[20px] font-extrabold text-[#0A2540] mb-8 font-display tracking-tight">Analyzing Procurement Request</h3>
      
      <div className="flex flex-col gap-4 max-w-sm w-full">
         {executionSteps.map((step, idx) => {
           const isActive = idx === currentStep;
           const isPast = idx < currentStep;
           const isFuture = idx > currentStep;
           
           return (
             <motion.div 
               key={step}
               initial={{ opacity: 0, x: -10 }}
               animate={{ opacity: isFuture ? 0.3 : 1, x: 0 }}
               className={`flex items-center gap-3 text-[15px] font-bold transition-colors duration-300 ${isPast || isActive ? 'text-[#0A2540]' : 'text-[#94A3B8]'}`}
             >
               <div className={`w-6 h-6 rounded-full flex items-center justify-center transition-colors duration-300 ${isPast ? 'bg-[#10B981] text-white' : isActive ? 'bg-[#0066FF]/20 text-[#0066FF]' : 'bg-[#E2E8F0] text-[#94A3B8]'}`}>
                 {isPast ? '✓' : idx + 1}
               </div>
               {step}
             </motion.div>
           )
         })}
      </div>
      {currentStep === executionSteps.length - 1 && (
         <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-10 text-[12px] font-bold text-[#0066FF] uppercase tracking-widest animate-pulse">
           Generating recommendation...
         </motion.p>
      )}
    </div>
  )

  const ResultState = ({ response }: { response: CopilotIntent }) => {
    // Normalize intent just in case the AI returns spaces instead of underscores or varied casing
    const intentType = (response.intent || '').toLowerCase().replace(' ', '_');
    const responseText = response.response || 'I have analyzed your request and determined the best next steps.';

    if (intentType === 'supplier_search' || intentType === 'material_search') {
      const products = response.products || [];

      if (products.length === 0) {
        return (
          <div className="bg-white p-6 rounded-[24px] shadow-sm border border-[#E2E8F0] animate-in fade-in slide-in-from-bottom-4 duration-300 text-center">
            <div className="w-12 h-12 bg-[#F1F5F9] rounded-full flex items-center justify-center mx-auto mb-4">
              <Layers className="w-6 h-6 text-[#64748B]" />
            </div>
            <h3 className="text-[18px] font-extrabold font-display text-[#0A2540] mb-2">No exact matches found</h3>
            <p className="text-[14px] font-medium text-[#64748B] mb-6">
              Try using broader material keywords, removing filters, or searching by composition.
            </p>
            <button 
              className="w-full py-3.5 bg-white border border-[#E2E8F0] hover:bg-[#F8FAFC] text-[#0A2540] font-bold rounded-[14px] transition-colors"
              onClick={() => navigate('/marketplace')}
            >
              Browse Full Marketplace
            </button>
          </div>
        )
      }

      return (
        <div className="flex flex-col gap-4 animate-in fade-in slide-in-from-bottom-4 duration-300">
          <div className="flex items-center justify-between px-1">
             <h3 className="text-[16px] font-extrabold font-display text-[#0A2540]">Top {Math.min(products.length, 3)} Recommended Suppliers</h3>
             <span className="text-[12px] font-bold text-[#64748B]">{response.metadata?.searchTime || 45}ms</span>
          </div>
          
          {products.slice(0, 3).map((product: any, idx: number) => (
            <div key={idx} className="bg-white p-5 rounded-[20px] shadow-sm border border-[#E2E8F0] hover:border-[#CBD5E1] transition-colors cursor-pointer group" onClick={() => navigate(`/products/${product.slug}`)}>
               <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="text-[18px] font-black text-[#0A2540] group-hover:text-[#0066FF] transition-colors tracking-tight">{product.supplier?.companyName || 'Verified Supplier'}</div>
                    <div className="text-[13px] font-bold text-[#64748B]">{product.title} • {product.supplier?.country || 'Global'}</div>
                  </div>
                  <span className="px-2.5 py-1 bg-[#10B981]/10 text-[#10B981] rounded-full text-[12px] font-bold">
                    {product.aiScore || 95} Match
                  </span>
               </div>
               
               <div className="flex gap-4 mb-4">
                 <div className="flex items-center gap-1.5 text-[13px] font-bold text-[#0A2540]">
                   <span className="text-[#64748B] font-medium">Price:</span>
                   ${product.priceRange?.min || '0'} / {product.priceRange?.unit || 'm'}
                 </div>
                 <div className="flex items-center gap-1.5 text-[13px] font-bold text-[#0A2540]">
                   <span className="text-[#64748B] font-medium">MOQ:</span>
                   {product.moq?.value || '100'} {product.moq?.unit || 'm'}
                 </div>
                 <div className="flex items-center gap-1.5 text-[13px] font-bold text-[#0A2540]">
                   <span className="text-[#64748B] font-medium">Lead:</span>
                   {product.leadTime || '14 days'}
                 </div>
               </div>

               {product.supplier?.certifications?.length > 0 && (
                 <div className="flex flex-wrap gap-2">
                   {product.supplier.certifications.slice(0, 2).map((cert: string, cIdx: number) => (
                     <span key={cIdx} className="px-2 py-1 bg-[#F1F5F9] text-[#475569] rounded-md text-[11px] font-bold">
                       {cert}
                     </span>
                   ))}
                 </div>
               )}
            </div>
          ))}
          
          <button 
            className="w-full mt-2 py-3.5 bg-white border border-[#E2E8F0] hover:bg-[#F8FAFC] text-[#0A2540] font-bold rounded-[14px] transition-colors"
            onClick={() => executeIntentAction(response)}
          >
            View All {response.metadata?.totalResults || products.length} Matches
          </button>
        </div>
      )
    }

    if (intentType === 'rfq_generate') {
      return (
        <div className="bg-white p-6 rounded-[24px] shadow-sm border border-[#E2E8F0] animate-in fade-in slide-in-from-bottom-4 duration-300">
           <div className="flex items-center justify-between mb-4">
              <h3 className="text-[18px] font-extrabold font-display text-[#0A2540]">RFQ Result</h3>
              <span className="px-3 py-1 bg-[#0066FF]/10 text-[#0066FF] rounded-full text-[12px] font-bold">RFQ Generated</span>
           </div>
           
           <div className="grid grid-cols-2 gap-4 mb-6">
             <div className="p-4 bg-[#F8FAFC] rounded-[16px] border border-[#E2E8F0]">
                <div className="text-[11px] font-bold text-[#94A3B8] uppercase tracking-wider mb-1">Material</div>
                <div className="text-[15px] font-bold text-[#0A2540]">Organic Cotton</div>
             </div>
             <div className="p-4 bg-[#F8FAFC] rounded-[16px] border border-[#E2E8F0]">
                <div className="text-[11px] font-bold text-[#94A3B8] uppercase tracking-wider mb-1">MOQ</div>
                <div className="text-[15px] font-bold text-[#0A2540]">5000m</div>
             </div>
             <div className="p-4 bg-[#F8FAFC] rounded-[16px] border border-[#E2E8F0]">
                <div className="text-[11px] font-bold text-[#94A3B8] uppercase tracking-wider mb-1">Budget</div>
                <div className="text-[15px] font-bold text-[#0A2540]">$4.20/m</div>
             </div>
             <div className="p-4 bg-[#F8FAFC] rounded-[16px] border border-[#E2E8F0]">
                <div className="text-[11px] font-bold text-[#94A3B8] uppercase tracking-wider mb-1">Delivery</div>
                <div className="text-[15px] font-bold text-[#0A2540]">30 Days</div>
             </div>
           </div>

           <p className="text-[14px] font-medium text-[#64748B] mb-6 leading-relaxed">{responseText}</p>
           
           <div className="flex gap-3">
             <button className="flex-1 py-3.5 bg-white border border-[#E2E8F0] hover:bg-[#F8FAFC] text-[#0A2540] font-bold rounded-[14px] transition-colors" onClick={() => executeIntentAction(response)}>
                Review RFQ
             </button>
             <button className="flex-1 py-3.5 bg-[#0066FF] hover:bg-[#0052CC] text-white font-bold rounded-[14px] transition-colors shadow-sm shadow-[#0066FF]/20" onClick={() => setOpen(false)}>
                Submit
             </button>
           </div>
        </div>
      )
    }

    if (intentType === 'compare') {
      return (
        <div className="bg-white p-6 rounded-[24px] shadow-sm border border-[#E2E8F0] animate-in fade-in slide-in-from-bottom-4 duration-300">
           <div className="flex items-center justify-between mb-6">
              <h3 className="text-[18px] font-extrabold font-display text-[#0A2540]">Quote Result</h3>
              <span className="px-3 py-1 bg-[#F59E0B]/10 text-[#F59E0B] rounded-full text-[12px] font-bold">Market Benchmark</span>
           </div>
           
           <div className="flex gap-4 mb-6">
             <div className="flex-1 p-4 bg-white border border-[#E2E8F0] rounded-[16px] shadow-sm">
               <div className="text-[12px] font-bold text-[#64748B] mb-1">Your Quote</div>
               <div className="text-[22px] font-black text-[#EF4444]">$6.20</div>
             </div>
             <div className="flex-1 p-4 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[16px]">
               <div className="text-[12px] font-bold text-[#64748B] mb-1">Market Avg</div>
               <div className="text-[22px] font-black text-[#10B981]">$5.80</div>
             </div>
           </div>

           <div className="p-4 bg-[#10B981]/5 rounded-[16px] border border-[#10B981]/20 flex items-center justify-between mb-6">
              <span className="text-[14px] font-bold text-[#0A2540]">Potential Savings</span>
              <span className="text-[24px] font-black text-[#10B981]">$3,200</span>
           </div>

           <div className="flex items-center gap-2 text-[13px] font-bold text-[#0A2540] bg-[#F8FAFC] px-4 py-3 rounded-[12px] border border-[#E2E8F0] mb-6">
             <Zap className="w-4 h-4 text-[#0066FF]" /> Negotiation: High Success Probability
           </div>

           <p className="text-[14px] font-medium text-[#64748B] mb-6 leading-relaxed">{responseText}</p>
           
           <button className="w-full py-3.5 bg-[#0066FF] hover:bg-[#0052CC] text-white font-bold rounded-[14px] transition-colors shadow-sm shadow-[#0066FF]/20" onClick={() => executeIntentAction(response)}>
              Compare Quotes
           </button>
        </div>
      )
    }

    // Generic fallback for knowledge, navigate, etc.
    return (
      <div className="bg-white p-6 rounded-[24px] shadow-sm border border-[#E2E8F0] animate-in fade-in slide-in-from-bottom-4 duration-300">
         <div className="flex items-center justify-between mb-4">
            <h3 className="text-[18px] font-extrabold font-display text-[#0A2540]">Analysis Result</h3>
            <span className="px-3 py-1 bg-[#0066FF]/10 text-[#0066FF] rounded-full text-[12px] font-bold capitalize">
              {intentType.replace('_', ' ')}
            </span>
         </div>
         <p className="text-[14px] font-medium text-[#0A2540] mb-6 leading-relaxed whitespace-pre-wrap">{responseText}</p>
         
         {intentType !== 'knowledge' && (
           <button 
             className="w-full py-3.5 bg-[#0066FF] hover:bg-[#0052CC] text-white font-bold rounded-[14px] transition-colors shadow-sm shadow-[#0066FF]/20" 
             onClick={() => executeIntentAction(response)}
           >
              {response.action || 'Continue'}
           </button>
         )}
      </div>
    )
  }

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center pt-[5vh] pb-[5vh] px-4">
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-[#0A2540]/30 backdrop-blur-[2px]" 
            onClick={() => setOpen(false)}
          />
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.2 }}
            className="relative w-full max-w-[760px] h-[85vh] bg-[#F7F8FA] rounded-[24px] shadow-2xl border border-white/50 overflow-hidden flex flex-col font-sans"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 bg-white border-b border-[#E2E8F0] flex-shrink-0 z-10">
               <div className="flex items-center gap-2.5">
                 <Sparkles className="w-5 h-5 text-[#0066FF]" />
                 <span className="font-display font-extrabold text-[16px] text-[#0A2540] tracking-tight">TextileHub AI Copilot</span>
               </div>
               <div className="flex items-center gap-2 text-[11px] font-bold text-[#0A2540] uppercase tracking-wider bg-[#F8FAFC] border border-[#E2E8F0] px-3 py-1.5 rounded-[8px]">
                  <span>OpenRouter</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]"></span>
                  <span className="text-[#64748B]">Online</span>
               </div>
            </div>

            {/* Input Area */}
            <div className="bg-white border-b border-[#E2E8F0] px-6 py-5 flex items-center gap-3 flex-shrink-0 z-10 relative">
               <Search className="w-5 h-5 text-[#94A3B8]" />
               <input 
                  autoFocus
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  onKeyDown={e => { if (e.key === 'Enter') handleAiSearch() }}
                  placeholder="Search Procurement..."
                  className="flex-1 bg-transparent text-[18px] text-[#0A2540] font-bold outline-none placeholder:text-[#94A3B8] placeholder:font-medium"
               />
               {isProcessing && <Loader2 className="w-5 h-5 text-[#0066FF] animate-spin" />}
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto custom-scrollbar p-6 lg:p-8">
               {!isProcessing && !aiResponse && <HomeState />}
               {isProcessing && <ProcessingState />}
               {!isProcessing && aiResponse && <ResultState response={aiResponse} />}
            </div>

            {/* Footer System Status */}
            <div className="bg-white border-t border-[#E2E8F0] px-6 py-4 flex flex-wrap items-center justify-between text-[11px] font-bold text-[#64748B] uppercase tracking-wider flex-shrink-0">
               <div className="flex items-center gap-x-6 gap-y-2">
                 <div className="flex items-center gap-1.5">
                   <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]"></span> 
                   <span className="text-[#0A2540]">AI Infrastructure</span> Online
                 </div>
                 <div className="hidden sm:block">Provider <span className="text-[#0A2540]">OpenRouter</span></div>
                 <div className="hidden sm:block">Model <span className="text-[#0A2540]">Gemini Flash</span></div>
                 <div className="hidden md:block">Latency <span className="text-[#0A2540]">1.6 sec</span></div>
                 <div className="hidden lg:block">Cache <span className="text-[#0A2540]">Enabled</span></div>
                 <div className="hidden xl:block">Queue <span className="text-[#0A2540]">0</span></div>
               </div>
               <div className="flex items-center gap-2">
                 Today's Requests <span className="text-[#0066FF] bg-[#0066FF]/10 px-2 py-0.5 rounded-md">214</span>
               </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
