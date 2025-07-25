'use client'

import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { MapPin, Calendar, Camera, TrendingUp } from 'lucide-react'
import { Province } from '@/services/map.service'
import { useTranslation } from '@/hooks/useTranslation'

interface ProvinceInfoPanelProps {
  province: Province | null
  onExplore: (provinceId: string) => void
}

export function ProvinceInfoPanel({ province, onExplore }: ProvinceInfoPanelProps) {
  const { tSync } = useTranslation()

  if (!province) {
    return (
      <Card className="border-nusa-gold/30 shadow-xl sticky top-8">
        <CardContent className="p-6 text-center">
          <MapPin className="h-12 w-12 mx-auto mb-4 text-nusa-gold/50" />
          <h3 className="text-lg font-semibold text-nusa-darkBrown mb-2">
            {tSync('map.selectProvince', 'Pilih Provinsi')}
          </h3>
          <p className="text-nusa-brown text-sm">
            {tSync('map.selectProvinceDesc', 'Klik pada peta atau cari provinsi untuk melihat informasi detail budaya dan tempat wisata.')}
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6 sticky top-8">
      {/* Main Info Card */}
      <Card className="border-nusa-gold/30 shadow-xl animate-slide-in-right">
        <CardContent className="p-0">
          {/* Province Image */}
          <div className="h-48 bg-gradient-to-br from-nusa-gold/20 to-nusa-bronze/20 relative overflow-hidden">
            <div className="absolute inset-0 bg-batik-pattern opacity-10"></div>
            <div className="absolute bottom-4 left-4 right-4">
              <div className="bg-black/50 backdrop-blur-sm rounded-lg p-3 text-white">
                <h3 className="text-xl font-bold">{province.name}</h3>
                <p className="text-sm opacity-90">{province.capital}</p>
              </div>
            </div>
          </div>

          <div className="p-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="text-center p-3 bg-nusa-cream rounded-lg">
                <Calendar className="h-5 w-5 mx-auto mb-2 text-nusa-gold" />
                <div className="font-bold text-nusa-darkBrown">{province.eventsCount}</div>
                <div className="text-xs text-nusa-brown">Events</div>
              </div>
              <div className="text-center p-3 bg-nusa-cream rounded-lg">
                <Camera className="h-5 w-5 mx-auto mb-2 text-nusa-gold" />
                <div className="font-bold text-nusa-darkBrown">{province.sitesCount}</div>
                <div className="text-xs text-nusa-brown">Cultural Sites</div>
              </div>
            </div>

            {/* Description */}
            <p className="text-sm text-nusa-brown mb-4 leading-relaxed">
              {province.description}
            </p>

            {/* Cultural Highlights */}
            <div className="mb-6">
              <h4 className="font-semibold text-nusa-darkBrown mb-3">Cultural Highlights</h4>
              <div className="flex flex-wrap gap-2">
                {province.culturalHighlights.map((highlight, index) => (
                  <Badge 
                    key={index} 
                    variant="secondary" 
                    className="bg-nusa-gold/20 text-nusa-darkBrown hover:bg-nusa-gold/30"
                  >
                    {highlight}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Action Button */}
            <Button 
              className="w-full bg-gradient-to-r from-nusa-gold to-nusa-bronze text-white hover:shadow-lg transition-all duration-300"
              onClick={() => onExplore(province.id)}
            >
              {tSync('map.explore', 'Jelajahi')} {province.name}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Additional Stats Card */}
      <Card className="border-nusa-gold/30 shadow-xl">
        <CardContent className="p-6">
          <h4 className="font-semibold text-nusa-darkBrown mb-4 flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-nusa-gold" />
            {tSync('map.quickStats', 'Statistik Cepat')}
          </h4>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-nusa-brown text-sm">
                {tSync('map.population', 'Populasi')}
              </span>
              <span className="font-semibold text-nusa-darkBrown text-sm">
                {province.population.toLocaleString('id-ID')}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-nusa-brown text-sm">
                {tSync('map.area', 'Luas Wilayah')}
              </span>
              <span className="font-semibold text-nusa-darkBrown text-sm">
                {province.area.toLocaleString('id-ID')} km²
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-nusa-brown text-sm">
                {tSync('map.capital', 'Ibu Kota')}
              </span>
              <span className="font-semibold text-nusa-darkBrown text-sm">
                {province.capital}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}