<template>
  <section class="pt-6 pb-8">
    <div class="container">
      <div class="mb-4">
        <h2 class="mb-6">Explore</h2>
      </div>
      <div class="relative px-6 pt-16 pb-20 overflow-hidden bg-gray-900 lg:px-24 rounded-3xl">
        <img class="absolute top-0 left-0" src="~/assets/images/lines/blue-half-circle.svg" alt="">
        <img class="absolute top-0 right-0 hidden mt-6 mr-12 lg:block" src="~/assets/images/zospace/stars.svg" alt="">
        <img class="absolute top-0 right-0 hidden lg:block w-96 h-96 -mt-14 -mr-14" src="~/assets/images/lines/circle.svg" alt="">
        <div class="relative">
          <h3 class="mt-6 mb-8 text-4xl text-white lg:text-5xl font-heading">{{ title }}</h3>

          <div class="grid items-start grid-cols-1 gap-6 mx-auto md:grid-cols-2">
            <div v-for="project in data" :key="project.id">
              <ProjectCard :data="project" :has-loaded="hasLoaded" :featured="true" />
              <p class="mt-4 text-sm text-right text-white opacity-40 lg:text-md hover:opacity-100">
                <NuxtLink to="/advertise">Sponsored</NuxtLink>
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  </section>
</template>


<script>
import global from '@/mixins/global'

export default {
  mixins: [global],
  props: {
    data: {
      type: Array,
      default: () => []
    },
    hasLoaded: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    title() {
      if (Object.keys(this.data).length === 1) {
        return 'Featured project'
      }
      return 'Featured projects'
    }
  }
}
</script>
