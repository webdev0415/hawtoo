import { supabase } from '@/plugins/supabase'

export const deleteWatchlist = async (watchlistId) => {
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