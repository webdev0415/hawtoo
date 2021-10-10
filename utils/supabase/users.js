import { supabase } from '@/plugins/supabase'

const getAvatarInfo = async (id) => {
    return await supabase
        .from('profiles')
        .select('display_name, avatar_url, verified')
        .eq('id', id)
        .single()
}

const getProfileInfo = async (id) => {
    return await supabase
        .from('profiles')
        .select('*')
        .eq('id', id)
        .single()
}

const logout = async () => {
    try {
        const { error } = await supabase.auth.signOut()
        if (error) throw error
    } catch (error) {
        throw new Error(error.message)
    }
}

export {
    getAvatarInfo,
    getProfileInfo,
    logout
}