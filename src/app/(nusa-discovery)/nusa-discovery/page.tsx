'use client'

import { useAuth } from '@/hooks/useAuth'
import { useEffect, useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { MapPin, Trophy, Star, TrendingUp, Brain, Sparkles, Clock } from 'lucide-react'
import dynamic from 'next/dynamic'
import { Leaderboard } from '@/components/features/nusa-discovery/Leaderboard'
import { TriviaPopup } from '@/components/features/nusa-discovery/TriviaPopup'
import { UpcomingEventCard } from '@/components/features/nusa-discovery/UpcomingEventCard'
import { 
  getTodayTriviaStatus, 
  markTriviaShown, 
  getUserStreak,
  getAllUserStreaks,
  type TriviaStatus,
  type UserStreak
} from '@/lib/trivia'
import { getTodayTrivia } from '@/data/triviaData'
import { useEvents } from '@/hooks/useEvents'
import { cn } from '@/lib/utils'

const InteractiveMap = dynamic(() => import('@/components/features/nusa-discovery/InteractiveMap'), { ssr: false })

export default function NusaDiscoveryPage() {
  const { user } = useAuth()
  const { events, loading: eventsLoading } = useEvents()
  const [showTrivia, setShowTrivia] = useState(false)
  const [todayTrivia, setTodayTrivia] = useState(getTodayTrivia())
  const [triviaStatus, setTriviaStatus] = useState<TriviaStatus | null>(null)
  const [userStreak, setUserStreak] = useState<UserStreak | null>(null)
  const [leaderboardData, setLeaderboardData] = useState<UserStreak[]>([])

  useEffect(() => {
    if (user) {
      initializePage()
    }
  }, [user])

  const initializePage = async () => {
    if (!user) return

    // Check trivia status
    const status = getTodayTriviaStatus(user.id)
    setTriviaStatus(status)
    
    // Get user streak
    const streak = getUserStreak(user.id)
    setUserStreak(streak)
    
    // Get leaderboard
    const leaderboard = getAllUserStreaks()
    setLeaderboardData(leaderboard)

    // Show trivia popup if not seen today
    if (!status?.hasSeenToday) {
      setShowTrivia(true)
      markTriviaShown(user.id)
    }
  }

  const handleTriviaAnswer = async (correct: boolean, points: number) => {
    if (!user) return

    const updatedStreak = await getUserStreak(user.id)
    setUserStreak(updatedStreak)

    const updatedLeaderboard = await getAllUserStreaks()
    setLeaderboardData(updatedLeaderboard)

    const updatedStatus = await getTodayTriviaStatus(user.id)
    setTriviaStatus(updatedStatus)
  }

  const handleOpenTrivia = () => {
    setShowTrivia(true)
  }

  const handleRefreshLeaderboard = () => {
    const updatedLeaderboard = getAllUserStreaks()
    setLeaderboardData(updatedLeaderboard)
  }

  // Get upcoming events from the events data
  const getUpcomingEvents = () => {
    if (!events.length) return []
    
    const now = new Date()
    const upcoming = events
      .filter(event => new Date(event.start_datetime) > now)
      .sort((a, b) => new Date(a.start_datetime).getTime() - new Date(b.start_datetime).getTime())
      .slice(0, 6)
    
    return upcoming.map(event => ({
      id: event.id,
      title: event.name,
      date: new Date(event.start_datetime).toLocaleDateString('id-ID'),
      location: event.place_name,
      description: event.description,
      image: event.images[0] || '/placeholder-event.jpg'
    }))
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 border-4 border-orange-200 border-t-orange-500 rounded-full animate-spin mx-auto"></div>
          <p className="text-orange-700">Loading...</p>
        </div>
      </div>
    )
  }

  const upcomingEvents = getUpcomingEvents()

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Trivia Popup */}
      {showTrivia && (
        <TriviaPopup
          question={todayTrivia}
          userId={user.id}
          username={user.email}
          onAnswer={handleTriviaAnswer}
          onClose={() => setShowTrivia(false)}
          open={showTrivia}
        />
      )}

      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div>
            <h1 className="text-4xl font-extrabold text-orange-900 mb-2">
              Welcome to Nusa, {user.email}! 🇮🇩
            </h1>
            <p className="text-lg text-orange-700">
              Explore Indonesia&apos;s rich cultural heritage and test your knowledge
            </p>
          </div>

          {/* User Stats & Trivia Button */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Card className="border-orange-200">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                    <Brain className="h-5 w-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800">Daily Trivia</h3>
                    <p className="text-xs text-gray-600">
                      {triviaStatus?.hasAnsweredToday 
                        ? `Sudah dijawab hari ini ${triviaStatus.isCorrect ? '✅' : '❌'}`
                        : 'Belum dijawab hari ini'
                      }
                    </p>
                  </div>
                  <Button
                    onClick={handleOpenTrivia}
                    size="sm"
                    className={cn(
                      "px-3 py-2 text-xs font-medium",
                      triviaStatus?.hasAnsweredToday
                        ? "bg-gray-100 text-gray-600 hover:bg-gray-200"
                        : "bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
                    )}
                  >
                    {triviaStatus?.hasAnsweredToday ? 'Lihat Lagi' : 'Jawab Sekarang'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Map Section */}
      <div className="mb-10">
        <InteractiveMap />
      </div>

      {/* Upcoming Events */}
      <div className="mb-10">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-orange-900 mb-2">Upcoming Cultural Events</h2>
            <p className="text-orange-700">Discover amazing cultural events happening across Indonesia</p>
          </div>
          <Button variant="outline" className="border-orange-300 text-orange-700 hover:bg-orange-50">
            View All Events
          </Button>
        </div>
        
        {eventsLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map(i => (
              <div key={i} className="animate-pulse">
                <div className="bg-gray-200 h-48 rounded-lg mb-4"></div>
                <div className="space-y-2">
                  <div className="bg-gray-200 h-4 rounded w-3/4"></div>
                  <div className="bg-gray-200 h-3 rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcomingEvents.map(event => (
              <UpcomingEventCard key={event.id} event={event} />
            ))}
          </div>
        )}
      </div>

      {/* Leaderboard */}
      <div className="mb-16">
        <Leaderboard 
          currentUserId={user.id}
          onRefresh={handleRefreshLeaderboard}
        />
      </div>
    </div>
  )
}