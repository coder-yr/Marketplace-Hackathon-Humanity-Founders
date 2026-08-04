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
    <div className="min-h-screen bg-[#F7F8FA] flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <Container size="sm">
        <div className="sm:mx-auto sm:w-full sm:max-w-md text-center mb-8">
          <h2 className="text-[32px] font-display font-bold text-[var(--heading)]">
            Join the Marketplace
          </h2>
          <p className="mt-2 text-[14px] text-[var(--body)] font-medium">
            How would you like to use our platform?
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {/* Buyer Card */}
          <Card
            className="flex flex-col items-center justify-center p-8 border-2 border-transparent hover:border-[var(--primary)] transition-colors cursor-pointer bg-white shadow-sm rounded-[24px]"
            onClick={() => handleRoleSelection('buyer')}
          >
            <div className="h-16 w-16 rounded-[16px] bg-[var(--primary)]/10 flex items-center justify-center mb-4 text-[var(--primary)]">
              <User size={32} />
            </div>
            <h3 className="text-lg font-bold text-[var(--heading)] mb-2">Buyer</h3>
            <p className="text-[13px] text-[var(--body)] font-medium text-center">
              I want to discover and purchase textiles from verified suppliers.
            </p>
          </Card>

          {/* Supplier Card */}
          <Card
            className="flex flex-col items-center justify-center p-8 border-2 border-transparent hover:border-[var(--primary)] transition-colors cursor-pointer bg-white shadow-sm rounded-[24px]"
            onClick={() => handleRoleSelection('supplier')}
          >
            <div className="h-16 w-16 rounded-[16px] bg-[var(--primary)]/10 flex items-center justify-center mb-4 text-[var(--primary)]">
              <Store size={32} />
            </div>
            <h3 className="text-lg font-bold text-[var(--heading)] mb-2">Supplier</h3>
            <p className="text-[13px] text-[var(--body)] font-medium text-center">
              I want to list my textile products and reach new B2B buyers.
            </p>
          </Card>
        </div>

        <div className="mt-8 text-center">
          <p className="text-[14px] font-medium text-[var(--body)]">
            Already have an account?{' '}
            <button
              onClick={() => navigate('/login')}
              className="font-bold text-[var(--primary)] hover:text-[#0052CC]"
            >
              Log in
            </button>
          </p>
        </div>
      </Container>
    </div>
  )
}
