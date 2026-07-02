import { useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { Layout } from './components/layout/Layout'
import { Dashboard } from './pages/Dashboard'
import { Leads } from './pages/Leads'
import { LeadDetail } from './pages/LeadDetail'
import { Analytics } from './pages/Analytics'
import { Login } from './pages/Login'
import { useCRMStore } from './store/crmStore'

export function CRMApp() {
  const user = useCRMStore((s) => s.user)
  const fetchRealLeads = useCRMStore((s) => s.fetchRealLeads)

  useEffect(() => {
    if (user) {
      fetchRealLeads()
      const interval = setInterval(fetchRealLeads, 30000)
      return () => clearInterval(interval)
    }
  }, [fetchRealLeads, user])

  if (!user) {
    return <Login />
  }

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="leads" element={<Leads />} />
        <Route path="leads/:id" element={<LeadDetail />} />
        <Route path="analytics" element={<Analytics />} />
      </Route>
      <Route path="*" element={<Navigate to="." replace />} />
    </Routes>
  )
}
