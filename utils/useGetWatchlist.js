import { supabase } from '@/plugins/supabase'

export const getWatchlistsByUserId = async (userId) => {
    return await supabase
        .from('watchlists')
        .select('*')
        .eq('author_id', userId)
}

export const getWatchlistById = async (id) => {
    return await supabase
        .from('watchlists')
        .select('*')
        .eq('id', id)
        .single()
}

export const getWatchListItems = async (watchlistId, authorId) => {
    return await supabase.from('watchlist_items')
        .select('*')
        .eq('watchlist_id', watchlistId)
        .eq('author_id', authorId)
}

export const getWatchlistCountByProjectId = async (id) => {
    return await supabase
        .from('watchlist_items')
        .select('*', { head: true, count: 'exact' })
        .eq('project_id', id)
}