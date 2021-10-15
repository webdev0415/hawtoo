
<template>
  <main class="flex flex-col flex-grow min-h-screen overflow-hidden">

    <section class="bg-white">
      <div class="container py-12 mx-auto ">
        <div class="grid grid-cols-1 gap-10 auto-cols-fr lg:grid-cols-2">
          <HomeFeaturedSponsor />
          <HomeTrendingProjects />
        </div>
      </div>
    </section>

    <HomeUpcomingProjects />

    <!-- <div class="bg-white">
      <div class="container py-16 mx-auto ">
        <div id="main" class="grid grid-cols-3 gap-1 justify-evenly">
          <div class="h-12 bg-green-300 rounded-lg">1</div>
          <div class="h-12 bg-green-300 rounded-lg">2</div>
          <div class="h-12 bg-green-300 rounded-lg">3</div>
          <div class="h-12 col-span-2 bg-green-500 rounded-lg">4</div>
          <div class="h-12 bg-green-300 rounded-lg">5</div>
          <div class="h-12 col-span-3 bg-green-500 rounded-lg">6</div>
        </div>
      </div>
    </div> -->

  </main>
</template>

<script>
import global from '@/mixins/global'

import HomeFeaturedSponsor from '@/components/Home/HomeFeaturedSponsor.vue'
import HomeTrendingProjects from '@/components/Home/HomeTrendingProjects.vue'

export default {
  components: {
    HomeFeaturedSponsor,
    HomeTrendingProjects
  },
  mixins: [global],
  mounted() {
    // eslint-disable-next-line no-console
    console.log(`✨ Thanks for visiting ${process.env.TITLE}`)
  }
}
</script>