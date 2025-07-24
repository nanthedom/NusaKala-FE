'use client'

import { useAuth } from '@/hooks/useAuth'
import { useEffect, useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { MapPin, Trophy, Star, TrendingUp } from 'lucide-react'
import dynamic from 'next/dynamic'
import { Leaderboard } from '@/components/features/nusa-discovery/Leaderboard'
import { TriviaPopup } from '@/components/features/nusa-discovery/TriviaPopup'
import { UpcomingEventCard } from '@/components/features/nusa-discovery/UpcomingEventCard'
import { getTodayTriviaStatus, markTriviaShown } from '@/lib/trivia'
import { fetchUpcomingEvents } from '@/lib/events'
import { cn } from '@/lib/utils'

const InteractiveMap = dynamic(() => import('@/components/features/nusa-discovery/InteractiveMap'), { ssr: false })

export default function NusaDiscoveryPage() {
  const { user } = useAuth(true)
  const [showTrivia, setShowTrivia] = useState(false)
  const [upcomingEvents, setUpcomingEvents] = useState<any[]>([])

  useEffect(() => {
    if (user) {
      const checkTrivia = async () => {
        const status = await getTodayTriviaStatus(user.id)
        if (!status) {
          setShowTrivia(true)
          await markTriviaShown(user.id)
        }
      }
      checkTrivia()

      fetchUpcomingEvents().then(setUpcomingEvents)
    }
  }, [user])

  if (!user) {
    return <div>Loading...</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {showTrivia && <TriviaPopup question="Today's trivia question" onAnswer={() => setShowTrivia(false)} />}

      {/* Header */}
      <div className="mb-8 text-left">
        <h1 className="text-4xl font-extrabold text-nusa-darkBrown mb-2">
            Welcome back, {user.username}! 🌞
        </h1>
        <p className="text-nusa-brown text-lg max-w-xl">
            Explore the cultural wonders of Indonesia through NusaKala Discovery.
        </p>
      </div>

      {/* Map Section */}
      <div className="mb-10">
        <InteractiveMap />
      </div>

      {/* Upcoming Events */}
      <div className="mb-10">
        <h2 className="text-2xl font-bold text-nusa-darkBrown mb-4">Upcoming Events</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {upcomingEvents.slice(0, 5).map(event => (
            <UpcomingEventCard key={event.id} event={event} />
          ))}
        </div>
      </div>

      {/* Leaderboard */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold text-nusa-darkBrown mb-4">Trivia Streak Leaderboard</h2>
        <Leaderboard data={[]} />
      </div>
    </div>
  )
}