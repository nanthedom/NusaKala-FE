"use client"

import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { MapPin, Users, Calendar, Compass } from 'lucide-react'
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import Map, { Marker, NavigationControl } from 'react-map-gl/mapbox';
import 'mapbox-gl/dist/mapbox-gl.css';
import { useTranslation } from '@/hooks/useTranslation'

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || ''; 

interface Province {
  id: string
  name: string
  coordinates: [number, number]
  culturalHighlights: string[]
  eventsCount: number
  sitesCount: number
}

export function InteractiveMap() {
  const { tSync } = useTranslation()
  const [selectedProvince, setSelectedProvince] = useState<Province | null>(null)

  const provinces: Province[] = [
    {
      id: 'jakarta',
      name: 'DKI Jakarta',
      coordinates: [-6.2088, 106.8456],
      culturalHighlights: ['Betawi Culture', 'National Monument'],
      eventsCount: 45,
      sitesCount: 65,
    },
    {
      id: 'bali',
      name: 'Bali',
      coordinates: [-8.3405, 115.0920],
      culturalHighlights: ['Hindu Temples', 'Traditional Dance'],
      eventsCount: 56,
      sitesCount: 89,
    },
    {
      id: 'jogja',
      name: 'DI Yogyakarta',
      coordinates: [-7.7956, 110.3695],
      culturalHighlights: ['Sultan Palace', 'Batik Art'],
      eventsCount: 38,
      sitesCount: 45,
    },
    {
      id: 'west-java',
      name: 'West Java',
      coordinates: [-6.9147, 107.6098],
      culturalHighlights: ['Sundanese Culture', 'Angklung Music'],
      eventsCount: 42,
      sitesCount: 58,
    },
    {
      id: 'east-java',
      name: 'East Java',
      coordinates: [-7.5360, 112.2384],
      culturalHighlights: ['Javanese Heritage', 'Traditional Crafts'],
      eventsCount: 51,
      sitesCount: 72,
    },
    {
      id: 'north-sumatra',
      name: 'North Sumatra',
      coordinates: [3.5952, 98.6722],
      culturalHighlights: ['Batak Culture', 'Lake Toba'],
      eventsCount: 29,
      sitesCount: 41,
    },
  ]

  return (
    <section className="relative overflow-hidden py-12">
      {/* Decorative background elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(251,146,60,0.3),transparent_60%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_70%,rgba(245,158,11,0.3),transparent_60%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(252,211,77,0.2),transparent_70%)]"></div>
      </div>

      <div className="container mx-auto max-w-7xl px-4">
        {/* Header Section */}
        <div className="relative z-10 mb-8">
          <div className="text-center animate-fade-in-up">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-full flex items-center justify-center shadow-lg">
                <Compass className="h-5 w-5 text-white" />
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-orange-900 tracking-tight">
                {tSync('map.title.part1', 'Explore')} <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-yellow-600">{tSync('map.title.part2', 'Nusantara')}</span>
              </h2>
            </div>
            <p className="text-base md:text-lg text-orange-800/80 max-w-3xl mx-auto leading-relaxed">
              {tSync('map.description', 'Click on the map to explore the cultural wealth of each province in Indonesia. Discover festivals, historical sites, and captivating local uniqueness.')}
            </p>
          </div>
        </div>

        {/* Map Section - Container Width */}
        <div className="relative">
          {/* Map Container - Container Width */}
          <div className="w-full h-[500px] md:h-[600px] lg:h-[700px] relative rounded-2xl overflow-hidden shadow-2xl border border-orange-200/50">
            <div className="absolute inset-0 bg-gradient-to-t from-orange-900/20 via-transparent to-orange-900/10 z-10 pointer-events-none"></div>
            
            <Map
              initialViewState={{
                latitude: -2.5489,
                longitude: 118.0149,
                zoom: 4.5
              }}
              mapboxAccessToken={MAPBOX_TOKEN}
              style={{ width: '100%', height: '100%' }}
              mapStyle="mapbox://styles/mapbox/outdoors-v12"
              attributionControl={false}
            >
              <NavigationControl position="top-right" />
              {provinces.map((province) => (
                <Marker
                  key={province.id}
                  longitude={province.coordinates[1]}
                  latitude={province.coordinates[0]}
                  anchor="bottom"
                >
                  <div
                    className="relative cursor-pointer group z-20"
                    onClick={() => setSelectedProvince(province)}
                    title={province.name}
                  >
                    {/* Main marker */}
                    <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-full border-4 border-white shadow-xl group-hover:shadow-2xl transition-all duration-300 group-hover:scale-125 animate-pulse">
                      <div className="absolute inset-1 bg-white rounded-full"></div>
                      <div className="absolute inset-2 bg-gradient-to-r from-orange-400 to-yellow-400 rounded-full"></div>
                    </div>
                    
                    {/* Animated ping effect */}
                    <div className="absolute inset-0 w-8 h-8 bg-orange-400/40 rounded-full animate-ping"></div>
                    
                    {/* Hover label */}
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                      <div className="bg-white/95 backdrop-blur-sm text-orange-900 px-3 py-1 rounded-lg text-sm font-semibold shadow-lg border border-orange-200">
                        {province.name}
                      </div>
                    </div>
                  </div>
                </Marker>
              ))}
            </Map>
          </div>

          {/* Province Info Overlay */}
          {selectedProvince && (
            <div className="absolute top-4 left-4 right-4 md:top-6 md:left-6 md:right-auto md:w-80 z-30 animate-slide-in-right">
              <Card className="border-orange-200/50 shadow-2xl bg-white/95 backdrop-blur-md">
                <CardContent className="p-5">
                  <div className="space-y-4">
                    {/* Header */}
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-full flex items-center justify-center shadow-lg">
                        <MapPin className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-orange-900 tracking-tight">
                          {selectedProvince.name}
                        </h3>
                        <p className="text-xs text-orange-700">Province of Indonesia</p>
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-2 gap-3">
                      <div className="text-center p-3 bg-gradient-to-br from-orange-50 to-yellow-50 rounded-xl border border-orange-100">
                        <div className="w-8 h-8 bg-orange-200/50 rounded-full flex items-center justify-center mx-auto mb-2">
                          <Calendar className="h-4 w-4 text-orange-600" />
                        </div>
                        <div className="font-bold text-orange-900 text-xl">{selectedProvince.eventsCount}</div>
                        <div className="text-xs text-orange-700 font-medium">{tSync('map.stats.events', 'Cultural Events')}</div>
                      </div>
                      <div className="text-center p-3 bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl border border-yellow-100">
                        <div className="w-8 h-8 bg-yellow-200/50 rounded-full flex items-center justify-center mx-auto mb-2">
                          <Users className="h-4 w-4 text-yellow-600" />
                        </div>
                        <div className="font-bold text-orange-900 text-xl">{selectedProvince.sitesCount}</div>
                        <div className="text-xs text-orange-700 font-medium">{tSync('map.stats.sites', 'Heritage Sites')}</div>
                      </div>
                    </div>

                    {/* Cultural Highlights */}
                    <div>
                      <h4 className="font-semibold text-orange-900 mb-2 flex items-center gap-2 text-sm">
                        <div className="w-2 h-2 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-full"></div>
                        {tSync('map.highlights', 'Cultural Highlights')}
                      </h4>
                      <div className="flex flex-wrap gap-1">
                        {selectedProvince.culturalHighlights.map((highlight, index) => (
                          <Badge 
                            key={index} 
                            variant="secondary" 
                            className="bg-orange-100 text-orange-800 border border-orange-200 hover:bg-orange-200 transition-colors text-xs px-2 py-1"
                          >
                            {highlight}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Action Button */}
                    <Button 
                      className="w-full bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white py-2.5 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 font-medium text-sm"
                      asChild
                    >
                      <Link href={`/nusa-discovery/${selectedProvince.id}`}>
                        {tSync('map.explore', 'Explore')} {selectedProvince.name}
                      </Link>
                    </Button>

                    {/* Close button */}
                    <Button 
                      variant="ghost"
                      size="sm"
                      className="absolute top-2 right-2 text-orange-600 hover:text-orange-800 hover:bg-orange-50 h-6 w-6 p-0"
                      onClick={() => setSelectedProvince(null)}
                    >
                      ✕
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default InteractiveMap