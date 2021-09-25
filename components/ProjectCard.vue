<template>
  <article>
    <div class="relative h-full ml-0 transform hover:scale-105 hover:-rotate-1" @mouseover="showRobot = true" @mouseleave="showRobot = false">
      <span class="absolute top-0 left-0 w-full h-full mt-1 ml-1 bg-blue-500 rounded-lg" :style="{'background-color': data.avatar_color }"></span>

      <div class="relative h-full p-5 transform bg-white border-2 border-blue-500 rounded-lg dark:bg-gray-900" :style="{'border-color': data.avatar_color }">
        <img v-if="showRobot && hasLoaded" src="~/assets/images/hawtoo-icon.svg" class="robot" />
        <div class="flex items-center -mt-1">

          <!-- avatar -->
          <avatar v-if="hasLoaded" :size="48" :size-badge="20" :verified="data.verified" :fullname="data.name" :color="data.avatar_color" :image="avatarUrl" />
          <VueSkeletonLoader v-else type="circle" :width="48" :height="48" />
          <!-- title -->
          <a v-if="hasLoaded" class="ml-3 text-lg font-bold text-gray-800 dark:text-white">{{ data.name }}</a>
          <VueSkeletonLoader v-else class="ml-3" :width="150" :height="20" />

        </div>
        <!-- description title -->
        <p v-if="hasLoaded" class="mt-3 mb-3 text-xs font-bold text-blue-500 uppercase dark:text-gray-600">About {{ data.name }}</p>
        <VueSkeletonLoader v-else class="mt-3 mb-3" :width="130" :height="14" />

        <!-- description -->
        <p v-if="hasLoaded" class="mb-10 text-gray-600 break-all dark:text-gray-200 min-h-8 max-h-4"> {{ data.description | strLimit(70) }} </p>
        <div v-else class="mb-5">
          <VueSkeletonLoader class="mb-1" :width="230" :height="10" />
          <VueSkeletonLoader :width="180" :height="10" />
        </div>

        <!-- call to action -->
        <AppButton v-if="hasLoaded" variant="secondary" variant-type="outline" size="tiny" :to="'/@' + data.slug">Explore</AppButton>
        <VueSkeletonLoader v-else :width="120" :height="45" />
      </div>
    </div>
  </article>
</template>

<script>
export default {
  nmae: 'ProjectCard',
  props: {
    data: {
      type: Object,
      default: () => {},
      required: true
    },
    hasLoaded: {
      type: Boolean,
      default: false,
      required: false
    }
  },
  data() {
    return {
      showRobot: false,
      avatarUrl: ''
    }
  },
  created() {
    if ('avatar_name' in this.data && this.data.avatar_name) {
      this.getAvatar(this.data.avatar_name)
    }
  },
  methods: {
    async getAvatar() {
      const avatarUrlResp = await this.$supabase.storage
        .from('public')
        .getPublicUrl(this.data.avatar_name)

      this.avatarUrl = avatarUrlResp.data.publicURL
    }
  }
}
</script>

<style scoped>
.robot {
  position: absolute;
  top: -30px;
  left: -24px;
  z-index: -1;
  width: 50px;
  transform: rotate(-22deg);
}
</style>