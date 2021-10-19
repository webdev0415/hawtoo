import { supabase } from '@/plugins/supabase'

export const getStatsById = async (id, type) => {
    type = type || '*'
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

// export const getLatestStatsById = async (id) => {
//     const now = dayjs().startOf('day')
//     const tomorrow = now.add(1, 'day').toISOString()
//     return await supabase
//         .from('nft_stats')
//         .select('*')
//         .eq('project_id', id)
//         .gte('created_at', now)
//         .lte('created_at', tomorrow)
//         .order('created_at', { ascending: false })
//         .limit(1)
// }

// export const getYesterdayLatestStatsById = async (id) => {
//     const now = dayjs().startOf('day')
//     const yesterday = now.add(-1, 'day').toISOString()
//     return await supabase
//         .from('nft_stats')
//         .select('*')
//         .eq('project_id', id)
//         .gte('created_at', yesterday)
//         .lte('created_at', now)
//         .order('created_at', { ascending: false })
//         .limit(1)
// }

