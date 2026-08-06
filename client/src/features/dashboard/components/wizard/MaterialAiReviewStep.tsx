import { useState, useEffect } from 'react'
import { useProductWizardStore } from '../../store/useProductWizardStore'
import { CheckCircle2, AlertTriangle, AlertCircle, Bot } from 'lucide-react'
import { useAiTask } from '@/shared/hooks/useAiTask'
import { toast } from 'sonner'

export function MaterialAiReviewStep() {
  const { draft } = useProductWizardStore()
  const { runAiTask, isThinking, progress, step } = useAiTask()
  const [aiData, setAiData] = useState<any>(null)

  useEffect(() => {
    runAiTask({
      endpoint: '/ai/material-review',
      payload: { draft },
      onSuccess: (data) => setAiData(data),
      onError: (err) => toast.error(err.message)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="space-y-8 min-h-[400px]">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-[20px] font-display font-bold text-[#0A2540] mb-1 flex items-center gap-2">
            <Bot className="w-6 h-6 text-[#0066FF]" /> AI Quality Review
          </h2>
          <p className="text-[14px] text-[#64748B] font-medium">TextileHub AI is evaluating your material for marketplace readiness.</p>
        </div>
      </div>

      {!aiData || isThinking ? (
        <div className="flex flex-col items-center justify-center py-20 space-y-6">
          <div className="relative w-20 h-20">
            <div className="absolute inset-0 rounded-full border-[3px] border-[#E2E8F0]"></div>
            <div className="absolute inset-0 rounded-full border-[3px] border-[#0066FF] border-t-transparent animate-spin"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <Bot className="w-8 h-8 text-[#0066FF] animate-pulse" />
            </div>
          </div>
          <div className="text-center w-[300px]">
            <p className="text-[15px] font-bold text-[#0A2540] mb-2">{step || 'Analyzing material...'}</p>
            <div className="w-full h-1.5 bg-[#F1F5F9] rounded-full overflow-hidden">
              <div className="h-full bg-[#0066FF] transition-all duration-300" style={{ width: `${progress}%` }} />
            </div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="col-span-1">
            <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-[16px] p-6 text-center h-full flex flex-col items-center justify-center">
              <h3 className="text-[13px] font-bold text-[#64748B] uppercase tracking-wider mb-2">Marketplace Readiness</h3>
              
              <div className="relative w-32 h-32 mb-4 mt-2">
                <svg viewBox="0 0 36 36" className="w-full h-full transform -rotate-90">
                  <path
                    className="text-[#E2E8F0]"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                  />
                  <path
                    className={aiData.qualityScore >= 80 ? "text-green-500" : aiData.qualityScore >= 60 ? "text-yellow-500" : "text-red-500"}
                    strokeDasharray={`${aiData.qualityScore}, 100`}
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center flex-col">
                  <span className="text-[28px] font-display font-bold text-[#0A2540]">{aiData.qualityScore}%</span>
                </div>
              </div>

              {aiData.publishReadiness === 'READY' ? (
                <div className="inline-flex items-center gap-1.5 bg-green-50 text-green-700 px-3 py-1 rounded-full text-[12px] font-bold border border-green-200">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Excellent
                </div>
              ) : aiData.publishReadiness === 'NEEDS_IMPROVEMENT' ? (
                <div className="inline-flex items-center gap-1.5 bg-yellow-50 text-yellow-700 px-3 py-1 rounded-full text-[12px] font-bold border border-yellow-200">
                  <AlertTriangle className="w-3.5 h-3.5" /> Needs Improvement
                </div>
              ) : (
                <div className="inline-flex items-center gap-1.5 bg-red-50 text-red-700 px-3 py-1 rounded-full text-[12px] font-bold border border-red-200">
                  <AlertCircle className="w-3.5 h-3.5" /> Poor Readiness
                </div>
              )}
            </div>
          </div>

          <div className="col-span-2 space-y-4">
            <div className={`p-4 rounded-[12px] border flex gap-4 ${!aiData.missingFields.includes('title') && !aiData.missingFields.includes('description') ? 'bg-white border-[#E2E8F0]' : 'bg-red-50 border-red-100'}`}>
              <div className="mt-0.5">
                {!aiData.missingFields.includes('title') && !aiData.missingFields.includes('description') ? <CheckCircle2 className="w-5 h-5 text-green-500" /> : <AlertCircle className="w-5 h-5 text-red-500" />}
              </div>
              <div>
                <h4 className="text-[14px] font-bold text-[#0A2540]">Content Quality</h4>
                <p className="text-[13px] text-[#64748B] mt-1">
                  {!aiData.missingFields.includes('title') && !aiData.missingFields.includes('description') ? 'Title and descriptions are detailed and optimized for search.' : 'Title or description is too short. AI recommends adding more detail to improve search visibility.'}
                </p>
                {aiData.improvedTitle && (
                   <div className="mt-2 text-[12px] p-2 bg-[#F8FAFC] border rounded">
                     <strong>AI Suggests Title:</strong> {aiData.improvedTitle}
                   </div>
                )}
              </div>
            </div>

            <div className={`p-4 rounded-[12px] border flex gap-4 ${aiData.seoKeywords?.length ? 'bg-white border-[#E2E8F0]' : 'bg-yellow-50 border-yellow-100'}`}>
              <div className="mt-0.5">
                {aiData.seoKeywords?.length ? <CheckCircle2 className="w-5 h-5 text-green-500" /> : <AlertTriangle className="w-5 h-5 text-yellow-600" />}
              </div>
              <div>
                <h4 className="text-[14px] font-bold text-[#0A2540]">Search Discoverability</h4>
                <p className="text-[13px] text-[#64748B] mt-1">
                  {aiData.seoKeywords?.length ? `Extracted SEO terms: ${aiData.seoKeywords.join(', ')}` : 'Missing category or tags.'}
                </p>
              </div>
            </div>
            
            <div className={`p-4 rounded-[12px] border flex gap-4 ${aiData.warnings?.length === 0 ? 'bg-white border-[#E2E8F0]' : 'bg-red-50 border-red-100'}`}>
              <div className="mt-0.5">
                {aiData.warnings?.length === 0 ? <CheckCircle2 className="w-5 h-5 text-green-500" /> : <AlertCircle className="w-5 h-5 text-red-500" />}
              </div>
              <div>
                <h4 className="text-[14px] font-bold text-[#0A2540]">AI Warnings</h4>
                <p className="text-[13px] text-[#64748B] mt-1">
                  {aiData.warnings?.length === 0 ? 'No issues detected.' : aiData.warnings?.join(' ')}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
