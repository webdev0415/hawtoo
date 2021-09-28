<template>
  <button class="favorite-button btn" :class="[isOnWatchList ? 'added' : 'unadded']" @click="toggleWatchList">
    <FontAwesome class="mr-1" :icon="['fal', 'bullhorn']" />
    <span v-if="isOnWatchList">
      Remove from Watchlist
    </span>
    <span v-else>
      Add to Watchlist
    </span>
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
    id: {
      type: Number,
      required: true
    },
    userId: {
      type: String,
      default: null,
      required: false
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
    }
  },

  mounted() {
    this.getWatchlistForProject(this.userId, this.id)
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
        const projectId = this.id

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
      this.$router.push({
        path: '/login'
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