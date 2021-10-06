import { supabase } from '@/plugins/supabase'

const getUserWatchlists = async (userId) => {
    return await supabase
        .from('watchlists')
        .select('*')
        .eq('author_id', userId)
}

const createNewWatchlist = async (userId, watchlistName) => {
    return await supabase
        .from('watchlists').insert({ author_id: userId, name: watchlistName })
}

const addProjectToWatchlist = async (userId, watchlistId, collectedArray) => {
    return await supabase
        .from('watchlists')
        .upsert({ id: watchlistId, author_id: userId, collected: collectedArray })
}

export {
    getUserWatchlists,
    createNewWatchlist,
    addProjectToWatchlist,
}