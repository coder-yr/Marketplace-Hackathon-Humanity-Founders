import { logger } from '../config/logger'
import { OpenRouterProvider } from './openrouter.provider'
import { GeminiProvider } from './gemini.provider'
import { OllamaProvider } from './ollama.provider'

export interface IAiProvider {
  name: string
  isAvailable(): boolean
  generateResponse(prompt: string, expectJson?: boolean): Promise<string>
}

export class ProviderRouter {
  private providers: IAiProvider[] = []
  private openRouter: OpenRouterProvider

  constructor() {
    this.openRouter = new OpenRouterProvider()

    // Priority: OpenRouter → Gemini → Ollama
    this.providers.push(this.openRouter)
    this.providers.push(new GeminiProvider())
    this.providers.push(new OllamaProvider())
  }

  /**
   * Routes prompt to the first available provider (backward-compatible).
   */
  async route(
    prompt: string,
    expectJson = false,
  ): Promise<{ text: string; provider: string }> {
    for (const provider of this.providers) {
      if (provider.isAvailable()) {
        try {
          const text = await provider.generateResponse(prompt, expectJson)
          return { text, provider: provider.name }
        } catch (error: any) {
          logger.warn(
            `Provider ${provider.name} failed. Falling back: ${error.message}`,
          )
        }
      }
    }

    logger.error('All AI providers failed or are unavailable.')
    return {
      text: expectJson
        ? JSON.stringify({ error: 'AI temporarily unavailable.' })
        : 'AI is temporarily unavailable. Standard features remain active.',
      provider: 'fallback',
    }
  }

  /**
   * Routes to a specific model via OpenRouter with Gemini fallback.
   * Used by AIService for smart model routing.
   */
  async routeWithModel(
    prompt: string,
    model: string,
    expectJson = false,
  ): Promise<{ text: string; provider: string; model: string }> {
    // Prefer OpenRouter for model-specific routing
    if (this.openRouter.isAvailable()) {
      try {
        const text = await this.openRouter.generateWithModel(
          prompt,
          model,
          expectJson,
        )
        return { text, provider: 'OpenRouter', model }
      } catch (error: any) {
        logger.warn(
          `OpenRouter failed for model ${model}, falling back: ${error.message}`,
        )
      }
    }

    // Fallback to default routing
    const result = await this.route(prompt, expectJson)
    return { ...result, model: 'fallback' }
  }
}

export const aiRouter = new ProviderRouter()
