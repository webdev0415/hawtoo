<template>
  <div id="app">
    <Header :header-data="$store.state.header" />
    <Nuxt />
    <LoginModal :modal-data="$store.state.loginModal" />
    <Footer />
  </div>
</template>

<script>
import Header from '~/components/Header'
import Footer from '~/components/Footer'
import LoginModal from '~/components/LoginModal'

export default {
  components: {
    Header,
    Footer,
    LoginModal
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
  async mounted() {
    /* When the app loads, check to see if the user is signed in */
    /* also create a listener for when someone signs in or out */

    const { data: authListener } = await this.$supabase.auth.onAuthStateChange(
      () => this.$auth.fetchUser()
    )
    this.authListener = authListener
  },
  beforeUnmount() {
    this.authListener?.unsubscribe()
  }
}
</script>
