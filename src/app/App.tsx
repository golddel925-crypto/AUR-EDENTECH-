import React, { useEffect } from 'react'
import { RouterProvider } from 'react-router-dom'
import { router } from './router'
import { useSessionStore } from '../stores/sessionStore'
import { queryClient } from './providers'
import { QueryClientProvider } from '@tanstack/react-query'
import { supabase } from '../core/supabase/client'
import { ErrorBoundary } from '../components/ErrorBoundary'
import { useRealtime } from '../hooks/useRealtime'

const App: React.FC = () => {
  const { setSession } = useSessionStore()

  // Initialize session from URL params or localStorage (async, non-blocking)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const userId = params.get('user_id') || localStorage.getItem('user_id')
    const sequenceId = params.get('sequence_id') || localStorage.getItem('sequence_id')

    if (userId && sequenceId) {
      setSession(userId, sequenceId)
      localStorage.setItem('user_id', userId)
      localStorage.setItem('sequence_id', sequenceId)
    }
  }, [setSession])

  // Supabase connection test on startup (async, non-blocking)
  useEffect(() => {
    let mounted = true

    async function test() {
      try {
        const { data, error } = await supabase
          .from('issued_sequences')
          .select('sequence_hash')
          .limit(1)

        if (error) {
          console.error('Supabase connection test failed:', error.message || error)
        } else {
          console.log('Supabase test OK:', data)
        }
      } catch (err) {
        console.error('Supabase test exception:', err)
      }
    }

    test()

    return () => {
      mounted = false
    }
  }, [])

  // Initialize realtime subscriptions (async, non-blocking)
  useRealtime()

  // Render immediately, session loads asynchronously
  return (
    <QueryClientProvider client={queryClient}>
      <ErrorBoundary>
        <RouterProvider router={router} />
      </ErrorBoundary>
    </QueryClientProvider>
  )
}

export default App
