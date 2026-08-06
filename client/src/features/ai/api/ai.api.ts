import { apiClient } from '@/shared/utils/api-client'
import {
  SearchIntentFilters,
  AiRecommendation,
  MaterialAnalysisResult,
  RfqDraftResult,
  SupplierComparisonResult,
  QuoteIntelligenceResult,
  NegotiationResult,
  MarketInsightsResult,
  CopilotIntent,
} from '../types/ai.types'

// ── Existing API (unchanged) ──────────────────────────────────────────────────

export const parseSearchIntent = async (
  query: string,
): Promise<{ filters: SearchIntentFilters; provider: string }> => {
  const { data } = await apiClient.post('/ai/search-intent', { query })
  return data
}

export const compareProducts = async (
  productIds: string[],
): Promise<{ comparison: string; provider: string }> => {
  const { data } = await apiClient.post('/ai/compare', { productIds })
  return data
}

export const recommendProducts = async (): Promise<{
  recommendations: AiRecommendation[]
  provider: string
}> => {
  const { data } = await apiClient.post('/ai/recommendations')
  return data
}

export const generateQuoteDraft = async (
  productId: string,
): Promise<{ draft: string; provider: string }> => {
  const { data } = await apiClient.post('/ai/quote-draft', { productId })
  return data
}

export const getProductSummary = async (
  productId: string,
): Promise<{ summary: string; provider: string; cached: boolean }> => {
  const { data } = await apiClient.get(`/ai/summary/${productId}`)
  return data
}

export const chat = async (
  query: string,
  history: any[],
): Promise<{ response: string; provider: string }> => {
  const { data } = await apiClient.post('/ai/chat', { query, history })
  return data
}

// ── Phase 8: Enterprise AI API ────────────────────────────────────────────────

export interface MaterialAnalysisParams {
  title?: string
  fabricType: string
  composition?: string
  weight?: string
  width?: string
  certifications?: string[]
  country?: string
  moq?: string
  leadTime?: string
  priceRange?: string
  description?: string
}

export const getMaterialAnalysis = async (
  params: MaterialAnalysisParams,
): Promise<{ data: MaterialAnalysisResult }> => {
  const { data } = await apiClient.post('/ai/material-analysis', params)
  return data
}

export const generateRfqDraft = async (
  description: string,
): Promise<{ data: RfqDraftResult }> => {
  const { data } = await apiClient.post('/ai/rfq-generator', { description })
  return data
}

export const getSupplierComparison = async (
  suppliers: any[],
  requirement?: string,
): Promise<{ data: SupplierComparisonResult }> => {
  const { data } = await apiClient.post('/ai/supplier-comparison', {
    suppliers,
    requirement,
  })
  return data
}

export const analyzeQuote = async (
  quote: any,
  productContext?: any,
): Promise<{ data: QuoteIntelligenceResult }> => {
  const { data } = await apiClient.post('/ai/quote-analysis', {
    quote,
    productContext,
  })
  return data
}

export const getMarketInsights = async (
  fabricType: string,
  region?: string,
): Promise<{ data: MarketInsightsResult }> => {
  const { data } = await apiClient.post('/ai/market-insights', {
    fabricType,
    region,
  })
  return data
}

export const getNegotiationAdvice = async (
  quote: any,
  supplier: any,
  buyerPreferences?: any,
): Promise<{ data: NegotiationResult }> => {
  const { data } = await apiClient.post('/ai/negotiation', {
    quote,
    supplier,
    buyerPreferences,
  })
  return data
}

export const copilotQuery = async (
  query: string,
  history: Array<{ role: string; content: string }> = [],
): Promise<{ data: CopilotIntent }> => {
  const { data } = await apiClient.post('/ai/copilot', { query, history })
  return data
}
