import { Request, Response } from 'express'
import { aiService } from '../services/ai.service'
import { logger } from '../config/logger'

export const parseSearchIntent = async (req: Request, res: Response) => {
  try {
    const { query } = req.body
    if (!query) {
      res.status(400).json({ error: 'Query is required' })
      return
    }

    const result = await aiService.parseSearchIntent(query)
    res.json(result)
  } catch (error: any) {
    logger.error('parseSearchIntent error:', error)
    res.status(500).json({ error: 'Failed to parse search intent' })
  }
}

export const compareProducts = async (req: Request, res: Response) => {
  try {
    const { productIds } = req.body
    if (!productIds || !Array.isArray(productIds) || productIds.length < 2) {
      res.status(400).json({ error: 'Provide at least 2 productIds' })
      return
    }

    const result = await aiService.compareProducts(productIds)
    res.json(result)
  } catch (error: any) {
    logger.error('compareProducts error:', error)
    res.status(500).json({ error: 'Failed to compare products' })
  }
}

export const recommendProducts = async (req: Request, res: Response) => {
  try {
    const buyerPreferences = (req as any).user ? { userId: (req as any).user._id } : { role: 'guest' }
    const result = await aiService.recommendProducts(buyerPreferences)
    res.json(result)
  } catch (error: any) {
    logger.error('recommendProducts error:', error)
    res.status(500).json({ error: 'Failed to recommend products' })
  }
}

export const generateQuoteDraft = async (req: Request, res: Response) => {
  try {
    const { productId } = req.body
    if (!productId) {
      res.status(400).json({ error: 'productId is required' })
      return
    }

    const buyerContext = (req as any).user || { name: 'Valued Buyer' }
    const result = await aiService.generateQuoteDraft(productId, buyerContext)
    res.json(result)
  } catch (error: any) {
    logger.error('generateQuoteDraft error:', error)
    res.status(500).json({ error: 'Failed to generate quote draft' })
  }
}

export const getProductSummary = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params
    if (!productId) {
      res.status(400).json({ error: 'productId is required' })
      return
    }

    const result = await aiService.getProductSummary(productId as string)
    res.json(result)
  } catch (error: any) {
    logger.error('getProductSummary error:', error)
    res.status(500).json({ error: 'Failed to generate product summary' })
  }
}

export const chat = async (req: Request, res: Response) => {
  try {
    const { query, history } = req.body
    if (!query) {
      res.status(400).json({ error: 'Query is required' })
      return
    }

    const result = await aiService.chat(query as string, history)
    res.json(result)
  } catch (error: any) {
    logger.error('chat error:', error)
    res.status(500).json({ error: 'Failed to process chat' })
  }
}

export const generateReply = async (req: Request, res: Response) => {
  try {
    const { context, conversation } = req.body
    const result = await aiService.generateReply(context, conversation)
    res.json(result)
  } catch (error: any) {
    logger.error('generateReply error:', error)
    res.status(500).json({ error: 'Failed to generate reply' })
  }
}

export const summarizeConversation = async (req: Request, res: Response) => {
  try {
    const { conversation } = req.body
    const result = await aiService.summarizeConversation(conversation)
    res.json(result)
  } catch (error: any) {
    logger.error('summarizeConversation error:', error)
    res.status(500).json({ error: 'Failed to summarize conversation' })
  }
}

export const suggestQuote = async (req: Request, res: Response) => {
  try {
    const { rfq, productContext, history } = req.body
    const result = await aiService.suggestQuote(rfq, productContext, history)
    res.json(result)
  } catch (error: any) {
    logger.error('suggestQuote error:', error)
    res.status(500).json({ error: 'Failed to suggest quote' })
  }
}

export const supplierRecommendations = async (_req: Request, res: Response) => {
  // Placeholder for the route
  res.json({ recommendations: [], provider: 'fallback' })
}

export const draftRfq = async (_req: Request, res: Response) => {
  // Placeholder for the route
  res.json({ draft: '', provider: 'fallback' })
}
