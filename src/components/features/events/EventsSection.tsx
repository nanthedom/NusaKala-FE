/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useState } from 'react'
import { EventCard } from '@/components/features/events/EventCard'
import { EventFilter } from '@/components/features/events/EventFilter'
import { EventForm } from '@/components/features/events/EventForm'
import { Button } from '@/components/ui/button'
import { Plus, Loader2, AlertCircle, X } from 'lucide-react'
import { useTranslation } from '@/hooks/useTranslation'
import { useEvents, type Event } from '@/hooks/useEvents'
import React from 'react'

export function EventsSection() {
  const { tSync } = useTranslation()
  const { events, loading, error, refetch } = useEvents()
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([])
  const [selectedStatus, setSelectedStatus] = useState<string>('all')
  const [selectedType, setSelectedType] = useState<string>('all')
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [showEditForm, setShowEditForm] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null)

  const getEventStatus = (startDate: string, endDate: string) => {
    const now = new Date()
    const start = new Date(startDate)
    const end = new Date(endDate)
    
    if (now < start) return 'upcoming'
    if (now >= start && now <= end) return 'ongoing'
    return 'past'
  }

  const filterEvents = (status: string, type: string) => {
    let filtered = events

    if (status !== 'all') {
      filtered = filtered.filter(event => {
        const eventStatus = getEventStatus(event.start_datetime, event.end_datetime)
        return eventStatus === status
      })
    }

    if (type !== 'all') {
      filtered = filtered.filter(event => 
        event.types.some(eventType => {
          // Normalize both the event type and the selected type for comparison
          const normalizedEventType = eventType.toLowerCase().replace(/_/g, ' ').replace(/\s+/g, ' ').trim()
          const normalizedSelectedType = type.toLowerCase().replace(/_/g, ' ').replace(/\s+/g, ' ').trim()
          return normalizedEventType === normalizedSelectedType
        })
      )
    }

    setFilteredEvents(filtered)
  }

  const handleStatusChange = (status: string) => {
    setSelectedStatus(status)
    filterEvents(status, selectedType)
  }

  const handleTypeChange = (type: string) => {
    setSelectedType(type)
    filterEvents(selectedStatus, type)
  }

  const handleCreateEvent = () => {
    setShowCreateForm(true)
    setShowEditForm(false)
    setSelectedEvent(null)
  }

  const handleEditEvent = (event: Event) => {
    setSelectedEvent(event)
    setShowEditForm(true)
    setShowCreateForm(false)
  }

  const handleFormClose = () => {
    setShowCreateForm(false)
    setShowEditForm(false)
    setSelectedEvent(null)
  }

  const handleEventCreated = () => {
    refetch()
    handleFormClose()
  }

  const handleEventUpdated = () => {
    refetch()
    handleFormClose()
  }

  // Initialize filtered events when events data changes
  React.useEffect(() => {
    if (events.length > 0) {
      filterEvents(selectedStatus, selectedType)
    }
  }, [events, selectedStatus, selectedType])

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center space-y-4">
          <Loader2 className="h-8 w-8 animate-spin text-nusa-gold mx-auto" />
          <p className="text-nusa-brown">Loading events...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center space-y-4">
          <AlertCircle className="h-8 w-8 text-red-500 mx-auto" />
          <p className="text-red-600">Failed to load events</p>
          <Button onClick={refetch} variant="outline">
            Try Again
          </Button>
        </div>
      </div>
    )
  }

  return (
    <>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-nusa-dark-brown">
              {tSync('events.title', 'Cultural Events')}
            </h2>
            <p className="text-nusa-brown">
              {tSync('events.description', 'Discover and participate in cultural events across Indonesia')}
            </p>
          </div>
          <Button 
            onClick={handleCreateEvent}
            className="bg-nusa-gold hover:bg-nusa-bronze text-white"
          >
            <Plus className="h-4 w-4 mr-2" />
            {tSync('events.create', 'Create Event')}
          </Button>
        </div>

        {/* Filters */}
        <EventFilter
          selectedStatus={selectedStatus}
          selectedType={selectedType}
          onStatusChange={handleStatusChange}
          onTypeChange={handleTypeChange}
        />

        {/* Events Grid */}
        {filteredEvents.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-nusa-brown">
              {tSync('events.noEvents', 'No events found matching your criteria')}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map((event) => (
              <EventCard
                key={event.id}
                event={event}
                status={getEventStatus(event.start_datetime, event.end_datetime)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Create Event Modal */}
      {showCreateForm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-nusa-dark-brown">
                {tSync('events.create', 'Create New Event')}
              </h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleFormClose}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
            <div className="p-6">
              <EventForm
                mode="create"
                onSuccess={handleEventCreated}
                onCancel={handleFormClose}
              />
            </div>
          </div>
        </div>
      )}

      {/* Edit Event Modal */}
      {showEditForm && selectedEvent && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-nusa-dark-brown">
                {tSync('events.edit', 'Edit Event')}
              </h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleFormClose}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
            <div className="p-6">
              <EventForm
                mode="edit"
                initialData={{
                  name: selectedEvent.name,
                  description: selectedEvent.description,
                  types: selectedEvent.types,
                  place_name: selectedEvent.place_name,
                  latitude: selectedEvent.latitude || undefined,
                  longitude: selectedEvent.longitude || undefined,
                  start_datetime: selectedEvent.start_datetime,
                  end_datetime: selectedEvent.end_datetime,
                  created_by: selectedEvent.created_by || '',
                  images: selectedEvent.images,
                  links: selectedEvent.links || []
                }}
                eventId={selectedEvent.id}
                onSuccess={handleEventUpdated}
                onCancel={handleFormClose}
              />
            </div>
          </div>
        </div>
      )}
    </>
  )
} 