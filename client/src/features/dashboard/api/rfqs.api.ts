import { api } from '@/lib/axios'

export const rfqsApi = {
  getRfqById: async (id: string) => {
    const res = await api.get('/rfqs/' + id)
    return res.data.rfq
  },
  createRfq: async (data: { supplierId: string, productId: string, quantity: number, targetPrice?: number, notes?: string }) => {
    const res = await api.post('/rfqs', data)
    return res.data.rfq
  }
}
