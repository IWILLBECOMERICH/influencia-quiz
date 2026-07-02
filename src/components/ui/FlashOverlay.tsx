import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface FlashOverlayProps {
  type: 'success' | 'error' | null
  onDismiss?: () => void
}

export const FlashOverlay: React.FC<FlashOverlayProps> = ({ type, onDismiss }) => {
  useEffect(() => {
    if (!type) return

    const timer = setTimeout(() => {
      onDismiss?.()
    }, 250)

    return () => clearTimeout(timer)
  }, [type, onDismiss])

  return (
    <AnimatePresence>
      {type && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className={`
            fixed inset-0 pointer-events-none z-50
            ${type === 'success' ? 'bg-success/15' : 'bg-hot/10'}
          `}
        />
      )}
    </AnimatePresence>
  )
}
