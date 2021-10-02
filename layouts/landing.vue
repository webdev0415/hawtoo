<template>
  <div id="app">
    <HeaderMinimal :fixed="true" :hide-nav="true" />
    <nuxt />
    <LoginModal :modal-data="$store.state.loginModal" />
    <Footer />
  </div>
</template>

<script>
import HeaderMinimal from '~/components/HeaderMinimal.vue'
import Footer from '~/components/Footer.vue'

export default {
  components: {
    Footer,
    HeaderMinimal
  },
  data: () => ({
    authenticated: false,
    authListener: null
  }),
  head: {
    bodyAttrs: {
      class:
        'antialiased bg-body text-body font-body min-w-xs min-h-screen  bg-white dark:bg-gray-900'
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
