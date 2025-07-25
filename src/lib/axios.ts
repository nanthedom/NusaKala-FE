import axios from 'axios'
import { authService } from '@/services/auth.service'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api'

// Configure axios for token-based auth
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor - add Authorization header with accessToken
apiClient.interceptors.request.use(
  (config) => {
    // Get accessToken from localStorage
    if (typeof window !== 'undefined') {
      const accessToken = localStorage.getItem('accessToken')
      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`
      }
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor - handle token refresh on 401 errors
apiClient.interceptors.response.use(
  (response) => {
    return response
  },
  async (error) => {
    const originalRequest = error.config

    // If error is 401 and we haven't already tried to refresh
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true

      try {
        // Try to refresh the token
        const refreshResponse = await authService.refreshToken()
        
        // Update tokens in localStorage
        if (typeof window !== 'undefined') {
          localStorage.setItem('accessToken', refreshResponse.session.accessToken)
          localStorage.setItem('refreshToken', refreshResponse.session.refreshToken)
        }
        
        // Retry the original request with new token
        return apiClient(originalRequest)
      } catch (refreshError) {
        // If refresh fails, clear tokens and redirect to login
        if (typeof window !== 'undefined') {
          localStorage.removeItem('accessToken')
          localStorage.removeItem('refreshToken')
          window.location.href = '/auth/login'
        }
        return Promise.reject(refreshError)
      }
    }

    return Promise.reject(error)
  }
)

export default apiClient 