import { supabase } from '@/plugins/supabase'

export const addProjectToWatchlist = async (userId, watchlistId, projectId) => {
    return await supabase
        .from('watchlist_items')
        .upsert({ watchlist_id: watchlistId, author_id: userId, project_id: projectId })
        .match({ id: watchlistId })
}

