import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.SUPABASE_PUBLIC_URL
const supabaseAnonKey = process.env.SUPABASE_PUBLIC_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export default ({ app, store }, inject) => {
    // Hydrate store on load.
    store.dispatch('auth/fetchUser', supabase.auth.user())

    // Can be accessed via this.$supabase in components etc.
    inject('supabase', supabase);
};
