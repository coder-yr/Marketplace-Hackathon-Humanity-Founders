import { useState, useRef, useCallback } from 'react'
import { api } from '@/lib/axios'

export interface AiTaskOptions {
  endpoint: string
  payload: any
  onSuccess?: (data: any) => void
  onError?: (err: Error) => void
}

export function useAiTask() {
  const [isThinking, setIsThinking] = useState(false)
  const [progress, setProgress] = useState(0)
  const [step, setStep] = useState('Initializing...')
  const abortControllerRef = useRef<AbortController | null>(null)
  const progressIntervalRef = useRef<any>(null)

  const steps = [
    { threshold: 5, label: 'Connecting to AI Matrix...' },
    { threshold: 18, label: 'Reading specifications...' },
    { threshold: 35, label: 'Cross-referencing global databases...' },
    { threshold: 60, label: 'Benchmarking pricing and lead times...' },
    { threshold: 82, label: 'Analyzing market risks...' },
    { threshold: 92, label: 'Generating insights...' },
  ]

  const runAiTask = useCallback(async (options: AiTaskOptions) => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort()
    }
    abortControllerRef.current = new AbortController()

    setIsThinking(true)
    setProgress(0)
    setStep(steps[0].label)

    let currentProgress = 0
    progressIntervalRef.current = setInterval(() => {
      if (currentProgress < 92) {
        // Slow down as it gets closer to 92
        const increment = currentProgress > 80 ? 1 : currentProgress > 50 ? 3 : 5
        currentProgress += increment
        setProgress(currentProgress)
        
        const activeStep = [...steps].reverse().find(s => currentProgress >= s.threshold)
        if (activeStep) setStep(activeStep.label)
      }
    }, 200)

    try {
      const response = await api.post(options.endpoint, options.payload, {
        signal: abortControllerRef.current.signal
      })

      const json = response.data
      
      // Assuming our AI endpoints return standard envelope, although api already unwraps response.data
      // If the backend returns { success: false } in a 200 response
      if (json.success === false) {
        throw new Error(json.error || 'AI Task failed')
      }

      setProgress(100)
      setStep('Complete!')
      
      setTimeout(() => {
        setIsThinking(false)
        if (options.onSuccess) options.onSuccess(json.data)
      }, 500)

    } catch (error: any) {
      if (error.name !== 'AbortError') {
        setIsThinking(false)
        if (options.onError) options.onError(error)
      }
    } finally {
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current)
      }
    }
  }, [])

  return { runAiTask, isThinking, progress, step }
}
