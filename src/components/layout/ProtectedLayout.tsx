import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import AuthGuard from '../AuthGuard'
import { Sidebar } from './Sidebar'
import { Topbar } from './Topbar'
import { BackgroundFX } from './BackgroundFX'
import { useSessionStore } from '../../stores/sessionStore'
import { useUIStore } from '../../stores/uiStore'

export const ProtectedLayout: React.FC = () => {
  // hydrate session store from localStorage if available
  useEffect(() => {
    const seq = localStorage.getItem('aur_sequence_id')
    const logged = localStorage.getItem('aur_logged')
    if (logged && seq) {
      // use sequence as userId for now
      useSessionStore.getState().setSession(seq, seq)
    }
  }, [])

  const { sidebarOpen, toggleSidebar } = useUIStore()

  return (
    <AuthGuard>
      <BackgroundFX />
      <div className="flex h-screen overflow-hidden">
        <Sidebar />
        {/* overlay for mobile when sidebar is open */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-20 lg:hidden"
            onClick={toggleSidebar}
          />
        )}
        <div className="flex-1 flex flex-col lg:ml-64">
          <Topbar />
          <main className="flex-1 overflow-auto">
            <Outlet />
          </main>
        </div>
      </div>
    </AuthGuard>
  )
}
