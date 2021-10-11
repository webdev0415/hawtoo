<template>
  <div>
    <div v-tooltip="'Save to watchlist'" class="flex items-center justify-center w-12 h-12 mx-1 my-auto text-black bg-gray-200" style="border-radius: 24px;" @click="openModal">
      <img src="~/assets/images/icons/save.svg" height="24" width="24" class="block h-4 m-auto cursor-pointer" />
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
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
  computed: {
    ...mapGetters({
      isAuthenticated: 'auth/loggedIn'
    })
  },
  methods: {
    ...mapMutations({
      toggleWatchlistModal: 'general/TOGGLE_WATCHLIST_MODAL',
      toggleLoginModal: 'general/TOGGLE_LOGIN_MODAL'
    }),
    openModal() {
      if (this.isAuthenticated) {
        this.toggleWatchlistModal({
          open: true,
          saveMode: true,
          projectId: this.data.id,
          title: 'Save this project to a watchlist'
        })
      } else {
        this.promptLogin()
      }
    },

    promptLogin() {
      this.toggleLoginModal({
        open: true,
        title: 'Log in or sign up',
        description: 'to save this project in your watchlist'
      })
    }
  }
}
</script>
