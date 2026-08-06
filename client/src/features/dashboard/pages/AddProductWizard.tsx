import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useProductWizardStore } from '../store/useProductWizardStore'
import { WizardProgress } from '../components/wizard/WizardProgress'
import { MaterialBasicStep } from '../components/wizard/MaterialBasicStep'
import { MaterialSpecsStep } from '../components/wizard/MaterialSpecsStep'
import { MaterialProcurementStep } from '../components/wizard/MaterialProcurementStep'
import { MaterialComplianceStep } from '../components/wizard/MaterialComplianceStep'
import { MaterialMediaStep } from '../components/wizard/MaterialMediaStep'
import { MaterialAiReviewStep } from '../components/wizard/MaterialAiReviewStep'
import { Button } from '@/shared/components/ui/button'
import { productsApi } from '@/features/products/api/products.api'
import { toast } from 'sonner'
import { ArrowLeft, ArrowRight, Save, CheckCircle, ChevronLeft } from 'lucide-react'

export function AddProductWizard() {
  const navigate = useNavigate()
  const { 
    currentStep, 
    nextStep, 
    prevStep, 
    setStep,
    draft, 
    productId,
    isSaving,
    lastSavedAt,
    saveDraft,
    reset 
  } = useProductWizardStore()

  useEffect(() => {
    reset() // Reset on mount
    
    // Autosave timer
    const timer = setInterval(() => {
      saveDraft()
    }, 30000) // 30 seconds

    return () => {
      clearInterval(timer)
      saveDraft() // Save on unmount
    }
  }, [])

  const handlePublish = async () => {
    if (!productId) {
      toast.error('Draft must be saved before publishing.')
      return
    }
    
    try {
      await productsApi.publishProduct(productId)
      toast.success('Material published successfully!')
      reset()
      navigate('/dashboard/products')
    } catch (error) {
      toast.error('Failed to publish material.')
    }
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1: return <MaterialBasicStep />
      case 2: return <MaterialSpecsStep />
      case 3: return <MaterialProcurementStep />
      case 4: return <MaterialComplianceStep />
      case 5: return <MaterialMediaStep />
      case 6: return <MaterialAiReviewStep />
      default: return <MaterialBasicStep />
    }
  }

  const formatLastSaved = () => {
    if (!lastSavedAt) return 'Unsaved'
    const diff = Math.floor((new Date().getTime() - lastSavedAt.getTime()) / 1000)
    if (diff < 60) return `Draft saved ${diff} seconds ago`
    return `Draft saved ${Math.floor(diff / 60)} minutes ago`
  }

  return (
    <div className="flex-1 bg-[#F8FAFC] flex flex-col h-full overflow-hidden">
      {/* Header */}
      <header className="h-[72px] bg-white border-b border-[#E2E8F0] px-8 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-4">
          <Button variant="ghost" onClick={() => navigate('/dashboard/products')} className="text-[#64748B] hover:text-[#0A2540] h-8 w-8 px-0">
            <ChevronLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-[20px] font-display font-bold text-[#0A2540]">
              {draft.title || 'New Material'}
            </h1>
            <div className="flex items-center gap-2 text-[12px] font-bold text-[#64748B]">
              <span className="uppercase tracking-wide">Status: Draft</span>
              <span>•</span>
              <span className="flex items-center gap-1">
                {isSaving ? (
                  <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" /> Saving...</span>
                ) : (
                  <span className="flex items-center gap-1 text-green-600"><CheckCircle className="w-3 h-3" /> {formatLastSaved()}</span>
                )}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="outline" className="border-[#E2E8F0] text-[#0A2540] font-bold" onClick={saveDraft} disabled={isSaving}>
            <Save className="w-4 h-4 mr-2" /> Save Draft
          </Button>
          {currentStep === 6 && (
            <Button className="bg-[#0A2540] text-white hover:bg-[#1E3A5F] font-bold" onClick={handlePublish}>
              Publish Material
            </Button>
          )}
        </div>
      </header>

      {/* Main Content Scrollable Area */}
      <div className="flex-1 overflow-y-auto p-8">
        <div className="max-w-[1000px] mx-auto space-y-8">
          
          <div className="bg-white p-6 rounded-[16px] border border-[#E2E8F0] shadow-sm">
            <WizardProgress currentStep={currentStep} onStepClick={setStep} />
          </div>

          <div className="bg-white p-8 rounded-[16px] border border-[#E2E8F0] shadow-sm min-h-[500px]">
            {renderStep()}
          </div>

          {/* Navigation Bar */}
          <div className="flex items-center justify-between py-4">
            <Button 
              variant="outline" 
              onClick={prevStep} 
              disabled={currentStep === 1}
              className="border-[#E2E8F0] text-[#0A2540] font-bold px-6"
            >
              <ArrowLeft className="w-4 h-4 mr-2" /> Back
            </Button>
            
            {currentStep < 6 ? (
              <Button 
                onClick={nextStep} 
                className="bg-[#0066FF] text-white hover:bg-[#0052CC] font-bold px-8"
              >
                Next Step <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            ) : (
              <Button 
                onClick={handlePublish} 
                className="bg-green-600 text-white hover:bg-green-700 font-bold px-8"
              >
                Publish to Marketplace <CheckCircle className="w-4 h-4 ml-2" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
