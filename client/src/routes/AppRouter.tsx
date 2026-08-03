import { Routes, Route } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import { MainLayout } from '@/shared/layouts/MainLayout'
import { GuestRoute } from '@/shared/components/routing/GuestRoute'
import { ProtectedRoute } from '@/shared/components/routing/ProtectedRoute'

// Lazy load pages for code splitting
const HomePage = lazy(() => import('@/features/home/pages/HomePage').then(module => ({ default: module.HomePage })))
const MarketplacePage = lazy(() => import('@/features/products/pages/MarketplacePage').then(module => ({ default: module.MarketplacePage })))
const CategoriesPage = lazy(() => import('@/features/products/pages/CategoriesPage').then(module => ({ default: module.CategoriesPage })))
const ProductDetailPage = lazy(() => import('@/features/products/pages/ProductDetailPage').then(module => ({ default: module.ProductDetailPage })))

const DevPage = lazy(() => import('@/features/dev/pages/DevPage').then(module => ({ default: module.DevPage })))
const NotFoundPage = lazy(() => import('@/shared/pages/NotFoundPage').then(module => ({ default: module.NotFoundPage })))
const UnauthorizedPage = lazy(() => import('@/shared/pages/UnauthorizedPage').then(module => ({ default: module.UnauthorizedPage })))

// Auth & Dashboard Pages
const ChooseRolePage = lazy(() => import('@/features/auth/pages/ChooseRolePage').then(module => ({ default: module.ChooseRolePage })))
const RegisterPage = lazy(() => import('@/features/auth/pages/RegisterPage').then(module => ({ default: module.RegisterPage })))
const LoginPage = lazy(() => import('@/features/auth/pages/LoginPage').then(module => ({ default: module.LoginPage })))
const DashboardRouter = lazy(() => import('@/features/dashboard/routes/DashboardRouter').then(module => ({ default: module.DashboardRouter })))
const OnboardingPage = lazy(() => import('@/features/onboarding/pages/OnboardingPage').then(module => ({ default: module.OnboardingPage })))
const WorkspaceSetupPage = lazy(() => import('@/features/onboarding/pages/WorkspaceSetupPage').then(module => ({ default: module.WorkspaceSetupPage })))

export function AppRouter() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center p-4">Loading...</div>}>
      <Routes>
        {/* Public Marketplace Pages with MainLayout */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/marketplace" element={<MarketplacePage />} />
          <Route path="/categories" element={<CategoriesPage />} />
          <Route path="/products/:idOrSlug" element={<ProductDetailPage />} />
        </Route>

        {/* Guest Only Routes (Login, Register) */}
        <Route element={<GuestRoute />}>
          <Route path="/choose-role" element={<ChooseRolePage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Route>

        {/* Protected Dashboard Routes (Authenticated & Onboarded Users Only) */}
        <Route element={<ProtectedRoute requireOnboarded={true} />}>
          <Route path="/dashboard/*" element={<DashboardRouter />} />
        </Route>

        {/* Protected Routes for Un-onboarded Users */}
        <Route element={<ProtectedRoute requireOnboarded={false} requireNotOnboarded={true} />}>
          <Route path="/onboarding" element={<OnboardingPage />} />
          <Route path="/workspace-setup" element={<WorkspaceSetupPage />} />
        </Route>

        <Route path="/unauthorized" element={<UnauthorizedPage />} />
        <Route path="/dev/components" element={<DevPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  )
}
