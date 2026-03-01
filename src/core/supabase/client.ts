import { createClient } from '@supabase/supabase-js'

declare global {
  interface ImportMeta {
    env: {
      VITE_SUPABASE_URL: string
      VITE_SUPABASE_ANON_KEY: string
    }
  }
}

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY

// Validate credentials
if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  console.error('❌ Supabase Configuration Error')
  console.error('Missing environment variables:')
  if (!SUPABASE_URL) console.error('  - VITE_SUPABASE_URL')
  if (!SUPABASE_ANON_KEY) console.error('  - VITE_SUPABASE_ANON_KEY')
  console.error('Please set these in .env.local')
  throw new Error('Supabase credentials not configured')
}

console.log('✅ Supabase Connected:', SUPABASE_URL)

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
  realtime: {
    params: {
      eventsPerSecond: 10,
    },
  },
})

/**
 * Safe helper to get current session — returns null instead of throwing.
 */
export async function safeGetSession() {
  try {
    const { data, error } = await supabase.auth.getSession()
    if (error) {
      console.warn('safeGetSession: supabase.auth.getSession error', error)
      return null
    }
    return data?.session ?? null
  } catch (err) {
    console.warn('safeGetSession exception', err)
    return null
  }
}
