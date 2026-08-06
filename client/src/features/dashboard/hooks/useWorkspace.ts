import { useEffect } from 'react'
import { useWorkspaceStore } from '../store/workspace.store'

export function useWorkspace() {
  const { data, isLoading, error, fetchWorkspace } = useWorkspaceStore()

  useEffect(() => {
    fetchWorkspace()
  }, [fetchWorkspace])

  return {
    workspace: data,
    isLoading,
    error,
    refresh: () => fetchWorkspace(true)
  }
}
