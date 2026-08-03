import { Routes, Route, Navigate, Link, useLocation } from 'react-router-dom'
import { useAuthStore } from '@/features/auth/store/auth.store'
import { Container } from '@/shared/components/layout/container'
import { LayoutDashboard, FileText, ShoppingBag, Bookmark, Store, Settings } from 'lucide-react'
import { MainLayout } from '@/shared/layouts/MainLayout'

import { BuyerQuoteCenter } from '@/features/transactions/pages/BuyerQuoteCenter'
import { SupplierRfqManagement } from '@/features/transactions/pages/SupplierRfqManagement'
import { OrderManagement } from '@/features/transactions/pages/OrderManagement'
import { BuyerOverview } from '../pages/BuyerOverview'
import { SupplierOverview } from '../pages/SupplierOverview'

// Mock Pages for now (to be replaced with real implementations)
const SavedItems = () => <div className="p-6">Saved Items</div>
const SupplierProducts = () => <div className="p-6">Product Management</div>
const SettingsPage = () => <div className="p-6">Settings</div>

export function DashboardRouter() {
  const { user } = useAuthStore()
  const location = useLocation()
  
  if (!user) return <Navigate to="/login" />

  const isBuyer = user.role === 'buyer'

  const links = isBuyer ? [
    { to: '/dashboard', label: 'Overview', icon: LayoutDashboard, exact: true },
    { to: '/dashboard/quotes', label: 'Quote Center', icon: FileText },
    { to: '/dashboard/orders', label: 'Orders', icon: ShoppingBag },
    { to: '/dashboard/saved', label: 'Saved Items', icon: Bookmark },
    { to: '/dashboard/settings', label: 'Settings', icon: Settings },
  ] : [
    { to: '/dashboard', label: 'Overview', icon: LayoutDashboard, exact: true },
    { to: '/dashboard/rfqs', label: 'RFQ Management', icon: FileText },
    { to: '/dashboard/orders', label: 'Orders', icon: ShoppingBag },
    { to: '/dashboard/products', label: 'My Products', icon: Store },
    { to: '/dashboard/settings', label: 'Settings', icon: Settings },
  ]

  return (
    <MainLayout>
      <div className="min-h-screen bg-[var(--surface-1)] pt-8 pb-12">
        <Container className="max-w-[1400px]">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Sidebar Navigation */}
            <aside className="w-full md:w-64 flex-shrink-0">
              <div className="glass-panel rounded-2xl p-4 sticky top-24">
                <div className="mb-6 px-4">
                  <h2 className="text-xl font-display font-bold text-[var(--text-primary)]">{isBuyer ? 'Buyer Portal' : 'Supplier Portal'}</h2>
                  <p className="text-sm text-text-secondary truncate">{user.email}</p>
                </div>
                
                <nav className="flex flex-col gap-1">
                  {links.map((link) => {
                    const isActive = link.exact 
                      ? location.pathname === link.to 
                      : location.pathname.startsWith(link.to)
                      
                    return (
                      <Link
                        key={link.to}
                        to={link.to}
                        className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium ${
                          isActive 
                            ? 'bg-gradient-to-r from-[var(--color-brand-primary)] to-[var(--color-brand-primary-hover)] text-white shadow-[0_4px_14px_0_rgb(37_99_235_/_30%)]' 
                            : 'text-[var(--text-secondary)] hover:bg-[var(--surface-2)] hover:text-[var(--text-primary)] hover:shadow-sm'
                        }`}
                      >
                        <link.icon className="w-5 h-5" />
                        {link.label}
                      </Link>
                    )
                  })}
                </nav>
              </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 min-w-0 bg-[var(--surface-1)] border border-[var(--border-color)] rounded-2xl shadow-sm overflow-hidden min-h-[600px]">
              <Routes>
                {/* Buyer Routes */}
                {isBuyer && (
                  <>
                    <Route path="/" element={<BuyerOverview />} />
                    <Route path="/quotes" element={<BuyerQuoteCenter />} />
                    <Route path="/orders" element={<OrderManagement />} />
                    <Route path="/saved" element={<SavedItems />} />
                    <Route path="/settings" element={<SettingsPage />} />
                  </>
                )}
                
                {/* Supplier Routes */}
                {!isBuyer && (
                  <>
                    <Route path="/" element={<SupplierOverview />} />
                    <Route path="/rfqs" element={<SupplierRfqManagement />} />
                    <Route path="/orders" element={<OrderManagement />} />
                    <Route path="/products" element={<SupplierProducts />} />
                    <Route path="/settings" element={<SettingsPage />} />
                  </>
                )}
                
                <Route path="*" element={<Navigate to="/dashboard" replace />} />
              </Routes>
            </main>
          </div>
        </Container>
      </div>
    </MainLayout>
  )
}
