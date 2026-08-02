// App-wide constants

export const APP_NAME = 'TextileHub'
export const APP_VERSION = '0.1.0'

export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:5000/api'

// Pagination
export const DEFAULT_PAGE_SIZE = 20
export const MAX_PAGE_SIZE = 100

// File upload
export const MAX_FILE_SIZE_MB = 5
export const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024
export const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp']

// Query keys — single source of truth for TanStack Query
export const QUERY_KEYS = {
  categories: ['categories'] as const,
  products: (params?: Record<string, unknown>) =>
    params ? ['products', params] : ['products'],
  product: (id: string) => ['products', id] as const,
  health: ['health'] as const,
} as const
