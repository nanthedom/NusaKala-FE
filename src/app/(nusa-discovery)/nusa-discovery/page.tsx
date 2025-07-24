'use client'

import { useAuth } from '@/hooks/useAuth'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  Map, 
  Calendar, 
  Camera, 
  Users, 
  Trophy,
  TrendingUp,
  MapPin,
  Star
} from 'lucide-react'

export default function NusaDiscoveryPage() {
  const { user } = useAuth(true) 

  if (!user) {
    return <div>Loading...</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Welcome Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-nusa-darkBrown mb-2">
          Selamat datang, {user.username}! 👋
        </h1>
        <p className="text-nusa-brown">
          Mari jelajahi keindahan budaya Indonesia hari ini
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="border-nusa-gold/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-nusa-brown">Streak</p>
                <p className="text-2xl font-bold text-nusa-darkBrown">
                  {user.profile.streak}
                </p>
              </div>
              <div className="w-12 h-12 bg-nusa-gold/20 rounded-lg flex items-center justify-center">
                <Trophy className="w-6 h-6 text-nusa-gold" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-nusa-gold/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-nusa-brown">Poin</p>
                <p className="text-2xl font-bold text-nusa-darkBrown">
                  {user.profile.points}
                </p>
              </div>
              <div className="w-12 h-12 bg-nusa-bronze/20 rounded-lg flex items-center justify-center">
                <Star className="w-6 h-6 text-nusa-bronze" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-nusa-gold/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-nusa-brown">Provinsi Dikunjungi</p>
                <p className="text-2xl font-bold text-nusa-darkBrown">
                  {user.location?.visited_provinces?.length || 0}
                </p>
              </div>
              <div className="w-12 h-12 bg-nusa-green/20 rounded-lg flex items-center justify-center">
                <MapPin className="w-6 h-6 text-nusa-green" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-nusa-gold/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-nusa-brown">Level</p>
                <p className="text-2xl font-bold text-nusa-darkBrown">
                  {Math.floor((user.profile.points || 0) / 100) + 1}
                </p>
              </div>
              <div className="w-12 h-12 bg-nusa-red/20 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-nusa-red" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="border-nusa-gold/20 hover:shadow-lg transition-shadow cursor-pointer">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Map className="w-5 h-5 text-nusa-gold" />
              Nusa Discovery
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-nusa-brown mb-4">
              Jelajahi peta interaktif Indonesia dan temukan budaya unik setiap provinsi
            </p>
            <Button className="w-full bg-nusa-gold hover:bg-nusa-bronze">
              Mulai Jelajah
            </Button>
          </CardContent>
        </Card>

        <Card className="border-nusa-gold/20 hover:shadow-lg transition-shadow cursor-pointer">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-nusa-green" />
              Event Budaya
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-nusa-brown mb-4">
              Temukan dan ikuti event budaya menarik di sekitar Anda
            </p>
            <Button className="w-full bg-nusa-green hover:bg-green-600">
              Lihat Events
            </Button>
          </CardContent>
        </Card>

        <Card className="border-nusa-gold/20 hover:shadow-lg transition-shadow cursor-pointer">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Camera className="w-5 h-5 text-nusa-bronze" />
              Nusa Cam
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-nusa-brown mb-4">
              Scan objek budaya dengan AI untuk mendapat informasi menarik
            </p>
            <Button className="w-full bg-nusa-bronze hover:bg-amber-600">
              Buka Kamera
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}