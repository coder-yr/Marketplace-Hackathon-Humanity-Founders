import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { useAuthStore } from '@/features/auth/store/auth.store'
import { useCartStore } from '@/features/cart/store/cart.store'
import { Hexagon, User, Bell, ShoppingCart, Menu, Search, Command, Zap } from 'lucide-react'
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
    <div className="min-h-screen flex flex-col bg-[#F4F6F8] font-sans text-[#0A2540]">
      
      {/* Top Navbar Header */}
      <div className="w-full px-4 lg:px-8 pt-4 sticky top-0 z-50">
        <header className="max-w-[1400px] mx-auto h-[60px] bg-[#0A2540] rounded-full px-4 lg:px-6 flex items-center justify-between gap-4 lg:gap-6 shadow-lg">
          
          {/* Left section */}
          <div className="flex items-center gap-4 lg:gap-6 flex-shrink-0">
            <button className="text-white/80 hover:text-white transition-colors">
              <Menu className="w-5 h-5" />
            </button>
            <Link to="/" className="flex items-center gap-2 group">
              <Hexagon className="w-6 h-6 text-[#2563EB] fill-[#2563EB]" />
              <span className="font-display font-extrabold text-[18px] text-white tracking-tight">
                TextileHub
              </span>
            </Link>
            
            {/* Search Bar */}
            <div className="hidden lg:flex items-center bg-white/5 hover:bg-white/10 border border-white/10 rounded-full px-4 py-1.5 w-[240px] xl:w-[320px] transition-colors cursor-pointer ml-2">
              <Search className="w-4 h-4 text-white/40 mr-2" />
              <span className="text-[13px] text-white/50 flex-1 truncate">Search for Fabrics, Mills...</span>
              <div className="flex items-center gap-1 bg-white/10 rounded px-1.5 py-0.5 text-[10px] text-white/60 font-medium">
                <Command className="w-3 h-3" /> K
              </div>
            </div>
          </div>

          {/* Center Links */}
          <nav className="hidden xl:flex items-center gap-6 text-[13px] font-bold text-[#38BDF8]">
            <Link to="/marketplace" className="hover:text-white transition-colors">Discover</Link>
            <Link to="/categories" className="hover:text-white transition-colors">Materials</Link>
            <Link to="/marketplace?filter=verified" className="hover:text-white transition-colors">Suppliers</Link>
            <Link to="/dashboard/procurement" className="hover:text-white transition-colors">RFQs</Link>
            <Link to="/dashboard/orders" className="hover:text-white transition-colors">Orders</Link>
            <Link to="/dashboard/analytics" className="hover:text-white transition-colors">Analytics</Link>
            <Link to="/ai" className="hover:text-white transition-colors flex items-center gap-1.5">
              <Zap className="w-4 h-4" /> AI Copilot
            </Link>
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-2 lg:gap-4 flex-shrink-0">
            {isAuthenticated && user?.role === 'buyer' && (
              <Link to="/cart">
                <button className="w-9 h-9 flex items-center justify-center text-white/80 hover:text-white hover:bg-white/10 rounded-full transition-colors relative">
                  <ShoppingCart className="w-4 h-4" />
                  {totalItemsCount > 0 && (
                    <span className="absolute top-1 right-1 w-4 h-4 bg-[#2563EB] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                      {totalItemsCount}
                    </span>
                  )}
                </button>
              </Link>
            )}

            <button className="relative w-9 h-9 flex items-center justify-center text-white/80 hover:text-white hover:bg-white/10 rounded-full transition-colors">
              <Bell className="w-4 h-4" />
              <span className="absolute top-2.5 right-2.5 w-1.5 h-1.5 bg-[#EF4444] rounded-full" />
            </button>

            {/* Profile Pill */}
            {isAuthenticated ? (
              <div className="relative group ml-1">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[#2563EB] text-white border border-white/20 cursor-pointer overflow-hidden shadow-sm hover:ring-2 hover:ring-white/20 transition-all">
                  <span className="text-[12px] font-extrabold">{user?.fullName?.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase() || 'BA'}</span>
                </div>

                <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-2xl shadow-xl border border-[#E2E8F0] py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
                  <div className="px-4 py-2 border-b border-[#F1F5F9] mb-1">
                    <p className="text-[13px] font-extrabold text-[#0A2540] truncate">{user?.fullName || 'Enterprise Admin'}</p>
                    <p className="text-[11px] font-medium text-[#64748B] truncate">{user?.email}</p>
                  </div>
                  <Link to="/dashboard" className="block px-4 py-2 text-[13px] font-bold text-[#0A2540] hover:bg-[#F8FAFC]">Dashboard</Link>
                  <button onClick={handleLogout} className="w-full text-left px-4 py-2 text-[13px] font-bold text-[#DC2626] hover:bg-[#FEF2F2]">
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <Link to="/login" className="ml-1">
                <div className="flex items-center gap-2 bg-[#2563EB] text-white px-4 py-1.5 rounded-full text-[13px] font-bold hover:bg-[#1D4ED8] transition-colors">
                  <User className="w-3.5 h-3.5" />
                  <span>Login</span>
                </div>
              </Link>
            )}
          </div>

        </header>
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
