import React from 'react'
import { NavLink } from 'react-router-dom'
import { motion } from 'framer-motion'

const navItems = [
  {
    to: '',
    end: true,
    label: 'Dashboard',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7" />
        <rect x="14" y="3" width="7" height="7" />
        <rect x="14" y="14" width="7" height="7" />
        <rect x="3" y="14" width="7" height="7" />
      </svg>
    ),
  },
  {
    to: 'leads',
    label: 'Leads',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    to: 'analytics',
    label: 'Analytics',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="20" x2="18" y2="10" />
        <line x1="12" y1="20" x2="12" y2="4" />
        <line x1="6" y1="20" x2="6" y2="14" />
      </svg>
    ),
  },
]

export const Sidebar: React.FC = () => {
  return (
    <div
      className="w-[220px] min-h-screen flex flex-col shrink-0"
      style={{
        background: 'rgba(5,5,16,0.95)',
        borderRight: '1px solid rgba(255,255,255,0.05)',
      }}
    >
      {/* Logo */}
      <div className="px-6 py-6 border-b" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
        <div className="flex items-center gap-3">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-black"
            style={{
              background: 'linear-gradient(135deg, #00ffc8, #00a878)',
              color: '#050510',
            }}
          >
            IG
          </div>
          <div>
            <div className="text-sm font-bold text-white">Influencia</div>
            <div className="text-[10px] text-white/35 uppercase tracking-wider">Global CRM</div>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 py-4 px-3">
        <div className="text-[10px] text-white/25 uppercase tracking-wider px-3 mb-2">
          Menu
        </div>
        <div className="space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 ${
                  isActive
                    ? 'text-neon bg-[rgba(0,255,200,0.08)] border border-[rgba(0,255,200,0.15)]'
                    : 'text-white/45 hover:text-white/80 hover:bg-white/[0.04]'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <span style={{ color: isActive ? '#00ffc8' : undefined }}>{item.icon}</span>
                  {item.label}
                  {isActive && (
                    <motion.div
                      layoutId="nav-indicator"
                      className="ml-auto w-1.5 h-1.5 rounded-full bg-neon"
                      style={{ boxShadow: '0 0 6px #00ffc8' }}
                    />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </div>
      </nav>

      {/* Footer */}
      <div className="px-4 py-4 border-t" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-full bg-neon/20 flex items-center justify-center text-xs font-bold text-neon">
            A
          </div>
          <div>
            <div className="text-xs font-medium text-white/70">Admin</div>
            <div className="text-[10px] text-white/30">influencia.global</div>
          </div>
        </div>
      </div>
    </div>
  )
}
