<template>
  <div id="app">
    <nuxt />
  </div>
</template>

<script>
export default {
  name: 'EmptyLayout',
  data: () => ({
    authListener: null
  }),
  head: {
    bodyAttrs: {
      class:
        'tracking-semitight min-w-xs min-h-screen antialiased bg-white dark:bg-black'
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
