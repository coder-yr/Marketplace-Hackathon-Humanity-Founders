import { GoogleGenAI } from '@google/genai'
import { IAiProvider } from './router'

export class GeminiProvider implements IAiProvider {
  name = 'Gemini'
  private ai: GoogleGenAI | null = null

  constructor() {
    const apiKey = process.env.GEMINI_API_KEY
    if (apiKey) {
      this.ai = new GoogleGenAI({ apiKey })
    }
  }

  isAvailable(): boolean {
    return this.ai !== null
  }

  async generateResponse(prompt: string, expectJson = false): Promise<string> {
    if (!this.ai) throw new Error('Gemini API key not configured')

    const response = await this.ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: expectJson ? {
        responseMimeType: 'application/json',
      } : undefined
    })

    return response.text || ''
  }
}
