<template>
  <div class="relative">
    <span class="absolute top-0 left-0 w-full h-full mt-1 ml-1 bg-blue-500 rounded-lg" :style="{'background-color': data.avatarColor }"></span>
    <nav aria-label="Sidebar" class="relative mt-2 bg-white border-2 border-blue-500 rounded-lg" :style="{'border-color': data.avatarColor }">
      <div class="z-10 p-4 space-y-1">

        <!-- sites --->
        <div v-for="(site, key) in data.sites" :key="'sites_' + key">
          <a v-if="site.url" :href="site.url" target="_blank" rel="noopener noreferer" :title="site.name" class="flex items-center px-2 py-2 text-base font-medium text-gray-800 capitalize rounded-md hover:bg-gray-200 hover:text-gray-900 group">
            <!-- <FontAwesome class="w-4 h-4 mr-3 " :icon=" ['fal', 'arrow-right' ]" /> -->
            {{ site.name }}
          </a>
        </div>

        <!-- social media --->
        <div v-for="(socials, key) in sortedSociallinks" :key="'sl_' + key">
          <a v-if="socials.url" :href="socials.url" target="_blank" rel="noopener noreferer" :title="socials.name" class="flex items-center px-2 py-2 text-base font-medium text-gray-800 rounded-md hover:bg-gray-200 hover:text-gray-900 group">
            {{ socials.name }}
          </a>
        </div>

      </div>
    </nav>
  </div>
</template>

<script>
export default {
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
