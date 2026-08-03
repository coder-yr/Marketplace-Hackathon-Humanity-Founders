import { z } from 'zod'

export const createProductSchema = z.object({
  body: z.object({
    title: z.string().min(3, 'Title must be at least 3 characters').max(200),
    shortDescription: z.string().min(10).max(300),
    description: z.string().min(20),
    category: z.string().min(1, 'Category ID is required'),
    subCategory: z.string().optional(),
    fabricType: z.string().min(2, 'Fabric type is required'),
    images: z.array(z.string().url('Invalid image URL')).min(1, 'At least one image is required'),
    priceRange: z.object({
      min: z.number().min(0),
      max: z.number().min(0),
      currency: z.string().default('USD'),
      unit: z.string().default('meter'),
    }),
    moq: z.object({
      value: z.number().min(1),
      unit: z.string().default('meters'),
    }),
    leadTime: z.string().min(1),
    stockStatus: z.enum(['in_stock', 'made_to_order', 'out_of_stock']).default('made_to_order'),
    certifications: z.array(z.string()).optional().default([]),
    tags: z.array(z.string()).optional().default([]),
    specifications: z.record(z.string(), z.string()).optional().default({}),
    featured: z.boolean().optional().default(false),
    published: z.boolean().optional().default(true),
  }),
})

export const updateProductSchema = z.object({
  params: z.object({
    id: z.string().min(1),
  }),
  body: createProductSchema.shape.body.partial(),
})

export const productQuerySchema = z.object({
  query: z.object({
    search: z.string().optional(),
    category: z.string().optional(),
    fabricType: z.string().optional(),
    maxMoq: z.string().optional().transform((val) => (val ? Number(val) : undefined)),
    minPrice: z.string().optional().transform((val) => (val ? Number(val) : undefined)),
    maxPrice: z.string().optional().transform((val) => (val ? Number(val) : undefined)),
    stockStatus: z.string().optional(),
    featured: z.string().optional().transform((val) => (val === 'true' ? true : val === 'false' ? false : undefined)),
    sort: z.enum(['newest', 'price_asc', 'price_desc', 'moq_asc', 'title_asc']).optional().default('newest'),
    page: z.string().optional().transform((val) => (val ? Math.max(1, Number(val)) : 1)),
    limit: z.string().optional().transform((val) => (val ? Math.min(50, Math.max(1, Number(val))) : 12)),
  }),
})

export type CreateProductInput = z.infer<typeof createProductSchema>['body']
export type UpdateProductInput = z.infer<typeof updateProductSchema>['body']
export type ProductQueryInput = z.infer<typeof productQuerySchema>['query']
