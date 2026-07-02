import React from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts'
import { useCRMStore } from '../store/crmStore'
import { STATUS_LABELS, STATUS_COLORS } from '../utils/mockData'

const areaData = [
  { day: 'Seg', leads: 4, converted: 1 },
  { day: 'Ter', leads: 7, converted: 2 },
  { day: 'Qua', leads: 5, converted: 1 },
  { day: 'Qui', leads: 12, converted: 4 },
  { day: 'Sex', leads: 9, converted: 3 },
  { day: 'Sáb', leads: 6, converted: 2 },
  { day: 'Dom', leads: 8, converted: 3 },
]

const stagger = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.07 } } }
const fadeUp = { hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0, transition: { duration: 0.35 } } }

function StatCard({ label, value, sub, color = '#00ffc8', icon }: {
  label: string
  value: string | number
  sub?: string
  color?: string
  icon: React.ReactNode
}) {
  return (
    <motion.div
      variants={fadeUp}
      className="rounded-xl p-4 flex items-start gap-4"
      style={{
        background: 'rgba(10,10,25,0.85)',
        border: '1px solid rgba(255,255,255,0.06)',
        backdropFilter: 'blur(20px)',
      }}
    >
      <div
        className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
        style={{ background: `${color}15`, border: `1px solid ${color}30` }}
      >
        <span style={{ color }}>{icon}</span>
      </div>
      <div className="min-w-0">
        <div className="text-xl font-black text-white leading-none mb-0.5">{value}</div>
        <div className="text-xs text-white/40 font-medium">{label}</div>
        {sub && <div className="text-[10px] text-white/25 mt-0.5">{sub}</div>}
      </div>
    </motion.div>
  )
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null
  return (
    <div
      className="rounded-lg px-3 py-2 text-xs"
      style={{ background: 'rgba(10,10,30,0.95)', border: '1px solid rgba(0,255,200,0.2)' }}
    >
      <div className="text-white/60 mb-1">{label}</div>
      {payload.map((p: any) => (
        <div key={p.name} style={{ color: p.color }}>
          {p.name === 'leads' ? 'Leads: ' : 'Convertidos: '}
          <strong>{p.value}</strong>
        </div>
      ))}
    </div>
  )
}

export const Dashboard: React.FC = () => {
  const navigate = useNavigate()
  const { leads, getStats } = useCRMStore()
  const stats = getStats()

  const pieData = [
    { name: 'Alto', value: stats.highTier, color: '#00ffc8' },
    { name: 'Médio', value: stats.midTier, color: '#f59e0b' },
    { name: 'Baixo', value: stats.lowTier, color: '#ff3d71' },
  ]

  const funnelData = [
    { stage: 'Novos', count: stats.new, color: '#00ffc8' },
    { stage: 'Contactados', count: stats.contacted, color: '#3b82f6' },
    { stage: 'Qualificados', count: stats.qualified, color: '#f59e0b' },
    { stage: 'Negociando', count: stats.negotiating, color: '#a855f7' },
    { stage: 'Convertidos', count: stats.converted, color: '#00e676' },
  ]
  const funnelMax = funnelData[0].count || 1

  const recentLeads = [...leads]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 8)

  return (
    <motion.div
      variants={stagger}
      initial="hidden"
      animate="show"
      className="p-6 space-y-6"
    >
      {/* KPI grid */}
      <motion.div variants={fadeUp} className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard
          label="Total de Leads"
          value={stats.total}
          sub="pipeline ativo"
          color="#00ffc8"
          icon={
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" />
              <path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
          }
        />
        <StatCard
          label="Taxa de Conversão"
          value={`${stats.conversionRate}%`}
          sub={`${stats.converted} convertidos`}
          color="#00e676"
          icon={
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" /><polyline points="17 6 23 6 23 12" />
            </svg>
          }
        />
        <StatCard
          label="Alto Potencial"
          value={stats.highTier}
          sub="score ≥ 70%"
          color="#f59e0b"
          icon={
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
          }
        />
        <StatCard
          label="Score Médio"
          value={`${stats.avgScore}%`}
          sub="média geral"
          color="#a855f7"
          icon={
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" />
            </svg>
          }
        />
      </motion.div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Area chart */}
        <motion.div
          variants={fadeUp}
          className="lg:col-span-2 rounded-xl p-5"
          style={{ background: 'rgba(10,10,25,0.85)', border: '1px solid rgba(255,255,255,0.06)', backdropFilter: 'blur(20px)' }}
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="text-sm font-semibold text-white">Leads por dia</div>
              <div className="text-xs text-white/35">Últimos 7 dias</div>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={180}>
            <AreaChart data={areaData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorLeads" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#00ffc8" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#00ffc8" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorConv" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#00e676" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#00e676" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
              <XAxis dataKey="day" tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="leads" stroke="#00ffc8" strokeWidth={2} fill="url(#colorLeads)" dot={false} />
              <Area type="monotone" dataKey="converted" stroke="#00e676" strokeWidth={2} fill="url(#colorConv)" dot={false} />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Pie chart */}
        <motion.div
          variants={fadeUp}
          className="rounded-xl p-5"
          style={{ background: 'rgba(10,10,25,0.85)', border: '1px solid rgba(255,255,255,0.06)', backdropFilter: 'blur(20px)' }}
        >
          <div className="text-sm font-semibold text-white mb-1">Distribuição de Tier</div>
          <div className="text-xs text-white/35 mb-4">Por potencial de conversão</div>
          <div className="flex justify-center">
            <PieChart width={150} height={150}>
              <Pie
                data={pieData}
                cx={75} cy={75}
                innerRadius={42}
                outerRadius={65}
                paddingAngle={3}
                dataKey="value"
              >
                {pieData.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </div>
          <div className="space-y-2 mt-2">
            {pieData.map((d) => (
              <div key={d.name} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{ background: d.color }} />
                  <span className="text-white/55">{d.name}</span>
                </div>
                <span className="text-white font-semibold">{d.value}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Funnel + Recent leads */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Funnel */}
        <motion.div
          variants={fadeUp}
          className="rounded-xl p-5"
          style={{ background: 'rgba(10,10,25,0.85)', border: '1px solid rgba(255,255,255,0.06)', backdropFilter: 'blur(20px)' }}
        >
          <div className="text-sm font-semibold text-white mb-1">Funil de Conversão</div>
          <div className="text-xs text-white/35 mb-4">Distribuição por estágio</div>
          <div className="space-y-2.5">
            {funnelData.map((f) => (
              <div key={f.stage}>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-white/50">{f.stage}</span>
                  <span className="font-semibold" style={{ color: f.color }}>{f.count}</span>
                </div>
                <div className="h-2 rounded-full bg-white/[0.04] overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(f.count / funnelMax) * 100}%` }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="h-full rounded-full"
                    style={{ background: f.color, boxShadow: `0 0 8px ${f.color}60` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Recent leads */}
        <motion.div
          variants={fadeUp}
          className="rounded-xl p-5"
          style={{ background: 'rgba(10,10,25,0.85)', border: '1px solid rgba(255,255,255,0.06)', backdropFilter: 'blur(20px)' }}
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="text-sm font-semibold text-white">Leads Recentes</div>
              <div className="text-xs text-white/35">Últimas entradas</div>
            </div>
            <button
              onClick={() => navigate('leads')}
              className="text-xs text-neon hover:text-white transition-colors"
            >
              Ver todos →
            </button>
          </div>
          <div className="space-y-2">
            {recentLeads.map((lead) => (
              <button
                key={lead.id}
                onClick={() => navigate(`leads/${lead.id}`)}
                className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-white/[0.03] transition-colors text-left"
              >
                <img
                  src={lead.avatar}
                  alt={lead.name}
                  className="w-7 h-7 rounded-full object-cover shrink-0"
                  onError={(e) => { (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(lead.name)}&background=00ffc8&color=050510&size=64` }}
                />
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-semibold text-white truncate">{lead.name}</div>
                  <div className="text-[10px] text-white/35">{lead.handle}</div>
                </div>
                <div
                  className="text-[10px] font-semibold px-2 py-0.5 rounded-full shrink-0"
                  style={{
                    color: STATUS_COLORS[lead.status],
                    background: `${STATUS_COLORS[lead.status]}15`,
                    border: `1px solid ${STATUS_COLORS[lead.status]}30`,
                  }}
                >
                  {STATUS_LABELS[lead.status]}
                </div>
              </button>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}
