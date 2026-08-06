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

  createProduct: async (data: Partial<Product>): Promise<{ success: boolean; data: Product }> => {
    const response = await api.post('/products', data)
    return response.data
  },

  updateProduct: async (id: string, data: Partial<Product>): Promise<{ success: boolean; data: Product }> => {
    const response = await api.put(`/products/${id}`, data)
    return response.data
  },

  deleteProduct: async (id: string): Promise<{ success: boolean; message: string }> => {
    const response = await api.delete(`/products/${id}`)
    return response.data
  },

  duplicateProduct: async (id: string): Promise<{ success: boolean; data: Product }> => {
    const response = await api.post(`/products/${id}/duplicate`)
    return response.data
  },

  archiveProduct: async (id: string): Promise<{ success: boolean; data: Product }> => {
    const response = await api.put(`/products/${id}`, { status: 'archived' })
    return response.data
  },

  publishProduct: async (id: string): Promise<{ success: boolean; data: Product }> => {
    const response = await api.put(`/products/${id}`, { status: 'active', published: true })
    return response.data
  },
}
