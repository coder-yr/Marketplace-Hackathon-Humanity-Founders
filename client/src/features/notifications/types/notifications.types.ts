export interface AppNotification {
  _id: string
  userId: string
  type: 'New RFQ' | 'Quote Received' | 'Order Updated' | 'AI Recommendation' | 'Product Published'
  title: string
  message: string
  link?: string
  isRead: boolean
  createdAt: string
  updatedAt: string
}
