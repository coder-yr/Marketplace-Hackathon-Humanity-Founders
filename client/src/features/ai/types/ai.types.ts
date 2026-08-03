export interface AiChatMessage {
  role: 'user' | 'assistant'
  content: string
  timestamp: string
}

export interface SearchIntentFilters {
  searchTerm?: string
  category?: string
  fabricType?: string
  maxPrice?: number
  maxMoq?: number
  stockStatus?: string
}

export interface AiRecommendation {
  productId: string
  confidence: 'High' | 'Medium' | 'Low'
  reason: string
}
