import React from 'react'
import { useNavigate } from 'react-router-dom'
import { User, Store } from 'lucide-react'
import { Container } from '../../../shared/components/layout/container'
import { Card } from '../../../shared/components/ui/card'

export const ChooseRolePage: React.FC = () => {
  const navigate = useNavigate()

  const handleRoleSelection = (role: 'buyer' | 'supplier') => {
    navigate(`/register?role=${role}`)
  }

  return (
    <div className="min-h-screen bg-surface-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <Container size="sm">
        <div className="sm:mx-auto sm:w-full sm:max-w-md text-center mb-8">
          <h2 className="text-3xl font-extrabold text-content-primary">
            Join the Marketplace
          </h2>
          <p className="mt-2 text-sm text-content-secondary">
            How would you like to use our platform?
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {/* Buyer Card */}
          <Card
            className="flex flex-col items-center justify-center p-8 border-2 border-transparent hover:border-primary-500 transition-colors cursor-pointer"
            onClick={() => handleRoleSelection('buyer')}
          >
            <div className="h-16 w-16 rounded-full bg-primary-100 flex items-center justify-center mb-4 text-primary-600">
              <User size={32} />
            </div>
            <h3 className="text-lg font-bold text-content-primary mb-2">Buyer</h3>
            <p className="text-sm text-content-secondary text-center">
              I want to discover and purchase textiles from verified suppliers.
            </p>
          </Card>

          {/* Supplier Card */}
          <Card
            className="flex flex-col items-center justify-center p-8 border-2 border-transparent hover:border-primary-500 transition-colors cursor-pointer"
            onClick={() => handleRoleSelection('supplier')}
          >
            <div className="h-16 w-16 rounded-full bg-primary-100 flex items-center justify-center mb-4 text-primary-600">
              <Store size={32} />
            </div>
            <h3 className="text-lg font-bold text-content-primary mb-2">Supplier</h3>
            <p className="text-sm text-content-secondary text-center">
              I want to list my textile products and reach new B2B buyers.
            </p>
          </Card>
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm text-content-secondary">
            Already have an account?{' '}
            <button
              onClick={() => navigate('/login')}
              className="font-medium text-primary-600 hover:text-primary-500"
            >
              Log in
            </button>
          </p>
        </div>
      </Container>
    </div>
  )
}
