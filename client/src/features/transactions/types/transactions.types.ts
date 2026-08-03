import { Product, SupplierSummary } from '@/features/products/types/products.types'
import { User } from '@/features/auth/types/auth.types'

export type RfqStatus = 'Draft' | 'Submitted' | 'Viewed' | 'Responded' | 'Accepted' | 'Rejected' | 'Expired'
export type QuoteStatus = 'Pending' | 'Accepted' | 'Rejected'
export type OrderStatus = 'Pending' | 'Confirmed' | 'Processing' | 'Shipped' | 'Delivered' | 'Completed'

export interface Rfq {
  _id: string
  buyerId: User
  supplierId: SupplierSummary
  productId: Product
  quantity: number
  targetPrice?: number
  deliveryAddress?: string
  timeline?: string
  notes?: string
  status: RfqStatus
  createdAt: string
  updatedAt: string
}

export interface Quote {
  _id: string
  rfqId: Rfq | string
  supplierId: SupplierSummary | string
  buyerId: User | string
  offeredPrice: number
  leadTime: string
  validUntil: string
  notes?: string
  status: QuoteStatus
  createdAt: string
  updatedAt: string
}

export interface Order {
  _id: string
  quoteId: Quote | string
  buyerId: User | string
  supplierId: SupplierSummary | string
  productId: Product | string
  finalPrice: number
  quantity: number
  status: OrderStatus
  shippingDetails?: {
    address: string
    trackingNumber?: string
    carrier?: string
  }
  createdAt: string
  updatedAt: string
}
