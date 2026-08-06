import { z } from 'zod'

const productCore = z.object({
  title: z.string(),
  shortDescription: z.string(),
  description: z.string(),
  category: z.string(),
  subCategory: z.string().optional(),
  fabricType: z.string(),
  images: z.array(z.string()),
  priceRange: z.object({
    min: z.number(),
    max: z.number(),
    currency: z.string().default('USD'),
    unit: z.string().default('meter'),
  }),
  moq: z.object({
    value: z.number(),
    unit: z.string().default('meters'),
  }),
  leadTime: z.string(),
  stockStatus: z.enum(['in_stock', 'made_to_order', 'out_of_stock']).default('made_to_order'),
  variants: z.array(z.object({
    color: z.string(),
    image: z.string().optional(),
    stock: z.number().default(0)
  })).optional().default([]),
  certifications: z.array(z.string()).optional().default([]),
  tags: z.array(z.string()).optional().default([]),
  specifications: z.record(z.string(), z.string()).optional().default({}),
  featured: z.boolean().optional().default(false),
  published: z.boolean().optional().default(false),
})

export const createProductSchema = z.object({
  body: productCore.partial().extend({
    title: z.string(),
    status: z.enum(['active', 'draft', 'ready_for_review', 'archived', 'rejected']).default('draft')
  }),
})

export const updateProductSchema = z.object({
  params: z.object({
    id: z.string().min(1),
  }),
  body: productCore.partial().extend({
    status: z.enum(['active', 'draft', 'ready_for_review', 'archived', 'rejected']).optional()
  }),
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
