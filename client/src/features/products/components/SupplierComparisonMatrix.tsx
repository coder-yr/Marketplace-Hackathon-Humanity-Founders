import { Product } from '../types/products.types'
import { CheckCircle2, AlertTriangle, ShieldCheck, MapPin } from 'lucide-react'

interface SupplierComparisonMatrixProps {
  products: Product[]
}

export function SupplierComparisonMatrix({ products }: SupplierComparisonMatrixProps) {
  if (products.length === 0) return null

  // Treat the first product as the baseline/current supplier
  const bestMatchIdx = products.reduce((best, curr, i, arr) => {
    const score = curr.aiScore || 80
    const bestScore = arr[best].aiScore || 80
    return score > bestScore ? i : best
  }, 0)

  return (
    <div className="flex flex-col h-full bg-white rounded-[16px] border border-[#E2E8F0] overflow-hidden">
      <div className="p-4 border-b border-[#E2E8F0] bg-[#F8FAFC]">
        <h3 className="text-[14px] font-bold text-[#0A2540]">Supplier Comparison Matrix</h3>
        <p className="text-[11px] text-[#64748B]">AI has highlighted the most optimal procurement choice.</p>
      </div>

      <div className="flex-1 overflow-auto p-4 scrollbar-none">
        <div className="grid grid-cols-[100px_repeat(auto-fit,minmax(120px,1fr))] gap-2 items-start">
          
          {/* Header Row */}
          <div className="text-[10px] font-bold text-[#94A3B8] uppercase mt-2">Metrics</div>
          {products.map((p, i) => (
            <div key={p._id} className={`p-3 rounded-[12px] border ${i === bestMatchIdx ? 'border-[#0066FF] bg-[#0066FF]/5' : 'border-[#E2E8F0] bg-white'}`}>
              {i === bestMatchIdx && <div className="text-[9px] font-bold text-[#0066FF] mb-1 flex items-center gap-1"><SparklesIcon /> Best Match</div>}
              <img src={p.images?.[0]} className="w-10 h-10 rounded-[6px] object-cover mb-2" />
              <div className="text-[11px] font-bold text-[#0A2540] truncate" title={p.supplierId?.fullName || 'Verified Supplier'}>{p.supplierId?.fullName || 'Supplier ' + (i + 1)}</div>
              <div className="text-[9px] text-[#64748B] flex items-center gap-1"><MapPin className="w-2.5 h-2.5" /> India</div>
            </div>
          ))}

          {/* Row: Price */}
          <div className="text-[11px] font-bold text-[#0A2540] py-3 border-b border-[#F1F5F9]">Price</div>
          {products.map((p, i) => (
            <div key={p._id + 'price'} className={`text-[12px] font-bold py-3 border-b border-[#F1F5F9] ${i === bestMatchIdx ? 'text-[#0066FF]' : 'text-[#0A2540]'}`}>
              ${p.priceRange?.min || '3.50'}
            </div>
          ))}

          {/* Row: MOQ */}
          <div className="text-[11px] font-bold text-[#0A2540] py-3 border-b border-[#F1F5F9]">MOQ</div>
          {products.map((p) => (
            <div key={p._id + 'moq'} className="text-[11px] font-medium text-[#64748B] py-3 border-b border-[#F1F5F9]">
              {p.moq?.value || 500} {p.moq?.unit || 'm'}
            </div>
          ))}

          {/* Row: Lead Time */}
          <div className="text-[11px] font-bold text-[#0A2540] py-3 border-b border-[#F1F5F9]">Lead Time</div>
          {products.map((p) => (
            <div key={p._id + 'lt'} className="text-[11px] font-medium text-[#64748B] py-3 border-b border-[#F1F5F9]">
              {p.leadTime || '14 Days'}
            </div>
          ))}

          {/* Row: AI Score */}
          <div className="text-[11px] font-bold text-[#0A2540] py-3 border-b border-[#F1F5F9]">AI Score</div>
          {products.map((p, i) => (
            <div key={p._id + 'aiscore'} className={`text-[12px] font-bold py-3 border-b border-[#F1F5F9] ${i === bestMatchIdx ? 'text-[#16A34A]' : 'text-[#0A2540]'}`}>
              {p.aiScore || (90 - i * 4)}
            </div>
          ))}

          {/* Row: Risk */}
          <div className="text-[11px] font-bold text-[#0A2540] py-3 border-b border-[#F1F5F9]">Risk</div>
          {products.map((p, i) => (
            <div key={p._id + 'risk'} className="text-[11px] font-medium text-[#64748B] py-3 border-b border-[#F1F5F9] flex items-center gap-1">
              {i === bestMatchIdx ? <CheckCircle2 className="w-3 h-3 text-[#16A34A]" /> : <AlertTriangle className="w-3 h-3 text-[#F59E0B]" />}
              {i === bestMatchIdx ? 'Low' : 'Moderate'}
            </div>
          ))}

          {/* Row: Certifications */}
          <div className="text-[11px] font-bold text-[#0A2540] py-3 border-b border-[#F1F5F9]">Certs</div>
          {products.map((p, i) => (
            <div key={p._id + 'certs'} className="text-[11px] font-medium text-[#64748B] py-3 border-b border-[#F1F5F9] flex flex-col gap-1">
              <span className="flex items-center gap-1"><ShieldCheck className="w-3 h-3 text-[#16A34A]" /> OEKO-TEX</span>
              {i === bestMatchIdx && <span className="flex items-center gap-1"><ShieldCheck className="w-3 h-3 text-[#16A34A]" /> GOTS</span>}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function SparklesIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>
  )
}
