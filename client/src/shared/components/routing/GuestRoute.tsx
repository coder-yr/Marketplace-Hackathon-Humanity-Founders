import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useAuthStore } from '../../../features/auth/store/auth.store'
import { Spinner } from '../feedback/spinner'

export const GuestRoute: React.FC = () => {
  const { isAuthenticated, isInitialized } = useAuthStore()

  if (!isInitialized) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface-50">
        <Spinner size="lg" />
      </div>
    )
  }

  if (isAuthenticated) {
    // Redirect logged-in users away from auth pages (login/register)
    return <Navigate to="/dashboard" replace />
  }

  return <Outlet />
}
