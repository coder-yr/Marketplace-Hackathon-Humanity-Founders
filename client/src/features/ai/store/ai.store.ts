import { create } from 'zustand'
import { AiChatMessage } from '../types/ai.types'

interface AiState {
  isOpen: boolean
  messages: AiChatMessage[]
  isLoading: boolean
  setIsOpen: (isOpen: boolean) => void
  toggleOpen: () => void
  addMessage: (message: AiChatMessage) => void
  setLoading: (isLoading: boolean) => void
  clearMessages: () => void
}

export const useAiStore = create<AiState>((set) => ({
  isOpen: false,
  messages: [],
  isLoading: false,
  setIsOpen: (isOpen) => set({ isOpen }),
  toggleOpen: () => set((state) => ({ isOpen: !state.isOpen })),
  addMessage: (message) => set((state) => ({ messages: [...state.messages, message] })),
  setLoading: (isLoading) => set({ isLoading }),
  clearMessages: () => set({ messages: [] })
}))
