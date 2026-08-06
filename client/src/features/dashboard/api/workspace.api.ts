import { api } from '@/lib/axios'
import { WorkspaceResponse } from '../types/workspace.types'

export const workspaceApi = {
  getWorkspace: async (): Promise<WorkspaceResponse> => {
    const response = await api.get('/workspace')
    return response.data.data
  },
}
