import { useState, useCallback, useEffect } from 'react'

/**
 * Persists state to localStorage with JSON serialization.
 * Falls back gracefully if localStorage is unavailable.
 */
export function useLocalStorage<T>(
  key: string,
  initialValue: T,
): [T, (value: T | ((prev: T) => T)) => void, () => void] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key)
      return item ? (JSON.parse(item) as T) : initialValue
    } catch {
      return initialValue
    }
  })

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue))
    } catch {
      // Ignore localStorage errors (private mode, storage full, etc.)
    }
  }, [key, storedValue])

  const setValue = useCallback(
    (value: T | ((prev: T) => T)) => {
      setStoredValue((prev) =>
        typeof value === 'function' ? (value as (prev: T) => T)(prev) : value,
      )
    },
    [],
  )

  const removeValue = useCallback(() => {
    try {
      window.localStorage.removeItem(key)
      setStoredValue(initialValue)
    } catch {
      // Ignore
    }
  }, [key, initialValue])

  return [storedValue, setValue, removeValue]
}
