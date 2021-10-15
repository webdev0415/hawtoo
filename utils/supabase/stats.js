import { supabase } from '@/plugins/supabase'

const getStatsById = async (id, type) => {
    type = type || '*'
    return await supabase
        .from('nft_stats')
        .select('*')
        .eq('project_id', id)
        .order('id', { descending: true })
        .limit(1)
}

export {
    getStatsById
}