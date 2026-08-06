import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { Card } from '@/shared/components/ui/card'
import { Badge } from '@/shared/components/ui/badge'
import { Button } from '@/shared/components/ui/button'
import { 
  TrendingUp, FileText, Package, DollarSign, 
  AlertCircle, ArrowRight, Zap, ShieldCheck
} from 'lucide-react'
import { useAuthStore } from '@/features/auth/store/auth.store'
import { useWorkspace } from '../hooks/useWorkspace'
import { formatDistanceToNow } from 'date-fns'
import { useNavigate } from 'react-router-dom'

export function SupplierOverview() {
  const { user } = useAuthStore()
  const { workspace, isLoading, refresh } = useWorkspace()
  const navigate = useNavigate()

  useEffect(() => {
    refresh()
  }, [])

  if (isLoading || !workspace) {
    return (
      <div className="flex h-[400px] items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#0A2540]"></div>
      </div>
    )
  }

  const { rfqs, stats } = workspace

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }} 
      animate={{ opacity: 1, y: 0 }} 
      className="max-w-[1200px] mx-auto space-y-8"
    >
      {/* 1. WELCOME SECTION */}
      <div className="bg-[#0A2540] rounded-[24px] p-8 text-white relative overflow-hidden shadow-lg">
        <div className="absolute top-0 right-0 p-8 opacity-10">
          <ShieldCheck className="w-48 h-48 text-[#0066FF]" />
        </div>
        <div className="relative z-10">
          <Badge className="bg-[#0066FF]/20 text-[#38BDF8] border-[#0066FF]/30 font-bold text-[11px] mb-4 tracking-widest uppercase">
            Supplier Portal
          </Badge>
          <h2 className="text-[32px] font-display font-extrabold mb-2">
            Welcome back, {user?.fullName || 'Supplier'}
          </h2>
          <p className="text-[#94A3B8] font-medium text-[15px] max-w-xl leading-relaxed">
            Here's a quick overview of your sales pipeline, pending orders, and inventory alerts. You have {stats.pendingRfqs || 0} new RFQs awaiting your quote.
          </p>
        </div>
      </div>

      {/* 2. FOUR STAT CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-6 border border-[#E2E8F0] shadow-sm rounded-[20px] bg-white">
          <div className="flex justify-between items-start mb-4">
            <div className="w-10 h-10 rounded-full bg-[#ECFDF5] flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-[#10B981]" />
            </div>
            <Badge className="bg-[#ECFDF5] text-[#10B981] border-transparent font-bold text-[10px]"><TrendingUp className="w-3 h-3 mr-1"/> +12%</Badge>
          </div>
          <h4 className="text-[12px] font-bold text-[#94A3B8] uppercase tracking-wider mb-1">Monthly Revenue</h4>
          <p className="text-[28px] font-display font-extrabold text-[#0A2540]">${(stats.totalRevenue || 45200).toLocaleString()}</p>
        </Card>

        <Card className="p-6 border border-[#E2E8F0] shadow-sm rounded-[20px] bg-white">
          <div className="flex justify-between items-start mb-4">
            <div className="w-10 h-10 rounded-full bg-[#EFF6FF] flex items-center justify-center">
              <FileText className="w-5 h-5 text-[#0066FF]" />
            </div>
          </div>
          <h4 className="text-[12px] font-bold text-[#94A3B8] uppercase tracking-wider mb-1">Pending RFQs</h4>
          <p className="text-[28px] font-display font-extrabold text-[#0A2540]">{stats.pendingRfqs || 0}</p>
        </Card>

        <Card className="p-6 border border-[#E2E8F0] shadow-sm rounded-[20px] bg-white">
          <div className="flex justify-between items-start mb-4">
            <div className="w-10 h-10 rounded-full bg-[#FEF2F2] flex items-center justify-center">
              <Package className="w-5 h-5 text-[#EF4444]" />
            </div>
          </div>
          <h4 className="text-[12px] font-bold text-[#94A3B8] uppercase tracking-wider mb-1">Active Products</h4>
          <p className="text-[28px] font-display font-extrabold text-[#0A2540]">{stats.activeProducts || 0}</p>
        </Card>

        <Card className="p-6 border border-[#E2E8F0] shadow-sm rounded-[20px] bg-[#F8FAFC]">
          <div className="flex justify-between items-start mb-4">
            <div className="w-10 h-10 rounded-full bg-white border border-[#E2E8F0] flex items-center justify-center">
              <ShieldCheck className="w-5 h-5 text-[#0A2540]" />
            </div>
            <span className="text-[11px] font-bold text-[#10B981]">Top 5%</span>
          </div>
          <h4 className="text-[12px] font-bold text-[#94A3B8] uppercase tracking-wider mb-1">Trust Score</h4>
          <p className="text-[28px] font-display font-extrabold text-[#0A2540]">98<span className="text-[16px] text-[#94A3B8]">/100</span></p>
        </Card>
      </div>

      {/* 3. TWO COLUMNS: RFQs & QUICK ACTIONS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Col (Span 2) - Recent RFQs */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-[18px] font-display font-bold text-[#0A2540]">Action Required: Recent RFQs</h3>
            <Button variant="ghost" className="text-[#0066FF] font-bold text-[13px]" onClick={() => navigate('/dashboard/procurement')}>
              View All Pipeline <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
          
          <div className="space-y-4">
            {rfqs.length === 0 ? (
              <div className="bg-white p-8 rounded-[20px] border border-[#E2E8F0] text-center shadow-sm">
                <FileText className="w-12 h-12 text-[#CBD5E1] mx-auto mb-3" />
                <h4 className="text-[15px] font-bold text-[#0A2540]">No pending RFQs</h4>
                <p className="text-[13px] text-[#64748B] mt-1">When buyers request quotes for your products, they will appear here.</p>
              </div>
            ) : (
              rfqs.slice(0, 5).map((rfq) => (
                <div key={rfq._id} className="bg-white p-5 rounded-[20px] border border-[#E2E8F0] shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4 group hover:border-[#0066FF]/30 transition-colors">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Badge className="bg-[#EFF6FF] text-[#0066FF] font-bold text-[10px] uppercase tracking-widest px-2 py-0.5">
                        {rfq.status}
                      </Badge>
                      <span className="text-[11px] font-bold text-[#94A3B8]">
                        {formatDistanceToNow(new Date(rfq.createdAt), { addSuffix: true })}
                      </span>
                    </div>
                    <h4 className="font-bold text-[#0A2540] text-[15px] group-hover:text-[#0066FF] transition-colors">{rfq.title}</h4>
                    <p className="text-[13px] text-[#64748B] mt-1">Requested Qty: <span className="font-bold text-[#0A2540]">{rfq.quantity || 1500} units</span></p>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Button variant="outline" className="border-[#E2E8F0] text-[#0A2540] font-bold h-10" onClick={() => navigate(`/dashboard/rfqs/${rfq._id}`)}>
                      Details
                    </Button>
                    <Button className="bg-[#0A2540] text-white hover:bg-[#0066FF] font-bold h-10 shadow-sm" onClick={() => navigate(`/dashboard/rfqs/${rfq._id}`)}>
                      Provide Quote
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Right Col - Alerts & Actions */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-[24px] border border-[#E2E8F0] shadow-sm">
            <h3 className="font-bold text-[#0A2540] text-[16px] mb-5 flex items-center gap-2">
              <Zap className="w-5 h-5 text-[#F59E0B]" /> Quick Actions
            </h3>
            <div className="flex flex-col gap-3">
              <Button onClick={() => navigate('/dashboard/products/new')} className="w-full justify-start h-12 text-[13px] font-bold bg-[#0A2540] hover:bg-[#0066FF] text-white shadow-sm rounded-[12px]">
                <Package className="w-4 h-4 mr-3 opacity-70" /> Publish New Product
              </Button>
              <Button variant="outline" className="w-full justify-start h-12 border-[#E2E8F0] bg-[#F8FAFC] hover:bg-[#F1F5F9] text-[13px] font-bold text-[#0A2540] rounded-[12px]">
                <FileText className="w-4 h-4 mr-3 opacity-50" /> Generate Price List
              </Button>
              <Button variant="outline" className="w-full justify-start h-12 border-[#E2E8F0] bg-[#F8FAFC] hover:bg-[#F1F5F9] text-[13px] font-bold text-[#0A2540] rounded-[12px]">
                <ShieldCheck className="w-4 h-4 mr-3 opacity-50" /> Update Certifications
              </Button>
            </div>
          </div>

          <div className="bg-[#FEF2F2] p-6 rounded-[24px] border border-[#FECACA] shadow-sm relative overflow-hidden">
            <div className="flex items-center gap-2 mb-4 relative z-10">
              <AlertCircle className="w-5 h-5 text-[#EF4444]" />
              <h3 className="font-bold text-[#991B1B] text-[16px]">Inventory Alerts</h3>
            </div>
            <div className="space-y-3 relative z-10">
              <div className="bg-white/60 p-3 rounded-[12px]">
                <p className="text-[13px] font-bold text-[#991B1B]">Low Stock: Supima Cotton 40s</p>
                <p className="text-[11px] font-bold text-[#EF4444] mt-0.5">Only 1,200m remaining</p>
              </div>
              <div className="bg-white/60 p-3 rounded-[12px]">
                <p className="text-[13px] font-bold text-[#991B1B]">Out of Stock: Organic Linen</p>
                <p className="text-[11px] font-bold text-[#EF4444] mt-0.5">0m remaining</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
