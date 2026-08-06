import { OpenRouterProvider } from '../providers/openrouter.provider'
import { CostGuard } from '../config/ai-budget'
import { logger } from '../config/logger'

export class ModelRouter {
  private provider = new OpenRouterProvider()

  async generate(prompt: string, preferredModel: string, expectJson = true): Promise<{ text: string, model: string }> {
    let modelsToTry = [preferredModel]

    if (await CostGuard.isBudgetExceeded()) {
      logger.warn('AI Budget exceeded. Forcing fallback to cheaper models.')
      modelsToTry = ['google/gemini-2.5-flash'] // enforce cheap model
    } else {
      // standard fallback chain
      if (preferredModel !== 'google/gemini-2.5-flash') {
        modelsToTry.push('google/gemini-2.5-flash')
      }
      modelsToTry.push('anthropic/claude-3.5-sonnet')
    }

    for (const model of modelsToTry) {
      try {
        const text = await this.provider.generateWithModel(prompt, model, expectJson)
        return { text, model }
      } catch (error: any) {
        logger.warn(`ModelRouter: ${model} failed, attempting next fallback. Error: ${error.message}`)
      }
    }

    throw new Error('All AI models in fallback chain failed.')
  }
}

export const modelRouter = new ModelRouter()
