'use client'

import { useState } from 'react'
import { EventCard } from '@/components/features/events/EventCard'
import { EventFilter } from '@/components/features/events/EventFilter'
import { EventForm } from '@/components/features/events/EventForm'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { useTranslation } from '@/hooks/useTranslation'
import { useAuthStore } from '@/store/auth.store'

// Dummy data based on the database schema
const dummyEvents = [
  {
    id: '1',
    name: 'Nusantara Culture Festival 2024',
    types: ['Cultural', 'Festival'],
    description: 'The largest cultural festival showcasing the diversity of Indonesian culture from various regions.',
    images: '/community-hub.svg',
    links: ['https://festival-budaya.com'],
    place_name: 'Taman Mini Indonesia Indah',
    latitude: -6.3024,
    longitude: 106.8472,
    start_datetime: '2024-12-15T09:00:00Z',
    end_datetime: '2024-12-17T22:00:00Z',
    created_by: 'user-1',
    created_at: '2024-11-01T10:00:00Z',
    updated_at: '2024-11-01T10:00:00Z'
  },
  {
    id: '2',
    name: 'Traditional Batik Workshop',
    types: ['Workshop', 'Craft'],
    description: 'Learn traditional batik techniques with experienced batik artisans.',
    images: '/community-hub.svg',
    links: ['https://workshop-batik.com'],
    place_name: 'Jogja Batik Studio',
    latitude: -7.7971,
    longitude: 110.3708,
    start_datetime: '2024-11-20T08:00:00Z',
    end_datetime: '2026-11-20T16:00:00Z',
    created_by: 'user-2',
    created_at: '2024-10-15T14:30:00Z',
    updated_at: '2024-10-15T14:30:00Z'
  },
  {
    id: '3',
    name: 'Contemporary Art Exhibition',
    types: ['Exhibition', 'Art'],
    description: 'A contemporary art exhibition featuring works by Indonesian artists.',
    images: '/community-hub.svg',
    links: ['https://pameran-seni.com'],
    place_name: 'National Gallery of Indonesia',
    latitude: -6.1751,
    longitude: 106.8650,
    start_datetime: '2025-10-10T10:00:00Z',
    end_datetime: '2025-11-25T18:00:00Z',
    created_by: 'user-3',
    created_at: '2024-09-20T09:15:00Z',
    updated_at: '2024-09-20T09:15:00Z'
  },
  {
    id: '4',
    name: 'Traditional Music Concert',
    types: ['Concert', 'Music'],
    description: 'A traditional music concert featuring Indonesian traditional musical instruments.',
    images: '/community-hub.svg',
    links: ['https://konser-tradisional.com'],
    place_name: 'Auditorium of University of Indonesia',
    latitude: -6.3621,
    longitude: 106.8226,
    start_datetime: '2024-12-01T19:00:00Z',
    end_datetime: '2024-12-01T22:00:00Z',
    created_by: 'user-4',
    created_at: '2026-11-05T16:45:00Z',
    updated_at: '2027-11-05T16:45:00Z'
  },
  {
    id: '5',
    name: 'Nusantara History Seminar',
    types: ['Seminar', 'Education'],
    description: 'A seminar discussing the history and development of Nusantara culture from time to time.',
    images: '/community-hub.svg',
    links: ['https://seminar-sejarah.com'],
    place_name: 'Seminar Room, Gadjah Mada University',
    latitude: -7.7731,
    longitude: 110.3748,
    start_datetime: '2024-11-30T08:30:00Z',
    end_datetime: '2024-11-30T17:00:00Z',
    created_by: 'user-5',
    created_at: '2024-10-25T11:20:00Z',
    updated_at: '2024-10-25T11:20:00Z'
  },
  {
    id: '6',
    name: 'Wayang Kulit Performance',
    types: ['Performance', 'Traditional'],
    description: 'A wayang kulit performance by a famous puppeteer featuring the Mahabharata story.',
    images: '/community-hub.svg',
    links: ['https://wayang-kulit.com'],
    place_name: 'Pendopo Agung, Yogyakarta Palace',
    latitude: -7.8097,
    longitude: 110.3647,
    start_datetime: '2024-10-05T19:00:00Z',
    end_datetime: '2024-10-05T23:00:00Z',
    created_by: 'user-6',
    created_at: '2024-09-10T13:40:00Z',
    updated_at: '2024-09-10T13:40:00Z'
  }
]

export function EventsSection() {
  const { tSync } = useTranslation()
  const [filteredEvents, setFilteredEvents] = useState(dummyEvents)
  const [selectedStatus, setSelectedStatus] = useState<string>('all')
  const [selectedType, setSelectedType] = useState<string>('all')
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [showEditForm, setShowEditForm] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState<any>(null)
  const { user } = useAuthStore()
  const isCreator = user?.role === 'creator'

  const getEventStatus = (startDate: string, endDate: string) => {
    const now = new Date()
    const start = new Date(startDate)
    const end = new Date(endDate)
    
    if (now < start) return 'upcoming'
    if (now >= start && now <= end) return 'ongoing'
    return 'past'
  }

  const filterEvents = (status: string, type: string) => {
    let filtered = dummyEvents

    if (status !== 'all') {
      filtered = filtered.filter(event => {
        const eventStatus = getEventStatus(event.start_datetime, event.end_datetime)
        return eventStatus === status
      })
    }

    if (type !== 'all') {
      filtered = filtered.filter(event => 
        event.types.some(eventType => 
          eventType.toLowerCase() === type.toLowerCase()
        )
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

  const handleCreateSuccess = (eventId: string) => {
    setShowCreateForm(false)
    // You can add toast notification here
    // Optionally refresh the events list
  }

  const handleEditSuccess = (eventId: string) => {
    setShowEditForm(false)
    setSelectedEvent(null)
    // You can add toast notification here
    // Optionally refresh the events list
  }

  const handleEditEvent = (event: any) => {
    setSelectedEvent(event)
    setShowEditForm(true)
  }

  // Show create form
  if (showCreateForm) {
    return (
      <div className="min-h-screen bg-nusa-cream py-8">
        <EventForm
          mode="create"
          onSuccess={handleCreateSuccess}
          onCancel={() => setShowCreateForm(false)}
        />
      </div>
    )
  }

  // Show edit form
  if (showEditForm && selectedEvent) {
    return (
      <div className="min-h-screen bg-nusa-cream py-8">
        <EventForm
          mode="edit"
          initialData={selectedEvent}
          eventId={selectedEvent.id}
          onSuccess={handleEditSuccess}
          onCancel={() => {
            setShowEditForm(false)
            setSelectedEvent(null)
          }}
        />
      </div>
    )
  }

  return (
    <section className="py-16 px-4">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-nusa-dark-brown mb-4">
            {tSync('events.title', 'Events & Activities')}
          </h1>
          <p className="text-lg text-nusa-brown max-w-3xl mx-auto">
            {tSync('events.subtitle', 'Discover cultural events, workshops, and activities that celebrate the rich heritage of Indonesia')}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center mb-8">
          {isCreator && (
            <Button
              onClick={() => setShowCreateForm(true)}
              className="bg-nusa-gold hover:bg-nusa-gold-dark"
            >
              <Plus className="h-4 w-4 mr-2" />
              {tSync('events.createNew', 'Create New Event')}
            </Button>
          )}
        </div>

        {/* Filters */}
        <EventFilter 
          selectedStatus={selectedStatus}
          selectedType={selectedType}
          onStatusChange={handleStatusChange}
          onTypeChange={handleTypeChange}
        />

        {/* Events Grid */}
        <div className="mt-12">
          {filteredEvents.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-nusa-brown text-lg mb-4">
                {tSync('events.noEvents', 'No events found matching your criteria')}
              </div>
              <button 
                onClick={() => {
                  setSelectedStatus('all')
                  setSelectedType('all')
                  setFilteredEvents(dummyEvents)
                }}
                className="text-nusa-gold hover:text-nusa-gold-dark font-medium underline"
              >
                {tSync('events.clearFilters', 'Clear all filters')}
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
      </div>
    </section>
  )
} 