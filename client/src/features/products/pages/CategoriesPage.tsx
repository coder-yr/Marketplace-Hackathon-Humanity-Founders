import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Container } from '@/shared/components/layout/container'
import { Skeleton } from '@/shared/components/feedback/skeleton'
import { productsApi } from '../api/products.api'
import { Category } from '../types/products.types'
import { ArrowRight, Layers } from 'lucide-react'
import { motion } from 'framer-motion'

export function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    productsApi
      .getCategories()
      .then((res) => {
        if (res.data) setCategories(res.data)
        setIsLoading(false)
      })
      .catch((err) => {
        console.error('Failed to load categories', err)
        setIsLoading(false)
      })
  }, [])

  return (
    <div className="min-h-screen bg-surface-50 py-12">
      <Container className="max-w-7xl">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h1 className="text-4xl font-bold text-text-primary tracking-tight mb-3">
            Explore Fabric Categories
          </h1>
          <p className="text-text-secondary text-base leading-relaxed">
            Browse our wide catalog of natural, synthetic, luxury, and technical textile categories sourced directly from verified manufacturers.
          </p>
        </div>

        {/* Categories Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="h-64 w-full rounded-2xl" />
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {categories.map((cat) => (
              <Link
                key={cat._id}
                to={`/marketplace?category=${cat.slug}`}
                className="group relative bg-surface-1 rounded-2xl border border-border-color overflow-hidden shadow-xs hover:shadow-xl hover:border-brand-primary/40 transition-all duration-300 flex flex-col h-full"
              >
                {/* Background Image Banner */}
                <div className="relative aspect-[16/9] w-full overflow-hidden bg-surface-2">
                  <img
                    src={cat.imageUrl || 'https://images.unsplash.com/photo-1606760227091-3dd850d97f1d?auto=format&fit=crop&w=800&q=80'}
                    alt={cat.name}
                    className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                  
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center">
                        <Layers className="w-4 h-4 text-white" />
                      </div>
                      <h2 className="text-xl font-bold tracking-wide">{cat.name}</h2>
                    </div>
                  </div>
                </div>

                {/* Body Content */}
                <div className="p-6 flex flex-col flex-1 justify-between gap-4">
                  <p className="text-sm text-text-secondary line-clamp-3 leading-relaxed">
                    {cat.description}
                  </p>

                  <div className="flex items-center text-xs font-semibold text-brand-primary group-hover:translate-x-1 transition-transform duration-200">
                    <span>Browse {cat.name} Fabrics</span>
                    <ArrowRight className="w-4 h-4 ml-1.5" />
                  </div>
                </div>
              </Link>
            ))}
          </motion.div>
        )}
      </Container>
    </div>
  )
}
