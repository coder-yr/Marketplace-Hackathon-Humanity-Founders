import { aiRouter } from '../../providers/router'
import { cacheService } from './cache.service'
import { parseJsonSafe } from '../utils/parser'
import {
  validateMaterialAnalysis,
  validateRfqDraft,
  validateSupplierComparison,
  validateQuoteIntelligence,
  validateNegotiation,
  validateMarketInsights,
  validateCopilotIntent,
} from '../utils/validator'
import {
  MaterialAnalysisResult,
  RfqDraftResult,
  SupplierComparisonResult,
  QuoteIntelligenceResult,
  NegotiationResult,
  MarketInsightsResult,
  CopilotIntent,
} from '../types/ai.types'
import {
  buildMaterialAnalysisPrompt,
  MaterialAnalysisInput,
} from '../prompts/material.prompt'
import { buildRfqGeneratorPrompt } from '../prompts/rfq.prompt'
import {
  buildSupplierComparisonPrompt,
  buildSupplierIntelligencePrompt,
} from '../prompts/supplier.prompt'
import { buildQuoteAnalysisPrompt } from '../prompts/quote.prompt'
import { buildNegotiationPrompt } from '../prompts/negotiation.prompt'
import { buildMarketInsightsPrompt } from '../prompts/market.prompt'
import { buildCopilotPrompt } from '../prompts/copilot.prompt'
import { logger } from '../../config/logger'

// ── Smart Model Routing Table ─────────────────────────────────────────────────
const MODEL_ROUTES = {
  materialAnalysis: 'google/gemini-2.5-flash',
  rfqGenerator: 'deepseek/deepseek-chat-v3-0324',
  supplierComparison: 'deepseek/deepseek-chat-v3-0324',
  quoteIntelligence: 'deepseek/deepseek-chat-v3-0324',
  negotiation: 'anthropic/claude-sonnet-4-5',
  marketInsights: 'google/gemini-2.5-flash',
  copilot: 'google/gemini-2.5-flash',
} as const

type AiEndpoint = keyof typeof MODEL_ROUTES

// ── Core Helper ───────────────────────────────────────────────────────────────

async function callAi(
  prompt: string,
  endpoint: AiEndpoint,
  useCache = true,
): Promise<string> {
  const model = MODEL_ROUTES[endpoint]

  // 1. Cache check
  if (useCache) {
    const hash = cacheService.hash(prompt)
    const cached = await cacheService.get(hash)
    if (cached) return cached

    // 2. Call AI with smart model routing
    const result = await aiRouter.routeWithModel(prompt, model, true)

    // 3. Store in cache
    await cacheService.set(hash, result.text, result.model, endpoint)
    return result.text
  }

  const result = await aiRouter.routeWithModel(prompt, model, true)
  return result.text
}

// ── Enterprise AI Service ─────────────────────────────────────────────────────

class EnterpriseAiService {
  // ── 1. Material Analysis ──────────────────────────────────────────────────

  async materialAnalysis(
    input: MaterialAnalysisInput,
  ): Promise<MaterialAnalysisResult> {
    const prompt = buildMaterialAnalysisPrompt(input)
    const raw = await callAi(prompt, 'materialAnalysis')
    const parsed = parseJsonSafe<any>(raw, null)
    if (!parsed) {
      logger.warn('materialAnalysis: could not parse response, using defaults')
      return validateMaterialAnalysis({})
    }
    return validateMaterialAnalysis(parsed)
  }

  // ── 2. RFQ Generator ─────────────────────────────────────────────────────

  async rfqGenerator(description: string): Promise<RfqDraftResult> {
    const prompt = buildRfqGeneratorPrompt(description)
    const raw = await callAi(prompt, 'rfqGenerator')
    const parsed = parseJsonSafe<any>(raw, null)
    if (!parsed) return validateRfqDraft({})
    return validateRfqDraft(parsed)
  }

  // ── 3. Supplier Comparison ───────────────────────────────────────────────

  async supplierComparison(
    suppliers: any[],
    requirement?: string,
  ): Promise<SupplierComparisonResult> {
    const prompt = buildSupplierComparisonPrompt(suppliers, requirement)
    const raw = await callAi(prompt, 'supplierComparison')
    const parsed = parseJsonSafe<any>(raw, null)
    if (!parsed) return validateSupplierComparison({})
    return validateSupplierComparison(parsed)
  }

  // ── 4. Supplier Intelligence (single supplier) ───────────────────────────

  async supplierIntelligence(supplier: any): Promise<any> {
    const prompt = buildSupplierIntelligencePrompt(supplier)
    const raw = await callAi(prompt, 'supplierComparison') // reuse same model
    return parseJsonSafe<any>(raw, {})
  }

  // ── 5. Quote Intelligence ────────────────────────────────────────────────

  async quoteIntelligence(
    quote: any,
    productContext?: any,
  ): Promise<QuoteIntelligenceResult> {
    const prompt = buildQuoteAnalysisPrompt(quote, productContext)
    const raw = await callAi(prompt, 'quoteIntelligence')
    const parsed = parseJsonSafe<any>(raw, null)
    if (!parsed) return validateQuoteIntelligence({})
    return validateQuoteIntelligence(parsed)
  }

  // ── 6. Negotiation Assistant ─────────────────────────────────────────────

  async negotiation(
    quote: any,
    supplier: any,
    buyerPreferences?: any,
  ): Promise<NegotiationResult> {
    const prompt = buildNegotiationPrompt(quote, supplier, buyerPreferences)
    // No cache for negotiation — always fresh
    const result = await aiRouter.routeWithModel(
      prompt,
      MODEL_ROUTES.negotiation,
      true,
    )
    const parsed = parseJsonSafe<any>(result.text, null)
    if (!parsed) return validateNegotiation({})
    return validateNegotiation(parsed)
  }

  // ── 7. Market Insights ───────────────────────────────────────────────────

  async marketInsights(
    fabricType: string,
    region?: string,
  ): Promise<MarketInsightsResult> {
    const prompt = buildMarketInsightsPrompt(fabricType, region)
    const raw = await callAi(prompt, 'marketInsights')
    const parsed = parseJsonSafe<any>(raw, null)
    if (!parsed) return validateMarketInsights({})
    return validateMarketInsights(parsed)
  }

  // ── 8. Enterprise Copilot ────────────────────────────────────────────────

  async copilot(
    query: string,
    history: Array<{ role: string; content: string }> = [],
  ): Promise<CopilotIntent> {
    const prompt = buildCopilotPrompt(query, history)
    // No cache for copilot — every query is unique
    const result = await aiRouter.routeWithModel(
      prompt,
      MODEL_ROUTES.copilot,
      true,
    )
    const parsed = parseJsonSafe<any>(result.text, null)
    if (!parsed) {
      return validateCopilotIntent({
        intent: 'knowledge',
        response: 'I can help you source textile materials. Try asking me to find suppliers or generate an RFQ.',
        confidence: 50,
      })
    }
    return validateCopilotIntent(parsed)
  }
}

export const enterpriseAiService = new EnterpriseAiService()
