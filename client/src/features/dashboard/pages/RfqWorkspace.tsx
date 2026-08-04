import { Link } from 'react-router-dom'
import { Container } from '@/shared/components/layout/container'
import { Badge } from '@/shared/components/ui/badge'
import { Button } from '@/shared/components/ui/button'
import { Card } from '@/shared/components/ui/card'
import { 
  ArrowLeft, MessageSquare, ShieldAlert, Sparkles, TrendingDown,
  Scale, FileText, CheckCircle2, ChevronRight
} from 'lucide-react'

// Mock Data for Demo
const mockRfq = {
  id: 'RFQ-8821',
  product: 'Organic Cotton Jersey',
  supplier: 'Kuroki Textiles',
  quantity: '5000m',
  status: 'Quote Received',
  date: '2 hours ago',
  quote: {
    offeredPrice: 18.50,
    leadTime: '14 Days',
    validUntil: 'Oct 15, 2026',
    notes: 'Premium combed cotton. Price includes export packaging.'
  },
  aiInsights: {
    risk: {
      level: 'Low',
      reasons: ['Supplier has 97% response rate', 'ISO 9001 Certified', 'Zero delivery disputes in 2 years']
    },
    cost: {
      marketAverage: 17.20,
      suggestedTarget: 17.50
    },
    negotiation: {
      suggestedCounter: 17.80,
      reasons: ['Your order volume (5000m) warrants a 4% volume discount.', 'Market average for this GSM is $17.20.']
    },
    alternatives: [
      { name: 'Global Weaves', match: 96, price: 17.10 },
      { name: 'Nordic Fabrics', match: 92, price: 17.45 }
    ]
  }
}

export function RfqWorkspace() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-24 font-sans">
      
      {/* Header */}
      <div className="bg-white border-b border-[#E2E8F0] sticky top-0 z-20 shadow-sm">
        <Container className="py-4">
          <div className="flex items-center gap-4 mb-4">
            <Link to="/dashboard/procurement" className="flex items-center gap-2 text-[13px] font-bold text-[#64748B] hover:text-[#0A2540] transition-colors">
              <ArrowLeft className="w-4 h-4" /> Back to Workspace
            </Link>
          </div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <Badge className="bg-amber-100 text-amber-700 border-transparent font-bold tracking-wider px-2 py-0.5 rounded-[6px] text-[10px] uppercase">
                  {mockRfq.status}
                </Badge>
                <span className="text-[13px] font-bold text-[#94A3B8]">ID: {mockRfq.id}</span>
              </div>
              <h1 className="text-[32px] font-display font-bold text-[#0A2540]">{mockRfq.product}</h1>
              <p className="text-[14px] font-medium text-[#64748B] flex items-center gap-2 mt-1">
                Requested from <strong className="text-[#0A2540]">{mockRfq.supplier}</strong> • {mockRfq.quantity}
              </p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" className="border-[#E2E8F0] text-[#0A2540] font-bold rounded-[8px] h-10">
                <MessageSquare className="w-4 h-4 mr-2" /> Message
              </Button>
              <Button className="bg-[#0A2540] hover:bg-[#1E293B] text-white font-bold rounded-[8px] h-10 px-6">
                Accept Quote
              </Button>
            </div>
          </div>
        </Container>
      </div>

      <Container className="pt-8">
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
          
          {/* LEFT: Quote Details */}
          <div className="xl:col-span-7 flex flex-col gap-6">
            
            <Card className="rounded-[24px] border border-[#E2E8F0] p-8 shadow-sm">
              <h2 className="text-[18px] font-bold text-[#0A2540] mb-6 flex items-center gap-2">
                <FileText className="w-5 h-5 text-[#0066FF]" /> Official Quote
              </h2>
              
              <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-[16px] p-6 mb-6">
                <div className="flex justify-between items-end border-b border-[#E2E8F0] pb-6 mb-6">
                  <div>
                    <p className="text-[12px] font-bold text-[#64748B] uppercase tracking-wider mb-1">Unit Price</p>
                    <p className="text-[36px] font-display font-bold text-[#0A2540] leading-none">${mockRfq.quote.offeredPrice.toFixed(2)}<span className="text-[16px] text-[#94A3B8]">/m</span></p>
                  </div>
                  <div className="text-right">
                    <p className="text-[12px] font-bold text-[#64748B] uppercase tracking-wider mb-1">Total Estimated</p>
                    <p className="text-[24px] font-display font-bold text-[#0A2540] leading-none">${(mockRfq.quote.offeredPrice * 5000).toLocaleString()}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <p className="text-[12px] font-bold text-[#64748B] uppercase tracking-wider mb-1">Lead Time</p>
                    <p className="text-[15px] font-bold text-[#0A2540]">{mockRfq.quote.leadTime}</p>
                  </div>
                  <div>
                    <p className="text-[12px] font-bold text-[#64748B] uppercase tracking-wider mb-1">Valid Until</p>
                    <p className="text-[15px] font-bold text-[#0A2540]">{mockRfq.quote.validUntil}</p>
                  </div>
                </div>
              </div>
              
              <div>
                <p className="text-[12px] font-bold text-[#64748B] uppercase tracking-wider mb-2">Supplier Notes</p>
                <p className="text-[14px] text-[#0A2540] leading-relaxed bg-[#F1F5F9] p-4 rounded-[12px]">
                  "{mockRfq.quote.notes}"
                </p>
              </div>
            </Card>

          </div>

          {/* RIGHT: AI Procurement Advisor */}
          <div className="xl:col-span-5 flex flex-col gap-6">
            
            <div className="bg-gradient-to-br from-[#F8FAFC] to-white rounded-[24px] border border-[#0066FF]/20 p-1 relative overflow-hidden shadow-lg">
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 mix-blend-overlay" />
              
              <div className="bg-white rounded-[20px] p-6 relative z-10 h-full">
                <div className="flex items-center gap-2 mb-6 border-b border-[#E2E8F0] pb-4">
                  <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center">
                    <Sparkles className="w-4 h-4 text-[#0066FF]" />
                  </div>
                  <h2 className="text-[16px] font-bold text-[#0A2540]">AI Procurement Advisor</h2>
                </div>

                {/* Cost Insights */}
                <div className="mb-6">
                  <h3 className="text-[13px] font-bold text-[#64748B] uppercase tracking-wider mb-3 flex items-center gap-2">
                    <TrendingDown className="w-4 h-4" /> Cost Insights
                  </h3>
                  <div className="bg-[#F8FAFC] rounded-[12px] p-4 border border-[#E2E8F0]">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-[13px] font-medium text-[#64748B]">Market Average</span>
                      <span className="font-bold text-[#0A2540]">${mockRfq.aiInsights.cost.marketAverage.toFixed(2)}/m</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-[13px] font-bold text-[#0066FF]">AI Target Price</span>
                      <span className="font-bold text-[#0066FF]">${mockRfq.aiInsights.cost.suggestedTarget.toFixed(2)}/m</span>
                    </div>
                  </div>
                  <p className="text-[12px] text-[#64748B] mt-2 font-medium">Quote is <strong className="text-rose-500">+7.5%</strong> above market average.</p>
                </div>

                {/* Negotiation Advice */}
                <div className="mb-6">
                  <h3 className="text-[13px] font-bold text-[#64748B] uppercase tracking-wider mb-3 flex items-center gap-2">
                    <Scale className="w-4 h-4" /> Negotiation Strategy
                  </h3>
                  <div className="bg-blue-50 rounded-[12px] p-4 border border-blue-100">
                    <p className="text-[13px] font-bold text-[#0A2540] mb-2">
                      Suggested Counter: <span className="text-[#0066FF]">${mockRfq.aiInsights.negotiation.suggestedCounter.toFixed(2)}/m</span>
                    </p>
                    <ul className="space-y-1.5">
                      {mockRfq.aiInsights.negotiation.reasons.map((r, i) => (
                        <li key={i} className="text-[12px] text-[#475569] flex items-start gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#0066FF] shrink-0 mt-0.5" /> {r}
                        </li>
                      ))}
                    </ul>
                    <Button className="w-full mt-4 bg-white text-[#0066FF] hover:bg-blue-100 border border-blue-200 font-bold text-[12px] h-8">
                      Auto-Draft Counter Offer
                    </Button>
                  </div>
                </div>

                {/* Supplier Risk */}
                <div>
                  <h3 className="text-[13px] font-bold text-[#64748B] uppercase tracking-wider mb-3 flex items-center gap-2">
                    <ShieldAlert className="w-4 h-4" /> Risk Analysis
                  </h3>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge className="bg-emerald-100 text-emerald-700 border-transparent font-bold">
                      {mockRfq.aiInsights.risk.level} Risk
                    </Badge>
                  </div>
                  <ul className="space-y-1">
                    {mockRfq.aiInsights.risk.reasons.map((r, i) => (
                      <li key={i} className="text-[12px] text-[#64748B] flex items-center gap-1.5">
                        <ChevronRight className="w-3 h-3 text-emerald-500" /> {r}
                      </li>
                    ))}
                  </ul>
                </div>

              </div>
            </div>

          </div>

        </div>
      </Container>
    </div>
  )
}
