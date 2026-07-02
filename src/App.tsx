import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { QuizApp } from './QuizApp'
import { CRMApp } from './crm/CRMApp'

export const UnifiedApp: React.FC = () => {
  return (
    <Routes>
      <Route path="/*" element={<QuizApp />} />
      <Route path="/crm/*" element={<CRMApp />} />
    </Routes>
  )
}
