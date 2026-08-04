import { useState, useEffect } from 'react'
import { Command } from 'cmdk'
import { useNavigate } from 'react-router-dom'
import { 
  Factory, FileText, Truck, ArrowRight, Sparkles, 
  Box, Calculator, Layers, ShieldCheck
} from 'lucide-react'

export function EnterpriseCopilot() {
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState('')
  const navigate = useNavigate()

  // Toggle the menu when ⌘K is pressed
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

  const runCommand = (command: () => void) => {
    setOpen(false)
    command()
  }

  // Handle AI Search submission
  const handleAiSearch = () => {
    if (search.trim()) {
      runCommand(() => navigate(`/marketplace?search=${encodeURIComponent(search)}`))
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
            <Sparkles className="w-5 h-5 text-[var(--primary)]" />
            <Command.Input
              autoFocus
              value={search}
              onValueChange={setSearch}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && search) {
                  handleAiSearch()
                }
              }}
              placeholder="Ask AI Copilot to find suppliers, materials, or track orders..."
              className="flex-1 h-14 bg-transparent border-none focus:ring-0 text-[var(--heading)] placeholder:text-[#94A3B8] text-lg px-4 outline-none font-medium"
            />
            <div className="hidden sm:flex items-center gap-1.5 px-2 py-1 bg-[#F1F5F9] rounded-[6px] text-[10px] font-bold text-[#94A3B8] uppercase tracking-wider">
              <span>ESC</span> to close
            </div>
          </div>

          <div className="overflow-y-auto max-h-[60vh] p-2 custom-scrollbar">
            {search.length > 0 && (
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
                    <p className="text-[12px] font-medium text-[var(--body)]">Copilot will scan 2,500+ suppliers to find matches</p>
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
                  Logistics & Order Tracking
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

              <Command.Group heading="Global Searches" className="px-2 py-2 text-[11px] font-bold uppercase tracking-widest text-[#94A3B8]">
                <Command.Item 
                  onSelect={() => runCommand(() => navigate('/marketplace?search=organic cotton'))}
                  className="flex items-center gap-3 px-3 py-2.5 mt-1 rounded-[10px] hover:bg-[#F8FAFC] cursor-pointer text-[13px] font-bold text-[var(--heading)] aria-selected:bg-[#F8FAFC]"
                >
                  <Box className="w-4 h-4 text-[var(--body)]" />
                  Find Organic Cotton Mills
                </Command.Item>
                <Command.Item 
                  onSelect={() => runCommand(() => navigate('/marketplace?search=recycled denim'))}
                  className="flex items-center gap-3 px-3 py-2.5 mt-1 rounded-[10px] hover:bg-[#F8FAFC] cursor-pointer text-[13px] font-bold text-[var(--heading)] aria-selected:bg-[#F8FAFC]"
                >
                  <Factory className="w-4 h-4 text-[var(--body)]" />
                  Search Recycled Denim Suppliers
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
            <Sparkles className="w-3.5 h-3.5" /> AI Powered
          </div>
        </div>
      </div>
    </div>
  )
}
