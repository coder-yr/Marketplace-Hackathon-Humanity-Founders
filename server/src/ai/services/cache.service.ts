import crypto from 'crypto'
import { AiCache } from '../../models/ai-cache.model'
import { logger } from '../../config/logger'

export class CacheService {
  /**
   * Generates a stable SHA-256 hash for a given prompt string.
   */
  hash(prompt: string): string {
    return crypto.createHash('sha256').update(prompt).digest('hex')
  }

  /**
   * Retrieves a cached AI response by prompt hash.
   * Returns null on miss or error.
   */
  async get(promptHash: string): Promise<string | null> {
    try {
      const cached = await AiCache.findOne({ promptHash }).lean()
      if (cached) {
        logger.info(`AI cache HIT [hash=${promptHash.slice(0, 8)}...]`)
        return cached.response
      }
      return null
    } catch (e: any) {
      logger.warn(`AI cache read error: ${e.message}`)
      return null
    }
  }

  /**
   * Stores an AI response in the cache with a 24h TTL.
   */
  async set(
    promptHash: string,
    response: string,
    aiModel: string,
    endpoint: string,
  ): Promise<void> {
    try {
      await AiCache.findOneAndUpdate(
        { promptHash },
        { promptHash, response, aiModel, endpoint, createdAt: new Date() },
        { upsert: true, new: true },
      )
      logger.info(`AI cache SET [hash=${promptHash.slice(0, 8)}..., endpoint=${endpoint}]`)
    } catch (e: any) {
      // Non-fatal — cache misses are acceptable
      logger.warn(`AI cache write error: ${e.message}`)
    }
  }
}

export const cacheService = new CacheService()
