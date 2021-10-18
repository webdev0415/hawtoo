<template>
  <main>
    <WatchlistBanner v-if="getWatchlist.banner_url" :banner-url="getWatchlist.banner_url" />
    <div class="pb-16 -mt-16">
      <div class="container">
        <WatchlistSectionInfo :data="getWatchlist" />
        <WatchlistActions :data="getWatchlist" />

        <WatchlistTable v-if="projects" :data="projects" />
        <WatchlistEmpty v-else />

      </div>
    </div>
  </main>
</template>

<script>
// import getMeta from '~/utils/get-meta'
// import { mapGetters } from 'vuex'
import axios from 'axios'
import { mapGetters } from 'vuex'
import {
  getWatchListItems,
  getWatchlistById
} from '@/utils/supabase/watchlists'
import { getProfileInfo } from '@/utils/supabase/users'
import WatchlistSectionInfo from '@/components/Watchlists/WatchlistSectionInfo'
import WatchlistEmpty from '@/components/Watchlists/WatchlistEmpty'
import WatchlistTable from '@/components/Watchlists/WatchlistTable'
import WatchlistBanner from '@/components/Watchlists/WatchlistBanner'
import WatchlistActions from '@/components/Watchlists/WatchlistActions'

export default {
  components: {
    WatchlistSectionInfo,
    WatchlistEmpty,
    WatchlistTable,
    WatchlistBanner,
    WatchlistActions
  },
  async asyncData({ $supabase, $config, params, error, $auth, store }) {
    let canEdit = false
    const user = store.state.auth.user
    const watchlistId = params.watchlists

    const { data: watchlistData, error: watchlistError } =
      await getWatchlistById(watchlistId)

    if (watchlistError) {
      if (watchlistError.details.startsWith('Results contain 0 rows')) {
        error({ statusCode: 404 })
        return
      } else {
        error({ statusCode: 500, watchlistError })
        return
      }
    }

    const authorId = watchlistData.author_id

    if (user) {
      canEdit = authorId === user.id
    }

    // Return 404 if the watchlist is not set to `public`
    // Unless the logged in user is the author of the watchlist.
    const isPrivateWatchlist = !watchlistData.public && !canEdit
    if (isPrivateWatchlist) {
      error({ statusCode: 404 })
    }

    // Get author details.
    const userResponse = await getProfileInfo(authorId)
    watchlistData.authorMeta = { ...userResponse.data }

    // Get collected items.
    const collectedResponse = await getWatchListItems(watchlistId, authorId)

    // Hydrate store.
    store.commit('watchlists/SET_SINGLE_WATCHLIST', watchlistData)

    return {
      data: watchlistData,
      projects: collectedResponse.data
    }
  },
  data: () => ({
    subscriber: null
  }),
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
  },
  computed: {
    ...mapGetters({
      getWatchlist: 'watchlists/watchlist'
    })
  },
  created() {
    // Listening for real-times updates to this watchlist.
    // const id = this.$route.params.watchlists
    // this.subscriber = this.$supabase
    //   .from(`watchlists:id=eq.${id}`)
    //   .on('*', (payload) => {
    //     switch (payload.eventType) {
    //       case 'INSERT':
    //         this.updateStore(payload.new)
    //         break
    //       case 'UPDATE':
    //         this.updateStore(payload.new)
    //         return
    //       case 'DELETE':
    //         this.$nuxt.error({ statusCode: 404, message: 'Page not found' })
    //         break
    //     }
    //   })
    //   .subscribe()
  },
  beforeDestroy() {
    this.$supabase.removeSubscription(this.subscriber)
  },
  async mounted() {
    this.$supabase.removeSubscription(this.subscriber)
    const { watchlists } = this.$route.params
    await axios.post('/api/increment_watchlist_view', {
      watchlists
    })
  },
  methods: {
    async updateStore(payload) {
      // Get each project that has been collected by the user.

      const collectedResponse = await getWatchListItems(
        payload.id,
        payload.author_id
      )

      payload.projects = collectedResponse.data

      // Get author details.
      const userResponse = await this.$supabase
        .from('profiles')
        .select('*')
        .eq('id', payload.author_id)
        .single()

      payload.authorMeta = {
        ...userResponse.data
      }

      this.$store.commit('watchlists/SET_SINGLE_WATCHLIST', payload)
    }
  }
}
</script>
