'use client'

import apiClient from '@/lib/axios'
import { useState, useEffect } from 'react'

export interface Event {
  id: string
  name: string
  types: string[]
  description: string
  images: string[]
  links: string[] | null
  place_name: string
  latitude: number | null
  longitude: number | null
  start_datetime: string
  end_datetime: string
  created_by: string | null
  created_at: string
  updated_at: string
  creator_email: string | null
  creator_avatar: string | null
}

export interface EventsResponse {
  success: boolean
  message: string
  data: {
    success: boolean
    events: Event[]
    total: number
  }
}

export function useEvents() {
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [total, setTotal] = useState(0)

  const fetchEvents = async () => {
    try {
      setLoading(true)
      setError(null)
      
      const response = await apiClient.get<EventsResponse>('/events')
      
      if (response.data.success) {
        setEvents(response.data.data.events)
        setTotal(response.data.data.total)
      } else {
        setError('Failed to fetch events')
      }
    } catch (err) {
      console.error('Error fetching events:', err)
      setError('Failed to load events')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchEvents()
  }, [])

  const refetch = () => {
    fetchEvents()
  }

  return {
    events,
    loading,
    error,
    total,
    refetch
  }
} 