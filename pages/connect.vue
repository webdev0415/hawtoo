<template>
  <div class="flex flex-col justify-center min-h-screen p-8 bg-gray-50 dark:bg-gray-900 sm:px-6 lg:px-8">
    <NuxtLink to="/">
      <Logo class="h-auto mx-auto animation-mover" />
    </NuxtLink>

    <div v-if="!submittedEmailForm" class="sm:mx-auto sm:w-full sm:max-w-md">

      <h2 class="mt-6 text-3xl font-extrabold text-center dark:text-white">
        Sign in to your account
      </h2>
      <p class="mt-2 text-center dark:text-white text-md">
        <span> Sign in with your existing account, or enter your email to create a new account. </span>
      </p>

      <div class="px-4 py-8 mt-8 bg-white shadow sm:rounded-lg sm:px-10">

        <LoginProvidersButton />

        <div class="mt-6">
          <div class="relative">
            <div class="absolute inset-0 flex items-center">
              <div class="w-full border-t border-gray-200"></div>
            </div>
            <div class="relative flex justify-center text-sm">
              <span class="px-2 text-gray-200 bg-white">
                Or
              </span>
            </div>
          </div>
          <LoginEmailInput class="mt-4" @submitted-email-form="submittedEmailForm = true" />
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
        <p class="flex-auto max-w-lg ml-3 text-sm text-gray-500 dark:text-gray-400"><strong class="font-semibol">Don’t see it yet?</strong> It might be in your spam folder (ugh). Still nothing? <span class="font-medium underline cursor-pointer text-neutral" @click="reloadPage">Try to re-enter your address.</span>.</p>
      </footer>
    </div>
  </div>

</template>
<script>
export default {
  name: 'Login',
  layout: 'empty',
  data() {
    return {
      showModal: false,
      submittedEmailForm: false
    }
  },
  methods: {
    showMyModal() {
      this.showModal = true
    },
    reloadPage() {
      window.location.reload()
    }
  }
}
</script>
