import React, { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { toast } from 'sonner'
import { Input } from '../../../shared/components/ui/input'
import { PasswordInput } from '../../../shared/components/ui/password-input'
import { Button } from '../../../shared/components/ui/button'
import { useAuthStore } from '../store/auth.store'
import { authApi } from '../api/auth.api'
import { Store, ShieldCheck, Zap } from 'lucide-react'

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(1, 'Password is required'),
})

type LoginForm = z.infer<typeof loginSchema>

export const LoginPage: React.FC = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const setAuth = useAuthStore((state) => state.setAuth)
  const [isLoading, setIsLoading] = useState(false)

  // Navigate to previous page or dashboard based on role
  const from = (location.state as any)?.from?.pathname || '/dashboard'

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = async (data: LoginForm) => {
    try {
      setIsLoading(true)
      const response = await authApi.login(data)
      setAuth(response)
      toast.success('Welcome back!')
      navigate(from, { replace: true })
    } catch (error: any) {
      toast.error(error.response?.data?.error?.message || 'Login failed')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex bg-[#F7F8FA]">
      {/* Left side - Image & Value Prop */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-white">
        <img
          src="https://images.unsplash.com/photo-1584992236310-6edddc08acff?auto=format&fit=crop&w=1200&q=80"
          alt="Textile Manufacturing"
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#F7F8FA] via-[#F7F8FA]/80 to-transparent" />
        <div className="absolute inset-0 bg-[var(--primary)]/10 mix-blend-multiply" />
        
        {/* Content */}
        <div className="relative z-10 p-12 flex flex-col justify-end h-full max-w-2xl">
          <div className="w-12 h-12 bg-[var(--primary)] rounded-xl flex items-center justify-center mb-6 shadow-lg shadow-[var(--primary)]/30">
            <Store className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-4xl font-display font-extrabold text-[var(--heading)] tracking-tight leading-tight mb-4">
            The world's premium <br /> B2B textile sourcing platform.
          </h2>
          <p className="text-lg text-[var(--body)] mb-8 font-medium">
            Connect with verified manufacturers, request quotes instantly, and manage your entire sourcing workflow in one place.
          </p>
          <div className="flex gap-6">
            <div className="flex items-center gap-2 text-sm font-bold text-[var(--heading)]">
              <ShieldCheck className="w-5 h-5 text-[var(--success)]" />
              Verified Suppliers
            </div>
            <div className="flex items-center gap-2 text-sm font-bold text-[var(--heading)]">
              <Zap className="w-5 h-5 text-[var(--primary)]" />
              Instant Quotes
            </div>
          </div>
        </div>
      </div>

      {/* Right side - Form */}
      <div className="flex-1 flex flex-col justify-center py-12 px-6 sm:px-12 lg:px-24">
        <div className="w-full max-w-md mx-auto">
          <div className="mb-10">
            <h2 className="text-3xl font-display font-bold text-[var(--heading)]">
              Welcome back
            </h2>
            <p className="mt-2 text-sm text-[var(--body)] font-medium">
              Don't have an account?{' '}
              <button
                onClick={() => navigate('/choose-role')}
                className="font-bold text-[var(--primary)] hover:text-[#0052CC] transition-colors"
              >
                Create one now
              </button>
            </p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <Input
              label="Email address"
              type="email"
              autoComplete="email"
              error={errors.email?.message}
              {...register('email')}
              className="bg-white border-[var(--border)] focus:border-[var(--primary)]"
            />

            <PasswordInput
              label="Password"
              autoComplete="current-password"
              error={errors.password?.message}
              {...register('password')}
              className="bg-white border-[var(--border)] focus:border-[var(--primary)]"
            />

            <div className="flex items-center justify-between">
              <div className="text-sm">
                <a
                  href="#"
                  className="font-bold text-[var(--primary)] hover:text-[#0052CC]"
                >
                  Forgot your password?
                </a>
              </div>
            </div>

            <Button
              type="submit"
              fullWidth
              size="lg"
              loading={isLoading}
              className="bg-[var(--heading)] text-white hover:bg-[var(--primary)] hover:-translate-y-0.5 transition-all text-[15px] font-bold rounded-[12px] h-12 mt-4"
            >
              Sign in to Dashboard
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}
