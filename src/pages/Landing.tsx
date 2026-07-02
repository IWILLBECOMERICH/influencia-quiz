import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useQuizStore } from '@store/quizStore'

const HERO_IMG = '/hero.png'

const AVATARS = [
  'https://randomuser.me/api/portraits/women/44.jpg',
  'https://randomuser.me/api/portraits/men/32.jpg',
  'https://randomuser.me/api/portraits/women/68.jpg',
  'https://randomuser.me/api/portraits/men/75.jpg',
  'https://randomuser.me/api/portraits/women/90.jpg',
]

interface LandingProps {
  onStart: () => void
}

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.45, delay, ease: 'easeOut' },
})

export const Landing: React.FC<LandingProps> = ({ onStart }) => {
  const [handle, setHandle] = useState('')
  const setStoreHandle = useQuizStore((s) => s.setHandle)

  const handleStart = () => {
    const raw = handle.trim() || 'influencer'
    setStoreHandle(raw.startsWith('@') ? raw : `@${raw}`)
    onStart()
  }

  return (
    <div className="w-full max-w-[420px] mx-auto">

      {/* ─── HERO IMAGE ─── */}
      <div className="relative overflow-hidden" style={{ height: 240 }}>
        <img
          src={HERO_IMG}
          alt="Creator"
          className="absolute inset-0 w-full h-full object-cover object-top"
        />
        {/* gradient fade to bg */}
        <div
          className="absolute inset-0"
          style={{
            background: [
              'linear-gradient(to bottom, rgba(5,5,16,0.0) 0%, rgba(5,5,16,0.04) 38%, rgba(5,5,16,0.45) 62%, rgba(5,5,16,0.85) 78%, rgba(5,5,16,0.97) 90%, #050510 97%)',
              'linear-gradient(to right, rgba(5,5,16,0.45) 0%, transparent 28%, transparent 72%, rgba(5,5,16,0.45) 100%)',
            ].join(', '),
          }}
        />

        {/* HUD card — left */}
        <motion.div
          {...fadeUp(0.3)}
          className="absolute top-4 left-3.5 px-3 py-2.5 rounded-xl"
          style={{
            background: 'rgba(5,8,22,0.72)',
            border: '1px solid rgba(0,255,200,0.18)',
            backdropFilter: 'blur(18px)',
            boxShadow: '0 0 18px rgba(0,255,200,0.06), inset 0 0 0 0.5px rgba(255,255,255,0.04)',
            minWidth: 118,
          }}
        >
          <div className="flex items-center justify-between mb-0.5">
            <div className="flex items-center gap-1.5">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#00ffc8" strokeWidth="2.5">
                <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
              </svg>
              <span className="text-[9px] font-bold tracking-[0.18em] text-white/45 uppercase">Gate</span>
            </div>
            <span className="text-[10px] text-white/25 cursor-pointer">✕</span>
          </div>
          <div className="text-white font-black text-[1.2rem] leading-none mb-1.5">IG·24</div>
          <div className="text-[9px] text-white/35 font-semibold tracking-widest leading-tight">BOARDING</div>
          <div className="text-[9px] text-neon font-bold tracking-widest">SUCCESS MODE</div>
        </motion.div>

        {/* HUD card — right */}
        <motion.div
          {...fadeUp(0.4)}
          className="absolute top-5 right-3.5 px-3 py-2.5 rounded-xl"
          style={{
            background: 'rgba(5,8,22,0.72)',
            border: '1px solid rgba(0,255,200,0.16)',
            backdropFilter: 'blur(18px)',
            boxShadow: '0 0 18px rgba(0,255,200,0.06), inset 0 0 0 0.5px rgba(255,255,255,0.04)',
            minWidth: 130,
          }}
        >
          <div className="flex items-center gap-1.5 mb-0.5">
            <span className="text-[10px]">🌐</span>
            <span className="text-[9px] font-bold tracking-[0.18em] text-white/45 uppercase">Destino</span>
          </div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-white font-black text-base leading-none">Dubai</span>
            <div className="flex items-center gap-0.5 opacity-60">
              <div className="w-3 border-t border-dashed border-neon/50" />
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#00ffc8" strokeWidth="2.5">
                <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
              </svg>
            </div>
          </div>
          <div className="text-[9px] text-white/35 font-semibold tracking-widest leading-tight">STATUS</div>
          <div className="text-[9px] text-neon font-bold tracking-wide">PRONTA PARA DECOLAR</div>
        </motion.div>
      </div>

      {/* extensor de fade — cobre qualquer borda residual da hero */}
      <div
        style={{
          height: 48,
          marginTop: -48,
          background: 'linear-gradient(to bottom, transparent 0%, #050510 100%)',
          pointerEvents: 'none',
          position: 'relative',
          zIndex: 1,
        }}
      />

      {/* ─── CONTENT ─── */}
      <div className="px-4 pb-4" style={{ position: 'relative', zIndex: 2 }}>

        {/* Brand badge */}
        <motion.div {...fadeUp(0.05)} className="mb-2.5">
          <div
            className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full"
            style={{
              border: '1px solid rgba(0,255,200,0.3)',
              background: 'rgba(0,255,200,0.05)',
            }}
          >
            <span
              className="w-2 h-2 rounded-full bg-neon animate-pulse"
              style={{ boxShadow: '0 0 6px #00ffc8' }}
            />
            <span className="text-[11px] font-bold tracking-[0.15em] text-white uppercase">
              INFLUÊNCIA GLOBAL · IGAMING
            </span>
          </div>
        </motion.div>

        {/* Headline */}
        <motion.h1
          {...fadeUp(0.1)}
          className="text-[2rem] font-black leading-[1.08] tracking-tight mb-2.5"
        >
          <span className="text-white">Descubra seu nível para </span>
          <span className="text-neon" style={{ textShadow: '0 0 40px rgba(0,255,200,0.45)' }}>
            transformar audiência em lucro real
          </span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p {...fadeUp(0.15)} className="text-[13px] text-white/50 leading-snug mb-3">
          Responda 10 perguntas e veja se seu perfil está pronto para operar com estrutura profissional.
        </motion.p>

        {/* ─── MISSION BAR ─── */}
        <motion.div {...fadeUp(0.2)} className="mb-3">
          <div
            className="flex items-center px-4 py-2.5 rounded-2xl"
            style={{
              background: 'rgba(8,12,28,0.95)',
              border: '1px solid rgba(0,255,200,0.14)',
              gap: 0,
            }}
          >
            {/* Left: missão + perguntas */}
            <div className="flex items-center gap-2.5 flex-1 min-w-0">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-sm flex-shrink-0"
                style={{
                  background: 'rgba(0,255,200,0.1)',
                  border: '1px solid rgba(0,255,200,0.3)',
                }}
              >
                🎯
              </div>
              <div className="min-w-0">
                <div className="text-[8px] font-bold tracking-[0.18em] text-white/35 uppercase whitespace-nowrap">
                  MISSÃO INICIAL
                </div>
                <div className="text-white font-black text-[13px] leading-tight whitespace-nowrap">
                  10 perguntas
                </div>
              </div>
            </div>

            {/* Separator */}
            <div
              className="flex-shrink-0 self-stretch w-px mx-3"
              style={{ background: 'rgba(255,255,255,0.1)' }}
            />

            {/* Time */}
            <div className="flex items-center gap-1.5 flex-shrink-0">
              <span className="text-neon" style={{ fontSize: 15 }}>⏱</span>
              <span className="text-white font-bold text-[13px] whitespace-nowrap">3 min</span>
            </div>

            {/* Separator */}
            <div
              className="flex-shrink-0 self-stretch w-px mx-3"
              style={{ background: 'rgba(255,255,255,0.1)' }}
            />

            {/* Level */}
            <div className="flex items-center gap-2 flex-shrink-0">
              <div
                className="w-7 h-7 rounded-full flex items-center justify-center text-xs flex-shrink-0"
                style={{
                  background: 'rgba(0,255,200,0.1)',
                  border: '1px solid rgba(0,255,200,0.25)',
                }}
              >
                ⭐
              </div>
              <div>
                <div className="text-[8px] font-bold tracking-[0.18em] text-white/35 uppercase">NÍVEL</div>
                <div className="text-white font-bold text-[13px] leading-tight">Creator</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ─── STATS GRID ─── */}
        <motion.div {...fadeUp(0.25)} className="grid grid-cols-3 gap-2 mb-3">
          {[
            { icon: '?', value: '10', label: 'PERGUNTAS', desc: 'Diagnóstico completo' },
            { icon: '⏱', value: '3', label: 'MINUTOS', desc: 'Rápido e preciso' },
            { icon: '👥', value: '+400', label: 'CREATORS', desc: 'Aprovados' },
          ].map((s, i) => (
            <div
              key={i}
              className="p-2.5 rounded-2xl flex flex-col gap-1"
              style={{
                background: 'rgba(8,12,28,0.95)',
                border: '1px solid rgba(0,255,200,0.12)',
              }}
            >
              <div
                className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-black"
                style={{
                  background: 'rgba(0,255,200,0.1)',
                  border: '1px solid rgba(0,255,200,0.28)',
                  color: '#00ffc8',
                }}
              >
                {s.icon}
              </div>
              <div className="text-white font-black text-[1.15rem] leading-none">{s.value}</div>
              <div className="text-[8px] font-bold tracking-wider text-white/40 uppercase leading-tight">
                {s.label}
              </div>
              <div className="text-[9.5px] text-white/30 leading-tight">{s.desc}</div>
            </div>
          ))}
        </motion.div>

        {/* ─── PROFILE INPUT CARD ─── */}
        <motion.div
          {...fadeUp(0.3)}
          className="p-3 rounded-2xl mb-3"
          style={{
            background: 'rgba(8,12,28,0.95)',
            border: '1px solid rgba(0,255,200,0.14)',
          }}
        >
          <div className="flex gap-3">
            {/* Avatar column */}
            <div className="flex flex-col items-center flex-shrink-0 pt-0.5">
              <div
                className="w-[48px] h-[48px] rounded-full overflow-hidden mb-1"
                style={{
                  border: '2px solid rgba(0,255,200,0.45)',
                  boxShadow: '0 0 12px rgba(0,255,200,0.2)',
                }}
              >
                <img src={HERO_IMG} alt="Profile" className="w-full h-full object-cover" />
              </div>
              <div className="text-[8px] font-bold tracking-widest text-white/35 uppercase mb-0.5">
                SEU PERFIL
              </div>
              <div className="flex items-center gap-1">
                <span
                  className="w-1.5 h-1.5 rounded-full bg-neon animate-pulse"
                  style={{ boxShadow: '0 0 5px #00ffc8' }}
                />
                <span className="text-[9px] text-neon font-semibold">em análise</span>
              </div>
            </div>

            {/* Input column */}
            <div className="flex-1 min-w-0">
              <label className="block text-[9.5px] font-bold tracking-[0.12em] text-white/45 uppercase mb-2">
                QUAL É O SEU @ NO INSTAGRAM?{' '}
                <span className="text-white/20 normal-case font-normal tracking-normal">(opcional)</span>
              </label>

              {/* Input row */}
              <div
                className="flex items-center gap-2 px-3 py-2.5 rounded-xl mb-2.5"
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.09)',
                }}
              >
                <span className="text-white/35 font-bold text-sm flex-shrink-0">@</span>
                <input
                  className="flex-1 bg-transparent text-white placeholder-white/20 text-sm font-medium focus:outline-none min-w-0"
                  placeholder="seuperfil"
                  maxLength={30}
                  value={handle}
                  onChange={(e) => setHandle(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleStart()}
                />
                {/* Camera scan icon */}
                <button className="flex-shrink-0 text-neon/40 hover:text-neon/70 transition-colors">
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                    <circle cx="12" cy="13" r="4" />
                  </svg>
                </button>
              </div>

              {/* Privacy note */}
              <div className="flex items-center gap-1.5">
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="rgba(0,255,200,0.45)" strokeWidth="2">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
                <span className="text-[9.5px] text-white/25 leading-snug">
                  Seu perfil será analisado com segurança e confidencialidade.
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ─── CTA BUTTON ─── */}
        <motion.div {...fadeUp(0.35)} className="mb-4">
          <motion.button
            onClick={handleStart}
            whileHover={{ scale: 1.02, y: -1 }}
            whileTap={{ scale: 0.97 }}
            className="w-full py-3 rounded-xl flex items-center justify-center gap-2 cursor-pointer overflow-hidden relative"
            style={{
              background: '#00ffc8',
              border: 'none',
              boxShadow: '0 4px 20px rgba(0,255,200,0.4)',
            }}
          >
            {/* icon */}
            <div className="flex-shrink-0 text-lg">💰</div>

            {/* text */}
            <span
              className="font-black text-base uppercase tracking-wide relative z-10"
              style={{
                color: '#000',
              }}
            >
              QUANTO EU VOU GANHAR
            </span>

            {/* arrow */}
            <motion.span
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
              className="text-white/60 font-bold text-lg relative z-10"
            >
              →
            </motion.span>
          </motion.button>
        </motion.div>

        {/* ─── SOCIAL PROOF ─── */}
        <motion.div
          {...fadeUp(0.4)}
          className="flex items-center justify-between mb-3 px-1"
        >
          {/* Avatars + count */}
          <div className="flex items-center gap-2.5">
            <div className="flex -space-x-2">
              {AVATARS.map((src, i) => (
                <div
                  key={i}
                  className="w-7 h-7 rounded-full overflow-hidden border-[1.5px]"
                  style={{ borderColor: '#050510' }}
                >
                  <img src={src} alt="" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
            <div>
              <div className="text-sm font-black text-white">+400 creators</div>
              <div className="text-[10px] text-white/30">já aprovados</div>
            </div>
          </div>

          <div className="w-px h-9 bg-white/8" />

          {/* Response time */}
          <div className="flex items-center gap-2.5">
            <div
              className="w-9 h-9 rounded-full flex items-center justify-center"
              style={{
                background: 'rgba(0,255,200,0.1)',
                border: '1px solid rgba(0,255,200,0.3)',
              }}
            >
              <span className="text-neon text-base">⚡</span>
            </div>
            <div>
              <div className="text-[8.5px] font-bold tracking-[0.15em] text-white/35 uppercase">
                RESPOSTA EM ATÉ
              </div>
              <div className="text-white font-black text-base leading-tight">5 MINUTOS</div>
            </div>
          </div>
        </motion.div>

        {/* ─── FOOTER ─── */}
        <motion.div
          {...fadeUp(0.45)}
          className="flex items-center justify-center gap-2.5 text-[9.5px] text-white/18 tracking-wider flex-wrap"
        >
          <span>🔒 100% SEGURO</span>
          <span className="text-white/12">•</span>
          <span>VAGAS LIMITADAS</span>
          <span className="text-white/12">•</span>
          <span>INFLUENCIA.GLOBAL</span>
        </motion.div>
      </div>
    </div>
  )
}
