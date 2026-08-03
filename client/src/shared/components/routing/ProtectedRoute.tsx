import React from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuthStore } from '../../../features/auth/store/auth.store'
import { UserRole } from '../../../features/auth/types/auth.types'
import { Spinner } from '../feedback/spinner'

interface ProtectedRouteProps {
  allowedRoles?: UserRole[]
  requireOnboarded?: boolean
  requireNotOnboarded?: boolean
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  allowedRoles,
  requireOnboarded = true,
  requireNotOnboarded = false
}) => {
  const { isAuthenticated, isInitialized, user } = useAuthStore()
  const location = useLocation()

  if (!isInitialized) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface-50">
        <Spinner size="lg" />
      </div>
    )
  }

  if (!isAuthenticated) {
    // Redirect to login but save the attempted url
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  if (allowedRoles && user && !allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />
  }

  if (requireOnboarded && user && !user.isOnboarded) {
    return <Navigate to="/onboarding" replace />
  }

  if (requireNotOnboarded && user && user.isOnboarded) {
    return <Navigate to="/dashboard" replace />
  }

  return <Outlet />
}
