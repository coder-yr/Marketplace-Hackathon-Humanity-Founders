export interface AiResponseEnvelope<T> {
  success: boolean
  cached: boolean
  model: string
  version: string
  duration: number
  data: T
}

export function createAiResponse<T>(
  data: T,
  options: {
    cached: boolean
    model: string
    version: string
    duration: number
  }
): AiResponseEnvelope<T> {
  return {
    success: true,
    ...options,
    data
  }
}
