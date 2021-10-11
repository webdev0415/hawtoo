<template>
  <div class="border-b border-gray-200">
    <div class="min-h-[120px] max-h-[120px] sm:min-h-[198px] sm:max-h-[198px] overflow-hidden relative flex bg-white">
      <div class="relative flex items-center justify-center w-full max-w-full max-h-full ">
        <Loader v-if="$fetchState.pending" size="100%" animation="fade" />
        <img v-else :src="image" class="object-cover w-full h-full">
        <div v-if="!$fetchState.pending" class="absolute top-0 bottom-0 left-0 right-0 w-full h-full opacity-10 bg-gradient-to-b from-transparent to-gray-900"></div>
      </div>
    </div>
  </div>
</template>

<script>
import Loader from '@/components/Site/Loader/SkeletonLoader'

export default {
  components: {
    Loader
  },
  props: {
    data: {
      type: Object,
      required: true,
      default: () => {}
    }
  },
  data() {
    return {
      image: ''
    }
  },
  async fetch() {
    const BUCKET = 'public'
    const bannerName = this.data.banner_name

    if (bannerName) {
      const { data } = await this.$supabase.storage
        .from(BUCKET)
        .getPublicUrl(bannerName)

      if (data) {
        this.image = data.publicURL
      }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>