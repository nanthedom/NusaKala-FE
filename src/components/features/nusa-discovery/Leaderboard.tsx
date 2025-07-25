'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  Trophy, 
  Medal, 
  Crown, 
  Flame, 
  Star, 
  TrendingUp,
  RefreshCw,
  Award
} from 'lucide-react'
import { UserStreak, getAllUserStreaks } from '@/lib/trivia'

interface LeaderboardProps {
  currentUserId?: string;
  onRefresh?: () => void;
}

export function Leaderboard({ currentUserId, onRefresh }: LeaderboardProps) {
  const [leaderboardData, setLeaderboardData] = useState<UserStreak[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadLeaderboard();
  }, []);

  const loadLeaderboard = () => {
    setLoading(true);
    try {
      const data = getAllUserStreaks();
      setLeaderboardData(data);
    } catch (error) {
      console.error('Error loading leaderboard:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = () => {
    loadLeaderboard();
    onRefresh?.();
  };

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="h-6 w-6 text-yellow-500" />;
      case 2:
        return <Medal className="h-6 w-6 text-gray-400" />;
      case 3:
        return <Award className="h-6 w-6 text-amber-600" />;
      default:
        return <span className="text-lg font-bold text-gray-600">#{rank}</span>;
    }
  };

  const getRankColors = (rank: number) => {
    switch (rank) {
      case 1:
        return {
          border: 'border-yellow-300',
          bg: 'bg-gradient-to-r from-yellow-50 to-amber-50',
          glow: 'shadow-yellow-200'
        };
      case 2:
        return {
          border: 'border-gray-300',
          bg: 'bg-gradient-to-r from-gray-50 to-slate-50',
          glow: 'shadow-gray-200'
        };
      case 3:
        return {
          border: 'border-amber-300',
          bg: 'bg-gradient-to-r from-amber-50 to-orange-50',
          glow: 'shadow-amber-200'
        };
      default:
        return {
          border: 'border-orange-200',
          bg: 'bg-white',
          glow: 'shadow-md'
        };
    }
  };

  const getStreakBadgeColor = (streak: number) => {
    if (streak >= 10) return 'bg-red-500';
    if (streak >= 7) return 'bg-orange-500';
    if (streak >= 5) return 'bg-yellow-500';
    if (streak >= 3) return 'bg-green-500';
    if (streak >= 1) return 'bg-blue-500';
    return 'bg-gray-400';
  };

  if (loading) {
    return (
      <Card className="border-orange-200">
        <CardContent className="p-6">
          <div className="flex items-center justify-center space-y-4">
            <RefreshCw className="h-6 w-6 animate-spin text-orange-500" />
            <span className="text-gray-600 ml-2">Memuat leaderboard...</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-full flex items-center justify-center">
            <Trophy className="h-6 w-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-orange-900">Leaderboard Trivia</h2>
            <p className="text-sm text-orange-700">Peringkat berdasarkan streak dan total poin</p>
          </div>
        </div>
        
        <Button
          onClick={handleRefresh}
          variant="outline"
          size="sm"
          className="border-orange-300 text-orange-700 hover:bg-orange-50"
        >
          <RefreshCw className="h-4 w-4 mr-1" />
          Refresh
        </Button>
      </div>

      {/* Top 3 Podium */}
      {leaderboardData.length >= 3 && (
        <div className="grid grid-cols-3 gap-4 mb-6">
          {leaderboardData.slice(0, 3).map((user, index) => {
            const actualRank = index + 1;
            const colors = getRankColors(actualRank);
            
            return (
              <Card key={user.userId} className={`${colors.border} ${colors.bg} ${colors.glow} shadow-lg hover:shadow-xl transition-all duration-300`}>
                <CardContent className="p-4 text-center">
                  <div className="mb-3">
                    {getRankIcon(actualRank)}
                  </div>
                  
                  <div className="mb-3">
                    <div className="text-2xl mb-1">{user.avatar || '👤'}</div>
                    <h3 className={`font-bold text-sm ${currentUserId === user.userId ? 'text-orange-600' : 'text-gray-800'}`}>
                      {user.username}
                      {currentUserId === user.userId && <span className="text-xs ml-1">(Anda)</span>}
                    </h3>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-center gap-1">
                      <Flame className="h-4 w-4 text-orange-500" />
                      <span className="font-bold text-lg">{user.currentStreak}</span>
                    </div>
                    
                    <div className="flex items-center justify-center gap-1">
                      <Star className="h-3 w-3 text-yellow-500" />
                      <span className="text-sm font-medium">{user.totalPoints} poin</span>
                    </div>
                    
                    <Badge className={`${getStreakBadgeColor(user.currentStreak)} text-white text-xs`}>
                      {user.currentStreak === 0 ? 'Tidak Ada Streak' : 
                       user.currentStreak === 1 ? '1 Hari' :
                       `${user.currentStreak} Hari Berturut`}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      {/* Full Leaderboard List */}
      <Card className="border-orange-200">
        <CardContent className="p-0">
          <div className="space-y-0">
            {leaderboardData.map((user, index) => {
              const rank = index + 1;
              const isCurrentUser = currentUserId === user.userId;
              const accuracy = user.totalAnswers > 0 ? Math.round((user.correctAnswers / user.totalAnswers) * 100) : 0;
              
              return (
                <div
                  key={user.userId}
                  className={`p-4 border-b border-gray-100 last:border-b-0 hover:bg-orange-50 transition-colors ${
                    isCurrentUser ? 'bg-orange-50 border-orange-200' : ''
                  }`}
                >
                  <div className="flex items-center justify-between">
                    {/* Left: Rank & User Info */}
                    <div className="flex items-center gap-4">
                      <div className="w-8 h-8 flex items-center justify-center">
                        {rank <= 3 ? getRankIcon(rank) : (
                          <span className="text-sm font-bold text-gray-600">#{rank}</span>
                        )}
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <div className="text-2xl">{user.avatar || '👤'}</div>
                        <div>
                          <h3 className={`font-semibold ${isCurrentUser ? 'text-orange-600' : 'text-gray-800'}`}>
                            {user.username}
                            {isCurrentUser && <span className="text-xs ml-2 text-orange-500">(Anda)</span>}
                          </h3>
                          <div className="flex items-center gap-3 text-xs text-gray-500">
                            <span>Akurasi: {accuracy}%</span>
                            <span>•</span>
                            <span>{user.correctAnswers}/{user.totalAnswers} benar</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Right: Stats */}
                    <div className="flex items-center gap-6">
                      {/* Current Streak */}
                      <div className="text-center">
                        <div className="flex items-center gap-1 mb-1">
                          <Flame className="h-4 w-4 text-orange-500" />
                          <span className="font-bold text-lg">{user.currentStreak}</span>
                        </div>
                        <span className="text-xs text-gray-500">Streak</span>
                      </div>
                      
                      {/* Total Points */}
                      <div className="text-center">
                        <div className="flex items-center gap-1 mb-1">
                          <Star className="h-4 w-4 text-yellow-500" />
                          <span className="font-bold text-lg">{user.totalPoints}</span>
                        </div>
                        <span className="text-xs text-gray-500">Poin</span>
                      </div>
                      
                      {/* Longest Streak */}
                      <div className="text-center">
                        <div className="flex items-center gap-1 mb-1">
                          <TrendingUp className="h-4 w-4 text-green-500" />
                          <span className="font-bold text-lg">{user.longestStreak}</span>
                        </div>
                        <span className="text-xs text-gray-500">Terbaik</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Footer Stats */}
      <div className="text-center text-sm text-gray-600">
        <p>
          Showing top {leaderboardData.length} players • 
          <span className="ml-1">Updated daily at midnight</span>
        </p>
      </div>
    </div>
  );
}