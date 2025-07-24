import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface User {
  id: string
  username: string
  email: string
  role: 'tourist' | 'event_organizer' | 'cultural_creator'
  profile: {
    avatar?: string
    bio?: string
    interests: string[]
    streak: number
    points: number
  }
  location?: {
    current: {
      lat: number
      lng: number
    }
    visited_provinces: string[]
  }
}

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  register: (userData: Partial<User>) => Promise<void>
  logout: () => void
  updateProfile: (data: Partial<User['profile']>) => void
  addVisitedProvince: (province: string) => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: {
        id: '1',
        username: 'Demo User',
        email: 'demo@nusākāla.com',
        role: 'tourist',
        profile: {
          interests: ['art_performance', 'traditional_music'],
          streak: 5,
          points: 1250,
        },
        location: {
          current: { lat: -6.2088, lng: 106.8456 },
          visited_provinces: ['jakarta', 'jogja', 'bali']
        }
      }, // Demo user for development
      isAuthenticated: true, // Set to true for demo
      isLoading: false,
      
      login: async (email: string, password: string) => {
        set({ isLoading: true })
        try {
          // Mock login - replace with real API call
          await new Promise(resolve => setTimeout(resolve, 1000))
          
          const mockUser: User = {
            id: '1',
            username: 'Demo User',
            email: email,
            role: 'tourist',
            profile: {
              interests: ['art_performance', 'traditional_music'],
              streak: 5,
              points: 1250,
            },
            location: {
              current: { lat: -6.2088, lng: 106.8456 },
              visited_provinces: ['jakarta', 'jogja', 'bali']
            }
          }
          
          set({ user: mockUser, isAuthenticated: true, isLoading: false })
        } catch (error) {
          set({ isLoading: false })
          throw error
        }
      },
      
      register: async (userData: Partial<User>) => {
        set({ isLoading: true })
        try {
          // Mock registration - replace with real API call
          await new Promise(resolve => setTimeout(resolve, 1000))
          
          const newUser: User = {
            id: Date.now().toString(),
            username: userData.username || 'New User',
            email: userData.email || '',
            role: userData.role || 'tourist',
            profile: {
              interests: [],
              streak: 0,
              points: 0,
              ...userData.profile
            }
          }
          
          set({ user: newUser, isAuthenticated: true, isLoading: false })
        } catch (error) {
          set({ isLoading: false })
          throw error
        }
      },
      
      logout: () => {
        set({ user: null, isAuthenticated: false })
      },
      
      updateProfile: (data: Partial<User['profile']>) => {
        const { user } = get()
        if (user) {
          set({
            user: {
              ...user,
              profile: { ...user.profile, ...data }
            }
          })
        }
      },
      
      addVisitedProvince: (province: string) => {
        const { user } = get()
        if (user && user.location) {
          const visitedProvinces = user.location.visited_provinces || []
          if (!visitedProvinces.includes(province)) {
            set({
              user: {
                ...user,
                location: {
                  ...user.location,
                  visited_provinces: [...visitedProvinces, province]
                }
              }
            })
          }
        }
      }
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ 
        user: state.user, 
        isAuthenticated: state.isAuthenticated 
      })
    }
  )
)