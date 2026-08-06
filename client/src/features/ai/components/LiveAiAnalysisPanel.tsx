import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles, CheckCircle2, Loader2, BarChart2, TrendingUp, ShieldAlert, Leaf } from 'lucide-react'

const AI_TASKS = [
  "Reading material specifications...",
  "Checking supplier certifications...",
  "Benchmarking global prices...",
  "Evaluating procurement risk...",
  "Finding optimal alternatives...",
  "Estimating total savings..."
]

export function LiveAiAnalysisPanel() {
  const [currentTaskIdx, setCurrentTaskIdx] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTaskIdx((prev) => (prev + 1) % AI_TASKS.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex flex-col gap-5 h-full">
      {/* Header */}
      <div className="flex items-center gap-2 text-[#0A2540]">
        <Sparkles className="w-4 h-4 text-[#0066FF]" />
        <h3 className="text-[13px] font-bold">Live AI Analysis</h3>
      </div>

      {/* Dynamic Task Progression */}
      <div className="bg-white rounded-[16px] border border-[#E2E8F0] p-4 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 left-0 w-1 h-full bg-[#0066FF]" />
        <div className="flex items-start gap-3">
          <Loader2 className="w-4 h-4 text-[#0066FF] animate-spin mt-0.5 flex-shrink-0" />
          <div className="flex-1 min-w-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentTaskIdx}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                transition={{ duration: 0.3 }}
                className="text-[12px] font-bold text-[#0A2540]"
              >
                {AI_TASKS[currentTaskIdx]}
              </motion.div>
            </AnimatePresence>
            <p className="text-[10px] text-[#64748B] mt-1">Cross-referencing 4,200+ global data points.</p>
          </div>
        </div>
      </div>

      {/* Previous Completed Tasks */}
      <div className="flex flex-col gap-2">
        {AI_TASKS.slice(0, 3).map((task, i) => (
          <div key={i} className="flex items-center gap-2 text-[11px] text-[#64748B] font-medium">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#16A34A]" />
            {task.replace('...', ' complete')}
          </div>
        ))}
      </div>

      {/* Divider */}
      <div className="h-px bg-[#E2E8F0] my-2" />

      {/* Intelligence Widgets */}
      <div>
        <h4 className="text-[11px] font-bold text-[#94A3B8] uppercase tracking-widest mb-4">Market Intelligence</h4>
        
        <div className="space-y-4">
          
          {/* Market Demand */}
          <div>
            <div className="flex justify-between items-center mb-1.5">
              <span className="text-[12px] font-bold text-[#0A2540] flex items-center gap-1.5"><BarChart2 className="w-3.5 h-3.5 text-[#0066FF]" /> Market Demand</span>
              <span className="text-[11px] font-bold text-[#0066FF]">High</span>
            </div>
            <div className="h-1.5 bg-[#F1F5F9] rounded-full overflow-hidden">
              <motion.div initial={{ width: 0 }} animate={{ width: '85%' }} className="h-full bg-[#0066FF] rounded-full" transition={{ duration: 1, delay: 0.2 }} />
            </div>
          </div>

          {/* Price Trend */}
          <div>
            <div className="flex justify-between items-center mb-1.5">
              <span className="text-[12px] font-bold text-[#0A2540] flex items-center gap-1.5"><TrendingUp className="w-3.5 h-3.5 text-[#16A34A]" /> Price Trend</span>
              <span className="text-[11px] font-bold text-[#16A34A]">-2.4% MoM</span>
            </div>
            <div className="h-8 flex items-end gap-1">
              {[40, 45, 42, 38, 35, 32, 28].map((h, i) => (
                <div key={i} className="flex-1 bg-[#16A34A]/20 rounded-t-sm" style={{ height: `${h}%` }} />
              ))}
            </div>
          </div>

          {/* Supply Stability */}
          <div>
            <div className="flex justify-between items-center mb-1.5">
              <span className="text-[12px] font-bold text-[#0A2540] flex items-center gap-1.5"><ShieldAlert className="w-3.5 h-3.5 text-[#F59E0B]" /> Supply Risk</span>
              <span className="text-[11px] font-bold text-[#F59E0B]">Moderate</span>
            </div>
            <div className="h-1.5 bg-[#F1F5F9] rounded-full overflow-hidden">
              <motion.div initial={{ width: 0 }} animate={{ width: '45%' }} className="h-full bg-[#F59E0B] rounded-full" transition={{ duration: 1, delay: 0.4 }} />
            </div>
          </div>
          
          {/* Carbon Impact */}
          <div>
            <div className="flex justify-between items-center mb-1.5">
              <span className="text-[12px] font-bold text-[#0A2540] flex items-center gap-1.5"><Leaf className="w-3.5 h-3.5 text-[#10B981]" /> Avg Carbon Impact</span>
              <span className="text-[11px] font-bold text-[#10B981]">Class A</span>
            </div>
            <div className="h-1.5 bg-[#F1F5F9] rounded-full overflow-hidden">
              <motion.div initial={{ width: 0 }} animate={{ width: '90%' }} className="h-full bg-[#10B981] rounded-full" transition={{ duration: 1, delay: 0.6 }} />
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
