'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Calendar, MapPin, Clock, Loader2 } from 'lucide-react'
import { useTranslation } from '@/hooks/useTranslation'
import { useEventValidation } from '@/hooks/useEventValidation'
import { ValidationAlert } from './ValidationAlert'

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

interface EventFormProps {
  mode: 'create' | 'edit'
  initialData?: EventData
  eventId?: string
  onSuccess?: (eventId: string) => void
  onCancel?: () => void
}

const EVENT_TYPES = [
  'Visual Arts & Craft',
  'Traditional Music', 
  'Art Performance',
  'Customs & Ceremonial',
  'Traditional Architecture',
  'Traditional Clothing',
  'Traditional Cuisine',
  'Regional Literature',
  'Destination'
]

export function EventForm({ 
  mode, 
  initialData, 
  eventId, 
  onSuccess, 
  onCancel 
}: EventFormProps) {
  const { tSync } = useTranslation()
  const router = useRouter()
  
  const [formData, setFormData] = useState<EventData>({
    name: '',
    description: '',
    types: [],
    place_name: '',
    latitude: undefined,
    longitude: undefined,
    start_datetime: '',
    end_datetime: '',
    images: [],
    links: []
  })

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Initialize form with initial data
  useEffect(() => {
    if (initialData) {
      setFormData(initialData)
    }
  }, [initialData])

  // Real-time validation
  const {
    validationResult,
    isValidating,
    error: validationError,
    hasWarnings,
    hasSuggestions,
    isRejected,
    isPendingReview,
    isApproved
  } = useEventValidation({
    eventData: formData,
    enabled: formData.description.length >= 50
  })

  const handleInputChange = (field: keyof EventData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    
    // Clear field error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  const handleTypeChange = (type: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      types: checked 
        ? [...prev.types, type]
        : prev.types.filter(t => t !== type)
    }))
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) {
      newErrors.name = tSync('form.errors.nameRequired', 'Event name is required')
    }

    if (!formData.description.trim()) {
      newErrors.description = tSync('form.errors.descriptionRequired', 'Event description is required')
    } else if (formData.description.length < 50) {
      newErrors.description = tSync('form.errors.descriptionMinLength', 'Description must be at least 50 characters')
    }

    if (formData.types.length === 0) {
      newErrors.types = tSync('form.errors.typesRequired', 'Please select at least one event type')
    }

    if (!formData.place_name.trim()) {
      newErrors.place_name = tSync('form.errors.placeRequired', 'Event location is required')
    }

    if (!formData.start_datetime) {
      newErrors.start_datetime = tSync('form.errors.startDateRequired', 'Start date is required')
    }

    if (!formData.end_datetime) {
      newErrors.end_datetime = tSync('form.errors.endDateRequired', 'End date is required')
    }

    // Validate date logic
    if (formData.start_datetime && formData.end_datetime) {
      const startDate = new Date(formData.start_datetime)
      const endDate = new Date(formData.end_datetime)
      const now = new Date()

      if (startDate < now) {
        newErrors.start_datetime = tSync('form.errors.startDatePast', 'Start date cannot be in the past')
      }

      if (endDate <= startDate) {
        newErrors.end_datetime = tSync('form.errors.endDateAfterStart', 'End date must be after start date')
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    // Check if validation is approved
    if (!isApproved) {
      return
    }

    setIsSubmitting(true)

    try {
      // TODO: Replace with actual API endpoint
      const response = await fetch(`http://localhost:3001/api/events${mode === 'edit' ? `/${eventId}` : ''}`, {
        method: mode === 'edit' ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error('Failed to submit event')
      }

      const result: { data: { id: string } } = await response.json()
      const submittedEventId = result.data.id
      
      onSuccess?.(submittedEventId)
      router.push(`/events/${submittedEventId}`)
    } catch (error) {
      console.error('Form submission error:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleApplySuggestion = (suggestion: string) => {
    // Simple suggestion application - can be enhanced
    if (suggestion.toLowerCase().includes('description')) {
      setFormData(prev => ({
        ...prev,
        description: prev.description + ' ' + suggestion
      }))
    }
  }

  const isFormValid = formData.name && 
    formData.description.length >= 50 && 
    formData.types.length > 0 && 
    formData.place_name && 
    formData.start_datetime && 
    formData.end_datetime

  // Button is disabled if form is invalid OR validation is not approved
  const isSubmitDisabled = !isFormValid || isSubmitting || !isApproved

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-heading text-nusa-dark-brown">
            {mode === 'create' 
              ? tSync('form.createEvent', 'Create New Event')
              : tSync('form.editEvent', 'Edit Event')
            }
          </CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Real-time Validation Alert */}
            <ValidationAlert
              validationResult={validationResult}
              isValidating={isValidating}
              onApplySuggestion={handleApplySuggestion}
            />

            {/* Basic Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-nusa-dark-brown">
                {tSync('form.basicInfo', 'Basic Information')}
              </h3>

              {/* Event Name */}
              <div className="space-y-2">
                <Label htmlFor="name">
                  {tSync('form.eventName', 'Event Name')} *
                </Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder={tSync('form.eventNamePlaceholder', 'Enter event name')}
                  className={errors.name ? 'border-red-500' : ''}
                />
                {errors.name && (
                  <p className="text-sm text-red-600">{errors.name}</p>
                )}
              </div>

              {/* Event Description */}
              <div className="space-y-2">
                <Label htmlFor="description">
                  {tSync('form.description', 'Description')} *
                  <span className="text-sm text-nusa-brown ml-2">
                    ({formData.description.length}/500 characters)
                  </span>
                </Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  placeholder={tSync('form.descriptionPlaceholder', 'Describe your event in detail...')}
                  rows={4}
                  maxLength={500}
                  className={errors.description ? 'border-red-500' : ''}
                />
                {errors.description && (
                  <p className="text-sm text-red-600">{errors.description}</p>
                )}
              </div>

              {/* Event Types */}
              <div className="space-y-2">
                <Label>
                  {tSync('form.eventTypes', 'Event Types')} *
                </Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {EVENT_TYPES.map((type) => (
                    <div key={type} className="flex items-center space-x-2">
                      <Checkbox
                        id={type}
                        checked={formData.types.includes(type)}
                        onCheckedChange={(checked: boolean) => handleTypeChange(type, checked as boolean)}
                      />
                      <Label htmlFor={type} className="text-sm">
                        {type}
                      </Label>
                    </div>
                  ))}
                </div>
                {errors.types && (
                  <p className="text-sm text-red-600">{errors.types}</p>
                )}
              </div>
            </div>

            {/* Location Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-nusa-dark-brown">
                {tSync('form.locationInfo', 'Location Information')}
              </h3>

              <div className="space-y-2">
                <Label htmlFor="place_name">
                  {tSync('form.placeName', 'Place Name')} *
                </Label>
                <Input
                  id="place_name"
                  value={formData.place_name}
                  onChange={(e) => handleInputChange('place_name', e.target.value)}
                  placeholder={tSync('form.placeNamePlaceholder', 'Enter venue or location name')}
                  className={errors.place_name ? 'border-red-500' : ''}
                />
                {errors.place_name && (
                  <p className="text-sm text-red-600">{errors.place_name}</p>
                )}
              </div>

              {/* TODO: Add Google Maps integration for coordinates */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="latitude">
                    {tSync('form.latitude', 'Latitude')}
                  </Label>
                  <Input
                    id="latitude"
                    type="number"
                    step="any"
                    value={formData.latitude || ''}
                    onChange={(e) => handleInputChange('latitude', parseFloat(e.target.value) || undefined)}
                    placeholder="-6.2088"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="longitude">
                    {tSync('form.longitude', 'Longitude')}
                  </Label>
                  <Input
                    id="longitude"
                    type="number"
                    step="any"
                    value={formData.longitude || ''}
                    onChange={(e) => handleInputChange('longitude', parseFloat(e.target.value) || undefined)}
                    placeholder="106.8456"
                  />
                </div>
              </div>
            </div>

            {/* Date and Time */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-nusa-dark-brown">
                {tSync('form.dateTimeInfo', 'Date & Time')}
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="start_datetime">
                    {tSync('form.startDateTime', 'Start Date & Time')} *
                  </Label>
                  <Input
                    id="start_datetime"
                    type="datetime-local"
                    value={formData.start_datetime}
                    onChange={(e) => handleInputChange('start_datetime', e.target.value)}
                    className={errors.start_datetime ? 'border-red-500' : ''}
                  />
                  {errors.start_datetime && (
                    <p className="text-sm text-red-600">{errors.start_datetime}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="end_datetime">
                    {tSync('form.endDateTime', 'End Date & Time')} *
                  </Label>
                  <Input
                    id="end_datetime"
                    type="datetime-local"
                    value={formData.end_datetime}
                    onChange={(e) => handleInputChange('end_datetime', e.target.value)}
                    className={errors.end_datetime ? 'border-red-500' : ''}
                  />
                  {errors.end_datetime && (
                    <p className="text-sm text-red-600">{errors.end_datetime}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Additional Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-nusa-dark-brown">
                {tSync('form.additionalInfo', 'Additional Information')}
              </h3>

              <div className="space-y-2">
                <Label htmlFor="links">
                  {tSync('form.externalLinks', 'External Links')}
                </Label>
                <Input
                  id="links"
                  value={formData.links?.join(', ') || ''}
                  onChange={(e) => handleInputChange('links', e.target.value.split(',').map(s => s.trim()).filter(Boolean))}
                  placeholder={tSync('form.linksPlaceholder', 'https://example.com, https://another-link.com')}
                />
                <p className="text-xs text-nusa-brown">
                  {tSync('form.linksHelp', 'Separate multiple links with commas')}
                </p>
              </div>
            </div>

            {/* Form Actions */}
            <div className="flex items-center justify-between pt-6 border-t">
              <div className="flex items-center gap-4">
                {isSubmitting && (
                  <div className="flex items-center gap-2 text-nusa-brown">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span className="text-sm">
                      {tSync('form.submitting', 'Submitting...')}
                    </span>
                  </div>
                )}
                {!isApproved && isFormValid && (
                  <div className="text-sm text-nusa-brown">
                    {tSync('form.waitingValidation', 'Waiting for content validation...')}
                  </div>
                )}
              </div>

              <div className="flex gap-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={onCancel}
                  disabled={isSubmitting}
                >
                  {tSync('form.cancel', 'Cancel')}
                </Button>
                <Button
                  type="submit"
                  disabled={isSubmitDisabled}
                  className="bg-nusa-gold hover:bg-nusa-gold-dark"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin mr-2" />
                      {tSync('form.submitting', 'Submitting...')}
                    </>
                  ) : (
                    mode === 'create' 
                      ? tSync('form.createEvent', 'Create Event')
                      : tSync('form.updateEvent', 'Update Event')
                  )}
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
} 