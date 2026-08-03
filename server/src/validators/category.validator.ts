import { z } from 'zod'

export const createCategorySchema = z.object({
  body: z.object({
    name: z.string().min(2, 'Name must be at least 2 characters').max(100),
    description: z.string().min(5).max(500),
    imageUrl: z.string().url().optional(),
    icon: z.string().optional(),
    parentCategory: z.string().optional(),
    featured: z.boolean().optional().default(false),
    sortOrder: z.number().optional().default(0),
  }),
})

export const categoryQuerySchema = z.object({
  query: z.object({
    featured: z.string().optional().transform((val) => (val === 'true' ? true : undefined)),
    limit: z.string().optional().transform((val) => (val ? Number(val) : undefined)),
  }),
})

export type CreateCategoryInput = z.infer<typeof createCategorySchema>['body']
export type CategoryQueryInput = z.infer<typeof categoryQuerySchema>['query']
