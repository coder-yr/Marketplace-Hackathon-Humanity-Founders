import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../../auth/store/auth.store'
import { Container } from '../../../shared/components/layout/container'
import { Button } from '../../../shared/components/ui/button'
import { Card } from '../../../shared/components/ui/card'
import { authApi } from '../../auth/api/auth.api'
import { onboardingApi } from '../../onboarding/api/onboarding.api'
import { toast } from 'sonner'
import { motion } from 'framer-motion'
import { AiSupplierRecommendations } from '@/features/ai/components/AiSupplierRecommendations'

function QuickStartCard({ user, profile }: { user: any, profile: any }) {
  if (!profile) return null

  const isBuyer = user.role === 'buyer'
  
  let personalizedMessage = ''
  let callToAction = ''
  
  if (isBuyer) {
    const fabric = profile.preferredFabrics?.[0] || 'textile'
    const moq = profile.moqPreference || 'suitable'
    personalizedMessage = `Welcome, ${user.fullName}! Based on your profile, we'll prioritize ${fabric} suppliers with ${moq} MOQs.`
    callToAction = 'Browse Products'
  } else {
    personalizedMessage = `Welcome! Your textile business profile is ready. Next, let's add your first product to start receiving buyer interest.`
    callToAction = 'Add Your First Product'
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="p-8 mb-8 border-brand-primary/20 bg-brand-primary/5">
        <h2 className="text-2xl font-bold text-text-primary mb-3">
          Quick Start
        </h2>
        <p className="text-text-secondary mb-6 text-lg">
          {personalizedMessage}
        </p>
        <Button size="lg">{callToAction}</Button>
      </Card>
    </motion.div>
  )
}

export function PlaceholderRolePage() {
  const { user, logout } = useAuthStore()
  const navigate = useNavigate()
  const [profile, setProfile] = useState<any>(null)

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await onboardingApi.getMyProfile()
        if (res.data) setProfile(res.data)
      } catch (err) {
        console.error('Failed to load profile', err)
      }
    }
    fetchProfile()
  }, [])

  const handleLogout = async () => {
    try {
      await authApi.logout()
    } catch (error) {
      console.error('Logout error', error)
    } finally {
      logout()
      toast.success('Logged out successfully')
      navigate('/login')
    }
  }

  return (
    <div className="min-h-screen bg-surface-50 py-12">
      <Container>
        <div className="flex justify-between items-start mb-8 max-w-4xl mx-auto">
          <div>
            <h1 className="text-3xl font-bold text-text-primary mb-2">
              Dashboard
            </h1>
            <p className="text-text-secondary">
              You are logged in as a <span className="font-semibold capitalize">{user?.role}</span>
            </p>
          </div>
          <Button variant="outline" onClick={handleLogout}>
            Logout
          </Button>
        </div>

        <div className="max-w-4xl mx-auto">
          {profile && <QuickStartCard user={user} profile={profile} />}
          
          {user?.role === 'buyer' && <AiSupplierRecommendations />}

          <Card className="p-8 text-center bg-surface-1 border-dashed">
            <h2 className="text-xl font-semibold mb-2 text-text-primary">
              Full Dashboard Coming Soon
            </h2>
            <p className="text-text-secondary">
              The complete marketplace features are being built in Phase 3.
            </p>
          </Card>
        </div>
      </Container>
    </div>
  )
}
