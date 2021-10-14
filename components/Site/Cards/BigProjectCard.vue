<template>
  <Loader v-if="loading" size="100%" animation="fade" :class="cardClass" />
  <NuxtLink v-else :to="`/@${data.slug}`">
    <div :class="cardClass">
      <span class="absolute top-0 left-0 w-full h-full mt-1 ml-1 bg-blue-500 rounded-lg" :style="{'background-color': data.avatar_color }"></span>
      <span class="absolute z-10 text-xs text-gray-300 top-3 right-4">✨ Sponsored</span>
      <img class="box-border absolute top-0 left-0 object-cover w-full h-full max-w-full max-h-full p-0 m-0 overflow-hidden text-black" :src="data.bannerURL">
      <!-- Avatar -->
      <div class="z-10 flex flex-col items-start md:items-center md:flex-row">
        <ProjectAvatar :verified="data.verified" verified-tooltip :name="data.name" :size="80" :size-badge="26" :avatar-color="data.avatar_color" :avatar-name="data.avatar_name" />
        <div class="flex flex-col items-start md:ml-4">
          <h2 class="box-border relative z-10 mb-2 text-3xl font-black text-white lg:text-4xl">
            {{ data.name }}
          </h2>

          <ProjectTotalCount :id="data.id" />

        </div>
      </div>
      <!-- button -->
      <div class="z-10 flex justify-between">
        <AppButton variant="primary" size="tiny" button>View details</AppButton>
        <span class="text-white">Stats</span>
      </div>
    </div>
  </NuxtLink>
</template>

<script>
import Loader from '@/components/Site/Loader/SkeletonLoader'
import ProjectAvatar from '@/components/ProjectAvatar'
import ProjectTotalCount from '@/components/Project/ProjectTotalCount'
import AppButton from '@/components/AppButton'

export default {
  components: {
    Loader,
    ProjectAvatar,
    ProjectTotalCount,
    AppButton
  },
  props: {
    loading: {
      type: Boolean,
      default: true,
      required: true
    },
    data: {
      type: Object,
      default: () => {},
      required: true
    },
    loaderSize: {
      type: Number,
      default: 300,
      required: false
    }
  },
  data() {
    return {
      cardClass:
        'box-border relative justify-between flex flex-col items-stretch self-stretch flex-auto flex-grow flex-shrink-0 max-w-full p-4 md:px-8 md:pt-8 md:pb-12 m-0 overflow-hidden leading-6 text-black bg-gray-300  border-black border-solid rounded-xl outline-none cursor-pointer project-image min-h-[280px] lg:min-h-[500px]'
    }
  }
}
</script>

<style lang="scss" scoped>
.project-image::before {
  content: '';
  position: absolute;
  inset: 0px;
  z-index: 1;
  transform: translate3d(0px, 0px, 0px);
  border-radius: 12px;
  background: linear-gradient(174deg, rgb(0 0 0 / 60%) 0%, rgb(0 0 0 / 0%) 50%);
}
</style>