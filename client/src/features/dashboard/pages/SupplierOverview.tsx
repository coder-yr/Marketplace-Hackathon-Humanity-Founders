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
import { useAuthStore } from '@/features/auth/store/auth.store'
import { useEffect, useState } from 'react'
import { productsApi } from '@/features/products/api/products.api'
import { Product } from '@/features/products/types/products.types'

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
  const { user } = useAuthStore()
  const [products, setProducts] = useState<Product[]>([])
  
  useEffect(() => {
    if (user?._id) {
      productsApi.getProducts({ supplierId: user._id, limit: 100 })
        .then(res => setProducts(res.data))
        .catch(err => console.error(err))
    }
  }, [user])

  // Compute Inventory Alerts
  const inventoryAlerts = products.flatMap(p => {
    if (!p.variants) return []
    return p.variants.map(v => {
      let status = 'Good'
      let statusType = 'default'
      if (v.stock === 0) {
        status = 'Out of Stock'
        statusType = 'error'
      } else if (v.stock < p.moq.value) {
        status = 'Low Stock (< MOQ)'
        statusType = 'warning'
      } else if (v.stock < 100) {
        status = 'Restock Soon'
        statusType = 'warning'
      } else {
        return null // Don't alert if stock is good
      }
      
      return {
        product: p,
        variant: v,
        status,
        statusType
      }
    }).filter(Boolean)
  })

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={transitionFast}
      className="max-w-[1400px] mx-auto space-y-8"
    >
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[28px] font-display font-bold text-[var(--heading)] mb-1">Supplier Overview</h1>
          <p className="text-[14px] font-medium text-[var(--body)]">Your enterprise operations center.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" className="h-10 px-5 border-[var(--border)] text-[var(--heading)] font-bold rounded-[10px]">Export Report</Button>
          <Button size="sm" className="h-10 px-5 bg-[var(--heading)] hover:bg-[var(--primary)] text-white rounded-[10px] shadow-sm font-bold">Add Product</Button>
        </div>
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
                  <span className="text-[#94A3B8]">{kpi.timeframe}</span>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* 2. MIDDLE: Charts & Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Chart */}
        <Card className="p-6 shadow-sm border border-[var(--border)] bg-white rounded-[24px]">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="font-bold text-[var(--heading)] text-[15px]">Revenue Over Time</h3>
              <p className="text-[12px] text-[var(--body)] font-medium mt-1">Gross merchandise volume (USD)</p>
            </div>
            <select className="bg-[#F8FAFC] border border-[var(--border)] text-[var(--body)] text-[12px] font-bold rounded-[8px] px-3 py-1.5 outline-none focus:ring-2 focus:ring-[var(--focus-ring-color)]">
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
                    <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="var(--primary)" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" opacity={0.5} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94A3B8', fontSize: 11, fontWeight: 'bold' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94A3B8', fontSize: 11, fontWeight: 'bold' }} tickFormatter={(val) => `$${val/1000}k`} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid var(--border)', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  itemStyle={{ color: 'var(--heading)', fontSize: '13px', fontWeight: 'bold' }}
                  labelStyle={{ color: 'var(--body)', fontSize: '12px', marginBottom: '4px' }}
                  formatter={(value: any) => [`$${Number(value).toLocaleString()}`, 'Revenue']}
                />
                <Area type="monotone" dataKey="value" stroke="var(--primary)" strokeWidth={2} fillOpacity={1} fill="url(#colorValue)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Table (Pipeline) */}
        <Card className="p-0 shadow-sm border border-[var(--border)] bg-white overflow-hidden flex flex-col rounded-[24px]">
          <div className="px-6 py-5 border-b border-[var(--border)] flex justify-between items-center bg-[#F8FAFC]">
            <div>
              <h3 className="font-bold text-[var(--heading)] text-[15px]">RFQ Pipeline</h3>
              <p className="text-[12px] text-[var(--body)] font-medium mt-1">High-value procurement requests</p>
            </div>
            <Button variant="ghost" size="sm" className="h-8 text-[12px] font-bold text-[var(--body)] hover:text-[var(--heading)]">View All</Button>
          </div>
          <div className="overflow-x-auto flex-1 custom-scrollbar">
            <table className="w-full text-left text-[13px] text-[var(--body)] border-collapse">
              <thead>
                <tr className="border-b border-[var(--border)] bg-white">
                  <th className="py-4 px-6 font-bold uppercase tracking-wider text-[#94A3B8] text-[10px] w-24">RFQ ID</th>
                  <th className="py-4 px-6 font-bold uppercase tracking-wider text-[#94A3B8] text-[10px]">Buyer</th>
                  <th className="py-4 px-6 font-bold uppercase tracking-wider text-[#94A3B8] text-[10px]">Value (Est)</th>
                  <th className="py-4 px-6 font-bold uppercase tracking-wider text-[#94A3B8] text-[10px] text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border)]">
                {[
                  { id: '#8829', buyer: 'H&M Global Sourcing', val: '$42,000', status: 'Pending Reply', statusType: 'warning' },
                  { id: '#8828', buyer: 'Everlane', val: '$18,500', status: 'Negotiating', statusType: 'primary' },
                  { id: '#8825', buyer: 'Inditex (Zara)', val: '$110,000', status: 'Quote Accepted', statusType: 'success' },
                  { id: '#8824', buyer: 'Patagonia', val: '$34,000', status: 'Draft', statusType: 'default' },
                ].map((row, i) => (
                  <tr key={i} className="hover:bg-[#F8FAFC] transition-colors cursor-pointer group">
                    <td className="py-4 px-6 font-bold text-[var(--heading)]">{row.id}</td>
                    <td className="py-4 px-6 font-bold text-[var(--heading)] group-hover:text-[var(--primary)] transition-colors">{row.buyer}</td>
                    <td className="py-4 px-6 font-medium text-[var(--heading)]">{row.val}</td>
                    <td className="py-4 px-6 text-right">
                      <Badge className={`justify-center text-[11px] font-bold uppercase tracking-wider ${
                        row.statusType === 'success' ? 'bg-[var(--success)]/10 text-[var(--success)] border-[var(--success)]/20' : 
                        row.statusType === 'warning' ? 'bg-[#F59E0B]/10 text-[#F59E0B] border-[#F59E0B]/20' : 
                        row.statusType === 'primary' ? 'bg-[var(--primary)]/10 text-[var(--primary)] border-[var(--primary)]/20' :
                        'bg-[#F1F5F9] text-[#64748B] border-[#E2E8F0]'
                      }`}>
                        {row.status}
                      </Badge>
                    </td>
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
        <Card className="p-6 shadow-sm border border-[var(--border)] bg-white flex flex-col h-[320px] rounded-[24px]">
          <h3 className="font-bold text-[var(--heading)] text-[15px] mb-6 flex items-center gap-2">
            <Bell className="w-4 h-4 text-[var(--primary)]" /> Recent Activity
          </h3>
          <div className="relative pl-4 border-l border-[var(--border)] space-y-6 flex-1 overflow-y-auto pr-2 custom-scrollbar">
            <div className="relative">
              <div className="absolute w-2.5 h-2.5 rounded-full bg-[var(--success)] -left-[22px] top-1.5 ring-4 ring-white" />
              <h4 className="text-[13px] font-bold text-[var(--heading)]">Order ORD-9921 Shipped</h4>
              <p className="text-[12px] text-[var(--body)] font-medium mt-1">200m Organic Cotton shipped via DHL.</p>
              <span className="text-[10px] font-bold text-[#94A3B8] uppercase tracking-widest mt-1 block">Today, 10:42 AM</span>
            </div>
            <div className="relative">
              <div className="absolute w-2.5 h-2.5 rounded-full bg-[var(--primary)] -left-[22px] top-1.5 ring-4 ring-white" />
              <h4 className="text-[13px] font-bold text-[var(--heading)]">Payment Escrowed</h4>
              <p className="text-[12px] text-[var(--body)] font-medium mt-1">Funds secured for ORD-9922 (Denim).</p>
              <span className="text-[10px] font-bold text-[#94A3B8] uppercase tracking-widest mt-1 block">Yesterday, 3:15 PM</span>
            </div>
            <div className="relative">
              <div className="absolute w-2.5 h-2.5 rounded-full bg-[#CBD5E1] -left-[22px] top-1.5 ring-4 ring-white" />
              <h4 className="text-[13px] font-bold text-[var(--body)]">System Update</h4>
              <p className="text-[12px] text-[#94A3B8] font-medium mt-1">Marketplace AI engine updated to v2.4.</p>
            </div>
          </div>
        </Card>



        {/* Inventory Alerts Widget */}
        <Card className="p-6 shadow-sm border border-[var(--border)] bg-white relative overflow-hidden h-[320px] flex flex-col rounded-[24px]">
          <div className="flex items-center justify-between mb-5 relative z-10">
            <h3 className="font-bold text-[var(--heading)] text-[15px] flex items-center gap-2">
              <Store className="w-4 h-4 text-[var(--primary)]" /> Inventory Alerts
            </h3>
            {inventoryAlerts.length > 0 && (
              <Badge className="bg-[#F59E0B]/10 text-[#F59E0B] border-[#F59E0B]/20 text-[10px] font-bold">
                {inventoryAlerts.length} Alerts
              </Badge>
            )}
          </div>
          
          <div className="space-y-4 relative z-10 flex-1 overflow-y-auto pr-2 custom-scrollbar">
            {inventoryAlerts.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-[#94A3B8]">
                <Store className="w-8 h-8 mb-2 opacity-50" />
                <p className="text-[13px] font-medium text-center">All variants are well-stocked.</p>
              </div>
            ) : (
              inventoryAlerts.map((alert: any, idx) => (
                <div key={idx} className="bg-[#F8FAFC] border border-[var(--border)] rounded-[16px] p-4 shadow-sm hover:border-[var(--primary)]/30 transition-colors">
                  <div className="flex justify-between items-start mb-2">
                    <Badge className={`text-[9px] font-bold uppercase tracking-widest bg-white border ${
                      alert.statusType === 'error' ? 'border-[var(--error)] text-[var(--error)]' : 'border-[#F59E0B] text-[#F59E0B]'
                    }`}>
                      {alert.status}
                    </Badge>
                    <span className="text-[11px] font-bold text-[var(--heading)]">Stock: {alert.variant.stock}</span>
                  </div>
                  <p className="text-[12px] font-medium text-[var(--heading)] leading-relaxed">
                    <strong className="text-[var(--primary)]">{alert.product.title}</strong> - {alert.variant.color}
                  </p>
                </div>
              ))
            )}
          </div>
        </Card>

        {/* Quick Actions */}
        <Card className="p-6 shadow-sm border border-[var(--border)] bg-white flex flex-col h-[320px] rounded-[24px]">
          <h3 className="font-bold text-[var(--heading)] text-[15px] mb-6 flex items-center gap-2">
            <Zap className="w-4 h-4 text-[var(--primary)]" /> Quick Actions
          </h3>
          <div className="flex flex-col gap-3 flex-1 justify-center">
            <Button className="w-full justify-between h-12 text-[13px] font-bold bg-[var(--heading)] hover:bg-[var(--primary)] text-white shadow-sm rounded-[12px]">
              Publish New Product <ArrowRight className="w-4 h-4" />
            </Button>
            <Button variant="outline" className="w-full justify-between h-12 border-[var(--border)] bg-[#F8FAFC] hover:bg-[#F1F5F9] text-[13px] font-bold text-[var(--body)] rounded-[12px]">
              Respond to RFQs <span className="bg-[var(--primary)] text-white text-[10px] px-1.5 py-0.5 rounded-full ml-auto mr-2">5</span> <ArrowRight className="w-4 h-4 text-[#94A3B8]" />
            </Button>
            <Button variant="outline" className="w-full justify-between h-12 border-[var(--border)] bg-[#F8FAFC] hover:bg-[#F1F5F9] text-[13px] font-bold text-[var(--body)] rounded-[12px]">
              Contact Account Manager <ArrowRight className="w-4 h-4 text-[#94A3B8]" />
            </Button>
          </div>
        </Card>

      </div>
    </motion.div>
  )
}
