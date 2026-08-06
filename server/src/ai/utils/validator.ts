import {
  MaterialAnalysisResult,
  RfqDraftResult,
  SupplierComparisonResult,
  QuoteIntelligenceResult,
  NegotiationResult,
  MarketInsightsResult,
  CopilotIntent,
} from '../types/ai.types'

// ── Generic helper ────────────────────────────────────────────────────────────

function isObject(val: any): val is Record<string, any> {
  return val !== null && typeof val === 'object' && !Array.isArray(val)
}

function ensureArray(val: any): string[] {
  if (Array.isArray(val)) return val.map(String)
  if (typeof val === 'string') return [val]
  return []
}

// ── Validators ────────────────────────────────────────────────────────────────

export function validateMaterialAnalysis(data: any): MaterialAnalysisResult {
  if (!isObject(data)) throw new Error('MaterialAnalysis: not an object')
  return {
    summary: String(data.summary ?? 'Premium textile material.'),
    bestApplications: ensureArray(data.bestApplications),
    advantages: ensureArray(data.advantages),
    limitations: ensureArray(data.limitations),
    marketDemand: ['High', 'Medium', 'Low'].includes(data.marketDemand)
      ? data.marketDemand
      : 'Medium',
    sustainability: String(data.sustainability ?? ''),
    riskLevel: ['LOW', 'MEDIUM', 'HIGH'].includes(data.riskLevel)
      ? data.riskLevel
      : 'LOW',
    alternatives: ensureArray(data.alternatives),
    aiConfidence: typeof data.aiConfidence === 'number' ? data.aiConfidence : 90,
  }
}

export function validateRfqDraft(data: any): RfqDraftResult {
  if (!isObject(data)) throw new Error('RfqDraft: not an object')
  return {
    material: String(data.material ?? ''),
    quantity: String(data.quantity ?? ''),
    gsm: String(data.gsm ?? ''),
    budget: String(data.budget ?? ''),
    leadTime: String(data.leadTime ?? ''),
    certifications: ensureArray(data.certifications),
    notes: String(data.notes ?? ''),
    suggestedSuppliers: ensureArray(data.suggestedSuppliers),
  }
}

export function validateSupplierComparison(data: any): SupplierComparisonResult {
  if (!isObject(data)) throw new Error('SupplierComparison: not an object')
  return {
    winner: String(data.winner ?? ''),
    scores: isObject(data.scores) ? data.scores : {},
    strengths: ensureArray(data.strengths),
    weaknesses: ensureArray(data.weaknesses),
    recommendation: String(data.recommendation ?? ''),
  }
}

export function validateQuoteIntelligence(data: any): QuoteIntelligenceResult {
  if (!isObject(data)) throw new Error('QuoteIntelligence: not an object')
  return {
    marketAverage: String(data.marketAverage ?? ''),
    riskLevel: ['LOW', 'MEDIUM', 'HIGH'].includes(data.riskLevel)
      ? data.riskLevel
      : 'MEDIUM',
    fairnessScore:
      typeof data.fairnessScore === 'number' ? data.fairnessScore : 75,
    estimatedSavings: String(data.estimatedSavings ?? ''),
    recommendation: String(data.recommendation ?? ''),
    negotiationStrategy: String(data.negotiationStrategy ?? ''),
  }
}

export function validateNegotiation(data: any): NegotiationResult {
  if (!isObject(data)) throw new Error('Negotiation: not an object')
  return {
    counterOffer: String(data.counterOffer ?? ''),
    suggestedPrice: String(data.suggestedPrice ?? ''),
    professionalEmail: String(data.professionalEmail ?? ''),
    negotiationTips: ensureArray(data.negotiationTips),
    confidenceScore:
      typeof data.confidenceScore === 'number' ? data.confidenceScore : 80,
  }
}

export function validateMarketInsights(data: any): MarketInsightsResult {
  if (!isObject(data)) throw new Error('MarketInsights: not an object')
  return {
    trend: ['Rising', 'Stable', 'Declining'].includes(data.trend)
      ? data.trend
      : 'Stable',
    trendPercent: String(data.trendPercent ?? '+0%'),
    demand: ['High', 'Medium', 'Low'].includes(data.demand)
      ? data.demand
      : 'Medium',
    availability: ['High', 'Medium', 'Low', 'Scarce'].includes(data.availability)
      ? data.availability
      : 'Medium',
    bestBuyWindow: String(data.bestBuyWindow ?? 'Current Quarter'),
    priceOutlook: String(data.priceOutlook ?? ''),
    keyFactors: ensureArray(data.keyFactors),
    regionInsights: String(data.regionInsights ?? ''),
  }
}

export function validateCopilotIntent(data: any): CopilotIntent {
  const VALID_INTENTS = [
    'supplier_search',
    'rfq_generate',
    'material_search',
    'compare',
    'quote_analyze',
    'navigate',
    'knowledge',
  ]
  if (!isObject(data)) throw new Error('CopilotIntent: not an object')
  return {
    intent: VALID_INTENTS.includes(data.intent) ? data.intent : 'knowledge',
    action: String(data.action ?? ''),
    params: isObject(data.params) ? data.params : {},
    response: String(data.response ?? ''),
    confidence: typeof data.confidence === 'number' ? data.confidence : 80,
  }
}
