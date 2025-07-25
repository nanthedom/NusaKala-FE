import { useState, useCallback } from 'react'

interface EventData {
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

interface ValidationSummary {
  status: 'approved' | 'pending_review' | 'rejected'
  score: number
  method: string
  reason: string
  saraStatus: string
  culturalStatus: string
  qualityStatus: string
  toxicityLevel: string
  warnings: string[]
  suggestions: string[]
}

interface UseEventSubmissionProps {
  onSuccess?: (eventId: string) => void
  onError?: (error: string) => void
}

export function useEventSubmission({ onSuccess, onError }: UseEventSubmissionProps = {}) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [validationSummary, setValidationSummary] = useState<ValidationSummary | null>(null)
  const [showWarningModal, setShowWarningModal] = useState(false)
  const [showReviewInfo, setShowReviewInfo] = useState(false)

  const getValidationSummary = useCallback(async (eventData: EventData) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/event-validation/summary`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(eventData),
      })

      if (!response.ok) {
        throw new Error('Failed to get validation summary')
      }

      const result = await response.json()
      
      if (result.success) {
        return result.data
      } else {
        throw new Error(result.error || 'Failed to get validation summary')
      }
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : 'Validation failed')
    }
  }, [])

  const createEvent = useCallback(async (eventData: EventData) => {
    try {
      // TODO: Replace with actual API endpoint
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/events`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(eventData),
      })

      if (!response.ok) {
        throw new Error('Failed to create event')
      }

      const result = await response.json()
      return result.data.id
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : 'Failed to create event')
    }
  }, [])

  const updateEvent = useCallback(async (eventId: string, eventData: EventData) => {
    try {
      // TODO: Replace with actual API endpoint
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/events/${eventId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(eventData),
      })

      if (!response.ok) {
        throw new Error('Failed to update event')
      }

      const result = await response.json()
      return result.data.id
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : 'Failed to update event')
    }
  }, [])

  const submitEvent = useCallback(async (eventData: EventData, isUpdate = false, eventId?: string) => {
    setIsSubmitting(true)
    setValidationSummary(null)
    setShowWarningModal(false)
    setShowReviewInfo(false)

    try {
      // Step 1: Get final validation summary
      const summary = await getValidationSummary(eventData)
      setValidationSummary(summary)

      // Step 2: Handle different validation statuses
      switch (summary.status) {
        case 'approved':
          // Create/update event directly
          const id = isUpdate && eventId 
            ? await updateEvent(eventId, eventData)
            : await createEvent(eventData)
          
          onSuccess?.(id)
          return { success: true, eventId: id, status: 'approved' }

        case 'pending_review':
          // Show review info and create/update with pending status
          setShowReviewInfo(true)
          const reviewId = isUpdate && eventId 
            ? await updateEvent(eventId, eventData)
            : await createEvent(eventData)
          
          onSuccess?.(reviewId)
          return { success: true, eventId: reviewId, status: 'pending_review' }

        case 'rejected':
          // Show warning modal with details
          setShowWarningModal(true)
          onError?.(summary.reason)
          return { success: false, status: 'rejected', reason: summary.reason }

        default:
          throw new Error('Unknown validation status')
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Submission failed'
      onError?.(errorMessage)
      return { success: false, error: errorMessage }
    } finally {
      setIsSubmitting(false)
    }
  }, [getValidationSummary, createEvent, updateEvent, onSuccess, onError])

  return {
    submitEvent,
    isSubmitting,
    validationSummary,
    showWarningModal,
    showReviewInfo,
    setShowWarningModal,
    setShowReviewInfo
  }
} 