<template>
  <div class="relative">
    <span class="absolute top-0 left-0 w-full h-full mt-1 ml-1 bg-blue-500 rounded-lg" :style="{'background-color': data.avatar_color }"></span>
    <nav aria-label="Sidebar" class="relative mt-2 bg-white border-2 border-blue-500 rounded-lg" :style="{'border-color': data.avatar_color }">
      <div class="z-10 p-4 space-y-1">

        <!-- sites --->
        <div v-for="(sites, key) in data.sites" :key="'sites_' + key">
          <ProjectLink :data="sites" />
        </div>

        <!-- marketplaces --->
        <div v-for="(marketplaces, key) in data.marketplaces" :key="'marketplaces_' + key">
          <ProjectLink :data="marketplaces" />
        </div>

        <!-- social media --->
        <div v-for="(socials, key) in sortedSociallinks" :key="'sl_' + key">
          <ProjectLink :data="socials" />
        </div>

      </div>
    </nav>
  </div>
</template>

<script>
import ProjectLink from '@/components/Project/ProjectLink'

export default {
  components: {
    ProjectLink
  },
  props: {
    data: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    sortedSociallinks() {
      if (!this.data.socials) return []
      return this.data.socials.slice(0).sort((a, b) => {
        if (a.name > b.name) return 1
        if (a.name < b.name) return -1
        return 0
      })
    }
  }
}
</script>
