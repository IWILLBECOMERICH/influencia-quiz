import React, { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useQuizStore } from '@store/quizStore'

interface QuizProps {
  onComplete: () => void
}

export const Quiz: React.FC<QuizProps> = ({ onComplete }) => {
  const {
    questions,
    currentQuestion,
    selectedAnswer,
    answered,
    submitAnswer,
    nextQuestion,
  } = useQuizStore()

  const question = questions[currentQuestion]
  const progressPct = Math.round((currentQuestion / questions.length) * 100)

  useEffect(() => {
    if (currentQuestion >= questions.length) {
      onComplete()
    }
  }, [currentQuestion, questions.length, onComplete])

  const handleAnswer = (index: number) => {
    if (answered) return
    submitAnswer(index)

    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        nextQuestion()
      } else {
        onComplete()
      }
    }, 700)
  }

  if (!question) return null

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-lg mx-auto px-2"
    >
      {/* Header: brand + progress */}
      <div className="mb-7">
        <div className="flex items-center justify-between mb-3">
          <span className="text-[11px] font-black tracking-[0.15em] uppercase" style={{ color: 'rgba(0,255,200,0.7)' }}>
            influenc<span className="text-white">IA</span>
          </span>
          <span className="text-[11px] text-white/35 font-mono tracking-wider">
            {currentQuestion + 1} / {questions.length}
          </span>
        </div>

        <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-neon to-neon-dark"
            animate={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            style={{ boxShadow: '0 0 10px rgba(0,255,200,0.6)' }}
          />
        </div>

        <div className="flex justify-end mt-1.5">
          <span className="text-[10px] text-neon/50 font-medium">
            {progressPct}% concluído
          </span>
        </div>
      </div>

      {/* Banner */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentQuestion}
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -24 }}
          transition={{ duration: 0.28 }}
          className="mb-4"
          style={{
            borderRadius: 16,
            overflow: 'hidden',
            border: '1px solid rgba(0,255,200,0.14)',
            boxShadow: '0 0 24px rgba(0,255,200,0.06), 0 8px 24px rgba(0,0,0,0.4)',
            lineHeight: 0,
            fontSize: 0,
          }}
        >
          <img
            src={`/banners/${String(Math.min(currentQuestion + 1, 9)).padStart(2, '0')}.png`}
            alt=""
            style={{ width: '100%', height: 'auto', display: 'block' }}
          />
        </motion.div>
      </AnimatePresence>

      {/* Options */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`opts-${currentQuestion}`}
          className="space-y-2.5"
        >
          {question.o.map((option: string, idx: number) => {
            const isSelected = selectedAnswer === idx
            const isDimmed = answered && !isSelected

            return (
              <motion.button
                key={idx}
                onClick={() => handleAnswer(idx)}
                disabled={answered}
                initial={{ opacity: 0, x: -14 }}
                animate={{ opacity: isDimmed ? 0.3 : 1, x: 0 }}
                transition={{ delay: idx * 0.06, duration: 0.28 }}
                whileHover={
                  !answered
                    ? { x: 5, transition: { duration: 0.12 } }
                    : {}
                }
                whileTap={!answered ? { scale: 0.985 } : {}}
                className="w-full text-left flex items-center gap-3.5 px-4 py-3.5 rounded-xl disabled:cursor-default"
                style={{
                  border: isSelected
                    ? '1px solid rgba(0,255,200,0.55)'
                    : '1px solid rgba(255,255,255,0.07)',
                  background: isSelected
                    ? 'rgba(0,255,200,0.08)'
                    : 'rgba(255,255,255,0.02)',
                  boxShadow: isSelected
                    ? '0 0 20px rgba(0,255,200,0.15), inset 0 0 20px rgba(0,255,200,0.04)'
                    : 'none',
                  backdropFilter: 'blur(10px)',
                  transition: 'border 0.15s, background 0.15s, box-shadow 0.15s',
                }}
              >
                {/* Letter badge */}
                <div
                  className="flex-shrink-0 w-7 h-7 rounded-lg flex items-center justify-center text-xs font-black transition-all duration-150"
                  style={{
                    background: isSelected ? 'rgba(0,255,200,0.2)' : 'rgba(255,255,255,0.06)',
                    color: isSelected ? '#00ffc8' : 'rgba(255,255,255,0.35)',
                  }}
                >
                  {String.fromCharCode(65 + idx)}
                </div>

                {/* Text */}
                <span
                  className="flex-1 text-sm font-medium leading-snug"
                  style={{ color: isSelected ? '#ffffff' : 'rgba(255,255,255,0.65)' }}
                >
                  {option}
                </span>

                {/* Selected indicator */}
                {isSelected && (
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="flex-shrink-0 w-4 h-4 rounded-full"
                    style={{
                      background: '#00ffc8',
                      boxShadow: '0 0 8px rgba(0,255,200,0.8)',
                    }}
                  />
                )}
              </motion.button>
            )
          })}
        </motion.div>
      </AnimatePresence>

      {/* Micro-text during transition */}
      <AnimatePresence>
        {answered && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="mt-4 text-center text-xs text-white/25 tracking-wider"
          >
            {currentQuestion < questions.length - 1
              ? 'Próxima pergunta...'
              : 'Calculando seu perfil...'}
          </motion.p>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
