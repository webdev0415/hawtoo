<template>
  <div class="p-2 bg-white rounded-lg">
    <FormulateForm v-slot="{ isLoading }" v-model="form" class="w-full min-w-full sm:flex subscribe-form" @submit="subscribe">
      <label for="email-address" class="sr-only">Email address</label>
      <FormulateInput type="email" name="email" outer-class="w-full" input-class="w-full px-5 py-3 placeholder-gray-500 border-2 border-transparent shadow-none" placeholder="Your email" validation="required|email" error-behavior="submit" />
      <div class="mt-3 rounded-md sm:mt-0 sm:flex-shrink-0">
        <FormulateInput type="submit" input-class="w-full px-5 py-3 text-base text-white border-transparent rounded-md btn" :class="[customCSS.btnBackground, customCSS.btnText]" :disabled="isLoading" :label="isLoading ? 'Loading...' : 'Subscribe now'" />
      </div>
    </FormulateForm>
  </div>
</template>

<script>
import axios from 'axios'
import confetti from 'canvas-confetti'

export default {
  props: {
    css: {
      type: Object,
      required: false,
      default: () => {}
    }
  },
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
  computed: {
    customCSS() {
      return {
        ...{
          btnBackground: 'bg-blue-400',
          btnText: 'text-white'
        },
        ...this.css
      }
    }
  },
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

<style>
.form-control {
  margin-bottom: 0 !important;
}

input {
  box-shadow: 0 !important;
}

.subscribe-form [type='email']:focus {
  box-shadow: none !important;
  border-color: transparent !important;
  outline: none !important;
}
</style>