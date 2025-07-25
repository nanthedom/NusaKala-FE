import apiClient from '@/lib/axios'
import axios from 'axios'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api'

// Create a separate axios instance for auth requests (login/register) to avoid response interceptors
const authClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Create a separate axios instance for refresh token requests to avoid infinite loops
const refreshClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Add request interceptor to include refresh token from localStorage
refreshClient.interceptors.request.use(
  (config: any) => {
    if (typeof window !== 'undefined') {
      // For refresh token requests, we might need to send the refresh token
      // This depends on your backend implementation
      const refreshToken = localStorage.getItem('refreshToken')
      if (refreshToken) {
        config.headers.Authorization = `Bearer ${refreshToken}`
      }
    }
    return config
  },
  (error: any) => {
    return Promise.reject(error)
  }
)

export interface User {
  id: string
  email: string
  role: 'tourist' | 'organizer' | 'creator'
  avatarUrl?: string
  streak: number
  points: number
  createdAt: string
  updatedAt: string
}

export interface AuthResponse {
  message: string
  user: User
  session: {
    accessToken: string
    refreshToken: string
    expiresIn: number
  }
}

export interface RegisterData {
  email: string
  password: string
  role: 'tourist' | 'organizer' | 'creator'
}

export interface LoginData {
  email: string
  password: string
}

export interface ValidationError {
  error: string
  details?: string[]
}

class AuthService {
  async register(data: RegisterData): Promise<AuthResponse> {
    try {
      const response = await authClient.post<AuthResponse>('/auth/register', data)
      
      return response.data
    } catch (error) {
      console.error('Registration error details:', error)
      
      if (axios.isAxiosError(error)) {
        console.error('Response data:', error.response?.data)
        console.error('Response status:', error.response?.status)
        console.error('Response headers:', error.response?.headers)
        
        if (error.response?.data) {
          throw new Error(error.response.data.error || error.response.data.message || 'Registration failed')
        }
      }
      throw new Error('Network error occurred')
    }
  }

  async login(data: LoginData): Promise<AuthResponse> {
    try {
      const response = await authClient.post<AuthResponse>('/auth/login', data)
      return response.data
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.data) {
          throw new Error(error.response.data.error || 'Login failed')
        }
      }
      throw new Error('Network error occurred')
    }
  }

  async logout(): Promise<{ message: string }> {
    try {
      const response = await apiClient.post<{ message: string }>('/auth/logout')
      return response.data
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.data) {
          throw new Error(error.response.data.error || 'Logout failed')
        }
      }
      throw new Error('Network error occurred')
    }
  }

  async refreshToken(): Promise<AuthResponse> {
    try {
      const response = await refreshClient.post<AuthResponse>('/auth/refresh')
      return response.data
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.data) {
          throw new Error(error.response.data.error || 'Token refresh failed')
        }
      }
      throw new Error('Network error occurred')
    }
  }

  async getCurrentUser(): Promise<{ user: User }> {
    try {
      const response = await apiClient.get<{ user: User }>('/auth/me')
      return response.data
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.data) {
          throw new Error(error.response.data.error || 'Failed to get user info')
        }
      }
      throw new Error('Network error occurred')
    }
  }
}

export const authService = new AuthService() 