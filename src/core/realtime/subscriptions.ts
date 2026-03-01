import { supabase } from '../supabase/client'
import { QueryClient } from '@tanstack/react-query'

let queryClient: QueryClient | null = null

/**
 * Initialize real-time subscriptions
 */
export function initializeSubscriptions(client: QueryClient) {
  queryClient = client
  console.log('📡 Initializing real-time subscriptions...')

  subscribeToPostChanges()
  subscribeToInteractionChanges()
  subscribeToBadgeChanges()
  subscribeToUserPresence()
  subscribeToWalletChanges()
}

/**
 * Subscribe to posts table changes
 * Invalidates cached posts data when changes occur
 */
function subscribeToPostChanges() {
  const subscription = supabase
    .channel('public:posts')
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'posts',
      },
      (payload: any) => {
        console.log('📝 Posts changed:', payload.eventType, payload.new || payload.old)

        if (queryClient) {
          queryClient.invalidateQueries({ queryKey: ['posts'] })
        }
      }
    )
    .subscribe((status) => {
      if (status === 'SUBSCRIBED') {
        console.log('✅ Subscribed to posts changes')
      } else if (status === 'CLOSED') {
        console.log('❌ Posts subscription closed')
      }
    })

  return subscription
}

/**
 * Subscribe to interaction changes
 * Invalidates posts and interactions cache
 */
function subscribeToInteractionChanges() {
  const subscription = supabase
    .channel('public:interactions')
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'interactions',
      },
      (payload: any) => {
        console.log(
          '👍 Interaction changed:',
          payload.eventType,
          payload.new || payload.old
        )

        if (queryClient) {
          queryClient.invalidateQueries({ queryKey: ['posts'] })
          queryClient.invalidateQueries({ queryKey: ['interactions'] })
        }
      }
    )
    .subscribe((status) => {
      if (status === 'SUBSCRIBED') {
        console.log('✅ Subscribed to interactions changes')
      } else if (status === 'CLOSED') {
        console.log('❌ Interactions subscription closed')
      }
    })

  return subscription
}

/**
 * Subscribe to badge assignment changes
 * When users earn new badges
 */
function subscribeToBadgeChanges() {
  const subscription = supabase
    .channel('public:user_badges')
    .on(
      'postgres_changes',
      {
        event: 'INSERT',
        schema: 'public',
        table: 'user_badges',
      },
      (payload: any) => {
        const newBadge = payload.new
        console.log(
          '🏆 New badge earned:',
          newBadge.badge_id,
          'by',
          newBadge.user_id
        )

        if (queryClient) {
          queryClient.invalidateQueries({ queryKey: ['badges'] })

          // Show celebration for this specific user
          if (typeof window !== 'undefined') {
            window.dispatchEvent(
              new CustomEvent('badge-earned', { detail: newBadge })
            )
          }
        }
      }
    )
    .subscribe((status) => {
      if (status === 'SUBSCRIBED') {
        console.log('✅ Subscribed to badge changes')
      } else if (status === 'CLOSED') {
        console.log('❌ Badge subscription closed')
      }
    })

  return subscription
}

/**
 * Subscribe to active users via presence channel
 * Tracks which users are currently online
 */
function subscribeToUserPresence() {
  const subscription = supabase
    .channel('user-presence')
    .on('presence', { event: 'sync' }, () => {
      const state = subscription.presenceState()
      console.log('👥 Active users updated:', Object.keys(state).length)

      if (queryClient) {
        queryClient.invalidateQueries({ queryKey: ['activeUsers'] })
      }
    })
    .on('presence', { event: 'join' }, ({ key, newPresences }) => {
      console.log('👤 User joined:', key, newPresences)
      if (queryClient) {
        queryClient.invalidateQueries({ queryKey: ['activeUsers'] })
      }
    })
    .on('presence', { event: 'leave' }, ({ key, leftPresences }) => {
      console.log('👤 User left:', key, leftPresences)
      if (queryClient) {
        queryClient.invalidateQueries({ queryKey: ['activeUsers'] })
      }
    })
    .subscribe(async (status) => {
      if (status === 'SUBSCRIBED') {
        console.log('✅ Subscribed to user presence')

        // Broadcast this client's presence
        try {
          await subscription.track({
            user_id: localStorage.getItem('user_id') || 'anonymous',
            online_at: new Date().toISOString(),
          })
        } catch (error) {
          console.error('Failed to track presence:', error)
        }
      } else if (status === 'CLOSED') {
        console.log('❌ Presence subscription closed')
      }
    })

  return subscription
}

/**
 * Subscribe to wallet connection changes
 * When users connect/disconnect MetaMask
 */
function subscribeToWalletChanges() {
  const subscription = supabase
    .channel('public:wallets')
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'wallets',
      },
      (payload: any) => {
        console.log(
          '💰 Wallet changed:',
          payload.eventType,
          payload.new?.wallet_address || payload.old?.wallet_address
        )

        if (queryClient) {
          queryClient.invalidateQueries({ queryKey: ['wallet'] })
        }
      }
    )
    .subscribe((status) => {
      if (status === 'SUBSCRIBED') {
        console.log('✅ Subscribed to wallet changes')
      } else if (status === 'CLOSED') {
        console.log('❌ Wallet subscription closed')
      }
    })

  return subscription
}

/**
 * Unsubscribe from all real-time channels
 */
export async function unsubscribeAll() {
  console.log('📵 Unsubscribing from all channels...')
  await supabase.removeAllChannels()
}
