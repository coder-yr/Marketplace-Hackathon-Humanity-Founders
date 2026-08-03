import { api } from '@/lib/axios'
import { Rfq, Quote, Order, QuoteStatus, OrderStatus } from '../types/transactions.types'

export const transactionsApi = {
  // RFQs
  createRfq: async (data: Partial<Rfq>) => {
    const res = await api.post<{ success: boolean; rfq: Rfq }>('/rfqs', data)
    return res.data
  },
  getBuyerRfqs: async () => {
    const res = await api.get<{ success: boolean; rfqs: Rfq[] }>('/rfqs/buyer')
    return res.data
  },
  getSupplierRfqs: async () => {
    const res = await api.get<{ success: boolean; rfqs: Rfq[] }>('/rfqs/supplier')
    return res.data
  },

  // Quotes
  createQuote: async (data: Partial<Quote>) => {
    const res = await api.post<{ success: boolean; quote: Quote }>('/quotes', data)
    return res.data
  },
  getBuyerQuotes: async () => {
    const res = await api.get<{ success: boolean; quotes: Quote[] }>('/quotes/buyer')
    return res.data
  },
  getSupplierQuotes: async () => {
    const res = await api.get<{ success: boolean; quotes: Quote[] }>('/quotes/supplier')
    return res.data
  },
  updateQuoteStatus: async (quoteId: string, status: QuoteStatus) => {
    const res = await api.patch<{ success: boolean; quote: Quote }>(`/quotes/${quoteId}/status`, { status })
    return res.data
  },

  // Orders
  createOrder: async (data: Partial<Order>) => {
    const res = await api.post<{ success: boolean; order: Order }>('/orders', data)
    return res.data
  },
  getBuyerOrders: async () => {
    const res = await api.get<{ success: boolean; orders: Order[] }>('/orders/buyer')
    return res.data
  },
  getSupplierOrders: async () => {
    const res = await api.get<{ success: boolean; orders: Order[] }>('/orders/supplier')
    return res.data
  },
  updateOrderStatus: async (orderId: string, status: OrderStatus) => {
    const res = await api.patch<{ success: boolean; order: Order }>(`/orders/${orderId}/status`, { status })
    return res.data
  },
}
