'use client'

import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Filter, Calendar, Clock, CheckCircle } from 'lucide-react'
import { useTranslation } from '@/hooks/useTranslation'
import { useEvents } from '@/hooks/useEvents'

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

// Helper function to normalize type names
const normalizeTypeName = (type: string): string => {
  return type.toLowerCase().replace(/_/g, ' ').replace(/\s+/g, ' ').trim()
}

// Helper function to get display name for a type
const getDisplayName = (type: string): string => {
  return type.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
}

export function EventFilter({ 
  selectedStatus, 
  selectedType, 
  onStatusChange, 
  onTypeChange 
}: EventFilterProps) {
  const { tSync } = useTranslation()
  const { events } = useEvents()

  // Generate type options dynamically from events data with grouping
  const getTypeOptions = () => {
    const typeGroups = new Map<string, string[]>()
    
    events.forEach(event => {
      event.types.forEach(type => {
        const normalized = normalizeTypeName(type)
        if (!typeGroups.has(normalized)) {
          typeGroups.set(normalized, [])
        }
        if (!typeGroups.get(normalized)!.includes(type)) {
          typeGroups.get(normalized)!.push(type)
        }
      })
    })

    const typeOptions = [
      { value: 'all', label: 'All Types' },
      ...Array.from(typeGroups.entries()).sort().map(([normalized, types]) => {
        // Use the most readable version as display name
        const displayName = getDisplayName(types[0])
        // Use the normalized name as value for filtering
        return {
          value: normalized,
          label: displayName,
          originalTypes: types
        }
      })
    ]

    return typeOptions
  }

  const typeOptions = getTypeOptions()

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