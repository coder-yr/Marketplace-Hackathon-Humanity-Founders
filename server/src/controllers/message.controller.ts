import { Request, Response } from 'express'
import { messageService } from '../services/message.service'

export class MessageController {
  async sendMessage(req: Request, res: Response): Promise<void> {
    try {
      if (!req.user) {
        res.status(401).json({ success: false, message: 'Unauthorized' })
        return
      }

      const message = await messageService.sendMessage((req.user as any)._id, req.body)
      res.status(201).json({ success: true, message })
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message })
    }
  }

  async getContextMessages(req: Request, res: Response): Promise<void> {
    try {
      if (!req.user) {
        res.status(401).json({ success: false, message: 'Unauthorized' })
        return
      }

      const contextId = req.params.contextId as string
      const messages = await messageService.getContextMessages(contextId)
      res.status(200).json({ success: true, messages })
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message })
    }
  }

  async markAsRead(req: Request, res: Response): Promise<void> {
    try {
      if (!req.user) {
        res.status(401).json({ success: false, message: 'Unauthorized' })
        return
      }

      const id = req.params.id as string
      const message = await messageService.markAsRead(id, (req.user as any)._id)
      res.status(200).json({ success: true, message })
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message })
    }
  }
}

export const messageController = new MessageController()
