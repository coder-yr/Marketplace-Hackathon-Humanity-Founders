import { z } from 'zod'

export const buyerProfileSchema = z.object({
  body: z.object({
    companyName: z.string().min(2, 'Company name is required'),
    businessType: z.string().optional(),
    industry: z.string().optional(),
    companySize: z.string().optional(),
    country: z.string().optional(),
    state: z.string().optional(),
    city: z.string().optional(),
    website: z.string().url('Invalid website URL').optional().or(z.literal('')),
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
    companyName: z.string().min(2, 'Company name is required'),
    businessType: z.string().optional(),
    description: z.string().optional(),
    gstNumber: z.string().regex(/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/, 'Invalid GST format').optional().or(z.literal('')),
    website: z.string().url('Invalid website URL').optional().or(z.literal('')),
    phone: z.string().optional(),
    email: z.string().email('Invalid email').optional().or(z.literal('')),
    socialLinks: z.object({
      linkedin: z.string().url().optional().or(z.literal('')),
      instagram: z.string().url().optional().or(z.literal('')),
      twitter: z.string().url().optional().or(z.literal('')),
    }).optional(),
    logo: z.string().url().optional().or(z.literal('')),
    banner: z.string().url().optional().or(z.literal('')),
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
  }),
})

export type BuyerProfileInput = z.infer<typeof buyerProfileSchema>['body']
export type SupplierProfileInput = z.infer<typeof supplierProfileSchema>['body']
