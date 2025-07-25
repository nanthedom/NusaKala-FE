'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/store/auth.store'

interface ProtectedRouteProps {
  children: React.ReactNode
  redirectTo?: string
  requireAuth?: boolean
  fallback?: React.ReactNode
}

export function ProtectedRoute({ 
  children, 
  redirectTo = '/auth/login',
  requireAuth = true,
  fallback
}: ProtectedRouteProps) {
  const router = useRouter()
  const { isAuthenticated, isLoading, refreshUser } = useAuthStore()
  const [shouldRender, setShouldRender] = useState(false)
  const [hasCheckedAuth, setHasCheckedAuth] = useState(false)

  useEffect(() => {
    const checkAuthState = async () => {
      if (!isLoading) {
        setHasCheckedAuth(true)
        
        if (requireAuth && !isAuthenticated) {
          // Check if we have accessToken in localStorage
          const accessToken = localStorage.getItem('accessToken')
          if (accessToken) {
            // Try to refresh user data
            await refreshUser()
            return
          }

          router.replace(redirectTo)
        } else if (!requireAuth && isAuthenticated) {
          router.replace('/nusa-discovery')
        } else {
          setShouldRender(true)
        }
      }
    }

    checkAuthState()
  }, [isAuthenticated, isLoading, requireAuth, redirectTo, router, refreshUser])

  if (isLoading || !hasCheckedAuth) {
    return fallback || (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-nusa-dark-brown mx-auto"></div>
          <p className="mt-2 text-nusa-brown">Loading...</p>
        </div>
      </div>
    )
  }

  if (!shouldRender) {
    return null
  }

  return <>{children}</>
} 