import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Product } from '../types/products.types'
import { 
  ShieldCheck, MapPin, Sparkles, 
  FileText, Bookmark, CheckCircle2, Star
} from 'lucide-react'
import { Button } from '@/shared/components/ui/button'
import { motion } from 'framer-motion'
import { presets } from '@/shared/animations/presets'

interface ProductCardProps {
  product: Product
  onSelectForCompare?: (product: Product, isSelected: boolean) => void
  isSelectedForCompare?: boolean
}

export function ProductCard({ product, onSelectForCompare, isSelectedForCompare = false }: ProductCardProps) {
  const navigate = useNavigate()
  const [isHovered, setIsHovered] = useState(false)
  const [isBookmarked, setIsBookmarked] = useState(false)
  
  const mainImage = product.images?.[0] || 'https://images.unsplash.com/photo-1596484552834-6a58f850d0d7?auto=format&fit=crop&w=800&q=80'
  const supplierName = typeof product.supplierId === 'object' ? product.supplierId.fullName : 'Alexandria Textiles Ltd'
  const supplierLocation = typeof product.supplierId === 'object' && (product.supplierId as any).address?.country 
    ? `${(product.supplierId as any).address.city || 'Alexandria'}, ${(product.supplierId as any).address.country}` 
    : 'Egypt EG'
  
  const aiMatchScore = product.aiScore || 96
  const rating = 4.8
  const ratingCount = 212

  const isTopTier = aiMatchScore >= 90

  return (
    <motion.div
      {...presets.staggeredItem}
      {...presets.cardHover}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`bg-white rounded-[24px] border ${isSelectedForCompare ? 'border-[#2563EB] ring-2 ring-[#2563EB]/20 shadow-md' : 'border-[#E2E8F0] shadow-sm hover:shadow-xl'} transition-all duration-300 p-5 flex flex-col gap-4 relative overflow-hidden group/card`}
    >
      {/* Top Row: Thumbnail + Specs + AI Match Score */}
      <div 
        className="flex gap-4 items-start cursor-pointer group"
        onClick={() => navigate(`/products/${product._id}`)}
      >
        
        {/* Product Image Thumbnail with TOP TIER badge */}
        <div className="w-[120px] h-[120px] sm:w-[130px] sm:h-[130px] rounded-[18px] overflow-hidden bg-[#F8FAFC] border border-[#E2E8F0] relative flex-shrink-0">
          <img 
            src={mainImage} 
            alt={product.title} 
            className="w-full h-full object-cover transition-transform duration-700 group-hover/card:scale-110" 
          />
          {isTopTier && (
            <div className="absolute top-2 left-2 bg-[#FEF08A] text-[#854D0E] font-black text-[9px] tracking-wider uppercase px-2 py-0.5 rounded-full flex items-center gap-1 shadow-sm border border-[#FDE047]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#CA8A04]" /> TOP TIER
            </div>
          )}
        </div>

        {/* Content Body */}
        <div className="flex-1 min-w-0 flex flex-col justify-between h-full">
          
          {/* Top badges & Title */}
          <div>
            <div className="flex items-center gap-2 mb-1.5 flex-wrap">
              <span className="bg-[#DCFCE7] text-[#15803D] font-extrabold text-[10px] px-2 py-0.5 rounded-md flex items-center gap-1">
                <ShieldCheck className="w-3 h-3" /> VERIFIED
              </span>
              <div className="flex items-center gap-1 text-[11px] font-bold text-[#F59E0B]">
                <Star className="w-3.5 h-3.5 fill-[#F59E0B]" />
                <span>{rating}</span>
                <span className="text-[#94A3B8] font-medium">({ratingCount})</span>
              </div>
            </div>

            <h3 
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/products/${product._id}`);
              }}
              className="text-[18px] sm:text-[20px] font-display font-extrabold text-[#0A2540] leading-tight group-hover:text-[#2563EB] transition-colors cursor-pointer truncate"
            >
              {product.title}
            </h3>

            <p className="text-[12px] font-medium text-[#64748B] flex items-center gap-1 mt-1 truncate">
              <MapPin className="w-3.5 h-3.5 text-[#94A3B8] flex-shrink-0" />
              <span>{supplierName}</span>
              <span className="text-[#CBD5E1]">•</span>
              <span>{supplierLocation}</span>
            </p>
          </div>

          {/* 4 Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4 pt-3 border-t border-[#F1F5F9]">
            <div>
              <span className="block text-[9px] font-black text-[#94A3B8] uppercase tracking-wider">MOQ</span>
              <span className="block text-[13px] font-bold text-[#0A2540]">{product.moq?.value || 500} {product.moq?.unit || 'meters'}</span>
            </div>
            <div>
              <span className="block text-[9px] font-black text-[#94A3B8] uppercase tracking-wider">LEAD TIME</span>
              <span className="block text-[13px] font-bold text-[#0A2540]">{product.leadTime || '14-18 Days'}</span>
            </div>
            <div>
              <span className="block text-[9px] font-black text-[#94A3B8] uppercase tracking-wider">MONTHLY CAPACITY</span>
              <span className="block text-[13px] font-bold text-[#0A2540]">50,000m</span>
            </div>
            <div>
              <span className="block text-[9px] font-black text-[#94A3B8] uppercase tracking-wider">EST. PRICE</span>
              <span className="block text-[14px] font-display font-extrabold text-[#2563EB]">
                ${product.priceRange?.min || '4.20'} - ${product.priceRange?.max || '5.10'} <span className="text-[10px] font-medium text-[#64748B]">/ m</span>
              </span>
            </div>
          </div>

        </div>

        {/* Circular Match Badge on top right */}
        <div className="flex flex-col items-center flex-shrink-0">
          <div className="w-12 h-12 rounded-full border-2 border-[#2563EB] bg-[#EFF6FF] flex flex-col items-center justify-center shadow-sm group-hover/card:shadow-[0_0_15px_rgba(37,99,235,0.4)] transition-shadow duration-300">
            <span className="text-[14px] font-black text-[#2563EB] leading-none">{aiMatchScore}</span>
            <span className="text-[7px] font-black text-[#2563EB] tracking-wider uppercase">MATCH</span>
          </div>
        </div>

      </div>

      {/* AI Highlight Banner (Soft Light Blue Box) */}
      <div className="bg-[#EFF6FF] border border-[#DBEAFE] rounded-[16px] p-3.5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-start gap-2.5">
          <Sparkles className="w-4 h-4 text-[#2563EB] flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-[12px] font-semibold text-[#1E3A8A]">
              Ideal for Premium Shirting, Low Procurement Risk, Excellent Export History.
            </p>
            <div className="flex items-center gap-3 mt-1.5 flex-wrap">
              <span className="text-[10px] font-bold text-[#166534] bg-[#DCFCE7] px-2 py-0.5 rounded-full flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3 text-[#16A34A]" /> OEKO-TEX STANDARD 100
              </span>
              <span className="text-[10px] font-bold text-[#166534] bg-[#DCFCE7] px-2 py-0.5 rounded-full flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3 text-[#16A34A]" /> GOTS CERTIFIED
              </span>
            </div>
          </div>
        </div>

        <Button 
          variant="outline"
          onClick={() => navigate(`/products/${product._id}`)}
          className="bg-[#DBEAFE] hover:bg-[#BFDBFE] border-none text-[#1E40AF] text-[11px] font-bold h-8 px-3.5 rounded-xl whitespace-nowrap self-end sm:self-auto shadow-none"
        >
          View AI Report
        </Button>
      </div>

      {/* Card Action Bar */}
      <div className="flex items-center gap-2 pt-1 flex-wrap sm:flex-nowrap">
        <Button 
          onClick={() => navigate(`/dashboard/procurement`)}
          className="bg-[#0A2540] hover:bg-[#1E293B] text-white font-bold text-[12px] h-10 px-5 rounded-xl shadow-sm flex-1 sm:flex-none"
        >
          <FileText className="w-4 h-4 mr-1.5" /> Request RFQ
        </Button>

        <Button 
          variant="outline"
          onClick={(e) => {
            e.preventDefault()
            if (onSelectForCompare) onSelectForCompare(product, !isSelectedForCompare)
          }} 
          className={`font-bold text-[12px] h-10 px-4 rounded-xl border transition-all ${
            isSelectedForCompare 
              ? 'bg-[#2563EB] text-white border-[#2563EB]' 
              : 'border-[#E2E8F0] bg-white text-[#0A2540] hover:bg-[#F8FAFC]'
          }`}
        >
          {isSelectedForCompare ? 'Compared ✓' : '+ Compare'}
        </Button>

        <Button 
          variant="outline"
          onClick={() => navigate(`/products/${product._id}`)}
          className="border-[#2563EB]/40 bg-[#EFF6FF]/60 text-[#2563EB] hover:bg-[#2563EB] hover:text-white font-bold text-[12px] h-10 px-4 rounded-xl transition-all"
        >
          <FileText className="w-3.5 h-3.5 mr-1.5" /> Generate AI Quote
        </Button>

        <button 
          onClick={() => setIsBookmarked(!isBookmarked)}
          className={`w-10 h-10 rounded-xl border flex items-center justify-center ml-auto transition-colors ${
            isBookmarked ? 'bg-[#FEF3C7] border-[#FDE047] text-[#D97706]' : 'border-[#E2E8F0] text-[#64748B] hover:text-[#0A2540] bg-white'
          }`}
          title="Save Supplier"
        >
          <Bookmark className="w-4 h-4 fill-current" />
        </button>
      </div>
    </motion.div>
  )
}
