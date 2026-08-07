import { useEffect } from 'react'
import { Card } from '@/shared/components/ui/card'
import { Badge } from '@/shared/components/ui/badge'
import { Button } from '@/shared/components/ui/button'
import { FileText, ShoppingBag, Bookmark, MessageSquare, Bell, Sparkles, Zap, ArrowRight, AlertTriangle } from 'lucide-react'
import { motion } from 'framer-motion'
import { transitionCard, transitionFast } from '@/shared/animations'
import { useWorkspace } from '../hooks/useWorkspace'
import { formatDistanceToNow } from 'date-fns'
import { useNavigate } from 'react-router-dom'

export function BuyerOverview() {
  const { workspace, isLoading, refresh } = useWorkspace(3000)
  const navigate = useNavigate()

  useEffect(() => {
    refresh()
  }, [])

  if (isLoading || !workspace) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[var(--primary)]" />
      </div>
    )
  }

  const { stats, rfqs, orders, activities, aiInsights } = workspace

  const KPI_CARDS = [
    { title: 'Active RFQs', value: stats.activeRfqs.toString(), change: 'In progress', icon: FileText, trend: 'neutral' },
    { title: 'Quotes Received', value: stats.quotesReceived.toString(), change: 'Pending review', icon: MessageSquare, trend: 'neutral' },
    { title: 'Active Orders', value: stats.activeOrders.toString(), change: 'In fulfillment', icon: ShoppingBag, trend: 'neutral' },
    { title: 'Saved Suppliers', value: stats.savedSuppliers.toString(), change: 'Vetted partners', icon: Bookmark, trend: 'neutral' },
  ]

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={transitionFast}
      className="max-w-[1400px] mx-auto space-y-8"
    >
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[28px] font-display font-bold text-[var(--heading)] mb-1">Procurement Command Center</h1>
          <p className="text-[14px] font-medium text-[var(--body)]">Manage your entire enterprise sourcing lifecycle from RFQ to Delivery.</p>
        </div>
        <Button size="sm" className="h-10 px-5 bg-[var(--heading)] hover:bg-[#1E293B] text-white rounded-[10px] shadow-sm font-bold">
          <Sparkles className="w-4 h-4 mr-2" /> Start AI Sourcing
        </Button>
      </div>

      {/* 1. TOP: KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {KPI_CARDS.map((kpi, i) => (
          <motion.div whileHover={{ y: -2, transition: transitionCard }} key={i}>
            <Card className="p-6 shadow-sm border border-[var(--border)] bg-white flex flex-col justify-between h-36 relative overflow-hidden group rounded-[20px]">
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-[var(--primary)]/5 to-transparent rounded-bl-[100px] -z-10 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="flex justify-between items-start z-10">
                <span className="text-[11px] font-bold text-[#94A3B8] uppercase tracking-widest">{kpi.title}</span>
                <kpi.icon className="w-4 h-4 text-[var(--primary)]" />
              </div>
              <div className="z-10">
                <div className="text-[32px] font-display font-bold text-[var(--heading)] mb-1 tracking-tight leading-none">{kpi.value}</div>
                <div className="flex items-center gap-1.5 text-[12px] font-bold text-[#94A3B8]">
                  <span>{kpi.change}</span>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* 2. MIDDLE: Large Tables/Lists */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Table 1: Active RFQs */}
        <Card className="p-0 shadow-sm border border-[var(--border)] bg-white overflow-hidden flex flex-col h-[360px] rounded-[24px]">
          <div className="px-6 py-5 border-b border-[var(--border)] flex justify-between items-center bg-[#F8FAFC]">
            <div>
              <h3 className="font-bold text-[var(--heading)] text-[15px] flex items-center gap-2">
                <FileText className="w-4 h-4 text-[var(--primary)]" /> Active RFQs
              </h3>
            </div>
            <Button variant="ghost" size="sm" className="h-8 text-[12px] font-bold text-[var(--body)] hover:text-[var(--heading)]">View All</Button>
          </div>
          <div className="flex-1 overflow-y-auto custom-scrollbar">
            {rfqs.length === 0 ? (
               <div className="flex flex-col items-center justify-center h-full text-[#94A3B8]">
                 <FileText className="w-8 h-8 mb-2 opacity-50" />
                 <p className="text-[13px] font-bold">No active RFQs</p>
               </div>
            ) : (
              <div className="divide-y divide-[var(--border)]">
                {rfqs.map((rfq) => (
                  <div key={rfq._id} className="px-6 py-4 flex items-center justify-between hover:bg-[#F8FAFC] transition-colors cursor-pointer">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-[10px] bg-[#F1F5F9] flex items-center justify-center text-[12px] font-bold text-[var(--body)] border border-[var(--border)] uppercase">
                        {rfq._id.substring(rfq._id.length - 4)}
                      </div>
                      <div>
                        <h4 className="text-[14px] font-bold text-[var(--heading)] mb-0.5">{rfq.title}</h4>
                        <p className="text-[12px] font-medium text-[var(--body)]">
                          {rfq.targetPrice ? `$${rfq.targetPrice}/m` : 'Open Price'} <span className="mx-1 opacity-50">•</span> 
                          {formatDistanceToNow(new Date(rfq.createdAt), { addSuffix: true })}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <Badge className={`w-24 justify-center text-[11px] font-bold uppercase tracking-wider ${
                        rfq.status === 'quoted' ? 'bg-[var(--success)]/10 text-[var(--success)] border-[var(--success)]/20' : 
                        rfq.status === 'pending' || rfq.status === 'published' ? 'bg-[#F59E0B]/10 text-[#F59E0B] border-[#F59E0B]/20' : 
                        'bg-[var(--primary)]/10 text-[var(--primary)] border-[var(--primary)]/20'
                      }`}>
                        {rfq.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </Card>

        {/* Table 2: Recent Orders */}
        <Card className="p-0 shadow-sm border border-[var(--border)] bg-white overflow-hidden flex flex-col h-[360px] rounded-[24px]">
          <div className="px-6 py-5 border-b border-[var(--border)] flex justify-between items-center bg-[#F8FAFC]">
            <div>
              <h3 className="font-bold text-[var(--heading)] text-[15px] flex items-center gap-2">
                <ShoppingBag className="w-4 h-4 text-[var(--primary)]" /> Recent Orders
              </h3>
            </div>
            <Button variant="ghost" size="sm" className="h-8 text-[12px] font-bold text-[var(--body)] hover:text-[var(--heading)]" onClick={() => navigate('/dashboard/procurement')}>View All</Button>
          </div>
          <div className="flex-1 overflow-y-auto custom-scrollbar">
            {orders.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-[#94A3B8]">
                <ShoppingBag className="w-8 h-8 mb-2 opacity-50" />
                <p className="text-[13px] font-bold">No recent orders</p>
              </div>
            ) : (
              <div className="divide-y divide-[var(--border)]">
                {orders.slice(0, 5).map((order) => (
                  <div key={order._id} className="px-6 py-4 flex items-center justify-between hover:bg-[#F8FAFC] transition-colors cursor-pointer" onClick={() => navigate('/dashboard/procurement')}>
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-[10px] bg-[#F1F5F9] flex items-center justify-center text-[12px] font-bold text-[var(--body)] border border-[var(--border)] uppercase">
                        {order._id.substring(order._id.length - 4)}
                      </div>
                      <div>
                        <h4 className="text-[14px] font-bold text-[var(--heading)] mb-0.5">Order #{order._id.substring(order._id.length - 4)}</h4>
                        <div className="flex items-center gap-2 text-[12px] text-[var(--body)] font-medium">
                          <span>${order.finalPrice * order.quantity}</span> <span className="opacity-50">•</span> 
                          <span>{formatDistanceToNow(new Date(order.createdAt), { addSuffix: true })}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <Badge className={`w-24 justify-center text-[11px] font-bold uppercase tracking-wider ${
                        order.status.toLowerCase() === 'delivered' ? 'bg-[var(--success)]/10 text-[var(--success)] border-[var(--success)]/20' : 
                        order.status.toLowerCase() === 'pending' ? 'bg-[#F59E0B]/10 text-[#F59E0B] border-[#F59E0B]/20' : 
                        'bg-[var(--primary)]/10 text-[var(--primary)] border-[var(--primary)]/20'
                      }`}>
                        {order.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </Card>

      </div>

      {/* 3. BOTTOM: Timeline | AI | Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Timeline (Notifications) */}
        <Card className="p-6 shadow-sm border border-[var(--border)] bg-white flex flex-col h-[320px] rounded-[24px]">
          <h3 className="font-bold text-[var(--heading)] text-[15px] mb-6 flex items-center gap-2">
            <Bell className="w-4 h-4 text-[var(--primary)]" /> Activity Feed
          </h3>
          <div className="relative pl-4 border-l border-[var(--border)] space-y-6 flex-1 overflow-y-auto pr-2 custom-scrollbar">
            {activities.length === 0 ? (
               <div className="text-[13px] font-bold text-[#94A3B8] -ml-4 text-center mt-8">No recent activity</div>
            ) : activities.map((activity, i) => (
              <div key={activity.id || i} className="relative">
                <div className="absolute w-2.5 h-2.5 rounded-full bg-[var(--primary)] -left-[22px] top-1.5 ring-4 ring-white" />
                <h4 className="text-[13px] font-bold text-[var(--heading)]">{activity.title}</h4>
                <p className="text-[12px] font-medium text-[var(--body)] mt-1">{activity.description}</p>
                <span className="text-[10px] font-bold text-[#94A3B8] uppercase tracking-widest mt-1 block">
                  {formatDistanceToNow(new Date(activity.date), { addSuffix: true })}
                </span>
              </div>
            ))}
          </div>
        </Card>

        {/* AI Recommendations */}
        <Card className="p-6 shadow-sm border border-[var(--border)] bg-white relative overflow-hidden group h-[320px] flex flex-col rounded-[24px]">
          <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
            <Sparkles className="w-40 h-40 text-[var(--primary)]" />
          </div>
          <div className="flex items-center gap-2 mb-5 relative z-10">
            <Sparkles className="w-4 h-4 text-[var(--primary)]" />
            <h3 className="font-bold text-[var(--heading)] text-[15px]">AI Sourcing Insights</h3>
          </div>
          <div className="space-y-4 relative z-10 flex-1 overflow-y-auto pr-2 custom-scrollbar">
            
            {aiInsights?.marketTrend && (
               <div className="bg-[#F8FAFC] border border-[var(--border)] rounded-[16px] p-4 shadow-sm hover:border-[var(--primary)]/30 transition-colors">
               <Badge className="mb-2 text-[9px] font-bold uppercase tracking-widest bg-white border border-[var(--border)] text-[var(--primary)]">Market Trend</Badge>
               <h4 className="text-[13px] font-bold text-[var(--heading)] mb-1">Price {aiInsights.marketTrend.direction === 'up' ? 'Increase' : 'Decrease'} Expected</h4>
               <p className="text-[12px] font-medium text-[var(--body)] leading-relaxed">
                 {aiInsights.marketTrend.description}
               </p>
             </div>
            )}
           
            {aiInsights?.costSavings?.map((saving, i) => (
              <div key={i} className="bg-[#F8FAFC] border border-[var(--border)] rounded-[16px] p-4 shadow-sm hover:border-[var(--primary)]/30 transition-colors">
                <Badge className="mb-2 text-[9px] font-bold uppercase tracking-widest bg-white border border-[var(--border)] text-[var(--success)]">Cost Saving</Badge>
                <h4 className="text-[13px] font-bold text-[var(--heading)] mb-1">{saving.opportunity}</h4>
                <p className="text-[12px] font-medium text-[var(--body)] leading-relaxed">
                  Estimated savings: ${saving.estimatedSavings}
                </p>
              </div>
            ))}

            {aiInsights?.riskAlerts?.map((alert, i) => (
              <div key={i} className="bg-[#F8FAFC] border border-[var(--border)] rounded-[16px] p-4 shadow-sm hover:border-[var(--primary)]/30 transition-colors">
                <Badge className="mb-2 text-[9px] font-bold uppercase tracking-widest bg-white border border-[#F59E0B]/30 text-[#F59E0B]">
                  <AlertTriangle className="w-3 h-3 mr-1 inline" /> Risk Alert
                </Badge>
                <p className="text-[12px] font-medium text-[var(--body)] leading-relaxed">
                  {alert.message}
                </p>
              </div>
            ))}
          </div>
        </Card>

        {/* Quick Actions */}
        <Card className="p-6 shadow-sm border border-[var(--border)] bg-white flex flex-col h-[320px] rounded-[24px]">
          <h3 className="font-bold text-[var(--heading)] text-[15px] mb-6 flex items-center gap-2">
            <Zap className="w-4 h-4 text-[var(--primary)]" /> Quick Actions
          </h3>
          <div className="flex flex-col gap-3 flex-1 justify-center">
            <Button className="w-full justify-between h-12 text-[13px] font-bold bg-[var(--heading)] hover:bg-[var(--primary)] text-white shadow-sm rounded-[12px]">
              Draft New RFQ <ArrowRight className="w-4 h-4" />
            </Button>
            <Button variant="outline" className="w-full justify-between h-12 border-[var(--border)] bg-[#F8FAFC] hover:bg-[#F1F5F9] text-[13px] font-bold text-[var(--body)] rounded-[12px]">
              Browse Marketplace <ArrowRight className="w-4 h-4 text-[#94A3B8]" />
            </Button>
            <Button variant="outline" className="w-full justify-between h-12 border-[var(--border)] bg-[#F8FAFC] hover:bg-[#F1F5F9] text-[13px] font-bold text-[var(--body)] rounded-[12px]">
              Compare Suppliers <ArrowRight className="w-4 h-4 text-[#94A3B8]" />
            </Button>
          </div>
        </Card>

      </div>
    </motion.div>
  )
}
