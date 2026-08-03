import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  X, Sparkles, Send, Search, Scale, MessageSquare,
  TrendingUp, History, Package, Activity, Store, Zap
} from 'lucide-react'
import { useAiStore } from '../store/ai.store'
import { chat } from '../api/ai.api'
import { Button } from '@/shared/components/ui/button'
import { useAuthStore } from '@/features/auth/store/auth.store'
import { transitionDrawer, transitionFast } from '@/shared/animations'

const QUICK_ACTIONS = [
  { icon: Search, label: 'Find Materials', prompt: 'I want to find materials.' },
  { icon: Scale, label: 'Compare Specs', prompt: 'How do I compare fabrics?' },
  { icon: FileText, label: 'Generate RFQ', prompt: 'Help me draft an RFQ.' },
  { icon: MessageSquare, label: 'Explain Terms', prompt: 'What is GSM?' },
]

const AI_INSIGHTS = [
  { icon: TrendingUp, title: 'Trending Today', value: 'Organic Cotton (+24%)', trend: 'up' },
  { icon: Package, title: 'Popular Spec', value: '180-220 GSM Jersey', trend: 'neutral' },
  { icon: Store, title: 'Top Supplier', value: 'EcoTextiles India', trend: 'up' },
  { icon: Activity, title: 'Demand Alert', value: 'Recycled Poly Shortage', trend: 'down' },
]

import { FileText } from 'lucide-react'

export function AiMarketplaceCopilot() {
  const { user } = useAuthStore()
  const { isOpen, toggleOpen, setIsOpen, messages, addMessage, isLoading, setLoading } = useAiStore()
  const [input, setInput] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages])

  const handleSend = async (text: string = input) => {
    if (!text.trim() || isLoading) return

    addMessage({ role: 'user', content: text, timestamp: new Date().toISOString() })
    setInput('')
    setLoading(true)

    try {
      const { response } = await chat(text, messages)
      addMessage({ role: 'assistant', content: response, timestamp: new Date().toISOString() })
    } catch (error) {
      addMessage({ role: 'assistant', content: 'AI is temporarily unavailable. Standard search is active.', timestamp: new Date().toISOString() })
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={toggleOpen}
        className="fixed bottom-8 right-8 z-50 p-4 rounded-full bg-[var(--surface-0)] border border-[var(--color-brand-primary)] text-brand-primary shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-[0_12px_40px_rgb(37,99,235,0.2)] hover:scale-105 active:scale-95 transition-all duration-200 flex items-center justify-center group"
      >
        <Sparkles className="w-6 h-6 animate-pulse" />
        <span className="absolute right-full mr-4 bg-[var(--surface-1)] text-[var(--text-primary)] px-3 py-1.5 rounded-lg text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-md pointer-events-none border border-[var(--border-color)]">
          Command Center
        </span>
      </button>

      {/* Copilot Drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
            />
            <motion.div
              initial={{ x: '100%', opacity: 0.5 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: '100%', opacity: 0.5 }}
              transition={transitionDrawer}
              className="fixed top-0 right-0 bottom-0 w-full sm:w-[500px] bg-[var(--surface-0)] z-50 shadow-2xl flex flex-col border-l border-[var(--border-color)]"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-[var(--border-color)] bg-[var(--surface-0)]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-brand-primary/10 flex items-center justify-center text-brand-primary shadow-sm border border-brand-primary/20">
                    <Zap className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-[var(--text-primary)] text-lg leading-none">Copilot</h3>
                    <span className="text-[10px] uppercase tracking-wider font-bold text-[var(--text-secondary)]">Procurement AI</span>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-xl text-[var(--text-tertiary)] hover:bg-[var(--surface-2)] hover:text-[var(--text-primary)] transition-colors border border-transparent hover:border-[var(--border-color)]"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Scrollable Content */}
              <div className="flex-1 overflow-y-auto bg-[var(--surface-0)]">
                {messages.length === 0 ? (
                  <div className="p-6 flex flex-col gap-8">
                    
                    {/* Welcome Banner */}
                    <div>
                      <h2 className="text-2xl font-display font-bold text-[var(--text-primary)] mb-1">
                        Good afternoon{user ? `, ${(user as any).name?.split(' ')[0] || (user as any).email.split('@')[0]}` : ''}
                      </h2>
                      <p className="text-sm text-[var(--text-secondary)]">How can I help source materials today?</p>
                    </div>

                    {/* Quick Actions */}
                    <div>
                      <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--text-tertiary)] mb-3">Quick Actions</h3>
                      <div className="grid grid-cols-2 gap-3">
                        {QUICK_ACTIONS.map((action, idx) => (
                          <button
                            key={idx}
                            onClick={() => handleSend(action.prompt)}
                            className="flex items-center gap-3 p-3 rounded-xl border border-[var(--border-color)] bg-[var(--surface-1)] hover:bg-[var(--surface-2)] hover:border-[var(--color-brand-primary)]/40 transition-colors text-left group"
                          >
                            <div className="p-2 rounded-lg bg-[var(--surface-0)] shadow-sm border border-[var(--border-color-subtle)] group-hover:text-brand-primary transition-colors">
                              <action.icon className="w-4 h-4" />
                            </div>
                            <span className="text-xs font-semibold text-[var(--text-primary)]">{action.label}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* AI Insights Widgets */}
                    <div>
                      <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--text-tertiary)] mb-3 flex items-center gap-2">
                        <Sparkles className="w-3.5 h-3.5 text-brand-primary" /> Market Insights
                      </h3>
                      <div className="grid grid-cols-2 gap-3">
                        {AI_INSIGHTS.map((insight, idx) => (
                          <div key={idx} className="p-4 rounded-xl border border-[var(--border-color)] bg-gradient-to-br from-[var(--surface-1)] to-[var(--surface-0)]">
                            <div className="flex items-center gap-2 mb-2 text-[var(--text-secondary)]">
                              <insight.icon className="w-3.5 h-3.5" />
                              <span className="text-[10px] font-bold uppercase tracking-wider">{insight.title}</span>
                            </div>
                            <div className="text-sm font-bold text-[var(--text-primary)]">{insight.value}</div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Recent Searches */}
                    <div>
                      <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--text-tertiary)] mb-3 flex items-center gap-2">
                        <History className="w-3.5 h-3.5" /> Recent Queries
                      </h3>
                      <div className="flex flex-col gap-2">
                        {['"Heavyweight denim under $4/m"', '"GOTS certified organic cotton suppliers in India"', '"Compare Viscose vs Bamboo Lyocell"'].map((query, idx) => (
                          <button 
                            key={idx}
                            onClick={() => handleSend(query.replace(/"/g, ''))}
                            className="text-left text-xs text-[var(--text-secondary)] hover:text-brand-primary p-2 rounded-lg hover:bg-[var(--surface-1)] transition-colors border border-transparent hover:border-[var(--border-color)]"
                          >
                            {query}
                          </button>
                        ))}
                      </div>
                    </div>

                  </div>
                ) : (
                  <div className="p-6 space-y-6">
                    {messages.map((msg, idx) => (
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={transitionFast}
                        key={idx} 
                        className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
                      >
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-tertiary)] mb-1.5 px-1">
                          {msg.role === 'user' ? 'You' : 'Copilot'}
                        </span>
                        <div
                          className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm shadow-sm leading-relaxed ${
                            msg.role === 'user'
                              ? 'bg-[var(--color-brand-primary)] text-white rounded-tr-sm'
                              : 'bg-[var(--surface-1)] text-[var(--text-primary)] border border-[var(--border-color)] rounded-tl-sm'
                          }`}
                        >
                          <p className="whitespace-pre-wrap">{msg.content}</p>
                        </div>
                      </motion.div>
                    ))}
                    {isLoading && (
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-start">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-tertiary)] mb-1.5 px-1">Copilot</span>
                        <div className="bg-[var(--surface-1)] border border-[var(--border-color)] rounded-2xl rounded-tl-sm px-5 py-3.5 flex items-center gap-2 shadow-sm">
                          <div className="w-1.5 h-1.5 rounded-full bg-[var(--text-tertiary)] animate-pulse" />
                          <div className="w-1.5 h-1.5 rounded-full bg-[var(--text-tertiary)] animate-pulse delay-75" />
                          <div className="w-1.5 h-1.5 rounded-full bg-[var(--text-tertiary)] animate-pulse delay-150" />
                        </div>
                      </motion.div>
                    )}
                    <div ref={messagesEndRef} />
                  </div>
                )}
              </div>

              {/* Input Area */}
              <div className="p-4 border-t border-[var(--border-color)] bg-[var(--surface-0)]">
                <form
                  onSubmit={(e) => {
                    e.preventDefault()
                    handleSend()
                  }}
                  className="flex items-center gap-3 bg-[var(--surface-1)] border border-[var(--border-color)] rounded-xl p-1.5 pr-2 focus-within:ring-2 focus-within:ring-brand-primary/20 focus-within:border-brand-primary transition-all shadow-inner"
                >
                  <Search className="w-4 h-4 ml-3 text-[var(--text-tertiary)] shrink-0" />
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask Copilot anything..."
                    className="flex-1 bg-transparent border-none text-sm px-2 py-2.5 focus:outline-none text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)]"
                  />
                  <Button
                    type="submit"
                    disabled={!input.trim() || isLoading}
                    size="sm"
                    className="rounded-lg h-9 w-9 p-0 flex items-center justify-center shrink-0 shadow-sm"
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </form>
                <div className="flex items-center justify-between mt-3 px-1">
                  <span className="text-[10px] font-medium text-[var(--text-muted)] flex items-center gap-1">
                    <Sparkles className="w-3 h-3" /> Copilot can make mistakes.
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-tertiary)]">
                    Cmd + K
                  </span>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
