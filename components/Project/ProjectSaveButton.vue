<template>
  <button class="flex items-center justify-center w-12 h-12 mx-1 my-auto text-black bg-gray-200" style="border-radius: 24px;" :class="[isOnWatchList ? 'collection' : 'uncollected']" @click="toggleWatchList">
    <img src="~/assets/images/icons/save.svg" height="24" width="24" class="block h-4 m-auto cursor-pointer" />
  </button>
</template>

<script>
import global from '@/mixins/global'

export default {
  mixins: [global],
  props: {
    favorited: {
      type: Boolean,
      default: false
    },
    data: {
      type: Object,
      required: true,
      default: () => {}
    }
  },

  data() {
    return {
      isOnWatchList: '',
      watchListId: null
    }
  },

  computed: {
    isFavorite() {
      return this.favorited
    },
    userId() {
      return this.$auth.user.uid
    },
    projectId() {
      return this.data.id
    }
  },

  mounted() {
    this.getWatchlistForProject(this.userId, this.projectId)
    this.isOnWatchList = !!this.isFavorite
  },

  methods: {
    async getWatchlistForProject(userId, projectId) {
      const { data: favorite } = await this.$supabase
        .from('watch_list')
        .select('id, user_id, project_id')
        .eq('user_id', userId)
        .eq('project_id', projectId)
        .single()

      if (favorite && this.notEmptyObject(favorite)) {
        this.isOnWatchList = true
        this.watchListId = favorite.id
      } else {
        this.isOnWatchList = false
      }
    },

    toggleWatchList() {
      if (this.userId) {
        this.isOnWatchList = !this.isOnWatchList
        const userId = this.userId
        const projectId = this.projectId

        if (this.isOnWatchList) {
          this.addToWatchList(projectId, userId).then((res) => {
            if (res.error) {
              this.isOnWatchList = false
              this.$toast.open({
                message: `Something went wrong!`,
                type: 'error'
              })
            }
            if (res.data) {
              this.$toast.open({
                message: `Added to watchlist!`,
                type: 'success'
              })
            }
          })
        } else {
          this.removeFromWatchList(projectId, userId).then((res) => {
            if (res.error) {
              this.isOnWatchList = true
              this.$toast.open({
                message: `Something went wrong!`,
                type: 'error'
              })
            }
            if (res.data) {
              this.$toast.open({
                message: `Removed from watchlist!`,
                type: 'success'
              })
            }
          })
        }
      } else {
        this.promptLogin()
      }
    },

    async addToWatchList(id, userId) {
      return await this.$supabase
        .from('watch_list')
        .insert([{ project_id: id, user_id: userId }])
    },

    async removeFromWatchList() {
      return await this.$supabase
        .from('watch_list')
        .delete()
        .match({ id: this.watchListId })
    },

    promptLogin() {
      // TODO: Import global sign up component with Quasar. With a prop that can trigger.
      this.$store.dispatch('SET_LOGIN_MODAL', {
        open: true,
        title: 'Connect your account',
        description: 'In order to watchlist you need to connect your account'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.favorite-button {
  @apply px-2 py-1 text-xs;
}

.favorite-button.unadded {
  @apply border-blue-400  text-blue-600 hover:text-blue-500;
}

.favorite-button.added {
  @apply border-gray-300  text-gray-400 hover:border-blue-500 hover:text-blue-600;
}
</style>