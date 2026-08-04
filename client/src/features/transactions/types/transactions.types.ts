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
  aiRiskAnalysis?: {
    level: 'Low' | 'Medium' | 'High'
    reasons: string[]
  }
  aiCostInsights?: {
    marketAverage: number
    suggestedTarget: number
  }
  aiNegotiationSuggestions?: {
    suggestedCounterOffer: number
    reasons: string[]
  }
  aiAlternativeSuppliers?: Array<{
    name: string
    matchScore: number
  }>
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
    container?: string
    port?: string
    method?: string
    expectedArrival?: string
  }
  timeline?: Array<{
    stage: 'Order Confirmed' | 'Raw Material' | 'Manufacturing' | 'Quality Check' | 'Packaging' | 'Shipping' | 'Delivered'
    status: 'Pending' | 'In Progress' | 'Completed' | 'Delayed'
    progress: number
    eta?: string
    notes?: string
    updatedAt: string
  }>
  documents?: Array<{
    type: string
    name: string
    url: string
    uploadedAt: string
  }>
  createdAt: string
  updatedAt: string
}
