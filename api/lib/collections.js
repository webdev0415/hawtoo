import { supabase } from '@/plugins/supabase'

const getUserCollections = async (userId) => {
    return await supabase
        .from('collections')
        .select('*')
        .eq('author_id', userId)
}

const addProjectToCollection = async (userId, projectId) => {
    return await supabase
        .from('collections')
        .select('*')
        .eq('author_id', userId)
}

export {
    getUserCollections,
    addProjectToCollection
}