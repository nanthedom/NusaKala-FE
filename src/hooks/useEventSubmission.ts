import { useState, useCallback } from 'react'
import { eventService, type EventData } from '@/services/event.service'

interface UseEventSubmissionProps {
  onSuccess?: (eventId: string) => void
  onError?: (error: string) => void
}

export function useEventSubmission({ onSuccess, onError }: UseEventSubmissionProps = {}) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showWarningModal, setShowWarningModal] = useState(false)
  const [showReviewInfo, setShowReviewInfo] = useState(false)

  const createEvent = useCallback(async (eventData: EventData) => {
    try {
      const result = await eventService.createEvent(eventData)
      return result.data.id
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : 'Failed to create event')
    }
  }, [])

  const updateEvent = useCallback(async (eventId: string, eventData: EventData) => {
    try {
      const result = await eventService.updateEvent(eventId, eventData)
      return result.data.id
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : 'Failed to update event')
    }
  }, [])

  const submitEvent = useCallback(async (eventData: EventData, isUpdate = false, eventId?: string) => {
    setIsSubmitting(true)
    setShowWarningModal(false)
    setShowReviewInfo(false)

    try {
      // Create/update event directly
      const id = isUpdate && eventId 
        ? await updateEvent(eventId, eventData)
        : await createEvent(eventData)
      
      onSuccess?.(id)
      return { success: true, eventId: id }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Submission failed'
      onError?.(errorMessage)
      return { success: false, error: errorMessage }
    } finally {
      setIsSubmitting(false)
    }
  }, [createEvent, updateEvent, onSuccess, onError])

  return {
    submitEvent,
    isSubmitting,
    showWarningModal,
    showReviewInfo,
    setShowWarningModal,
    setShowReviewInfo
  }
} 