import { createClient } from '@supabase/supabase-js'

// Get credentials from environment variables
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY

// Validate credentials
if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  console.warn('Missing Supabase credentials. Make sure to set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your .env file')
}

// Create Supabase client with error handling
const supabase = createClient(SUPABASE_URL || '', SUPABASE_ANON_KEY || '', {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true
  }
})

// Test connection and log status
supabase.auth.onAuthStateChange((event, session) => {
  if (event === 'SIGNED_IN') {
    console.log('Supabase connection successful')
  }
})

// Export both client and connection status
export const hasRealCredentials = !!(SUPABASE_URL && SUPABASE_ANON_KEY)
export default supabase