import { supabase } from '../supabase/client'
import { useSessionStore } from '../../stores/sessionStore'

/**
 * Generic RPC caller
 */
export async function rpc(functionName: string, params?: Record<string, any>) {
  try {
    console.log(`📤 RPC Call: ${functionName}`, params)
    const { data, error } = await supabase.rpc(functionName, params)

    if (error) {
      console.error(`❌ RPC Error [${functionName}]:`, error.message)
      throw new Error(error.message)
    }

    console.log(`✅ RPC Success [${functionName}]:`, data)
    return data
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error'
    console.error(`❌ RPC Failed [${functionName}]:`, message)
    throw error
  }
}

/**
 * Verify user's sequence and return authentication token
 */
export async function verifySequence(userId: string, sequenceId: string) {
  try {
    const result = await rpc('verify_sequence', {
      p_user_id: userId,
      p_sequence_id: sequenceId,
    })
    return result || { token: '', verified: false }
  } catch (error) {
    console.error('Sequence verification failed:', error)
    throw error
  }
}

/**
 * Update user's public name
 */
export async function updatePublicName(publicName: string): Promise<boolean> {
  const { userId } = useSessionStore.getState()
  if (!userId) throw new Error('User not authenticated')

  try {
    const result = await rpc('update_public_name', {
      p_user_id: userId,
      p_public_name: publicName,
    })
    return result === true
  } catch (error) {
    console.error('Failed to update public name:', error)
    return false
  }
}

/**
 * Check and automatically assign badges based on user activity
 */
export async function checkAndAssignBadges(): Promise<any[]> {
  const { userId } = useSessionStore.getState()
  if (!userId) throw new Error('User not authenticated')

  try {
    const result = await rpc('check_and_assign_badges', {
      p_user_id: userId,
    })
    return Array.isArray(result) ? result : []
  } catch (error) {
    console.error('Failed to check badges:', error)
    return []
  }
}

/**
 * Register a journey step completion
 */
export async function registerJourneyStep(
  stepTitle: string,
  reflection: string,
  mediaUrls?: string[]
): Promise<boolean> {
  const { userId } = useSessionStore.getState()
  if (!userId) throw new Error('User not authenticated')

  try {
    const result = await rpc('register_journey_step', {
      p_user_id: userId,
      p_step_title: stepTitle,
      p_reflection: reflection,
      p_media_urls: mediaUrls || [],
    })
    return result === true
  } catch (error) {
    console.error('Failed to register journey step:', error)
    return false
  }
}

/**
 * Create a new forum post
 */
export async function createPost(post: {
  title: string
  problem_reflection: string
  solution_intention: string
  context_description: string
  media_urls?: string[]
}): Promise<any> {
  const { userId } = useSessionStore.getState()
  if (!userId) throw new Error('User not authenticated')

  try {
    const result = await rpc('create_post', {
      p_user_id: userId,
      p_title: post.title,
      p_problem_reflection: post.problem_reflection,
      p_solution_intention: post.solution_intention,
      p_context_description: post.context_description,
      p_media_urls: post.media_urls || [],
    })
    return result
  } catch (error) {
    console.error('Failed to create post:', error)
    throw error
  }
}

/**
 * Interact with a post (Presente or Risuona)
 */
export async function interactPost(
  postId: string,
  interactionType: 'presente' | 'risuona'
): Promise<boolean> {
  const { userId } = useSessionStore.getState()
  if (!userId) throw new Error('User not authenticated')

  try {
    const result = await rpc('interact_post', {
      p_user_id: userId,
      p_post_id: postId,
      p_interaction_type: interactionType,
    })
    return result === true
  } catch (error) {
    console.error('Failed to interact with post:', error)
    return false
  }
}

/**
 * Update the authenticated user's profile
 */
export async function updateProfile(updates: Record<string, any>): Promise<boolean> {
  const { userId } = useSessionStore.getState()
  if (!userId) throw new Error('User not authenticated')

  try {
    const { error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('id', userId)
    if (error) throw error
    return true
  } catch (err) {
    console.error('Failed to update profile:', err)
    return false
  }
}

/**
 * Fetch user profile (creates if doesn't exist)
 */
export async function fetchProfile(userId: string): Promise<any> {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single()

    if (error && (error as any).code === 'PGRST116') {
      // Not found, create default profile
      console.log('📝 Creating new profile for user:', userId)
      const defaultProfile = {
        id: userId,
        public_name: `User_${userId.slice(0, 8)}`,
        avatar: null,
        coin_balance: 0,
        bio: null,
        created_at: new Date().toISOString(),
      }

      const { data: newProfile, error: createError } = await supabase
        .from('profiles')
        .insert([defaultProfile])
        .select()
        .single()

      if (createError) throw createError
      return newProfile
    }

    if (error) throw error
    return data
  } catch (error) {
    console.error('Failed to fetch profile:', error)
    return null
  }
}

/**
 * Fetch all posts with pagination
 */
export async function fetchPosts(
  limit: number = 20,
  offset: number = 0
): Promise<any[]> {
  try {
    const { data, error } = await supabase
      .from('posts')
      .select(
        `
        *,
        profiles (id, public_name, avatar),
        interactions (id, interaction_type)
      `
      )
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1)

    if (error) throw error
    return data || []
  } catch (error) {
    console.error('Failed to fetch posts:', error)
    return []
  }
}

/**
 * Fetch badges for the current user
 */
export async function fetchBadges(userId: string): Promise<any[]> {
  try {
    const { data, error } = await supabase
      .from('user_badges')
      .select('*')
      .eq('user_id', userId)

    if (error) throw error
    return data || []
  } catch (error) {
    console.error('Failed to fetch badges:', error)
    return []
  }
}

/**
 * Fetch journey steps for the user
 */
export async function fetchJourneySteps(userId: string): Promise<any[]> {
  try {
    const { data, error } = await supabase
      .from('journey_steps')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: true })

    if (error) throw error
    return data || []
  } catch (error) {
    console.error('Failed to fetch journey steps:', error)
    return []
  }
}

/**
 * Fetch active users
 */
export async function fetchActiveUsers(): Promise<any[]> {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('id, public_name, avatar, updated_at')
      .order('updated_at', { ascending: false })
      .limit(50)

    if (error) throw error
    return data || []
  } catch (error) {
    console.error('Failed to fetch active users:', error)
    return []
  }
}

/**
 * Update or create wallet connection
 */
export async function updateWallet(
  userId: string,
  walletAddress: string
): Promise<boolean> {
  try {
    const { data: existing, error: fetchError } = await supabase
      .from('wallets')
      .select('id')
      .eq('user_id', userId)
      .single()

    if (fetchError?.code === 'PGRST116') {
      // Create new wallet record
      const { error: createError } = await supabase.from('wallets').insert([
        {
          user_id: userId,
          wallet_address: walletAddress,
          created_at: new Date().toISOString(),
        },
      ])
      return !createError
    }

    if (fetchError) throw fetchError

    // Update existing wallet
    const { error: updateError } = await supabase
      .from('wallets')
      .update({ wallet_address: walletAddress })
      .eq('user_id', userId)

    return !updateError
  } catch (error) {
    console.error('Failed to update wallet:', error)
    return false
  }
}

/**
 * Fetch wallet information
 */
export async function fetchWalletInfo(userId: string): Promise<any> {
  try {
    const { data, error } = await supabase
      .from('wallets')
      .select('*')
      .eq('user_id', userId)
      .single()

    if (error?.code === 'PGRST116') {
      return null // Not found is okay
    }

    if (error) throw error
    return data
  } catch (error) {
    console.error('Failed to fetch wallet info:', error)
    return null
  }
}

/**
 * Fetch spaces - generic list (may require backend table)
 */
export async function fetchSpaces(userId?: string): Promise<any[]> {
  try {
    // prefer RPC if available
    try {
      const data: any = await rpc('get_spaces', { p_user_id: userId })
      if (Array.isArray(data)) return data
    } catch (err) {
      // ignore, will fallback to table query
    }

    const query = supabase.from('spaces').select('*')
    if (userId) {
      query.eq('owner_id', userId)
    }
    const { data, error } = await query
    if (error) throw error
    return data || []
  } catch (error) {
    console.error('Failed to fetch spaces:', error)
    return []
  }
}

/**
 * Fetch projects - generic list
 */
export async function fetchProjects(spaceId?: string): Promise<any[]> {
  try {
    try {
      const data: any = await rpc('get_projects', { p_space_id: spaceId })
      if (Array.isArray(data)) return data
    } catch (err) {}

    const query = supabase.from('projects').select('*')
    if (spaceId) {
      query.eq('space_id', spaceId)
    }
    const { data, error } = await query
    if (error) throw error
    return data || []
  } catch (error) {
    console.error('Failed to fetch projects:', error)
    return []
  }
}

/**
 * Fetch network connections - simple representation
 */
export async function fetchNetwork(userId?: string): Promise<any[]> {
  try {
    try {
      const data: any = await rpc('get_network', { p_user_id: userId })
      if (Array.isArray(data)) return data
    } catch (err) {}

    const query = supabase.from('connections').select('*')
    if (userId) {
      query.or(`user_id.eq.${userId},peer_id.eq.${userId}`)
    }
    const { data, error } = await query
    if (error) throw error
    return data || []
  } catch (error) {
    console.error('Failed to fetch network data:', error)
    return []
  }
}

/**
 * Fetch recent activity (timeline) for user or global
 */
export async function fetchActivity(limit = 50, offset = 0): Promise<any[]> {
  try {
    try {
      const data: any = await rpc('get_activity', { p_limit: limit, p_offset: offset })
      if (Array.isArray(data)) return data
    } catch (err) {}

    const { data, error } = await supabase
      .from('activity')
      .select('*')
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1)
    if (error) throw error
    return data || []
  } catch (error) {
    console.error('Failed to fetch activity:', error)
    return []
  }
}

/**
 * Fetch messages for a conversation or user
 */
export async function fetchMessages(conversationId?: string, userId?: string): Promise<any[]> {
  try {
    try {
      const data: any = await rpc('get_messages', {
        p_conversation_id: conversationId,
        p_user_id: userId,
      })
      if (Array.isArray(data)) return data
    } catch (err) {}

    let query = supabase.from('messages').select('*')
    if (conversationId) {
      query = query.eq('conversation_id', conversationId)
    }
    if (userId) {
      query = query.or(`sender_id.eq.${userId},receiver_id.eq.${userId}`)
    }
    const { data, error } = await query.order('created_at', { ascending: true })
    if (error) throw error
    return data || []
  } catch (error) {
    console.error('Failed to fetch messages:', error)
    return []
  }
}

/**
 * Unsubscribe helper for compatibility
 */
export async function unsubscribeAll() {
  try {
    await supabase.removeAllChannels()
  } catch (err) {
    console.warn('Failed to remove channels:', err)
  }
}

/**
 * Backward compatible RPC functions object
 */
export const rpcFunctions = {
  rpc,
  verifySequence,
  updatePublicName,
  checkAndAssignBadges,
  registerJourneyStep,
  createPost,
  interactPost,
  fetchProfile,
  fetchPosts,
  fetchBadges,
  fetchJourneySteps,
  fetchActiveUsers,
  updateWallet,
  fetchWalletInfo,
  // new modules
  fetchSpaces,
  fetchProjects,
  fetchNetwork,
  fetchActivity,
  fetchMessages,
  updateProfile,
  unsubscribeAll,
}

