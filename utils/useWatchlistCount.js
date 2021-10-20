import { supabase } from '@/plugins/supabase'

/**
 * Fetches the total watchlists count accessible by the user.
 */
export const useWatchlistCount = async (userId) => {
    const watchlistsResponse = await supabase
        .from('watchlists')
        .select('*', { head: true, count: 'exact' })
        .eq('author_id', userId)


    if (watchlistsResponse.error) {
        throw watchlistsResponse.error;
    }

    return watchlistsResponse.count;
}
