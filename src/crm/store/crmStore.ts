import { create } from 'zustand'
import type { Lead, Note, LeadStatus, Activity, LeadTier } from '../types'
import { MOCK_LEADS } from '../utils/mockData'

const QUIZ_API = 'https://quiz-influencia.online/api/save-lead.php'

interface RealLead {
  id: string
  handle: string
  whatsapp: string
  score: number
  tier: string
  earnings: string
  createdAt: string
}

function realLeadToLead(r: RealLead): Lead {
  return {
    id: r.id,
    name: r.handle.replace('@', '').replace('_', ' '),
    handle: r.handle.startsWith('@') ? r.handle : `@${r.handle}`,
    email: `${r.handle.replace('@', '').replace('_', '.')}@gmail.com`,
    phone: r.whatsapp,
    avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(r.handle)}&background=00ffc8&color=050510&size=128`,
    score: r.score,
    tier: (r.tier as LeadTier) || 'low',
    status: 'new',
    source: 'quiz',
    followers: 0,
    engagement: parseFloat((r.score / 14).toFixed(1)),
    niche: 'iGaming',
    location: 'Brasil',
    bio: `Lead captado via quiz. Potencial estimado: R$ ${r.earnings}/mês.`,
    monthlyRevenue: undefined,
    notes: [],
    activities: [
      {
        id: `act_real_${r.id}`,
        type: 'created',
        description: 'Lead captado via quiz de qualificação (WhatsApp coletado)',
        createdAt: r.createdAt,
      },
    ],
    createdAt: r.createdAt,
    updatedAt: r.createdAt,
  }
}

interface User {
  id: string
  name: string
  email: string
  role: string
}

interface CRMState {
  user: User | null
  leads: Lead[]
  realLeadsLoaded: boolean
  searchQuery: string
  filterStatus: string
  filterTier: string
  filterSource: string
  currentPage: number
  pageSize: number

  setUser: (user: User | null) => void
  logout: () => void
  fetchRealLeads: () => Promise<void>
  setSearchQuery: (q: string) => void
  setFilterStatus: (s: string) => void
  setFilterTier: (t: string) => void
  setFilterSource: (s: string) => void
  setCurrentPage: (p: number) => void

  updateLeadStatus: (id: string, status: LeadStatus) => void
  addNote: (id: string, text: string) => void
  deleteNote: (leadId: string, noteId: string) => void
  getLead: (id: string) => Lead | undefined

  getFilteredLeads: () => Lead[]
  getStats: () => {
    total: number
    new: number
    contacted: number
    qualified: number
    negotiating: number
    converted: number
    lost: number
    conversionRate: number
    avgScore: number
    highTier: number
    midTier: number
    lowTier: number
  }
}

export const useCRMStore = create<CRMState>((set, get) => {
  const savedUser = localStorage.getItem('crmUser')
  const initialUser = savedUser ? JSON.parse(savedUser) : null

  return {
    user: initialUser,
    leads: MOCK_LEADS,
    realLeadsLoaded: false,
    searchQuery: '',
    filterStatus: '',
    filterTier: '',
    filterSource: '',
    currentPage: 1,
    pageSize: 15,

    setUser: (user) => set({ user }),
    logout: () => {
      localStorage.removeItem('crmUser')
      set({ user: null })
    },

    fetchRealLeads: async () => {
    try {
      const res = await fetch(QUIZ_API)
      if (!res.ok) return
      const data: RealLead[] = await res.json()
      if (!Array.isArray(data) || data.length === 0) return
      const realLeads = data.map(realLeadToLead)
      set((state) => {
        const existingIds = new Set(state.leads.map((l) => l.id))
        const newLeads = realLeads.filter((l) => !existingIds.has(l.id))
        return { leads: [...newLeads, ...state.leads], realLeadsLoaded: true }
      })
    } catch {
      // silently ignore — works offline too
    }
  },

  setSearchQuery: (q) => set({ searchQuery: q, currentPage: 1 }),
  setFilterStatus: (s) => set({ filterStatus: s, currentPage: 1 }),
  setFilterTier: (t) => set({ filterTier: t, currentPage: 1 }),
  setFilterSource: (s) => set({ filterSource: s, currentPage: 1 }),
  setCurrentPage: (p) => set({ currentPage: p }),

  updateLeadStatus: (id, status) => {
    const now = new Date().toISOString()
    set((state) => ({
      leads: state.leads.map((l) =>
        l.id === id
          ? {
              ...l,
              status,
              updatedAt: now,
              activities: [
                {
                  id: `act_${Date.now()}`,
                  type: 'status_changed',
                  description: `Status alterado para ${status}`,
                  createdAt: now,
                },
                ...l.activities,
              ],
            }
          : l
      ),
    }))
  },

  addNote: (id, text) => {
    const now = new Date().toISOString()
    const note: Note = {
      id: `note_${Date.now()}`,
      text,
      author: 'Você',
      createdAt: now,
    }
    const activity: Activity = {
      id: `act_${Date.now()}`,
      type: 'note_added',
      description: 'Nota adicionada ao perfil',
      createdAt: now,
    }
    set((state) => ({
      leads: state.leads.map((l) =>
        l.id === id
          ? {
              ...l,
              updatedAt: now,
              notes: [note, ...l.notes],
              activities: [activity, ...l.activities],
            }
          : l
      ),
    }))
  },

  deleteNote: (leadId, noteId) => {
    set((state) => ({
      leads: state.leads.map((l) =>
        l.id === leadId
          ? { ...l, notes: l.notes.filter((n) => n.id !== noteId) }
          : l
      ),
    }))
  },

  getLead: (id) => get().leads.find((l) => l.id === id),

  getFilteredLeads: () => {
    const { leads, searchQuery, filterStatus, filterTier, filterSource } = get()
    return leads.filter((l) => {
      if (
        searchQuery &&
        !l.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !l.handle.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !l.email.toLowerCase().includes(searchQuery.toLowerCase())
      )
        return false
      if (filterStatus && l.status !== filterStatus) return false
      if (filterTier && l.tier !== filterTier) return false
      if (filterSource && l.source !== filterSource) return false
      return true
    })
  },

  getStats: () => {
    const { leads } = get()
    const total = leads.length
    const byStatus = (s: string) => leads.filter((l) => l.status === s).length
    const converted = byStatus('converted')
    return {
      total,
      new: byStatus('new'),
      contacted: byStatus('contacted'),
      qualified: byStatus('qualified'),
      negotiating: byStatus('negotiating'),
      converted,
      lost: byStatus('lost'),
      conversionRate: Math.round((converted / total) * 100),
      avgScore: Math.round(leads.reduce((a, l) => a + l.score, 0) / total),
      highTier: leads.filter((l) => l.tier === 'high').length,
      midTier: leads.filter((l) => l.tier === 'mid').length,
      lowTier: leads.filter((l) => l.tier === 'low').length,
    }
  },
  }
})
