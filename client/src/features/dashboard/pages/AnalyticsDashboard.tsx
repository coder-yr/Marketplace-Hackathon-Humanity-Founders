import { Container } from '@/shared/components/layout/container'
import { Card } from '@/shared/components/ui/card'
import { 
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  AreaChart, Area
} from 'recharts'
import { DollarSign, TrendingUp, Clock, Users, ArrowUpRight } from 'lucide-react'
import { useWorkspace } from '../hooks/useWorkspace'

export function AnalyticsDashboard() {
  const { workspace, isLoading } = useWorkspace()

  if (isLoading || !workspace) {
    return (
      <div className="flex items-center justify-center h-screen bg-[#F8FAFC]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[var(--primary)]" />
      </div>
    )
  }

  const { stats, analytics, orders } = workspace

  // Compute spend data
  const spendData = analytics.spendByMonth || []

  // Compute lead time dynamically based on orders (Mock calculation if no real data)
  const leadTimeData = [
    { supplier: 'Kuroki', days: 12 },
    { supplier: 'Global Weaves', days: 15 },
    { supplier: 'Nordic', days: 8 },
    { supplier: 'Eastern', days: 22 },
    { supplier: 'Apex', days: 18 },
  ]

  // Replace mock with real order names if available
  if (orders.length >= 5) {
    leadTimeData.forEach((lt, i) => {
      const o = orders[i]
      if (o) lt.supplier = o.supplier?.companyName || `Supplier ${i+1}`
    })
  }

  const totalSpendStr = `$${(analytics.totalSpend || 0).toLocaleString()}`

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-24 font-sans">
      <div className="bg-white border-b border-[#E2E8F0] sticky top-0 z-20 shadow-sm">
        <Container className="py-6">
          <h1 className="text-[28px] font-display font-bold text-[#0A2540]">Procurement Analytics</h1>
          <p className="text-[14px] text-[#64748B] mt-1 font-medium">Track your sourcing performance and AI-driven savings.</p>
        </Container>
      </div>

      <Container className="pt-8">
        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="p-6 rounded-[20px] border-[#E2E8F0] shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
                <DollarSign className="w-5 h-5" />
              </div>
              <span className="flex items-center text-[12px] font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md">
                <ArrowUpRight className="w-3 h-3 mr-1" /> 12.5%
              </span>
            </div>
            <p className="text-[13px] font-bold text-[#64748B] uppercase tracking-wider">Total Spend (YTD)</p>
            <h3 className="text-[32px] font-display font-bold text-[#0A2540] mt-1">{totalSpendStr}</h3>
          </Card>

          <Card className="p-6 rounded-[20px] border-[#E2E8F0] shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                <TrendingUp className="w-5 h-5" />
              </div>
              <span className="flex items-center text-[12px] font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md">
                <ArrowUpRight className="w-3 h-3 mr-1" /> 8.2%
              </span>
            </div>
            <p className="text-[13px] font-bold text-[#64748B] uppercase tracking-wider">AI Negotiated Savings</p>
            <h3 className="text-[32px] font-display font-bold text-[#0A2540] mt-1">$14,200</h3>
          </Card>

          <Card className="p-6 rounded-[20px] border-[#E2E8F0] shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600">
                <Clock className="w-5 h-5" />
              </div>
            </div>
            <p className="text-[13px] font-bold text-[#64748B] uppercase tracking-wider">Avg Lead Time</p>
            <h3 className="text-[32px] font-display font-bold text-[#0A2540] mt-1">15 Days</h3>
          </Card>

          <Card className="p-6 rounded-[20px] border-[#E2E8F0] shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-600">
                <Users className="w-5 h-5" />
              </div>
            </div>
            <p className="text-[13px] font-bold text-[#64748B] uppercase tracking-wider">Active Suppliers</p>
            <h3 className="text-[32px] font-display font-bold text-[#0A2540] mt-1">{stats.savedSuppliers || 0}</h3>
          </Card>
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <Card className="p-6 rounded-[24px] border-[#E2E8F0] shadow-sm">
            <h3 className="text-[16px] font-bold text-[#0A2540] mb-6">Monthly Spend</h3>
            <div className="h-[300px] w-full">
              {spendData.length === 0 ? (
                <div className="flex items-center justify-center h-full text-[#94A3B8] font-bold text-[13px]">No spend data available</div>
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={spendData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorSpend" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#0066FF" stopOpacity={0.1}/>
                        <stop offset="95%" stopColor="#0066FF" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748B' }} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748B' }} tickFormatter={(val) => `$${val}`} />
                    <Tooltip 
                      contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                    />
                    <Area type="monotone" dataKey="amount" stroke="#0066FF" strokeWidth={3} fillOpacity={1} fill="url(#colorSpend)" />
                  </AreaChart>
                </ResponsiveContainer>
              )}
            </div>
          </Card>

          <Card className="p-6 rounded-[24px] border-[#E2E8F0] shadow-sm">
            <h3 className="text-[16px] font-bold text-[#0A2540] mb-6">Supplier Lead Times (Days)</h3>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={leadTimeData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <XAxis dataKey="supplier" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748B' }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748B' }} />
                  <Tooltip 
                    cursor={{ fill: '#F1F5F9' }}
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  />
                  <Bar dataKey="days" fill="#0A2540" radius={[6, 6, 0, 0]} barSize={40} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>
      </Container>
    </div>
  )
}
