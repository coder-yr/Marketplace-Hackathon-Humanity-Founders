import { useEffect, useState } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import { useAuthStore } from '@/features/auth/store/auth.store'
import { onboardingApi } from '@/features/onboarding/api/onboarding.api'
import { Button } from '@/shared/components/ui/button'
import { Tabs } from '@/shared/components/ui/tabs'
import { toast } from 'sonner'
import { Save, User, Settings as SettingsIcon, Package, Target, MapPin, Briefcase, FileText, Hexagon, Tag } from 'lucide-react'
import {
  BuyerBusinessStep,
  BuyerIndustryStep,
  BuyerPreferencesStep,
  BuyerLocationStep,
} from '@/features/onboarding/components/BuyerSteps'
import {
  SupplierBusinessStep,
  SupplierGSTStep,
  SupplierProductionStep,
  SupplierCategoriesStep,
  SupplierBrandingStep,
} from '@/features/onboarding/components/SupplierSteps'

export function SettingsPage() {
  const { user } = useAuthStore()
  const isBuyer = user?.role === 'buyer'
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  const methods = useForm({
    mode: 'onChange',
  })

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await onboardingApi.getMyProfile()
        if (res.data) {
          methods.reset(res.data)
        }
      } catch (err) {
        console.error('Failed to fetch profile', err)
        toast.error('Failed to load profile data')
      } finally {
        setIsLoading(false)
      }
    }
    fetchProfile()
  }, [methods])

  const onSubmit = async (data: any) => {
    setIsSubmitting(true)
    try {
      if (isBuyer) {
        await onboardingApi.saveBuyerDraft(data)
      } else {
        await onboardingApi.saveSupplierDraft(data)
      }
      toast.success('Profile updated successfully')
    } catch (err: any) {
      toast.error(err.response?.data?.error?.message || 'Failed to save profile')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[var(--primary)]" />
      </div>
    )
  }

  const buyerTabs = [
    {
      id: 'business',
      label: 'Business Details',
      icon: <Briefcase className="w-4 h-4" />,
      content: (
        <div className="bg-white p-6 md:p-8 rounded-[16px] border border-[var(--border)]">
          <h2 className="text-[18px] font-bold text-[var(--heading)] mb-6">Business Information</h2>
          <BuyerBusinessStep />
        </div>
      )
    },
    {
      id: 'industry',
      label: 'Industry',
      icon: <Target className="w-4 h-4" />,
      content: (
        <div className="bg-white p-6 md:p-8 rounded-[16px] border border-[var(--border)]">
          <h2 className="text-[18px] font-bold text-[var(--heading)] mb-6">Industry & Needs</h2>
          <BuyerIndustryStep />
        </div>
      )
    },
    {
      id: 'preferences',
      label: 'Preferences',
      icon: <SettingsIcon className="w-4 h-4" />,
      content: (
        <div className="bg-white p-6 md:p-8 rounded-[16px] border border-[var(--border)]">
          <h2 className="text-[18px] font-bold text-[var(--heading)] mb-6">Buying Preferences</h2>
          <BuyerPreferencesStep />
        </div>
      )
    },
    {
      id: 'location',
      label: 'Location',
      icon: <MapPin className="w-4 h-4" />,
      content: (
        <div className="bg-white p-6 md:p-8 rounded-[16px] border border-[var(--border)]">
          <h2 className="text-[18px] font-bold text-[var(--heading)] mb-6">Location & Shipping</h2>
          <BuyerLocationStep />
        </div>
      )
    }
  ]

  const supplierTabs = [
    {
      id: 'business',
      label: 'Business Details',
      icon: <Briefcase className="w-4 h-4" />,
      content: (
        <div className="bg-white p-6 md:p-8 rounded-[16px] border border-[var(--border)]">
          <h2 className="text-[18px] font-bold text-[var(--heading)] mb-6">Business Information</h2>
          <SupplierBusinessStep />
        </div>
      )
    },
    {
      id: 'gst',
      label: 'Legal & Contact',
      icon: <FileText className="w-4 h-4" />,
      content: (
        <div className="bg-white p-6 md:p-8 rounded-[16px] border border-[var(--border)]">
          <h2 className="text-[18px] font-bold text-[var(--heading)] mb-6">Legal & Contact</h2>
          <SupplierGSTStep />
        </div>
      )
    },
    {
      id: 'production',
      label: 'Production',
      icon: <Package className="w-4 h-4" />,
      content: (
        <div className="bg-white p-6 md:p-8 rounded-[16px] border border-[var(--border)]">
          <h2 className="text-[18px] font-bold text-[var(--heading)] mb-6">Production Capacity</h2>
          <SupplierProductionStep />
        </div>
      )
    },
    {
      id: 'categories',
      label: 'Categories',
      icon: <Tag className="w-4 h-4" />,
      content: (
        <div className="bg-white p-6 md:p-8 rounded-[16px] border border-[var(--border)]">
          <h2 className="text-[18px] font-bold text-[var(--heading)] mb-6">Product Categories</h2>
          <SupplierCategoriesStep />
        </div>
      )
    },
    {
      id: 'branding',
      label: 'Branding',
      icon: <Hexagon className="w-4 h-4" />,
      content: (
        <div className="bg-white p-6 md:p-8 rounded-[16px] border border-[var(--border)]">
          <h2 className="text-[18px] font-bold text-[var(--heading)] mb-6">Brand Identity</h2>
          <SupplierBrandingStep />
        </div>
      )
    }
  ]

  return (
    <div className="max-w-[900px] mx-auto pb-24">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-[28px] font-display font-bold text-[var(--heading)]">Company Settings</h1>
          <p className="text-[14px] text-[#64748B] font-medium mt-1">
            Manage your {isBuyer ? 'procurement preferences' : 'supplier profile'} and company details.
          </p>
        </div>
        <Button 
          onClick={methods.handleSubmit(onSubmit)}
          loading={isSubmitting}
          className="bg-[var(--primary)] hover:bg-[#0052CC] text-white font-bold h-11 px-6 rounded-[10px]"
        >
          <Save className="w-4 h-4 mr-2" /> Save Changes
        </Button>
      </div>

      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-8">
          {/* General Account Info */}
          <div className="bg-white p-6 rounded-[16px] border border-[var(--border)] flex items-center gap-6">
            <div className="w-16 h-16 rounded-full bg-[#F1F5F9] flex items-center justify-center border border-[#E2E8F0] shrink-0">
              <User className="w-8 h-8 text-[#94A3B8]" />
            </div>
            <div className="flex-1">
              <h3 className="text-[16px] font-bold text-[var(--heading)]">{user?.fullName}</h3>
              <p className="text-[13px] text-[#64748B] font-medium mt-0.5">{user?.email}</p>
              <div className="mt-2 inline-flex items-center px-2 py-0.5 rounded-[4px] bg-[#F1F5F9] border border-[#E2E8F0]">
                <span className="text-[11px] font-bold text-[#475569] uppercase tracking-wider">{user?.role}</span>
              </div>
            </div>
          </div>

          <Tabs 
            items={isBuyer ? buyerTabs : supplierTabs}
            variant="segmented"
            className="w-full"
          />
        </form>
      </FormProvider>
    </div>
  )
}
