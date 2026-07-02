import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useQuizStore } from '@store/quizStore'

interface ScanningProps {
  onComplete: () => void
}

const STEPS = [
  { label: 'Verificando perfil público', sub: 'Usuário encontrado' },
  { label: 'Mapeando métricas de engajamento', sub: 'Dados coletados' },
  { label: 'Calculando potencial de conversão', sub: 'Analisando padrões...' },
  { label: 'Montando diagnóstico personalizado', sub: 'Aguarde...' },
]

const METRICS = [
  { label: 'AUDIÊNCIA QUALIFICADA', value: '82%' },
  { label: 'ENGAJAMENTO ACIMA DA MÉDIA', value: '78%' },
  { label: 'POTENCIAL DE CONVERSÃO', value: '89%' },
]

const STATS = [
  { value: '+20', label: 'Métricas\nanalisadas' },
  { value: '+10M', label: 'Dados\nprocessados' },
  { value: 'IA', label: 'Inteligência\navançada' },
  { value: '100%', label: 'Seguro e\nconfidencial' },
]

export const Scanning: React.FC<ScanningProps> = ({ onComplete }) => {
  const handle = useQuizStore((s) => s.handle)
  const [activeStep, setActiveStep] = useState(-1)
  const [done, setDone] = useState(false)

  const progress = activeStep < 0 ? 0 : Math.round(((activeStep + 1) / STEPS.length) * 100)

  useEffect(() => {
    let current = -1
    const interval = setInterval(() => {
      current++
      setActiveStep(current)
      if (current >= STEPS.length - 1) {
        clearInterval(interval)
        setDone(true)
        setTimeout(onComplete, 800)
      }
    }, 900)
    return () => clearInterval(interval)
  }, [onComplete])

  const radius = 52
  const circumference = 2 * Math.PI * radius

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="w-full max-w-md mx-auto px-3 py-2"
    >
      {/* ─── TOP BAR ─── */}
      <div className="flex items-start justify-between mb-5">
        <div>
          <div className="text-[9.5px] font-bold tracking-[0.2em] text-white/35 uppercase mb-2.5">
            ETAPA 1 DE 3
          </div>
          <div className="flex items-center gap-0">
            {[1, 2, 3].map((step) => {
              const completed = step < 1
              const current = step === 1
              return (
                <React.Fragment key={step}>
                  <div
                    className="w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-black flex-shrink-0"
                    style={{
                      background: completed
                        ? '#00ffc8'
                        : current
                        ? 'transparent'
                        : 'transparent',
                      border: completed
                        ? '2px solid #00ffc8'
                        : current
                        ? '2px solid #00ffc8'
                        : '2px solid rgba(255,255,255,0.15)',
                      color: completed ? '#050510' : current ? '#00ffc8' : 'rgba(255,255,255,0.2)',
                      boxShadow: current ? '0 0 12px rgba(0,255,200,0.4)' : 'none',
                    }}
                  >
                    {completed ? '✓' : step}
                  </div>
                  {step < 3 && (
                    <div
                      className="w-10 h-px"
                      style={{
                        background: completed
                          ? '#00ffc8'
                          : 'rgba(255,255,255,0.1)',
                      }}
                    />
                  )}
                </React.Fragment>
              )
            })}
          </div>
        </div>

        {/* Secure badge */}
        <div
          className="px-3 py-2 rounded-xl text-right flex-shrink-0"
          style={{
            background: 'rgba(0,255,200,0.05)',
            border: '1px solid rgba(0,255,200,0.2)',
          }}
        >
          <div className="flex items-center gap-1.5 justify-end mb-0.5">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#00ffc8" strokeWidth="2.5">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
            <span className="text-[9px] font-bold tracking-[0.15em] text-neon uppercase">ANÁLISE SEGURA</span>
          </div>
          <div className="text-[8.5px] text-white/30">100% confidencial</div>
        </div>
      </div>

      {/* ─── MAIN CARD ─── */}
      <div
        className="rounded-2xl p-5 mb-4"
        style={{
          background: 'rgba(8,12,28,0.96)',
          border: '1px solid rgba(0,255,200,0.18)',
          boxShadow: '0 0 50px rgba(0,255,200,0.06)',
        }}
      >
        {/* Section label */}
        <div className="flex items-center gap-2 mb-3">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="rgba(0,255,200,0.65)" strokeWidth="2">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
          <span className="text-[9.5px] font-bold tracking-[0.18em] text-white/40 uppercase">
            ANALISANDO SEU PERFIL
          </span>
        </div>

        {/* Profile chip */}
        <div
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl mb-4"
          style={{
            background: 'rgba(0,255,200,0.05)',
            border: '1px solid rgba(0,255,200,0.15)',
          }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" strokeWidth="0">
            <defs>
              <linearGradient id="ig" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#f09433" />
                <stop offset="25%" stopColor="#e6683c" />
                <stop offset="50%" stopColor="#dc2743" />
                <stop offset="75%" stopColor="#cc2366" />
                <stop offset="100%" stopColor="#bc1888" />
              </linearGradient>
            </defs>
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5" fill="url(#ig)" />
            <circle cx="12" cy="12" r="4.5" fill="none" stroke="white" strokeWidth="1.5" />
            <circle cx="17.5" cy="6.5" r="1" fill="white" />
          </svg>
          <span className="text-[11px] font-bold text-white/80">{handle}</span>
          <span className="text-[9px] text-white/30">· Criador(a) de conteúdo</span>
          <span
            className="w-1.5 h-1.5 rounded-full bg-neon animate-pulse ml-1"
            style={{ boxShadow: '0 0 5px #00ffc8' }}
          />
        </div>

        {/* Headline */}
        <h2 className="text-[2rem] font-black leading-[1.08] mb-3">
          <span className="text-white">Estamos<br />analisando </span>
          <span
            className="text-neon"
            style={{ textShadow: '0 0 30px rgba(0,255,200,0.4)' }}
          >
            seu perfil
          </span>
        </h2>

        <p className="text-[13px] text-white/40 leading-relaxed mb-5">
          Nosso sistema está cruzando dados públicos, comportamentais e de engajamento para gerar seu diagnóstico personalizado.
        </p>

        {/* ── Ring + Metrics ── */}
        <div className="flex gap-4 mb-5">
          {/* Circular progress */}
          <div className="flex-shrink-0 flex items-center justify-center">
            <div className="relative" style={{ width: 130, height: 130 }}>
              <svg
                className="absolute inset-0 w-full h-full"
                style={{ transform: 'rotate(-90deg)' }}
                viewBox="0 0 130 130"
              >
                {/* Track */}
                <circle
                  cx="65" cy="65" r={radius}
                  fill="none"
                  stroke="rgba(0,255,200,0.07)"
                  strokeWidth="9"
                />
                {/* Outer glow ring */}
                <circle
                  cx="65" cy="65" r={radius}
                  fill="none"
                  stroke="rgba(0,255,200,0.04)"
                  strokeWidth="16"
                />
                {/* Progress */}
                <motion.circle
                  cx="65" cy="65" r={radius}
                  fill="none"
                  stroke="#00ffc8"
                  strokeWidth="9"
                  strokeLinecap="round"
                  strokeDasharray={circumference}
                  animate={{ strokeDashoffset: circumference * (1 - progress / 100) }}
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                  style={{ filter: 'drop-shadow(0 0 8px rgba(0,255,200,0.8))' }}
                />
              </svg>

              <div className="absolute inset-0 flex flex-col items-center justify-center gap-0.5">
                <div className="text-[8px] font-bold tracking-widest text-white/35 uppercase">
                  ANALISANDO
                </div>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={progress}
                    initial={{ opacity: 0, scale: 0.7 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="font-black text-neon leading-none"
                    style={{
                      fontSize: 30,
                      textShadow: '0 0 20px rgba(0,255,200,0.6)',
                    }}
                  >
                    {progress}%
                  </motion.div>
                </AnimatePresence>
                <div className="text-[7.5px] font-bold tracking-widest text-white/30 uppercase text-center leading-tight">
                  ESCANEANDO<br />DADOS
                </div>
              </div>
            </div>
          </div>

          {/* Metric cards */}
          <div className="flex-1 flex flex-col gap-2">
            {METRICS.map((m, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: activeStep >= i ? 1 : 0.18, x: 0 }}
                transition={{ delay: i * 0.15, duration: 0.4 }}
                className="px-3 py-2 rounded-xl flex items-center justify-between"
                style={{
                  background: 'rgba(0,255,200,0.04)',
                  border: `1px solid ${activeStep >= i ? 'rgba(0,255,200,0.18)' : 'rgba(255,255,255,0.04)'}`,
                }}
              >
                <div
                  className="text-[8.5px] font-bold text-white/40 uppercase leading-tight tracking-wide"
                  style={{ maxWidth: 80 }}
                >
                  {m.label}
                </div>
                <div
                  className="text-lg font-black text-neon flex-shrink-0"
                  style={{ textShadow: activeStep >= i ? '0 0 16px rgba(0,255,200,0.5)' : 'none' }}
                >
                  {m.value}
                </div>
              </motion.div>
            ))}

            {/* Scanning progress bar */}
            <div
              className="px-3 py-2 rounded-xl"
              style={{
                background: 'rgba(0,255,200,0.04)',
                border: '1px solid rgba(0,255,200,0.12)',
              }}
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[8.5px] font-bold text-white/35 uppercase tracking-wider">
                  SCANEANDO...
                </span>
                <span className="text-sm font-black text-neon">{progress}%</span>
              </div>
              <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                <motion.div
                  className="h-full rounded-full bg-neon"
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                  style={{ boxShadow: '0 0 8px rgba(0,255,200,0.7)' }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* ── Step list ── */}
        <div className="space-y-2">
          {STEPS.map((step, i) => {
            const isDone = i < activeStep || done
            const isActive = i === activeStep && !done
            const isPending = !isDone && !isActive

            return (
              <motion.div
                key={i}
                animate={{
                  backgroundColor: isActive ? 'rgba(0,255,200,0.05)' : 'transparent',
                }}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors duration-300"
                style={{
                  border: `1px solid ${isActive ? 'rgba(0,255,200,0.28)' : 'rgba(255,255,255,0.05)'}`,
                }}
              >
                {/* Icon */}
                <div
                  className="flex-shrink-0 w-8 h-8 rounded-xl flex items-center justify-center"
                  style={{
                    background: isDone
                      ? 'rgba(0,230,118,0.1)'
                      : isActive
                      ? 'rgba(0,255,200,0.1)'
                      : 'rgba(255,255,255,0.03)',
                    border: `1px solid ${isDone ? 'rgba(0,230,118,0.25)' : isActive ? 'rgba(0,255,200,0.3)' : 'rgba(255,255,255,0.06)'}`,
                  }}
                >
                  {isDone ? (
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#00e676" strokeWidth="2.5">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  ) : isActive ? (
                    <span
                      className="w-2 h-2 rounded-full bg-neon animate-pulse"
                      style={{ boxShadow: '0 0 6px #00ffc8' }}
                    />
                  ) : (
                    <span className="text-[10px] font-bold text-white/15">{i + 1}</span>
                  )}
                </div>

                {/* Text */}
                <div className="flex-1 min-w-0">
                  <div
                    className="text-[13px] font-semibold leading-tight"
                    style={{
                      color: isDone
                        ? 'rgba(255,255,255,0.4)'
                        : isActive
                        ? '#ffffff'
                        : 'rgba(255,255,255,0.18)',
                    }}
                  >
                    {step.label}
                  </div>
                  <div
                    className="text-[10px] mt-0.5"
                    style={{
                      color: isActive
                        ? '#00ffc8'
                        : isDone
                        ? 'rgba(255,255,255,0.25)'
                        : 'rgba(255,255,255,0.1)',
                    }}
                  >
                    {step.sub}
                  </div>
                </div>

                {/* Done icon */}
                {isDone && (
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="flex-shrink-0"
                  >
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="rgba(0,230,118,0.7)" strokeWidth="2.5">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </motion.div>
                )}
              </motion.div>
            )
          })}
        </div>
      </div>

      {/* ─── STATS BAR ─── */}
      <div
        className="rounded-2xl p-4 mb-4"
        style={{
          background: 'rgba(8,12,28,0.95)',
          border: '1px solid rgba(0,255,200,0.1)',
        }}
      >
        <div className="text-[9px] font-bold tracking-[0.2em] text-white/30 uppercase mb-3">
          O QUE ESTAMOS ANALISANDO
        </div>
        <div className="flex items-center gap-3">
          <div className="text-2xl flex-shrink-0">💎</div>
          <div className="flex-1 grid grid-cols-4 gap-1">
            {STATS.map((s, i) => (
              <div key={i} className="text-center">
                <div className="text-white font-black text-[15px] leading-tight">{s.value}</div>
                <div className="text-[8px] text-white/28 leading-tight mt-0.5 whitespace-pre-line">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ─── SECURITY FOOTER ─── */}
      <div className="flex items-start gap-2.5 px-1">
        <svg
          width="14" height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="rgba(0,255,200,0.5)"
          strokeWidth="2"
          className="flex-shrink-0 mt-0.5"
        >
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        </svg>
        <div>
          <p className="text-[10.5px] text-neon font-medium leading-snug">
            Seus dados estão protegidos com criptografia de ponta a ponta.
          </p>
          <p className="text-[10px] text-white/28 leading-snug mt-0.5">
            Não compartilhamos suas informações com terceiros.
          </p>
        </div>
      </div>
    </motion.div>
  )
}
