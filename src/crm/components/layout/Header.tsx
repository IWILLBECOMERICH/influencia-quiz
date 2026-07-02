import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useCRMStore } from '../../store/crmStore'

const titles: Record<string, { label: string; sub: string }> = {
  '/crm': { label: 'Dashboard', sub: 'Visao geral do seu pipeline' },
  '/crm/leads': { label: 'Leads', sub: 'Gerencie todos os leads qualificados' },
  '/crm/analytics': { label: 'Analytics', sub: 'Analise detalhada de conversoes' },
}

export const Header: React.FC = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const user = useCRMStore((s) => s.user)
  const logout = useCRMStore((s) => s.logout)
  const pathName = location.pathname.replace(/\/$/, '') || '/crm'
  const title = titles[pathName] ?? { label: 'CRM', sub: '' }

  const handleLogout = () => {
    logout()
    navigate('.')
  }

  return (
    <div
      className="h-14 flex items-center justify-between px-6 shrink-0"
      style={{
        background: 'rgba(5,5,16,0.9)',
        borderBottom: '1px solid rgba(255,255,255,0.05)',
        backdropFilter: 'blur(20px)',
      }}
    >
      <div className="flex items-center gap-3">
        <h1 className="text-base font-bold text-white">{title.label}</h1>
        {title.sub && (
          <>
            <span className="text-white/15">/</span>
            <span className="text-sm text-white/35">{title.sub}</span>
          </>
        )}
      </div>

      <div className="flex items-center gap-3">
        {/* Pulse indicator */}
        <div className="flex items-center gap-2 text-xs text-white/35">
          <span
            className="w-1.5 h-1.5 rounded-full bg-neon"
            style={{ boxShadow: '0 0 6px #00ffc8', animation: 'pulse 2s infinite' }}
          />
          Sistema online
        </div>

        {/* Quiz link */}
        <a
          href="/"
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-neon transition-all"
          style={{
            background: 'rgba(0,255,200,0.08)',
            border: '1px solid rgba(0,255,200,0.2)',
          }}
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
            <polyline points="15 3 21 3 21 9" />
            <line x1="10" y1="14" x2="21" y2="3" />
          </svg>
          Quiz
        </a>

        {/* User menu */}
        {user && (
          <div className="flex items-center gap-2 ml-2 pl-2" style={{ borderLeft: '1px solid rgba(255,255,255,0.1)' }}>
            <div className="text-right text-xs">
              <div className="text-white/70 font-medium">{user.name}</div>
              <div className="text-white/35 text-[10px]">{user.role}</div>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium text-white/60 hover:text-white/80 transition-all"
              style={{
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
              }}
              title="Sair"
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                <polyline points="16 17 21 12 16 7" />
                <line x1="21" y1="12" x2="9" y2="12" />
              </svg>
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
