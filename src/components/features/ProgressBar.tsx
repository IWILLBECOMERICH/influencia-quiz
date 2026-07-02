import React from 'react'
import { motion } from 'framer-motion'

interface ProgressBarProps {
  progress: number
  max?: number
  animated?: boolean
  showText?: boolean
  variant?: 'neon' | 'gold' | 'success'
  height?: 'thin' | 'normal' | 'thick'
}

const variantColors = {
  neon: { gradient: 'from-neon to-neon-dark', glow: 'rgba(0,255,200,0.5)' },
  gold: { gradient: 'from-gold to-amber-600', glow: 'rgba(245,158,11,0.5)' },
  success: { gradient: 'from-success to-emerald-600', glow: 'rgba(0,230,118,0.5)' },
}

const heightStyles = {
  thin: 'h-1',
  normal: 'h-1.5',
  thick: 'h-2.5',
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  max = 100,
  animated = true,
  showText = false,
  variant = 'neon',
  height = 'normal',
}) => {
  const percentage = Math.min((progress / max) * 100, 100)
  const { gradient, glow } = variantColors[variant]

  return (
    <div className="w-full">
      <div className={`relative ${heightStyles[height]} bg-white/5 rounded-full overflow-hidden`}>
        <motion.div
          initial={animated ? { width: 0 } : false}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className={`h-full bg-gradient-to-r ${gradient} rounded-full`}
          style={{ boxShadow: `0 0 10px ${glow}` }}
        />
      </div>
      {showText && (
        <div className="flex justify-between mt-2 text-xs text-white/50">
          <span>{progress}</span>
          <span>{max}</span>
        </div>
      )}
    </div>
  )
}
