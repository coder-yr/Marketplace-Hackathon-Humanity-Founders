import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { Container } from '@/shared/components/layout/container'
import { Badge } from '@/shared/components/ui/badge'
import { Button } from '@/shared/components/ui/button'
import { Modal } from '@/shared/components/feedback/modal'
import { Skeleton } from '@/shared/components/feedback/skeleton'
import { ProductGallery } from '../components/ProductGallery'
import { ProductCard } from '../components/ProductCard'
import { productsApi } from '../api/products.api'
import { Product, SupplierProfileSummary } from '../types/products.types'
import { AiQuoteGenerator } from '@/features/ai/components/AiQuoteGenerator'
import {
  ShieldCheck, Clock, Layers, Bookmark, Building2, MapPin, Award, 
  ChevronRight, Sparkles, Star, Shuffle, Download, Factory, AlertCircle, FileText, Box
} from 'lucide-react'
import { toast } from 'sonner'
import { motion } from 'framer-motion'

export function ProductDetailPage() {
  const { idOrSlug } = useParams<{ idOrSlug: string }>()
  const navigate = useNavigate()
  const [product, setProduct] = useState<Product | null>(null)
  const [supplierProfile, setSupplierProfile] = useState<SupplierProfileSummary | null>(null)
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const [isBookmarked, setIsBookmarked] = useState(false)
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false)
  const [isContactModalOpen, setIsContactModalOpen] = useState(false)

  useEffect(() => {
    if (!idOrSlug) return
    setIsLoading(true)

    productsApi
      .getProductBySlugOrId(idOrSlug)
      .then((res) => {
        if (res.data) {
          setProduct(res.data.product)
          setSupplierProfile(res.data.supplierProfile || null)
          setRelatedProducts(res.data.relatedProducts || [])
        }
        setIsLoading(false)
      })
      .catch((err) => {
        console.error('Failed to load product details', err)
        setIsLoading(false)
      })
  }, [idOrSlug])

  const handleToggleBookmark = () => {
    setIsBookmarked(!isBookmarked)
    toast.success(isBookmarked ? 'Removed from saved materials' : 'Saved to Procurement List')
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#F7F8FA] py-12">
        <Container className="max-w-[1400px]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-5"><Skeleton className="aspect-[4/3] w-full rounded-2xl" /></div>
            <div className="lg:col-span-4 flex flex-col gap-4">
              <Skeleton className="h-8 w-3/4" />
              <Skeleton className="h-6 w-1/2" />
              <Skeleton className="h-24 w-full rounded-xl" />
            </div>
            <div className="lg:col-span-3"><Skeleton className="h-64 w-full rounded-2xl" /></div>
          </div>
        </Container>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-[#F7F8FA] py-16 text-center flex items-center justify-center">
        <div className="max-w-md w-full bg-white p-12 rounded-3xl border border-[#E2E8F0] shadow-xl">
          <AlertCircle className="w-12 h-12 text-[#94A3B8] mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-[#0A2540] mb-3">Material Unavailable</h2>
          <p className="text-[#64748B] text-sm mb-8 leading-relaxed">
            This material listing has been archived or removed by the supplier.
          </p>
          <Button size="lg" className="w-full bg-[#0A2540]" onClick={() => navigate('/marketplace')}>
            Return to Marketplace
          </Button>
        </div>
      </div>
    )
  }

  const supplierName =
    supplierProfile?.companyName ||
    (typeof product.supplierId === 'object' ? product.supplierId.fullName : 'Enterprise Supplier')

  return (
    <div className="min-h-screen bg-[#F7F8FA] pb-24 font-sans">
      {/* ── BREADCRUMBS ────────────────────────────────────────────── */}
      <div className="border-b border-[#E2E8F0] bg-white sticky top-[72px] z-30 shadow-sm">
        <Container className="max-w-[1400px] py-4">
          <div className="flex items-center gap-2 text-xs font-bold text-[#64748B]">
            <Link to="/" className="hover:text-[#0066FF] transition-colors uppercase tracking-wider">Home</Link>
            <ChevronRight className="w-3 h-3 text-[#CBD5E1]" />
            <Link to="/marketplace" className="hover:text-[#0066FF] transition-colors uppercase tracking-wider">Marketplace</Link>
            <ChevronRight className="w-3 h-3 text-[#CBD5E1]" />
            <span className="text-[#0A2540] truncate uppercase tracking-wider">{product.fabricType}</span>
          </div>
        </Container>
      </div>

      <Container className="max-w-[1400px] pt-8">
        {/* ── MAIN 3-COLUMN LAYOUT (ALIBABA / MATERIAL BANK STYLE) ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* COLUMN 1: GALLERY (40%) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <motion.div 
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
              className="sticky top-[140px]"
            >
              <div className="bg-white p-2 rounded-[24px] shadow-sm border border-[#E2E8F0]">
                <ProductGallery images={product.images} title={product.title} />
              </div>
            </motion.div>
          </div>

          {/* COLUMN 2: PRODUCT INFORMATION (35%) */}
          <div className="lg:col-span-4 flex flex-col gap-8">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.1 }}>
              <div className="flex items-center gap-2 mb-4">
                <Badge className="bg-[#F1F5F9] text-[#0A2540] border-transparent px-3 py-1 font-bold text-[11px] tracking-widest uppercase">
                  {product.fabricType}
                </Badge>
                {product.featured && (
                  <Badge className="bg-[#0066FF]/10 text-[#0066FF] border-transparent px-3 py-1 font-bold text-[11px] tracking-widest uppercase flex items-center gap-1">
                    <Sparkles className="w-3 h-3"/> Featured
                  </Badge>
                )}
              </div>

              <h1 className="text-[32px] sm:text-[40px] font-display font-bold text-[#0A2540] leading-[1.15] mb-4 tracking-tight">
                {product.title}
              </h1>

              <div className="flex items-center gap-3 mb-6 bg-white p-3 rounded-[12px] border border-[#E2E8F0] shadow-sm w-fit">
                <div className="text-[13px] font-bold text-[#0A2540] flex items-center gap-1.5">
                  <Building2 className="w-4 h-4 text-[#64748B]" /> {supplierName}
                </div>
                <div className="w-[1px] h-4 bg-[#E2E8F0]" />
                <div className="text-[12px] font-bold text-emerald-600 flex items-center gap-1">
                  <ShieldCheck className="w-4 h-4" /> Verified
                </div>
                <div className="w-[1px] h-4 bg-[#E2E8F0]" />
                <div className="text-[12px] font-bold text-[#0A2540] flex items-center gap-1">
                  <Star className="w-4 h-4 text-amber-400 fill-amber-400" /> 4.9
                </div>
              </div>

              <p className="text-[#64748B] text-[15px] leading-relaxed mb-6 font-medium">
                {product.description || product.shortDescription}
              </p>

              {/* Composition Block */}
              <div className="bg-[#0A2540] text-white p-5 rounded-[16px] shadow-lg mb-8">
                <div className="flex items-center gap-2 mb-2">
                  <Layers className="w-5 h-5 text-[#0066FF]" />
                  <h4 className="font-bold text-[14px] uppercase tracking-widest">Composition</h4>
                </div>
                <p className="text-[18px] font-medium">{product.specifications?.Composition || '100% Cotton'}</p>
              </div>
            </motion.div>

            {/* Technical Specifications */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.2 }}>
              <h3 className="text-[20px] font-bold text-[#0A2540] mb-5 flex items-center gap-2">
                <FileText className="w-5 h-5 text-[#0066FF]" /> Technical Specifications
              </h3>
              <div className="bg-white rounded-[20px] border border-[#E2E8F0] overflow-hidden shadow-sm">
                {product.specifications && Object.keys(product.specifications).length > 0 ? (
                  <div className="divide-y divide-[#E2E8F0]">
                    {Object.entries(product.specifications).map(([key, val]) => (
                      <div key={key} className="flex items-center p-4 hover:bg-[#F8FAFC] transition-colors">
                        <span className="w-1/3 text-[12px] text-[#64748B] font-bold uppercase tracking-wider">{key}</span>
                        <span className="w-2/3 text-[14px] font-medium text-[#0A2540]">{val}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="p-6 text-sm text-[#64748B] font-medium">Standard industry specifications apply.</p>
                )}
              </div>
            </motion.div>

            {/* Certifications */}
            {product.certifications && product.certifications.length > 0 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.3 }} className="mt-4">
                <h3 className="text-[14px] font-bold text-[#0A2540] mb-3 uppercase tracking-wider">Certifications</h3>
                <div className="flex flex-wrap gap-2">
                  {product.certifications.map((cert, idx) => (
                    <span key={idx} className="flex items-center gap-1.5 bg-[#F1F5F9] border border-[#E2E8F0] px-3 py-1.5 rounded-[8px] text-[12px] font-bold text-[#0A2540]">
                      <Award className="w-3.5 h-3.5 text-emerald-600" /> {cert}
                    </span>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Supplier Trust Profile Section */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.4 }} className="mt-4">
              <h3 className="text-[20px] font-bold text-[#0A2540] mb-5 flex items-center gap-2">
                <Factory className="w-5 h-5 text-[#0066FF]" /> Supplier Information
              </h3>
              <div className="bg-white p-6 rounded-[20px] border border-[#E2E8F0] shadow-sm">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-14 h-14 rounded-[12px] bg-[#0A2540] text-white font-bold flex items-center justify-center text-[24px] shadow-lg">
                    {supplierName.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold text-[#0A2540] text-[16px] flex items-center gap-1.5 mb-1">
                      {supplierName} <ShieldCheck className="w-4 h-4 text-emerald-500" />
                    </h4>
                    <span className="text-[13px] font-medium text-[#64748B]">Enterprise Manufacturer • 12 Years in Business</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-[13px] font-medium text-[#0A2540]">
                  <div className="flex items-center gap-2 bg-[#F8FAFC] p-3 rounded-[10px] border border-[#E2E8F0]">
                    <MapPin className="w-4 h-4 text-[#64748B]" /> {supplierProfile?.factoryAddress || 'Global'}
                  </div>
                  <div className="flex items-center gap-2 bg-[#F8FAFC] p-3 rounded-[10px] border border-[#E2E8F0]">
                    <Clock className="w-4 h-4 text-[#64748B]" /> 98% Response Rate
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* COLUMN 3: STICKY PROCUREMENT PANEL (25%) */}
          <div className="lg:col-span-3">
            <motion.div 
              initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.1 }}
              className="sticky top-[140px]"
            >
              <div className="bg-white rounded-[24px] border border-[#E2E8F0] p-6 shadow-xl shadow-black/5 flex flex-col">
                
                {/* Price block */}
                <div className="mb-6 pb-6 border-b border-[#E2E8F0]">
                  <span className="text-[11px] font-bold uppercase tracking-widest text-[#94A3B8] block mb-2">Wholesale Price Range</span>
                  <div className="flex items-baseline gap-1 text-[#0A2540] font-display font-bold text-[32px] tracking-tight">
                    <span className="text-[20px] text-[#64748B]">$</span>
                    <span>{product.priceRange.min}</span>
                    <span className="text-[20px] text-[#64748B] mx-1">-</span>
                    <span>{product.priceRange.max}</span>
                  </div>
                  <div className="text-[13px] font-bold text-[#64748B] mt-1 uppercase tracking-wider">per {product.priceRange.unit}</div>
                </div>

                {/* Availability / Logistics block */}
                <div className="space-y-3 mb-8">
                  <div className="flex justify-between items-center bg-[#F8FAFC] p-3.5 rounded-[12px] border border-[#E2E8F0]">
                    <div className="flex items-center gap-2 text-[12px] font-bold uppercase tracking-wider text-[#64748B]">
                      <Layers className="w-4 h-4 text-[#0066FF]" /> MOQ
                    </div>
                    <span className="font-bold text-[14px] text-[#0A2540]">{product.moq.value} {product.moq.unit}</span>
                  </div>
                  
                  <div className="flex justify-between items-center bg-[#F8FAFC] p-3.5 rounded-[12px] border border-[#E2E8F0]">
                    <div className="flex items-center gap-2 text-[12px] font-bold uppercase tracking-wider text-[#64748B]">
                      <Clock className="w-4 h-4 text-[#0066FF]" /> Lead Time
                    </div>
                    <span className="font-bold text-[14px] text-[#0A2540]">{product.leadTime}</span>
                  </div>

                  <div className="flex justify-between items-center bg-[#F8FAFC] p-3.5 rounded-[12px] border border-[#E2E8F0]">
                    <div className="flex items-center gap-2 text-[12px] font-bold uppercase tracking-wider text-[#64748B]">
                      <Box className="w-4 h-4 text-emerald-600" /> Availability
                    </div>
                    <span className="font-bold text-[14px] text-emerald-600">{product.stockStatus === 'in_stock' ? 'In Stock' : 'Made to Order'}</span>
                  </div>
                </div>

                {/* Primary Actions Stack */}
                <div className="flex flex-col gap-3 mb-6">
                  <Button
                    size="lg"
                    className="w-full h-14 bg-[#0A2540] hover:bg-[#1E293B] text-white text-[15px] shadow-lg shadow-[#0A2540]/20 font-bold transition-transform hover:-translate-y-0.5 rounded-[12px]"
                    onClick={() => setIsQuoteModalOpen(true)}
                  >
                    Request RFQ <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>

                  <AiQuoteGenerator productId={product._id} />

                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full h-12 bg-white border-[#E2E8F0] hover:bg-[#F8FAFC] text-[#0A2540] font-bold rounded-[12px]"
                    onClick={() => setIsContactModalOpen(true)}
                  >
                    Contact Supplier
                  </Button>
                </div>

                {/* Secondary Actions */}
                <div className="flex flex-col gap-1 pt-4 border-t border-[#E2E8F0]">
                  <Button
                    variant="ghost"
                    className="justify-start gap-3 h-10 px-4 font-bold text-[13px] text-[#0A2540] hover:bg-[#F1F5F9] rounded-[8px]"
                    onClick={handleToggleBookmark}
                  >
                    <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current text-[#0066FF]' : 'text-[#64748B]'}`} />
                    Save Material
                  </Button>
                  
                  <Button
                    variant="ghost"
                    className="justify-start gap-3 h-10 px-4 font-bold text-[13px] text-[#0A2540] hover:bg-[#F1F5F9] rounded-[8px]"
                  >
                    <Shuffle className="w-4 h-4 text-[#64748B]" />
                    Compare Specs
                  </Button>

                  <Button
                    variant="ghost"
                    disabled
                    className="justify-start gap-3 h-10 px-4 font-bold text-[13px] text-[#94A3B8] hover:bg-transparent rounded-[8px] opacity-70"
                  >
                    <Download className="w-4 h-4" />
                    Download Datasheet <span className="text-[10px] ml-auto uppercase bg-[#F1F5F9] px-2 py-0.5 rounded-full">Soon</span>
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* ── RELATED MATERIALS ───────────────────────────────────────── */}
        {relatedProducts.length > 0 && (
          <div className="mt-32 pt-16 border-t border-[#E2E8F0]">
            <h2 className="text-[28px] font-display font-bold text-[#0A2540] mb-8">Related Materials</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((rel) => (
                <ProductCard key={rel._id} product={rel} />
              ))}
            </div>
          </div>
        )}
      </Container>

      {/* MODALS */}
      <Modal
        isOpen={isQuoteModalOpen}
        onClose={() => setIsQuoteModalOpen(false)}
        title={`Request RFQ — ${product.title}`}
      >
        <div className="flex flex-col gap-4 text-sm font-medium">
          <p className="text-[#64748B]">
            Send an instant Request for Quotation (RFQ) directly to <strong>{supplierName}</strong>.
          </p>
          <div className="bg-[#F8FAFC] p-4 rounded-[16px] flex flex-col gap-3 text-[13px] border border-[#E2E8F0] text-[#0A2540]">
            <p><strong>Material:</strong> {product.title}</p>
            <p><strong>Standard MOQ:</strong> {product.moq.value} {product.moq.unit}</p>
            <p><strong>Target Price Range:</strong> ${product.priceRange.min} - ${product.priceRange.max} / {product.priceRange.unit}</p>
          </div>
          <div className="pt-4 flex justify-end gap-3">
            <Button variant="outline" className="border-[#E2E8F0] text-[#0A2540]" onClick={() => setIsQuoteModalOpen(false)}>Cancel</Button>
            <Button className="bg-[#0A2540] text-white" onClick={() => { setIsQuoteModalOpen(false); toast.success('RFQ Quote request sent to supplier!') }}>Submit RFQ</Button>
          </div>
        </div>
      </Modal>

      <Modal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
        title={`Contact Supplier — ${supplierName}`}
      >
        <div className="flex flex-col gap-4 text-sm font-medium">
          <p className="text-[#64748B]">
            Inquire about custom dyeing, weaving samples, or factory tour availability.
          </p>
          <textarea
            className="w-full h-32 p-4 rounded-[16px] border border-[#E2E8F0] bg-[#F8FAFC] text-[#0A2540] focus:ring-2 focus:ring-[#0066FF] outline-none transition-all resize-none"
            placeholder="Type your inquiry message here..."
          />
          <div className="pt-4 flex justify-end gap-3">
            <Button variant="outline" className="border-[#E2E8F0] text-[#0A2540]" onClick={() => setIsContactModalOpen(false)}>Cancel</Button>
            <Button className="bg-[#0A2540] text-white" onClick={() => { setIsContactModalOpen(false); toast.success('Inquiry sent! The supplier will respond via email.') }}>Send Message</Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
