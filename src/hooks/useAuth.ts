'use client'

import { useAuthStore } from '@/store/auth.store'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export function useAuth(requireAuth = false) {
  const { user, isAuthenticated, isLoading } = useAuthStore()
  const router = useRouter()

  useEffect(() => {
    if (requireAuth && !isLoading && !isAuthenticated) {
      router.push('/auth/login')
    }
  }, [requireAuth, isLoading, isAuthenticated, router])

  return {
    user,
    isAuthenticated,
    isLoading,
  }
}