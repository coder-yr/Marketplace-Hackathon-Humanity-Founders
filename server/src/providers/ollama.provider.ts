import axios from 'axios'
import { IAiProvider } from './router'

export class OllamaProvider implements IAiProvider {
  name = 'Ollama'
  private baseUrl: string

  constructor() {
    this.baseUrl = process.env.OLLAMA_URL || 'http://localhost:11434'
  }

  // To truly check availability, we would ping the server.
  // For simplicity in this synchronous check, we assume it's available if OLLAMA_ENABLED is true.
  isAvailable(): boolean {
    return process.env.OLLAMA_ENABLED === 'true'
  }

  async generateResponse(prompt: string, expectJson = false): Promise<string> {
    try {
      const response = await axios.post(`${this.baseUrl}/api/generate`, {
        model: 'llama3', // or 'mistral', depending on local setup
        prompt: prompt,
        stream: false,
        format: expectJson ? 'json' : undefined
      })

      return response.data.response || ''
    } catch (error) {
      throw new Error('Ollama generation failed')
    }
  }
}
