import React from 'react'
import { motion } from 'framer-motion'

interface ProgressDotsProps {
  total: number
  current: number
  completed: number
}

export const ProgressDots: React.FC<ProgressDotsProps> = ({ total, current, completed }) => {
  return (
    <div className="flex gap-2 justify-center mb-6">
      {Array.from({ length: total }).map((_, i) => (
        <motion.div
          key={i}
          animate={{
            backgroundColor:
              i < completed ? '#00e676' : i === current ? '#00ffc8' : 'rgba(255,255,255,0.1)',
            boxShadow:
              i === current
                ? '0 0 12px rgba(0, 255, 200, 1)'
                : i < completed
                  ? '0 0 8px rgba(0, 230, 118, 0.5)'
                  : 'none',
          }}
          className="w-2.5 h-2.5 rounded-full"
        />
      ))}
    </div>
  )
}
