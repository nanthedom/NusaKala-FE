"use client"

import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { MapPin, Users, Calendar } from 'lucide-react'
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
  ]

  return (
    <section className="py-20 bg-gradient-accent relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,rgba(212,175,55,0.2),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_75%,rgba(205,127,50,0.2),transparent_50%)]"></div>
      </div>

      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-extrabold text-nusa-dark-brown mb-6 tracking-tight">
            {tSync('map.title.part1', 'Explore')} <span className="text-gradient-primary">{tSync('map.title.part2', 'Nusantara')}</span>
          </h2>
          <p className="text-lg text-nusa-brown max-w-3xl mx-auto leading-relaxed">
            {tSync('map.description', 'Click on the map to explore the cultural wealth of each province in Indonesia. Discover festivals, historical sites, and captivating local uniqueness.')}
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 items-start">
          <div className="lg:col-span-2">
            <div className="relative rounded-3xl shadow-2xl border border-nusa-gold/20 overflow-hidden bg-white/90 backdrop-blur-sm">
              <Map
                initialViewState={{
                  latitude: -2.5489,
                  longitude: 118.0149,
                  zoom: 4.2
                }}
                mapboxAccessToken={MAPBOX_TOKEN}
                style={{ width: '100%', height: 500 }}
                mapStyle="mapbox://styles/mapbox/light-v11"
              >
                <NavigationControl position="top-left" />
                {provinces.map((province) => (
                  <Marker
                    key={province.id}
                    longitude={province.coordinates[1]}
                    latitude={province.coordinates[0]}
                    anchor="bottom"
                  >
                    <div
                      className="relative cursor-pointer group"
                      onClick={() => setSelectedProvince(province)}
                      title={province.name}
                    >
                      <div className="w-6 h-6 bg-gradient-primary rounded-full border-3 border-white shadow-nusa-gold group-hover:shadow-nusa-bronze transition-all duration-300 group-hover:scale-110 animate-pulse">
                        <div className="absolute inset-1 bg-white rounded-full"></div>
                      </div>
                      <div className="absolute inset-0 w-6 h-6 bg-nusa-gold/30 rounded-full animate-ping"></div>
                    </div>
                  </Marker>
                ))}
              </Map>
            </div>
          </div>

          <div className="space-y-6">
            {selectedProvince ? (
              <Card className="border-nusa-gold/30 shadow-xl animate-slide-in-right bg-white/95 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center shadow-nusa-gold">
                        <MapPin className="h-5 w-5 text-white" />
                      </div>
                      <h3 className="text-xl font-bold text-nusa-dark-brown tracking-tight">
                        {selectedProvince.name}
                      </h3>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-4 bg-gradient-accent rounded-xl border border-nusa-beige/50">
                        <div className="w-8 h-8 bg-nusa-gold/20 rounded-full flex items-center justify-center mx-auto mb-2">
                          <Calendar className="h-4 w-4 text-nusa-gold" />
                        </div>
                        <div className="font-bold text-nusa-dark-brown text-xl">{selectedProvince.eventsCount}</div>
                        <div className="text-xs text-nusa-brown font-medium">{tSync('map.stats.events', 'Events')}</div>
                      </div>
                      <div className="text-center p-4 bg-gradient-accent rounded-xl border border-nusa-beige/50">
                        <div className="w-8 h-8 bg-nusa-bronze/20 rounded-full flex items-center justify-center mx-auto mb-2">
                          <Users className="h-4 w-4 text-nusa-bronze" />
                        </div>
                        <div className="font-bold text-nusa-dark-brown text-xl">{selectedProvince.sitesCount}</div>
                        <div className="text-xs text-nusa-brown font-medium">{tSync('map.stats.sites', 'Cultural Sites')}</div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-bold text-nusa-dark-brown mb-3">{tSync('map.highlights', 'Cultural Highlights')}</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedProvince.culturalHighlights.map((highlight, index) => (
                          <Badge 
                            key={index} 
                            variant="secondary" 
                            className="bg-nusa-gold/10 text-nusa-dark-brown border border-nusa-gold/30 hover:bg-nusa-gold/20 transition-colors"
                          >
                            {highlight}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <Button 
                      className="w-full bg-gradient-primary hover:bg-gradient-secondary text-white py-3 rounded-xl shadow-nusa-gold hover:shadow-nusa-bronze transition-all duration-300 hover:scale-105 font-medium"
                      asChild
                    >
                      <Link href={`/nusa-discovery/${selectedProvince.id}`}>
                        {tSync('map.explore', 'Explore')} {selectedProvince.name}
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card className="border-nusa-gold/30 shadow-xl bg-white/95 backdrop-blur-sm">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-gradient-accent rounded-full flex items-center justify-center mx-auto mb-4 border border-nusa-gold/20">
                    <MapPin className="h-8 w-8 text-nusa-gold/60" />
                  </div>
                  <h3 className="text-xl font-bold text-nusa-dark-brown mb-3 tracking-tight">
                    {tSync('map.selectProvince', 'Select a Province')}
                  </h3>
                  <p className="text-nusa-brown leading-relaxed">
                    {tSync('map.selectDescription', 'Click on any province marker in the map to explore its rich cultural heritage and discover local treasures.')}
                  </p>
                  <div className="mt-6 pt-4 border-t border-nusa-gold/20">
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <div className="font-bold text-nusa-dark-brown">34</div>
                        <div className="text-xs text-nusa-brown">{tSync('map.totalProvinces', 'Provinces')}</div>
                      </div>
                      <div>
                        <div className="font-bold text-nusa-dark-brown">1000+</div>
                        <div className="text-xs text-nusa-brown">{tSync('map.totalSites', 'Sites')}</div>
                      </div>
                      <div>
                        <div className="font-bold text-nusa-dark-brown">500+</div>
                        <div className="text-xs text-nusa-brown">{tSync('map.totalEvents', 'Events')}</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}