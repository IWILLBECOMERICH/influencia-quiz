export interface QuizQuestion {
  id: string
  q: string
  options: string[]
  correct: number
  category?: string
  difficulty?: 'easy' | 'medium' | 'hard'
}

export interface GameState {
  handle: string
  score: number
  currentQuestion: number
  selectedAnswer: number | null
  answered: boolean
  timerRunning: boolean
  timeRemaining: number
}

export type GameTier = 'high' | 'mid' | 'low'

export interface InsightItem {
  icon: string
  text: string
  bar: number
}

export interface ResultData {
  title: string
  message: string
  tier: GameTier
  percentage: number
  insights: InsightItem[]
  metrics: {
    engagement: number
    conversion: number
    ranking: number
  }
}

export interface PageProps {
  onNext?: (data?: any) => void
}
