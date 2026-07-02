import React from 'react'
import clsx from 'clsx'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: string
}

export const Input: React.FC<InputProps> = ({ icon, className, ...props }) => {
  return (
    <div className="flex items-center gap-3 bg-white/3 backdrop-blur rounded-xl border border-white/10 px-4 py-3 focus-within:border-neon/50 transition-colors">
      {icon && <span className="text-xl opacity-50">{icon}</span>}
      <input
        className={clsx(
          'flex-1 bg-transparent text-white placeholder-white/40 focus:outline-none',
          'text-lg font-medium',
          className
        )}
        {...props}
      />
    </div>
  )
}
