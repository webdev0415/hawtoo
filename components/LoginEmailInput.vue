<template>
  <FormulateForm v-slot="{ isLoading }" class="submit-profile" @submit="handleEmailLogin">
    <FormulateInput v-model="email" type="text" label="Email" placeholder="Your email" errior-behavior="submit" />
    <FormulateInput type="submit" :input-class="(context, classes) => ['w-full'].concat(classes)" :disabled="isLoading" :label="isLoading ? 'Loading...' : 'Send me a magic link'" />
  </FormulateForm>
</template>

<script>
export default {
  name: 'LoginEmailInput',
  data() {
    return {
      email: '',
      error: ''
    }
  },
  watch: {
    error() {
      this.$toast.error(this.error)
    }
  },
  methods: {
    async handleEmailLogin() {
      const email = this.email
      const redirectSlug = this.$route.query.redirect || '/'
      let redirectURL = process.env.BASE_URL + redirectSlug

      if (process.env.VERCEL_ENV === 'preview') {
        redirectURL = ''
      }

      try {
        const { user, error } = await this.$supabase.auth.signIn(
          { email },
          { redirectTo: redirectURL }
        )
        if (user) {
          this.$emit('submitted-email-form', true)
        }
        if (error) throw error
      } catch (err) {
        if (err.status === 429) {
          this.error = 'You already requested a sign-in link.'
        } else if (err.status === 422) {
          this.error = 'This does not look like a valid emailaddress.'
        } else if (err.status === 403) {
          this.error = 'Signups via email are temporarily disabled.'
        } else {
          this.error = err.message
        }
      }
    }
  }
}
</script>