import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Product } from '../types/products.types'
import { 
  ShieldCheck, MapPin, Sparkles, ArrowRight, 
  TrendingUp, CheckCircle2, Globe2
} from 'lucide-react'
import { Button } from '@/shared/components/ui/button'
import { motion, AnimatePresence } from 'framer-motion'
import { transitionCard } from '@/shared/animations'

interface ProductCardProps {
  product: Product
  onSelectForCompare?: (product: Product, isSelected: boolean) => void
  isSelectedForCompare?: boolean
}

export function ProductCard({ product, onSelectForCompare, isSelectedForCompare = false }: ProductCardProps) {
  const navigate = useNavigate()
  const [isHovered, setIsHovered] = useState(false)
  const mainImage = product.images?.[0] || 'https://images.unsplash.com/photo-1596484552834-6a58f850d0d7?auto=format&fit=crop&w=800&q=80'
  const supplierName = typeof product.supplierId === 'object' ? product.supplierId.fullName : 'Verified Supplier'
  const aiScore = product.aiScore || 92

  return (
    <motion.div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      animate={{ y: isHovered ? -4 : 0 }}
      transition={transitionCard}
      className={`bg-white rounded-[24px] overflow-visible border ${isSelectedForCompare ? 'border-[#0066FF] ring-1 ring-[#0066FF] shadow-md' : 'border-[#E2E8F0] shadow-sm'} transition-shadow relative flex flex-col h-full`}
    >
      <div className="absolute top-4 left-4 z-20 flex items-center gap-2">
        <div className="bg-[#16A34A] text-white px-2 py-1 rounded-[6px] text-[10px] font-bold shadow-sm flex items-center gap-1">
          <ShieldCheck className="w-3 h-3" /> Verified Mill
        </div>
      </div>

      <div className="absolute top-4 right-4 z-20 flex items-center gap-2">
        <button 
          onClick={(e) => {
            e.preventDefault()
            if (onSelectForCompare) onSelectForCompare(product, !isSelectedForCompare)
          }} 
          className={`px-3 py-1.5 rounded-[8px] text-[11px] font-bold shadow-sm border transition-colors ${isSelectedForCompare ? 'bg-[#0066FF] text-white border-[#0066FF]' : 'bg-white/95 backdrop-blur text-[#0A2540] border-[#E2E8F0] hover:bg-[#F8FAFC]'}`}
        >
          {isSelectedForCompare ? 'Compared' : '+ Compare'}
        </button>
      </div>

      {/* Top Half: Header & Image & Circular Score */}
      <div className="p-5 pb-0 relative">
        <div className="flex gap-4 mb-4 relative z-10">
          <div className="w-[88px] h-[88px] rounded-[16px] overflow-hidden bg-[#F1F5F9] border border-[#E2E8F0] flex-shrink-0 relative">
            <motion.img 
              animate={{ scale: isHovered ? 1.05 : 1 }} 
              transition={{ duration: 0.4 }}
              src={mainImage} 
              alt={product.title} 
              className="w-full h-full object-cover" 
            />
          </div>
          
          <div className="flex-1 min-w-0 flex flex-col justify-center">
            <div className="flex items-center gap-1.5 mb-1">
              <span className="text-[12px] font-bold text-[#0A2540] truncate" title={supplierName}>{supplierName}</span>
              <span className="w-1 h-1 rounded-full bg-[#CBD5E1]" />
              <span className="text-[10px] text-[#64748B] flex items-center gap-0.5"><MapPin className="w-2.5 h-2.5" /> India</span>
            </div>
            <h3 className="text-[16px] font-display font-bold text-[#0A2540] leading-tight mb-2 truncate">
              {product.title}
            </h3>
            
            <div className="flex items-center gap-2">
              <div className="bg-[#F8FAFC] border border-[#E2E8F0] px-2 py-1 rounded-[6px] text-[10px] font-bold text-[#64748B]">
                Trust: 4.8/5
              </div>
              <div className="bg-[#F8FAFC] border border-[#E2E8F0] px-2 py-1 rounded-[6px] text-[10px] font-bold text-[#64748B]">
                {product.fabricType || 'Cotton'}
              </div>
            </div>
          </div>
          
          {/* Animated Circular Score */}
          <div className="absolute -right-2 -top-2 flex flex-col items-center">
            <div className="relative w-12 h-12 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                <circle cx="18" cy="18" r="16" fill="none" className="stroke-[#F1F5F9]" strokeWidth="4" />
                <motion.circle 
                  cx="18" cy="18" r="16" fill="none" 
                  className="stroke-[#16A34A]" strokeWidth="4" 
                  strokeDasharray={`${aiScore}, 100`} 
                  strokeLinecap="round"
                  initial={{ strokeDasharray: "0, 100" }}
                  animate={{ strokeDasharray: `${aiScore}, 100` }}
                  transition={{ duration: 1, delay: 0.2 }}
                />
              </svg>
              <span className="absolute text-[12px] font-bold text-[#0A2540]">{aiScore}</span>
            </div>
            <span className="text-[9px] font-bold text-[#16A34A] uppercase tracking-wider mt-1 bg-[#16A34A]/10 px-1.5 py-0.5 rounded">Match</span>
          </div>
        </div>

        {/* AI Summary Block */}
        <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-[12px] p-3 mb-4">
          <div className="flex items-center gap-1.5 mb-2">
            <Sparkles className="w-3.5 h-3.5 text-[#0066FF]" />
            <span className="text-[11px] font-bold text-[#0066FF] uppercase tracking-wider">AI Procurement Summary</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-1.5 gap-x-4">
            <div className="flex items-center gap-1.5 text-[11px] text-[#0A2540] font-medium"><CheckCircle2 className="w-3 h-3 text-[#16A34A]" /> Low Procurement Risk</div>
            <div className="flex items-center gap-1.5 text-[11px] text-[#0A2540] font-medium"><CheckCircle2 className="w-3 h-3 text-[#16A34A]" /> Stable Global Pricing</div>
            <div className="flex items-center gap-1.5 text-[11px] text-[#0A2540] font-medium"><CheckCircle2 className="w-3 h-3 text-[#16A34A]" /> High Export Reliability</div>
          </div>
        </div>

        {/* Dense Specs Grid */}
        <div className="grid grid-cols-4 gap-3 border-t border-b border-[#F1F5F9] py-3 mb-4">
          <div>
            <span className="block text-[9px] font-bold text-[#94A3B8] uppercase tracking-wider mb-1">Lead Time</span>
            <span className="block text-[13px] font-bold text-[#0A2540]">{product.leadTime || '14 Days'}</span>
          </div>
          <div>
            <span className="block text-[9px] font-bold text-[#94A3B8] uppercase tracking-wider mb-1">MOQ</span>
            <span className="block text-[13px] font-bold text-[#0A2540]">{product.moq?.value || 500}<span className="text-[10px] text-[#64748B] ml-0.5">{product.moq?.unit || 'm'}</span></span>
          </div>
          <div>
            <span className="block text-[9px] font-bold text-[#94A3B8] uppercase tracking-wider mb-1">Capacity</span>
            <span className="block text-[13px] font-bold text-[#0A2540]">45k<span className="text-[10px] text-[#64748B] ml-0.5">m/mo</span></span>
          </div>
          <div>
            <span className="block text-[9px] font-bold text-[#94A3B8] uppercase tracking-wider mb-1">Est. Price</span>
            <span className="block text-[14px] font-display font-extrabold text-[#0066FF]">${product.priceRange?.min || '3.50'}</span>
          </div>
        </div>
      </div>
      
      {/* Expanded Hover Section */}
      <AnimatePresence>
        {isHovered && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="px-5 overflow-hidden"
          >
            <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-[12px] p-3 mb-4 flex gap-4">
               <div className="flex-1">
                 <span className="flex items-center gap-1.5 text-[10px] font-bold text-[#94A3B8] uppercase mb-1.5"><TrendingUp className="w-3 h-3" /> 6mo Price Trend</span>
                 <div className="h-4 bg-[#E2E8F0] rounded-full overflow-hidden flex items-center">
                    <div className="h-full bg-[#16A34A] w-[80%]" />
                 </div>
                 <span className="text-[9px] font-medium text-[#16A34A] block mt-1">-4% below average</span>
               </div>
               <div className="w-px bg-[#E2E8F0]" />
               <div className="flex-1">
                 <span className="flex items-center gap-1.5 text-[10px] font-bold text-[#94A3B8] uppercase mb-1.5"><Globe2 className="w-3 h-3" /> Top Markets</span>
                 <div className="flex gap-1">
                    <span className="text-[9px] font-bold bg-white border border-[#E2E8F0] px-1.5 py-0.5 rounded">US</span>
                    <span className="text-[9px] font-bold bg-white border border-[#E2E8F0] px-1.5 py-0.5 rounded">EU</span>
                    <span className="text-[9px] font-bold bg-white border border-[#E2E8F0] px-1.5 py-0.5 rounded">UK</span>
                 </div>
               </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="p-5 pt-0 mt-auto">
        <Button 
          onClick={() => navigate(`/products/${product._id}`)}
          className="w-full bg-[#0A2540] hover:bg-[#0066FF] text-white font-bold h-11 rounded-[10px] shadow-sm transition-colors"
        >
          View Full Specifications <ArrowRight className="w-4 h-4 ml-1.5" />
        </Button>
      </div>
    </motion.div>
  )
}
