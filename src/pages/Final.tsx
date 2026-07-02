import React from 'react'
import { motion } from 'framer-motion'
import { Button } from '@components/ui/Button'

interface FinalProps {
  onBack?: () => void
}

const BENEFITS = [
  {
    icon: '🔒',
    title: 'Ambiente privado exclusivo',
    desc: 'Você não é inserido em grupos genéricos. Acesso privado com sua equipe dedicada.',
  },
  {
    icon: '🎯',
    title: 'Estratégia personalizada',
    desc: 'Plano exclusivo para seu nicho, audiência e objetivos de monetização.',
  },
  {
    icon: '📈',
    title: '+400 creators aprovados',
    desc: 'Influenciadores que já transformam audiência em resultados reais com nossa estrutura.',
  },
]

const stagger = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } },
}

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45 } },
}

export const Final: React.FC<FinalProps> = ({ onBack }) => {
  return (
    <motion.div
      variants={stagger}
      initial="hidden"
      animate="show"
      className="w-full max-w-md mx-auto px-2"
    >
      {/* Main hero card */}
      <motion.div variants={fadeUp} className="mb-5">
        <div
          className="rounded-2xl p-7 text-center"
          style={{
            background: 'rgba(10,10,25,0.92)',
            border: '1px solid rgba(0,255,200,0.22)',
            backdropFilter: 'blur(24px)',
            boxShadow: '0 0 50px rgba(0,255,200,0.08), 0 20px 60px rgba(0,0,0,0.5)',
          }}
        >
          {/* Brand */}
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6"
            style={{
              border: '1px solid rgba(0,255,200,0.25)',
              background: 'rgba(0,255,200,0.05)',
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-neon animate-pulse" />
            <span className="text-[11px] font-semibold tracking-[0.15em] text-neon uppercase">
              Influência Global
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black leading-tight mb-2 text-white">
            Você não entra em um grupo.
          </h2>
          <p
            className="text-2xl sm:text-3xl font-black leading-tight mb-6"
            style={{ color: '#00ffc8', textShadow: '0 0 30px rgba(0,255,200,0.4)' }}
          >
            Você ganha uma equipe.
          </p>

          <p className="text-sm text-white/50 leading-relaxed">
            Diferente de operações convencionais, você não será inserido em grupos
            genéricos ou canais compartilhados. Cada creator aprovado recebe acesso
            a um ambiente privado, formado exclusivamente por sua equipe de suporte
            InfluenciaGlobal.
          </p>
        </div>
      </motion.div>

      {/* Benefits */}
      <motion.div variants={fadeUp} className="space-y-2.5 mb-6">
        {BENEFITS.map((benefit, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 + i * 0.1 }}
          >
            <div
              className="flex items-start gap-4 p-4 rounded-xl"
              style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.06)',
              }}
            >
              <div
                className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center text-xl"
                style={{
                  background: 'rgba(0,255,200,0.07)',
                  border: '1px solid rgba(0,255,200,0.15)',
                }}
              >
                {benefit.icon}
              </div>
              <div className="text-left">
                <div className="font-bold text-white text-sm mb-0.5">{benefit.title}</div>
                <div className="text-xs text-white/45 leading-snug">{benefit.desc}</div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* CTA */}
      <motion.div variants={fadeUp} className="space-y-3">
        <a
          href="https://wa.me/5527981226077"
          target="_blank"
          rel="noopener noreferrer"
          className="block"
        >
          <Button variant="whatsapp" size="lg" className="w-full text-base tracking-wide">
            💬 Quero falar com a equipe
          </Button>
        </a>

        <p className="text-xs text-white/20 text-center tracking-wide">
          Vagas limitadas · Resposta em até 5 minutos · influencia.global
        </p>

        {onBack && (
          <button
            onClick={onBack}
            className="w-full text-xs text-white/20 hover:text-white/40 transition-colors py-2"
          >
            ← Voltar ao resultado
          </button>
        )}
      </motion.div>
    </motion.div>
  )
}
