import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Product } from '../types/products.types'
import { ShieldCheck, MapPin, Star, Layers, Clock, DollarSign, FileText, Bookmark, Scale, Sparkles, Box, ArrowRight } from 'lucide-react'
import { Button } from '@/shared/components/ui/button'

interface ProductCardProps {
  product: Product
  onSelectForCompare?: (product: Product, isSelected: boolean) => void
  isSelectedForCompare?: boolean
}

export function ProductCard({ product, onSelectForCompare, isSelectedForCompare = false }: ProductCardProps) {
  const navigate = useNavigate()
  const mainImage = product.images?.[0] || 'https://images.unsplash.com/photo-1596484552834-6a58f850d0d7?auto=format&fit=crop&w=800&q=80'
  const supplierName = typeof product.supplierId === 'object' ? product.supplierId.fullName : 'Verified Supplier'
  
  // Mock data for missing fields
  const rating = '4.9'

  return (
    <div 
      onClick={() => navigate(`/products/${product._id}`)}
      className="bg-white rounded-[24px] border border-[var(--border)] overflow-hidden shadow-sm hover:shadow-[0_20px_40px_rgb(0,0,0,0.06)] hover:-translate-y-1 transition-all duration-[120ms] ease-out flex flex-col group cursor-pointer h-full relative"
    >
      {/* Image Gallery Area */}
      <div className="h-[240px] bg-[#F7F8FA] relative overflow-hidden">
        {mainImage ? (
          <img src={mainImage} alt={product.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-[#CBD5E1]"><Box className="w-12 h-12" /></div>
        )}
        
        {/* Floating Badges */}
        <div className="absolute top-4 left-4 right-4 flex justify-between items-start z-10">
          <div className="bg-white/95 backdrop-blur-md px-2.5 py-1.5 rounded-[8px] text-[10px] font-bold text-[var(--heading)] shadow-sm flex items-center gap-1.5 border border-[var(--border)]">
            <ShieldCheck className="w-3.5 h-3.5 text-[var(--success)]" /> Verified Mill
          </div>
          <div className="flex gap-2">
            {onSelectForCompare && (
              <label 
                onClick={(e) => e.stopPropagation()} 
                className="cursor-pointer group/cb flex items-center gap-1.5 bg-white/95 backdrop-blur-md px-2.5 py-1.5 rounded-[8px] border border-[var(--border)] shadow-sm hover:bg-[#F8FAFC] transition-colors"
              >
                <input 
                  type="checkbox" 
                  checked={isSelectedForCompare}
                  onChange={(e) => {
                    e.stopPropagation()
                    onSelectForCompare(product, e.target.checked)
                  }}
                  className="w-3.5 h-3.5 rounded border-[var(--border)] text-[var(--primary)] focus:ring-[var(--focus-ring-color)] cursor-pointer"
                />
                <span className="text-[10px] font-bold text-[var(--heading)] uppercase tracking-wide">Compare</span>
              </label>
            )}
            <button 
              onClick={(e) => e.stopPropagation()} 
              className="w-8 h-8 bg-white/95 backdrop-blur-md rounded-[8px] shadow-sm border border-[var(--border)] flex items-center justify-center text-[var(--body)] hover:text-[var(--primary)] transition-colors"
            >
              <Bookmark className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
      
      {/* Content Area */}
      <div className="p-5 flex-1 flex flex-col">
        <div className="flex items-center justify-between mb-2.5">
          <p className="text-[11px] font-bold text-[var(--body)] tracking-widest uppercase bg-[#F1F5F9] px-2 py-0.5 rounded-[4px]">
            {product.fabricType}
          </p>
          <div className="flex items-center gap-1 text-[12px] font-bold text-[var(--heading)]">
            <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" /> {rating}
          </div>
        </div>

        <h3 className="text-[18px] font-bold text-[var(--heading)] mb-5 line-clamp-2 leading-snug group-hover:text-[var(--primary)] transition-colors">
          {product.title}
        </h3>
        
        {/* Dense B2B Data Grid */}
        <div className="grid grid-cols-2 gap-y-4 gap-x-3 mb-5 flex-1 p-3 bg-[#F8FAFC] rounded-[12px] border border-[var(--border)]/50">
          <div>
            <p className="text-[10px] uppercase font-bold tracking-widest text-[#94A3B8] mb-1 flex items-center gap-1"><MapPin className="w-3 h-3"/> Location</p>
            <p className="text-[13px] font-bold text-[var(--heading)] truncate">
              {supplierName}
            </p>
          </div>
          <div>
            <p className="text-[10px] uppercase font-bold tracking-widest text-[#94A3B8] mb-1 flex items-center gap-1"><Layers className="w-3 h-3"/> MOQ</p>
            <p className="text-[13px] font-bold text-[var(--heading)]">{product.moq?.value || 100} {product.moq?.unit || 'm'}</p>
          </div>
          <div className="col-span-2 pt-2 border-t border-[var(--border)]">
            <p className="text-[10px] uppercase font-bold tracking-widest text-[#94A3B8] mb-1">Wholesale Price</p>
            <p className="text-[16px] font-display font-bold text-[var(--primary)]">
              ${product.priceRange?.min || '0'} - ${product.priceRange?.max || '0'} <span className="text-[12px] text-[var(--body)] font-medium">/{product.priceRange?.unit || 'm'}</span>
            </p>
          </div>
        </div>
        
        {/* Bottom Action */}
        <Button onClick={(e) => { e.stopPropagation(); navigate(`/products/${product._id}`); }} className="w-full bg-[var(--heading)] hover:bg-[var(--primary)] text-white h-12 rounded-[12px] text-[14px] font-bold shadow-none transition-colors group/btn">
          Request RFQ <ArrowRight className="w-4 h-4 ml-2 opacity-70 group-hover/btn:opacity-100 group-hover/btn:translate-x-1 transition-all" />
        </Button>
      </div>
    </div>
  )
}
