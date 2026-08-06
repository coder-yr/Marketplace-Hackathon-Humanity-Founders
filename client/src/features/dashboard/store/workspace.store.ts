import { create } from 'zustand'
import { WorkspaceResponse } from '../types/workspace.types'
import { workspaceApi } from '../api/workspace.api'

interface WorkspaceState {
  data: WorkspaceResponse | null
  isLoading: boolean
  error: string | null
  lastFetched: number | null

  fetchWorkspace: (force?: boolean) => Promise<void>
  clearWorkspace: () => void
}

const CACHE_TTL = 5 * 60 * 1000 // 5 minutes

export const useWorkspaceStore = create<WorkspaceState>((set, get) => ({
  data: null,
  isLoading: false,
  error: null,
  lastFetched: null,

  fetchWorkspace: async (force = false) => {
    const { data, lastFetched, isLoading } = get()
    
    if (isLoading) return
    
    // Return cached data if within TTL
    if (!force && data && lastFetched && Date.now() - lastFetched < CACHE_TTL) {
      return
    }

    set({ isLoading: true, error: null })
    try {
      const response = await workspaceApi.getWorkspace()
      set({ 
        data: response, 
        isLoading: false, 
        lastFetched: Date.now() 
      })
    } catch (error: any) {
      set({ 
        error: error.response?.data?.message || 'Failed to fetch workspace', 
        isLoading: false 
      })
    }
  },

  clearWorkspace: () => {
    set({ data: null, lastFetched: null, error: null })
  }
}))
