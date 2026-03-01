import { create } from 'zustand'
import { persist } from 'zustand/middleware'

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

export const useSessionStore = create<SessionState>()(
  persist(
    (set) => ({
      userId: null,
      sequenceId: null,
      isAuthenticated: false,
      isLoading: false,
      hydrated: false,
      error: null,
      setSession: (userId, sequenceId) => {
        console.log('✅ Session initialized:', { userId, sequenceId })
        set({
          userId,
          sequenceId,
          isAuthenticated: true,
          error: null,
        })
      },
      clearSession: () => {
        console.log('🔓 Session cleared')
        set({
          userId: null,
          sequenceId: null,
          isAuthenticated: false,
          error: null,
        })
      },
      setLoading: (isLoading) => set({ isLoading }),
      setError: (error) => {
        if (error) console.error('❌ Session error:', error)
        set({ error })
      },
    }),
    {
      name: 'aur-session-store',
      version: 1,
      onRehydrateStorage: () => (state) => {
        // mark hydrated when rehydration finishes
        try {
          state && (state as any).set && (state as any).set({ hydrated: true })
        } catch (e) {
          console.warn('session rehydrate hook failed', e)
        }
      },
    }
  )
)
