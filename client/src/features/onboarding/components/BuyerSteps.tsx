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
    <div className="flex flex-col gap-4">
      <h2 className="text-xl font-bold text-text-primary">Industry & Volume</h2>
      <p className="text-text-secondary text-sm mb-4">What industry do you operate in?</p>
      
      <Input
        label="Industry"
        placeholder="e.g. Fashion, Home Textiles, Medical"
        error={errors.industry?.message as string}
        {...register('industry')}
      />
      <Input
        label="Monthly Requirement (Volume)"
        placeholder="e.g. 5000 meters"
        error={errors.monthlyRequirement?.message as string}
        {...register('monthlyRequirement')}
      />
    </div>
  )
}

export function BuyerPreferencesStep() {
  const { register, formState: { errors } } = useFormContext()
  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-xl font-bold text-text-primary">Buying Preferences</h2>
      <p className="text-text-secondary text-sm mb-4">This helps our AI recommend the best suppliers for you.</p>
      
      <Input
        label="Preferred Supplier Type"
        placeholder="e.g. Manufacturer, Wholesaler"
        error={errors.preferredSupplierType?.message as string}
        {...register('preferredSupplierType')}
      />
      <Input
        label="Budget Range"
        placeholder="e.g. $10,000 - $50,000"
        error={errors.budgetRange?.message as string}
        {...register('budgetRange')}
      />
      <Input
        label="Preferred MOQ"
        placeholder="e.g. Low MOQ (<100m)"
        error={errors.moqPreference?.message as string}
        {...register('moqPreference')}
      />
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
