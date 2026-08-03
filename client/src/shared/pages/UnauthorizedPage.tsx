import React from 'react'
import { useNavigate } from 'react-router-dom'
import { ShieldAlert } from 'lucide-react'
import { Container } from '../components/layout/container'
import { Button } from '../components/ui/button'

export const UnauthorizedPage: React.FC = () => {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-surface-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <Container size="sm">
        <div className="flex flex-col items-center justify-center text-center space-y-6">
          <div className="p-4 bg-error-100 rounded-full text-error-600">
            <ShieldAlert size={48} />
          </div>
          
          <div className="space-y-2">
            <h1 className="text-3xl font-extrabold text-content-primary">
              Access Denied
            </h1>
            <p className="text-content-secondary max-w-sm mx-auto">
              You don't have permission to access this page. Please contact support if you believe this is an error.
            </p>
          </div>

          <div className="flex space-x-4">
            <Button onClick={() => navigate(-1)} variant="outline">
              Go Back
            </Button>
            <Button onClick={() => navigate('/dashboard')}>
              Go to Dashboard
            </Button>
          </div>
        </div>
      </Container>
    </div>
  )
}
