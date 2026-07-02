import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export const JackpotCounter: React.FC = () => {
  const [value, setValue] = useState('R$ 847.293')

  useEffect(() => {
    const interval = setInterval(() => {
      const val = 800000 + Math.floor(Math.random() * 100000)
      setValue(`R$ ${val.toLocaleString('pt-BR')}`)
    }, 4000)

    return () => clearInterval(interval)
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="inline-flex items-center gap-2 px-5 py-3 rounded-full"
      style={{
        background: 'linear-gradient(135deg, rgba(245,158,11,0.15), rgba(255,61,113,0.1))',
        border: '1px solid rgba(245,158,11,0.25)',
        boxShadow: '0 0 20px rgba(245,158,11,0.2)',
      }}
    >
      <span className="text-xl">💰</span>
      <span className="font-bold text-sm">JACKPOT ACUMULADO:</span>
      <motion.span
        key={value}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="font-black bg-gold-gradient bg-clip-text text-transparent"
      >
        {value}
      </motion.span>
    </motion.div>
  )
}
