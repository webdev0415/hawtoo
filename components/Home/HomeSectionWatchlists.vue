<template>
  <section class="bg-black">
    <div class="container">

      <div class="max-w-3xl pb-16 mx-auto text-center text-white">
        <h2 class="mb-6">Join the community</h2>
        <div class="text-xl">
          <p class="text-white">
            Learn from others, share your watchlist, and explore projects you've never seen before. Donec nec justo eget felis facilisis fermentum. Donec nec justo eget felis facilisis fermentum.
          </p>
        </div>
      </div>

      <div>
        <h3 class="m-0 text-base font-bold leading-normal tracking-wide text-yellow-400 uppercase">
          Worth checking out
        </h3>
        <div class="mb-4 text-2xl text-white">
          Curated watchlists
        </div>

        <div class="grid grid-cols-1 gap-10 auto-cols-fr lg:grid-cols-5">
          <div v-for="watchlist in data" :key="watchlist.id">
            <HomeFeaturedWatchlist :data="watchlist" />
          </div>

        </div>
      </div>

    </div>
  </section>
</template>

<script>
import { getProfileInfo } from '@/utils/supabase/users'
import HomeFeaturedWatchlist from '@/components/Home/HomeFeaturedWatchlist'

export default {
  components: {
    HomeFeaturedWatchlist
  },
  data() {
    return {
      data: [],
      watchlists: [
        {
          title: 'Alex Becker',
          desc: 'Known for riddles, and YouTube rants.',
          views: '30.2K',
          userName: 'HawToo Official',
          userAvatar: require('@/assets/images/hawtoo-icon.svg'),
          backgroundImage: require('@/assets/images/alex-1.png')
        },
        {
          title: 'Alex Becker',
          desc: 'Known for riddles, and YouTube rants.',
          views: '30.2K',
          userName: 'HawToo Official',
          userAvatar: require('@/assets/images/hawtoo-icon.svg'),
          backgroundImage: require('@/assets/images/alex-1.png')
        },
        {
          title: 'Alex Becker',
          desc: 'Known for riddles, and YouTube rants.',
          views: '30.2K',
          userName: 'HawToo Official',
          userAvatar: require('@/assets/images/hawtoo-icon.svg'),
          backgroundImage: require('@/assets/images/alex-1.png')
        },
        {
          title: 'Alex Becker',
          desc: 'Known for riddles, and YouTube rants.',
          views: '30.2K',
          userName: 'HawToo Official',
          userAvatar: require('@/assets/images/hawtoo-icon.svg'),
          backgroundImage: require('@/assets/images/alex-1.png')
        },
        {
          title: 'Alex Becker',
          desc: 'Known for riddles, and YouTube rants.',
          views: '30.2K',
          userName: 'HawToo Official',
          userAvatar: require('@/assets/images/hawtoo-icon.svg'),
          backgroundImage: require('@/assets/images/alex-1.png')
        }
      ]
    }
  },
  async fetch() {
    const profileId = 'f60296c2-1cc8-48e2-80a7-9a385e66a9c3'
    const { data } = await this.$supabase
      .from('watchlists')
      .select('*')
      .eq('author_id', profileId)
      .limit(5)

    if (data) {
      await Promise.all(
        data.map(async (watchlist) => {
          const userResponse = await getProfileInfo(profileId)
          watchlist.authorMeta = { ...userResponse.data }
          watchlist.banner_url = require('@/assets/images/alex-1.png')
          this.data.push(watchlist)
        })
      )
    }
  }
}
</script>
