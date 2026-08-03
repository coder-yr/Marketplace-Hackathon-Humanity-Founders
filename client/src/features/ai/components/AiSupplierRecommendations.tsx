import { useState, useEffect } from 'react'
import { Sparkles, ArrowRight, ShieldCheck, CheckCircle2, AlertTriangle, AlertCircle } from 'lucide-react'
import { recommendProducts } from '../api/ai.api'
import { AiRecommendation } from '../types/ai.types'
import { productsApi } from '@/features/products/api/products.api'
import { Product } from '@/features/products/types/products.types'
import { Link } from 'react-router-dom'

export function AiSupplierRecommendations() {
  const [recommendations, setRecommendations] = useState<AiRecommendation[]>([])
  const [products, setProducts] = useState<Record<string, Product>>({})
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchRecs = async () => {
      try {
        const { recommendations } = await recommendProducts()
        if (recommendations && recommendations.length > 0) {
          setRecommendations(recommendations)
          
          // Fetch product details for these recommendations
          const productPromises = recommendations.map(r => productsApi.getProductBySlugOrId(r.productId))
          const results = await Promise.all(productPromises)
          
          const productMap: Record<string, Product> = {}
          results.forEach((res, index) => {
            if (res.data?.product) {
              productMap[recommendations[index].productId] = res.data.product
            }
          })
          setProducts(productMap)
        }
      } catch (error) {
        console.error('Failed to load AI recommendations', error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchRecs()
  }, [])

  const getConfidenceBadge = (confidence: 'High' | 'Medium' | 'Low') => {
    switch (confidence) {
      case 'High':
        return (
          <span className="flex items-center gap-1 text-xs font-bold text-success bg-success/10 px-2 py-1 rounded-md">
            <CheckCircle2 className="w-3 h-3" /> High Match
          </span>
        )
      case 'Medium':
        return (
          <span className="flex items-center gap-1 text-xs font-bold text-warning bg-warning/10 px-2 py-1 rounded-md">
            <AlertTriangle className="w-3 h-3" /> Medium Match
          </span>
        )
      case 'Low':
        return (
          <span className="flex items-center gap-1 text-xs font-bold text-text-tertiary bg-surface-2 px-2 py-1 rounded-md">
            <AlertCircle className="w-3 h-3" /> Low Match
          </span>
        )
      default:
        return null
    }
  }

  if (isLoading) {
    return (
      <div className="bg-surface-1 border border-border-color rounded-2xl p-6 mb-8 animate-pulse">
        <div className="h-6 w-1/3 bg-surface-2 rounded-lg mb-6"></div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-32 bg-surface-2 rounded-xl"></div>
          ))}
        </div>
      </div>
    )
  }

  if (recommendations.length === 0) return null

  return (
    <div className="bg-surface-1 border border-brand-primary/20 rounded-2xl p-6 mb-8 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
        <Sparkles className="w-32 h-32 text-brand-primary" />
      </div>

      <div className="flex items-center gap-2 mb-2 relative z-10">
        <Sparkles className="w-5 h-5 text-brand-primary" />
        <h2 className="text-xl font-bold text-text-primary">AI Sourcing Recommendations</h2>
      </div>
      <p className="text-sm text-text-secondary mb-6 relative z-10">
        Based on your buyer profile and recent marketplace activity, our AI suggests these suppliers.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 relative z-10">
        {recommendations.map((rec, idx) => {
          const product = products[rec.productId]
          if (!product) return null

          const supplierName = typeof product.supplierId === 'object' ? product.supplierId.fullName : 'Verified Supplier'

          return (
            <div key={idx} className="bg-surface-50 border border-border-color rounded-xl p-4 flex flex-col hover:border-brand-primary/40 transition-colors">
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-brand-primary/10 text-brand-primary flex items-center justify-center font-bold text-sm">
                    {supplierName.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold text-text-primary text-sm flex items-center gap-1">
                      {supplierName}
                      <ShieldCheck className="w-3 h-3 text-brand-primary" />
                    </h4>
                    <p className="text-[10px] text-text-secondary truncate w-32">{product.title}</p>
                  </div>
                </div>
                {getConfidenceBadge(rec.confidence)}
              </div>
              
              <p className="text-xs text-text-secondary leading-relaxed mb-4 flex-1">
                "{rec.reason}"
              </p>
              
              <Link 
                to={`/marketplace/${product._id}`}
                className="text-brand-primary text-xs font-bold flex items-center gap-1 hover:gap-2 transition-all mt-auto"
              >
                View Product <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          )
        })}
      </div>
    </div>
  )
}
