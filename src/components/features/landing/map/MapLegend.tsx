'use client'

import { Card, CardContent } from '@/components/ui/card'
import { MapPin, Calendar, Camera } from 'lucide-react'

export function MapLegend() {
  return (
    <Card className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm border-nusa-gold/20 shadow-lg">
      <CardContent className="p-4">
        <h4 className="font-medium mb-3 text-sm text-nusa-darkBrown">Legend</h4>
        <div className="space-y-2 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-nusa-red rounded-full border-2 border-white shadow-sm"></div>
            <span className="text-nusa-brown">Province Capital</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-nusa-gold rounded-full border-2 border-white shadow-sm"></div>
            <span className="text-nusa-brown">Selected Province</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-nusa-green rounded border border-white shadow-sm opacity-70"></div>
            <span className="text-nusa-brown">Province Area</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}