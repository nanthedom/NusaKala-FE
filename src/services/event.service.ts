import apiClient from '@/lib/axios'
import axios from 'axios'

export interface EventData {
  name: string
  description: string
  types: string[]
  place_name: string
  latitude?: number
  longitude?: number
  start_datetime: string
  end_datetime: string
  images?: string[]
  links?: string[]
}

export interface Event {
  id: string
  name: string
  description: string
  types: string[]
  place_name: string
  latitude?: number
  longitude?: number
  start_datetime: string
  end_datetime: string
  images?: string[]
  links?: string[]
  created_by: string
  created_at: string
  updated_at: string
}

export interface ValidationResult {
  status: 'approved' | 'pending_review' | 'rejected'
  score?: number
  method?: string
  reason?: string
  saraStatus?: string
  culturalStatus?: string
  qualityStatus?: string
  toxicityLevel?: string
  warnings?: string[]
  suggestions?: string[]
}

class EventService {
  async createEvent(data: EventData): Promise<{ data: { id: string } }> {
    try {
      console.log('Creating event with data:', data)
      const response = await apiClient.post<{ data: { id: string } }>('/events', data)
      console.log('Event created successfully:', response.data)
      return response.data
    } catch (error) {
      console.error('Create event error:', error)
      if (axios.isAxiosError(error)) {
        if (error.response?.data) {
          throw new Error(error.response.data.error || error.response.data.message || 'Failed to create event')
        }
      }
      throw new Error('Network error occurred')
    }
  }

  async updateEvent(eventId: string, data: EventData): Promise<{ data: { id: string } }> {
    try {
      console.log('Updating event with data:', data)
      const response = await apiClient.put<{ data: { id: string } }>(`/events/${eventId}`, data)
      console.log('Event updated successfully:', response.data)
      return response.data
    } catch (error) {
      console.error('Update event error:', error)
      if (axios.isAxiosError(error)) {
        if (error.response?.data) {
          throw new Error(error.response.data.error || error.response.data.message || 'Failed to update event')
        }
      }
      throw new Error('Network error occurred')
    }
  }

  async getEvent(eventId: string): Promise<{ data: Event }> {
    try {
      const response = await apiClient.get<{ data: Event }>(`/events/${eventId}`)
      return response.data
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.data) {
          throw new Error(error.response.data.error || 'Failed to get event')
        }
      }
      throw new Error('Network error occurred')
    }
  }

  async getEvents(): Promise<{ data: Event[] }> {
    try {
      const response = await apiClient.get<{ data: Event[] }>('/events')
      return response.data
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.data) {
          throw new Error(error.response.data.error || 'Failed to get events')
        }
      }
      throw new Error('Network error occurred')
    }
  }

  async validateEvent(data: EventData): Promise<{ success: boolean; data: ValidationResult }> {
    try {
      const response = await apiClient.post<{ success: boolean; data: ValidationResult }>('/event-validation/validate', data)
      return response.data
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.data) {
          throw new Error(error.response.data.error || 'Validation failed')
        }
      }
      throw new Error('Network error occurred')
    }
  }
}

export const eventService = new EventService() 