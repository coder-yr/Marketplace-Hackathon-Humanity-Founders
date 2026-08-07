import { api } from '@/lib/axios'

export const ordersApi = {
  createOrder: async (data: any) => {
    const res = await api.post('/orders', data)
    return res.data.order
  }
}
