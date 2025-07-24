'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Search, RotateCcw, Filter } from 'lucide-react'

interface MapControlsProps {
  searchQuery: string
  onSearch: (query: string) => void
  onResetView: () => void
  isLoading: boolean
}

export function MapControls({ searchQuery, onSearch, onResetView, isLoading }: MapControlsProps) {
  const [localQuery, setLocalQuery] = useState(searchQuery)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    onSearch(localQuery)
  }

  return (
    <div className="mb-8 bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-nusa-gold/20 shadow-lg">
      <div className="flex flex-col md:flex-row gap-4 items-center">
        {/* Search */}
        <form onSubmit={handleSearch} className="flex-1 flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-nusa-brown w-4 h-4" />
            <Input
              type="text"
              placeholder="Cari provinsi, kota, atau tempat wisata..."
              value={localQuery}
              onChange={(e) => setLocalQuery(e.target.value)}
              className="pl-10 border-nusa-gold/30 focus:border-nusa-gold"
              disabled={isLoading}
            />
          </div>
          <Button 
            type="submit" 
            disabled={isLoading}
            className="bg-nusa-gold hover:bg-nusa-bronze text-white"
          >
            Cari
          </Button>
        </form>

        {/* Controls */}
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={onResetView}
            className="border-nusa-gold/30 hover:bg-nusa-gold/10"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Reset
          </Button>
          
          <Button
            variant="outline"
            className="border-nusa-gold/30 hover:bg-nusa-gold/10"
          >
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
        </div>
      </div>
    </div>
  )
}