import { Request, Response } from 'express'
import { aiQueue } from '../services/queue.service'
import { aiService } from '../services/ai.service'
import { ProductIntelligenceBuilderV1 } from '../builders/product.v1'
import { RfqIntelligenceBuilderV1 } from '../builders/rfq.v1'
import { MaterialReviewBuilderV1 } from '../builders/material-review.v1'
import { CopilotIntentBuilderV1 } from '../builders/copilot.v1'
import { ProductIntelligenceSchema, RfqIntelligenceSchema, MaterialReviewSchema, CopilotIntentSchema } from '../schemas/ai.schema'
import { AiLog } from '../models/ai-log.model'

export class AiController {
  async getProductIntelligence(req: Request, res: Response) {
    try {
      const { product, supplier } = req.body
      if (!product || !supplier) {
        return res.status(400).json({ error: 'Product and supplier details required' })
      }

      const promptDetails = ProductIntelligenceBuilderV1.buildPrompt(product, supplier)
      
      const result = await aiQueue.enqueue(() => 
        aiService.executeTask(
          promptDetails, 
          'openrouter/auto', 
          ProductIntelligenceSchema, 
          ProductIntelligenceBuilderV1.version,
          req.user?._id?.toString()
        )
      )

      return res.json(result)
    } catch (error: any) {
      return res.status(500).json({ error: error.message })
    }
  }

  async getRfqAnalysis(req: Request, res: Response) {
    try {
      const { rfq } = req.body
      if (!rfq) return res.status(400).json({ error: 'RFQ details required' })

      const promptDetails = RfqIntelligenceBuilderV1.buildPrompt(rfq)
      const result = await aiQueue.enqueue(() => 
        aiService.executeTask(
          promptDetails, 
          'openrouter/auto', 
          RfqIntelligenceSchema, 
          RfqIntelligenceBuilderV1.version,
          req.user?._id?.toString()
        )
      )

      return res.json(result)
    } catch (error: any) {
      return res.status(500).json({ error: error.message })
    }
  }

  async getMaterialReview(req: Request, res: Response) {
    try {
      const { draft } = req.body
      if (!draft) return res.status(400).json({ error: 'Draft required' })

      const promptDetails = MaterialReviewBuilderV1.buildPrompt(draft)
      const result = await aiQueue.enqueue(() => 
        aiService.executeTask(
          promptDetails, 
          'openrouter/auto', 
          MaterialReviewSchema, 
          MaterialReviewBuilderV1.version,
          req.user?._id?.toString()
        )
      )

      return res.json(result)
    } catch (error: any) {
      return res.status(500).json({ error: error.message })
    }
  }

  async getCopilotIntent(req: Request, res: Response) {
    try {
      const { query } = req.body
      if (!query) return res.status(400).json({ error: 'Query required' })

      const promptDetails = CopilotIntentBuilderV1.buildPrompt(query)
      const result = await aiQueue.enqueue(() => 
        aiService.executeTask(
          promptDetails, 
          'openrouter/auto', 
          CopilotIntentSchema, 
          CopilotIntentBuilderV1.version,
          req.user?._id?.toString()
        )
      )

      return res.json(result)
    } catch (error: any) {
      return res.status(500).json({ error: error.message })
    }
  }

  async getHealth(_req: Request, res: Response) {
    try {
      const startOfDay = new Date()
      startOfDay.setHours(0, 0, 0, 0)
      
      const logs = await AiLog.find({ createdAt: { $gte: startOfDay } })
      const cachedLogs = logs.filter(l => l.cached).length
      
      const health = {
        status: 'healthy',
        provider: 'OpenRouter',
        defaultModel: 'google/gemini-2.5-flash',
        cacheHitRate: logs.length > 0 ? ((cachedLogs / logs.length) * 100).toFixed(1) + '%' : '0%',
        queueLength: aiQueue.getQueueLength(),
        averageLatency: logs.length > 0 ? (logs.reduce((acc, log) => acc + log.latency, 0) / logs.length).toFixed(0) + 'ms' : '0ms',
        requestsToday: logs.length,
        lastError: null
      }
      return res.json(health)
    } catch (error: any) {
      return res.status(500).json({ error: error.message })
    }
  }
}

export const aiController = new AiController()
