'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Calendar, MapPin, Clock, ExternalLink } from 'lucide-react'
import { useTranslation } from '@/hooks/useTranslation'

interface Event {
  id: string
  name: string
  types: string[]
  description: string
  images: string[]
  links?: string[] | null
  place_name?: string
  latitude?: number | null
  longitude?: number | null
  start_datetime: string
  end_datetime: string
  created_by: string | null
  created_at: string
  updated_at: string
}

interface EventCardProps {
  event: Event
  status: 'upcoming' | 'ongoing' | 'past'
}

// Helper function to get display name for a type
const getDisplayName = (type: string): string => {
  return type.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
}

export function EventCard({ event, status }: EventCardProps) {
  const { tSync } = useTranslation()

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })
  }

  const formatTime = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleTimeString('id-ID', {
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'upcoming':
        return 'default'
      case 'ongoing':
        return 'secondary'
      case 'past':
        return 'outline'
      default:
        return 'default'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'upcoming':
        return tSync('events.status.upcoming', 'Upcoming')
      case 'ongoing':
        return tSync('events.status.ongoing', 'Ongoing')
      case 'past':
        return tSync('events.status.past', 'Past')
      default:
        return ''
    }
  }

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 hover:scale-[1.02] border-nusa-gold/20 hover:border-nusa-gold/40 bg-white/80 backdrop-blur-sm">
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between gap-4">
          <CardTitle className="text-xl font-heading font-semibold text-nusa-dark-brown group-hover:text-nusa-gold transition-colors duration-300 line-clamp-2">
            {event.name}
          </CardTitle>
          <Badge 
            variant={getStatusBadgeVariant(status)}
            className="shrink-0"
          >
            {getStatusText(status)}
          </Badge>
        </div>
        
        {/* Event Types */}
        <div className="flex flex-wrap gap-2 mt-3">
          {event.types.map((type, index) => (
            <Badge 
              key={index} 
              variant="outline" 
              className="text-xs bg-nusa-cream border-nusa-gold/30 text-nusa-brown hover:bg-nusa-gold/10"
            >
              {getDisplayName(type)}
            </Badge>
          ))}
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Event Image Placeholder */}
        <div className="relative aspect-video bg-gradient-to-br from-nusa-cream to-nusa-beige rounded-lg overflow-hidden">
          <img src={`/community-hub.svg`} alt="" />
        </div>

        {/* Description */}
        <p className="text-nusa-brown text-sm line-clamp-3">
          {event.description}
        </p>

        {/* Event Details */}
        <div className="space-y-3">
          {/* Date & Time */}
          <div className="flex items-start gap-3 text-sm">
            <Calendar className="w-4 h-4 text-nusa-gold mt-0.5 shrink-0" />
            <div className="flex-1">
              <div className="font-medium text-nusa-dark-brown">
                {formatDate(event.start_datetime)}
              </div>
              <div className="text-nusa-brown">
                {formatTime(event.start_datetime)} - {formatTime(event.end_datetime)}
              </div>
            </div>
          </div>

          {/* Location */}
          {event.place_name && (
            <div className="flex items-start gap-3 text-sm">
              <MapPin className="w-4 h-4 text-nusa-gold mt-0.5 shrink-0" />
              <div className="flex-1">
                <div className="font-medium text-nusa-dark-brown">
                  {event.place_name}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 pt-2">
          {event.links && event.links.length > 0 && (
            <a
              href={event.links[0]}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm font-medium text-nusa-gold hover:text-nusa-gold-dark transition-colors duration-300"
            >
              <ExternalLink className="w-4 h-4" />
              {tSync('events.learnMore', 'Learn More')}
            </a>
          )}
        </div>
      </CardContent>
    </Card>
  )
} 