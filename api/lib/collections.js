import { supabase } from '@/plugins/supabase'

const getUserCollections = async (userId) => {
    return await supabase
        .from('collections')
        .select('*')
        .eq('author_id', userId)
}

const createNewCollection = async (userId, collectionName) => {
    return await supabase
        .from('collections').insert({ author_id: userId, collection_name: collectionName })
}

const addProjectToCollection = async (userId, collectionId, collectedArray) => {
    return await supabase
        .from('collections')
        .upsert({ id: collectionId, author_id: userId, collected_projects: collectedArray })
}

export {
    getUserCollections,
    createNewCollection,
    addProjectToCollection,
}