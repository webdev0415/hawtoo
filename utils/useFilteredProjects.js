/* eslint-disable no-unused-vars */
/* eslint-disable prefer-const */
/* eslint-disable no-undef */
export default async function useFilteredShows({ $supabase, $config }, type, page) {

    const { error: tagsErr, data: tags } = await $supabase
        .from('tags')
        .select('id, name')
        .in('name', $config.tagNames)

    const { count: totalCount } = await $supabase
        .from('projects')
        .select('*', { head: true, count: 'exact' })
        .eq('state', 'published')

    let countQuery = $supabase
        .from('projects')
        .select('*', { head: true, count: 'exact' })
        .eq('state', 'published')

    // Find the type from the route param.
    if (type) {
        const tag = tags.find((t) => t.name === type)
        if (tag) {
            countQuery = countQuery.ov('tags', [tag.id])
        }
    }

    const { count } = await countQuery


    let query = $supabase
        .from('projects')
        .select(
            '*'
        )
        .eq('state', 'published')
        .ov(
            'tags',
            tags.map((t) => t.id)
        )
        .order('published_at', { ascending: false })

    if (type) {
        const tag = tags.find((t) => t.name === type)
        if (tag) {
            query = query.ov('tags', [tag.id])
        }
    }
    page = page - 1 || 0
    if (page <= 0) {
        page = 0
    }
    const rangeStart = $config.paginate * page
    const rangeEnd = rangeStart + $config.paginate

    const { error: err, data } = await query.range(rangeStart, rangeEnd - 1)

    // const err = {};
    // const data = {};
    // console.log(data);
    return {
        error: err || tagsErr,
        projects: data,
        totalCount,
        count,
    }
}
