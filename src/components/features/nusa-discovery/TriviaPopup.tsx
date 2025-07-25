'use client'

import { useState, useEffect } from 'react'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { 
  Brain, 
  Trophy, 
  Star, 
  CheckCircle, 
  XCircle, 
  Clock,
  Flame,
  Target
} from 'lucide-react'
import { TriviaQuestion } from '@/data/triviaData'
import { recordTriviaAnswer, getUserStreak } from '@/lib/trivia'

interface TriviaPopupProps {
  question: TriviaQuestion;
  userId: string;
  username: string;
  onAnswer: (correct: boolean, points: number) => void;
  onClose: () => void;
  open: boolean;
}

export function TriviaPopup({ 
  question, 
  userId, 
  username, 
  onAnswer, 
  onClose, 
  open 
}: TriviaPopupProps) {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60); // 60 seconds timer
  const [userStreak, setUserStreak] = useState(getUserStreak(userId));

  // Timer countdown
  useEffect(() => {
    if (!open || showResult) return;
    
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          // Time's up - auto submit
          handleTimeUp();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [open, showResult]);

  const handleTimeUp = () => {
    if (selectedOption !== null) {
      handleSubmit();
    } else {
      // No answer selected - treat as wrong
      setIsCorrect(false);
      setShowResult(true);
      recordTriviaAnswer(userId, question.id, false, 0);
      onAnswer(false, 0);
    }
  };

  const handleSubmit = () => {
    if (selectedOption === null) return;
    
    const correct = selectedOption === question.correctAnswer;
    const pointsEarned = correct ? question.points : 0;
    
    setIsCorrect(correct);
    setShowResult(true);
    
    // Record the answer
    recordTriviaAnswer(userId, question.id, correct, pointsEarned);
    
    // Update local streak display
    setUserStreak(getUserStreak(userId));
    
    onAnswer(correct, pointsEarned);
  };

  const handleSkip = () => {
    recordTriviaAnswer(userId, question.id, false, 0);
    onAnswer(false, 0);
    onClose();
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-500';
      case 'medium': return 'bg-yellow-500';
      case 'hard': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getDifficultyLabel = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'Mudah';
      case 'medium': return 'Sedang';
      case 'hard': return 'Sulit';
      default: return difficulty;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        {!showResult ? (
          // Question Phase
          <div className="space-y-6">
            {/* Header */}
            <div className="text-center space-y-3">
              <div className="flex items-center justify-center gap-2">
                <Brain className="h-8 w-8 text-orange-500" />
                <h3 className="text-2xl font-bold text-orange-900">✨ Daily Cultural Trivia</h3>
              </div>
              
              <div className="flex items-center justify-center gap-4">
                <Badge className={`${getDifficultyColor(question.difficulty)} text-white`}>
                  {getDifficultyLabel(question.difficulty)}
                </Badge>
                <Badge variant="outline" className="border-orange-300 text-orange-700">
                  {question.category}
                </Badge>
                <Badge variant="outline" className="border-green-300 text-green-700">
                  <Star className="h-3 w-3 mr-1" />
                  {question.points} poin
                </Badge>
              </div>

              {/* Timer */}
              <div className="flex items-center justify-center gap-2">
                <Clock className="h-4 w-4 text-gray-500" />
                <span className={`font-mono ${timeLeft <= 10 ? 'text-red-500 font-bold' : 'text-gray-600'}`}>
                  {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
                </span>
              </div>

              {/* User Stats */}
              <div className="flex items-center justify-center gap-6 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <Flame className="h-4 w-4 text-orange-500" />
                  <span>Streak: {userStreak.currentStreak}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Trophy className="h-4 w-4 text-yellow-500" />
                  <span>Poin: {userStreak.totalPoints}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Target className="h-4 w-4 text-blue-500" />
                  <span>Akurasi: {userStreak.totalAnswers > 0 ? Math.round((userStreak.correctAnswers / userStreak.totalAnswers) * 100) : 0}%</span>
                </div>
              </div>
            </div>

            {/* Question */}
            <Card className="border-orange-200">
              <CardContent className="p-6">
                <p className="text-lg font-medium text-orange-900 leading-relaxed text-center">
                  {question.question}
                </p>
              </CardContent>
            </Card>

            {/* Options */}
            <div className="space-y-3">
              {question.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedOption(index)}
                  className={`w-full p-4 text-left rounded-xl border-2 transition-all duration-200 hover:shadow-md ${
                    selectedOption === index
                      ? 'border-orange-400 bg-orange-50 shadow-md'
                      : 'border-gray-200 hover:border-orange-200'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                      selectedOption === index
                        ? 'border-orange-400 bg-orange-400'
                        : 'border-gray-300'
                    }`}>
                      {selectedOption === index && (
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      )}
                    </div>
                    <span className="font-medium text-gray-800">{option}</span>
                  </div>
                </button>
              ))}
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <Button
                onClick={handleSubmit}
                disabled={selectedOption === null}
                className="flex-1 bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white py-3 font-medium"
              >
                Jawab Sekarang
              </Button>
              <Button 
                variant="outline" 
                onClick={handleSkip}
                className="border-gray-300 text-gray-600 hover:bg-gray-50"
              >
                Lewati
              </Button>
            </div>
          </div>
        ) : (
          // Result Phase
          <div className="space-y-6 text-center">
            {/* Result Icon */}
            <div className="flex justify-center">
              {isCorrect ? (
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="h-12 w-12 text-green-500" />
                </div>
              ) : (
                <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center">
                  <XCircle className="h-12 w-12 text-red-500" />
                </div>
              )}
            </div>

            {/* Result Message */}
            <div className="space-y-2">
              <h3 className={`text-2xl font-bold ${isCorrect ? 'text-green-600' : 'text-red-600'}`}>
                {isCorrect ? '🎉 Benar!' : '😔 Kurang Tepat'}
              </h3>
              <p className="text-gray-600">
                {isCorrect 
                  ? `Selamat ${username}! Anda mendapat ${question.points} poin.`
                  : `Jawaban yang benar adalah: ${question.options[question.correctAnswer]}`
                }
              </p>
            </div>

            {/* Updated Stats */}
            {isCorrect && (
              <div className="flex items-center justify-center gap-6 text-sm">
                <div className="flex items-center gap-1">
                  <Flame className="h-4 w-4 text-orange-500" />
                  <span className="font-medium">Streak: {userStreak.currentStreak}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Trophy className="h-4 w-4 text-yellow-500" />
                  <span className="font-medium">Total Poin: {userStreak.totalPoints}</span>
                </div>
              </div>
            )}

            {/* Explanation */}
            <Card className="border-blue-200 bg-blue-50">
              <CardContent className="p-4">
                <h4 className="font-semibold text-blue-900 mb-2">💡 Penjelasan:</h4>
                <p className="text-blue-800 text-sm leading-relaxed text-left">
                  {question.explanation}
                </p>
              </CardContent>
            </Card>

            {/* Close Button */}
            <Button 
              onClick={onClose}
              className="w-full bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white py-3 font-medium"
            >
              Selesai
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}