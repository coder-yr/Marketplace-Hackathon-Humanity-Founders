import { useEffect } from 'react'
import { useWorkspaceStore } from '../store/workspace.store'

export function useWorkspace(pollIntervalMs?: number) {
  const { data, isLoading, error, fetchWorkspace } = useWorkspaceStore()

  useEffect(() => {
    fetchWorkspace()

    let intervalId: ReturnType<typeof setInterval>
    if (pollIntervalMs) {
      intervalId = setInterval(() => {
        fetchWorkspace(true, true) // Force fetch, but do it silently (no loading flicker)
      }, pollIntervalMs)
    }

    return () => {
      if (intervalId) clearInterval(intervalId)
    }
  }, [fetchWorkspace, pollIntervalMs])

  return {
    workspace: data,
    isLoading,
    error,
    refresh: () => fetchWorkspace(true)
  }
}
