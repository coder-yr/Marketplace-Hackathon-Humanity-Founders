import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Product } from '../types/products.types'
import { transitionCard, transitionHover } from '@/shared/animations'
import { ShieldCheck, MapPin, Star, Layers, Clock, DollarSign, FileText, Bookmark, Scale, Sparkles } from 'lucide-react'
import { Badge } from '@/shared/components/ui/badge'

interface ProductCardProps {
  product: Product
  onSelectForCompare?: (product: Product, isSelected: boolean) => void
  isSelectedForCompare?: boolean
}

export function ProductCard({ product, onSelectForCompare, isSelectedForCompare = false }: ProductCardProps) {
  const mainImage = product.images?.[0] || 'https://images.unsplash.com/photo-1596484552834-6a58f850d0d7?auto=format&fit=crop&w=800&q=80'
  const supplierName = typeof product.supplierId === 'object' ? product.supplierId.fullName : 'Verified Supplier'
  
  // Mock data for missing fields
  const country = 'India'
  const rating = '4.9'
  const composition = product.specifications?.Composition || '100% Cotton'

  return (
    <motion.div
      whileHover={{ y: -4, transition: transitionCard }}
      className="group flex flex-col bg-[var(--surface-0)] border border-[var(--border-color)] rounded-xl overflow-hidden hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-shadow"
    >
      {/* 1. Image Area */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-surface-2 border-b border-border-color">
        <motion.img
          whileHover={{ scale: 1.05 }}
          transition={transitionHover}
          src={mainImage}
          alt={product.title}
          className="h-full w-full object-cover object-center"
          loading="lazy"
        />
        {/* Compare Checkbox Overlay */}
        {onSelectForCompare && (
          <div className="absolute top-2 right-2 z-10">
            <label className="cursor-pointer group/cb flex items-center gap-1.5 bg-[var(--surface-0)]/95 backdrop-blur-md px-2 py-1.5 rounded-lg border border-[var(--border-color)] shadow-sm hover:bg-[var(--surface-1)] transition-colors">
              <input 
                type="checkbox" 
                checked={isSelectedForCompare}
                onChange={(e) => onSelectForCompare(product, e.target.checked)}
                className="w-3.5 h-3.5 rounded border-border-color text-brand-primary focus:ring-brand-primary cursor-pointer"
              />
              <span className="text-[10px] font-bold text-[var(--text-secondary)] uppercase tracking-wide group-hover/cb:text-brand-primary">Compare</span>
            </label>
          </div>
        )}
        {/* Status Badge */}
        <div className="absolute top-2 left-2 flex gap-1 z-10">
          <Badge variant="default" size="sm" className="bg-[var(--surface-0)]/95 backdrop-blur-md border-[var(--border-color)] text-[var(--text-primary)] text-[10px] uppercase font-bold tracking-wider">
            {product.stockStatus === 'in_stock' ? (
              <><span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1.5" /> In Stock</>
            ) : (
              <><span className="w-1.5 h-1.5 rounded-full bg-amber-500 mr-1.5" /> Made to Order</>
            )}
          </Badge>
        </div>
      </div>

      <div className="p-4 flex flex-col flex-1 gap-4">
        
        {/* 2. Supplier & Trust */}
        <div className="flex items-center justify-between text-xs text-[var(--text-secondary)] font-medium">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span className="truncate max-w-[120px] text-[var(--text-primary)]">{supplierName}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {country}</span>
            <span className="flex items-center gap-1"><Star className="w-3 h-3 text-amber-500 fill-current" /> {rating}</span>
          </div>
        </div>

        {/* 3. Product Title & Type */}
        <div>
          <Link to={`/products/${product.slug || product._id}`} className="focus:outline-none">
            <h3 className="text-base font-semibold text-[var(--text-primary)] hover:text-brand-primary transition-colors line-clamp-1">
              {product.title}
            </h3>
          </Link>
          <div className="flex items-center gap-1.5 mt-1 text-xs text-[var(--text-secondary)]">
            <span className="font-medium">{product.fabricType}</span>
            <span className="w-1 h-1 rounded-full bg-[var(--border-color-subtle)]" />
            <span className="truncate">{composition}</span>
          </div>
        </div>

        {/* 4. Metrics Grid (MOQ | Lead | Price) */}
        <div className="bg-[var(--surface-1)] rounded-lg p-2.5 border border-[var(--border-color)] grid grid-cols-2 gap-y-2 gap-x-3 text-xs">
          <div className="flex flex-col">
            <span className="text-[10px] text-[var(--text-tertiary)] uppercase tracking-wider mb-0.5">Price</span>
            <span className="font-bold text-[var(--text-primary)] flex items-center">
              <DollarSign className="w-3 h-3 -mr-0.5" />
              {product.priceRange.min}-{product.priceRange.max} <span className="text-[var(--text-tertiary)] ml-0.5 font-normal">/{product.priceRange.unit}</span>
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] text-[var(--text-tertiary)] uppercase tracking-wider mb-0.5">MOQ</span>
            <span className="font-semibold text-[var(--text-primary)] flex items-center gap-1">
              <Layers className="w-3 h-3 text-[var(--text-tertiary)]" /> {product.moq.value} {product.moq.unit}
            </span>
          </div>
          <div className="flex flex-col col-span-2 pt-1.5 mt-1.5 border-t border-[var(--border-color-subtle)]">
            <span className="font-medium text-[var(--text-secondary)] flex items-center gap-1">
              <Clock className="w-3 h-3 text-[var(--text-tertiary)]" /> Lead Time: <span className="text-[var(--text-primary)]">{product.leadTime}</span>
            </span>
          </div>
        </div>

        {/* 5. Certifications */}
        {product.certifications && product.certifications.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {product.certifications.slice(0, 3).map((cert, idx) => (
              <span key={idx} className="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded border border-[var(--border-color-subtle)] text-[var(--text-secondary)] bg-[var(--surface-1)]">
                {cert}
              </span>
            ))}
          </div>
        )}

        {/* 6. Actions */}
        <div className="grid grid-cols-4 gap-1.5 mt-auto pt-1">
          <Link 
            to={`/products/${product.slug || product._id}`}
            className="col-span-2 flex items-center justify-center gap-1.5 bg-[var(--surface-primary)] text-white text-xs font-bold py-2 rounded-lg hover:shadow-[0_4px_10px_rgb(37,99,235,0.3)] transition-all active:scale-95"
          >
            <FileText className="w-3.5 h-3.5" /> Quote
          </Link>
          <button className="col-span-1 flex items-center justify-center bg-[var(--surface-1)] hover:bg-[var(--surface-2)] border border-[var(--border-color)] text-[var(--text-secondary)] hover:text-brand-primary rounded-lg transition-colors group/btn relative">
            <Scale className="w-3.5 h-3.5" />
          </button>
          <button className="col-span-1 flex items-center justify-center bg-[var(--surface-1)] hover:bg-[var(--surface-2)] border border-[var(--border-color)] text-[var(--text-secondary)] hover:text-brand-primary rounded-lg transition-colors">
            <Bookmark className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* AI Match Placeholder */}
        <div className="flex items-center gap-1.5 text-[10px] font-bold text-brand-primary bg-brand-primary/10 px-2 py-1.5 rounded-lg justify-center uppercase tracking-wider">
          <Sparkles className="w-3 h-3" /> 92% AI Match
        </div>
      </div>
    </motion.div>
  )
}
