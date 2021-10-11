<template>
  <div id="app">
    <Header />
    <Nuxt />
    <LoginModal />
    <WatchlistModal />
    <ModalSearch />
    <EditProfileModal v-if="isAuthenticated" />
    <Footer />
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import Header from '~/components/Header'
import Footer from '~/components/Footer'
import LoginModal from '~/components/LoginModal'
import ModalSearch from '~/components/ModalSearch'
import WatchlistModal from '~/components/Watchlists/WatchlistModal'
import EditProfileModal from '~/components/Account/EditProfileModal'

export default {
  components: {
    Header,
    Footer,
    LoginModal,
    ModalSearch,
    WatchlistModal,
    EditProfileModal
  },
  data: () => ({
    authenticated: false,
    authListener: null
  }),
  head: {
    bodyAttrs: {
      class: 'antialiased bg-body text-body font-body min-w-xs min-h-screen'
    }
  },
  computed: {
    ...mapGetters({
      isAuthenticated: 'auth/loggedIn'
    })
  },
  async mounted() {
    /* When the app loads, check to see if the user is signed in */
    /* also create a listener for when someone signs in or out */
    const { data: authListener } = await this.$supabase.auth.onAuthStateChange(
      (_, session) => {
        this.$store.dispatch('auth/fetchUser', session?.user)
      }
    )
    this.authListener = authListener
  },
  beforeUnmount() {
    this.authListener?.unsubscribe()
  }
}
</script>
