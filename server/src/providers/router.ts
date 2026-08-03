export interface IAiProvider {
  name: string
  isAvailable(): boolean
  generateResponse(prompt: string, expectJson?: boolean): Promise<string>
}

import { GeminiProvider } from './gemini.provider'
import { OllamaProvider } from './ollama.provider'
import { logger } from '../config/logger'

export class ProviderRouter {
  private providers: IAiProvider[] = []

  constructor() {
    // Priority order: Gemini first, then local Ollama
    this.providers.push(new GeminiProvider())
    this.providers.push(new OllamaProvider())
  }

  /**
   * Routes the prompt to the first available provider.
   */
  async route(prompt: string, expectJson = false): Promise<{ text: string; provider: string }> {
    for (const provider of this.providers) {
      if (provider.isAvailable()) {
        try {
          const text = await provider.generateResponse(prompt, expectJson)
          return { text, provider: provider.name }
        } catch (error: any) {
          logger.warn(`Provider ${provider.name} failed. Falling back to next provider: ${error.message}`)
        }
      }
    }

    // Fallback: Rule-based or static response if all providers fail
    logger.error('All AI providers failed or are unavailable.')
    return {
      text: expectJson 
        ? JSON.stringify({ error: "AI temporarily unavailable." }) 
        : "AI is temporarily unavailable. Standard features remain active.",
      provider: 'fallback'
    }
  }
}

export const aiRouter = new ProviderRouter()
