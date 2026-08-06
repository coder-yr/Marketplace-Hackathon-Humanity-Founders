import { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm, FormProvider } from 'react-hook-form'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuthStore } from '@/features/auth/store/auth.store'
import { onboardingApi } from '../api/onboarding.api'
import { ProgressBar } from '@/shared/components/feedback/progress-bar'
import { Button } from '@/shared/components/ui/button'
import { toast } from 'sonner'
import debounce from 'lodash.debounce'
import { Hexagon } from 'lucide-react'
import {
  BuyerBusinessStep,
  BuyerIndustryStep,
  BuyerPreferencesStep,
  BuyerLocationStep,
  BuyerReviewStep,
} from '../components/BuyerSteps'
import {
  SupplierBusinessStep,
  SupplierGSTStep,
  SupplierProductionStep,
  SupplierCategoriesStep,
  SupplierBrandingStep,
  SupplierReviewStep,
} from '../components/SupplierSteps'

const BUYER_STEPS = [
  { id: 'business', title: 'Business Details', component: BuyerBusinessStep },
  { id: 'industry', title: 'Industry', component: BuyerIndustryStep },
  { id: 'preferences', title: 'Buying Preferences', component: BuyerPreferencesStep },
  { id: 'location', title: 'Location', component: BuyerLocationStep },
  { id: 'review', title: 'Review', component: BuyerReviewStep },
]

const SUPPLIER_STEPS = [
  { id: 'business', title: 'Business Details', component: SupplierBusinessStep },
  { id: 'gst', title: 'Legal & Contact', component: SupplierGSTStep },
  { id: 'production', title: 'Production', component: SupplierProductionStep },
  { id: 'categories', title: 'Categories', component: SupplierCategoriesStep },
  { id: 'branding', title: 'Branding', component: SupplierBrandingStep },
  { id: 'review', title: 'Review', component: SupplierReviewStep },
]

export function OnboardingPage() {
  const navigate = useNavigate()
  const { user, initialize } = useAuthStore()
  const [currentStepIndex, setCurrentStepIndex] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const isBuyer = user?.role === 'buyer'
  const steps = isBuyer ? BUYER_STEPS : SUPPLIER_STEPS
  const CurrentStepComponent = steps[currentStepIndex].component
  const progress = Math.round(((currentStepIndex + 1) / steps.length) * 100)

  const methods = useForm({
    mode: 'onChange',
  })

  // Fetch draft data on mount
  useEffect(() => {
    const fetchDraft = async () => {
      try {
        const res = await onboardingApi.getMyProfile()
        if (res.data) {
          methods.reset(res.data)
        }
      } catch (err) {
        console.error('Failed to fetch draft profile', err)
      }
    }
    fetchDraft()
  }, [methods])

  // Auto-save logic
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedSave = useCallback(
    debounce(async (data: any) => {
      try {
        if (isBuyer) {
          await onboardingApi.saveBuyerDraft(data)
        } else {
          await onboardingApi.saveSupplierDraft(data)
        }
      } catch (err) {
        console.error('Auto-save failed', err)
      }
    }, 2000),
    [isBuyer]
  )

  useEffect(() => {
    const subscription = methods.watch((value) => {
      debouncedSave(value)
    })
    return () => subscription.unsubscribe()
  }, [methods, debouncedSave])

  const saveAndNext = async () => {
    // Explicit save on next step
    try {
      const data = methods.getValues()
      if (isBuyer) {
        await onboardingApi.saveBuyerDraft(data)
      } else {
        await onboardingApi.saveSupplierDraft(data)
      }
      setCurrentStepIndex((prev) => Math.min(prev + 1, steps.length - 1))
    } catch (err: any) {
      toast.error(err.response?.data?.error?.message || 'Failed to save progress')
    }
  }

  const prevStep = () => {
    setCurrentStepIndex((prev) => Math.max(prev - 1, 0))
  }

  const handleComplete = async () => {
    setIsSubmitting(true)
    try {
      await onboardingApi.completeOnboarding()
      // Re-initialize auth store to get updated user (isOnboarded: true)
      await initialize(true)
      navigate('/workspace-setup', { replace: true })
    } catch (err: any) {
      toast.error(err.response?.data?.error?.message || 'Failed to complete onboarding')
      setIsSubmitting(false)
    }
  }

  const isLastStep = currentStepIndex === steps.length - 1

  return (
    <div className="min-h-screen bg-[#F7F8FA] flex flex-col items-center py-12 px-4 sm:px-6 lg:px-8 font-sans">
      
      {/* Brand Header */}
      <div className="flex items-center gap-2 mb-12">
        <Hexagon className="w-8 h-8 text-[var(--primary)] fill-[var(--primary)]/20" />
        <span className="font-display font-bold text-[24px] text-[var(--heading)]">TextileHub <span className="text-[var(--primary)]">Enterprise</span></span>
      </div>

      <div className="w-full max-w-3xl">
        <div className="mb-8 text-center">
          <h1 className="text-[32px] md:text-[40px] font-display font-bold text-[var(--heading)] mb-3 tracking-tight">Complete Your Enterprise Profile</h1>
          <p className="text-[16px] text-[var(--body)] font-medium max-w-xl mx-auto">
            {isBuyer ? 'Configure your procurement preferences to get personalized sourcing recommendations.' : 'Showcase your manufacturing capabilities to global enterprise buyers.'}
          </p>
        </div>

        {/* Step Progress UI */}
        <div className="mb-10 flex flex-col gap-4 max-w-2xl mx-auto">
          <ProgressBar value={progress} size="lg" variant="brand" className="h-2 rounded-full bg-[var(--border)] [&>div]:bg-[var(--primary)]" />
          <div className="flex justify-between text-[12px] text-[#94A3B8] font-bold uppercase tracking-widest">
            {steps.map((step, idx) => (
              <span
                key={step.id}
                className={
                  idx === currentStepIndex
                    ? 'text-[var(--primary)]'
                    : idx < currentStepIndex
                    ? 'text-[var(--success)]'
                    : 'hidden sm:inline-block'
                }
              >
                {step.title} {idx < currentStepIndex && '✓'}
              </span>
            ))}
          </div>
        </div>

        <FormProvider {...methods}>
          <div className="bg-white rounded-[24px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-[var(--border)] p-8 md:p-10 overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStepIndex}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <CurrentStepComponent />
              </motion.div>
            </AnimatePresence>

            <div className="mt-10 flex justify-between items-center border-t border-[var(--border)] pt-8">
              <Button
                variant="outline"
                onClick={prevStep}
                disabled={currentStepIndex === 0 || isSubmitting}
                className="border-[var(--border)] text-[var(--body)] hover:text-[var(--heading)] font-bold h-12 px-6 rounded-[12px]"
              >
                Back
              </Button>
              
              <div className="flex items-center gap-4">
                <span className="text-[12px] font-bold text-[#94A3B8] uppercase tracking-widest hidden sm:inline-block">
                  Auto-saving...
                </span>
                {isLastStep ? (
                  <Button
                    onClick={handleComplete}
                    loading={isSubmitting}
                    className="bg-[var(--heading)] hover:bg-[#1E293B] text-white font-bold h-12 px-8 rounded-[12px] shadow-sm"
                  >
                    Complete Profile
                  </Button>
                ) : (
                  <Button 
                    onClick={saveAndNext}
                    className="bg-[var(--primary)] hover:bg-[#0052CC] text-white font-bold h-12 px-8 rounded-[12px] shadow-sm"
                  >
                    Next Step
                  </Button>
                )}
              </div>
            </div>
          </div>
        </FormProvider>
      </div>
    </div>
  )
}
