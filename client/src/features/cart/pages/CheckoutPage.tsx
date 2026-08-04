import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCartStore } from '../store/cart.store'
import { Button } from '@/shared/components/ui/button'
import { Input } from '@/shared/components/ui/input'
import { MapPin, Truck, ShieldCheck, ChevronRight, CheckCircle2 } from 'lucide-react'
import { toast } from 'sonner'
import { motion } from 'framer-motion'

export function CheckoutPage() {
  const { items, estimatedTotal, totalQuantity, checkout } = useCartStore()
  const navigate = useNavigate()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [shippingDetails, setShippingDetails] = useState({
    address: '',
    carrier: 'DHL Global Forwarding',
    method: 'Air Freight',
  })

  if (items.length === 0) {
    navigate('/cart')
    return null
  }

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!shippingDetails.address) {
      toast.error('Please enter a shipping address')
      return
    }

    setIsSubmitting(true)
    try {
      await checkout(shippingDetails)
      navigate('/checkout/confirmation')
    } catch (error: any) {
      toast.error(error.message || 'Checkout failed')
      setIsSubmitting(false)
    }
  }

  const total = estimatedTotal()

  return (
    <div className="flex-1 bg-[#F7F8FA] py-8 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center gap-2 text-[12px] font-bold text-[var(--body)] mb-8">
          <span className="hover:text-[var(--primary)] cursor-pointer" onClick={() => navigate('/cart')}>CART</span>
          <ChevronRight className="w-3 h-3 text-[#CBD5E1]" />
          <span className="text-[var(--heading)]">CHECKOUT</span>
        </div>

        <h1 className="text-[32px] font-display font-bold text-[var(--heading)] mb-8">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form */}
          <div>
            <form onSubmit={handleCheckout} className="bg-white rounded-[24px] border border-[var(--border)] p-6 shadow-sm mb-6">
              <h2 className="text-[20px] font-display font-bold text-[var(--heading)] mb-6 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-[var(--primary)]" /> Shipping Details
              </h2>
              
              <div className="space-y-4">
                <Input
                  label="Delivery Address"
                  placeholder="Enter your warehouse or delivery address"
                  value={shippingDetails.address}
                  onChange={(e) => setShippingDetails({ ...shippingDetails, address: e.target.value })}
                  required
                />
                
                <div className="pt-4 border-t border-[var(--border)]">
                  <h3 className="text-[14px] font-bold text-[var(--heading)] mb-3">Shipping Method</h3>
                  <div className="grid grid-cols-1 gap-3">
                    <label className={`flex items-start gap-3 p-4 border rounded-[12px] cursor-pointer transition-colors ${shippingDetails.method === 'Air Freight' ? 'border-[var(--primary)] bg-[#F8FAFC]' : 'border-[var(--border)] hover:bg-[#F8FAFC]'}`}>
                      <input 
                        type="radio" 
                        name="method" 
                        className="mt-1 accent-[var(--primary)]" 
                        checked={shippingDetails.method === 'Air Freight'}
                        onChange={() => setShippingDetails({ ...shippingDetails, method: 'Air Freight', carrier: 'DHL Global Forwarding' })}
                      />
                      <div>
                        <div className="font-bold text-[14px] text-[var(--heading)]">Air Freight (Premium)</div>
                        <div className="text-[12px] text-[var(--body)] mt-0.5">3-5 Business Days • Real-time tracking</div>
                      </div>
                    </label>
                    <label className={`flex items-start gap-3 p-4 border rounded-[12px] cursor-pointer transition-colors ${shippingDetails.method === 'Ocean Freight' ? 'border-[var(--primary)] bg-[#F8FAFC]' : 'border-[var(--border)] hover:bg-[#F8FAFC]'}`}>
                      <input 
                        type="radio" 
                        name="method" 
                        className="mt-1 accent-[var(--primary)]" 
                        checked={shippingDetails.method === 'Ocean Freight'}
                        onChange={() => setShippingDetails({ ...shippingDetails, method: 'Ocean Freight', carrier: 'Maersk' })}
                      />
                      <div>
                        <div className="font-bold text-[14px] text-[var(--heading)]">Ocean Freight (Standard)</div>
                        <div className="text-[12px] text-[var(--body)] mt-0.5">15-30 Business Days • Cost-effective</div>
                      </div>
                    </label>
                  </div>
                </div>
              </div>
            </form>
          </div>

          {/* Summary */}
          <div>
            <div className="bg-white rounded-[24px] border border-[var(--border)] p-6 shadow-sm sticky top-24">
              <h2 className="text-[20px] font-display font-bold text-[var(--heading)] mb-6">Order Summary</h2>
              
              <div className="max-h-[300px] overflow-y-auto mb-6 space-y-4 pr-2">
                {items.map(item => (
                  <div key={item._id} className="flex gap-4">
                    <div className="w-16 h-16 rounded-[8px] bg-[#F1F5F9] overflow-hidden shrink-0">
                      {item.productId.images?.[0] && (
                        <img src={item.productId.images[0]} alt={item.productId.title} className="w-full h-full object-cover" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="font-bold text-[14px] text-[var(--heading)] line-clamp-1">{item.productId.title}</div>
                      <div className="text-[12px] text-[#94A3B8] font-medium mt-0.5">Qty: {item.quantity} {item.productId.priceRange.unit}</div>
                      {item.color && <div className="text-[12px] text-[var(--body)] mt-0.5">Color: {item.color}</div>}
                    </div>
                    <div className="font-bold text-[14px] text-[var(--heading)]">
                      ${((item.price || item.productId.priceRange.min) * item.quantity).toLocaleString()}
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-3 mb-6 pt-4 border-t border-[var(--border)]">
                <div className="flex justify-between items-center text-[14px] font-medium text-[var(--body)]">
                  <span>Subtotal ({totalQuantity()} items)</span>
                  <span className="font-bold text-[var(--heading)]">${total.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center text-[14px] font-medium text-[var(--body)]">
                  <span>Shipping & Taxes</span>
                  <span className="font-bold text-[#94A3B8]">Calculated later</span>
                </div>
                
                <div className="pt-4 border-t border-[var(--border)]">
                  <div className="flex justify-between items-end">
                    <span className="text-[16px] font-bold text-[var(--heading)]">Total</span>
                    <span className="text-[28px] font-display font-bold text-[var(--heading)] leading-none">
                      ${total.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              <Button 
                onClick={handleCheckout}
                disabled={isSubmitting}
                className="w-full bg-[var(--heading)] hover:bg-[var(--primary)] text-white rounded-[12px] h-12 font-bold shadow-sm"
              >
                {isSubmitting ? (
                  <div className="w-5 h-5 rounded-full border-2 border-t-white border-white/30 animate-spin" />
                ) : (
                  <>Place Order <ShieldCheck className="w-4 h-4 ml-2" /></>
                )}
              </Button>
              
              <div className="flex items-center justify-center gap-2 mt-4 text-[12px] font-bold text-[#94A3B8]">
                <ShieldCheck className="w-4 h-4" /> Secure Enterprise Checkout
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
