<template>
  <Avatar :verified="verified" :size="size" :size-badge="sizeBadge" :fullname="name" :color="avatarColor" :image="avatarUrl" />
</template>

<script>
import Avatar from '@/components/Avatar'

export default {
  nmae: 'ProjectCardMini',
  components: {
    Avatar
  },
  props: {
    verified: { type: Boolean, default: false, required: true },
    size: { type: Number, default: 48 },
    sizeBadge: { type: Number, default: 24 },
    name: { type: String, default: null, required: true },
    avatarColor: { type: String, default: null, required: true },
    avatarName: { type: String, default: null, required: false },
    slug: { type: String, default: null, required: true }
  },

  data() {
    return {
      avatarUrl: ''
    }
  },
  created() {
    if (this.avatarName) {
      this.getAvatar(this.avatarName)
    }
  },
  methods: {
    async getAvatar(file) {
      const avatarUrlResp = await this.$supabase.storage
        .from('avatars')
        .getPublicUrl(file)

      this.avatarUrl = avatarUrlResp.data.publicURL
    }
  }
}
</script>