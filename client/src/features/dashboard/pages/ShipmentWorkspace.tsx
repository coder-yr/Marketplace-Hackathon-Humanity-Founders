import { Link } from 'react-router-dom'
import { Container } from '@/shared/components/layout/container'
import { Badge } from '@/shared/components/ui/badge'
import { Button } from '@/shared/components/ui/button'
import { 
  FileText, CheckCircle2, Circle, 
  Download, ArrowLeft, Anchor, MapPin, Calendar, Clock, 
  MessageSquare, FileCheck
} from 'lucide-react'
import { motion } from 'framer-motion'

// Mock Data for specific shipment
const mockOrder = {
  id: 'ORD-7729',
  product: 'Heavyweight Denim 14oz',
  supplier: 'Kuroki Textiles',
  quantity: '3000m',
  status: 'In Production',
  shippingDetails: {
    carrier: 'Maersk Line',
    container: 'MRKU-129938-4',
    trackingNumber: 'AWB-883921-X',
    method: 'Ocean Freight (FCL)',
    portOrigin: 'Yokohama, Japan',
    portDest: 'Los Angeles, USA',
    expectedArrival: 'Oct 12, 2026'
  },
  timeline: [
    { stage: 'Order Confirmed', status: 'Completed', date: 'Sep 01, 2026', notes: 'PO #4992 signed and deposit cleared.' },
    { stage: 'Raw Material', status: 'Completed', date: 'Sep 05, 2026', notes: 'Cotton yarns secured and dyed.' },
    { stage: 'Manufacturing', status: 'In Progress', progress: 65, date: 'Est. Sep 15, 2026', notes: 'Weaving process ongoing.' },
    { stage: 'Quality Check', status: 'Pending' },
    { stage: 'Packaging', status: 'Pending' },
    { stage: 'Shipping', status: 'Pending' },
    { stage: 'Delivered', status: 'Pending' }
  ],
  documents: [
    { type: 'Invoice', name: 'Commercial_Invoice_7729.pdf', size: '245 KB', url: '#' },
    { type: 'Certificate', name: 'ISO_Quality_Report.pdf', size: '1.2 MB', url: '#' },
    { type: 'Packing List', name: 'Packing_List_Draft.pdf', size: '150 KB', url: '#' }
  ]
}

export function ShipmentWorkspace() {
  // Using mock data for demo

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
                <Badge className="bg-[#E0F2FE] text-[#0284C7] border-transparent font-bold tracking-wider px-2 py-0.5 rounded-[6px] text-[10px] uppercase">
                  {mockOrder.status}
                </Badge>
                <span className="text-[13px] font-bold text-[#94A3B8]">ID: {mockOrder.id}</span>
              </div>
              <h1 className="text-[32px] font-display font-bold text-[#0A2540]">{mockOrder.product}</h1>
              <p className="text-[14px] font-medium text-[#64748B] flex items-center gap-2 mt-1">
                from <strong className="text-[#0A2540]">{mockOrder.supplier}</strong> • {mockOrder.quantity}
              </p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" className="border-[#E2E8F0] text-[#0A2540] font-bold rounded-[8px] h-10">
                <MessageSquare className="w-4 h-4 mr-2" /> Message Supplier
              </Button>
            </div>
          </div>
        </Container>
      </div>

      <Container className="pt-8">
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
          
          {/* LEFT: Timeline & Logistics */}
          <div className="xl:col-span-8 flex flex-col gap-8">
            
            {/* Logistics Card */}
            <div className="bg-white rounded-[24px] border border-[#E2E8F0] p-8 shadow-sm">
              <h2 className="text-[18px] font-bold text-[#0A2540] mb-6 flex items-center gap-2">
                <Anchor className="w-5 h-5 text-[#0066FF]" /> Logistics Overview
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div>
                  <p className="text-[11px] font-bold text-[#94A3B8] uppercase tracking-wider mb-1">Carrier</p>
                  <p className="text-[14px] font-bold text-[#0A2540]">{mockOrder.shippingDetails.carrier}</p>
                </div>
                <div>
                  <p className="text-[11px] font-bold text-[#94A3B8] uppercase tracking-wider mb-1">Method</p>
                  <p className="text-[14px] font-bold text-[#0A2540]">{mockOrder.shippingDetails.method}</p>
                </div>
                <div>
                  <p className="text-[11px] font-bold text-[#94A3B8] uppercase tracking-wider mb-1">Tracking ID</p>
                  <p className="text-[14px] font-bold text-[#0066FF] cursor-pointer hover:underline">{mockOrder.shippingDetails.trackingNumber}</p>
                </div>
                <div>
                  <p className="text-[11px] font-bold text-[#94A3B8] uppercase tracking-wider mb-1">Container</p>
                  <p className="text-[14px] font-bold text-[#0A2540]">{mockOrder.shippingDetails.container}</p>
                </div>
                <div className="col-span-2 pt-4 border-t border-[#E2E8F0]/50 mt-2">
                  <p className="text-[11px] font-bold text-[#94A3B8] uppercase tracking-wider mb-1 flex items-center gap-1"><MapPin className="w-3 h-3"/> Origin Route</p>
                  <div className="flex items-center gap-4 text-[14px] font-bold text-[#0A2540] mt-2">
                    <span>{mockOrder.shippingDetails.portOrigin}</span>
                    <div className="flex-1 h-[2px] bg-[#E2E8F0] relative">
                      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 border-t-2 border-r-2 border-[#E2E8F0] rotate-45" />
                    </div>
                    <span>{mockOrder.shippingDetails.portDest}</span>
                  </div>
                </div>
                <div className="col-span-2 pt-4 border-t border-[#E2E8F0]/50 mt-2">
                  <p className="text-[11px] font-bold text-[#94A3B8] uppercase tracking-wider mb-1 flex items-center gap-1"><Calendar className="w-3 h-3"/> ETA</p>
                  <p className="text-[20px] font-display font-bold text-emerald-600 mt-1">{mockOrder.shippingDetails.expectedArrival}</p>
                </div>
              </div>
            </div>

            {/* Production Timeline */}
            <div className="bg-white rounded-[24px] border border-[#E2E8F0] p-8 shadow-sm">
              <h2 className="text-[18px] font-bold text-[#0A2540] mb-8 flex items-center gap-2">
                <Clock className="w-5 h-5 text-[#0066FF]" /> Production Timeline
              </h2>
              <div className="relative pl-6 border-l-2 border-[#E2E8F0] space-y-10">
                {mockOrder.timeline.map((step, idx) => (
                  <div key={idx} className="relative">
                    {/* Timeline Node */}
                    <div className="absolute -left-[35px] top-1 bg-white">
                      {step.status === 'Completed' ? (
                        <CheckCircle2 className="w-6 h-6 text-emerald-500 bg-white" />
                      ) : step.status === 'In Progress' ? (
                        <div className="w-6 h-6 rounded-full border-4 border-[#0066FF] bg-white animate-pulse" />
                      ) : (
                        <Circle className="w-6 h-6 text-[#CBD5E1] bg-white" />
                      )}
                    </div>
                    
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <h4 className={`text-[15px] font-bold ${step.status === 'Pending' ? 'text-[#94A3B8]' : 'text-[#0A2540]'}`}>
                          {step.stage}
                        </h4>
                        {step.date && <span className="text-[12px] font-bold text-[#64748B]">{step.date}</span>}
                      </div>
                      
                      {step.status === 'In Progress' && step.progress !== undefined && (
                        <div className="mt-3 mb-2">
                          <div className="w-full h-2 bg-[#F1F5F9] rounded-full overflow-hidden">
                            <motion.div 
                              initial={{ width: 0 }} animate={{ width: `${step.progress}%` }} 
                              className="h-full bg-[#0066FF] rounded-full" 
                            />
                          </div>
                        </div>
                      )}

                      {step.notes && (
                        <p className={`text-[13px] font-medium mt-1 ${step.status === 'Pending' ? 'text-[#94A3B8]' : 'text-[#64748B]'}`}>
                          {step.notes}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* RIGHT: Document Center & Actions */}
          <div className="xl:col-span-4 flex flex-col gap-6">
            
            {/* Document Center */}
            <div className="bg-[#0A2540] rounded-[24px] p-6 shadow-xl text-white">
              <h2 className="text-[18px] font-bold mb-6 flex items-center gap-2">
                <FileCheck className="w-5 h-5 text-[#38BDF8]" /> Document Center
              </h2>
              <div className="space-y-3">
                {mockOrder.documents.map((doc, idx) => (
                  <div key={idx} className="bg-white/10 border border-white/10 rounded-[12px] p-4 flex items-center justify-between group hover:bg-white/20 transition-colors cursor-pointer">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-[8px] bg-white/10 flex items-center justify-center">
                        <FileText className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h5 className="font-bold text-[13px] text-white line-clamp-1">{doc.type}</h5>
                        <p className="text-[11px] text-[#94A3B8] font-medium">{doc.size}</p>
                      </div>
                    </div>
                    <Download className="w-4 h-4 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                ))}
              </div>
              <Button className="w-full mt-6 bg-white hover:bg-[#F8FAFC] text-[#0A2540] font-bold rounded-[10px]">
                Upload Document
              </Button>
            </div>

          </div>

        </div>
      </Container>
    </div>
  )
}
