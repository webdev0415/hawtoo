
<template>
  <main class="flex flex-col flex-grow min-h-screen overflow-hidden">
    <HomeSectionHero class="pb-8 pt-14" />
    <HomeSectionUpcoming class="pt-8 pb-24" />
    <HomeSectionTop v-if="temp" class="pt-8 pb-24" />
    <HomeSectionWatchlists class="py-24" />
  </main>
</template>

<script>
import HomeSectionHero from '@/components/Home/HomeSectionHero.vue'
import HomeSectionUpcoming from '@/components/Home/HomeSectionUpcoming.vue'
import HomeSectionTop from '@/components/Home/HomeSectionTop.vue'
import HomeSectionWatchlists from '@/components/Home/HomeSectionWatchlists.vue'

export default {
  components: {
    HomeSectionHero,
    HomeSectionUpcoming,
    HomeSectionTop,
    HomeSectionWatchlists
  },
  data() {
    return {
      temp: null
    }
  },
  mounted() {
    // eslint-disable-next-line no-console
    console.log(`✨ Thanks for visiting ${process.env.TITLE}`)
  }
}
</script>