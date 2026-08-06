import { useState } from 'react'
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { 
  LayoutDashboard, FileText, Package, BarChart3, Activity, 
  Settings, LogOut, ChevronLeft, ChevronRight, Hexagon
} from 'lucide-react'
import { useAuthStore } from '@/features/auth/store/auth.store'

export function DashboardLayout() {
  const { pathname } = useLocation()
  const { logout, user } = useAuthStore()
  const navigate = useNavigate()
  const [isCollapsed, setIsCollapsed] = useState(false)

  const BUYER_NAV_ITEMS = [
    { label: 'Overview', path: '/dashboard/overview', icon: LayoutDashboard },
    { label: 'Procurement', path: '/dashboard/procurement', icon: Package },
    { label: 'RFQs & Quotes', path: '/dashboard/rfqs/active', icon: FileText },
    { label: 'Analytics', path: '/dashboard/analytics', icon: BarChart3 },
    { label: 'Activity', path: '/dashboard/activity', icon: Activity },
  ]

  const SUPPLIER_NAV_ITEMS = [
    { label: 'Overview', path: '/dashboard/overview', icon: LayoutDashboard },
    { label: 'Products', path: '/dashboard/products', icon: Package },
    { label: 'Quotes & Orders', path: '/dashboard/procurement', icon: FileText },
    { label: 'Analytics', path: '/dashboard/analytics', icon: BarChart3 },
    { label: 'Activity', path: '/dashboard/activity', icon: Activity },
  ]

  const NAV_ITEMS = user?.role === 'supplier' ? SUPPLIER_NAV_ITEMS : BUYER_NAV_ITEMS

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <div className="flex min-h-[calc(100vh-100px)] bg-[#F7F8FA] w-full max-w-[1400px] mx-auto overflow-hidden">
      
      {/* Sidebar */}
      <aside 
        className={`${isCollapsed ? 'w-20' : 'w-64'} shrink-0 bg-white border-r border-[var(--border)] transition-all duration-300 flex flex-col`}
      >
        <div className="h-20 flex items-center justify-between px-6 border-b border-[var(--border)]">
          {!isCollapsed && (
            <Link to="/dashboard" className="flex items-center gap-2">
              <Hexagon className="w-6 h-6 text-[var(--primary)] fill-[var(--primary)]/20" />
              <span className="font-display font-bold text-[18px] text-[var(--heading)]">OS</span>
            </Link>
          )}
          {isCollapsed && (
            <div className="w-full flex justify-center">
              <Hexagon className="w-6 h-6 text-[var(--primary)] fill-[var(--primary)]/20" />
            </div>
          )}
        </div>

        <div className="p-4 flex-1 overflow-y-auto space-y-1">
          {NAV_ITEMS.map(item => {
            const isActive = pathname.startsWith(item.path.split('/')[2] ? `/dashboard/${item.path.split('/')[2]}` : item.path)
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-3 py-3 rounded-[12px] font-bold transition-all ${
                  isActive 
                    ? 'bg-[var(--heading)] text-white shadow-sm' 
                    : 'text-[var(--body)] hover:bg-[#F8FAFC] hover:text-[var(--heading)]'
                } ${isCollapsed ? 'justify-center' : ''}`}
                title={isCollapsed ? item.label : undefined}
              >
                <item.icon className="w-5 h-5 shrink-0" />
                {!isCollapsed && <span className="text-[14px]">{item.label}</span>}
              </Link>
            )
          })}
        </div>

        <div className="p-4 border-t border-[var(--border)] space-y-1">
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-[12px] font-bold text-[var(--body)] hover:bg-[#F8FAFC] hover:text-[var(--heading)] transition-all ${isCollapsed ? 'justify-center' : ''}`}
            title={isCollapsed ? "Expand Sidebar" : undefined}
          >
            {isCollapsed ? <ChevronRight className="w-5 h-5 shrink-0" /> : <ChevronLeft className="w-5 h-5 shrink-0" />}
            {!isCollapsed && <span className="text-[13px]">Collapse</span>}
          </button>
          <Link
            to="/dashboard/settings"
            className={`flex items-center gap-3 px-3 py-2.5 rounded-[12px] font-bold text-[var(--body)] hover:bg-[#F8FAFC] hover:text-[var(--heading)] transition-all ${isCollapsed ? 'justify-center' : ''}`}
            title={isCollapsed ? "Settings" : undefined}
          >
            <Settings className="w-5 h-5 shrink-0" />
            {!isCollapsed && <span className="text-[13px]">Settings</span>}
          </Link>
          <button
            onClick={handleLogout}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-[12px] font-bold text-[var(--error)] hover:bg-[#FEF2F2] transition-all ${isCollapsed ? 'justify-center' : ''}`}
            title={isCollapsed ? "Logout" : undefined}
          >
            <LogOut className="w-5 h-5 shrink-0" />
            {!isCollapsed && <span className="text-[13px]">Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-full bg-[#F7F8FA] overflow-hidden">
        <div className="h-20 bg-white border-b border-[var(--border)] px-8 flex items-center justify-between shrink-0">
          <div className="font-bold text-[var(--heading)] text-[18px]">
            {NAV_ITEMS.find(i => pathname.startsWith(i.path.split('/')[2] ? `/dashboard/${i.path.split('/')[2]}` : i.path))?.label || 'Dashboard'}
          </div>
          <div className="flex items-center gap-4">
             <Link 
               to="/marketplace" 
               className="hidden md:flex items-center gap-1.5 text-[13px] font-bold text-[#64748B] hover:text-[var(--primary)] transition-colors mr-2"
             >
               <ChevronLeft className="w-4 h-4" /> Back to Marketplace
             </Link>
             <div className="w-px h-6 bg-[var(--border)] mr-2 hidden md:block" />
             <div className="text-right hidden sm:block">
               <p className="text-[13px] font-bold text-[var(--heading)]">{user?.fullName || 'User'}</p>
               <p className="text-[11px] font-bold text-[#94A3B8] uppercase tracking-wider">{user?.role}</p>
             </div>
             <div className="w-10 h-10 rounded-full bg-[var(--primary)] text-white flex items-center justify-center font-bold shadow-sm">
               {user?.fullName?.charAt(0) || 'U'}
             </div>
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4 lg:p-8">
          <Outlet />
        </div>
      </main>
    </div>
  )
}
