'use client'

import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Filter, Calendar, Clock, CheckCircle } from 'lucide-react'
import { useTranslation } from '@/hooks/useTranslation'

interface EventFilterProps {
  selectedStatus: string
  selectedType: string
  onStatusChange: (status: string) => void
  onTypeChange: (type: string) => void
}

const statusOptions = [
  { value: 'all', label: 'All Events', icon: Calendar },
  { value: 'upcoming', label: 'Upcoming', icon: Calendar },
  { value: 'ongoing', label: 'Ongoing', icon: Clock },
  { value: 'past', label: 'Past', icon: CheckCircle }
]

const typeOptions = [
  { value: 'all', label: 'All Types' },
  { value: 'cultural', label: 'Cultural' },
  { value: 'festival', label: 'Festival' },
  { value: 'workshop', label: 'Workshop' },
  { value: 'exhibition', label: 'Exhibition' },
  { value: 'concert', label: 'Concert' },
  { value: 'seminar', label: 'Seminar' },
  { value: 'performance', label: 'Performance' },
  { value: 'art', label: 'Art' },
  { value: 'music', label: 'Music' },
  { value: 'education', label: 'Education' },
  { value: 'traditional', label: 'Traditional' },
  { value: 'craft', label: 'Craft' }
]

export function EventFilter({ 
  selectedStatus, 
  selectedType, 
  onStatusChange, 
  onTypeChange 
}: EventFilterProps) {
  const { tSync } = useTranslation()

  return (
    <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 border border-nusa-gold/20">
      <div className="flex items-center gap-2 mb-6">
        <Filter className="w-5 h-5 text-nusa-gold" />
        <h3 className="text-lg font-heading font-semibold text-nusa-dark-brown">
          {tSync('events.filter.title', 'Filter Events')}
        </h3>
      </div>

      <div className="space-y-6">
        {/* Status Filter */}
        <div>
          <h4 className="text-sm font-medium text-nusa-dark-brown mb-3">
            {tSync('events.filter.status', 'Event Status')}
          </h4>
          <div className="flex flex-wrap gap-2">
            {statusOptions.map((option) => {
              const Icon = option.icon
              return (
                <Button
                  key={option.value}
                  variant={selectedStatus === option.value ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => onStatusChange(option.value)}
                  className={`
                    ${selectedStatus === option.value 
                      ? 'bg-nusa-gold hover:bg-nusa-gold-dark text-white border-nusa-gold' 
                      : 'border-nusa-gold/30 text-nusa-brown hover:bg-nusa-gold/10 hover:border-nusa-gold hover:text-nusa-gold'
                    }
                    transition-all duration-300
                  `}
                >
                  <Icon className="w-4 h-4 mr-2" />
                  {tSync(`events.filter.status.${option.value}`, option.label)}
                </Button>
              )
            })}
          </div>
        </div>

        {/* Type Filter */}
        <div>
          <h4 className="text-sm font-medium text-nusa-dark-brown mb-3">
            {tSync('events.filter.type', 'Event Type')}
          </h4>
          <div className="flex flex-wrap gap-2">
            {typeOptions.map((option) => (
              <Button
                key={option.value}
                variant={selectedType === option.value ? 'default' : 'outline'}
                size="sm"
                onClick={() => onTypeChange(option.value)}
                className={`
                  ${selectedType === option.value 
                    ? 'bg-nusa-gold hover:bg-nusa-gold-dark text-white border-nusa-gold' 
                    : 'border-nusa-gold/30 text-nusa-brown hover:bg-nusa-gold/10 hover:border-nusa-gold hover:text-nusa-gold'
                  }
                  transition-all duration-300
                `}
              >
                {tSync(`events.filter.type.${option.value}`, option.label)}
              </Button>
            ))}
          </div>
        </div>

        {/* Active Filters Display */}
        {(selectedStatus !== 'all' || selectedType !== 'all') && (
          <div className="pt-4 border-t border-nusa-gold/20">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-sm font-medium text-nusa-dark-brown">
                {tSync('events.filter.active', 'Active Filters')}:
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {selectedStatus !== 'all' && (
                <Badge 
                  variant="secondary" 
                  className="bg-nusa-gold/20 text-nusa-gold border-nusa-gold/30"
                >
                  {tSync(`events.filter.status.${selectedStatus}`, statusOptions.find(s => s.value === selectedStatus)?.label)}
                </Badge>
              )}
              {selectedType !== 'all' && (
                <Badge 
                  variant="secondary" 
                  className="bg-nusa-gold/20 text-nusa-gold border-nusa-gold/30"
                >
                  {tSync(`events.filter.type.${selectedType}`, typeOptions.find(t => t.value === selectedType)?.label)}
                </Badge>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
} 