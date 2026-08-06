import { useState, useEffect, useRef } from 'react'
import { Command } from 'cmdk'
import { useNavigate } from 'react-router-dom'
import { 
  FileText, Truck, ArrowRight, Sparkles, 
  Calculator, Layers, ShieldCheck, Loader2,
  Zap, MessageSquare
} from 'lucide-react'
import { copilotQuery } from '../api/ai.api'
import type { CopilotIntent } from '../types/ai.types'

export function EnterpriseCopilot() {
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)
  const [aiResponse, setAiResponse] = useState<CopilotIntent | null>(null)
  const [history, setHistory] = useState<Array<{ role: string; content: string }>>([])
  const abortRef = useRef<AbortController | null>(null)
  const navigate = useNavigate()

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }

    document.addEventListener('keydown', down)
    return () => document.removeEventListener('keydown', down)
  }, [])

  // Clear AI state when panel closes
  useEffect(() => {
    if (!open) {
      setSearch('')
      setAiResponse(null)
      setIsProcessing(false)
    }
  }, [open])

  const runCommand = (command: () => void) => {
    setOpen(false)
    command()
  }

  const executeIntent = (intent: CopilotIntent) => {
    switch (intent.intent) {
      case 'supplier_search':
        runCommand(() => navigate(`/marketplace?search=${encodeURIComponent(intent.params.searchQuery || intent.params.fabricType || search)}&filter=verified`))
        break
      case 'material_search':
        runCommand(() => navigate(`/marketplace?search=${encodeURIComponent(intent.params.searchQuery || intent.params.fabricType || search)}`))
        break
      case 'rfq_generate':
        runCommand(() => navigate('/dashboard/rfqs'))
        break
      case 'compare':
        runCommand(() => navigate('/marketplace?view=compare'))
        break
      case 'navigate':
        runCommand(() => navigate(intent.action || '/'))
        break
      case 'knowledge':
      default:
        // Already shows inline — do nothing (keep panel open)
        break
    }
  }

  const handleAiSearch = async () => {
    if (!search.trim() || isProcessing) return

    // Abort any in-flight request
    if (abortRef.current) abortRef.current.abort()
    abortRef.current = new AbortController()

    setIsProcessing(true)
    setAiResponse(null)

    try {
      const result = await copilotQuery(search.trim(), history)
      const intent = result.data
      setAiResponse(intent)

      // Update history
      setHistory(prev => [
        ...prev.slice(-4),
        { role: 'user', content: search },
        { role: 'assistant', content: intent.response },
      ])

      // Auto-navigate for action intents (not knowledge)
      if (intent.intent !== 'knowledge') {
        // Small delay so user sees the response before navigation
        setTimeout(() => executeIntent(intent), 600)
      }
    } catch (error: any) {
      if (error.name !== 'AbortError') {
        // Graceful fallback — navigate with raw search
        runCommand(() => navigate(`/marketplace?search=${encodeURIComponent(search)}`))
      }
    } finally {
      setIsProcessing(false)
    }
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh]">
      <div 
        className="fixed inset-0 bg-[#0A2540]/40 backdrop-blur-sm transition-opacity" 
        onClick={() => setOpen(false)}
      />
      <div className="relative w-full max-w-2xl bg-white rounded-[24px] shadow-2xl border border-[var(--border)] overflow-hidden flex flex-col">
        <Command
          shouldFilter={false}
          className="w-full flex flex-col bg-transparent font-sans"
        >
          <div className="flex items-center border-b border-[var(--border)] px-4">
            {isProcessing ? (
              <Loader2 className="w-5 h-5 text-[var(--primary)] animate-spin" />
            ) : (
              <Sparkles className="w-5 h-5 text-[var(--primary)]" />
            )}
            <Command.Input
              autoFocus
              value={search}
              onValueChange={(val) => {
                setSearch(val)
                // Clear AI response when user starts typing again
                if (aiResponse) setAiResponse(null)
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && search) {
                  handleAiSearch()
                }
              }}
              placeholder="Ask AI: find suppliers, generate RFQ, analyze quote..."
              className="flex-1 h-14 bg-transparent border-none focus:ring-0 text-[var(--heading)] placeholder:text-[#94A3B8] text-lg px-4 outline-none font-medium"
            />
            <div className="hidden sm:flex items-center gap-1.5 px-2 py-1 bg-[#F1F5F9] rounded-[6px] text-[10px] font-bold text-[#94A3B8] uppercase tracking-wider">
              <span>ESC</span> to close
            </div>
          </div>

          <div className="overflow-y-auto max-h-[60vh] p-2 custom-scrollbar">
            {/* AI Processing State */}
            {isProcessing && (
              <div className="p-3 mx-2 mb-2 rounded-[12px] bg-[var(--primary)]/5 border border-[var(--primary)]/20">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-[8px] bg-[var(--primary)]/10 flex items-center justify-center">
                    <Loader2 className="w-4 h-4 text-[var(--primary)] animate-spin" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-[var(--heading)]">AI Copilot is analyzing...</p>
                    <p className="text-[12px] font-medium text-[var(--body)]">Routing to the best action for "{search}"</p>
                  </div>
                </div>
              </div>
            )}

            {/* AI Intent Response */}
            {aiResponse && !isProcessing && (
              <div className="p-3 mx-2 mb-2 rounded-[12px] bg-[var(--primary)]/5 border border-[var(--primary)]/20">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-[8px] bg-[var(--primary)]/10 flex items-center justify-center shrink-0 mt-0.5">
                    <Sparkles className="w-4 h-4 text-[var(--primary)]" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="text-sm font-bold text-[var(--heading)]">AI Copilot</p>
                      <span className="text-[10px] font-bold text-[var(--primary)] bg-[var(--primary)]/10 px-1.5 py-0.5 rounded uppercase tracking-wider">{aiResponse.intent.replace('_', ' ')}</span>
                      <span className="text-[10px] text-[#94A3B8] font-bold">{aiResponse.confidence}% confidence</span>
                    </div>
                    <p className="text-[13px] font-medium text-[var(--body)]">{aiResponse.response}</p>
                    {aiResponse.intent !== 'knowledge' && (
                      <button
                        onClick={() => executeIntent(aiResponse)}
                        className="mt-2 flex items-center gap-1.5 text-[12px] font-bold text-[var(--primary)] hover:underline"
                      >
                        {aiResponse.action} <ArrowRight className="w-3 h-3" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Quick Search Prompt */}
            {search.length > 0 && !isProcessing && !aiResponse && (
              <div className="p-2">
                <div 
                  onClick={handleAiSearch}
                  className="flex items-center gap-3 px-4 py-3 rounded-[12px] bg-[var(--primary)]/5 hover:bg-[var(--primary)]/10 border border-[var(--primary)]/20 cursor-pointer transition-colors"
                >
                  <div className="w-8 h-8 rounded-[8px] bg-[var(--primary)]/20 flex items-center justify-center text-[var(--primary)]">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-bold text-[var(--heading)]">Ask AI: "{search}"</p>
                    <p className="text-[12px] font-medium text-[var(--body)]">Copilot will intelligently route your request</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-[var(--primary)]" />
                </div>
              </div>
            )}

            <Command.List>
              <Command.Empty className="py-6 text-center text-[13px] font-medium text-[var(--body)]">
                No commands found.
              </Command.Empty>

              <Command.Group heading="Procurement OS" className="px-2 py-2 text-[11px] font-bold uppercase tracking-widest text-[#94A3B8]">
                <Command.Item 
                  onSelect={() => runCommand(() => navigate('/dashboard/rfqs'))}
                  className="flex items-center gap-3 px-3 py-2.5 mt-1 rounded-[10px] hover:bg-[#F8FAFC] cursor-pointer text-[13px] font-bold text-[var(--heading)] aria-selected:bg-[#F8FAFC]"
                >
                  <FileText className="w-4 h-4 text-[var(--body)]" />
                  Procurement Workspace (RFQs)
                </Command.Item>
                <Command.Item 
                  onSelect={() => runCommand(() => navigate('/dashboard/orders'))}
                  className="flex items-center gap-3 px-3 py-2.5 mt-1 rounded-[10px] hover:bg-[#F8FAFC] cursor-pointer text-[13px] font-bold text-[var(--heading)] aria-selected:bg-[#F8FAFC]"
                >
                  <Truck className="w-4 h-4 text-[var(--body)]" />
                  Logistics &amp; Order Tracking
                </Command.Item>
                <Command.Item 
                  onSelect={() => runCommand(() => navigate('/dashboard/analytics'))}
                  className="flex items-center gap-3 px-3 py-2.5 mt-1 rounded-[10px] hover:bg-[#F8FAFC] cursor-pointer text-[13px] font-bold text-[var(--heading)] aria-selected:bg-[#F8FAFC]"
                >
                  <Calculator className="w-4 h-4 text-[var(--body)]" />
                  Analytics Dashboard
                </Command.Item>
              </Command.Group>

              <Command.Separator className="h-[1px] bg-[var(--border)] my-2" />

              <Command.Group heading="Supplier Intelligence" className="px-2 py-2 text-[11px] font-bold uppercase tracking-widest text-[#94A3B8]">
                <Command.Item 
                  onSelect={() => runCommand(() => navigate('/marketplace?filter=verified'))}
                  className="flex items-center gap-3 px-3 py-2.5 mt-1 rounded-[10px] hover:bg-[#F8FAFC] cursor-pointer text-[13px] font-bold text-[var(--heading)] aria-selected:bg-[#F8FAFC]"
                >
                  <ShieldCheck className="w-4 h-4 text-[var(--success)]" />
                  Browse Verified Suppliers
                </Command.Item>
                <Command.Item 
                  onSelect={() => runCommand(() => navigate('/categories'))}
                  className="flex items-center gap-3 px-3 py-2.5 mt-1 rounded-[10px] hover:bg-[#F8FAFC] cursor-pointer text-[13px] font-bold text-[var(--heading)] aria-selected:bg-[#F8FAFC]"
                >
                  <Layers className="w-4 h-4 text-[var(--body)]" />
                  Explore Material Categories
                </Command.Item>
              </Command.Group>

              <Command.Separator className="h-[1px] bg-[var(--border)] my-2" />

              <Command.Group heading="AI Quick Actions" className="px-2 py-2 text-[11px] font-bold uppercase tracking-widest text-[#94A3B8]">
                <Command.Item 
                  onSelect={() => { setSearch('Find Turkish denim mills'); handleAiSearch() }}
                  className="flex items-center gap-3 px-3 py-2.5 mt-1 rounded-[10px] hover:bg-[#F8FAFC] cursor-pointer text-[13px] font-bold text-[var(--heading)] aria-selected:bg-[#F8FAFC]"
                >
                  <Zap className="w-4 h-4 text-[#FDE047]" />
                  Find Turkish denim mills
                </Command.Item>
                <Command.Item 
                  onSelect={() => { setSearch('Generate RFQ for organic cotton'); handleAiSearch() }}
                  className="flex items-center gap-3 px-3 py-2.5 mt-1 rounded-[10px] hover:bg-[#F8FAFC] cursor-pointer text-[13px] font-bold text-[var(--heading)] aria-selected:bg-[#F8FAFC]"
                >
                  <Zap className="w-4 h-4 text-[#FDE047]" />
                  Generate RFQ for organic cotton
                </Command.Item>
                <Command.Item 
                  onSelect={() => { setSearch('What is OEKO-TEX certification?'); handleAiSearch() }}
                  className="flex items-center gap-3 px-3 py-2.5 mt-1 rounded-[10px] hover:bg-[#F8FAFC] cursor-pointer text-[13px] font-bold text-[var(--heading)] aria-selected:bg-[#F8FAFC]"
                >
                  <MessageSquare className="w-4 h-4 text-[var(--body)]" />
                  What is OEKO-TEX certification?
                </Command.Item>
              </Command.Group>
            </Command.List>
          </div>
        </Command>
        
        <div className="bg-[#F8FAFC] border-t border-[var(--border)] px-4 py-3 flex items-center justify-between text-[11px] font-bold text-[#94A3B8] uppercase tracking-widest">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5"><kbd className="px-1.5 py-0.5 bg-white border border-[var(--border)] rounded text-[10px] font-sans shadow-sm">↑</kbd> <kbd className="px-1.5 py-0.5 bg-white border border-[var(--border)] rounded text-[10px] font-sans shadow-sm">↓</kbd> to navigate</span>
            <span className="flex items-center gap-1.5"><kbd className="px-1.5 py-0.5 bg-white border border-[var(--border)] rounded text-[10px] font-sans shadow-sm">↵</kbd> to select</span>
          </div>
          <div className="flex items-center gap-1.5 text-[var(--primary)] font-bold">
            <Sparkles className="w-3.5 h-3.5" /> OpenRouter AI
          </div>
        </div>
      </div>
    </div>
  )
}
