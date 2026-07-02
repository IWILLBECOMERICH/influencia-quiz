import { useCallback } from 'react'
import confetti from 'canvas-confetti'

export function useConfetti() {
  const celebrate = useCallback((intensity: 'low' | 'medium' | 'high' = 'medium') => {
    const configs = {
      low: { particleCount: 20, spread: 60 },
      medium: { particleCount: 50, spread: 80 },
      high: { particleCount: 80, spread: 90 },
    }

    const config = configs[intensity]

    confetti({
      ...config,
      origin: { y: 0.6 },
      colors: ['#00ffc8', '#7c3aed', '#f59e0b', '#ff3d71'],
    })
  }, [])

  const celebrateSide = useCallback((side: 'left' | 'right' = 'left') => {
    confetti({
      particleCount: 25,
      angle: side === 'left' ? 60 : 120,
      spread: 55,
      origin: { x: side === 'left' ? 0 : 1 },
      colors: ['#00ffc8', '#7c3aed', '#f59e0b'],
    })
  }, [])

  const finalCelebration = useCallback(() => {
    const end = Date.now() + 1500

    const frame = () => {
      celebrateSide('left')
      celebrateSide('right')

      if (Date.now() < end) {
        requestAnimationFrame(frame)
      }
    }

    frame()

    setTimeout(() => {
      celebrate('medium')
    }, 400)
  }, [celebrate, celebrateSide])

  return { celebrate, celebrateSide, finalCelebration }
}
