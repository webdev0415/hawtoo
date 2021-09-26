import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.SUPABASE_PUBLIC_URL
const supabaseAnonKey = process.env.SUPABASE_PUBLIC_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export default ({ app }, inject) => {
    // Can be accessed via this.$firebase in components etc.
    inject('supabase', supabase);
};
