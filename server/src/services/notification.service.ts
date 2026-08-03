import { Notification } from '../models/notification.model'

export class NotificationService {
  /**
   * Create a new notification
   */
  async createNotification(data: {
    userId: string
    type: 'New RFQ' | 'Quote Received' | 'Order Updated' | 'AI Recommendation' | 'Product Published'
    title: string
    message: string
    link?: string
  }) {
    const notification = new Notification(data)
    await notification.save()
    return notification
  }

  /**
   * Get all notifications for a user
   */
  async getUserNotifications(userId: string) {
    return Notification.find({ userId }).sort({ createdAt: -1 }).limit(50)
  }

  /**
   * Get unread notification count
   */
  async getUnreadCount(userId: string) {
    return Notification.countDocuments({ userId, isRead: false })
  }

  /**
   * Mark notification as read
   */
  async markAsRead(notificationId: string, userId: string) {
    const notification = await Notification.findOneAndUpdate(
      { _id: notificationId, userId },
      { isRead: true },
      { new: true }
    )
    if (!notification) throw new Error('Notification not found')
    return notification
  }

  /**
   * Mark all notifications as read for a user
   */
  async markAllAsRead(userId: string) {
    await Notification.updateMany({ userId, isRead: false }, { isRead: true })
    return { success: true }
  }
}

export const notificationService = new NotificationService()
