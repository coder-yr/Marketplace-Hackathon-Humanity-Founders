import { Link, useParams } from 'react-router-dom'
import { Container } from '@/shared/components/layout/container'
import { Badge } from '@/shared/components/ui/badge'
import { Button } from '@/shared/components/ui/button'
import { 
  FileText, CheckCircle2, Circle, 
  Download, ArrowLeft, Anchor, MapPin, Calendar, Clock, 
  MessageSquare, FileCheck, Package, User, CreditCard
} from 'lucide-react'
import { motion } from 'framer-motion'
import { useWorkspace } from '../hooks/useWorkspace'

export function ShipmentWorkspace() {
  const { id } = useParams()
  const { workspace, isLoading } = useWorkspace()

  if (isLoading || !workspace) {
    return (
      <div className="flex items-center justify-center h-screen bg-[#F8FAFC]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[var(--primary)]" />
      </div>
    )
  }

  // Find the specific order from workspace
  const order = workspace.orders.find((o: any) => o._id === id)

  if (!order) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-[#F8FAFC]">
        <h2 className="text-[20px] font-bold text-[var(--heading)]">Order not found</h2>
        <Link to="/dashboard/procurement">
          <Button className="mt-4">Back to Workspace</Button>
        </Link>
      </div>
    )
  }

  // Safely extract references since backend might return populated objects or just ID strings
  const supplierRef = order.supplierId || order.supplier
  const supplierName = supplierRef?.companyName || supplierRef?.fullName || (typeof supplierRef === 'string' ? 'Supplier ' + supplierRef.substring(0,4).toUpperCase() : 'Enterprise Supplier')

  const buyerRef = order.buyerId || order.buyer
  const buyerName = buyerRef?.companyName || buyerRef?.fullName || (typeof buyerRef === 'string' ? 'Buyer ' + buyerRef.substring(0,4).toUpperCase() : 'Enterprise Buyer')
  const buyerEmail = buyerRef?.email || 'Contact not available'

  const productRef = order.productId || order.product
  const productName = productRef?.title || productRef?.name || (typeof productRef === 'string' ? 'Product ' + productRef.substring(0,4).toUpperCase() : 'Premium Cotton Fabric')

  const totalAmount = order.totalAmount || order.finalPrice || (order.quantity ? order.quantity * 12.5 : 0)

  const shippingDetails = order.shippingDetails || {
    carrier: 'Maersk Line',
    container: 'MRKU-129938-4',
    trackingNumber: 'AWB-PENDING',
    method: 'Ocean Freight (FCL)',
    portOrigin: 'Origin Port',
    portDest: 'Destination Port',
    expectedArrival: 'Pending'
  }

  const timeline = order.timeline || [
    { stage: 'Order Confirmed', status: 'Completed', date: new Date(order.createdAt).toLocaleDateString(), notes: 'Order placed.' },
    { stage: 'Manufacturing', status: order.status === 'processing' ? 'In Progress' : 'Pending', progress: 50 },
    { stage: 'Shipping', status: order.status === 'shipped' ? 'In Progress' : 'Pending' },
    { stage: 'Delivered', status: order.status === 'delivered' ? 'Completed' : 'Pending' }
  ]

  const documents = order.documents || [
    { type: 'Invoice', name: 'Commercial_Invoice.pdf', size: '245 KB', url: '#' },
    { type: 'Packing List', name: 'Packing_List.pdf', size: '150 KB', url: '#' }
  ]

  const address = order.shippingDetails?.address || '123 Textile Ave, Fashion District, NY 10001'
  const paymentMethod = 'Bank Transfer (Net 30)'
  const quantity = order.quantity || 5000

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
                  {order.status}
                </Badge>
                <span className="text-[13px] font-bold text-[#94A3B8]">ID: {order._id.substring(order._id.length - 6).toUpperCase()}</span>
              </div>
              <h1 className="text-[32px] font-display font-bold text-[#0A2540]">Order Fulfillment</h1>
              <p className="text-[14px] font-medium text-[#64748B] flex items-center gap-2 mt-1">
                from <strong className="text-[#0A2540]">{supplierName}</strong> • ${totalAmount}
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
            
            {/* Order Summary Card */}
            <div className="bg-white rounded-[24px] border border-[#E2E8F0] p-8 shadow-sm">
              <h2 className="text-[18px] font-bold text-[#0A2540] mb-6 flex items-center gap-2">
                <FileText className="w-5 h-5 text-[#0066FF]" /> Order Summary
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex gap-4 p-4 rounded-[16px] bg-[#F8FAFC] border border-[#E2E8F0]">
                  <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm">
                    <User className="w-5 h-5 text-[#64748B]" />
                  </div>
                  <div>
                    <p className="text-[11px] font-bold text-[#94A3B8] uppercase tracking-wider mb-1">Ordered By</p>
                    <p className="text-[14px] font-bold text-[#0A2540]">{buyerName}</p>
                    <p className="text-[12px] font-medium text-[#64748B]">{buyerEmail}</p>
                  </div>
                </div>
                
                <div className="flex gap-4 p-4 rounded-[16px] bg-[#F8FAFC] border border-[#E2E8F0]">
                  <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm">
                    <Package className="w-5 h-5 text-[#64748B]" />
                  </div>
                  <div>
                    <p className="text-[11px] font-bold text-[#94A3B8] uppercase tracking-wider mb-1">Product Details</p>
                    <p className="text-[14px] font-bold text-[#0A2540]">{productName}</p>
                    <p className="text-[12px] font-medium text-[#64748B]">Qty: {quantity.toLocaleString()} units</p>
                  </div>
                </div>

                <div className="flex gap-4 p-4 rounded-[16px] bg-[#F8FAFC] border border-[#E2E8F0]">
                  <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm">
                    <MapPin className="w-5 h-5 text-[#64748B]" />
                  </div>
                  <div>
                    <p className="text-[11px] font-bold text-[#94A3B8] uppercase tracking-wider mb-1">Shipping Address</p>
                    <p className="text-[14px] font-bold text-[#0A2540]">{address}</p>
                  </div>
                </div>

                <div className="flex gap-4 p-4 rounded-[16px] bg-[#F8FAFC] border border-[#E2E8F0]">
                  <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm">
                    <CreditCard className="w-5 h-5 text-[#64748B]" />
                  </div>
                  <div>
                    <p className="text-[11px] font-bold text-[#94A3B8] uppercase tracking-wider mb-1">Payment Method</p>
                    <p className="text-[14px] font-bold text-[#0A2540]">{paymentMethod}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Logistics Card */}
            <div className="bg-white rounded-[24px] border border-[#E2E8F0] p-8 shadow-sm">
              <h2 className="text-[18px] font-bold text-[#0A2540] mb-6 flex items-center gap-2">
                <Anchor className="w-5 h-5 text-[#0066FF]" /> Logistics Overview
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div>
                  <p className="text-[11px] font-bold text-[#94A3B8] uppercase tracking-wider mb-1">Carrier</p>
                  <p className="text-[14px] font-bold text-[#0A2540]">{shippingDetails.carrier}</p>
                </div>
                <div>
                  <p className="text-[11px] font-bold text-[#94A3B8] uppercase tracking-wider mb-1">Method</p>
                  <p className="text-[14px] font-bold text-[#0A2540]">{shippingDetails.method}</p>
                </div>
                <div>
                  <p className="text-[11px] font-bold text-[#94A3B8] uppercase tracking-wider mb-1">Tracking ID</p>
                  <p className="text-[14px] font-bold text-[#0066FF] cursor-pointer hover:underline">{shippingDetails.trackingNumber}</p>
                </div>
                <div>
                  <p className="text-[11px] font-bold text-[#94A3B8] uppercase tracking-wider mb-1">Container</p>
                  <p className="text-[14px] font-bold text-[#0A2540]">{shippingDetails.container}</p>
                </div>
                <div className="col-span-2 pt-4 border-t border-[#E2E8F0]/50 mt-2">
                  <p className="text-[11px] font-bold text-[#94A3B8] uppercase tracking-wider mb-1 flex items-center gap-1"><MapPin className="w-3 h-3"/> Origin Route</p>
                  <div className="flex items-center gap-4 text-[14px] font-bold text-[#0A2540] mt-2">
                    <span>{shippingDetails.portOrigin}</span>
                    <div className="flex-1 h-[2px] bg-[#E2E8F0] relative">
                      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 border-t-2 border-r-2 border-[#E2E8F0] rotate-45" />
                    </div>
                    <span>{shippingDetails.portDest}</span>
                  </div>
                </div>
                <div className="col-span-2 pt-4 border-t border-[#E2E8F0]/50 mt-2">
                  <p className="text-[11px] font-bold text-[#94A3B8] uppercase tracking-wider mb-1 flex items-center gap-1"><Calendar className="w-3 h-3"/> ETA</p>
                  <p className="text-[20px] font-display font-bold text-emerald-600 mt-1">{shippingDetails.expectedArrival}</p>
                </div>
              </div>
            </div>

            {/* Production Timeline */}
            <div className="bg-white rounded-[24px] border border-[#E2E8F0] p-8 shadow-sm">
              <h2 className="text-[18px] font-bold text-[#0A2540] mb-8 flex items-center gap-2">
                <Clock className="w-5 h-5 text-[#0066FF]" /> Production Timeline
              </h2>
              <div className="relative pl-6 border-l-2 border-[#E2E8F0] space-y-10">
                {timeline.map((step: any, idx: number) => (
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
                {documents.map((doc: any, idx: number) => (
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
