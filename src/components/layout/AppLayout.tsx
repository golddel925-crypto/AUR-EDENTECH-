import React, { useEffect } from 'react'
import { TopNav } from './TopNav'
import { BackgroundFX } from './BackgroundFX'
import { useSessionStore } from '../../stores/sessionStore'
import { useNavigate } from 'react-router-dom'

interface AppLayoutProps {
  children: React.ReactNode
}

export const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const { isAuthenticated } = useSessionStore()
  const navigate = useNavigate()

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login', { replace: true })
    }
  }, [isAuthenticated, navigate])

  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      <BackgroundFX />

      <div className="relative z-10">
        <TopNav />

        <main className="pt-20 pb-8">
          {children}
        </main>
      </div>
    </div>
  )
}
