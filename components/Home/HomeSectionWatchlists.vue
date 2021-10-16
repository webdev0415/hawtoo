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
          <div v-for="watchlist in watchlists" :key="watchlist">
            <HomeFeaturedWatchlist :data="watchlist" />
          </div>

        </div>
      </div>

    </div>
  </section>
</template>

<script>
import HomeFeaturedWatchlist from '@/components/Home/HomeFeaturedWatchlist'

export default {
  components: {
    HomeFeaturedWatchlist
  },
  data() {
    return {
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
  }
}
</script>
