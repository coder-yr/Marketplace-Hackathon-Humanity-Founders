import { Card } from '@/shared/components/ui/card'
import { Badge } from '@/shared/components/ui/badge'
import { Button } from '@/shared/components/ui/button'
import { FileText, ShoppingBag, Bookmark, MessageSquare, Bell, Sparkles, Zap, ArrowRight, TrendingUp } from 'lucide-react'
import { motion } from 'framer-motion'
import { transitionCard, transitionFast } from '@/shared/animations'

const KPI_CARDS = [
  { title: 'Active RFQs', value: '12', change: '+2 this week', icon: FileText, trend: 'up' },
  { title: 'Quotes Received', value: '48', change: '8 pending review', icon: MessageSquare, trend: 'neutral' },
  { title: 'Active Orders', value: '3', change: '1 shipping soon', icon: ShoppingBag, trend: 'neutral' },
  { title: 'Saved Suppliers', value: '24', change: '+5 this month', icon: Bookmark, trend: 'up' },
]

export function BuyerOverview() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={transitionFast}
      className="max-w-[1400px] mx-auto space-y-8"
    >
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[28px] font-display font-bold text-[var(--heading)] mb-1">Procurement Dashboard</h1>
          <p className="text-[14px] font-medium text-[var(--body)]">Manage your entire sourcing lifecycle from RFQ to Delivery.</p>
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
                <div className="flex items-center gap-1.5 text-[12px] font-bold">
                  <span className={kpi.change.includes('+') ? 'text-[var(--success)]' : 'text-[var(--body)]'}>
                    {kpi.change}
                  </span>
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
            <div className="divide-y divide-[var(--border)]">
              {[
                { id: 'RFQ-8829', item: 'Organic Cotton Jersey 180GSM', supplier: 'EcoTextiles Ltd', status: 'Quoted', replies: 3, time: '2 hours ago' },
                { id: 'RFQ-8828', item: 'Heavyweight Raw Denim 14oz', supplier: 'Rajeev Textiles', status: 'Pending', replies: 0, time: '1 day ago' },
                { id: 'RFQ-8827', item: 'Silk Charmeuse 19mm', supplier: 'Hangzhou Silk Co', status: 'Negotiating', replies: 5, time: '2 days ago' },
                { id: 'RFQ-8826', item: 'Recycled Polyester', supplier: 'Global Weaves', status: 'Pending', replies: 0, time: '3 days ago' },
              ].map((rfq, i) => (
                <div key={i} className="px-6 py-4 flex items-center justify-between hover:bg-[#F8FAFC] transition-colors cursor-pointer">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-[10px] bg-[#F1F5F9] flex items-center justify-center text-[12px] font-bold text-[var(--body)] border border-[var(--border)]">
                      {rfq.id.split('-')[1]}
                    </div>
                    <div>
                      <h4 className="text-[14px] font-bold text-[var(--heading)] mb-0.5">{rfq.item}</h4>
                      <p className="text-[12px] font-medium text-[var(--body)]">{rfq.supplier} <span className="mx-1 opacity-50">•</span> {rfq.time}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-[10px] font-bold text-[#94A3B8] uppercase tracking-widest hidden sm:block">{rfq.replies} Replies</div>
                    <Badge className={`w-24 justify-center text-[11px] font-bold uppercase tracking-wider ${
                      rfq.status === 'Quoted' ? 'bg-[var(--success)]/10 text-[var(--success)] border-[var(--success)]/20' : 
                      rfq.status === 'Pending' ? 'bg-[#F59E0B]/10 text-[#F59E0B] border-[#F59E0B]/20' : 
                      'bg-[var(--primary)]/10 text-[var(--primary)] border-[var(--primary)]/20'
                    }`}>
                      {rfq.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* Table 2: Saved Suppliers */}
        <Card className="p-0 shadow-sm border border-[var(--border)] bg-white overflow-hidden flex flex-col h-[360px] rounded-[24px]">
          <div className="px-6 py-5 border-b border-[var(--border)] flex justify-between items-center bg-[#F8FAFC]">
            <div>
              <h3 className="font-bold text-[var(--heading)] text-[15px] flex items-center gap-2">
                <Bookmark className="w-4 h-4 text-[var(--primary)]" /> Saved Suppliers
              </h3>
            </div>
            <Button variant="ghost" size="sm" className="h-8 text-[12px] font-bold text-[var(--body)] hover:text-[var(--heading)]">Manage List</Button>
          </div>
          <div className="flex-1 overflow-y-auto custom-scrollbar">
            <div className="divide-y divide-[var(--border)]">
              {[
                { name: 'EcoTextiles Ltd', origin: 'India', certs: ['GOTS', 'ISO 9001'], rating: 4.9 },
                { name: 'Rajeev Textiles', origin: 'India', certs: ['OEKO-TEX'], rating: 4.7 },
                { name: 'Hangzhou Silk Co', origin: 'China', certs: ['ISO 9001'], rating: 4.8 },
                { name: 'Kuroki Textiles', origin: 'Japan', certs: ['GOTS'], rating: 5.0 },
              ].map((supplier, i) => (
                <div key={i} className="px-6 py-4 flex items-center justify-between hover:bg-[#F8FAFC] transition-colors cursor-pointer">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-[10px] bg-[var(--heading)] text-white flex items-center justify-center text-[14px] font-bold shadow-sm">
                      {supplier.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="text-[14px] font-bold text-[var(--heading)] mb-0.5">{supplier.name}</h4>
                      <div className="flex items-center gap-2 text-[12px] text-[var(--body)] font-medium">
                        <span>{supplier.origin}</span> <span className="opacity-50">•</span> 
                        <span className="flex items-center gap-1"><TrendingUp className="w-3 h-3 text-[var(--success)]" /> {supplier.rating}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-1.5 hidden sm:flex">
                    {supplier.certs.map(cert => (
                      <span key={cert} className="px-2 py-1 text-[9px] font-bold uppercase tracking-widest rounded-[6px] border border-[var(--border)] bg-[#F8FAFC] text-[var(--body)]">
                        {cert}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>

      </div>

      {/* 3. BOTTOM: Timeline | AI | Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Timeline (Notifications) */}
        <Card className="p-6 shadow-sm border border-[var(--border)] bg-white flex flex-col h-[320px] rounded-[24px]">
          <h3 className="font-bold text-[var(--heading)] text-[15px] mb-6 flex items-center gap-2">
            <Bell className="w-4 h-4 text-[var(--primary)]" /> Order Status
          </h3>
          <div className="relative pl-4 border-l border-[var(--border)] space-y-6 flex-1 overflow-y-auto pr-2 custom-scrollbar">
            <div className="relative">
              <div className="absolute w-2.5 h-2.5 rounded-full bg-[var(--success)] -left-[22px] top-1.5 ring-4 ring-white" />
              <h4 className="text-[13px] font-bold text-[var(--heading)]">Order ORD-9921 Shipped</h4>
              <p className="text-[12px] font-medium text-[var(--body)] mt-1">200m Organic Cotton shipped via DHL.</p>
              <span className="text-[10px] font-bold text-[#94A3B8] uppercase tracking-widest mt-1 block">Today, 10:42 AM</span>
            </div>
            <div className="relative">
              <div className="absolute w-2.5 h-2.5 rounded-full bg-[var(--primary)] -left-[22px] top-1.5 ring-4 ring-white" />
              <h4 className="text-[13px] font-bold text-[var(--heading)]">Payment Escrowed</h4>
              <p className="text-[12px] font-medium text-[var(--body)] mt-1">Funds secured for ORD-9922 (Denim).</p>
              <span className="text-[10px] font-bold text-[#94A3B8] uppercase tracking-widest mt-1 block">Yesterday, 3:15 PM</span>
            </div>
            <div className="relative">
              <div className="absolute w-2.5 h-2.5 rounded-full bg-[#CBD5E1] -left-[22px] top-1.5 ring-4 ring-white" />
              <h4 className="text-[13px] font-bold text-[var(--body)]">Awaiting Production</h4>
              <p className="text-[12px] font-medium text-[#94A3B8] mt-1">ORD-9923 scheduled for next week.</p>
            </div>
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
            <div className="bg-[#F8FAFC] border border-[var(--border)] rounded-[16px] p-4 shadow-sm hover:border-[var(--primary)]/30 transition-colors">
              <Badge className="mb-2 text-[9px] font-bold uppercase tracking-widest bg-white border border-[var(--border)] text-[var(--primary)]">Alternative Found</Badge>
              <h4 className="text-[13px] font-bold text-[var(--heading)] mb-1">Bamboo Lyocell</h4>
              <p className="text-[12px] font-medium text-[var(--body)] leading-relaxed">
                A sustainable alternative to your recently searched viscose, available at $3.20/m from 2 verified suppliers.
              </p>
            </div>
            <div className="bg-[#F8FAFC] border border-[var(--border)] rounded-[16px] p-4 shadow-sm hover:border-[var(--primary)]/30 transition-colors">
              <Badge className="mb-2 text-[9px] font-bold uppercase tracking-widest bg-white border border-[var(--border)] text-[#F59E0B]">Price Drop</Badge>
              <h4 className="text-[13px] font-bold text-[var(--heading)] mb-1">French Terry 400GSM</h4>
              <p className="text-[12px] font-medium text-[var(--body)] leading-relaxed">
                A supplier in your saved list has dropped their MOQ to 100m.
              </p>
            </div>
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
