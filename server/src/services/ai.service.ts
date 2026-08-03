import { aiRouter } from '../providers/router'
import { buildSearchIntentPrompt } from '../prompts/search.prompt'
import { buildComparisonPrompt } from '../prompts/comparison.prompt'
import { buildRecommendationPrompt } from '../prompts/recommendation.prompt'
import { buildQuotePrompt } from '../prompts/quote.prompt'
import { buildSummaryPrompt } from '../prompts/summary.prompt'
import { buildChatPrompt } from '../prompts/chat.prompt'
import { generateReplyPrompt } from '../prompts/generate-reply.prompt'
import { summarizeConversationPrompt } from '../prompts/summarize-conversation.prompt'
import { suggestQuotePrompt } from '../prompts/suggest-quote.prompt'
import { Product } from '../models/product.model'
import { logger } from '../config/logger'

export class AiService {
  async parseSearchIntent(query: string) {
    const prompt = buildSearchIntentPrompt(query)
    const response = await aiRouter.route(prompt, true)
    
    try {
      const filters = JSON.parse(response.text)
      return { filters, provider: response.provider }
    } catch (e: any) {
      logger.error(`Failed to parse AI search intent JSON: ${e.message}`)
      return { filters: {}, provider: response.provider }
    }
  }

  async compareProducts(productIds: string[]) {
    const products = await Product.find({ _id: { $in: productIds } })
    if (products.length < 2) throw new Error('At least 2 products required for comparison')
    
    const prompt = buildComparisonPrompt(products)
    const response = await aiRouter.route(prompt, false)
    return { comparison: response.text, provider: response.provider }
  }

  async recommendProducts(buyerPreferences: any) {
    // 1. Mongo Query: Get top 10 loose matches
    // For simplicity, we just fetch 10 featured or recent products. 
    // In production, we'd build a dynamic query based on buyerPreferences.
    const top10 = await Product.find({ published: true, status: 'active' }).limit(10).lean()
    
    // 2. Ask AI to rank and explain
    const prompt = buildRecommendationPrompt(top10 as any, buyerPreferences)
    const response = await aiRouter.route(prompt, true)
    
    try {
      const recommendations = JSON.parse(response.text)
      return { recommendations, provider: response.provider }
    } catch (e: any) {
      logger.error(`Failed to parse AI recommendation JSON: ${e.message}`)
      return { recommendations: [], provider: response.provider }
    }
  }

  async generateQuoteDraft(productId: string, buyerContext: any) {
    const product = await Product.findById(productId)
    if (!product) throw new Error('Product not found')

    const prompt = buildQuotePrompt(product, buyerContext)
    const response = await aiRouter.route(prompt, false)
    return { draft: response.text, provider: response.provider }
  }

  async getProductSummary(productId: string) {
    const product = await Product.findById(productId)
    if (!product) throw new Error('Product not found')

    // 1. Check cache
    if (product.aiSummary) {
      return { summary: product.aiSummary, provider: product.aiSummaryProvider, cached: true }
    }

    // 2. Generate
    const prompt = buildSummaryPrompt(product)
    const response = await aiRouter.route(prompt, false)

    // 3. Save cache
    if (response.provider !== 'fallback') {
      product.aiSummary = response.text
      product.aiSummaryGeneratedAt = new Date()
      product.aiSummaryProvider = response.provider
      await product.save()
    }

    return { summary: response.text, provider: response.provider, cached: false }
  }

  async chat(query: string, history: any[] = []) {
    const prompt = buildChatPrompt(query, history)
    const response = await aiRouter.route(prompt, false)
    return { response: response.text, provider: response.provider }
  }

  async generateReply(context: any, conversation: any[]) {
    const prompt = generateReplyPrompt(context, conversation)
    const response = await aiRouter.route(prompt, false)
    return { reply: response.text, provider: response.provider }
  }

  async summarizeConversation(conversation: any[]) {
    const prompt = summarizeConversationPrompt(conversation)
    const response = await aiRouter.route(prompt, false)
    return { summary: response.text, provider: response.provider }
  }

  async suggestQuote(rfq: any, productContext: any, history: any[]) {
    const prompt = suggestQuotePrompt(rfq, productContext, history)
    const response = await aiRouter.route(prompt, true) // Expect JSON
    
    try {
      const suggestion = JSON.parse(response.text)
      return { suggestion, provider: response.provider }
    } catch (e: any) {
      logger.error(`Failed to parse AI quote suggestion JSON: ${e.message}`)
      return { suggestion: null, provider: response.provider }
    }
  }
}

export const aiService = new AiService()
