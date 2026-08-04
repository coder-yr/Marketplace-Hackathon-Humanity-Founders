import { z } from 'zod'

export const buyerProfileSchema = z.object({
  body: z.object({
    companyName: z.string().optional().or(z.literal('')),
    businessType: z.string().optional(),
    industry: z.string().optional(),
    companySize: z.string().optional(),
    country: z.string().optional(),
    state: z.string().optional(),
    city: z.string().optional(),
    website: z.string().optional().or(z.literal('')),
    phone: z.string().optional(),
    monthlyRequirement: z.string().optional(),
    preferredCategories: z.array(z.string()).optional(),
    preferredFabrics: z.array(z.string()).optional(),
    moqPreference: z.string().optional(),
    budgetRange: z.string().optional(),
    preferredSupplierType: z.string().optional(),
    domesticOrInternational: z.string().optional(),
    buyingFrequency: z.string().optional(),
    preferredPaymentTerms: z.string().optional(),
  }),
})

export const supplierProfileSchema = z.object({
  body: z.object({
    companyName: z.string().optional().or(z.literal('')),
    businessType: z.string().optional(),
    description: z.string().optional(),
    gstNumber: z.string().optional().or(z.literal('')),
    website: z.string().optional().or(z.literal('')),
    phone: z.string().optional(),
    email: z.string().optional().or(z.literal('')),
    socialLinks: z.object({
      linkedin: z.string().optional().or(z.literal('')),
      instagram: z.string().optional().or(z.literal('')),
      twitter: z.string().optional().or(z.literal('')),
    }).optional(),
    logo: z.string().optional().or(z.literal('')),
    banner: z.string().optional().or(z.literal('')),
    factoryAddress: z.string().optional(),
    countriesServed: z.array(z.string()).optional(),
    exportMarkets: z.array(z.string()).optional(),
    businessHours: z.string().optional(),
    categories: z.array(z.string()).optional(),
    productTypes: z.array(z.string()).optional(),
    moq: z.string().optional(),
    productionCapacity: z.string().optional(),
    leadTime: z.string().optional(),
    certifications: z.array(z.string()).optional(),
    factoryPhotos: z.array(z.string()).optional(),
  }),
})

export type BuyerProfileInput = z.infer<typeof buyerProfileSchema>['body']
export type SupplierProfileInput = z.infer<typeof supplierProfileSchema>['body']
