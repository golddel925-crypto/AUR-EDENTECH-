import { useEffect } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { initializeSubscriptions, unsubscribeAll } from '../core/realtime/subscriptions'
import { useSessionStore } from '../stores/sessionStore'

/**
 * Hook to initialize real-time subscriptions
 * Should be called once on app initialization
 * Automatically invalidates TanStack Query cache when data changes
 */
export const useRealtime = () => {
  const queryClient = useQueryClient()
  const { userId, hydrated } = useSessionStore()

  useEffect(() => {
    if (!hydrated) return
    if (!userId) return

    console.log('🔌 Initializing real-time subscriptions for user:', userId)
    initializeSubscriptions(queryClient)

    return () => {
      console.log('🔌 Cleaning up subscriptions...')
      unsubscribeAll()
    }
  }, [queryClient, userId, hydrated])
}

export default useRealtime
