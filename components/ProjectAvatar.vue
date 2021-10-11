<template>

  <div v-if="$fetchState.pending" class="flex bg-white rounded-full" :style="`z-index:5; height:${size}px; width: ${size}px`">
    <Loader type="circle" :size="size" animation="fade" />
  </div>
  <Avatar v-else :verified="verified" :show-verified-tooltip="verifiedTooltip" :size="size" :size-badge="sizeBadge" :fullname="name" :color="avatarColor" :image="avatarUrl" />
</template>

<script>
import Avatar from '@/components/Avatar'
import Loader from '@/components/Site/Loader/SkeletonLoader'

export default {
  nmae: 'ProjectCardMini',
  components: {
    Avatar,
    Loader
  },
  props: {
    verified: { type: Boolean, default: false, required: true },
    size: { type: Number, default: 48 },
    sizeBadge: { type: Number, default: 24 },
    name: { type: String, default: null, required: true },
    avatarColor: { type: String, default: null, required: true },
    avatarName: { type: String, default: null, required: false },
    verifiedTooltip: { type: Boolean, default: false }
  },

  data() {
    return {
      avatarUrl: ''
    }
  },
  async fetch() {
    const BUCKET = 'public'
    const avatarName = this.avatarName

    if (this.avatarName) {
      const avatarUrlResp = await this.$supabase.storage
        .from(BUCKET)
        .getPublicUrl(avatarName)

      this.avatarUrl = avatarUrlResp.data.publicURL
    }
  }
}
</script>