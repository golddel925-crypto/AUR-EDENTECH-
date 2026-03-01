import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useUIStore } from '../../stores/uiStore'
import { useSessionStore } from '../../stores/sessionStore'
import { useProfileStore } from '../../stores/profileStore'
import { useWalletStore } from '../../stores/walletStore'

export const Topbar: React.FC = () => {
  const { toggleSidebar } = useUIStore()
  const { sequenceId } = useSessionStore()
  const { profile } = useProfileStore()
  const navigate = useNavigate()

  const handleLogout = () => {
    useSessionStore.getState().clearSession()
    useProfileStore.getState().clearProfile()
    useWalletStore.getState().disconnect()
    localStorage.removeItem('aur_sequence_id')
    localStorage.removeItem('aur_logged')
    navigate('/')
  }

  return (
    <div className="flex items-center justify-between bg-black/80 border-b border-emerald/20 h-16 px-4 lg:px-8">
      <div className="flex items-center gap-4">
        <button
          className="text-white text-2xl lg:hidden"
          onClick={toggleSidebar}
          aria-label="Toggle sidebar"
        >
          ☰
        </button>
        <span className="text-xs text-white/70">Seq: {sequenceId || '---'}</span>
      </div>

      <div className="flex items-center gap-4">
        {/* notification placeholder */}
        <div className="hidden md:flex items-center gap-2 text-white/50">
          🔔
        </div>

        {/* avatar */}
        <div className="w-8 h-8 rounded-full bg-emerald flex items-center justify-center text-black font-bold">
          {profile?.publicName?.[0]?.toUpperCase() || 'A'}
        </div>

        <button
          onClick={handleLogout}
          className="text-yellow-400 hover:text-yellow-300 text-sm"
        >
          Logout
        </button>
      </div>
    </div>
  )
}
