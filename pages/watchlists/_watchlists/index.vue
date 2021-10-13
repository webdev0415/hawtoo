<template>
  <main>
    <div class="container py-8">
      <WatchlistSectionInfo :data="getWatchlist" />
      <div v-if="getWatchlist.projects">
        <!-- <div v-for="project in getWatchlist.projects" :key="project.id">
          {{ project.name }}
        </div> -->
        <WatchlistTable :data="getWatchlist" />
      </div>
      <div v-else class="">
        <WatchlistEmpty />
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
  getWatchlistById,
} from '@/utils/supabase/watchlists'
import { getProfileInfo } from '@/utils/supabase/users'
import WatchlistSectionInfo from '@/components/Watchlists/WatchlistSectionInfo'
import WatchlistEmpty from '@/components/Watchlists/WatchlistEmpty'
import WatchlistTable from '@/components/Watchlists/WatchlistTable'

export default {
  components: {
    WatchlistSectionInfo,
    WatchlistEmpty,
    WatchlistTable,
  },
  async asyncData({ $supabase, $config, params, error, $auth, store }) {
    let canEdit = false
    const user = $supabase.auth.user()
    const watchlistId = params.watchlists
    const watchlistResponse = await getWatchlistById(watchlistId)

    if (watchlistResponse.error) {
      const watchlistError = watchlistResponse.error
      if (watchlistError.details.startsWith('Results contain 0 rows')) {
        error({ statusCode: 404 })
        return
      } else {
        error({ statusCode: 500, watchlistError })
        return
      }
    }

    const authorId = watchlistResponse.data?.author_id ?? null

    if (user) {
      canEdit = authorId === user.id
    }

    // Return 404 if the watchlist is not set to `public`
    // Unless the logged in user is the author of the watchlist.
    const isPrivateWatchlist = !watchlistResponse.data.public && !canEdit
    if (isPrivateWatchlist) {
      error({ statusCode: 404 })
    }

    // Get author details.
    const userResponse = await getProfileInfo(authorId)
    watchlistResponse.data.authorMeta = { ...userResponse.data }

    // Get collected items.
    const collectedResponse = await getWatchListItems(watchlistId, authorId)
    watchlistResponse.data.projects = collectedResponse.data

    // Hydrate store.
    store.commit('watchlists/SET_SINGLE_WATCHLIST', watchlistResponse.data)

    return {
      data: watchlistResponse.data,
    }
  },
  data: () => ({
    subscriber: null,
  }),
  head() {
    return {
      bodyAttrs: {
        class: 'antialiased bg-white text-body font-body min-w-xs min-h-screen',
      },
      title: `${this.data.name}`,
      description: this.data.description,
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
      getWatchlist: 'watchlists/watchlist',
    }),
  },
  created() {
    // Listening for real-times updates to this watchlist.
    const id = this.$route.params.watchlists
    this.subscriber = this.$supabase
      .from(`watchlists:id=eq.${id}`)
      .on('*', (payload) => {
        switch (payload.eventType) {
          case 'INSERT':
            this.updateStore(payload.new)
            break
          case 'UPDATE':
            this.updateStore(payload.new)
            return
          case 'DELETE':
            this.$nuxt.error({ statusCode: 404, message: 'Page not found' })
            break
        }
      })
      .subscribe()
  },
  beforeDestroy() {
    this.$supabase.removeSubscription(this.subscriber)
  },
  methods: {
    async updateStore(payload) {
      // Get each project that has been collected by the user.
      if (payload.collected) {
        const collectedArray = payload.collected
        const collectedResponse = await this.$supabase
          .from('projects')
          .select('*')
          .in('id', collectedArray)

        payload.projects = { ...collectedResponse.data }
      }

      // Get author details.
      const userResponse = await this.$supabase
        .from('profiles')
        .select('*')
        .eq('id', payload.author_id)
        .single()

      payload.authorMeta = {
        ...userResponse.data,
      }

      this.$store.commit('watchlists/SET_SINGLE_WATCHLIST', payload)
    },
  },
  async mounted() {
    const { watchlists } = this.$route.params
    await axios.post('/api/increment_watchlist_view', {
      watchlists,
    })
    // const res = await axios.post('/api/increment_watchlist_view', {
    //   watchlists,
    // })
    // if (res.status === 200) {
    //   this.$toast.open({
    //     message: res.data.message,
    //     type: 'success',
    //   })
    // } else {
    //   this.$toast.open({
    //     message: `Unknow Error`,
    //     type: 'error',
    //   })
    // }
  },
}
</script>
