<template>
  <div class="flex flex-col items-center mb-2">
    <div class="flex flex-wrap justify-center mb-3">
      <UserAvatar :verified="getWatchlist.authorMeta.verified" verified-tooltip :size="96" :size-badge="28" :name="getWatchlist.authorMeta.display_name" :user-id="getWatchlist.author_id" />
    </div>

    <h1 class="mb-2 text-3xl font-semibold leading-tight text-center md:text-4xl">
      {{ getWatchlist.name }}
    </h1>

    <div class="max-w-[680px] pb-1 mx-auto text-sm leading-relaxed text-center md:text-lg ">
      <p>{{ getWatchlist.description}} </p>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import UserAvatar from '@/components/Site/UserAvatar'

export default {
  components: {
    UserAvatar
  },
  props: {
    data: {
      type: Object,
      required: false,
      default: () => {}
    }
  },
  data() {
    return {}
  },
  computed: {
    ...mapGetters({
      isAuthenticated: 'auth/loggedIn',
      getWatchlist: 'watchlists/watchlist'
    })
  }
}
</script>