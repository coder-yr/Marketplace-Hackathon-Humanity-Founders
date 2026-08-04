import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { cartApi, ICartItem } from '../api/cart.api'

interface CartState {
  items: ICartItem[]
  isLoading: boolean
  error: string | null
  
  // Actions
  fetchCart: () => Promise<void>
  addToCart: (item: { productId: string; supplierId: string; quantity: number; color?: string; price?: number }) => Promise<void>
  updateQuantity: (itemId: string, quantity: number) => Promise<void>
  removeItem: (itemId: string) => Promise<void>
  clearCart: () => Promise<void>
  checkout: (shippingDetails: any) => Promise<any[]>
  
  // Getters
  totalItems: () => number
  totalQuantity: () => number
  estimatedTotal: () => number
}

export const useCartStore = create<CartState>()(
  devtools(
    (set, get) => ({
      items: [],
      isLoading: false,
      error: null,

      fetchCart: async () => {
        set({ isLoading: true, error: null })
        try {
          const res = await cartApi.getCart()
          set({ items: res.data.data, isLoading: false })
        } catch (error: any) {
          set({ error: error.message, isLoading: false })
        }
      },

      addToCart: async (item) => {
        set({ isLoading: true, error: null })
        try {
          const res = await cartApi.addToCart(item)
          set({ items: res.data.data, isLoading: false })
        } catch (error: any) {
          set({ error: error.message, isLoading: false })
          throw error
        }
      },

      updateQuantity: async (itemId, quantity) => {
        set({ isLoading: true, error: null })
        try {
          const res = await cartApi.updateItem(itemId, quantity)
          set({ items: res.data.data, isLoading: false })
        } catch (error: any) {
          set({ error: error.message, isLoading: false })
        }
      },

      removeItem: async (itemId) => {
        set({ isLoading: true, error: null })
        try {
          const res = await cartApi.removeItem(itemId)
          set({ items: res.data.data, isLoading: false })
        } catch (error: any) {
          set({ error: error.message, isLoading: false })
        }
      },

      clearCart: async () => {
        set({ isLoading: true, error: null })
        try {
          await cartApi.clearCart()
          set({ items: [], isLoading: false })
        } catch (error: any) {
          set({ error: error.message, isLoading: false })
        }
      },

      checkout: async (shippingDetails) => {
        set({ isLoading: true, error: null })
        try {
          const res = await cartApi.checkout(shippingDetails)
          set({ items: [], isLoading: false })
          return res.data.data
        } catch (error: any) {
          set({ error: error.message, isLoading: false })
          throw error
        }
      },

      totalItems: () => {
        return get().items.length
      },

      totalQuantity: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0)
      },

      estimatedTotal: () => {
        return get().items.reduce((total, item) => {
          const price = item.price || item.productId.priceRange.min
          return total + (price * item.quantity)
        }, 0)
      },
    }),
    { name: 'CartStore' }
  )
)
