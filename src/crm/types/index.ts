export type LeadTier = 'high' | 'mid' | 'low'

export type LeadStatus =
  | 'new'
  | 'contacted'
  | 'qualified'
  | 'negotiating'
  | 'converted'
  | 'lost'

export type LeadSource = 'quiz' | 'instagram' | 'whatsapp' | 'referral' | 'ads'

export type ActivityType =
  | 'created'
  | 'status_changed'
  | 'note_added'
  | 'contacted'
  | 'qualified'
  | 'converted'

export interface Note {
  id: string
  text: string
  author: string
  createdAt: string
}

export interface Activity {
  id: string
  type: ActivityType
  description: string
  createdAt: string
}

export interface Lead {
  id: string
  name: string
  handle: string
  email: string
  phone: string
  avatar: string
  score: number
  tier: LeadTier
  status: LeadStatus
  source: LeadSource
  followers: number
  engagement: number
  niche: string
  location: string
  bio: string
  monthlyRevenue?: number
  notes: Note[]
  activities: Activity[]
  createdAt: string
  updatedAt: string
}

export interface CRMStats {
  totalLeads: number
  newLeads: number
  contacted: number
  qualified: number
  converted: number
  lost: number
  conversionRate: number
  avgScore: number
  totalRevenuePotential: number
}
