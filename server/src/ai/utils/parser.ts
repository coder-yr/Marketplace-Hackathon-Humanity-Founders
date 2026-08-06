import { logger } from '../../config/logger'

/**
 * Safely parses a JSON string returned from the AI.
 * Handles markdown code fences and BOM characters.
 * Returns the fallback value if parsing fails.
 */
export function parseJsonSafe<T>(text: string, fallback: T): T {
  try {
    // Strip markdown code fences (```json ... ```)
    const cleaned = text
      .replace(/^```(?:json)?\s*/i, '')
      .replace(/\s*```\s*$/i, '')
      .trim()

    return JSON.parse(cleaned) as T
  } catch (e: any) {
    logger.warn(`AI JSON parse failed: ${e.message}. Raw: ${text.slice(0, 200)}`)
    return fallback
  }
}

/**
 * Strips markdown formatting from AI text responses.
 * Used when the endpoint should return plain text.
 */
export function stripMarkdown(text: string): string {
  return text
    .replace(/^#+\s*/gm, '') // Headers
    .replace(/\*\*(.*?)\*\*/g, '$1') // Bold
    .replace(/\*(.*?)\*/g, '$1') // Italic
    .replace(/`{1,3}[^`]*`{1,3}/g, '') // Code
    .replace(/^[-*+]\s+/gm, '') // List items
    .replace(/\n{3,}/g, '\n\n') // Excess newlines
    .trim()
}

/**
 * Cleans the AI response text before parsing:
 * removes code fences, BOM, extra whitespace.
 */
export function cleanAiResponse(text: string): string {
  return text
    .replace(/^\uFEFF/, '') // BOM
    .replace(/^```(?:json)?\s*/i, '')
    .replace(/\s*```\s*$/i, '')
    .trim()
}
