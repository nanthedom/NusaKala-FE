import { useState, useCallback, useEffect } from 'react'
import { eventService, type EventData, type ValidationResult } from '@/services/event.service'

interface UseEventValidationProps {
  eventData: EventData
  enabled?: boolean
  debounceMs?: number
}

export function useEventValidation({
  eventData,
  enabled = true,
  debounceMs = 3500
}: UseEventValidationProps) {
  const [validationResult, setValidationResult] = useState<ValidationResult | null>(null)
  const [isValidating, setIsValidating] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const validateEvent = useCallback(async (data: EventData) => {
    try {
      setIsValidating(true)
      setError(null)

      const result = await eventService.validateEvent(data)
      
      if (result.success) {
        setValidationResult(result.data)
      } else {
        throw new Error('Validation failed')
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Validation failed')
      setValidationResult(null)
    } finally {
      setIsValidating(false)
    }
  }, [])

  // Real-time validation with debounce
  useEffect(() => {
    if (!enabled || !eventData.description || eventData.description.length < 50) {
      setValidationResult(null)
      return
    }

    const timeoutId = setTimeout(() => {
      validateEvent(eventData)
    }, debounceMs)

    return () => clearTimeout(timeoutId)
  }, [eventData, enabled, debounceMs, validateEvent])

  const hasWarnings = validationResult?.warnings && validationResult.warnings.length > 0
  const hasSuggestions = validationResult?.suggestions && validationResult.suggestions.length > 0
  const isRejected = validationResult?.status === 'rejected'
  const isPendingReview = validationResult?.status === 'pending_review'
  const isApproved = validationResult?.status === 'approved'

  return {
    validationResult,
    isValidating,
    error,
    hasWarnings,
    hasSuggestions,
    isRejected,
    isPendingReview,
    isApproved
  }
} 