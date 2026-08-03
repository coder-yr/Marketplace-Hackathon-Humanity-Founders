import { User } from '@/features/auth/types/auth.types'

export interface Message {
  _id: string
  senderId: User
  receiverId: User | string
  contextType: 'RFQ' | 'Order'
  contextId: string
  content: string
  attachments?: string[]
  read: boolean
  createdAt: string
  updatedAt: string
}
