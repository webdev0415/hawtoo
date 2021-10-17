<template>
  <section>
    <div class="flex flex-col">
      <img :src="getWatchlist.banner_url" alt="">
      <div class="mb-4 sm:items-center sm:flex sm:space-x-5">
        <div class="flex-shrink-0 text-center md:text-left">
          <UserAvatar :user-id="getWatchlist.author_id" :size="60" />
        </div>
        <div class="mt-4 text-center sm:mt-0 sm:text-left">
          <p class="text-sm font-medium text-gray-600">A watchlist by:</p>
          <p class="font-bold text-gray-900 text-md">{{ getWatchlist.authorMeta.display_name }}</p>
        </div>
      </div>
      <div>
        <div class="pb-5 text-center border-b border-gray-200 sm:text-left">
          <div class="flex flex-col items-center justify-center sm:items-start">
            <div class="flex flex-row mb-2">
              <h1 class="text-3xl leading-6 text-gray-900">
                {{ getWatchlist.name}}
              </h1>
              <WatchlistEditButton v-if="isAuthenticated" class="ml-4" />
            </div>
          </div>
          <p class="max-w-4xl mt-2 text-sm text-center sm:text-left">
            {{ getWatchlist.description}}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapGetters } from 'vuex'
import WatchlistEditButton from '@/components/Watchlists/WatchlistEditButton'
import UserAvatar from '@/components/Site/UserAvatar'

export default {
  components: {
    WatchlistEditButton,
    UserAvatar
  },
  props: {
    data: {
      type: Object,
      required: false,
      default: () => {}
    }
  },
  computed: {
    ...mapGetters({
      isAuthenticated: 'auth/loggedIn',
      getWatchlist: 'watchlists/watchlist'
    })
  }
}
</script>