<template>
  <section class="bg-white">
    <div class="container">
      <div class="grid grid-cols-1 gap-10 auto-cols-fr lg:grid-cols-2">
        <HomeFeaturedSponsor />
        <HomeTrendingProjects />
      </div>
    </div>
  </section>

</template>

<script>
import HomeFeaturedSponsor from '@/components/Home/HomeFeaturedSponsor.vue'
import HomeTrendingProjects from '@/components/Home/HomeTrendingProjects.vue'

export default {
  components: {
    HomeFeaturedSponsor,
    HomeTrendingProjects
  }
}
</script>

<style lang="scss" scoped>
</style>