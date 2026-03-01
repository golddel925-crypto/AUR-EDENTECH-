import { create } from 'zustand'

interface SessionState {
  userId: string | null
  sequenceId: string | null
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null
  hydrated: boolean
  setSession: (userId: string, sequenceId: string) => void
  clearSession: () => void
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
}

// The session store no longer persists to localStorage; sessionStorage is the
// single source of truth for authentication state. We start out unauthenticated
// and let the AuthGate component populate the store when it checks the session.
export const useSessionStore = create<SessionState>((set) => ({
  userId: null,
  sequenceId: null,
  isAuthenticated: false,
  isLoading: false,
  hydrated: false,
  error: null,
  setSession: (userId, sequenceId) => {
    // keep session storage in sync with the store
    sessionStorage.setItem('sequence_id', sequenceId)
    console.log('✅ Session initialized:', { userId, sequenceId })
    set({
      userId,
      sequenceId,
      isAuthenticated: true,
      hydrated: true,
      error: null,
    })
  },
  clearSession: () => {
    sessionStorage.clear()
    console.log('🔓 Session cleared')
    set({
      userId: null,
      sequenceId: null,
      isAuthenticated: false,
      hydrated: true,
      error: null,
    })
  },
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => {
    if (error) console.error('❌ Session error:', error)
    set({ error })
  },
}))
