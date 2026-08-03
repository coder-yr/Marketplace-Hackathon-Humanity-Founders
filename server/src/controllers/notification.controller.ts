import { Request, Response } from 'express'
import { notificationService } from '../services/notification.service'

export class NotificationController {
  async getMyNotifications(req: Request, res: Response): Promise<void> {
    try {
      if (!req.user) {
        res.status(401).json({ success: false, message: 'Unauthorized' })
        return
      }

      const notifications = await notificationService.getUserNotifications((req.user as any)._id)
      const unreadCount = await notificationService.getUnreadCount((req.user as any)._id)

      res.status(200).json({ success: true, notifications, unreadCount })
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
      const notification = await notificationService.markAsRead(id, (req.user as any)._id)

      res.status(200).json({ success: true, notification })
    } catch (error: any) {
      if (error.message === 'Notification not found') {
        res.status(404).json({ success: false, message: error.message })
        return
      }
      res.status(500).json({ success: false, message: error.message })
    }
  }

  async markAllAsRead(req: Request, res: Response): Promise<void> {
    try {
      if (!req.user) {
        res.status(401).json({ success: false, message: 'Unauthorized' })
        return
      }

      await notificationService.markAllAsRead((req.user as any)._id)

      res.status(200).json({ success: true, message: 'All notifications marked as read' })
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message })
    }
  }
}

export const notificationController = new NotificationController()
