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
      await initialize()
      navigate('/workspace-setup', { replace: true })
    } catch (err: any) {
      toast.error(err.response?.data?.error?.message || 'Failed to complete onboarding')
      setIsSubmitting(false)
    }
  }

  const isLastStep = currentStepIndex === steps.length - 1

  return (
    <div className="min-h-screen bg-surface-50 flex flex-col items-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-2xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-text-primary mb-2">Complete Your Profile</h1>
          <p className="text-text-secondary">
            {isBuyer ? 'Tell us what you are looking for.' : 'Showcase your capabilities to buyers.'}
          </p>
        </div>

        {/* Step Progress UI */}
        <div className="mb-8 flex flex-col gap-4">
          <ProgressBar value={progress} size="lg" variant="brand" />
          <div className="flex justify-between text-sm text-text-secondary font-medium">
            {steps.map((step, idx) => (
              <span
                key={step.id}
                className={
                  idx === currentStepIndex
                    ? 'text-brand-primary'
                    : idx < currentStepIndex
                    ? 'text-success'
                    : 'hidden sm:inline-block'
                }
              >
                {step.title} {idx < currentStepIndex && '✓'}
              </span>
            ))}
          </div>
        </div>

        <FormProvider {...methods}>
          <div className="bg-surface-1 rounded-2xl shadow-sm border border-border-color p-6 md:p-8 overflow-hidden">
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

            <div className="mt-8 flex justify-between items-center border-t border-border-color pt-6">
              <Button
                variant="outline"
                onClick={prevStep}
                disabled={currentStepIndex === 0 || isSubmitting}
              >
                Back
              </Button>
              
              <div className="flex items-center gap-4">
                <span className="text-xs text-text-secondary hidden sm:inline-block">
                  Auto-saved
                </span>
                {isLastStep ? (
                  <Button
                    onClick={handleComplete}
                    loading={isSubmitting}
                  >
                    Complete Profile
                  </Button>
                ) : (
                  <Button onClick={saveAndNext}>
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
