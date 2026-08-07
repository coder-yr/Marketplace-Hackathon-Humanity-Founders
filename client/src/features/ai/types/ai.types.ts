// ── Existing Types (unchanged) ────────────────────────────────────────────────

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

// ── Phase 8: Enterprise AI Types ──────────────────────────────────────────────

export interface MaterialAnalysisResult {
  summary: string
  bestApplications: string[]
  advantages: string[]
  limitations: string[]
  marketDemand: 'High' | 'Medium' | 'Low'
  sustainability: string
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH'
  alternatives: string[]
  aiConfidence: number
}

export interface RfqDraftResult {
  material: string
  quantity: string
  gsm: string
  budget: string
  leadTime: string
  certifications: string[]
  notes: string
  suggestedSuppliers: string[]
}

export interface SupplierScore {
  price: number
  quality: number
  leadTime: number
  capacity: number
  trust: number
}

export interface SupplierComparisonResult {
  winner: string
  scores: Record<string, SupplierScore>
  strengths: string[]
  weaknesses: string[]
  recommendation: string
}

export interface QuoteIntelligenceResult {
  marketAverage: string
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH'
  fairnessScore: number
  estimatedSavings: string
  recommendation: string
  negotiationStrategy: string
}

export interface NegotiationResult {
  counterOffer: string
  suggestedPrice: string
  professionalEmail: string
  negotiationTips: string[]
  confidenceScore: number
}

export interface MarketInsightsResult {
  trend: 'Rising' | 'Stable' | 'Declining'
  trendPercent: string
  demand: 'High' | 'Medium' | 'Low'
  availability: 'High' | 'Medium' | 'Low' | 'Scarce'
  bestBuyWindow: string
  priceOutlook: string
  keyFactors: string[]
  regionInsights: string
}

export interface CopilotIntent {
  intent:
    | 'supplier_search'
    | 'rfq_generate'
    | 'material_search'
    | 'compare'
    | 'quote_analyze'
    | 'navigate'
    | 'knowledge'
  action: string
  params: Record<string, string>
  response: string
  confidence: number
  products?: any[]
  metadata?: any
}
