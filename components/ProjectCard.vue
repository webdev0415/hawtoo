<template>
  <article>
    <div class="relative h-full ml-0 transform hover:scale-105 hover:-rotate-1" @mouseover="showRobot = true" @mouseleave="showRobot = false">
      <span class="absolute top-0 left-0 w-full h-full mt-1 ml-1 bg-blue-500 rounded-lg" :style="{'background-color': data.avatar_color }"></span>

      <div class="relative h-full p-5 transform bg-white border-2 border-blue-500 rounded-lg dark:bg-gray-800" :style="{'border-color': data.avatar_color }">
        <img v-if="showRobot && hasLoaded" src="~/assets/images/hawtoo-icon.svg" class="robot" />
        <div class="flex items-center -mt-1">

          <!-- avatar -->
          <ProjectAvatar v-if="hasLoaded" :verified="data.verified" :size="48" :size-badge="20" :name="data.name" :avatar-color="data.avatar_color" :avatar-name="data.avatar_name" />
          <VueSkeletonLoader v-else class="skeleton-avatar" :width="48" :height="48" />
          <!-- title -->
          <a v-if="hasLoaded" class="ml-3 text-lg font-bold text-gray-800 dark:text-white">{{ data.name }}</a>
          <VueSkeletonLoader v-else class="ml-3" :width="150" :height="20" />

        </div>
        <!-- description title -->
        <div v-if="hasLoaded" class="box-border p-0 mt-2 mb-2 text-sm leading-5 text-gray-600 border-0" style="outline: none;">
          <div class="box-border inline-flex items-center justify-center h-4 px-1 text-xs leading-5 text-center uppercase transition duration-200 ease-in-out bg-blue-200 border border-transparent border-solid rounded-full dark:bg-gray-700 dark:text-white ">
            {{ chainAbbrevation }}
          </div>
          <div class="box-border inline-flex items-center justify-center h-4 px-1 text-xs leading-5 text-center uppercase transition duration-200 ease-in-out bg-blue-200 border border-transparent border-solid rounded-full dark:bg-gray-700 dark:text-white ">
            {{ data.type }}
          </div>
        </div>
        <VueSkeletonLoader v-else class="mt-4 mb-4" :width="130" :height="14" />

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
  computed: {
    chainAbbrevation() {
      if (!this.data.chain) return null
      const chainAbbr = this.createChainAbbrevation()
      return chainAbbr[this.data.chain]
    }
  },
  methods: {
    createChainAbbrevation() {
      return {
        binance: 'BSC',
        ethereum: 'ETH'
      }
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
.skeleton-avatar {
  border-radius: 300px !important;
}
</style>