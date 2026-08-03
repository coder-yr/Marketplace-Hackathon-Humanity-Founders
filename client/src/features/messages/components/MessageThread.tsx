import { useState, useEffect, useRef } from 'react'
import { Message } from '../types/messages.types'
import { messagesApi } from '../api/messages.api'
import { useAuthStore } from '@/features/auth/store/auth.store'
import { Send, Loader2, User as UserIcon, MessageSquare } from 'lucide-react'

interface MessageThreadProps {
  contextType: 'RFQ' | 'Order'
  contextId: string
  receiverId: string
}

export function MessageThread({ contextType, contextId, receiverId }: MessageThreadProps) {
  const { user } = useAuthStore()
  const [messages, setMessages] = useState<Message[]>([])
  const [content, setContent] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [isSending, setIsSending] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    fetchMessages()
    // In a real app we'd poll or use WebSockets here
    const interval = setInterval(fetchMessages, 10000)
    return () => clearInterval(interval)
  }, [contextId])

  const fetchMessages = async () => {
    try {
      const res = await messagesApi.getContextMessages(contextId)
      if (res.success) {
        setMessages(res.messages)
        
        // Mark unread messages as read
        res.messages.forEach((msg: any) => {
          if (!msg.read && msg.receiverId === user?._id) {
            messagesApi.markAsRead(msg._id)
          }
        })
      }
    } catch (error) {
      console.error('Failed to fetch messages', error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!content.trim() || isSending) return

    setIsSending(true)
    try {
      const res = await messagesApi.sendMessage({
        receiverId,
        contextType,
        contextId,
        content
      })
      if (res.success) {
        setMessages([...messages, res.message])
        setContent('')
      }
    } catch (error) {
      console.error('Failed to send message', error)
    } finally {
      setIsSending(false)
    }
  }

  return (
    <div className="flex flex-col h-[500px] bg-surface-50 border border-border-color rounded-2xl overflow-hidden">
      <div className="p-4 border-b border-border-color bg-surface-1 flex items-center gap-2">
        <MessageSquare className="w-5 h-5 text-brand-primary" />
        <h3 className="font-bold text-text-primary">Conversation</h3>
      </div>

      <div className="flex-1 p-4 overflow-y-auto flex flex-col gap-4">
        {isLoading ? (
          <div className="flex justify-center items-center h-full">
            <Loader2 className="w-8 h-8 animate-spin text-brand-primary" />
          </div>
        ) : messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-text-tertiary">
            <MessageSquare className="w-12 h-12 mb-2 opacity-20" />
            <p>No messages yet.</p>
            <p className="text-xs mt-1">Start the conversation below.</p>
          </div>
        ) : (
          messages.map((msg, idx) => {
            const isMe = typeof msg.senderId === 'object' ? msg.senderId._id === user?._id : msg.senderId === user?._id
            const senderName = typeof msg.senderId === 'object' ? msg.senderId.fullName : 'User'

            return (
              <div key={msg._id || idx} className={`flex flex-col max-w-[80%] ${isMe ? 'self-end items-end' : 'self-start items-start'}`}>
                <div className="flex items-center gap-1.5 mb-1 text-xs text-text-tertiary">
                  {!isMe && <UserIcon className="w-3 h-3" />}
                  <span>{isMe ? 'You' : senderName}</span>
                  <span>•</span>
                  <span>{new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                </div>
                <div className={`px-4 py-2.5 rounded-2xl text-sm ${isMe ? 'bg-brand-primary text-white rounded-tr-sm' : 'bg-surface-2 text-text-primary rounded-tl-sm'}`}>
                  {msg.content}
                </div>
              </div>
            )
          })
        )}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSend} className="p-4 bg-surface-1 border-t border-border-color flex gap-2">
        <input
          type="text"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 bg-surface-50 border border-border-color rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-brand-primary"
          disabled={isSending}
        />
        <button
          type="submit"
          disabled={!content.trim() || isSending}
          className="bg-brand-primary hover:bg-brand-secondary text-white p-2.5 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
        >
          {isSending ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
        </button>
      </form>
    </div>
  )
}
