import { useFormContext } from 'react-hook-form'
import { Input } from '@/shared/components/ui/input'

export function BuyerBusinessStep() {
  const { register, formState: { errors } } = useFormContext()
  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-xl font-bold text-text-primary">Business Details</h2>
      <p className="text-text-secondary text-sm mb-4">Tell us about your buying organization.</p>
      
      <Input
        label="Company Name"
        placeholder="Enter your company name"
        error={errors.companyName?.message as string}
        {...register('companyName')}
      />
      <Input
        label="Company Size"
        placeholder="e.g. 1-10, 11-50, 50+"
        error={errors.companySize?.message as string}
        {...register('companySize')}
      />
    </div>
  )
}

export function BuyerIndustryStep() {
  const { register, formState: { errors } } = useFormContext()
  return (
    <div className="flex flex-col gap-6">
      <div className="flex gap-4 items-start">
        <div className="w-8 h-8 rounded-full bg-[var(--primary)] text-white flex items-center justify-center font-bold text-sm shrink-0">
          AI
        </div>
        <div className="bg-[#F8FAFC] border border-[var(--border)] p-4 rounded-[16px] rounded-tl-none">
          <p className="text-[var(--heading)] font-medium text-[15px]">What kind of fabrics do you usually source? And what's your average monthly requirement?</p>
        </div>
      </div>
      
      <div className="pl-12 flex flex-col gap-4">
        <Input
          label="Preferred Fabrics / Categories"
          placeholder="e.g. Cotton, Linen, Knitwear..."
          error={errors.industry?.message as string}
          {...register('industry')}
        />
        <Input
          label="Average Monthly Requirement"
          placeholder="e.g. 2000 meters"
          error={errors.monthlyRequirement?.message as string}
          {...register('monthlyRequirement')}
        />
      </div>
    </div>
  )
}

export function BuyerPreferencesStep() {
  const { register, formState: { errors } } = useFormContext()
  return (
    <div className="flex flex-col gap-6">
      <div className="flex gap-4 items-start">
        <div className="w-8 h-8 rounded-full bg-[var(--primary)] text-white flex items-center justify-center font-bold text-sm shrink-0">
          AI
        </div>
        <div className="bg-[#F8FAFC] border border-[var(--border)] p-4 rounded-[16px] rounded-tl-none">
          <p className="text-[var(--heading)] font-medium text-[15px]">Got it. What's your typical budget range, and what kind of suppliers do you prefer working with?</p>
        </div>
      </div>
      
      <div className="pl-12 flex flex-col gap-4">
        <Input
          label="Budget Range"
          placeholder="e.g. Below $250/m or $10,000 Total"
          error={errors.budgetRange?.message as string}
          {...register('budgetRange')}
        />
        <Input
          label="Preferred Supplier Type"
          placeholder="e.g. Manufacturer, Wholesaler"
          error={errors.preferredSupplierType?.message as string}
          {...register('preferredSupplierType')}
        />
        <Input
          label="Preferred MOQ"
          placeholder="e.g. Low MOQ (<100m)"
          error={errors.moqPreference?.message as string}
          {...register('moqPreference')}
        />
      </div>
    </div>
  )
}

export function BuyerLocationStep() {
  const { register, formState: { errors } } = useFormContext()
  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-xl font-bold text-text-primary">Location & Contact</h2>
      <p className="text-text-secondary text-sm mb-4">Where are you based?</p>
      
      <Input
        label="Country"
        placeholder="e.g. India, USA"
        error={errors.country?.message as string}
        {...register('country')}
      />
      <Input
        label="City"
        placeholder="e.g. Mumbai, New York"
        error={errors.city?.message as string}
        {...register('city')}
      />
      <Input
        label="Website"
        type="url"
        placeholder="https://..."
        error={errors.website?.message as string}
        {...register('website')}
      />
    </div>
  )
}

export function BuyerReviewStep() {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-xl font-bold text-text-primary">Review Profile</h2>
      <p className="text-text-secondary text-sm mb-4">Your preferences are recorded and ready for AI matching.</p>
      
      <div className="bg-surface-50 p-4 rounded-lg border border-border-color flex flex-col gap-2">
        <p className="text-sm text-text-primary flex justify-between"><span>All steps completed</span> <span className="text-success font-bold">100%</span></p>
        <p className="text-xs text-text-secondary">Click complete to build your personalized marketplace experience.</p>
      </div>
    </div>
  )
}
