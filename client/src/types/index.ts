// Shared TypeScript types

export interface ApiResponse<T> {
  success: true
  data: T
}

export interface ApiError {
  success: false
  error: {
    code: string
    message: string
    details?: Array<{
      field: string
      message: string
    }>
  }
}

export interface PaginatedResponse<T> {
  data: T[]
  pagination: {
    page: number
    limit: number
    total: number
    pages: number
  }
}

export interface Category {
  _id: string
  name: string
  slug: string
  description: string
  createdAt: string
  updatedAt: string
}

export interface HealthResponse {
  status: 'ok' | 'error'
  timestamp: string
  version: string
  environment: string
}
