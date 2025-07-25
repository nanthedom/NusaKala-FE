'use client'

import { useAuthStore } from '@/store/auth.store'
import { useRouter } from 'next/navigation'

export function useAuth() {
  const { 
    user, 
    isAuthenticated, 
    isLoading, 
    error, 
    login, 
    register, 
    logout, 
    refreshUser, 
    clearError 
  } = useAuthStore()
  
  const router = useRouter()

  const handleLogin = async (email: string, password: string) => {
    try {
      await login(email, password)
      // Use window.location for immediate redirect
      setTimeout(() => {
        window.location.href = '/nusa-discovery'
      }, 1000)
    } catch (error) {
      // Error is already handled in the store
      console.error('Login error:', error)
    }
  }

  const handleRegister = async (data: { email: string; password: string; role: 'tourist' | 'organizer' | 'creator' }) => {
    try {
      console.log('useAuth: Registering with data:', data)
      await register(data)
      // Redirect to login after successful registration
      setTimeout(() => {
        window.location.href = '/auth/login'
      }, 1000)
    } catch (error) {
      // Error is already handled in the store
      console.error('Registration error in useAuth:', error)
      throw error // Re-throw to let the component handle it
    }
  }

  const handleLogout = async () => {
    try {
      await logout()
      // Redirect to landing page after logout
      setTimeout(() => {
        window.location.href = '/'
      }, 500)
    } catch (error) {
      // Even if logout fails, redirect to landing page
      console.error('Logout error:', error)
      setTimeout(() => {
        window.location.href = '/'
      }, 500)
    }
  }

  return {
    user,
    isAuthenticated,
    isLoading,
    error,
    login: handleLogin,
    register: handleRegister,
    logout: handleLogout,
    refreshUser,
    clearError
  }
}