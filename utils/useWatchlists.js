import { supabase } from '@/plugins/supabase'

/**
 * Fetches all watchlists accessible by the user.
 */
export const useWatchlists = async (userId) => {
    const watchlistsResponse = await supabase
        .from('watchlists')
        .select('*')
        .eq('author_id', userId)

    if (watchlistsResponse.error) {
        throw watchlistsResponse.error;
    }

    return watchlistsResponse.data;
}
