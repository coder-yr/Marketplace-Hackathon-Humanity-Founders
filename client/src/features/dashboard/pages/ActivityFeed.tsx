import { Container } from '@/shared/components/layout/container'
import { Card } from '@/shared/components/ui/card'
import { 
  CheckCircle2, AlertCircle, FileText, Settings, Zap, Clock 
} from 'lucide-react'

// Mock Data
const activities = [
  { 
    id: 1, 
    type: 'rfq_accepted', 
    title: 'RFQ Accepted by Kuroki Textiles', 
    desc: 'Your RFQ for Heavyweight Denim has been accepted at $18/m.', 
    time: '2 hours ago',
    icon: CheckCircle2,
    color: 'text-emerald-500',
    bg: 'bg-emerald-50'
  },
  { 
    id: 2, 
    type: 'ai_recommendation', 
    title: 'AI Cost Insight Available', 
    desc: 'The current quote from Global Weaves is 8% higher than the market average. Consider counter-offering.', 
    time: '4 hours ago',
    icon: Zap,
    color: 'text-purple-500',
    bg: 'bg-purple-50'
  },
  { 
    id: 3, 
    type: 'production_updated', 
    title: 'Production Milestone: Dyeing Complete', 
    desc: 'Order #ORD-7729 has completed the dyeing phase and moved to weaving.', 
    time: '1 day ago',
    icon: Settings,
    color: 'text-blue-500',
    bg: 'bg-blue-50'
  },
  { 
    id: 4, 
    type: 'certificate_uploaded', 
    title: 'New Certificate Uploaded', 
    desc: 'Apex Materials uploaded their renewed ISO9001 certification.', 
    time: '2 days ago',
    icon: FileText,
    color: 'text-slate-500',
    bg: 'bg-slate-100'
  },
  { 
    id: 5, 
    type: 'shipment_delayed', 
    title: 'Shipment Delay Alert', 
    desc: 'Container MRKU-129938-4 is delayed by 2 days due to port congestion at Los Angeles.', 
    time: '3 days ago',
    icon: AlertCircle,
    color: 'text-rose-500',
    bg: 'bg-rose-50'
  }
]

export function ActivityFeed() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-24 font-sans">
      <div className="bg-white border-b border-[#E2E8F0] sticky top-0 z-20 shadow-sm">
        <Container className="py-6">
          <h1 className="text-[28px] font-display font-bold text-[#0A2540]">Activity Center</h1>
          <p className="text-[14px] text-[#64748B] mt-1 font-medium">Real-time updates on your entire supply chain.</p>
        </Container>
      </div>

      <Container className="pt-8 max-w-4xl">
        <Card className="rounded-[24px] border border-[#E2E8F0] shadow-sm overflow-hidden">
          <div className="divide-y divide-[#E2E8F0]">
            {activities.map((activity) => {
              const Icon = activity.icon
              return (
                <div key={activity.id} className="p-6 flex items-start gap-5 hover:bg-[#F8FAFC] transition-colors cursor-pointer group">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${activity.bg}`}>
                    <Icon className={`w-6 h-6 ${activity.color}`} />
                  </div>
                  <div className="flex-1 pt-1">
                    <div className="flex items-start justify-between gap-4 mb-1">
                      <h4 className="text-[15px] font-bold text-[#0A2540] group-hover:text-[#0066FF] transition-colors">
                        {activity.title}
                      </h4>
                      <span className="text-[12px] font-medium text-[#94A3B8] whitespace-nowrap flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {activity.time}
                      </span>
                    </div>
                    <p className="text-[14px] text-[#64748B] leading-relaxed">
                      {activity.desc}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
          
          <div className="p-4 bg-[#F8FAFC] border-t border-[#E2E8F0] text-center">
            <button className="text-[13px] font-bold text-[#0066FF] hover:underline">
              Load Older Activity
            </button>
          </div>
        </Card>
      </Container>
    </div>
  )
}
