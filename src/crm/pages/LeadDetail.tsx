import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate, useParams } from 'react-router-dom'
import { useCRMStore } from '../store/crmStore'
import { STATUS_LABELS, STATUS_COLORS, SOURCE_LABELS } from '../utils/mockData'
import type { LeadStatus } from '../types'

const STATUSES: LeadStatus[] = ['new', 'contacted', 'qualified', 'negotiating', 'converted', 'lost']

function formatFollowers(n: number) {
  if (n >= 1000000) return `${(n / 1000000).toFixed(1)}M`
  if (n >= 1000) return `${Math.floor(n / 1000)}K`
  return String(n)
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' })
}

function formatDateShort(iso: string) {
  return new Date(iso).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' })
}

export const LeadDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { getLead, updateLeadStatus, addNote, deleteNote } = useCRMStore()
  const [noteText, setNoteText] = useState('')
  const [activeTab, setActiveTab] = useState<'notes' | 'activity'>('notes')

  const lead = getLead(id!)
  if (!lead) {
    return (
      <div className="flex items-center justify-center h-full text-white/40">
        Lead não encontrado.{' '}
        <button onClick={() => navigate('..')} className="text-neon ml-2">Voltar</button>
      </div>
    )
  }

  const tierColor = lead.tier === 'high' ? '#00ffc8' : lead.tier === 'mid' ? '#f59e0b' : '#ff3d71'

  const handleAddNote = () => {
    if (!noteText.trim()) return
    addNote(lead.id, noteText.trim())
    setNoteText('')
  }

  return (
    <div className="p-6">
      {/* Back */}
      <button
        onClick={() => navigate('..')}
        className="flex items-center gap-2 text-xs text-white/35 hover:text-white/70 transition-colors mb-5"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polyline points="15 18 9 12 15 6" /></svg>
        Voltar para Leads
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Left col — profile */}
        <div className="space-y-4">
          {/* Profile card */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-xl p-5"
            style={{ background: 'rgba(10,10,25,0.85)', border: `1px solid ${tierColor}25`, backdropFilter: 'blur(20px)' }}
          >
            <div className="text-center">
              <img
                src={lead.avatar}
                alt={lead.name}
                className="w-20 h-20 rounded-full object-cover mx-auto mb-3"
                style={{ outline: `2px solid ${tierColor}`, outlineOffset: '2px' }}
                onError={(e) => { (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(lead.name)}&background=00ffc8&color=050510&size=128` }}
              />
              <div className="text-lg font-bold text-white">{lead.name}</div>
              <div className="text-sm font-medium mt-0.5" style={{ color: '#00ffc8' }}>{lead.handle}</div>
              <div className="text-xs text-white/35 mt-1">{lead.niche} · {lead.location}</div>

              <div className="mt-3 flex justify-center gap-2">
                <div
                  className="text-[11px] font-bold px-3 py-1 rounded-full"
                  style={{ color: tierColor, background: `${tierColor}15`, border: `1px solid ${tierColor}30` }}
                >
                  {lead.score}% Score
                </div>
                <div
                  className="text-[11px] font-semibold px-3 py-1 rounded-full"
                  style={{ color: STATUS_COLORS[lead.status], background: `${STATUS_COLORS[lead.status]}15`, border: `1px solid ${STATUS_COLORS[lead.status]}30` }}
                >
                  {STATUS_LABELS[lead.status]}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 mt-4">
              {[
                { label: 'Seguidores', value: formatFollowers(lead.followers) },
                { label: 'Engajamento', value: `${lead.engagement}%` },
                { label: 'Fonte', value: SOURCE_LABELS[lead.source] },
                { label: 'Entrada', value: new Date(lead.createdAt).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: '2-digit' }) },
              ].map((item) => (
                <div key={item.label} className="text-center p-2 rounded-lg" style={{ background: 'rgba(255,255,255,0.03)' }}>
                  <div className="text-sm font-bold text-white">{item.value}</div>
                  <div className="text-[10px] text-white/35 mt-0.5">{item.label}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="rounded-xl p-4 space-y-3"
            style={{ background: 'rgba(10,10,25,0.85)', border: '1px solid rgba(255,255,255,0.06)', backdropFilter: 'blur(20px)' }}
          >
            <div className="text-[11px] font-semibold text-white/30 uppercase tracking-wider mb-2">Contato</div>
            {[
              { icon: '✉', label: lead.email },
              { icon: '📱', label: lead.phone },
            ].map((c) => (
              <div key={c.label} className="flex items-center gap-2.5 text-sm">
                <span className="text-base">{c.icon}</span>
                <span className="text-white/60 truncate">{c.label}</span>
              </div>
            ))}
            <div className="pt-1">
              <div className="text-[10px] text-white/25 mb-1">Bio</div>
              <p className="text-xs text-white/45 leading-relaxed">{lead.bio}</p>
            </div>
          </motion.div>

          {/* Change status */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="rounded-xl p-4"
            style={{ background: 'rgba(10,10,25,0.85)', border: '1px solid rgba(255,255,255,0.06)', backdropFilter: 'blur(20px)' }}
          >
            <div className="text-[11px] font-semibold text-white/30 uppercase tracking-wider mb-3">Alterar Status</div>
            <div className="grid grid-cols-2 gap-2">
              {STATUSES.map((s) => (
                <button
                  key={s}
                  onClick={() => updateLeadStatus(lead.id, s)}
                  className="py-1.5 px-2 rounded-lg text-[11px] font-semibold transition-all text-center"
                  style={
                    lead.status === s
                      ? { color: STATUS_COLORS[s], background: `${STATUS_COLORS[s]}20`, border: `1px solid ${STATUS_COLORS[s]}40` }
                      : { color: 'rgba(255,255,255,0.35)', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }
                  }
                >
                  {STATUS_LABELS[s]}
                </button>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Right col — notes + activity */}
        <div className="lg:col-span-2 space-y-4">
          {/* Score bar */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-xl p-5"
            style={{ background: 'rgba(10,10,25,0.85)', border: '1px solid rgba(255,255,255,0.06)', backdropFilter: 'blur(20px)' }}
          >
            <div className="text-[11px] font-semibold text-white/30 uppercase tracking-wider mb-4">Diagnóstico do Perfil</div>
            <div className="grid grid-cols-3 gap-4">
              {[
                { label: 'Audiência', value: Math.min(100, lead.score + 8) },
                { label: 'Engajamento', value: Math.min(100, Math.round(lead.engagement * 9)) },
                { label: 'Potencial iGaming', value: lead.score },
              ].map((m) => (
                <div key={m.label}>
                  <div className="flex justify-between text-xs mb-1.5">
                    <span className="text-white/45">{m.label}</span>
                    <span className="font-bold" style={{ color: tierColor }}>{m.value}%</span>
                  </div>
                  <div className="h-2 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.05)' }}>
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${m.value}%` }}
                      transition={{ duration: 0.8 }}
                      className="h-full rounded-full"
                      style={{ background: tierColor, boxShadow: `0 0 8px ${tierColor}60` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08 }}
            className="rounded-xl overflow-hidden"
            style={{ background: 'rgba(10,10,25,0.85)', border: '1px solid rgba(255,255,255,0.06)', backdropFilter: 'blur(20px)' }}
          >
            {/* Tab bar */}
            <div className="flex" style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
              {(['notes', 'activity'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className="flex-1 py-3 text-sm font-semibold transition-all"
                  style={
                    activeTab === tab
                      ? { color: '#00ffc8', borderBottom: '2px solid #00ffc8' }
                      : { color: 'rgba(255,255,255,0.3)' }
                  }
                >
                  {tab === 'notes' ? `Notas (${lead.notes.length})` : `Atividades (${lead.activities.length})`}
                </button>
              ))}
            </div>

            <div className="p-4">
              <AnimatePresence mode="wait">
                {activeTab === 'notes' && (
                  <motion.div key="notes" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    {/* Add note */}
                    <div className="flex gap-2 mb-4">
                      <textarea
                        value={noteText}
                        onChange={(e) => setNoteText(e.target.value)}
                        placeholder="Adicionar uma nota sobre este lead..."
                        rows={2}
                        className="flex-1 rounded-lg px-3 py-2 text-sm text-white placeholder-white/25 outline-none resize-none"
                        style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
                        onKeyDown={(e) => { if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) handleAddNote() }}
                      />
                      <button
                        onClick={handleAddNote}
                        disabled={!noteText.trim()}
                        className="px-4 py-2 rounded-lg text-sm font-semibold transition-all disabled:opacity-30"
                        style={{ background: 'rgba(0,255,200,0.15)', color: '#00ffc8', border: '1px solid rgba(0,255,200,0.25)' }}
                      >
                        Salvar
                      </button>
                    </div>

                    {/* Notes list */}
                    {lead.notes.length === 0 ? (
                      <div className="text-center py-8 text-sm text-white/25">
                        Nenhuma nota ainda. Adicione a primeira acima.
                      </div>
                    ) : (
                      <div className="space-y-2.5">
                        {lead.notes.map((note) => (
                          <motion.div
                            key={note.id}
                            initial={{ opacity: 0, y: 6 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="group flex gap-3 p-3 rounded-lg"
                            style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.04)' }}
                          >
                            <div className="w-6 h-6 rounded-full bg-neon/20 flex items-center justify-center text-xs font-bold text-neon shrink-0 mt-0.5">
                              {note.author[0]}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="text-sm text-white/80 leading-relaxed">{note.text}</div>
                              <div className="text-[10px] text-white/25 mt-1">{note.author} · {formatDateShort(note.createdAt)}</div>
                            </div>
                            <button
                              onClick={() => deleteNote(lead.id, note.id)}
                              className="opacity-0 group-hover:opacity-100 text-white/20 hover:text-red-400 transition-all shrink-0"
                            >
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                                <polyline points="3 6 5 6 21 6" /><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
                              </svg>
                            </button>
                          </motion.div>
                        ))}
                      </div>
                    )}
                  </motion.div>
                )}

                {activeTab === 'activity' && (
                  <motion.div key="activity" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    <div className="space-y-3">
                      {lead.activities.map((act, i) => (
                        <div key={act.id} className="flex gap-3">
                          <div className="flex flex-col items-center">
                            <div
                              className="w-7 h-7 rounded-full flex items-center justify-center text-sm shrink-0"
                              style={{ background: 'rgba(0,255,200,0.1)', border: '1px solid rgba(0,255,200,0.2)' }}
                            >
                              {act.type === 'created' ? '🌱' :
                               act.type === 'status_changed' ? '🔄' :
                               act.type === 'note_added' ? '📝' : '⚡'}
                            </div>
                            {i < lead.activities.length - 1 && (
                              <div className="w-px flex-1 mt-1" style={{ background: 'rgba(255,255,255,0.05)' }} />
                            )}
                          </div>
                          <div className="pb-4">
                            <div className="text-sm text-white/75">{act.description}</div>
                            <div className="text-[11px] text-white/30 mt-0.5">{formatDate(act.createdAt)}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
