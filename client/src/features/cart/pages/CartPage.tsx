import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCartStore } from '../store/cart.store'
import { Button } from '@/shared/components/ui/button'
import { Plus, Minus, Trash2, ArrowRight, ShoppingCart, Box, Factory } from 'lucide-react'

export function CartPage() {
  const { items, isLoading, fetchCart, updateQuantity, removeItem, estimatedTotal, totalQuantity } = useCartStore()
  const navigate = useNavigate()

  useEffect(() => {
    fetchCart()
  }, [fetchCart])

  if (isLoading && items.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center p-8 bg-[#F7F8FA] min-h-[60vh]">
        <div className="w-8 h-8 rounded-full border-2 border-[var(--border)] border-t-[var(--primary)] animate-spin" />
      </div>
    )
  }

  if (items.length === 0) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-8 bg-[#F7F8FA] min-h-[60vh]">
        <div className="w-16 h-16 rounded-full bg-white border border-[var(--border)] flex items-center justify-center text-[var(--body)] mb-4 shadow-sm">
          <ShoppingCart className="w-8 h-8" />
        </div>
        <h2 className="text-[24px] font-display font-bold text-[var(--heading)] mb-2">Your Procurement Cart is Empty</h2>
        <p className="text-[14px] text-[var(--body)] font-medium mb-6 text-center max-w-sm">
          Browse the marketplace to find materials, compare specs, and add items to your cart or request RFQs.
        </p>
        <Button 
          onClick={() => navigate('/marketplace')}
          className="bg-[var(--primary)] hover:bg-[#0052CC] text-white rounded-[12px] h-11 px-6 font-bold"
        >
          Explore Marketplace
        </Button>
      </div>
    )
  }

  const suppliersCount = new Set(items.map(item => item.supplierId)).size

  return (
    <div className="flex-1 bg-[#F7F8FA] py-8 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-[32px] font-display font-bold text-[var(--heading)] mb-2">Procurement Cart</h1>
        <p className="text-[14px] font-medium text-[var(--body)] mb-8">
          Review your selected items before proceeding to checkout or requesting quotes.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items List */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div key={item._id} className="bg-white rounded-[24px] border border-[var(--border)] p-5 flex gap-5 shadow-sm">
                <div className="w-32 h-32 rounded-[12px] bg-[#F1F5F9] border border-[var(--border)] overflow-hidden shrink-0">
                  {item.productId.images?.[0] ? (
                    <img src={item.productId.images[0]} alt={item.productId.title} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-[#94A3B8]">
                      <Box className="w-8 h-8" />
                    </div>
                  )}
                </div>

                <div className="flex-1 flex flex-col justify-between">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-[18px] font-display font-bold text-[var(--heading)] mb-1 leading-tight line-clamp-1">
                        {item.productId.title}
                      </h3>
                      <div className="flex items-center gap-2 text-[12px] font-bold uppercase tracking-widest text-[#94A3B8] mb-2">
                        <Factory className="w-3 h-3" /> Supplier ID: {item.supplierId.slice(-6)}
                      </div>
                      
                      {/* Specs */}
                      <div className="flex flex-wrap gap-2 mb-3">
                        {item.color && (
                          <span className="inline-flex items-center px-2 py-1 rounded-[6px] bg-[#F8FAFC] border border-[var(--border)] text-[12px] font-medium text-[var(--heading)]">
                            Color: <span className="ml-1 font-bold">{item.color}</span>
                          </span>
                        )}
                        <span className="inline-flex items-center px-2 py-1 rounded-[6px] bg-[#F8FAFC] border border-[var(--border)] text-[12px] font-medium text-[var(--heading)]">
                          Lead Time: <span className="ml-1 font-bold">{item.productId.leadTime}</span>
                        </span>
                        {item.quantity < item.productId.moq.value && (
                          <span className="inline-flex items-center px-2 py-1 rounded-[6px] bg-[#FEF2F2] border border-[#FECACA] text-[12px] font-medium text-[var(--error)]">
                            Warning: Below MOQ ({item.productId.moq.value} {item.productId.moq.unit})
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="text-[20px] font-display font-bold text-[var(--heading)]">
                        {item.productId.priceRange.currency} {item.price || item.productId.priceRange.min}
                        <span className="text-[14px] text-[#94A3B8] font-sans font-medium">/{item.productId.priceRange.unit}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 bg-[#F8FAFC] border border-[var(--border)] rounded-[8px] p-1">
                      <button 
                        onClick={() => updateQuantity(item._id, Math.max(1, item.quantity - 10))}
                        className="w-8 h-8 rounded-[6px] flex items-center justify-center hover:bg-white text-[var(--body)] hover:text-[var(--heading)] transition-colors shadow-sm"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <input 
                        type="number" 
                        value={item.quantity}
                        onChange={(e) => updateQuantity(item._id, parseInt(e.target.value) || 1)}
                        className="w-16 h-8 text-center text-[13px] font-bold text-[var(--heading)] bg-transparent border-none focus:outline-none"
                      />
                      <button 
                        onClick={() => updateQuantity(item._id, item.quantity + 10)}
                        className="w-8 h-8 rounded-[6px] flex items-center justify-center hover:bg-white text-[var(--body)] hover:text-[var(--heading)] transition-colors shadow-sm"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>

                    <button 
                      onClick={() => removeItem(item._id)}
                      className="text-[12px] font-bold text-[var(--error)] hover:text-[#B91C1C] flex items-center gap-1 px-2 py-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" /> Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Cart Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-[24px] border border-[var(--border)] p-6 shadow-sm sticky top-24">
              <h2 className="text-[20px] font-display font-bold text-[var(--heading)] mb-4">Cart Summary</h2>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between items-center text-[14px] font-medium text-[var(--body)]">
                  <span>Total Items</span>
                  <span className="font-bold text-[var(--heading)]">{items.length}</span>
                </div>
                <div className="flex justify-between items-center text-[14px] font-medium text-[var(--body)]">
                  <span>Total Quantity</span>
                  <span className="font-bold text-[var(--heading)]">{totalQuantity()} units</span>
                </div>
                <div className="flex justify-between items-center text-[14px] font-medium text-[var(--body)]">
                  <span>Suppliers</span>
                  <span className="font-bold text-[var(--heading)]">{suppliersCount}</span>
                </div>
                
                <div className="pt-4 border-t border-[var(--border)]">
                  <div className="flex justify-between items-end">
                    <span className="text-[14px] font-bold text-[var(--heading)]">Estimated Total</span>
                    <span className="text-[28px] font-display font-bold text-[var(--heading)] leading-none">
                      ${estimatedTotal().toLocaleString()}
                    </span>
                  </div>
                  <p className="text-[11px] font-bold text-[#94A3B8] uppercase tracking-widest text-right mt-1">
                    Excludes shipping & taxes
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <Button 
                  onClick={() => navigate('/checkout')}
                  className="w-full bg-[var(--heading)] hover:bg-[#1E293B] text-white rounded-[12px] h-12 font-bold shadow-sm group"
                >
                  Proceed to Checkout
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => navigate('/marketplace')}
                  className="w-full bg-white hover:bg-[#F8FAFC] border-[var(--border)] text-[var(--heading)] rounded-[12px] h-12 font-bold shadow-sm"
                >
                  Continue Sourcing
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
