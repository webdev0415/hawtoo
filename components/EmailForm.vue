<template>
  <FormulateForm v-slot="{ isLoading }" v-model="form" class="sm:flex" @submit="subscribe">
    <label for="email-address" class="sr-only">Email address</label>
    <FormulateInput type="email" :value="'bla' + Math.floor(Math.random() * 999) + '@33mail.com'" name="email" input-class="w-full px-5 py-3 text-base placeholder-gray-500 border-2 border-gray-300 rounded-md md:rounded-l-lg md:rounded-r-none focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs" placeholder="Sample email placeholder" validation="required|email" error-behavior="submit" />
    <FormulateInput type="submit" input-class="w-full px-5 py-3 mt-5 text-base text-white bg-black border-transparent rounded-md md:mt-0 md:w-auto md:rounded-l-none md:rounded-r-lg btn " :disabled="isLoading" :label="isLoading ? 'Loading...' : 'Subscribe now'" />
  </FormulateForm>
</template>

<script>
import axios from 'axios'
import confetti from 'canvas-confetti'

export default {
  data() {
    return {
      form: {
        email: ''
      },
      response: {
        status: null,
        message: ''
      }
    }
  },
  mounted() {},
  methods: {
    async subscribe(event) {
      const formData = { ...this.form }
      try {
        const { data, status } = await axios.post('/api/subscribe', formData)

        if (data.message.type === 'success') {
          this.showSuccessMessage(data.email)
        }

        if (data.message.type === 'error' || status === '500') {
          this.$toast.open({
            type: data.message.type,
            message: data.message.message,
            duration: 40000
          })
        }
      } catch (e) {
        console.log(e)
      }
    },
    showSuccessMessage(email) {
      this.$swal
        .fire({
          title: 'Done! Check your inbox 🔥',
          text: `Please confirm your subscription for ${email}`,
          imageUrl: require('~/assets/images/hawtoo-icon.svg'),
          imageWidth: 60,
          imageAlt: 'HawToon Icon',
          showCancelButton: false,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, I confirmed my email'
        })
        .then((result) => {
          if (result.isConfirmed) {
            confetti({
              zIndex: 99999999
            })
            this.$swal
              .fire({
                title: `Done`,
                text: `You're on the list. We'll be in touch`,
                icon: 'success',
                timer: 4000,
                timerProgressBar: true
              })
              .then((result) => {
                confetti.reset()
              })
          }
        })
    }
  }
}
</script>

<style scoped>
.form-control {
  margin-bottom: 0 !important;
}
</style>