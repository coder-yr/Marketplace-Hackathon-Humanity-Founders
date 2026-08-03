import { Request, Response } from 'express'
import { quoteService } from '../services/quote.service'

export class QuoteController {
  async createQuote(req: Request, res: Response): Promise<void> {
    try {
      if (!req.user || req.user.role !== 'supplier') {
        res.status(403).json({ success: false, message: 'Only suppliers can create quotes' })
        return
      }

      const quote = await quoteService.createQuote((req.user as any)._id, req.body)
      res.status(201).json({ success: true, quote })
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message })
    }
  }

  async getBuyerQuotes(req: Request, res: Response): Promise<void> {
    try {
      if (!req.user) {
        res.status(401).json({ success: false, message: 'Unauthorized' })
        return
      }

      const quotes = await quoteService.getBuyerQuotes((req.user as any)._id)
      res.status(200).json({ success: true, quotes })
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message })
    }
  }

  async getSupplierQuotes(req: Request, res: Response): Promise<void> {
    try {
      if (!req.user) {
        res.status(401).json({ success: false, message: 'Unauthorized' })
        return
      }

      const quotes = await quoteService.getSupplierQuotes((req.user as any)._id)
      res.status(200).json({ success: true, quotes })
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message })
    }
  }

  async getQuoteById(req: Request, res: Response): Promise<void> {
    try {
      const quote = await quoteService.getQuoteById((req.params.id as string))
      if (!quote) {
        res.status(404).json({ success: false, message: 'Quote not found' })
        return
      }
      res.status(200).json({ success: true, quote })
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message })
    }
  }

  async updateQuoteStatus(req: Request, res: Response): Promise<void> {
    try {
      if (!req.user || req.user.role !== 'buyer') {
        res.status(403).json({ success: false, message: 'Only buyers can accept/reject quotes' })
        return
      }

      const { status } = req.body
      const quote = await quoteService.updateQuoteStatus((req.params.id as string), status)
      res.status(200).json({ success: true, quote })
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message })
    }
  }
}

export const quoteController = new QuoteController()
