import { api } from '@/lib/axios'
import { Message } from '../types/messages.types'

export const messagesApi = {
  sendMessage: async (data: Partial<Message>) => {
    const res = await api.post<{ success: boolean; message: Message }>('/messages', data)
    return res.data
  },
  getContextMessages: async (contextId: string) => {
    const res = await api.get<{ success: boolean; messages: Message[] }>(`/messages/context/${contextId}`)
    return res.data
  },
  markAsRead: async (messageId: string) => {
    const res = await api.patch<{ success: boolean; message: Message }>(`/messages/${messageId}/read`)
    return res.data
  },
}
