<template>
  <div>
    <button v-clipboard="`Save to watchlist`" class="flex items-center justify-center w-auto h-12 px-5 mx-1 my-auto text-white align-middle bg-blue-500 rounded-full hover:bg-blue-600" @click="openModal">
      <span> Save to watchlist</span>
    </button>
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
