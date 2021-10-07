import { supabase } from '@/plugins/supabase'

const getAvatarInfo = async (id) => {
    return await supabase
        .from('profiles')
        .select('display_name, avatar_url, verified')
        .eq('id', id)
        .single()
}

export {
    getAvatarInfo
}