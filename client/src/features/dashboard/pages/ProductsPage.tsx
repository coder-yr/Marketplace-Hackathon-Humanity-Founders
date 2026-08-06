import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { productsApi } from '@/features/products/api/products.api'
import { Product } from '@/features/products/types/products.types'
import { Button } from '@/shared/components/ui/button'
import { Input } from '@/shared/components/ui/input'
import { Plus, Search, Filter, FileDown, Copy, Edit2, Archive, Trash2 } from 'lucide-react'
import { toast } from 'sonner'

export function ProductsPage() {
  const navigate = useNavigate()
  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [search, setSearch] = useState('')

  const fetchProducts = async () => {
    try {
      setIsLoading(true)
      // Pass a specific filter for the supplier's own products if backend supports it, 
      // or assume the backend filters automatically for supplier dashboards (usually via a /supplier/products route).
      // For hackathon, we fetch all and filter by current user if needed, or assume API handles it.
      const response = await productsApi.getProducts({ limit: 50 })
      setProducts(response.data)
    } catch (error) {
      toast.error('Failed to load products')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  const handleDuplicate = async (id: string) => {
    try {
      await productsApi.duplicateProduct(id)
      toast.success('Product duplicated successfully')
      fetchProducts()
    } catch (error) {
      toast.error('Failed to duplicate product')
    }
  }

  const handleArchive = async (id: string) => {
    try {
      await productsApi.archiveProduct(id)
      toast.success('Product archived')
      fetchProducts()
    } catch (error) {
      toast.error('Failed to archive product')
    }
  }

  const handleDelete = async (id: string) => {
    try {
      await productsApi.deleteProduct(id)
      toast.success('Product deleted')
      fetchProducts()
    } catch (error) {
      toast.error('Failed to delete product')
    }
  }

  const filteredProducts = products.filter(p => p.title.toLowerCase().includes(search.toLowerCase()))

  const getInventoryStatus = (product: Product) => {
    if (product.stockStatus === 'out_of_stock') return { label: 'Out of Stock', color: 'text-red-600 bg-red-50 border-red-200' }
    if (product.stockStatus === 'made_to_order') return { label: 'Made to Order', color: 'text-blue-600 bg-blue-50 border-blue-200' }
    
    // Calculate stock from variants
    const totalStock = product.variants?.reduce((acc, v) => acc + v.stock, 0) || 0
    if (totalStock === 0) return { label: 'Out of Stock', color: 'text-red-600 bg-red-50 border-red-200' }
    if (totalStock < (product.moq?.value || 0)) return { label: 'Low Stock', color: 'text-yellow-600 bg-yellow-50 border-yellow-200' }
    return { label: 'In Stock', color: 'text-green-600 bg-green-50 border-green-200' }
  }

  return (
    <div className="flex-1 bg-[#F8FAFC] p-8 overflow-y-auto">
      <div className="max-w-[1200px] mx-auto space-y-6">
        
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-[24px] font-display font-bold text-[#0A2540]">Material Catalog</h1>
            <p className="text-[14px] text-[#64748B] font-medium mt-1">Manage your materials, track analytics, and update inventory.</p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" className="border-[#E2E8F0] text-[#0A2540] font-bold" onClick={() => toast.info('Bulk import coming soon!')}>
              <FileDown className="w-4 h-4 mr-2" /> Import (CSV)
            </Button>
            <Button onClick={() => navigate('/dashboard/products/new')} className="bg-[#0066FF] text-white hover:bg-[#0052CC] font-bold">
              <Plus className="w-4 h-4 mr-2" /> Add Material
            </Button>
          </div>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-4 bg-white p-4 rounded-[12px] border border-[#E2E8F0] shadow-sm">
          <div className="relative flex-1 max-w-[400px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94A3B8]" />
            <Input 
              placeholder="Search materials by name or SKU..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 bg-[#F8FAFC] border-[#E2E8F0]"
            />
          </div>
          <Button variant="outline" className="border-[#E2E8F0] text-[#64748B]">
            <Filter className="w-4 h-4 mr-2" /> Filter
          </Button>
        </div>

        {/* Table */}
        <div className="bg-white border border-[#E2E8F0] rounded-[16px] shadow-sm overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-[#F8FAFC] border-b border-[#E2E8F0]">
              <tr>
                <th className="py-4 px-6 text-[12px] font-bold text-[#64748B] uppercase tracking-wider">Material</th>
                <th className="py-4 px-6 text-[12px] font-bold text-[#64748B] uppercase tracking-wider">Status</th>
                <th className="py-4 px-6 text-[12px] font-bold text-[#64748B] uppercase tracking-wider">Inventory</th>
                <th className="py-4 px-6 text-[12px] font-bold text-[#64748B] uppercase tracking-wider">Analytics</th>
                <th className="py-4 px-6 text-[12px] font-bold text-[#64748B] uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E2E8F0]">
              {isLoading ? (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-[#64748B]">Loading materials...</td>
                </tr>
              ) : filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-[#64748B]">No materials found.</td>
                </tr>
              ) : (
                filteredProducts.map((product) => {
                  const invStatus = getInventoryStatus(product)
                  return (
                    <tr key={product._id} className="hover:bg-[#F8FAFC] transition-colors group">
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-[8px] border border-[#E2E8F0] overflow-hidden bg-[#F1F5F9]">
                            {product.images?.[0] ? (
                              <img src={product.images[0]} alt={product.title} className="w-full h-full object-cover" />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-[10px] text-[#94A3B8]">No Img</div>
                            )}
                          </div>
                          <div>
                            <div className="font-bold text-[#0A2540] text-[14px]">{product.title}</div>
                            <div className="text-[12px] text-[#64748B] mt-0.5">{product.fabricType || 'Uncategorized'} • {product.priceRange?.currency} {product.priceRange?.min}/{product.priceRange?.unit}</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider border
                          ${product.status === 'active' ? 'bg-green-50 text-green-700 border-green-200' : 
                            product.status === 'draft' ? 'bg-slate-100 text-slate-700 border-slate-200' : 
                            'bg-yellow-50 text-yellow-700 border-yellow-200'}
                        `}>
                          {product.status === 'active' ? 'Published' : product.status}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-bold border ${invStatus.color}`}>
                          {invStatus.label}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-4 text-[12px] font-medium text-[#64748B]">
                          <div className="flex flex-col"><span className="text-[#0A2540] font-bold">124</span> Views</div>
                          <div className="flex flex-col"><span className="text-[#0A2540] font-bold">12</span> RFQs</div>
                          <div className="flex flex-col"><span className="text-[#0066FF] font-bold text-[11px] bg-blue-50 px-1.5 rounded">98% Match</span></div>
                        </div>
                      </td>
                      <td className="py-4 px-6 text-right">
                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Button variant="ghost" className="h-8 w-8 px-0 text-[#64748B] hover:text-[#0A2540]" onClick={() => navigate(`/dashboard/products/${product._id}/edit`)} title="Edit">
                            <Edit2 className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" className="h-8 w-8 px-0 text-[#64748B] hover:text-[#0A2540]" onClick={() => handleDuplicate(product._id)} title="Duplicate">
                            <Copy className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" className="h-8 w-8 px-0 text-[#64748B] hover:text-[#F59E0B]" onClick={() => handleArchive(product._id)} title="Archive">
                            <Archive className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" className="h-8 w-8 px-0 text-[#64748B] hover:text-red-600 hover:bg-red-50" onClick={() => handleDelete(product._id)} title="Delete">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
