import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { AnimatedBackground } from '@components/ui/AnimatedBackground'
import { Landing } from '@pages/Landing'
import { Scanning } from '@pages/Scanning'
import { Quiz } from '@pages/Quiz'
import { Result } from '@pages/Result'
import { Final } from '@pages/Final'

type PageName = 'landing' | 'scanning' | 'quiz' | 'result' | 'final'

export const QuizApp: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<PageName>('landing')

  const handleNavigate = (page: PageName) => setCurrentPage(page)

  return (
    <div className="min-h-screen bg-bg-dark text-white overflow-hidden">
      <AnimatedBackground />

      <div className="relative z-10">
        <div className="min-h-screen flex flex-col items-center justify-center px-4 py-8">
          <AnimatePresence mode="wait">
            {currentPage === 'landing' && (
              <motion.div
                key="landing"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="w-full"
              >
                <Landing onStart={() => handleNavigate('scanning')} />
              </motion.div>
            )}

            {currentPage === 'scanning' && (
              <motion.div
                key="scanning"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="w-full"
              >
                <Scanning onComplete={() => handleNavigate('quiz')} />
              </motion.div>
            )}

            {currentPage === 'quiz' && (
              <motion.div
                key="quiz"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="w-full"
              >
                <Quiz onComplete={() => handleNavigate('result')} />
              </motion.div>
            )}

            {currentPage === 'result' && (
              <motion.div
                key="result"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="w-full"
              >
                <Result onNavigate={handleNavigate} />
              </motion.div>
            )}

            {currentPage === 'final' && (
              <motion.div
                key="final"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="w-full"
              >
                <Final onBack={() => handleNavigate('result')} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
