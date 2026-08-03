import { api } from '@/lib/axios'
import { AppNotification } from '../types/notifications.types'

export const notificationsApi = {
  getMyNotifications: async () => {
    const res = await api.get<{ success: boolean; notifications: AppNotification[]; unreadCount: number }>('/notifications')
    return res.data
  },
  markAsRead: async (notificationId: string) => {
    const res = await api.put<{ success: boolean; notification: AppNotification }>(`/notifications/${notificationId}/read`)
    return res.data
  },
  markAllAsRead: async () => {
    const res = await api.put<{ success: boolean }>('/notifications/mark-all-read')
    return res.data
  },
}
