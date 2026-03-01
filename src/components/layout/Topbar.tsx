import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
// sidebar functionality removed; UI store import not needed
import { useSessionStore } from '../../stores/sessionStore'
import { useProfileStore } from '../../stores/profileStore'
import { useWalletStore } from '../../stores/walletStore'

export const Topbar: React.FC = () => {
  // sidebar toggling removed
  const sequenceId = useSessionStore((state) => state.sequenceId)
  const profile = useProfileStore((state) => state.profile)
  const navigate = useNavigate()
  const location = useLocation()
  
  const pageTitle = React.useMemo(() => {
    const path = location.pathname.split('/')[1]
    switch (path) {
      case 'dashboard':
        return 'Dashboard'
      case 'ecosystem':
        return 'Ecosistema'
      case 'spaces':
        return 'Spazi'
      case 'projects':
        return 'Progetti'
      case 'network':
        return 'Rete'
      case 'activity':
        return 'Attività'
      case 'messages':
        return 'Messaggi'
      case 'universe':
        return 'Universo'
      case 'forum':
        return 'Forum'
      case 'journey':
        return 'Viaggio'
      case 'wallet':
        return 'Wallet'
      case 'badges':
        return 'Badges'
      case 'users':
        return 'Utenti'
      case 'profile':
        return 'Profilo'
      default:
        return ''
    }
  }, [location.pathname])

  const handleLogout = () => {
    useSessionStore.getState().clearSession()
    useProfileStore.getState().clearProfile()
    useWalletStore.getState().disconnect()
    // wipe session storage and any lingering local keys
    sessionStorage.clear()
    localStorage.removeItem('aur_session')
    localStorage.removeItem('sequence_id')
    // redirect hard to login
    window.location.href = '/login'
  }

  return (
    <div className="flex items-center justify-between bg-black/80 border-b border-emerald/20 h-16 px-4 lg:px-8">
      <div className="flex items-center gap-4">
        {/* sidebar toggle removed */}
        <span className="text-xs text-white/70">Seq: {sequenceId || '---'}</span>
        {pageTitle && (
          <span className="ml-4 text-sm font-semibold text-white/90">
            {pageTitle}
          </span>
        )}
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
