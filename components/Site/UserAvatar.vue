<template>
  <Avatar :verified="verified" :size="size" :size-badge="sizeBadge" :fullname="displayName" :image="avatarUrl" />
</template>

<script>
import Avatar from '@/components/Avatar'
import { getAvatarInfo } from '@/utils/supabase/users'

export default {
  components: {
    Avatar
  },
  props: {
    userId: { type: String, default: null, required: false },
    verified: { type: Boolean, default: false, required: false },
    size: { type: Number, default: 48 },
    sizeBadge: { type: Number, default: 24 }
  },
  data: () => ({
    avatarUrl: '',
    displayName: 'Random ape'
  }),
  computed: {
    // displayName() {
    //   if (!this.$auth.user?.user_metadata.full_name) return ''
    //   return this.$auth.user.user_metadata.full_name
    // },
    // avatarUrl() {
    //   if (!this.$auth.user?.user_metadata.avatar_url) {
    //     return require('@/assets/images/default-avatar.png')
    //   }
    //   return this.$auth.user.user_metadata.avatar_url
    // }
  },
  created() {
    this.getAvatar()
  },
  methods: {
    async getAvatar() {
      try {
        const { data, error, status } = await getAvatarInfo(this.userId)
        if (error && status !== 406) throw error
        if (data) {
          this.avatarUrl = data.avatar_url
          this.displayName = data.display_name
        }
      } catch (error) {
        console.log(error.message)
      }
    }
  }
}
</script>