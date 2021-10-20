import { supabase } from '@/plugins/supabase'

export const useCreateWatchlist = async (userId, watchlistName) => {
    return await supabase
        .from('watchlists')
        .insert({ author_id: userId, name: watchlistName })
}