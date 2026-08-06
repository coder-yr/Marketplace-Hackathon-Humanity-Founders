import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { useAuthStore } from '@/features/auth/store/auth.store'
import { useCartStore } from '@/features/cart/store/cart.store'
import { Search, Menu, Zap, Hexagon, User, Command, Bell, ShoppingCart } from 'lucide-react'
import { EnterpriseCopilot } from '@/features/ai/components/EnterpriseCopilot'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/shared/components/ui/button'

export function MainLayout({ children }: { children?: React.ReactNode }) {
  const { isAuthenticated, user, logout } = useAuthStore()
  const { items, fetchCart } = useCartStore()
  const totalItemsCount = items.length
  const location = useLocation()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  useEffect(() => {
    if (isAuthenticated && user?.role === 'buyer') {
      fetchCart()
    }
  }, [isAuthenticated, user, fetchCart])

  return (
    <div className="min-h-screen flex flex-col bg-[#F7F8FA] font-sans text-[var(--body)]">
      
      {/* Floating Navigation */}
      <div className="w-full pt-4 px-4 lg:px-8 max-w-[1400px] mx-auto z-50 sticky top-0">
        <div className="bg-[#0A2540] h-[72px] rounded-[20px] flex items-center px-4 lg:px-6 gap-6 shadow-md backdrop-blur-md bg-opacity-95">
          
          {/* Menu & Logo */}
          <div className="flex items-center gap-4 shrink-0">
            <button className="w-10 h-10 flex items-center justify-center text-white hover:bg-white/10 rounded-full transition-colors">
              <Menu className="w-6 h-6" />
            </button>
            <Link to="/" className="flex items-center gap-2 group">
              <Hexagon className="w-7 h-7 text-[#0066FF] fill-[#0066FF]" />
              <span className="font-bold text-[22px] text-white tracking-tight font-display">
                TextileHub
              </span>
            </Link>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-[600px] hidden md:block">
            <button 
              onClick={() => document.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', metaKey: true }))}
              className="w-full h-11 px-5 rounded-full bg-[#1E293B] hover:bg-[#334155] border border-[#334155] text-[#94A3B8] flex items-center justify-between transition-colors text-[14px] min-w-0"
            >
              <div className="flex items-center gap-3 overflow-hidden min-w-0 mr-2">
                <Search className="w-4 h-4 shrink-0" />
                <span className="font-medium whitespace-nowrap truncate">Search for Fabrics, Mills...</span>
              </div>
              <div className="flex items-center gap-1 bg-[#0A2540] px-2 py-1 rounded-[6px] border border-[#334155] shrink-0">
                <Command className="w-3 h-3" />
                <span className="text-[10px] font-bold">K</span>
              </div>
            </button>
          </div>

          <div className="flex-1" />

          {/* Right Actions */}
          <div className="flex items-center gap-5 shrink-0">
          {/* Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6 text-[14px] font-bold text-white/80">
            <Link to="/" className="hover:text-white transition-colors">Discover</Link>
            <Link to="/marketplace" className="hover:text-white transition-colors">Materials</Link>
            <Link to="/marketplace?filter=verified" className="hover:text-white transition-colors">Suppliers</Link>
            <Link to="/dashboard/procurement" className="hover:text-white transition-colors">RFQs</Link>
            <Link to="/dashboard/procurement" className="hover:text-white transition-colors">Orders</Link>
            <Link to="/dashboard/analytics" className="hover:text-white transition-colors">Analytics</Link>
            <Link to="/ai" className="text-[#38BDF8] flex items-center gap-1 hover:text-white transition-colors">
              <Zap className="w-3.5 h-3.5 fill-current" /> AI Copilot
            </Link>
          </nav>

            {isAuthenticated && (
              <>
                <button className="w-10 h-10 flex items-center justify-center text-white hover:bg-white/10 rounded-full transition-colors relative">
                  <Bell className="w-5 h-5" />
                  <span className="absolute top-2 right-2 w-2 h-2 bg-[#DC2626] rounded-full border border-[#0A2540]" />
                </button>
                {user?.role === 'buyer' && (
                  <Link to="/cart">
                    <button className="w-10 h-10 flex items-center justify-center text-white hover:bg-white/10 rounded-full transition-colors relative">
                      <ShoppingCart className="w-5 h-5" />
                      {totalItemsCount > 0 && (
                        <span className="absolute top-1 right-1 w-4 h-4 bg-[var(--primary)] text-white text-[10px] font-bold rounded-full flex items-center justify-center border border-[#0A2540]">
                          {totalItemsCount}
                        </span>
                      )}
                    </button>
                  </Link>
                )}
              </>
            )}

            <div className="flex items-center gap-4">
              {isAuthenticated ? (
                <div className="relative group">
                  <Link to="/dashboard">
                    <div className="w-10 h-10 rounded-full bg-white overflow-hidden border-2 border-white/20 cursor-pointer hover:border-white/40 transition-colors">
                      <img src={`https://ui-avatars.com/api/?name=${user?.fullName || 'User'}&background=0066FF&color=fff&bold=true`} alt="User" className="w-full h-full object-cover" />
                    </div>
                  </Link>
                  <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-[12px] shadow-lg border border-[var(--border)] py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                    <div className="px-4 py-2 border-b border-[#E2E8F0] mb-1">
                      <p className="text-[13px] font-bold text-[var(--heading)] truncate">{user?.fullName}</p>
                      <p className="text-[11px] font-bold text-[#94A3B8] uppercase tracking-wider">{user?.role}</p>
                    </div>
                    <Link to="/dashboard" className="block px-4 py-2 text-[14px] text-[var(--heading)] hover:bg-[#F8FAFC] font-bold transition-colors">Go to Dashboard</Link>
                    <button 
                      onClick={handleLogout} 
                      className="w-full text-left px-4 py-2 text-[14px] text-[#DC2626] hover:bg-[#FEF2F2] font-bold transition-colors"
                    >
                      Logout
                    </button>
                  </div>
                </div>
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
      <footer className="bg-white border-t border-[var(--border)] pt-20 pb-10 mt-20">
        <div className="max-w-[1400px] mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-6 gap-8 mb-16">
            <div className="col-span-2">
              <Link to="/" className="flex items-center gap-2 group mb-6">
                <Hexagon className="w-7 h-7 text-[var(--heading)] fill-[var(--primary)]" />
                <span className="font-bold text-[22px] text-[var(--heading)] font-display">
                  TextileHub
                </span>
              </Link>
              <p className="text-[var(--body)] text-[14px] leading-relaxed mb-6 max-w-sm font-medium">
                Global B2B textile sourcing platform powered by AI. Connecting verified enterprise buyers with premium manufacturers.
              </p>
              
              <div className="flex gap-2 max-w-sm">
                <input 
                  type="email" 
                  placeholder="Subscribe to Newsletter" 
                  className="flex-1 h-12 px-4 rounded-[12px] bg-[#F7F8FA] border border-[var(--border)] text-[13px] focus:outline-none focus:border-[var(--primary)] font-medium text-[var(--heading)]"
                />
                <Button className="h-12 rounded-[12px] px-6 bg-[var(--heading)] hover:bg-[#1E293B] text-white shadow-none">
                  Subscribe
                </Button>
              </div>
            </div>

            <div>
              <h4 className="font-bold text-[var(--heading)] mb-5 text-[14px]">Marketplace</h4>
              <ul className="space-y-3 text-[13px] text-[var(--body)] font-medium">
                <li><Link to="/marketplace" className="hover:text-[var(--primary)] transition-colors">Browse Materials</Link></li>
                <li><Link to="/categories" className="hover:text-[var(--primary)] transition-colors">Categories</Link></li>
                <li><Link to="/dashboard/procurement" className="hover:text-[var(--primary)] transition-colors">Submit RFQ</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-[var(--heading)] mb-5 text-[14px]">Suppliers</h4>
              <ul className="space-y-3 text-[13px] text-[var(--body)] font-medium">
                <li><Link to="/marketplace?filter=verified" className="hover:text-[var(--primary)] transition-colors">Verified Mills</Link></li>
                <li><Link to="/apply" className="hover:text-[var(--primary)] transition-colors">Become a Supplier</Link></li>
                <li><Link to="/guidelines" className="hover:text-[var(--primary)] transition-colors">Guidelines</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-[var(--heading)] mb-5 text-[14px]">Resources</h4>
              <ul className="space-y-3 text-[13px] text-[var(--body)] font-medium">
                <li><Link to="/ai" className="hover:text-[var(--primary)] transition-colors">AI Sourcing</Link></li>
                <li><Link to="/certifications" className="hover:text-[var(--primary)] transition-colors">Certifications</Link></li>
                <li><Link to="/logistics" className="hover:text-[var(--primary)] transition-colors">Global Logistics</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-[var(--heading)] mb-5 text-[14px]">Company</h4>
              <ul className="space-y-3 text-[13px] text-[var(--body)] font-medium">
                <li><Link to="/api" className="hover:text-[var(--primary)] transition-colors">API & Docs</Link></li>
                <li><Link to="/privacy" className="hover:text-[var(--primary)] transition-colors">Privacy</Link></li>
                <li><Link to="/terms" className="hover:text-[var(--primary)] transition-colors">Terms</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-[var(--border)] pt-8 flex items-center justify-between text-[13px] text-[#94A3B8] font-bold">
            <p>© {new Date().getFullYear()} TextileHub Marketplace.</p>
            <div className="flex gap-4 items-center">
              <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-[var(--success)]" /> All systems operational</span>
            </div>
          </div>
        </div>
      </footer>

      <EnterpriseCopilot />
    </div>
  )
}
