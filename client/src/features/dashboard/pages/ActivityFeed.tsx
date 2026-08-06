import { Container } from '@/shared/components/layout/container'
import { Card } from '@/shared/components/ui/card'
import { 
  CheckCircle2, AlertCircle, FileText, Settings, Zap, Clock, Bell 
} from 'lucide-react'
import { useWorkspace } from '../hooks/useWorkspace'
import { formatDistanceToNow } from 'date-fns'

export function ActivityFeed() {
  const { workspace, isLoading } = useWorkspace()

  if (isLoading || !workspace) {
    return (
      <div className="flex items-center justify-center h-screen bg-[#F8FAFC]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[var(--primary)]" />
      </div>
    )
  }

  const { activities } = workspace

  const getIconConfig = (type?: string) => {
    switch (type) {
      case 'rfq_accepted': return { icon: CheckCircle2, color: 'text-emerald-500', bg: 'bg-emerald-50' }
      case 'ai_recommendation': return { icon: Zap, color: 'text-purple-500', bg: 'bg-purple-50' }
      case 'production_updated': return { icon: Settings, color: 'text-blue-500', bg: 'bg-blue-50' }
      case 'certificate_uploaded': return { icon: FileText, color: 'text-slate-500', bg: 'bg-slate-100' }
      case 'shipment_delayed': return { icon: AlertCircle, color: 'text-rose-500', bg: 'bg-rose-50' }
      default: return { icon: Bell, color: 'text-[var(--primary)]', bg: 'bg-[var(--primary)]/10' }
    }
  }

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
            {activities.length === 0 ? (
               <div className="p-12 flex flex-col items-center justify-center text-[#94A3B8]">
                 <Bell className="w-12 h-12 mb-4 opacity-50" />
                 <p className="text-[14px] font-bold">No recent activities</p>
               </div>
            ) : activities.map((activity: any, index: number) => {
              const { icon: Icon, color, bg } = getIconConfig(activity.type)
              return (
                <div key={activity.id || index} className="p-6 flex items-start gap-5 hover:bg-[#F8FAFC] transition-colors cursor-pointer group">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${bg}`}>
                    <Icon className={`w-6 h-6 ${color}`} />
                  </div>
                  <div className="flex-1 pt-1">
                    <div className="flex items-start justify-between gap-4 mb-1">
                      <h4 className="text-[15px] font-bold text-[#0A2540] group-hover:text-[#0066FF] transition-colors">
                        {activity.title}
                      </h4>
                      <span className="text-[12px] font-medium text-[#94A3B8] whitespace-nowrap flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {formatDistanceToNow(new Date(activity.date), { addSuffix: true })}
                      </span>
                    </div>
                    <p className="text-[14px] text-[#64748B] leading-relaxed">
                      {activity.description}
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
