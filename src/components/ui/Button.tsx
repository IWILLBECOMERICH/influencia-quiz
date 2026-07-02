import React from 'react'
import { motion } from 'framer-motion'
import clsx from 'clsx'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'whatsapp' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean
  children: React.ReactNode
}

const variantStyles = {
  primary: [
    'bg-neon-gradient text-black font-black',
    'shadow-[0_0_25px_rgba(0,255,200,0.35)]',
    'hover:shadow-[0_0_45px_rgba(0,255,200,0.6)]',
    'hover:brightness-110',
    'active:scale-95',
  ].join(' '),
  secondary:
    'bg-transparent border border-white/15 text-white hover:border-white/30 hover:bg-white/5',
  whatsapp: [
    'bg-gradient-to-r from-[#25D366] to-[#128C7E] text-white font-black',
    'shadow-[0_0_30px_rgba(37,211,102,0.35)]',
    'hover:shadow-[0_0_50px_rgba(37,211,102,0.55)]',
    'hover:brightness-110',
  ].join(' '),
  outline: 'border border-neon/30 text-neon hover:bg-neon/5 hover:border-neon/60',
}

const sizeStyles = {
  sm: 'px-4 py-2 text-sm rounded-xl',
  md: 'px-6 py-3 text-base rounded-xl',
  lg: 'px-8 py-4 text-lg rounded-2xl',
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  className,
  children,
  ...props
}) => {
  return (
    <motion.button
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.96 }}
      disabled={disabled || loading}
      className={clsx(
        'font-semibold transition-all duration-200 cursor-pointer',
        variantStyles[variant],
        sizeStyles[size],
        (disabled || loading) && 'opacity-50 cursor-not-allowed',
        className
      )}
      {...(props as any)}
    >
      {loading ? (
        <span className="flex items-center gap-2 justify-center">
          <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
          Carregando...
        </span>
      ) : (
        children
      )}
    </motion.button>
  )
}
