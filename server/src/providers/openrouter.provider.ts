import axios from 'axios'
import { IAiProvider } from './router'
import { env } from '../config/env'
import { logger } from '../config/logger'

const OPENROUTER_HEADERS = {
  'HTTP-Referer': 'https://textilehub.io',
  'X-Title': 'TextileHub Enterprise Procurement OS',
  'Content-Type': 'application/json',
}

export interface OpenRouterMessage {
  role: 'system' | 'user' | 'assistant'
  content: string
}

export class OpenRouterProvider implements IAiProvider {
  name = 'OpenRouter'
  private apiKey: string | undefined
  private baseUrl: string

  constructor() {
    this.apiKey = env.OPENROUTER_API_KEY
    this.baseUrl = env.OPENROUTER_BASE_URL
  }

  isAvailable(): boolean {
    return Boolean(this.apiKey && this.apiKey.trim().length > 0)
  }

  /**
   * Single-turn generation. Wraps prompt in a user message.
   */
  async generateResponse(prompt: string, expectJson = false): Promise<string> {
    return this.chat(
      [{ role: 'user', content: prompt }],
      env.OPENROUTER_DEFAULT_MODEL,
      expectJson,
    )
  }

  /**
   * Multi-turn generation with explicit model selection.
   * Called by AIService for smart model routing.
   */
  async generateWithModel(
    prompt: string,
    model: string,
    expectJson = false,
  ): Promise<string> {
    return this.chat([{ role: 'user', content: prompt }], model, expectJson)
  }

  /**
   * Core chat completion call against OpenRouter API.
   */
  async chat(
    messages: OpenRouterMessage[],
    model?: string,
    expectJson = false,
  ): Promise<string> {
    if (!this.apiKey) throw new Error('OpenRouter API key not configured')

    const resolvedModel = model || env.OPENROUTER_DEFAULT_MODEL

    const payload: Record<string, any> = {
      model: resolvedModel,
      messages,
      max_tokens: 2048,
    }

    if (expectJson) {
      payload.response_format = { type: 'json_object' }
    }

    try {
      const response = await axios.post(
        `${this.baseUrl}/chat/completions`,
        payload,
        {
          headers: {
            ...OPENROUTER_HEADERS,
            Authorization: `Bearer ${this.apiKey}`,
          },
          timeout: 30_000,
        },
      )

      const content = response.data?.choices?.[0]?.message?.content
      if (!content) throw new Error('Empty response from OpenRouter')
      return content as string
    } catch (error: any) {
      const msg = error.response?.data?.error?.message || error.message
      logger.error(`OpenRouter error [model=${resolvedModel}]: ${msg}`)
      throw new Error(`OpenRouter generation failed: ${msg}`)
    }
  }
}
