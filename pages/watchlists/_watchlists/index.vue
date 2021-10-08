<template>
  <main>
    <div class="container py-8">
      <WatchlistSectionInfo :data="data" />
      <div v-if="data.projects">
        <WatchlistTable :data="data" />
      </div>
      <div v-else class="">
        <WatchlistEmpty />
      </div>
    </div>
  </main>
</template>

<script>
// import getMeta from '~/utils/get-meta'
import WatchlistSectionInfo from '@/components/Watchlists/WatchlistSectionInfo'
import WatchlistEmpty from '@/components/Watchlists/WatchlistEmpty'
import WatchlistTable from '@/components/Watchlists/WatchlistTable'

export default {
  components: {
    WatchlistSectionInfo,
    WatchlistEmpty,
    WatchlistTable
  },
  async asyncData({ $supabase, $config, params, error, $auth }) {
    let canEdit = false
    const watchlistResponse = await $supabase
      .from('watchlists')
      .select('*')
      .eq('id', params.watchlists)
      .single()

    if (watchlistResponse.error) {
      const watchlistError = watchlistResponse.error
      if (watchlistError.details.startsWith('Results contain 0 rows')) {
        error({ statusCode: 404 })
      } else {
        error({ statusCode: 500, watchlistError })
      }
    }

    const authorId = watchlistResponse.data?.author_id ?? null

    if ($auth.loggedIn) {
      canEdit = authorId === $auth.user.id
    }

    // authorid is null so it won't equal to logged in user
    const isPrivateWatchlist = !watchlistResponse.data.public && !canEdit
    const collectedArray = watchlistResponse.data.collected ?? []

    // Return 404 if the watchlist is not set to `public`
    // Unless the logged in user is the author of the watchlist.
    if (isPrivateWatchlist) {
      error({ statusCode: 404 })
    }

    // Get author details.
    const userResponse = await $supabase
      .from('profiles')
      .select('*')
      .eq('id', authorId)
      .single()

    watchlistResponse.data.authorMeta = { ...userResponse.data }

    // Get each project that has been collected by the user.
    if (collectedArray && collectedArray.length !== 0) {
      const collectedArray = watchlistResponse.data.collected
      const collectedResponse = await $supabase
        .from('projects')
        .select('*')
        .in('id', collectedArray)

      watchlistResponse.data.projects = { ...collectedResponse.data }
    }

    return {
      data: watchlistResponse.data
    }
  },
  head() {
    return {
      bodyAttrs: {
        class: 'antialiased bg-white text-body font-body min-w-xs min-h-screen'
      },
      title: `${this.data.name}`,
      description: this.data.description
      // meta: getMeta({
      //   title: `Watchlist: ${this.data.name}`,
      //   authorName: this.data.author_id,
      //   authorNameDesc: this.data.description,
      //   authorImage: this.avatarUrl
      // })
    }
  }
}
</script>