import { api } from '@/lib/axios'

export interface ICartItem {
  _id: string
  productId: {
    _id: string
    title: string
    images: string[]
    priceRange: {
      min: number
      max: number
      currency: string
      unit: string
    }
    moq: {
      value: number
      unit: string
    }
    leadTime: string
  }
  supplierId: string
  quantity: number
  color?: string
  price?: number
}

export const cartApi = {
  getCart: () => api.get<{ success: boolean; data: ICartItem[] }>('/cart'),
  
  addToCart: (item: { productId: string; supplierId: string; quantity: number; color?: string; price?: number }) => 
    api.post<{ success: boolean; data: ICartItem[] }>('/cart', item),
    
  updateItem: (itemId: string, quantity: number) => 
    api.put<{ success: boolean; data: ICartItem[] }>(`/cart/${itemId}`, { quantity }),
    
  removeItem: (itemId: string) => 
    api.delete<{ success: boolean; data: ICartItem[] }>(`/cart/${itemId}`),
    
  clearCart: () => 
    api.delete<{ success: boolean; data: [] }>('/cart'),
    
  checkout: (shippingDetails: any) =>
    api.post<{ success: boolean; data: any[] }>('/cart/checkout', { shippingDetails }),
}
