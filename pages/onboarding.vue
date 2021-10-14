<template>
  <main class="flex flex-col flex-grow min-h-screen overflow-hidden">
    <section class="max-w-6xl px-4 pt-8 mx-auto sm:px-6 sm:pt-14 ">
      <h1 class="mb-5 dark:text-white">Onboarding - You are new user.</h1>
      <p class="dark:text-white">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore tenetur
        odit repellendus repudiandae? Cum fuga, consequatur eius assumenda
        provident suscipit magnam facilis commodi, iure natus, ipsum
        exercitationem cupiditate quia laborum?
      </p>
      <AppButton variant="primary" size="large" class="w-full mt-2 sm:w-auto sm:mb-0" to="/">Redirect to main page.</AppButton>
    </section>
  </main>
</template>

<script>
import axios from 'axios'
import { mapGetters, mapMutations } from 'vuex'

export default {
  name: 'Onboarding',
  layout: 'empty',
  computed: {
    ...mapGetters({
      isNewUser: 'auth/newUser'
    })
  },
  async mounted() {
    const authState = this.$auth.$state
    if (
      authState.loggedIn &&
      authState.user !== null &&
      authState.user.last_sign_in_at.split('.')[0] ===
        authState.user.email_confirmed_at.split('.')[0] &&
      this.isNewUser === true
    ) {
      await axios.post('/api/subscribe', {
        email: authState.user.email
      })

      /**
       * Sparkloop tracking.
       * TODO: CHECK AGAINST PROVIDER IF ITS EMAIL IT WAS LIKELY AUTOTRACKED BY SPARKLOOP
       * @see https://support.sparkloop.app/product/features/manual-tracking-subscribers
       */
      if (window.SL) {
        window.SL.trackSubscriber(authState.user.email)
      }
      this.setNewUser(false)
    }
  },
  methods: [
    ...mapMutations({
      setNewUser: 'general/SET_NEW_USER'
    })
  ]
}
</script>
