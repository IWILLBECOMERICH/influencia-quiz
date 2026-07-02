import { create } from 'zustand'
import { GameState } from '@types'
import { QUESTIONS } from '@utils/questions'

interface QuizStoreState extends GameState {
  questions: any[]
  setHandle: (handle: string) => void
  setScore: (score: number) => void
  setCurrentQuestion: (index: number) => void
  setSelectedAnswer: (answer: number | null) => void
  setAnswered: (answered: boolean) => void
  setTimerRunning: (running: boolean) => void
  setTimeRemaining: (time: number) => void
  resetGame: () => void
  nextQuestion: () => void
  submitAnswer: (answer: number) => void
}

const initialState: GameState = {
  handle: '',
  score: 0,
  currentQuestion: 0,
  selectedAnswer: null,
  answered: false,
  timerRunning: false,
  timeRemaining: 0,
}

export const useQuizStore = create<QuizStoreState>((set, get) => ({
  ...initialState,
  questions: QUESTIONS,

  setHandle: (handle: string) => set({ handle }),
  setScore: (score: number) => set({ score }),
  setCurrentQuestion: (index: number) => set({ currentQuestion: index }),
  setSelectedAnswer: (answer: number | null) => set({ selectedAnswer: answer }),
  setAnswered: (answered: boolean) => set({ answered }),
  setTimerRunning: (running: boolean) => set({ timerRunning: running }),
  setTimeRemaining: (time: number) => set({ timeRemaining: time }),

  resetGame: () => set(initialState),

  nextQuestion: () => {
    const state = get()
    set({
      currentQuestion: state.currentQuestion + 1,
      selectedAnswer: null,
      answered: false,
    })
  },

  submitAnswer: (answer: number) => {
    const state = get()
    const currentQ = state.questions[state.currentQuestion]
    const value = currentQ.values?.[answer] ?? 1
    set({ score: state.score + value, selectedAnswer: answer, answered: true })
  },
}))
