import { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { ArrowRight, Package, FileText, Clock } from 'lucide-react'
import { Button } from '@/shared/components/ui/button'

interface BuyerProcurementListProps {
  items: any[]
  searchTerm: string
  setSearchTerm: (term: string) => void
}

export function BuyerProcurementList({ items, searchTerm }: BuyerProcurementListProps) {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState<'all' | 'orders' | 'rfqs'>('all')

  const filteredItems = items.filter(item => {
    const matchesSearch = (item.title || '').toLowerCase().includes(searchTerm.toLowerCase()) || 
                          (item.supplier || '').toLowerCase().includes(searchTerm.toLowerCase())
    const matchesTab = activeTab === 'all' || 
                       (activeTab === 'orders' && item.type === 'order') ||
                       (activeTab === 'rfqs' && item.type === 'rfq')
    return matchesSearch && matchesTab
  })

  const getStatusColor = (column: string) => {
    switch (column) {
      case 'submitted':
      case 'po':
      case 'draft':
        return 'bg-blue-50 text-blue-600 border-blue-200'
      case 'quoting':
      case 'negotiation':
      case 'production':
        return 'bg-amber-50 text-amber-600 border-amber-200'
      case 'shipping':
        return 'bg-emerald-50 text-emerald-600 border-emerald-200'
      default:
        return 'bg-slate-50 text-slate-600 border-slate-200'
    }
  }

  const getStatusText = (column: string) => {
    switch (column) {
      case 'submitted': return 'Submitted'
      case 'po': return 'Pending Order'
      case 'draft': return 'Draft'
      case 'quoting': return 'Quote Received'
      case 'negotiation': return 'Negotiation'
      case 'production': return 'In Production'
      case 'shipping': return 'Shipped'
      case 'closed': return 'Closed'
      default: return column
    }
  }

  return (
    <div className="bg-white rounded-xl border border-[#E2E8F0] shadow-sm overflow-hidden">
      {/* List Header Actions */}
      <div className="p-4 border-b border-[#E2E8F0] flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="flex bg-[#F8FAFC] p-1 rounded-lg border border-[#E2E8F0]">
          <button 
            onClick={() => setActiveTab('all')}
            className={`px-4 py-1.5 text-[13px] font-medium rounded-md transition-colors ${activeTab === 'all' ? 'bg-white shadow-sm text-[#0A2540]' : 'text-[#64748B] hover:text-[#0A2540]'}`}
          >
            All Items
          </button>
          <button 
            onClick={() => setActiveTab('orders')}
            className={`px-4 py-1.5 text-[13px] font-medium rounded-md transition-colors ${activeTab === 'orders' ? 'bg-white shadow-sm text-[#0A2540]' : 'text-[#64748B] hover:text-[#0A2540]'}`}
          >
            Orders
          </button>
          <button 
            onClick={() => setActiveTab('rfqs')}
            className={`px-4 py-1.5 text-[13px] font-medium rounded-md transition-colors ${activeTab === 'rfqs' ? 'bg-white shadow-sm text-[#0A2540]' : 'text-[#64748B] hover:text-[#0A2540]'}`}
          >
            RFQs
          </button>
        </div>
      </div>

      {/* List Content */}
      <div className="divide-y divide-[#F1F5F9]">
        {filteredItems.length === 0 ? (
          <div className="p-12 text-center text-[#64748B]">
            <Package className="w-12 h-12 mx-auto mb-4 text-[#CBD5E1]" />
            <h3 className="text-[16px] font-medium text-[#0A2540]">No items found</h3>
            <p className="text-[14px]">Adjust your search or filters to see results.</p>
          </div>
        ) : (
          filteredItems.map((item, index) => (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              key={item.id} 
              className="p-5 hover:bg-[#F8FAFC] transition-colors group flex flex-col md:flex-row md:items-center justify-between gap-4 cursor-pointer"
              onClick={() => {
                if (item.type === 'order') navigate(`/dashboard/orders/${item.id}`)
              }}
            >
              <div className="flex items-start gap-4">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${item.type === 'order' ? 'bg-blue-50 text-blue-600' : 'bg-indigo-50 text-indigo-600'}`}>
                  {item.type === 'order' ? <Package className="w-5 h-5" /> : <FileText className="w-5 h-5" />}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold text-[#0A2540]">{item.title}</h4>
                    <span className={`px-2 py-0.5 rounded text-[11px] font-medium uppercase border ${getStatusColor(item.column)}`}>
                      {getStatusText(item.column)}
                    </span>
                  </div>
                  <p className="text-[13px] text-[#64748B] mt-1">{item.supplier}</p>
                </div>
              </div>

              <div className="flex items-center gap-6 md:w-[400px] justify-between">
                <div className="flex flex-col gap-1">
                  <span className="text-[12px] text-[#94A3B8] font-medium uppercase tracking-wider">Priority</span>
                  <span className={`text-[13px] font-medium ${item.priority === 'High' ? 'text-rose-600' : 'text-[#64748B]'}`}>{item.priority}</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-[12px] text-[#94A3B8] font-medium uppercase tracking-wider">Last Updated</span>
                  <div className="flex items-center gap-1.5 text-[#64748B]">
                    <Clock className="w-3.5 h-3.5" />
                    <span className="text-[13px]">{item.date}</span>
                  </div>
                </div>
                <Button variant="ghost" className="opacity-0 group-hover:opacity-100 transition-opacity p-2">
                  <ArrowRight className="w-5 h-5 text-[#64748B]" />
                </Button>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  )
}
