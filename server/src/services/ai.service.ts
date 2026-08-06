import crypto from 'crypto'
import { modelRouter } from './model-router.service'
import { AiCache } from '../models/ai-cache.model'
import { AiLog } from '../models/ai-log.model'
import { createAiResponse, AiResponseEnvelope } from '../utils/ai-response'
import { logger } from '../config/logger'
import { z } from 'zod'

export class AiService {
  /**
   * Core orchestrator method: Checks cache -> Calls ModelRouter -> Parses JSON -> Retries on fail -> Logs
   */
  async executeTask<T>(
    promptDetails: { systemPrompt: string; userPrompt: string; prompt: string },
    preferredModel: string,
    schema: z.ZodType<T>,
    version: string,
    user?: string
  ): Promise<AiResponseEnvelope<T>> {
    const startTime = Date.now()
    
    // Hash key: model + prompt + temperature(0) + schemaVersion
    const hashPayload = preferredModel + promptDetails.prompt + '0' + version
    const promptHash = crypto.createHash('sha256').update(hashPayload).digest('hex')

    // 1. Check Cache
    const cachedEntry = await AiCache.findOne({ promptHash })
    if (cachedEntry) {
      try {
        const parsed = JSON.parse(cachedEntry.response)
        // Log cache hit
        await AiLog.create({
          user,
          endpoint: version,
          modelUsed: cachedEntry.aiModel,
          tokens: 0,
          latency: Date.now() - startTime,
          cached: true,
          cost: 0
        })
        return createAiResponse<T>(parsed, { cached: true, model: cachedEntry.aiModel, version, duration: Date.now() - startTime })
      } catch (err) {
        logger.warn(`Failed to parse cached JSON for ${promptHash}. Regenerating.`)
      }
    }

    // 2. Call LLM with 1 retry on JSON parse failure
    let attempt = 0
    let lastError: any = null
    while (attempt < 2) {
      try {
        const { text, model: actualModel } = await modelRouter.generate(promptDetails.prompt, preferredModel, true)
        
        // Parse & Validate Zod Schema
        const parsedJson = JSON.parse(text)
        const validatedData = schema.parse(parsedJson)

        // Cache Success
        await AiCache.create({
          promptHash,
          response: JSON.stringify(validatedData),
          aiModel: actualModel,
          endpoint: version
        })

        // Log Success
        await AiLog.create({
          user,
          endpoint: version,
          modelUsed: actualModel,
          tokens: text.length / 4, // rough estimate
          latency: Date.now() - startTime,
          cached: false,
          cost: (text.length / 4) * 0.000001 // rough mock cost
        })

        return createAiResponse<T>(validatedData, { cached: false, model: actualModel, version, duration: Date.now() - startTime })
      } catch (error: any) {
        lastError = error
        attempt++
        logger.warn(`AI Task ${version} attempt ${attempt} failed: ${error.message}`)
      }
    }

    throw new Error(`AI Task failed after 2 attempts. Last error: ${lastError?.message}`)
  }
}

export const aiService = new AiService()
