import { useState } from 'react'
import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom'
import { useAuthStore } from '@/features/auth/store/auth.store'
import { Search, Menu, Zap, Hexagon, User } from 'lucide-react'
import { AiMarketplaceCopilot } from '@/features/ai/components/AiMarketplaceCopilot'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/shared/components/ui/button'

export function MainLayout({ children }: { children?: React.ReactNode }) {
  const { isAuthenticated } = useAuthStore()
  const navigate = useNavigate()
  const location = useLocation()
  const [navSearch, setNavSearch] = useState('')

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (navSearch.trim()) {
      navigate(`/marketplace?search=${encodeURIComponent(navSearch.trim())}`)
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#F7F8FA] font-sans text-[#1A1A1A]">
      
      {/* Floating Navigation */}
      <div className="w-full pt-4 px-4 lg:px-8 max-w-[1400px] mx-auto z-50">
        <div className="bg-[#0A2540] h-[72px] rounded-[20px] flex items-center px-4 lg:px-6 gap-6 shadow-md">
          
          {/* Menu & Logo */}
          <div className="flex items-center gap-4 shrink-0">
            <button className="w-10 h-10 flex items-center justify-center text-white hover:bg-white/10 rounded-full transition-colors">
              <Menu className="w-6 h-6" />
            </button>
            <Link to="/" className="flex items-center gap-2 group">
              <Hexagon className="w-7 h-7 text-[#0066FF] fill-[#0066FF]" />
              <span className="font-bold text-2xl text-white tracking-tight">
                TextileHub
              </span>
            </Link>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-[600px] hidden md:block">
            <form onSubmit={handleSearch} className="relative w-full">
              <input
                type="text"
                value={navSearch}
                onChange={(e) => setNavSearch(e.target.value)}
                placeholder="Search for Fabrics, Mills, Denim or Cotton"
                className="w-full h-11 pl-5 pr-12 rounded-full bg-white text-[#1A1A1A] placeholder:text-[#94A3B8] focus:outline-none shadow-inner text-[14px]"
              />
              <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center text-[#94A3B8] hover:text-[#0A2540] transition-colors">
                <Search className="w-5 h-5" />
              </button>
            </form>
          </div>

          <div className="flex-1" />

          {/* Right Actions */}
          <div className="flex items-center gap-6 shrink-0">
            <div className="hidden lg:flex items-center gap-2 text-white text-[13px] font-medium bg-white/10 px-4 py-1.5 rounded-full border border-white/10">
              <Zap className="w-4 h-4 text-[#FDE047] fill-[#FDE047]" />
              <span>Source now and get instant <span className="text-[#FDE047]">RFQs</span></span>
            </div>

            <div className="flex items-center gap-4">
              {isAuthenticated ? (
                <Link to="/dashboard">
                  <div className="w-10 h-10 rounded-full bg-white overflow-hidden border-2 border-white/20 cursor-pointer">
                    <img src={`https://ui-avatars.com/api/?name=User&background=0066FF&color=fff`} alt="User" className="w-full h-full object-cover" />
                  </div>
                </Link>
              ) : (
                <Link to="/login">
                  <div className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 transition-colors border border-white/20 cursor-pointer flex items-center justify-center text-white">
                    <User className="w-5 h-5" />
                  </div>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Outlet */}
      <main className="flex-1 w-full flex flex-col pt-6">
        {children || (
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="w-full flex-1"
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        )}
      </main>

      {/* Enterprise Footer */}
      <footer className="bg-white border-t border-[#E2E8F0] pt-20 pb-10 mt-20">
        <div className="max-w-[1400px] mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-6 gap-8 mb-16">
            <div className="col-span-2">
              <Link to="/" className="flex items-center gap-2 group mb-6">
                <Hexagon className="w-7 h-7 text-[#0A2540] fill-[#0066FF]" />
                <span className="font-bold text-xl text-[#0A2540]">
                  TextileHub
                </span>
              </Link>
              <p className="text-[#64748B] text-[14px] leading-relaxed mb-6 max-w-sm">
                Global B2B textile sourcing platform powered by AI. Connecting verified enterprise buyers with premium manufacturers.
              </p>
              
              <div className="flex gap-2 max-w-sm">
                <input 
                  type="email" 
                  placeholder="Subscribe to Newsletter" 
                  className="flex-1 h-10 px-4 rounded-[10px] bg-[#F7F8FA] border border-[#E2E8F0] text-[13px] focus:outline-none focus:border-[#0066FF]"
                />
                <Button className="h-10 rounded-[10px] px-6 bg-[#0A2540] hover:bg-[#1E293B] text-white shadow-none">
                  Subscribe
                </Button>
              </div>
            </div>

            <div>
              <h4 className="font-bold text-[#0A2540] mb-5 text-[14px]">Marketplace</h4>
              <ul className="space-y-3 text-[13px] text-[#64748B] font-medium">
                <li><Link to="/marketplace" className="hover:text-[#0066FF] transition-colors">Browse Materials</Link></li>
                <li><Link to="/categories" className="hover:text-[#0066FF] transition-colors">Categories</Link></li>
                <li><Link to="/rfq" className="hover:text-[#0066FF] transition-colors">Submit RFQ</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-[#0A2540] mb-5 text-[14px]">Suppliers</h4>
              <ul className="space-y-3 text-[13px] text-[#64748B] font-medium">
                <li><Link to="/suppliers" className="hover:text-[#0066FF] transition-colors">Verified Mills</Link></li>
                <li><Link to="/apply" className="hover:text-[#0066FF] transition-colors">Become a Supplier</Link></li>
                <li><Link to="/guidelines" className="hover:text-[#0066FF] transition-colors">Guidelines</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-[#0A2540] mb-5 text-[14px]">Resources</h4>
              <ul className="space-y-3 text-[13px] text-[#64748B] font-medium">
                <li><Link to="/ai" className="hover:text-[#0066FF] transition-colors">AI Sourcing</Link></li>
                <li><Link to="/certifications" className="hover:text-[#0066FF] transition-colors">Certifications</Link></li>
                <li><Link to="/logistics" className="hover:text-[#0066FF] transition-colors">Global Logistics</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-[#0A2540] mb-5 text-[14px]">Company</h4>
              <ul className="space-y-3 text-[13px] text-[#64748B] font-medium">
                <li><Link to="/api" className="hover:text-[#0066FF] transition-colors">API & Docs</Link></li>
                <li><Link to="/privacy" className="hover:text-[#0066FF] transition-colors">Privacy</Link></li>
                <li><Link to="/terms" className="hover:text-[#0066FF] transition-colors">Terms</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-[#E2E8F0] pt-8 flex items-center justify-between text-[13px] text-[#94A3B8] font-medium">
            <p>© {new Date().getFullYear()} TextileHub Marketplace.</p>
            <div className="flex gap-4">
              <span>Status: All systems operational</span>
            </div>
          </div>
        </div>
      </footer>

      <AiMarketplaceCopilot />
    </div>
  )
}
