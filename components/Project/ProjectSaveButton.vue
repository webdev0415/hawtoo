<template>
  <div class="flex items-center justify-center w-12 h-12 mx-1 my-auto text-black bg-gray-200" style="border-radius: 24px;" :class="[isOnWatchList ? 'collection' : 'uncollected']" @click="toggleWatchList">
    <img v-if="!isOnWatchList" src="~/assets/images/icons/save.svg" height="24" width="24" class="block h-4 m-auto cursor-pointer" />
    <img v-else src="~/assets/images/icons/check.svg" height="24" width="24" class="block h-4 m-auto cursor-pointer" />
  </div>
</template>

<script>
import global from '@/mixins/global'

export default {
  mixins: [global],
  props: {
    data: {
      type: Object,
      required: true,
      default: () => {}
    }
  },

  data() {
    return {
      isOnWatchList: false,
      watchListId: null
    }
  },

  async fetch() {
    const { data: favorite } = await this.$supabase
      .from('watch_list')
      .select('id, user_id, project_id')
      .eq('user_id', this.userId)
      .eq('project_id', this.projectId)
      .single()

    if (favorite && this.notEmptyObject(favorite)) {
      this.isOnWatchList = true
      this.watchListId = favorite.id
    } else {
      this.isOnWatchList = false
    }
  },

  computed: {
    userId() {
      return this.$auth.user.id
    },
    projectId() {
      return this.data.id
    }
  },

  mounted() {
    console.log(this.isOnWatchList)
  },

  methods: {
    // async getWatchlistForProject(userId, projectId) {
    // const { data: favorite } = await this.$supabase
    //   .from('watch_list')
    //   .select('id, user_id, project_id')
    //   .eq('user_id', userId)
    //   .eq('project_id', projectId)
    //   .single()

    // console.log(`Is on watch list: ${favorite}`)
    // if (favorite && this.notEmptyObject(favorite)) {
    //   this.isOnWatchList = true
    //   this.watchListId = favorite.id
    // } else {
    //   this.isOnWatchList = false
    // }
    // },

    toggleWatchList() {
      if (this.userId) {
        this.isOnWatchList = !this.isOnWatchList

        if (this.isOnWatchList) {
          this.addToWatchList(this.projectId, this.userId).then((res) => {
            if (res.error) {
              this.$toast.open({
                message: `Something went wrong!`,
                type: 'error'
              })
            }
            if (res.data) {
              console.log(`Project id is ${res.data[0].id}`)
              this.watchListId = res.data[0].id
              this.isOnWatchList = true
              this.$toast.open({
                message: `${this.data.name} got added to your watchlist!`,
                type: 'success'
              })
            }
          })
        } else {
          this.removeFromWatchList(this.projectId, this.userId).then((res) => {
            if (res.error) {
              this.$toast.open({
                message: `Something went wrong!`,
                type: 'error'
              })
            }
            if (res.data) {
              this.isOnWatchList = false

              this.$toast.open({
                message: `${this.data.name} was removed from your watchlist!`,
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
      console.log(`Adding to watchlist with id ${id} from user ${userId}`)
      return await this.$supabase
        .from('watch_list')
        .upsert([{ project_id: id, user_id: userId }])
    },

    async removeFromWatchList() {
      console.log('Removing from watchlist')
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