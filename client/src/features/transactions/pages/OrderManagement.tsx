import { useState, useEffect } from 'react'
import { Order, OrderStatus } from '../types/transactions.types'
import { transactionsApi } from '../api/transactions.api'
import { ShoppingBag, Loader2, Clock, MapPin, Truck, CheckCircle2, Package } from 'lucide-react'
import { useAuthStore } from '@/features/auth/store/auth.store'
import { Button } from '@/shared/components/ui/button'

export function OrderManagement() {
  const { user } = useAuthStore()
  const [orders, setOrders] = useState<Order[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const isBuyer = user?.role === 'buyer'

  useEffect(() => {
    fetchOrders()
  }, [])

  const fetchOrders = async () => {
    setIsLoading(true)
    try {
      const res = isBuyer ? await transactionsApi.getBuyerOrders() : await transactionsApi.getSupplierOrders()
      if (res.success) setOrders(res.orders)
    } catch (error) {
      console.error('Failed to fetch orders', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleUpdateStatus = async (orderId: string, newStatus: OrderStatus) => {
    try {
      const res = await transactionsApi.updateOrderStatus(orderId, newStatus)
      if (res.success) {
        setOrders(orders.map(o => o._id === orderId ? { ...o, status: newStatus } : o))
      }
    } catch (error) {
      console.error('Failed to update status', error)
    }
  }

  const getStatusIcon = (status: OrderStatus) => {
    switch (status) {
      case 'Pending': return <Clock className="w-4 h-4 text-warning" />
      case 'Processing': return <ShoppingBag className="w-4 h-4 text-brand-primary" />
      case 'Shipped': return <Truck className="w-4 h-4 text-info" />
      case 'Delivered':
      case 'Completed': return <CheckCircle2 className="w-4 h-4 text-success" />
      default: return <Clock className="w-4 h-4 text-text-tertiary" />
    }
  }

  const getNextStatusAction = (currentStatus: OrderStatus): { label: string, next: OrderStatus } | null => {
    if (!isBuyer) {
      // Supplier actions
      if (currentStatus === 'Pending') return { label: 'Confirm Order', next: 'Confirmed' }
      if (currentStatus === 'Confirmed') return { label: 'Start Processing', next: 'Processing' }
      if (currentStatus === 'Processing') return { label: 'Mark as Shipped', next: 'Shipped' }
      if (currentStatus === 'Delivered') return { label: 'Complete Order', next: 'Completed' }
    } else {
      // Buyer actions
      if (currentStatus === 'Shipped') return { label: 'Mark as Delivered', next: 'Delivered' }
    }
    return null
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-brand-primary" />
      </div>
    )
  }

  return (
    <div className="p-6">
      <div className="flex items-center gap-3 mb-8">
        <ShoppingBag className="w-8 h-8 text-brand-primary" />
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Order Management</h1>
          <p className="text-text-secondary">Track and manage your active orders.</p>
        </div>
      </div>

      {orders.length === 0 ? (
        <div className="bg-surface-2 rounded-2xl p-8 text-center text-text-tertiary">
          <Package className="w-8 h-8 mx-auto mb-2 opacity-20" />
          <p>You have no active orders.</p>
        </div>
      ) : (
        <div className="grid gap-6">
          {orders.map(order => {
            const product = typeof order.productId === 'object' ? order.productId : null
            const otherParty = isBuyer 
              ? (typeof order.supplierId === 'object' ? order.supplierId : null)
              : (typeof order.buyerId === 'object' ? order.buyerId : null)
            
            const nextAction = getNextStatusAction(order.status)

            return (
              <div key={order._id} className="bg-surface-50 border border-border-color rounded-2xl overflow-hidden flex flex-col md:flex-row">
                <div className="p-6 flex-1">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm text-text-tertiary">Order #{order._id.slice(-8).toUpperCase()}</span>
                    <span className="flex items-center gap-1.5 text-sm font-bold bg-surface-2 px-3 py-1 rounded-lg">
                      {getStatusIcon(order.status)} {order.status}
                    </span>
                  </div>
                  
                  <h3 className="font-bold text-text-primary text-xl mb-1">{product?.title || 'Product'}</h3>
                  <p className="text-sm text-text-secondary mb-4">
                    {isBuyer ? 'Seller: ' : 'Buyer: '} <span className="font-medium text-text-primary">{otherParty?.fullName || 'Unknown'}</span>
                  </p>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-4 border-y border-border-color/50">
                    <div>
                      <p className="text-xs text-text-tertiary mb-1">Quantity</p>
                      <p className="font-bold text-text-primary">{order.quantity} units</p>
                    </div>
                    <div>
                      <p className="text-xs text-text-tertiary mb-1">Total Price</p>
                      <p className="font-bold text-brand-primary">${order.finalPrice * order.quantity}</p>
                    </div>
                    <div className="col-span-2">
                      <p className="text-xs text-text-tertiary mb-1">Shipping Address</p>
                      <p className="text-sm font-medium text-text-primary flex items-start gap-1">
                        <MapPin className="w-4 h-4 shrink-0 text-text-secondary" />
                        {order.shippingDetails?.address || 'Address pending'}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-surface-1 p-6 border-t md:border-t-0 md:border-l border-border-color flex flex-col justify-center items-center w-full md:w-64 gap-4">
                  {nextAction ? (
                    <>
                      <p className="text-sm text-center text-text-secondary mb-2">Update status to progress order.</p>
                      <Button onClick={() => handleUpdateStatus(order._id, nextAction.next)} className="w-full bg-brand-primary">
                        {nextAction.label}
                      </Button>
                    </>
                  ) : (
                    <div className="text-center text-text-tertiary">
                      <CheckCircle2 className="w-8 h-8 mx-auto mb-2 opacity-50 text-success" />
                      <p className="text-sm">No action required at this step.</p>
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
