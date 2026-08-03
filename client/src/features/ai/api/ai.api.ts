import { apiClient } from '@/shared/utils/api-client'
import { SearchIntentFilters, AiRecommendation } from '../types/ai.types'

export const parseSearchIntent = async (query: string): Promise<{ filters: SearchIntentFilters; provider: string }> => {
  const { data } = await apiClient.post('/api/ai/search-intent', { query })
  return data
}

export const compareProducts = async (productIds: string[]): Promise<{ comparison: string; provider: string }> => {
  const { data } = await apiClient.post('/api/ai/compare', { productIds })
  return data
}

export const recommendProducts = async (): Promise<{ recommendations: AiRecommendation[]; provider: string }> => {
  const { data } = await apiClient.post('/api/ai/recommendations')
  return data
}

export const generateQuoteDraft = async (productId: string): Promise<{ draft: string; provider: string }> => {
  const { data } = await apiClient.post('/api/ai/quote-draft', { productId })
  return data
}

export const getProductSummary = async (productId: string): Promise<{ summary: string; provider: string; cached: boolean }> => {
  const { data } = await apiClient.get(`/api/ai/summary/${productId}`)
  return data
}

export const chat = async (query: string, history: any[]): Promise<{ response: string; provider: string }> => {
  const { data } = await apiClient.post('/api/ai/chat', { query, history })
  return data
}
