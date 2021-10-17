import { supabase } from '@/plugins/supabase'

const createNewWatchlist = async (userId, watchlistName) => {
    return await supabase
        .from('watchlists').insert({ author_id: userId, name: watchlistName })
}

const getWatchlistsByUserId = async (userId) => {
    return await supabase
        .from('watchlists')
        .select('*')
        .eq('author_id', userId)
}

const getWatchlistById = async (id) => {
    return await supabase
        .from('watchlists')
        .select('*')
        .eq('id', id)
        .single()
}

const getWatchListItems = async (watchlistId, authorId) => {
    return await supabase.from('watchlist_items')
        .select('*')
        .eq('watchlist_id', watchlistId)
        .eq('author_id', authorId)
}

const deleteWatchlist = async (watchlistId) => {
    const watchlistItemsResponse = await supabase
        .from('watchlist_items')
        .delete()
        .match({ watchlist_id: watchlistId })

    if (watchlistItemsResponse.error) {
        throw new Error(watchlistItemsResponse.error)
    }

    const watchlistResponse = await supabase
        .from("watchlists")
        .delete()
        .match({ id: watchlistId })
        .single();

    if (watchlistResponse.error) {
        throw new Error(watchlistResponse.error)
    }

    return watchlistResponse.data
}

const getWatchlistCountByProjectId = async (id) => {
    return await supabase
        .from('watchlist_items')
        .select('*', { head: true, count: 'exact' })
        .eq('project_id', id)
}

const addProjectToWatchlist = async (userId, watchlistId, projectId) => {
    return await supabase
        .from('watchlist_items')
        .upsert({ watchlist_id: watchlistId, author_id: userId, project_id: projectId })
        .match({ id: watchlistId })
}

export {
    createNewWatchlist,
    getWatchlistsByUserId,
    getWatchlistById,
    getWatchListItems,
    addProjectToWatchlist,
    getWatchlistCountByProjectId,
    deleteWatchlist
}