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
      await this.$auth
        .login({ email })
        .then(() => {
          this.$emit('submitted-email-form', true)
        })
        .catch((err) => {
          if (this.error.statusCode === 429) {
            this.error = 'You already requested a sign-in link'
          } else if (this.error.statusCode === 422) {
            this.error = 'This does not look like a valid emailaddress'
          } else {
            this.error = err.message
          }
        })
    }
  }
}
</script>