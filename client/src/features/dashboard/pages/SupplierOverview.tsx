import { Card } from '@/shared/components/ui/card'
import { Badge } from '@/shared/components/ui/badge'
import { Button } from '@/shared/components/ui/button'
import { FileText, ShoppingBag, Store, TrendingUp, Sparkles, ArrowRight, Zap, Bell } from 'lucide-react'
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts'
import { motion } from 'framer-motion'
import { transitionCard, transitionFast } from '@/shared/animations'

const KPI_CARDS = [
  { title: 'Gross Volume', value: '$124.5K', change: '+12.5%', icon: TrendingUp, timeframe: 'vs last month' },
  { title: 'Pending RFQs', value: '18', change: '5 require attention', icon: FileText, timeframe: 'active' },
  { title: 'Active Orders', value: '12', change: '3 in production', icon: ShoppingBag, timeframe: 'active' },
  { title: 'Active Products', value: '156', change: '+2 published', icon: Store, timeframe: 'this week' },
]

const data = [
  { name: 'Jan', value: 30000 },
  { name: 'Feb', value: 45000 },
  { name: 'Mar', value: 42000 },
  { name: 'Apr', value: 60000 },
  { name: 'May', value: 85000 },
  { name: 'Jun', value: 124500 },
]

export function SupplierOverview() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={transitionFast}
      className="p-8 max-w-7xl mx-auto space-y-8"
    >
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[var(--text-primary)] mb-1">Supplier Overview</h1>
          <p className="text-sm text-[var(--text-secondary)]">Your enterprise operations center.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" className="h-9 border-[var(--border-color)]">Export Report</Button>
          <Button size="sm" className="h-9">Add Product</Button>
        </div>
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
                  <span className={kpi.change.includes('+') ? 'text-emerald-600' : 'text-[var(--text-secondary)]'}>
                    {kpi.change}
                  </span>
                  <span className="text-[var(--text-tertiary)]">{kpi.timeframe}</span>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* 2. MIDDLE: Charts & Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Chart */}
        <Card className="p-6 shadow-sm border-[var(--border-color)] bg-[var(--surface-0)]">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="font-semibold text-[var(--text-primary)] text-sm">Revenue Over Time</h3>
              <p className="text-xs text-[var(--text-secondary)] mt-1">Gross merchandise volume (USD)</p>
            </div>
            <select className="bg-[var(--surface-1)] border border-[var(--border-color)] text-[var(--text-secondary)] text-xs rounded-lg px-3 py-1.5 outline-none font-medium">
              <option>Last 6 Months</option>
              <option>This Year</option>
              <option>All Time</option>
            </select>
          </div>
          <div className="h-[280px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--color-brand-primary)" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="var(--color-brand-primary)" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border-color)" opacity={0.5} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: 'var(--text-tertiary)', fontSize: 11, fontWeight: 600 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: 'var(--text-tertiary)', fontSize: 11, fontWeight: 600 }} tickFormatter={(val) => `$${val/1000}k`} />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'var(--surface-1)', borderRadius: '8px', border: '1px solid var(--border-color)', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  itemStyle={{ color: 'var(--text-primary)', fontSize: '13px', fontWeight: 600 }}
                  labelStyle={{ color: 'var(--text-secondary)', fontSize: '12px', marginBottom: '4px' }}
                  formatter={(value: any) => [`$${Number(value).toLocaleString()}`, 'Revenue']}
                />
                <Area type="monotone" dataKey="value" stroke="var(--color-brand-primary)" strokeWidth={2} fillOpacity={1} fill="url(#colorValue)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Table (Pipeline) */}
        <Card className="p-0 shadow-sm border-[var(--border-color)] bg-[var(--surface-0)] overflow-hidden flex flex-col">
          <div className="px-6 py-5 border-b border-[var(--border-color)] flex justify-between items-center bg-[var(--surface-1)]/30">
            <div>
              <h3 className="font-semibold text-[var(--text-primary)] text-sm">RFQ Pipeline</h3>
              <p className="text-xs text-[var(--text-secondary)] mt-1">High-value procurement requests</p>
            </div>
            <Button variant="ghost" size="sm" className="h-8 text-xs font-medium">View All</Button>
          </div>
          <div className="overflow-x-auto flex-1">
            <table className="w-full text-left text-sm text-[var(--text-secondary)] border-collapse">
              <thead>
                <tr className="border-b border-[var(--border-color)] bg-[var(--surface-0)]">
                  <th className="py-3 px-6 font-bold uppercase tracking-wider text-[var(--text-tertiary)] text-[10px] w-24">RFQ ID</th>
                  <th className="py-3 px-6 font-bold uppercase tracking-wider text-[var(--text-tertiary)] text-[10px]">Buyer</th>
                  <th className="py-3 px-6 font-bold uppercase tracking-wider text-[var(--text-tertiary)] text-[10px]">Value (Est)</th>
                  <th className="py-3 px-6 font-bold uppercase tracking-wider text-[var(--text-tertiary)] text-[10px] text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border-color-subtle)]">
                {[
                  { id: '#8829', buyer: 'H&M Global Sourcing', val: '$42,000', status: 'Pending Reply', statusType: 'warning' },
                  { id: '#8828', buyer: 'Everlane', val: '$18,500', status: 'Negotiating', statusType: 'primary' },
                  { id: '#8825', buyer: 'Inditex (Zara)', val: '$110,000', status: 'Quote Accepted', statusType: 'success' },
                  { id: '#8824', buyer: 'Patagonia', val: '$34,000', status: 'Draft', statusType: 'default' },
                ].map((row, i) => (
                  <tr key={i} className="hover:bg-[var(--surface-1)] transition-colors cursor-pointer group">
                    <td className="py-4 px-6 font-medium text-[var(--text-primary)]">{row.id}</td>
                    <td className="py-4 px-6 font-medium text-[var(--text-primary)] group-hover:text-brand-primary transition-colors">{row.buyer}</td>
                    <td className="py-4 px-6 font-medium text-[var(--text-primary)]">{row.val}</td>
                    <td className="py-4 px-6 text-right"><Badge variant={row.statusType as any} size="sm">{row.status}</Badge></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>

      {/* 3. BOTTOM: Timeline | AI | Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Timeline (Notifications) */}
        <Card className="p-6 shadow-sm border-[var(--border-color)] bg-[var(--surface-0)] flex flex-col h-[320px]">
          <h3 className="font-semibold text-[var(--text-primary)] text-sm mb-6 flex items-center gap-2">
            <Bell className="w-4 h-4 text-brand-primary" /> Recent Activity
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
              <h4 className="text-xs font-bold text-[var(--text-tertiary)]">System Update</h4>
              <p className="text-[11px] text-[var(--text-tertiary)] mt-1">Marketplace AI engine updated to v2.4.</p>
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
            <h3 className="font-semibold text-[var(--text-primary)] text-sm">AI Market Insights</h3>
          </div>
          <div className="space-y-4 relative z-10 flex-1 overflow-y-auto pr-2">
            <div className="bg-[var(--surface-1)] border border-[var(--border-color)] rounded-xl p-4 shadow-inner">
              <Badge variant="primary" size="sm" className="mb-2 text-[9px] bg-[var(--surface-0)]">Pricing Strategy</Badge>
              <p className="text-xs font-medium text-[var(--text-primary)] leading-relaxed">
                Your quotes for <strong className="text-brand-primary">Heavyweight Denim</strong> are 15% higher than the platform average. Lowering your bulk tier by $0.30/m could increase win rate by 40%.
              </p>
            </div>
            <div className="bg-[var(--surface-1)] border border-[var(--border-color)] rounded-xl p-4 shadow-inner">
              <Badge variant="warning" size="sm" className="mb-2 text-[9px] bg-[var(--surface-0)]">Demand Trend</Badge>
              <p className="text-xs font-medium text-[var(--text-primary)] leading-relaxed">
                Searches for <strong className="text-amber-600">Recycled Cotton</strong> are up 200% this week. Consider publishing your eco-friendly catalog items.
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
              Publish New Product <ArrowRight className="w-4 h-4" />
            </Button>
            <Button variant="outline" className="w-full justify-between h-12 border-[var(--border-color)] bg-[var(--surface-1)] hover:bg-[var(--surface-2)] text-sm font-semibold text-[var(--text-secondary)]">
              Respond to RFQs <span className="bg-brand-primary text-white text-[10px] px-1.5 py-0.5 rounded-full ml-auto mr-2">5</span> <ArrowRight className="w-4 h-4 text-[var(--text-tertiary)]" />
            </Button>
            <Button variant="outline" className="w-full justify-between h-12 border-[var(--border-color)] bg-[var(--surface-1)] hover:bg-[var(--surface-2)] text-sm font-semibold text-[var(--text-secondary)]">
              Contact Account Manager <ArrowRight className="w-4 h-4 text-[var(--text-tertiary)]" />
            </Button>
          </div>
        </Card>

      </div>
    </motion.div>
  )
}
