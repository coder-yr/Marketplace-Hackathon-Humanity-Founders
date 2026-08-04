import { useFormContext, Controller } from 'react-hook-form'
import { Input } from '@/shared/components/ui/input'
import { ImageUpload } from '@/shared/components/ui/image-upload'

export function SupplierBusinessStep() {
  const { register, formState: { errors } } = useFormContext()
  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-xl font-bold text-text-primary">Business Details</h2>
      <p className="text-text-secondary text-sm mb-4">Let's start with the basics of your company.</p>
      
      <Input
        label="Company Name"
        placeholder="Enter your company name"
        error={errors.companyName?.message as string}
        {...register('companyName')}
      />
      <Input
        label="Business Type"
        placeholder="e.g. Manufacturer, Wholesaler"
        error={errors.businessType?.message as string}
        {...register('businessType')}
      />
    </div>
  )
}

export function SupplierGSTStep() {
  const { register, formState: { errors } } = useFormContext()
  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-xl font-bold text-text-primary">Legal & Contact</h2>
      <p className="text-text-secondary text-sm mb-4">Provide your legal information and contact details.</p>
      
      <Input
        label="GST Number"
        placeholder="e.g. 22AAAAA0000A1Z5"
        error={errors.gstNumber?.message as string}
        {...register('gstNumber')}
      />
      <Input
        label="Phone Number"
        type="tel"
        placeholder="+91"
        error={errors.phone?.message as string}
        {...register('phone')}
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

export function SupplierProductionStep() {
  const { register, formState: { errors } } = useFormContext()
  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-xl font-bold text-text-primary">Production Capabilities</h2>
      <p className="text-text-secondary text-sm mb-4">Help buyers understand what you can deliver.</p>
      
      <Input
        label="Minimum Order Quantity (MOQ)"
        placeholder="e.g. 100 meters"
        error={errors.moq?.message as string}
        {...register('moq')}
      />
      <Input
        label="Production Capacity"
        placeholder="e.g. 10000 meters/month"
        error={errors.productionCapacity?.message as string}
        {...register('productionCapacity')}
      />
      <Input
        label="Average Lead Time"
        placeholder="e.g. 14 days"
        error={errors.leadTime?.message as string}
        {...register('leadTime')}
      />
    </div>
  )
}

export function SupplierCategoriesStep() {
  const { register, formState: { errors } } = useFormContext()
  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-xl font-bold text-[var(--heading)]">Categories & Compliance</h2>
      <p className="text-[var(--body)] text-sm mb-4">Enterprise buyers require strict compliance and certification details.</p>
      
      <Input
        label="Categories"
        placeholder="Cotton, Silk, Linen"
        error={errors.categories?.message as string}
        {...register('categories')}
      />
      <Input
        label="Product Types"
        placeholder="Yarn, Fabric, Garments"
        error={errors.productTypes?.message as string}
        {...register('productTypes')}
      />
      <Input
        label="Certifications (Mandatory)"
        placeholder="e.g. ISO 9001, GOTS, Oeko-Tex"
        error={errors.certifications?.message as string}
        {...register('certifications')}
        required
      />
    </div>
  )
}

export function SupplierBrandingStep() {
  const { register, control, formState: { errors } } = useFormContext()
  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-xl font-bold text-text-primary">Branding & Identity</h2>
      <p className="text-text-secondary text-sm mb-4">Make your profile stand out to buyers.</p>
      
      <Input
        label="Description"
        placeholder="Tell buyers about your company..."
        error={errors.description?.message as string}
        {...register('description')}
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
        <Controller
          name="logo"
          control={control}
          render={({ field: { onChange, value } }) => (
            <ImageUpload
              label="Company Logo"
              value={value}
              onChange={onChange}
              error={errors.logo?.message as string}
            />
          )}
        />
        <Controller
          name="banner"
          control={control}
          render={({ field: { onChange, value } }) => (
            <ImageUpload
              label="Store Banner"
              value={value}
              onChange={onChange}
              error={errors.banner?.message as string}
            />
          )}
        />
      </div>

      <div className="mt-4 pt-4 border-t border-[var(--border)]">
        <Controller
          name="factoryPhotos"
          control={control}
          render={({ field: { onChange, value } }) => (
            <ImageUpload
              label="Factory Photos (Mandatory for Enterprise)"
              value={Array.isArray(value) ? value[0] : value}
              onChange={(url) => onChange([url])}
              error={errors.factoryPhotos?.message as string}
            />
          )}
        />
      </div>
    </div>
  )
}

export function SupplierReviewStep() {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-xl font-bold text-text-primary">Review Profile</h2>
      <p className="text-text-secondary text-sm mb-4">Almost there! Review your details before completing.</p>
      
      <div className="bg-surface-50 p-4 rounded-lg border border-border-color flex flex-col gap-2">
        <p className="text-sm text-text-primary flex justify-between"><span>All steps completed</span> <span className="text-success font-bold">100%</span></p>
        <p className="text-xs text-text-secondary">Your profile looks great and is ready to be published to the marketplace.</p>
      </div>
    </div>
  )
}
