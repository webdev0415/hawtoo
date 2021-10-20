import { supabase } from '@/plugins/supabase'

export const getStatsById = async (id) => {
    return await supabase
        .from('nft_stats')
        .select('*')
        .eq('project_id', id)
        .order('id', { descending: true })
        .limit(1)
}

export const getStatsBetweenDatesById = async (id, isoDate1, isoDate2) => {
    return await supabase
        .from('nft_stats')
        .select('*')
        .eq('project_id', id)
        .gte('created_at', isoDate1)
        .lte('created_at', isoDate2)
        .order('created_at', { ascending: false })
        .limit(1)
}