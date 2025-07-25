import axios from 'axios'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api'

// Configure axios to include credentials for cookie-based auth
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
})

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
      // Debug: Log the request
      console.log('Sending registration request to:', `${API_BASE_URL}/auth/register`)
      console.log('Registration data:', data)
      
      const response = await apiClient.post<AuthResponse>('/auth/register', data)
      
      // Debug: Log the response
      console.log('Registration response:', response.data)
      
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
      const response = await apiClient.post<AuthResponse>('/auth/login', data)
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
      const response = await apiClient.post<AuthResponse>('/auth/refresh')
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