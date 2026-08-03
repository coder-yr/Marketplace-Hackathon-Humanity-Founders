import { api } from '@/lib/axios'
import {
  Product,
  Category,
  ProductFilterParams,
  PaginatedProductsResponse,
  ProductDetailResponse,
} from '../types/products.types'

export const productsApi = {
  getProducts: async (params: ProductFilterParams = {}): Promise<PaginatedProductsResponse> => {
    const response = await api.get('/products', { params })
    return response.data
  },

  getFeaturedProducts: async (limit = 6): Promise<{ success: boolean; data: Product[] }> => {
    const response = await api.get('/products/featured', { params: { limit } })
    return response.data
  },

  getProductBySlugOrId: async (idOrSlug: string): Promise<{ success: boolean; data: ProductDetailResponse }> => {
    const response = await api.get(`/products/${idOrSlug}`)
    return response.data
  },

  getCategories: async (params?: { featured?: boolean; limit?: number }): Promise<{ success: boolean; data: Category[] }> => {
    const response = await api.get('/categories', { params })
    return response.data
  },

  getCategoryBySlug: async (slug: string): Promise<{ success: boolean; data: Category }> => {
    const response = await api.get(`/categories/${slug}`)
    return response.data
  },
}
