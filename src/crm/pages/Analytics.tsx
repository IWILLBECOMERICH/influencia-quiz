import React from 'react'
import { motion } from 'framer-motion'
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, PieChart, Pie, Cell, Legend,
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
} from 'recharts'
import { useCRMStore } from '../store/crmStore'
import { STATUS_LABELS, STATUS_COLORS, SOURCE_LABELS } from '../utils/mockData'

const stagger = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.08 } } }
const fadeUp = { hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0, transition: { duration: 0.35 } } }

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null
  return (
    <div className="rounded-lg px-3 py-2 text-xs" style={{ background: 'rgba(10,10,30,0.95)', border: '1px solid rgba(0,255,200,0.2)' }}>
      <div className="text-white/50 mb-1">{label}</div>
      {payload.map((p: any, i: number) => (
        <div key={i} style={{ color: p.color || '#00ffc8' }}>
          {p.name}: <strong>{p.value}</strong>
        </div>
      ))}
    </div>
  )
}

const conversionTrendData = [
  { month: 'Jan', leads: 8, converted: 1 },
  { month: 'Fev', leads: 14, converted: 3 },
  { month: 'Mar', leads: 22, converted: 5 },
  { month: 'Abr', leads: 31, converted: 8 },
  { month: 'Mai', leads: 45, converted: 14 },
  { month: 'Jun', leads: 62, converted: 22 },
]

const scoreRangeData = [
  { range: '0–20%', count: 3 },
  { range: '21–40%', count: 7 },
  { range: '41–60%', count: 21 },
  { range: '61–80%', count: 30 },
  { range: '81–100%', count: 19 },
]

const nicheData = [
  { niche: 'iGaming', value: 18, color: '#00ffc8' },
  { niche: 'Games', value: 14, color: '#3b82f6' },
  { niche: 'Finanças', value: 11, color: '#f59e0b' },
  { niche: 'Lifestyle', value: 10, color: '#a855f7' },
  { niche: 'Esportes', value: 9, color: '#00e676' },
  { niche: 'Outros', value: 18, color: '#ff3d71' },
]

const radarData = [
  { subject: 'Audiência', A: 82, B: 65 },
  { subject: 'Engajamento', A: 78, B: 55 },
  { subject: 'Monetização', A: 71, B: 42 },
  { subject: 'Consistência', A: 85, B: 70 },
  { subject: 'iGaming', A: 68, B: 38 },
  { subject: 'Objetivo', A: 90, B: 60 },
]

export const Analytics: React.FC = () => {
  const { leads, getStats } = useCRMStore()
  const stats = getStats()

  const sourceDistribution = Object.entries(SOURCE_LABELS).map(([key, label]) => ({
    name: label,
    value: leads.filter((l) => l.source === key).length,
  })).filter((d) => d.value > 0)

  const sourceColors = ['#00ffc8', '#3b82f6', '#f59e0b', '#a855f7', '#00e676']

  const statusData = Object.entries(STATUS_LABELS).map(([key, label]) => ({
    name: label,
    value: leads.filter((l) => l.status === key).length,
    color: STATUS_COLORS[key],
  })).filter((d) => d.value > 0)

  return (
    <motion.div variants={stagger} initial="hidden" animate="show" className="p-6 space-y-5">
      {/* KPI row */}
      <motion.div variants={fadeUp} className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Taxa de Conversão', value: `${stats.conversionRate}%`, sub: `${stats.converted}/${stats.total}`, color: '#00ffc8' },
          { label: 'Score Médio', value: `${stats.avgScore}%`, sub: 'diagnóstico', color: '#f59e0b' },
          { label: 'Alto Potencial', value: `${Math.round((stats.highTier / stats.total) * 100)}%`, sub: `${stats.highTier} leads`, color: '#00e676' },
          { label: 'Em Negociação', value: stats.negotiating, sub: 'em andamento', color: '#a855f7' },
        ].map((kpi) => (
          <div
            key={kpi.label}
            className="rounded-xl p-4"
            style={{ background: 'rgba(10,10,25,0.85)', border: '1px solid rgba(255,255,255,0.06)', backdropFilter: 'blur(20px)' }}
          >
            <div className="text-xl font-black" style={{ color: kpi.color }}>{kpi.value}</div>
            <div className="text-xs text-white/40 font-medium mt-0.5">{kpi.label}</div>
            <div className="text-[10px] text-white/25 mt-0.5">{kpi.sub}</div>
          </div>
        ))}
      </motion.div>

      {/* Conversion trend */}
      <motion.div
        variants={fadeUp}
        className="rounded-xl p-5"
        style={{ background: 'rgba(10,10,25,0.85)', border: '1px solid rgba(255,255,255,0.06)', backdropFilter: 'blur(20px)' }}
      >
        <div className="text-sm font-semibold text-white mb-1">Evolução de Leads e Conversões</div>
        <div className="text-xs text-white/35 mb-4">Últimos 6 meses</div>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={conversionTrendData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
            <XAxis dataKey="month" tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 11 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 11 }} axisLine={false} tickLine={false} />
            <Tooltip content={<CustomTooltip />} />
            <Line type="monotone" dataKey="leads" stroke="#00ffc8" strokeWidth={2.5} dot={{ fill: '#00ffc8', r: 3 }} name="Leads" />
            <Line type="monotone" dataKey="converted" stroke="#00e676" strokeWidth={2.5} dot={{ fill: '#00e676', r: 3 }} name="Convertidos" />
          </LineChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Three charts row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Score distribution */}
        <motion.div
          variants={fadeUp}
          className="rounded-xl p-5"
          style={{ background: 'rgba(10,10,25,0.85)', border: '1px solid rgba(255,255,255,0.06)', backdropFilter: 'blur(20px)' }}
        >
          <div className="text-sm font-semibold text-white mb-1">Distribuição de Score</div>
          <div className="text-xs text-white/35 mb-4">Faixas de pontuação</div>
          <ResponsiveContainer width="100%" height={160}>
            <BarChart data={scoreRangeData} margin={{ top: 0, right: 0, left: -25, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
              <XAxis dataKey="range" tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 10 }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="count" fill="#00ffc8" radius={[4, 4, 0, 0]} name="Leads" />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* By niche */}
        <motion.div
          variants={fadeUp}
          className="rounded-xl p-5"
          style={{ background: 'rgba(10,10,25,0.85)', border: '1px solid rgba(255,255,255,0.06)', backdropFilter: 'blur(20px)' }}
        >
          <div className="text-sm font-semibold text-white mb-1">Por Nicho</div>
          <div className="text-xs text-white/35 mb-4">Distribuição de conteúdo</div>
          <div className="flex justify-center">
            <PieChart width={140} height={140}>
              <Pie data={nicheData} cx={70} cy={70} innerRadius={38} outerRadius={60} paddingAngle={2} dataKey="value">
                {nicheData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
              </Pie>
            </PieChart>
          </div>
          <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 mt-2">
            {nicheData.map((d) => (
              <div key={d.niche} className="flex items-center gap-1.5 text-[11px]">
                <div className="w-2 h-2 rounded-full shrink-0" style={{ background: d.color }} />
                <span className="text-white/45 truncate">{d.niche}</span>
                <span className="text-white/70 font-semibold ml-auto">{d.value}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* By source */}
        <motion.div
          variants={fadeUp}
          className="rounded-xl p-5"
          style={{ background: 'rgba(10,10,25,0.85)', border: '1px solid rgba(255,255,255,0.06)', backdropFilter: 'blur(20px)' }}
        >
          <div className="text-sm font-semibold text-white mb-1">Por Fonte</div>
          <div className="text-xs text-white/35 mb-4">Origem dos leads</div>
          <div className="space-y-2.5">
            {sourceDistribution.map((d, i) => {
              const max = Math.max(...sourceDistribution.map((x) => x.value))
              return (
                <div key={d.name}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-white/45">{d.name}</span>
                    <span className="font-semibold" style={{ color: sourceColors[i % sourceColors.length] }}>{d.value}</span>
                  </div>
                  <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.04)' }}>
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${(d.value / max) * 100}%` }}
                      transition={{ duration: 0.8, delay: i * 0.1 }}
                      className="h-full rounded-full"
                      style={{ background: sourceColors[i % sourceColors.length] }}
                    />
                  </div>
                </div>
              )
            })}
          </div>
        </motion.div>
      </div>

      {/* Radar + Status */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Radar */}
        <motion.div
          variants={fadeUp}
          className="rounded-xl p-5"
          style={{ background: 'rgba(10,10,25,0.85)', border: '1px solid rgba(255,255,255,0.06)', backdropFilter: 'blur(20px)' }}
        >
          <div className="text-sm font-semibold text-white mb-1">Perfil Médio vs Ideal</div>
          <div className="text-xs text-white/35 mb-4">Comparação de métricas</div>
          <ResponsiveContainer width="100%" height={220}>
            <RadarChart data={radarData}>
              <PolarGrid stroke="rgba(255,255,255,0.06)" />
              <PolarAngleAxis dataKey="subject" tick={{ fill: 'rgba(255,255,255,0.35)', fontSize: 11 }} />
              <PolarRadiusAxis tick={false} axisLine={false} domain={[0, 100]} />
              <Radar name="Média atual" dataKey="A" stroke="#00ffc8" fill="#00ffc8" fillOpacity={0.12} strokeWidth={2} />
              <Radar name="Ideal" dataKey="B" stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.06} strokeWidth={1.5} strokeDasharray="4 2" />
              <Legend iconSize={8} wrapperStyle={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)' }} />
            </RadarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Status breakdown */}
        <motion.div
          variants={fadeUp}
          className="rounded-xl p-5"
          style={{ background: 'rgba(10,10,25,0.85)', border: '1px solid rgba(255,255,255,0.06)', backdropFilter: 'blur(20px)' }}
        >
          <div className="text-sm font-semibold text-white mb-1">Breakdown por Status</div>
          <div className="text-xs text-white/35 mb-4">Estado atual do pipeline</div>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={statusData} layout="vertical" margin={{ top: 0, right: 10, left: 10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" horizontal={false} />
              <XAxis type="number" tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis type="category" dataKey="name" tick={{ fill: 'rgba(255,255,255,0.45)', fontSize: 11 }} axisLine={false} tickLine={false} width={75} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="value" radius={[0, 4, 4, 0]} name="Leads">
                {statusData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>
    </motion.div>
  )
}
