import { Card } from '@/shared/components/ui/card'
import { Badge } from '@/shared/components/ui/badge'
import { Button } from '@/shared/components/ui/button'
import { FileText, ShoppingBag, Bookmark, MessageSquare, Bell, Sparkles, Zap, ArrowRight } from 'lucide-react'
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
      className="p-8 max-w-7xl mx-auto space-y-8"
    >
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[var(--text-primary)] mb-1">Procurement Dashboard</h1>
          <p className="text-sm text-[var(--text-secondary)]">Manage your sourcing operations.</p>
        </div>
        <Button size="sm" className="h-9 shadow-md"><Sparkles className="w-4 h-4 mr-2" /> Start AI Sourcing</Button>
      </div>

      {/* 1. TOP: KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {KPI_CARDS.map((kpi, i) => (
          <motion.div whileHover={{ y: -2, transition: transitionCard }} key={i}>
            <Card className="p-6 shadow-sm border-[var(--border-color)] bg-[var(--surface-0)] flex flex-col justify-between h-36 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-brand-primary/5 to-transparent rounded-bl-[100px] -z-10 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="flex justify-between items-start z-10">
                <span className="text-sm font-semibold text-[var(--text-secondary)] uppercase tracking-wider text-[10px]">{kpi.title}</span>
                <kpi.icon className="w-4 h-4 text-[var(--text-tertiary)]" />
              </div>
              <div className="z-10">
                <div className="text-3xl font-display font-semibold text-[var(--text-primary)] mb-1 tracking-tight">{kpi.value}</div>
                <div className="flex items-center gap-1.5 text-xs font-medium">
                  <span className={kpi.change.includes('+') ? 'text-brand-primary' : 'text-[var(--text-secondary)]'}>
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
        <Card className="p-0 shadow-sm border-[var(--border-color)] bg-[var(--surface-0)] overflow-hidden flex flex-col h-[320px]">
          <div className="px-6 py-5 border-b border-[var(--border-color)] flex justify-between items-center bg-[var(--surface-1)]/30">
            <div>
              <h3 className="font-semibold text-[var(--text-primary)] text-sm flex items-center gap-2">
                <FileText className="w-4 h-4 text-brand-primary" /> Active RFQs
              </h3>
            </div>
            <Button variant="ghost" size="sm" className="h-8 text-xs font-medium">View All</Button>
          </div>
          <div className="flex-1 overflow-y-auto">
            <div className="divide-y divide-[var(--border-color-subtle)]">
              {[
                { id: 'RFQ-8829', item: 'Organic Cotton Jersey 180GSM', supplier: 'EcoTextiles Ltd', status: 'Quoted', replies: 3, time: '2 hours ago' },
                { id: 'RFQ-8828', item: 'Heavyweight Raw Denim 14oz', supplier: 'Rajeev Textiles', status: 'Pending', replies: 0, time: '1 day ago' },
                { id: 'RFQ-8827', item: 'Silk Charmeuse 19mm', supplier: 'Hangzhou Silk Co', status: 'Negotiating', replies: 5, time: '2 days ago' },
              ].map((rfq, i) => (
                <div key={i} className="px-6 py-4 flex items-center justify-between hover:bg-[var(--surface-1)] transition-colors cursor-pointer">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-[var(--surface-2)] flex items-center justify-center text-xs font-bold text-[var(--text-tertiary)] border border-[var(--border-color-subtle)]">
                      {rfq.id.split('-')[1]}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-[var(--text-primary)] mb-0.5">{rfq.item}</h4>
                      <p className="text-xs text-[var(--text-secondary)]">{rfq.supplier} • {rfq.time}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-[10px] font-bold text-[var(--text-tertiary)] uppercase tracking-wider hidden sm:block">{rfq.replies} Replies</div>
                    <Badge variant={rfq.status === 'Quoted' ? 'success' : rfq.status === 'Pending' ? 'warning' : 'primary'} size="sm" className="w-24 justify-center">
                      {rfq.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* Table 2: Saved Suppliers */}
        <Card className="p-0 shadow-sm border-[var(--border-color)] bg-[var(--surface-0)] overflow-hidden flex flex-col h-[320px]">
          <div className="px-6 py-5 border-b border-[var(--border-color)] flex justify-between items-center bg-[var(--surface-1)]/30">
            <div>
              <h3 className="font-semibold text-[var(--text-primary)] text-sm flex items-center gap-2">
                <Bookmark className="w-4 h-4 text-brand-primary" /> Saved Suppliers
              </h3>
            </div>
            <Button variant="ghost" size="sm" className="h-8 text-xs font-medium">Manage List</Button>
          </div>
          <div className="flex-1 overflow-y-auto">
            <div className="divide-y divide-[var(--border-color-subtle)]">
              {[
                { name: 'EcoTextiles Ltd', origin: 'India', certs: ['GOTS', 'ISO 9001'], rating: 4.9 },
                { name: 'Rajeev Textiles', origin: 'India', certs: ['OEKO-TEX'], rating: 4.7 },
                { name: 'Hangzhou Silk Co', origin: 'China', certs: ['ISO 9001'], rating: 4.8 },
              ].map((supplier, i) => (
                <div key={i} className="px-6 py-4 flex items-center justify-between hover:bg-[var(--surface-1)] transition-colors cursor-pointer">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-[var(--text-primary)] text-white flex items-center justify-center text-sm font-bold shadow-sm">
                      {supplier.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-[var(--text-primary)] mb-0.5">{supplier.name}</h4>
                      <div className="flex items-center gap-2 text-[10px] text-[var(--text-secondary)] font-medium">
                        <span>{supplier.origin}</span> • <span>★ {supplier.rating}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-1.5 hidden sm:flex">
                    {supplier.certs.map(cert => (
                      <span key={cert} className="px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider rounded border border-[var(--border-color-subtle)] bg-[var(--surface-1)] text-[var(--text-tertiary)]">
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
        <Card className="p-6 shadow-sm border-[var(--border-color)] bg-[var(--surface-0)] flex flex-col h-[320px]">
          <h3 className="font-semibold text-[var(--text-primary)] text-sm mb-6 flex items-center gap-2">
            <Bell className="w-4 h-4 text-brand-primary" /> Order Status
          </h3>
          <div className="relative pl-4 border-l border-[var(--border-color)] space-y-6 flex-1 overflow-y-auto pr-2">
            <div className="relative">
              <div className="absolute w-2 h-2 rounded-full bg-emerald-500 -left-[21px] top-1.5 ring-4 ring-[var(--surface-0)]" />
              <h4 className="text-xs font-bold text-[var(--text-primary)]">Order ORD-9921 Shipped</h4>
              <p className="text-[11px] text-[var(--text-secondary)] mt-1">200m Organic Cotton shipped via DHL.</p>
              <span className="text-[9px] font-semibold text-[var(--text-tertiary)] uppercase mt-1 block">Today, 10:42 AM</span>
            </div>
            <div className="relative">
              <div className="absolute w-2 h-2 rounded-full bg-brand-primary -left-[21px] top-1.5 ring-4 ring-[var(--surface-0)]" />
              <h4 className="text-xs font-bold text-[var(--text-primary)]">Payment Escrowed</h4>
              <p className="text-[11px] text-[var(--text-secondary)] mt-1">Funds secured for ORD-9922 (Denim).</p>
              <span className="text-[9px] font-semibold text-[var(--text-tertiary)] uppercase mt-1 block">Yesterday, 3:15 PM</span>
            </div>
            <div className="relative">
              <div className="absolute w-2 h-2 rounded-full bg-[var(--border-color-subtle)] -left-[21px] top-1.5 ring-4 ring-[var(--surface-0)]" />
              <h4 className="text-xs font-bold text-[var(--text-tertiary)]">Awaiting Production</h4>
              <p className="text-[11px] text-[var(--text-tertiary)] mt-1">ORD-9923 scheduled for next week.</p>
            </div>
          </div>
        </Card>

        {/* AI Recommendations */}
        <Card className="p-6 shadow-sm border-[var(--border-color)] bg-[var(--surface-0)] relative overflow-hidden group h-[320px] flex flex-col">
          <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
            <Sparkles className="w-32 h-32 text-brand-primary" />
          </div>
          <div className="flex items-center gap-2 mb-5 relative z-10">
            <Sparkles className="w-4 h-4 text-brand-primary" />
            <h3 className="font-semibold text-[var(--text-primary)] text-sm">AI Sourcing Insights</h3>
          </div>
          <div className="space-y-4 relative z-10 flex-1 overflow-y-auto pr-2">
            <div className="bg-[var(--surface-1)] border border-[var(--border-color)] rounded-xl p-4 shadow-inner">
              <Badge variant="primary" size="sm" className="mb-2 text-[9px] bg-[var(--surface-0)]">Alternative Found</Badge>
              <h4 className="text-xs font-bold text-[var(--text-primary)] mb-1">Bamboo Lyocell</h4>
              <p className="text-xs font-medium text-[var(--text-secondary)] leading-relaxed">
                A sustainable alternative to your recently searched viscose, available at $3.20/m from 2 verified suppliers.
              </p>
            </div>
            <div className="bg-[var(--surface-1)] border border-[var(--border-color)] rounded-xl p-4 shadow-inner">
              <Badge variant="warning" size="sm" className="mb-2 text-[9px] bg-[var(--surface-0)]">Price Drop</Badge>
              <h4 className="text-xs font-bold text-[var(--text-primary)] mb-1">French Terry 400GSM</h4>
              <p className="text-xs font-medium text-[var(--text-secondary)] leading-relaxed">
                A supplier in your saved list has dropped their MOQ to 100m.
              </p>
            </div>
          </div>
        </Card>

        {/* Quick Actions */}
        <Card className="p-6 shadow-sm border-[var(--border-color)] bg-[var(--surface-0)] flex flex-col h-[320px]">
          <h3 className="font-semibold text-[var(--text-primary)] text-sm mb-6 flex items-center gap-2">
            <Zap className="w-4 h-4 text-brand-primary" /> Quick Actions
          </h3>
          <div className="flex flex-col gap-3 flex-1 justify-center">
            <Button variant="primary" className="w-full justify-between h-12 text-sm font-bold shadow-md">
              Draft New RFQ <ArrowRight className="w-4 h-4" />
            </Button>
            <Button variant="outline" className="w-full justify-between h-12 border-[var(--border-color)] bg-[var(--surface-1)] hover:bg-[var(--surface-2)] text-sm font-semibold text-[var(--text-secondary)]">
              Browse Marketplace <ArrowRight className="w-4 h-4 text-[var(--text-tertiary)]" />
            </Button>
            <Button variant="outline" className="w-full justify-between h-12 border-[var(--border-color)] bg-[var(--surface-1)] hover:bg-[var(--surface-2)] text-sm font-semibold text-[var(--text-secondary)]">
              Compare Suppliers <ArrowRight className="w-4 h-4 text-[var(--text-tertiary)]" />
            </Button>
          </div>
        </Card>

      </div>
    </motion.div>
  )
}
