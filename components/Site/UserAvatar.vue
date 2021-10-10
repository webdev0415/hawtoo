<template>
  <Avatar :verified="verified" :size="size" :size-badge="sizeBadge" :fullname="displayName" :image="avatarUrl" />
</template>

<script>
import { mapGetters } from 'vuex'
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
    avatarUrl: require('@/assets/images/default-avatar-empty.png'),
    displayName: 'Random ape'
  }),
  computed: {
    ...mapGetters({
      isAuthenticated: 'auth/loggedIn',
      user: 'auth/user'
    })
  },
  created() {
    this.getAvatar()
  },
  methods: {
    async getAvatar() {
      if (!this.isAuthenticated) {
        try {
          const { data, error, status } = await getAvatarInfo(this.userId)
          if (error && status !== 406) throw error
          if (data) {
            if (data.avatar_url) {
              this.avatarUrl = data.avatar_url
            }
            this.displayName = data.display_name
          }
        } catch (error) {
          throw new Error(error.message)
        }
      } else {
        if (this.user.user_metadata?.avatar_url) {
          this.avatarUrl = this.user.user_metadata.avatar_url
        }
        if (this.user.publicProfile?.display_name) {
          this.displayName = this.user.publicProfile.display_name
        }
      }
    }
  }
}
</script>