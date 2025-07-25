// src/lib/trivia.ts

export interface TriviaStatus {
  userId: string;
  date: string;
  hasSeenToday: boolean;
  hasAnsweredToday: boolean;
  isCorrect?: boolean;
  triviaId?: string;
  points?: number;
}

export interface UserStreak {
  userId: string;
  username: string;
  avatar?: string;
  currentStreak: number;
  longestStreak: number;
  totalPoints: number;
  correctAnswers: number;
  totalAnswers: number;
  lastActiveDate: string;
  rank?: number;
}

// Get today's date as string
function getTodayDateString(): string {
  return new Date().toDateString();
}

// Check if user has seen today's trivia
export function getTodayTriviaStatus(userId: string): TriviaStatus | null {
  if (typeof window === 'undefined') return null;
  
  const today = getTodayDateString();
  const key = `trivia_status_${userId}_${today}`;
  const stored = localStorage.getItem(key);
  
  if (stored) {
    return JSON.parse(stored);
  }
  
  return null;
}

// Mark trivia as shown for today
export function markTriviaShown(userId: string): void {
  if (typeof window === 'undefined') return;
  
  const today = getTodayDateString();
  const key = `trivia_status_${userId}_${today}`;
  
  const status: TriviaStatus = {
    userId,
    date: today,
    hasSeenToday: true,
    hasAnsweredToday: false
  };
  
  localStorage.setItem(key, JSON.stringify(status));
}

// Record trivia answer
export function recordTriviaAnswer(
  userId: string, 
  triviaId: string, 
  isCorrect: boolean, 
  points: number
): void {
  if (typeof window === 'undefined') return;
  
  const today = getTodayDateString();
  const key = `trivia_status_${userId}_${today}`;
  
  const status: TriviaStatus = {
    userId,
    date: today,
    hasSeenToday: true,
    hasAnsweredToday: true,
    isCorrect,
    triviaId,
    points: isCorrect ? points : 0
  };
  
  localStorage.setItem(key, JSON.stringify(status));
  
  // Update user streak
  updateUserStreak(userId, isCorrect, points);
}

// Get user streak data
export function getUserStreak(userId: string): UserStreak {
  if (typeof window === 'undefined') {
    return {
      userId,
      username: 'User',
      currentStreak: 0,
      longestStreak: 0,
      totalPoints: 0,
      correctAnswers: 0,
      totalAnswers: 0,
      lastActiveDate: getTodayDateString()
    };
  }
  
  const key = `user_streak_${userId}`;
  const stored = localStorage.getItem(key);
  
  if (stored) {
    return JSON.parse(stored);
  }
  
  // Initialize new streak data
  const newStreak: UserStreak = {
    userId,
    username: 'User', // This should come from user data
    currentStreak: 0,
    longestStreak: 0,
    totalPoints: 0,
    correctAnswers: 0,
    totalAnswers: 0,
    lastActiveDate: getTodayDateString()
  };
  
  localStorage.setItem(key, JSON.stringify(newStreak));
  return newStreak;
}

// Update user streak
export function updateUserStreak(userId: string, isCorrect: boolean, points: number): UserStreak {
  if (typeof window === 'undefined') {
    return getUserStreak(userId);
  }
  
  const streak = getUserStreak(userId);
  const today = getTodayDateString();
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayString = yesterday.toDateString();
  
  // Update total answers
  streak.totalAnswers += 1;
  
  if (isCorrect) {
    streak.correctAnswers += 1;
    streak.totalPoints += points;
    
    // Check if this continues a streak
    if (streak.lastActiveDate === yesterdayString) {
      // Consecutive day - increase streak
      streak.currentStreak += 1;
    } else if (streak.lastActiveDate === today) {
      // Same day - don't change streak (already answered today)
      // This shouldn't happen with proper flow control
    } else {
      // Not consecutive - reset streak to 1
      streak.currentStreak = 1;
    }
    
    // Update longest streak
    if (streak.currentStreak > streak.longestStreak) {
      streak.longestStreak = streak.currentStreak;
    }
  } else {
    // Wrong answer - reset current streak
    streak.currentStreak = 0;
  }
  
  streak.lastActiveDate = today;
  
  const key = `user_streak_${userId}`;
  localStorage.setItem(key, JSON.stringify(streak));
  
  return streak;
}

// Get all user streaks for leaderboard (dummy data + real user)
export function getAllUserStreaks(): UserStreak[] {
  if (typeof window === 'undefined') return [];
  
  // Get real user data from localStorage
  const realUsers: UserStreak[] = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key?.startsWith('user_streak_')) {
      const data = localStorage.getItem(key);
      if (data) {
        realUsers.push(JSON.parse(data));
      }
    }
  }
  
  // Combine with dummy data
  const allUsers = [...DUMMY_LEADERBOARD_DATA, ...realUsers];
  
  // Sort by current streak, then by total points
  allUsers.sort((a, b) => {
    if (a.currentStreak !== b.currentStreak) {
      return b.currentStreak - a.currentStreak;
    }
    return b.totalPoints - a.totalPoints;
  });
  
  // Add ranks
  allUsers.forEach((user, index) => {
    user.rank = index + 1;
  });
  
  return allUsers.slice(0, 10); // Top 10
}

// Reset trivia status for testing (development only)
export function resetTriviaForUser(userId: string): void {
  if (typeof window === 'undefined') return;
  
  const today = getTodayDateString();
  const key = `trivia_status_${userId}_${today}`;
  localStorage.removeItem(key);
}

// Dummy leaderboard data
export const DUMMY_LEADERBOARD_DATA: UserStreak[] = [
  {
    userId: 'dummy_1',
    username: 'Budiman Sutrisno',
    avatar: '👨‍🎓',
    currentStreak: 15,
    longestStreak: 22,
    totalPoints: 285,
    correctAnswers: 19,
    totalAnswers: 20,
    lastActiveDate: getTodayDateString(),
    rank: 1
  },
  {
    userId: 'dummy_2', 
    username: 'Sari Kulturawati',
    avatar: '👩‍🏫',
    currentStreak: 12,
    longestStreak: 18,
    totalPoints: 240,
    correctAnswers: 16,
    totalAnswers: 18,
    lastActiveDate: getTodayDateString(),
    rank: 2
  },
  {
    userId: 'dummy_3',
    username: 'Arjuna Nusantara',
    avatar: '🧑‍🎨',
    currentStreak: 10,
    longestStreak: 15,
    totalPoints: 195,
    correctAnswers: 13,
    totalAnswers: 15,
    lastActiveDate: getTodayDateString(),
    rank: 3
  },
  {
    userId: 'dummy_4',
    username: 'Dewi Saraswati',
    avatar: '👩‍💼',
    currentStreak: 8,
    longestStreak: 12,
    totalPoints: 165,
    correctAnswers: 11,
    totalAnswers: 14,
    lastActiveDate: getTodayDateString(),
    rank: 4
  },
  {
    userId: 'dummy_5',
    username: 'Budi Nusantara',
    avatar: '👨‍💻',
    currentStreak: 7,
    longestStreak: 10,
    totalPoints: 140,
    correctAnswers: 9,
    totalAnswers: 12,
    lastActiveDate: getTodayDateString(),
    rank: 5
  },
  {
    userId: 'dummy_6',
    username: 'Mega Wangi',
    avatar: '👩‍🎨',
    currentStreak: 6,
    longestStreak: 8,
    totalPoints: 115,
    correctAnswers: 7,
    totalAnswers: 10,
    lastActiveDate: getTodayDateString(),
    rank: 6
  },
  {
    userId: 'dummy_7',
    username: 'Bayu Samudra',
    avatar: '🧑‍🚀',
    currentStreak: 5,
    longestStreak: 7,
    totalPoints: 95,
    correctAnswers: 6,
    totalAnswers: 9,
    lastActiveDate: getTodayDateString(),
    rank: 7
  },
  {
    userId: 'dummy_8',
    username: 'Kartika Sari',
    avatar: '👩‍🔬',
    currentStreak: 4,
    longestStreak: 6,
    totalPoints: 75,
    correctAnswers: 5,
    totalAnswers: 8,
    lastActiveDate: getTodayDateString(),
    rank: 8
  }
];