import React from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useCRMStore } from '../store/crmStore'
import { STATUS_LABELS, STATUS_COLORS, TIER_LABELS, SOURCE_LABELS } from '../utils/mockData'

function formatFollowers(n: number) {
  if (n >= 1000000) return `${(n / 1000000).toFixed(1)}M`
  if (n >= 1000) return `${Math.floor(n / 1000)}K`
  return String(n)
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: '2-digit' })
}

export const Leads: React.FC = () => {
  const navigate = useNavigate()
  const {
    searchQuery, filterStatus, filterTier, filterSource,
    currentPage, pageSize,
    setSearchQuery, setFilterStatus, setFilterTier, setFilterSource, setCurrentPage,
    getFilteredLeads,
  } = useCRMStore()

  const filtered = getFilteredLeads()
  const totalPages = Math.ceil(filtered.length / pageSize)
  const paginated = filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize)

  const selectStyle = {
    background: 'rgba(10,10,25,0.9)',
    border: '1px solid rgba(255,255,255,0.08)',
    color: 'rgba(255,255,255,0.6)',
    borderRadius: '8px',
    padding: '6px 10px',
    fontSize: '12px',
    outline: 'none',
  }

  return (
    <div className="p-6 space-y-4">
      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-wrap items-center gap-3"
      >
        {/* Search */}
        <div
          className="flex items-center gap-2 px-3 py-2 rounded-lg flex-1 min-w-[200px]"
          style={{ background: 'rgba(10,10,25,0.85)', border: '1px solid rgba(255,255,255,0.08)' }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="2" strokeLinecap="round">
            <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar por nome, handle ou email..."
            className="bg-transparent text-sm text-white placeholder-white/25 outline-none w-full"
          />
        </div>

        <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} style={selectStyle}>
          <option value="">Todos os status</option>
          {Object.entries(STATUS_LABELS).map(([v, l]) => <option key={v} value={v}>{l}</option>)}
        </select>

        <select value={filterTier} onChange={(e) => setFilterTier(e.target.value)} style={selectStyle}>
          <option value="">Todos os tiers</option>
          {Object.entries(TIER_LABELS).map(([v, l]) => <option key={v} value={v}>{l}</option>)}
        </select>

        <select value={filterSource} onChange={(e) => setFilterSource(e.target.value)} style={selectStyle}>
          <option value="">Todas as fontes</option>
          {Object.entries(SOURCE_LABELS).map(([v, l]) => <option key={v} value={v}>{l}</option>)}
        </select>

        <div className="text-xs text-white/30 ml-auto shrink-0">
          {filtered.length} leads
        </div>
      </motion.div>

      {/* Table */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="rounded-xl overflow-hidden"
        style={{ background: 'rgba(10,10,25,0.85)', border: '1px solid rgba(255,255,255,0.06)', backdropFilter: 'blur(20px)' }}
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                {['Lead', 'Handle', 'Score', 'Seguidores', 'Engajamento', 'Fonte', 'Status', 'Data', ''].map((h) => (
                  <th key={h} className="text-left px-4 py-3 text-[11px] font-semibold text-white/30 uppercase tracking-wider">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {paginated.map((lead, i) => (
                <motion.tr
                  key={lead.id}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.03 }}
                  onClick={() => navigate(`${lead.id}`)}
                  className="cursor-pointer hover:bg-white/[0.02] transition-colors"
                  style={{ borderBottom: '1px solid rgba(255,255,255,0.03)' }}
                >
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={lead.avatar}
                        alt={lead.name}
                        className="w-8 h-8 rounded-full object-cover shrink-0"
                        onError={(e) => { (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(lead.name)}&background=00ffc8&color=050510&size=64` }}
                      />
                      <div>
                        <div className="text-sm font-semibold text-white">{lead.name}</div>
                        <div className="text-xs text-white/35">{lead.niche} · {lead.location.split(',')[0]}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-xs text-neon font-medium">{lead.handle}</span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-1.5 rounded-full bg-white/[0.05] overflow-hidden">
                        <div
                          className="h-full rounded-full"
                          style={{
                            width: `${lead.score}%`,
                            background: lead.tier === 'high' ? '#00ffc8' : lead.tier === 'mid' ? '#f59e0b' : '#ff3d71',
                          }}
                        />
                      </div>
                      <span className="text-xs font-bold" style={{ color: lead.tier === 'high' ? '#00ffc8' : lead.tier === 'mid' ? '#f59e0b' : '#ff3d71' }}>
                        {lead.score}%
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-sm text-white/70">{formatFollowers(lead.followers)}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-sm text-white/70">{lead.engagement}%</span>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className="text-[11px] font-medium px-2 py-0.5 rounded-full"
                      style={{ background: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.5)' }}
                    >
                      {SOURCE_LABELS[lead.source]}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className="text-[11px] font-semibold px-2.5 py-1 rounded-full"
                      style={{
                        color: STATUS_COLORS[lead.status],
                        background: `${STATUS_COLORS[lead.status]}15`,
                        border: `1px solid ${STATUS_COLORS[lead.status]}30`,
                      }}
                    >
                      {STATUS_LABELS[lead.status]}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-xs text-white/30">{formatDate(lead.createdAt)}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-white/20 hover:text-neon transition-colors">→</span>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div
            className="flex items-center justify-between px-4 py-3"
            style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}
          >
            <div className="text-xs text-white/30">
              Página {currentPage} de {totalPages}
            </div>
            <div className="flex items-center gap-1">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(currentPage - 1)}
                className="px-3 py-1.5 rounded-lg text-xs text-white/40 hover:text-white disabled:opacity-20 disabled:cursor-not-allowed transition-colors"
                style={{ background: 'rgba(255,255,255,0.04)' }}
              >
                ← Anterior
              </button>
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                const page = i + 1
                return (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className="w-8 h-8 rounded-lg text-xs font-semibold transition-all"
                    style={
                      currentPage === page
                        ? { background: 'rgba(0,255,200,0.12)', color: '#00ffc8', border: '1px solid rgba(0,255,200,0.25)' }
                        : { color: 'rgba(255,255,255,0.35)' }
                    }
                  >
                    {page}
                  </button>
                )
              })}
              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(currentPage + 1)}
                className="px-3 py-1.5 rounded-lg text-xs text-white/40 hover:text-white disabled:opacity-20 disabled:cursor-not-allowed transition-colors"
                style={{ background: 'rgba(255,255,255,0.04)' }}
              >
                Próxima →
              </button>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  )
}
