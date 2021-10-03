<template>
  <footer class="transition duration-500 ease-in-out transform bg-white border text-blueGray-700 ">
    <div class="container">
      <div class="flex flex-col flex-wrap py-5 md:items-center md:flex-row">

        <NuxtLink to="/" class="flex items-center justify-center mb-3 text-lg font-bold text-gray-600 md:mb-0 flex-no-shrink">
          <Logo width="120px" />
          <span class="text-xl font-bold sr-only">HawToo</span>
        </NuxtLink>

        <nav class="flex flex-wrap items-center justify-center text-base lg:mr-auto lg:border-l lg:pl-8">
          <div v-for="route in footerNavigation" :key="route.path">
            <NuxtLink :to="route.path" class="px-4 py-1 mr-1 text-base transition duration-500 ease-in-out transform rounded-md text-blueGray-500 focus:shadow-outline focus:outline-none focus:ring-2 ring-offset-current ring-offset-2 hover:text-black hover:bg-blueGray-900">
              {{ route.name }}
            </NuxtLink>
          </div>
          <span class="px-4 py-1 mr-1 text-base transition duration-500 ease-in-out transform rounded-md text-blueGray-500 focus:shadow-outline focus:outline-none focus:ring-2 ring-offset-current ring-offset-2 hover:text-black hover:bg-blueGray-900" @click="login">
            Login
          </span>
        </nav>

        <span class="inline-flex justify-center mt-2 mr-2 sm:ml-auto sm:mt-0 sm:justify-start">
          <a class="text-blue-500 hover:text-black">
            <svg fill="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-5 h-5" viewBox="0 0 24 24">
              <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
            </svg>
          </a>
          <a class="ml-3 text-blue-500 hover:text-black">
            <svg fill="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-5 h-5" viewBox="0 0 24 24">
              <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z">
              </path>
            </svg>
          </a>
          <a class="ml-3 text-blue-500 hover:text-black">
            <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-5 h-5" viewBox="0 0 24 24">
              <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
              <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01"></path>
            </svg>
          </a>
          <a class="ml-3 text-blue-500 hover:text-black">
            <svg fill="currentColor" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="0" class="w-5 h-5" viewBox="0 0 24 24">
              <path stroke="none" d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z">
              </path>
              <circle cx="4" cy="4" r="2" stroke="none"></circle>
            </svg>
          </a>
        </span>
      </div>
    </div>
  </footer>
</template>

<script>
import { footerNavigation } from '@/utils/navigation'

export default {
  name: 'Footer',

  data() {
    return {
      footerNavigation
    }
  },
  computed: {
    currentYear() {
      return new Date().getFullYear()
    }
  },
  methods: {
    login() {
      this.$store.dispatch('SET_LOGIN_MODAL', {
        open: true,
        title: 'Log in or sign up',
        description: '',
        referrer: this.$route.path
      })
    }
  }
}
</script>
