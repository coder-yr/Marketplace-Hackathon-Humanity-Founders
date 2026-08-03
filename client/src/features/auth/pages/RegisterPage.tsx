import React, { useState, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
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

const registerSchema = z
  .object({
    fullName: z.string().min(2, 'Full name must be at least 2 characters'),
    email: z.string().email('Please enter a valid email address'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  })

type RegisterForm = z.infer<typeof registerSchema>

export const RegisterPage: React.FC = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const setAuth = useAuthStore((state) => state.setAuth)
  const [isLoading, setIsLoading] = useState(false)

  const roleParam = searchParams.get('role')
  const role = roleParam === 'supplier' ? 'supplier' : 'buyer'

  useEffect(() => {
    if (!roleParam) {
      navigate('/choose-role', { replace: true })
    }
  }, [roleParam, navigate])

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
  })

  const onSubmit = async (data: RegisterForm) => {
    try {
      setIsLoading(true)
      const response = await authApi.register({
        fullName: data.fullName,
        email: data.email,
        password: data.password,
        role,
      })
      
      setAuth(response)
      toast.success('Account created successfully!')
      navigate('/dashboard', { replace: true })
    } catch (error: any) {
      toast.error(error.response?.data?.error?.message || 'Registration failed')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex bg-[var(--surface-1)]">
      {/* Left side - Form */}
      <div className="flex-1 flex flex-col justify-center py-12 px-6 sm:px-12 lg:px-24">
        <div className="w-full max-w-md mx-auto">
          <div className="mb-10">
            <h2 className="text-3xl font-display font-bold text-[var(--text-primary)] capitalize">
              Create {role} account
            </h2>
            <p className="mt-2 text-sm text-[var(--text-secondary)]">
              Already have an account?{' '}
              <button
                onClick={() => navigate('/login')}
                className="font-semibold text-[var(--color-brand-primary)] hover:text-[var(--color-brand-primary-hover)] transition-colors"
              >
                Sign in here
              </button>
            </p>
          </div>

          <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
            <Input
              label="Full Name"
              autoComplete="name"
              error={errors.fullName?.message}
              {...register('fullName')}
              className="bg-[var(--surface-2)] border-[var(--border-color)] focus:border-[var(--color-brand-primary)]"
            />

            <Input
              label="Email address"
              type="email"
              autoComplete="email"
              error={errors.email?.message}
              {...register('email')}
              className="bg-[var(--surface-2)] border-[var(--border-color)] focus:border-[var(--color-brand-primary)]"
            />

            <PasswordInput
              label="Password"
              autoComplete="new-password"
              error={errors.password?.message}
              {...register('password')}
              className="bg-[var(--surface-2)] border-[var(--border-color)] focus:border-[var(--color-brand-primary)]"
            />

            <PasswordInput
              label="Confirm Password"
              autoComplete="new-password"
              error={errors.confirmPassword?.message}
              {...register('confirmPassword')}
              className="bg-[var(--surface-2)] border-[var(--border-color)] focus:border-[var(--color-brand-primary)]"
            />

            <Button
              type="submit"
              fullWidth
              size="lg"
              loading={isLoading}
              className="gradient-brand text-white shadow-lg shadow-[var(--color-brand-primary)]/20 hover:shadow-xl hover:shadow-[var(--color-brand-primary)]/30 hover:-translate-y-0.5 transition-all text-base font-semibold rounded-xl mt-6"
            >
              Create Account
            </Button>
          </form>
        </div>
      </div>

      {/* Right side - Image & Value Prop */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-[var(--surface-2)]">
        <img
          src="https://images.unsplash.com/photo-1596484552834-6a58f850d0d7?auto=format&fit=crop&w=1200&q=80"
          alt="Textile Rolls"
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--surface-1)] via-[var(--surface-1)]/80 to-transparent" />
        <div className="absolute inset-0 bg-[var(--color-brand-primary)]/10 mix-blend-multiply" />
        
        {/* Content */}
        <div className="relative z-10 p-12 flex flex-col justify-end h-full max-w-2xl text-right ml-auto">
          <div className="flex justify-end mb-6">
            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-lg">
              <Store className="w-6 h-6 text-[var(--color-brand-primary)]" />
            </div>
          </div>
          <h2 className="text-4xl font-display font-extrabold text-[var(--text-primary)] tracking-tight leading-tight mb-4">
            Join thousands of global <br /> textile professionals.
          </h2>
          <p className="text-lg text-[var(--text-secondary)] mb-8 ml-auto max-w-md">
            Whether you are sourcing fabrics or selling them, TextileHub provides the enterprise tools you need to succeed.
          </p>
          <div className="flex gap-6 justify-end">
            <div className="flex items-center gap-2 text-sm font-semibold text-[var(--text-primary)]">
              <ShieldCheck className="w-5 h-5 text-[var(--color-brand-primary)]" />
              Secure Escrow
            </div>
            <div className="flex items-center gap-2 text-sm font-semibold text-[var(--text-primary)]">
              <Zap className="w-5 h-5 text-[var(--color-brand-primary)]" />
              AI Copilot
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
