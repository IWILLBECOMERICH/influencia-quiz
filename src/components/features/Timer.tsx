import React from 'react'
import { motion } from 'framer-motion'

interface TimerProps {
  timeRemaining: number
  maxTime?: number
}

export const Timer: React.FC<TimerProps> = ({ timeRemaining, maxTime = 15 }) => {
  const isWarning = timeRemaining <= 5
  const percentage = (timeRemaining / maxTime) * 100

  const barColor = isWarning
    ? { from: '#ff3d71', to: '#ff6b9d', glow: 'rgba(255,61,113,0.6)' }
    : { from: '#00ffc8', to: '#00a878', glow: 'rgba(0,255,200,0.5)' }

  return (
    <div className="flex items-center gap-3 mb-5">
      <motion.span
        animate={{ color: isWarning ? '#ff3d71' : 'rgba(255,255,255,0.4)' }}
        className="text-xs font-black min-w-[2.5rem] tabular-nums"
        style={{ fontVariantNumeric: 'tabular-nums' }}
      >
        0:{String(timeRemaining).padStart(2, '0')}
      </motion.span>

      <div className="flex-1 h-1 bg-white/5 rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.4 }}
          style={{
            background: `linear-gradient(90deg, ${barColor.from}, ${barColor.to})`,
            boxShadow: `0 0 8px ${barColor.glow}`,
          }}
        />
      </div>

      <motion.span
        animate={{
          opacity: isWarning ? [1, 0.3, 1] : 1,
        }}
        transition={isWarning ? { duration: 0.6, repeat: Infinity } : {}}
        className="text-[10px] font-semibold tracking-wider"
        style={{ color: isWarning ? '#ff3d71' : 'rgba(255,255,255,0.2)' }}
      >
        {isWarning ? 'RÁPIDO!' : 'TEMPO'}
      </motion.span>
    </div>
  )
}
