import { useState } from 'react'
import { Sparkles, CheckCircle2, Loader2 } from 'lucide-react'
import { Button } from '@/shared/components/ui/button'

export function LiveAiAnalysisPanel() {
  const [selectedSuppliersCount] = useState(4)
  const [draftRfqsCount] = useState(2)

  return (
    <div className="bg-white rounded-[24px] border border-[#E2E8F0] p-5 shadow-sm flex flex-col gap-5 text-[#0A2540]">
      
      {/* Header */}
      <div className="flex items-center gap-2 pb-1 border-b border-[#F1F5F9]">
        <div className="flex items-center justify-center w-5 h-5 rounded-full bg-[#2563EB]/10 text-[#2563EB]">
          <span className="text-[12px] font-black">⁖</span>
        </div>
        <h3 className="text-[15px] font-display font-extrabold text-[#0A2540]">Procurement Workspace</h3>
      </div>

      {/* AI OPERATIONS STATUS */}
      <div>
        <span className="block text-[10px] font-black tracking-widest text-[#94A3B8] uppercase mb-2">AI OPERATIONS STATUS</span>
        <div className="flex flex-col gap-2">
          
          <div className="flex items-center gap-2 text-[12px] font-semibold text-[#2563EB] bg-[#EFF6FF] p-2.5 rounded-xl border border-[#DBEAFE]">
            <Loader2 className="w-3.5 h-3.5 animate-spin flex-shrink-0" />
            <span>Evaluating supplier reliability...</span>
          </div>

          <div className="flex items-center gap-2 text-[12px] font-semibold text-[#166534] bg-[#DCFCE7] p-2.5 rounded-xl border border-[#BBF7D0]">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#16A34A] flex-shrink-0" />
            <span>Specifications parsed successfully</span>
          </div>

        </div>
      </div>

      {/* Key Metric Rows */}
      <div className="flex flex-col gap-3 border-t border-[#F1F5F9] pt-4">
        
        <div className="flex items-center justify-between">
          <span className="text-[13px] font-medium text-[#64748B]">Selected Suppliers</span>
          <span className="text-[14px] font-black text-[#0A2540]">0{selectedSuppliersCount}</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-[13px] font-medium text-[#64748B]">Draft RFQs</span>
          <span className="text-[14px] font-black text-[#0A2540]">0{draftRfqsCount}</span>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-[#F1F5F9]">
          <span className="text-[12px] font-black tracking-wider text-[#94A3B8] uppercase">EST. TOTAL SPEND</span>
          <span className="text-[18px] font-display font-black text-[#0A2540]">$24,500</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-[12px] font-black tracking-wider text-[#16A34A] uppercase">POTENTIAL SAVINGS</span>
          <span className="text-[15px] font-display font-black text-[#16A34A]">-$3,200</span>
        </div>

      </div>

      {/* Price Trend Widget */}
      <div className="border-t border-[#F1F5F9] pt-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[12px] font-bold text-[#64748B]">Price Trend</span>
          <span className="text-[12px] font-bold text-[#16A34A]">Stable</span>
        </div>
        
        {/* Mini bar graph */}
        <div className="h-7 bg-[#F8FAFC] rounded-xl p-1.5 flex items-end gap-1.5 border border-[#F1F5F9]">
          {[35, 45, 30, 40, 60, 90, 85].map((h, idx) => (
            <div 
              key={idx} 
              className={`flex-1 rounded-sm transition-all ${idx >= 4 ? 'bg-[#2563EB]' : 'bg-[#CBD5E1]'}`}
              style={{ height: `${h}%` }}
            />
          ))}
        </div>
      </div>

      {/* Supplier Risk Widget */}
      <div className="border-t border-[#F1F5F9] pt-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[12px] font-bold text-[#64748B]">Supplier Risk</span>
          <span className="text-[12px] font-bold text-[#EAB308]">Medium</span>
        </div>
        
        {/* Risk meter */}
        <div className="h-2 bg-[#F1F5F9] rounded-full overflow-hidden flex">
          <div className="w-[50%] h-full bg-[#EAB308] rounded-full" />
        </div>
      </div>

      {/* Primary Action CTA Button */}
      <Button 
        className="w-full bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-black text-[13px] h-12 rounded-2xl shadow-lg shadow-[#2563EB]/25 mt-2 flex items-center justify-center gap-2 transition-all hover:scale-[1.02]"
      >
        <span>Review & Execute Procurement</span>
        <Sparkles className="w-4 h-4 fill-white" />
      </Button>

    </div>
  )
}
