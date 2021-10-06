<template>
  <Modal :showing="getLoginModal.open" :css="{ 'modal': 'max-w-md' }" @close="closeModal">
    <Logo width="140px" class="h-auto mx-auto mb-2" />

    <div v-if="!submittedEmailForm">
      <h2 class="mb-1 text-3xl font-extrabold text-center ">
        {{ getLoginModal.title }}
      </h2>
      <p class="mb-4 text-center text-md">
        {{ getLoginModal.description }}
      </p>
      <div class="max-w-xs mx-auto">
        <LoginProvidersButton />
        <div class="mt-6">
          <div class="relative">
            <div class="absolute inset-0 flex items-center">
              <div class="w-full border-t border-gray-100"></div>
            </div>
            <div class="relative flex justify-center text-sm">
              <span class="px-2 text-gray-100 bg-white">
                Or
              </span>
            </div>
          </div>
          <LoginEmailInput class="mt-2" @submitted-email-form="submittedEmailForm = true" />
        </div>
        <div class="p-4 mt-2 rounded-md bg-blue-50">
          <div class="flex">
            <div class="flex-shrink-0">
              <!-- Heroicon name: solid/information-circle -->
              <svg class="w-5 h-5 text-blue-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" />
              </svg>
            </div>
            <div class="flex-1 ml-3 md:flex md:justify-between">
              <p class="text-sm text-blue-700">
                Don't have an account yet? Just login with your Email, Discord or Twitter above and you'll be set!
              </p>

            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="submittedEmailForm" class="sm:mx-auto sm:w-full sm:max-w-md">
      <h2 class="mt-6 text-3xl font-extrabold text-center dark:text-white">
        Thank you! Now check your email... 🕵️‍♀️
      </h2>
      <p class="mt-2 text-center dark:text-white text-md">
        You should get a magic link soon, open it up and <strong class="hawt-font-semibold hawt-text-white">click the “Sign in to HawToo” link</strong>.
      </p>

      <footer class="relative z-10 flex items-start justify-center flex-none px-4 pb-6 mt-8 text-gray-400 sm:px-6 lg:px-8">
        <svg width="32" height="32" fill="none" class="flex-none">
          <path d="M8.75 3.5H22V2H8.75v1.5zM3.5 23.25V8.75H2v14.5h1.5zM23 28.5h-2V30h2v-1.5zm-12 0H8.75V30H11v-1.5zm10 0h-5V30h5v-1.5zm-5 0h-5V30h5v-1.5zM2 23.25A6.75 6.75 0 008.75 30v-1.5a5.25 5.25 0 01-5.25-5.25H2zM23 30a5 5 0 005-5h-1.5a3.5 3.5 0 01-3.5 3.5V30zM22 3.5A4.5 4.5 0 0126.5 8H28a6 6 0 00-6-6v1.5zM8.75 2A6.75 6.75 0 002 8.75h1.5c0-2.9 2.35-5.25 5.25-5.25V2z" fill="#4B5563"></path>
          <path d="M14.75 12.75a2 2 0 012-2h10.5a2 2 0 012 2v7.5a2 2 0 01-2 2h-10.5a2 2 0 01-2-2v-7.5z" stroke="#9CA3AF" stroke-width="1.5"></path>
          <path d="M15.5 11.5l4.512 3.992a3 3 0 003.976 0L28.5 11.5" stroke="#9CA3AF" stroke-width="1.5"></path>
          <path d="M9 11v4M9 19v.01" stroke="#9CA3AF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
        </svg>
        <p class="flex-auto max-w-lg ml-3 text-sm text-gray-500 dark:text-gray-400"><strong class="font-semibol">Don’t see it yet?</strong> It might be in your spam folder (ugh). Still nothing? <span class="font-medium underline text-neutral" @click="reEnterEmail">Try to re-enter your address.</span>.</p>
      </footer>
    </div>
  </Modal>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
  name: 'Loginmodal',
  data() {
    return {
      loading: false,
      disableButton: this.disabled,
      submittedEmailForm: false
    }
  },
  computed: {
    ...mapGetters({
      getLoginModal: 'general/loginModal'
    })
  },
  methods: {
    ...mapMutations({
      toggleLoginModal: 'general/TOGGLE_LOGIN_MODAL'
    }),
    closeModal() {
      this.toggleLoginModal({
        open: false,
        title: '',
        description: ''
      })
    },
    reEnterEmail() {
      this.submittedEmailForm = false
    }
  }
}
</script>