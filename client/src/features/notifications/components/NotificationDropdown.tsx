import { useState, useEffect, useRef } from 'react'
import { Bell, Check, CheckCircle2, AlertTriangle, Info, Package, MessageSquare } from 'lucide-react'
import { notificationsApi } from '../api/notifications.api'
import { AppNotification } from '../types/notifications.types'
import { useAuthStore } from '@/features/auth/store/auth.store'

export function NotificationDropdown() {
  const { user } = useAuthStore()
  const [isOpen, setIsOpen] = useState(false)
  const [notifications, setNotifications] = useState<AppNotification[]>([])
  const [unreadCount, setUnreadCount] = useState(0)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (user) {
      fetchNotifications()
    }
  }, [user])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const fetchNotifications = async () => {
    try {
      const res = await notificationsApi.getMyNotifications()
      if (res.success) {
        setNotifications(res.notifications)
        setUnreadCount(res.unreadCount)
      }
    } catch (error) {
      console.error('Failed to fetch notifications', error)
    }
  }

  const handleMarkAsRead = async (id: string) => {
    try {
      await notificationsApi.markAsRead(id)
      setNotifications(notifications.map(n => n._id === id ? { ...n, isRead: true } : n))
      setUnreadCount(Math.max(0, unreadCount - 1))
    } catch (error) {
      console.error('Failed to mark read', error)
    }
  }

  const handleMarkAllRead = async () => {
    try {
      await notificationsApi.markAllAsRead()
      setNotifications(notifications.map(n => ({ ...n, isRead: true })))
      setUnreadCount(0)
    } catch (error) {
      console.error('Failed to mark all read', error)
    }
  }

  const getIcon = (type: string) => {
    switch (type) {
      case 'New RFQ': return <MessageSquare className="w-4 h-4 text-brand-primary" />
      case 'Quote Received': return <CheckCircle2 className="w-4 h-4 text-success" />
      case 'Order Updated': return <Package className="w-4 h-4 text-warning" />
      case 'AI Recommendation': return <AlertTriangle className="w-4 h-4 text-brand-secondary" />
      default: return <Info className="w-4 h-4 text-text-tertiary" />
    }
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 rounded-full hover:bg-surface-2 transition-colors"
      >
        <Bell className="w-5 h-5 text-text-secondary" />
        {unreadCount > 0 && (
          <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-error rounded-full border-2 border-surface-50"></span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-surface-50 border border-border-color rounded-2xl shadow-xl overflow-hidden z-50">
          <div className="flex items-center justify-between p-4 border-b border-border-color bg-surface-1">
            <h3 className="font-bold text-text-primary text-sm">Notifications</h3>
            {unreadCount > 0 && (
              <button 
                onClick={handleMarkAllRead}
                className="text-xs text-brand-primary font-medium flex items-center gap-1 hover:underline"
              >
                <Check className="w-3 h-3" /> Mark all read
              </button>
            )}
          </div>
          
          <div className="max-h-[400px] overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="p-8 text-center text-text-tertiary">
                <Bell className="w-8 h-8 mx-auto mb-2 opacity-20" />
                <p className="text-sm">No notifications yet</p>
              </div>
            ) : (
              <div className="flex flex-col">
                {notifications.map((n) => (
                  <div 
                    key={n._id} 
                    onClick={() => !n.isRead && handleMarkAsRead(n._id)}
                    className={`p-4 border-b border-border-color last:border-0 hover:bg-surface-1 cursor-pointer transition-colors flex gap-3 ${!n.isRead ? 'bg-brand-primary/5' : ''}`}
                  >
                    <div className="mt-1 flex-shrink-0">
                      {getIcon(n.type)}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-text-primary mb-1">{n.title}</p>
                      <p className="text-xs text-text-secondary leading-relaxed">{n.message}</p>
                      <span className="text-[10px] text-text-tertiary mt-2 block">
                        {new Date(n.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
