import { useState, useEffect } from 'react'
import { Container } from '@/shared/components/layout/container'
import { Badge } from '@/shared/components/ui/badge'
import { Button } from '@/shared/components/ui/button'
import { Search, Filter, Plus, Truck, Clock, AlertCircle } from 'lucide-react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useWorkspace } from '../hooks/useWorkspace'
import { formatDistanceToNow } from 'date-fns'
import { toast } from 'sonner'

import { useAuthStore } from '@/features/auth/store/auth.store'
import { api } from '@/lib/axios'
import { BuyerProcurementList } from '../components/BuyerProcurementList'

export function ProcurementWorkspace() {
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState('')
  const { workspace, isLoading, refresh } = useWorkspace()
  const { user } = useAuthStore()
  const [localItems, setLocalItems] = useState<any[]>([])

  const isSupplier = user?.role === 'supplier'

  const KANBAN_COLUMNS = isSupplier ? [
    { id: 'submitted', title: 'New RFQ Requests' },
    { id: 'quoting', title: 'Quoted' },
    { id: 'negotiation', title: 'Negotiating' },
    { id: 'po', title: 'New Orders' },
    { id: 'production', title: 'In Production' },
    { id: 'shipping', title: 'Shipping' },
  ] : [
    { id: 'draft', title: 'Draft RFQs' },
    { id: 'submitted', title: 'Submitted RFQs' },
    { id: 'quoting', title: 'Quote Received' },
    { id: 'negotiation', title: 'Negotiating' },
    { id: 'po', title: 'Purchase Orders' },
    { id: 'production', title: 'In Production' },
    { id: 'shipping', title: 'Shipping' },
  ]

  // Sync local items with workspace data
  useEffect(() => {
    if (!workspace) return
    
    const { rfqs, orders } = workspace
    const newItems: any[] = []

    rfqs.forEach(rfq => {
      let column = 'submitted'
      const status = (rfq.status || '').toLowerCase()
      if (status === 'draft') column = 'draft'
      if (status === 'quoting' || status === 'quoted' || status === 'responded') column = 'quoting'
      if (status === 'negotiating' || status === 'negotiation') column = 'negotiation'
      if (status === 'accepted') column = 'po' 
      if (status === 'rejected') column = 'closed'
      if (status === 'closed' || status === 'expired') return

      const supplierRef = rfq.supplierId || rfq.supplier
      const supplierName = supplierRef?.companyName || supplierRef?.fullName || (typeof supplierRef === 'string' ? 'Supplier ' + supplierRef.substring(0,4).toUpperCase() : 'Enterprise Supplier')
      const productName = rfq.productId?.title || rfq.productId?.name || 'Custom Order'

      newItems.push({
        id: rfq._id,
        type: 'rfq',
        column,
        title: productName,
        supplier: supplierName,
        date: formatDistanceToNow(new Date(rfq.createdAt), { addSuffix: true }),
        priority: 'Medium',
        alert: rfq.status === 'quoting' ? 'Needs Review' : null
      })
    })

    orders.forEach(order => {
      let column = 'po'
      const status = (order.status || '').toLowerCase()
      if (status === 'processing') column = 'production'
      if (status === 'shipped') column = 'shipping'
      if (status === 'delivered') return

      // Safely extract the supplier name
      const supplierRef = order.supplierId || order.supplier
      const supplierName = supplierRef?.companyName || supplierRef?.fullName || (typeof supplierRef === 'string' ? 'Supplier ' + supplierRef.substring(0,4).toUpperCase() : 'Enterprise Supplier')

      newItems.push({
        id: order._id,
        type: 'order',
        column,
        title: `Order ${order._id.substring(order._id.length - 4)}`,
        supplier: supplierName,
        date: formatDistanceToNow(new Date(order.createdAt), { addSuffix: true }),
        priority: 'High',
        progress: order.status === 'Processing' ? 65 : undefined,
        tracking: order.status === 'Shipped' ? 'AWB-PENDING' : null
      })
    })

    setLocalItems(newItems)
  }, [workspace])

  // Handle Drag and Drop
  const handleDragStart = (e: React.DragEvent, item: any) => {
    e.dataTransfer.setData('itemId', item.id)
    e.dataTransfer.setData('itemType', item.type)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault() // required to allow drop
  }

  const handleDrop = async (e: React.DragEvent, targetColumnId: string) => {
    e.preventDefault()
    const itemId = e.dataTransfer.getData('itemId')
    const itemType = e.dataTransfer.getData('itemType')
    
    if (!itemId) return

    const originalItem = localItems.find(i => i.id === itemId)
    if (!originalItem || originalItem.column === targetColumnId) return

    // Optimistically update UI
    setLocalItems(prev => prev.map(item => 
      item.id === itemId ? { ...item, column: targetColumnId } : item
    ))

    if (itemType === 'order') {
      let newStatus = 'Pending'
      if (targetColumnId === 'production') newStatus = 'Processing'
      if (targetColumnId === 'shipping') newStatus = 'Shipped'
      if (targetColumnId === 'po') newStatus = 'Pending'
      
      try {
        await api.patch(`/orders/${itemId}/status`, { status: newStatus })
        toast.success('Status updated successfully')
        refresh() // sync with backend
      } catch (err) {
        toast.error('Failed to update status')
        refresh() // revert on fail
      }
    } else {
      toast.info('RFQ status updating coming soon!')
      refresh() // revert RFQ visual change since it's not supported via API
    }
  }

  // Filter items by search
  const filteredItems = localItems.filter(item => 
    (item.title || '').toLowerCase().includes(searchTerm.toLowerCase()) || 
    (item.supplier || '').toLowerCase().includes(searchTerm.toLowerCase())
  )

  if (isLoading && !workspace) {
    return (
      <div className="flex items-center justify-center h-screen bg-[#F8FAFC]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[var(--primary)]" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-24">
      {/* Workspace Header */}
      <div className="bg-white border-b border-[#E2E8F0] sticky top-0 z-20">
        <Container className="py-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-[28px] font-display font-bold text-[#0A2540]">{isSupplier ? 'Quotes & Orders' : 'Procurement Workspace'}</h1>
              <p className="text-[14px] text-[#64748B] mt-1 font-medium">{isSupplier ? 'Manage incoming RFQs and track active orders.' : 'Manage your entire sourcing lifecycle from RFQ to Delivery.'}</p>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8]" />
                <input 
                  type="text" 
                  placeholder="Search RFQs, Orders..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9 pr-4 py-2 bg-[#F1F5F9] border-transparent rounded-[8px] text-[13px] w-[260px] focus:bg-white focus:border-[#0066FF] focus:ring-1 focus:ring-[#0066FF] transition-all outline-none text-[#0A2540]"
                />
              </div>
              <Button variant="outline" className="border-[#E2E8F0] text-[#0A2540] h-[38px] px-3 rounded-[8px]">
                <Filter className="w-4 h-4 mr-2" /> Filters
              </Button>
              {!isSupplier && (
                <Button onClick={() => toast.info('New RFQ flow coming soon!')} className="bg-[#0A2540] hover:bg-[#1E293B] text-white h-[38px] px-4 rounded-[8px] font-bold">
                  <Plus className="w-4 h-4 mr-1.5" /> New RFQ
                </Button>
              )}
            </div>
          </div>
        </Container>
      </div>

      {/* Main Content Area */}
      {isSupplier ? (
        <div className="px-6 py-8 overflow-x-auto h-[calc(100vh-140px)] custom-scrollbar">
          <div className="flex gap-6 min-w-max pb-8 h-full">
            
            {KANBAN_COLUMNS.map((col) => {
              const columnItems = filteredItems.filter(item => item.column === col.id)
              return (
                <div 
                  key={col.id} 
                  className="w-[320px] flex flex-col h-full"
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, col.id)}
                >
                  {/* Column Header */}
                  <div className="flex items-center justify-between mb-4 px-1">
                    <h3 className="text-[14px] font-bold text-[#0A2540] uppercase tracking-wider">{col.title}</h3>
                    <span className="bg-[#E2E8F0] text-[#475569] text-[11px] font-bold px-2 py-0.5 rounded-full">{columnItems.length}</span>
                  </div>
                  
                  {/* Column Body */}
                  <div className="bg-[#F1F5F9] rounded-[16px] p-3 flex-1 overflow-y-auto border border-[#E2E8F0] space-y-3 custom-scrollbar">
                    
                    {columnItems.length === 0 ? (
                      <div className="h-full w-full border-2 border-dashed border-[#E2E8F0] rounded-[12px] flex items-center justify-center text-[12px] font-bold text-[#94A3B8]">
                        Drop items here
                      </div>
                    ) : columnItems.map((item) => (
                      <motion.div 
                        draggable
                        onDragStart={(e: any) => handleDragStart(e, item)}
                        layoutId={item.id}
                        key={item.id}
                        onClick={() => {
                          if (item.type === 'order') navigate(`/dashboard/orders/${item.id}`)
                          else navigate(`/dashboard/rfqs/${item.id}`)
                        }}
                        className="bg-white p-4 rounded-[12px] shadow-sm border border-[#E2E8F0] cursor-pointer hover:shadow-md hover:border-[#CBD5E1] transition-all group relative active:cursor-grabbing"
                      >
                        {/* Priority Indicator */}
                        <div className={`absolute top-0 left-0 w-1 h-full rounded-l-[12px] ${item.priority === 'High' ? 'bg-rose-500' : item.priority === 'Medium' ? 'bg-amber-500' : 'bg-emerald-500'}`} />
                        
                        <div className="flex justify-between items-start mb-3">
                          <Badge className="bg-[#F8FAFC] text-[#64748B] text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 border border-[#E2E8F0]">
                            {item.type === 'order' ? 'ORDER' : 'RFQ'}
                          </Badge>
                          <span className="text-[11px] font-semibold text-[#94A3B8] flex items-center gap-1"><Clock className="w-3 h-3"/> {item.date}</span>
                        </div>

                        <h4 className="font-bold text-[#0A2540] text-[14px] mb-1 leading-snug group-hover:text-[#0066FF] transition-colors">{item.title}</h4>
                        <p className="text-[12px] text-[#64748B] font-medium mb-3">{item.supplier}</p>
                        
                        {/* Status Specific Addons */}
                        {item.alert && (
                          <div className="flex items-center gap-1.5 text-[11px] font-bold text-amber-600 bg-amber-50 px-2 py-1 rounded-[6px] border border-amber-200 w-fit">
                            <AlertCircle className="w-3.5 h-3.5" /> {item.alert}
                          </div>
                        )}
                        
                        {item.progress !== undefined && (
                          <div className="mt-2">
                            <div className="flex justify-between text-[10px] font-bold text-[#64748B] mb-1">
                              <span>Progress</span>
                              <span>{item.progress}%</span>
                            </div>
                            <div className="w-full h-1.5 bg-[#F1F5F9] rounded-full overflow-hidden">
                              <div className="h-full bg-[#0066FF] rounded-full" style={{ width: `${item.progress}%` }} />
                            </div>
                          </div>
                        )}
                        
                        {item.tracking && (
                          <div className="flex items-center justify-between mt-3 pt-3 border-t border-[#F1F5F9]">
                            <span className="flex items-center gap-1.5 text-[11px] font-bold text-[#0A2540]">
                              <Truck className="w-3.5 h-3.5 text-[#0066FF]" /> {item.tracking}
                            </span>
                          </div>
                        )}

                      </motion.div>
                    ))}

                  </div>
                </div>
              )
            })}
            
          </div>
        </div>
      ) : (
        <Container className="py-8">
          <BuyerProcurementList items={filteredItems} searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </Container>
      )}
    </div>
  )
}
