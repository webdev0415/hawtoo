import { supabase } from '@/plugins/supabase'

export const useGetProfile = async (id) => {
    return await supabase
        .from('profiles')
        .select('*')
        .eq('id', id)
        .single()
}