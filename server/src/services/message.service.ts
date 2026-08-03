import { Message } from '../models/message.model'
import { notificationService } from './notification.service'

export class MessageService {
  async sendMessage(senderId: string, data: any) {
    const message = new Message({
      senderId,
      ...data,
      read: false,
    })
    await message.save()
    
    // Notify receiver
    // Don't flood notifications for every message, ideally we debounce or check online status,
    // but for now we'll do a simple notification.
    await notificationService.createNotification({
      userId: data.receiverId.toString(),
      type: 'New RFQ', // Could add a 'New Message' type, but using existing for now
      title: 'New Message',
      message: `You have a new message regarding your ${data.contextType}.`,
    })

    return message
  }

  async getContextMessages(contextId: string) {
    return Message.find({ contextId }).populate('senderId', 'fullName role').sort({ createdAt: 1 })
  }

  async markAsRead(messageId: string, receiverId: string) {
    const message = await Message.findOneAndUpdate(
      { _id: messageId, receiverId },
      { read: true },
      { new: true }
    )
    if (!message) throw new Error('Message not found')
    return message
  }
}

export const messageService = new MessageService()
