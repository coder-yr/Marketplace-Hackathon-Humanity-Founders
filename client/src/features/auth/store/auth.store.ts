import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { User, AuthResponse } from '../types/auth.types'
import { api } from '../../../lib/axios'

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  isInitialized: boolean

  // Actions
  setAuth: (response: AuthResponse) => void
  logout: () => void
  initialize: () => Promise<void>
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isInitialized: false,

      setAuth: (response: AuthResponse) => {
        set({
          user: response.user,
          isAuthenticated: true,
        })
      },

      logout: () => {
        set({
          user: null,
          isAuthenticated: false,
        })
      },

      initialize: async () => {
        // Only run initialization once
        const state = get()
        if (state.isInitialized) return

        try {
          const response = await api.get('/auth/me')
          set({ user: response.data.data, isAuthenticated: true, isInitialized: true })
        } catch (error) {
          // If /auth/me fails (e.g. no cookie, or refresh failed), we are not authenticated
          set({ user: null, isAuthenticated: false, isInitialized: true })
        }
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }), // Persist these fields to localStorage
    },
  ),
)
