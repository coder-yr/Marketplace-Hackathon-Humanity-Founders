import { Request, Response } from 'express'
import { enterpriseAiService } from '../services/ai.service'
import { logger } from '../../config/logger'

// ── 1. Material Analysis ──────────────────────────────────────────────────────

export const materialAnalysis = async (req: Request, res: Response) => {
  try {
    const { productId, title, fabricType, composition, weight, width,
      certifications, country, moq, leadTime, priceRange, description } = req.body

    if (!fabricType && !title) {
      res.status(400).json({ error: 'fabricType or title is required' })
      return
    }

    const result = await enterpriseAiService.materialAnalysis({
      title: title || '',
      fabricType: fabricType || '',
      composition,
      weight,
      width,
      certifications,
      country,
      moq,
      leadTime,
      priceRange,
      description,
    })

    res.json({ data: result, productId, cached: false })
  } catch (error: any) {
    logger.error('materialAnalysis error:', error)
    res.status(500).json({ error: 'AI material analysis failed', details: error.message })
  }
}

// ── 2. RFQ Generator ─────────────────────────────────────────────────────────

export const rfqGenerator = async (req: Request, res: Response) => {
  try {
    const { description } = req.body
    if (!description || typeof description !== 'string' || description.trim().length < 5) {
      res.status(400).json({ error: 'description is required (minimum 5 characters)' })
      return
    }

    const result = await enterpriseAiService.rfqGenerator(description.trim())
    res.json({ data: result })
  } catch (error: any) {
    logger.error('rfqGenerator error:', error)
    res.status(500).json({ error: 'AI RFQ generation failed', details: error.message })
  }
}

// ── 3. Supplier Comparison ────────────────────────────────────────────────────

export const supplierComparison = async (req: Request, res: Response) => {
  try {
    const { suppliers, requirement } = req.body
    if (!Array.isArray(suppliers) || suppliers.length < 2) {
      res.status(400).json({ error: 'At least 2 supplier objects required' })
      return
    }

    const result = await enterpriseAiService.supplierComparison(suppliers, requirement)
    res.json({ data: result })
  } catch (error: any) {
    logger.error('supplierComparison error:', error)
    res.status(500).json({ error: 'AI supplier comparison failed', details: error.message })
  }
}

// ── 4. Quote Analysis ─────────────────────────────────────────────────────────

export const quoteAnalysis = async (req: Request, res: Response) => {
  try {
    const { quote, productContext } = req.body
    if (!quote) {
      res.status(400).json({ error: 'quote object is required' })
      return
    }

    const result = await enterpriseAiService.quoteIntelligence(quote, productContext)
    res.json({ data: result })
  } catch (error: any) {
    logger.error('quoteAnalysis error:', error)
    res.status(500).json({ error: 'AI quote analysis failed', details: error.message })
  }
}

// ── 5. Market Insights ────────────────────────────────────────────────────────

export const marketInsights = async (req: Request, res: Response) => {
  try {
    const { fabricType, region } = req.body
    if (!fabricType) {
      res.status(400).json({ error: 'fabricType is required' })
      return
    }

    const result = await enterpriseAiService.marketInsights(fabricType, region)
    res.json({ data: result })
  } catch (error: any) {
    logger.error('marketInsights error:', error)
    res.status(500).json({ error: 'AI market insights failed', details: error.message })
  }
}

// ── 6. Negotiation Assistant ──────────────────────────────────────────────────

export const negotiation = async (req: Request, res: Response) => {
  try {
    const { quote, supplier, buyerPreferences } = req.body
    if (!quote || !supplier) {
      res.status(400).json({ error: 'quote and supplier are required' })
      return
    }

    const result = await enterpriseAiService.negotiation(quote, supplier, buyerPreferences)
    res.json({ data: result })
  } catch (error: any) {
    logger.error('negotiation error:', error)
    res.status(500).json({ error: 'AI negotiation assistant failed', details: error.message })
  }
}

// ── 7. Enterprise Copilot ─────────────────────────────────────────────────────

export const copilot = async (req: Request, res: Response) => {
  try {
    const { query, history } = req.body
    if (!query || typeof query !== 'string' || query.trim().length === 0) {
      res.status(400).json({ error: 'query is required' })
      return
    }

    const result = await enterpriseAiService.copilot(query.trim(), history || [])
    res.json({ data: result })
  } catch (error: any) {
    logger.error('copilot error:', error)
    res.status(500).json({ error: 'AI copilot failed', details: error.message })
  }
}
