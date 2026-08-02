// Utils — shared server utilities
// Will include: pagination helpers, response formatters, etc.

export function createSuccessResponse<T>(data: T) {
  return { success: true as const, data }
}

export function createErrorResponse(code: string, message: string, details?: unknown) {
  return {
    success: false as const,
    error: { code, message, ...(details ? { details } : {}) },
  }
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
}
