<template>
  <main class="flex flex-col flex-grow min-h-screen overflow-hidden">
    <section class="max-w-6xl px-4 mx-auto sm:px-6 pt-8 sm:pt-14 ">
      <h1 class="dark:text-white mb-5">Onboarding - You are new user.</h1>
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
import axios from "axios"

export default {
  name: 'Onboarding',
  layout: 'empty',
  async mounted() {
    const authState = this.$auth.$state
    if (
      authState.loggedIn &&
      authState.user !== null &&
      authState.user.last_sign_in_at.split('.')[0] ===
        authState.user.email_confirmed_at.split('.')[0] &&
      this.$store.state.isNewUser === true
    ) {
      await axios.post('/api/subscribe', {
        email: authState.user.email
      })
      this.$store.commit("setIsNewUser", false)
    }
    
  }
}
</script>
