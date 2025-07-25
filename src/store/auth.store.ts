import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { authService, type User, type RegisterData, type LoginData } from '@/services/auth.service'

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null
  accessToken: string | null
  login: (email: string, password: string) => Promise<void>
  register: (data: RegisterData) => Promise<void>
  logout: () => Promise<void>
  refreshUser: () => Promise<void>
  clearError: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
      accessToken: null,
      
      login: async (email: string, password: string) => {
        set({ isLoading: true, error: null })
        try {
          const response = await authService.login({ email, password })
          const newState = { 
            user: response.user, 
            isAuthenticated: true, 
            isLoading: false,
            error: null,
            accessToken: response.session.accessToken
          }
          set(newState)
          
          // Store both tokens in localStorage
          if (typeof window !== 'undefined') {
            localStorage.setItem('accessToken', response.session.accessToken)
            localStorage.setItem('refreshToken', response.session.refreshToken)
          }
        } catch (error) {
          set({ 
            isLoading: false, 
            error: error instanceof Error ? error.message : 'Login failed'
          })
          throw error
        }
      },
      
      register: async (data: RegisterData) => {
        set({ isLoading: true, error: null })
        try {
          const response = await authService.register(data)
          
          set({ 
            user: null, 
            isAuthenticated: false, 
            isLoading: false,
            error: null,
            accessToken: null
          })
        } catch (error) {
          console.error('Auth store: Registration error:', error)
          set({ 
            isLoading: false, 
            error: error instanceof Error ? error.message : 'Registration failed'
          })
          throw error
        }
      },
      
      logout: async () => {
        set({ isLoading: true })
        try {
          await authService.logout()
        } catch (error) {
          // Continue with logout even if server call fails
        } finally {
          // Always clear local state and localStorage
          set({ 
            user: null, 
            isAuthenticated: false, 
            isLoading: false,
            error: null,
            accessToken: null
          })
          
          // Clear localStorage
          if (typeof window !== 'undefined') {
            localStorage.removeItem('accessToken')
            localStorage.removeItem('refreshToken')
          }
        }
      },

      refreshUser: async () => {
        // Only refresh if we're already authenticated
        const currentState = get()
        if (!currentState.isAuthenticated) {
          return
        }
        
        try {
          const response = await authService.getCurrentUser()
          const newState = {
            user: response.user, 
            isAuthenticated: true,
            error: null
          }
          set(newState)
        } catch (error) {
          set({ 
            user: null, 
            isAuthenticated: false,
            error: null,
            accessToken: null
          })
          
          // Clear localStorage on refresh failure
          if (typeof window !== 'undefined') {
            localStorage.removeItem('accessToken')
            localStorage.removeItem('refreshToken')
          }
        }
      },

      clearError: () => {
        set({ error: null })
      }
    }),
    {
      name: 'auth-storage',
      partialize: (state): Partial<AuthState> => ({ 
        user: state.user, 
        isAuthenticated: state.isAuthenticated,
        accessToken: state.accessToken
      })
    }
  )
)