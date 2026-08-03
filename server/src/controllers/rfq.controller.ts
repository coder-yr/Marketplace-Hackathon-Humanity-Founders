import { Request, Response } from 'express'
import { rfqService } from '../services/rfq.service'

export class RfqController {
  async createRfq(req: Request, res: Response): Promise<void> {
    try {
      if (!req.user) {
        res.status(401).json({ success: false, message: 'Unauthorized' })
        return
      }

      const rfq = await rfqService.createRfq((req.user as any)._id, req.body)
      res.status(201).json({ success: true, rfq })
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message })
    }
  }

  async getBuyerRfqs(req: Request, res: Response): Promise<void> {
    try {
      if (!req.user) {
        res.status(401).json({ success: false, message: 'Unauthorized' })
        return
      }

      const rfqs = await rfqService.getBuyerRfqs((req.user as any)._id)
      res.status(200).json({ success: true, rfqs })
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message })
    }
  }

  async getSupplierRfqs(req: Request, res: Response): Promise<void> {
    try {
      if (!req.user) {
        res.status(401).json({ success: false, message: 'Unauthorized' })
        return
      }

      const rfqs = await rfqService.getSupplierRfqs((req.user as any)._id)
      res.status(200).json({ success: true, rfqs })
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message })
    }
  }

  async getRfqById(req: Request, res: Response): Promise<void> {
    try {
      const rfq = await rfqService.getRfqById((req.params.id as string))
      if (!rfq) {
        res.status(404).json({ success: false, message: 'RFQ not found' })
        return
      }
      res.status(200).json({ success: true, rfq })
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message })
    }
  }
}

export const rfqController = new RfqController()
