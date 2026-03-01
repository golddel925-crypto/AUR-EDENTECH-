import React from 'react'
import { useSessionStore } from '../stores/sessionStore'
import { Navigate } from 'react-router-dom'

interface Props {
  children: React.ReactNode
}

export const AuthGuard: React.FC<Props> = ({ children }) => {
  // Temporary bypass for debugging — set to `false` to re-enable guard
  const BYPASS_AUTH = true

  if (BYPASS_AUTH) return <>{children}</>

  const { isAuthenticated, hydrated } = useSessionStore()

  if (!hydrated) return null

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  return <>{children}</>
}
