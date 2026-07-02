import { useEffect } from 'react'
import { useQuizStore } from '@store/quizStore'

export function useTimer(onTimeout?: () => void) {
  const { timerRunning, timeRemaining, setTimeRemaining } = useQuizStore()

  useEffect(() => {
    if (!timerRunning) return

    const interval = setInterval(() => {
      setTimeRemaining(timeRemaining - 1)

      if (timeRemaining - 1 <= 0) {
        clearInterval(interval)
        onTimeout?.()
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [timerRunning, timeRemaining, setTimeRemaining, onTimeout])
}
