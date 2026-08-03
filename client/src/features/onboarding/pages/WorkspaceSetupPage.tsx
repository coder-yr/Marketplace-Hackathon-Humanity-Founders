import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Spinner } from '@/shared/components/feedback/spinner'

export function WorkspaceSetupPage() {
  const navigate = useNavigate()

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/dashboard', { replace: true })
    }, 3000)
    return () => clearTimeout(timer)
  }, [navigate])

  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-surface-50 p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center flex flex-col items-center max-w-md w-full bg-white p-8 rounded-2xl shadow-sm border border-border-color"
      >
        <span className="text-4xl mb-4">🎉</span>
        <h1 className="text-2xl font-bold text-text-primary mb-2">Welcome to the Marketplace!</h1>
        <p className="text-text-secondary mb-8">Your workspace is being prepared...</p>
        
        <div className="flex flex-col gap-4 text-left w-full mb-8">
          <div className="flex items-center gap-3 text-text-primary">
            <div className="w-6 h-6 rounded-full bg-success/10 text-success flex items-center justify-center">✓</div>
            <span>Creating your profile</span>
          </div>
          <div className="flex items-center gap-3 text-text-primary">
            <div className="w-6 h-6 rounded-full bg-success/10 text-success flex items-center justify-center">✓</div>
            <span>Configuring preferences</span>
          </div>
          <div className="flex items-center gap-3 text-text-primary">
            <div className="w-6 h-6 rounded-full bg-success/10 text-success flex items-center justify-center">✓</div>
            <span>Personalizing recommendations</span>
          </div>
        </div>

        <div className="flex items-center justify-center gap-2 text-text-secondary text-sm">
          <Spinner size="sm" />
          <span>Redirecting...</span>
        </div>
      </motion.div>
    </div>
  )
}
