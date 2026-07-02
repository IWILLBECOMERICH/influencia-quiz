import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useQuizStore } from '@store/quizStore'
import { useConfetti } from '@hooks/useConfetti'
import { Button } from '@components/ui/Button'
import { ProgressBar } from '@components/features/ProgressBar'
import { INSIGHTS_DATA, RESULT_TEMPLATES } from '@utils/questions'
import type { GameTier } from '@types'

const SAVE_LEAD_URL = 'https://quiz-influencia.online/api/save-lead.php'
const WHATSAPP_NUMBER = '5527981226077'

interface ResultProps {
  onNavigate: (page: string) => void
}

const stagger = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.13 } },
}

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45 } },
}

function calcEarnings(tier: GameTier, percentage: number): string {
  let value: number
  if (tier === 'high') value = 8000 + Math.round(((percentage - 70) / 30) * 17000)
  else if (tier === 'mid') value = 3000 + Math.round(((percentage - 40) / 30) * 5000)
  else value = 1200 + Math.round((percentage / 40) * 1800)
  value = Math.max(800, Math.round(value / 500) * 500)
  return value.toLocaleString('pt-BR')
}

function formatPhone(raw: string): string {
  const d = raw.replace(/\D/g, '')
  if (d.length <= 2) return d
  if (d.length <= 7) return `(${d.slice(0, 2)}) ${d.slice(2)}`
  if (d.length <= 11) return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`
  return `+${d.slice(0, 2)} (${d.slice(2, 4)}) ${d.slice(4, 9)}-${d.slice(9, 13)}`
}

export const Result: React.FC<ResultProps> = ({ onNavigate }) => {
  const { handle, score, questions, resetGame } = useQuizStore()
  const { finalCelebration } = useConfetti()

  const maxScore = questions.length * 4
  const percentage = Math.round((score / maxScore) * 100)
  const tier: GameTier = percentage >= 70 ? 'high' : percentage >= 40 ? 'mid' : 'low'
  const template = RESULT_TEMPLATES[tier]
  const insights = INSIGHTS_DATA[tier]
  const earnings = calcEarnings(tier, percentage)

  const [showModal, setShowModal] = useState(false)
  const [phone, setPhone] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    finalCelebration()
  }, [finalCelebration])

  const handleRestart = () => {
    resetGame()
    onNavigate('landing')
  }

  const handleWhatsAppSubmit = async () => {
    if (phone.replace(/\D/g, '').length < 10) return
    setSubmitting(true)
    const cleanPhone = phone.replace(/\D/g, '')

    try {
      await fetch(SAVE_LEAD_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          handle: handle || 'sem_handle',
          whatsapp: cleanPhone,
          score: percentage,
          tier,
          earnings,
        }),
      })
    } catch {
      // silently ignore network errors — still opens WhatsApp
    }

    const msg = encodeURIComponent(
      `Olá! Acabei de fazer o diagnóstico da Influência Global 🎯\n\n` +
      `📊 Handle: ${handle}\n` +
      `🏆 Score: ${percentage}%\n` +
      `💰 Potencial estimado: R$ ${earnings}/mês\n\n` +
      `Quero receber minha proposta!`
    )
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, '_blank')
    setSubmitting(false)
    setSubmitted(true)
    setShowModal(false)
  }

  const tierBadgeColor =
    tier === 'high'
      ? { text: 'text-neon', border: 'rgba(0,255,200,0.35)', bg: 'rgba(0,255,200,0.08)', glow: 'rgba(0,255,200,0.2)', hex: '#00ffc8' }
      : tier === 'mid'
      ? { text: 'text-gold', border: 'rgba(245,158,11,0.35)', bg: 'rgba(245,158,11,0.08)', glow: 'rgba(245,158,11,0.15)', hex: '#f59e0b' }
      : { text: 'text-white/70', border: 'rgba(255,255,255,0.15)', bg: 'rgba(255,255,255,0.04)', glow: 'none', hex: '#ffffff' }

  return (
    <>
      <motion.div
        variants={stagger}
        initial="hidden"
        animate="show"
        className="w-full max-w-md mx-auto px-2"
      >
        {/* Header */}
        <motion.div variants={fadeUp} className="text-center mb-7">
          <div className="text-[11px] text-white/35 uppercase tracking-[0.2em] mb-2">
            Diagnóstico concluído
          </div>
          <h1 className="text-3xl font-black leading-tight">
            Seu perfil foi{' '}
            <span className="text-neon" style={{ textShadow: '0 0 30px rgba(0,255,200,0.4)' }}>
              analisado
            </span>
          </h1>
        </motion.div>

        {/* Score card */}
        <motion.div variants={fadeUp} className="mb-5">
          <div
            className="rounded-2xl p-7 text-center"
            style={{
              background: 'rgba(10,10,25,0.92)',
              border: `1px solid ${tierBadgeColor.border}`,
              backdropFilter: 'blur(24px)',
              boxShadow: `0 0 40px ${tierBadgeColor.glow}, 0 20px 60px rgba(0,0,0,0.5)`,
            }}
          >
            <div className="text-sm text-white/40 mb-5">
              Análise de <span className="text-neon font-semibold">{handle}</span>
            </div>

            <div className="relative w-36 h-36 mx-auto mb-5">
              <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 144 144">
                <circle cx="72" cy="72" r="62" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="8" />
                <motion.circle
                  cx="72" cy="72" r="62"
                  fill="none"
                  stroke="#00ffc8"
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeDasharray={`${2 * Math.PI * 62}`}
                  initial={{ strokeDashoffset: 2 * Math.PI * 62 }}
                  animate={{ strokeDashoffset: 2 * Math.PI * 62 * (1 - percentage / 100) }}
                  transition={{ duration: 1.2, ease: 'easeOut', delay: 0.3 }}
                  style={{ filter: 'drop-shadow(0 0 8px #00ffc8)' }}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <motion.span
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                  className="text-4xl font-black text-neon"
                  style={{ textShadow: '0 0 20px rgba(0,255,200,0.5)' }}
                >
                  {percentage}
                </motion.span>
                <span className="text-xs text-white/35 font-medium">%</span>
              </div>
            </div>

            <div
              className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-bold mb-4 ${tierBadgeColor.text}`}
              style={{ border: `1px solid ${tierBadgeColor.border}`, background: tierBadgeColor.bg }}
            >
              {template.title}
            </div>

            <p className="text-sm text-white/55 leading-relaxed">
              Com base nas suas respostas, você pode ter potencial para operar com uma estrutura mais profissional, com suporte, processo e acompanhamento.
            </p>
          </div>
        </motion.div>

        {/* Earnings card */}
        <motion.div variants={fadeUp} className="mb-5">
          <div
            className="rounded-2xl p-6 text-center relative overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, rgba(0,255,200,0.06) 0%, rgba(0,168,120,0.03) 100%)',
              border: '1px solid rgba(0,255,200,0.2)',
              backdropFilter: 'blur(24px)',
              boxShadow: '0 0 40px rgba(0,255,200,0.07)',
            }}
          >
            {/* shimmer */}
            <motion.div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: 'linear-gradient(105deg, transparent 40%, rgba(0,255,200,0.06) 50%, transparent 60%)',
              }}
              animate={{ x: ['-100%', '200%'] }}
              transition={{ duration: 3, repeat: Infinity, repeatDelay: 2, ease: 'linear' }}
            />

            <div className="text-[11px] font-semibold text-neon/60 uppercase tracking-[0.2em] mb-2">
              💰 Potencial de ganhos estimado
            </div>
            <div className="text-[11px] text-white/35 mb-4">
              Criadores com perfil similar ao seu estão gerando:
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6, duration: 0.5, type: 'spring' }}
              className="mb-1"
            >
              <span className="text-4xl font-black text-neon" style={{ textShadow: '0 0 30px rgba(0,255,200,0.5)' }}>
                R$ {earnings}
              </span>
              <span className="text-base font-semibold text-neon/70">/mês</span>
            </motion.div>

            <div className="text-xs text-white/35 mb-4">
              {tier === 'high' ? 'estimativa baseada em operações ativas de alto volume'
                : tier === 'mid' ? 'estimativa para perfis em crescimento com suporte'
                : 'estimativa inicial com estrutura profissional'}
            </div>

            <div className="flex justify-center gap-4 text-[11px] text-white/40">
              <div className="flex items-center gap-1">
                <div className="w-1.5 h-1.5 rounded-full bg-neon/50" />
                {tier === 'high' ? 'R$ 8.000 mín.' : tier === 'mid' ? 'R$ 3.000 mín.' : 'R$ 1.200 mín.'}
              </div>
              <div className="flex items-center gap-1">
                <div className="w-1.5 h-1.5 rounded-full bg-neon" />
                {tier === 'high' ? 'R$ 25.000 máx.' : tier === 'mid' ? 'R$ 8.000 máx.' : 'R$ 3.000 máx.'}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Profile analysis */}
        <motion.div variants={fadeUp} className="mb-4">
          <div
            className="rounded-2xl p-5"
            style={{ background: 'rgba(10,10,25,0.85)', border: '1px solid rgba(255,255,255,0.06)', backdropFilter: 'blur(20px)' }}
          >
            <div className="text-[11px] font-semibold text-white/35 uppercase tracking-[0.15em] mb-4">
              Análise do perfil
            </div>
            <div className="space-y-3.5">
              {insights.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + i * 0.1 }}
                  className="flex items-start gap-3"
                >
                  <span className="text-base mt-0.5 flex-shrink-0">{item.icon}</span>
                  <span className="text-sm text-white/65 leading-snug">{item.text}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Metrics */}
        <motion.div variants={fadeUp} className="mb-6">
          <div
            className="rounded-2xl p-5"
            style={{ background: 'rgba(10,10,25,0.85)', border: '1px solid rgba(255,255,255,0.06)', backdropFilter: 'blur(20px)' }}
          >
            <div className="text-[11px] font-semibold text-white/35 uppercase tracking-[0.15em] mb-4">
              Métricas estimadas
            </div>
            <div className="space-y-4">
              {[
                { label: 'Engajamento', value: insights[0].bar },
                { label: 'Potencial de Conversão', value: insights[1].bar },
                { label: 'Ranking no Nicho', value: insights[2].bar },
              ].map((metric, i) => (
                <motion.div key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 + i * 0.15 }}>
                  <div className="flex justify-between text-xs mb-2">
                    <span className="text-white/55">{metric.label}</span>
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.8 + i * 0.15 }}
                      className="text-neon font-bold"
                    >
                      {metric.value}%
                    </motion.span>
                  </div>
                  <ProgressBar progress={metric.value} max={100} animated height="thick" />
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* CTAs */}
        <motion.div variants={fadeUp} className="space-y-3 pb-8">
          {submitted ? (
            <div
              className="w-full py-4 rounded-2xl text-center text-sm font-semibold text-neon"
              style={{ background: 'rgba(0,255,200,0.08)', border: '1px solid rgba(0,255,200,0.2)' }}
            >
              ✅ Proposta enviada! Verifique seu WhatsApp.
            </div>
          ) : (
            <motion.button
              onClick={() => setShowModal(true)}
              className="w-full py-4 rounded-2xl text-sm font-black tracking-wide relative overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, #00ffc8, #00a878)',
                color: '#050510',
                boxShadow: '0 0 30px rgba(0,255,200,0.4)',
              }}
              whileHover={{ scale: 1.02, boxShadow: '0 0 45px rgba(0,255,200,0.55)' }}
              whileTap={{ scale: 0.98 }}
              animate={{ boxShadow: ['0 0 30px rgba(0,255,200,0.4)', '0 0 50px rgba(0,255,200,0.65)', '0 0 30px rgba(0,255,200,0.4)'] }}
              transition={{ boxShadow: { duration: 2.2, repeat: Infinity } }}
            >
              <motion.div
                className="absolute inset-0"
                style={{ background: 'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.25) 50%, transparent 60%)' }}
                animate={{ x: ['-100%', '200%'] }}
                transition={{ duration: 2.8, repeat: Infinity, repeatDelay: 1.5, ease: 'linear' }}
              />
              <span className="relative flex items-center justify-center gap-3">
                <span className="text-lg">📲</span>
                RECEBER MINHA PROPOSTA NO WHATSAPP
                <motion.span animate={{ x: [0, 4, 0] }} transition={{ duration: 1.2, repeat: Infinity }}>→</motion.span>
              </span>
            </motion.button>
          )}

          <Button
            onClick={handleRestart}
            variant="secondary"
            size="md"
            className="w-full text-white/50 hover:text-white"
          >
            Refazer quiz
          </Button>
        </motion.div>
      </motion.div>

      {/* WhatsApp Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4"
            style={{ background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(8px)' }}
            onClick={(e) => { if (e.target === e.currentTarget) setShowModal(false) }}
          >
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 40, scale: 0.95 }}
              transition={{ type: 'spring', duration: 0.4 }}
              className="w-full max-w-sm rounded-3xl p-6"
              style={{
                background: 'rgba(8,8,22,0.98)',
                border: '1px solid rgba(0,255,200,0.2)',
                boxShadow: '0 0 60px rgba(0,255,200,0.1), 0 30px 80px rgba(0,0,0,0.7)',
              }}
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-5">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <div
                      className="w-8 h-8 rounded-xl flex items-center justify-center text-base"
                      style={{ background: 'rgba(0,255,200,0.12)', border: '1px solid rgba(0,255,200,0.2)' }}
                    >
                      📲
                    </div>
                    <span className="text-base font-black text-white">Quase lá!</span>
                  </div>
                  <p className="text-xs text-white/40 leading-relaxed">
                    Informe seu WhatsApp para receber sua proposta personalizada
                  </p>
                </div>
                <button onClick={() => setShowModal(false)} className="text-white/25 hover:text-white/60 transition-colors mt-0.5">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </div>

              {/* Earnings reminder */}
              <div
                className="rounded-xl p-3 mb-4 flex items-center gap-3"
                style={{ background: 'rgba(0,255,200,0.06)', border: '1px solid rgba(0,255,200,0.12)' }}
              >
                <div className="text-2xl font-black text-neon leading-none">R$ {earnings}</div>
                <div>
                  <div className="text-[10px] text-neon/60 font-semibold uppercase tracking-wider">potencial/mês</div>
                  <div className="text-[11px] text-white/40">receba a proposta completa</div>
                </div>
              </div>

              {/* Phone input */}
              <div className="mb-4">
                <label className="block text-xs font-semibold text-white/40 mb-2 uppercase tracking-wider">
                  Número do WhatsApp
                </label>
                <div
                  className="flex items-center gap-2 px-4 py-3 rounded-xl"
                  style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)' }}
                >
                  <span className="text-sm font-semibold text-white/35 shrink-0">🇧🇷 +55</span>
                  <div className="w-px h-4 bg-white/10" />
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(formatPhone(e.target.value))}
                    placeholder="(11) 99999-9999"
                    maxLength={16}
                    autoFocus
                    className="flex-1 bg-transparent text-sm text-white placeholder-white/20 outline-none font-medium"
                    onKeyDown={(e) => { if (e.key === 'Enter') handleWhatsAppSubmit() }}
                  />
                </div>
              </div>

              {/* Submit */}
              <motion.button
                onClick={handleWhatsAppSubmit}
                disabled={submitting || phone.replace(/\D/g, '').length < 10}
                className="w-full py-3.5 rounded-xl text-sm font-black tracking-wide flex items-center justify-center gap-2 transition-all disabled:opacity-40"
                style={{
                  background: 'linear-gradient(135deg, #25d366, #128c3d)',
                  color: '#fff',
                  boxShadow: submitting ? 'none' : '0 0 20px rgba(37,211,102,0.35)',
                }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {submitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Enviando...
                  </>
                ) : (
                  <>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                    ABRIR WHATSAPP AGORA
                  </>
                )}
              </motion.button>

              <p className="text-center text-[10px] text-white/25 mt-3">
                🔒 Seus dados são 100% privados. Sem spam.
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
