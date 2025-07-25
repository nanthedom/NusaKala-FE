import { useState, useEffect, useCallback } from 'react'

interface ValidationResult {
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

interface EventData {
  name: string
  description: string
  types: string[]
  place_name: string
  latitude?: number
  longitude?: number
  start_datetime: string
  end_datetime: string
}

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

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/event-validation/validate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error('Validation failed')
      }

      const result = await response.json()
      
      if (result.success) {
        setValidationResult(result.data)
      } else {
        throw new Error(result.error || 'Validation failed')
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
    isApproved,
    validateEvent
  }
} 