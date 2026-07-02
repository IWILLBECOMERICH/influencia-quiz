import React from 'react'
import { motion } from 'framer-motion'
import clsx from 'clsx'

interface CardProps {
  children: React.ReactNode
  className?: string
  hover?: boolean
  highlight?: boolean
  animate?: boolean
  glow?: boolean
}

export const Card: React.FC<CardProps> = ({
  children,
  className,
  hover = true,
  highlight = false,
  animate = true,
  glow = false,
}) => {
  return (
    <motion.div
      initial={animate ? { opacity: 0, y: 16 } : false}
      animate={animate ? { opacity: 1, y: 0 } : false}
      transition={{ duration: 0.35 }}
      whileHover={hover ? { translateY: -3 } : {}}
      className={clsx(
        'backdrop-blur-xl rounded-2xl p-6',
        'border transition-all duration-300',
        highlight
          ? [
              'bg-gradient-to-br from-neon/[0.07] to-neon/[0.01]',
              'border-neon/30',
              'shadow-[0_0_30px_rgba(0,255,200,0.08),inset_0_1px_0_rgba(0,255,200,0.15)]',
            ]
          : [
              'bg-gradient-to-br from-white/[0.06] to-white/[0.02]',
              'border-white/[0.08]',
            ],
        glow && 'shadow-[0_0_40px_rgba(0,255,200,0.15)]',
        className
      )}
    >
      {children}
    </motion.div>
  )
}
