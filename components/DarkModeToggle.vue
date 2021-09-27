<template>
  <div class="flex items-center">
    <button type="button" :class="{'bg-indigo-600': darkMode, 'bg-gray-200': !darkMode}" class="relative inline-flex flex-shrink-0 h-6 transition-colors duration-200 ease-in-out border-2 border-transparent rounded-full cursor-pointer w-11 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" role="switch" aria-checked="false" aria-labelledby="annual-billing-label" @click="darkMode = !darkMode">
      <!-- Enabled: "translate-x-5", Not Enabled: "translate-x-0" -->
      <span aria-hidden="true" :class="{'translate-x-5': darkMode, 'translate-x-0': !darkMode}" class="inline-block w-5 h-5 transition duration-200 ease-in-out transform bg-white rounded-full shadow pointer-events-none dark:bg-blue-400 ring-0"></span>
    </button>
    <span class="ml-3">
      <span class="text-sm font-medium dark:text-white">Dark mode {{ status }} </span>
    </span>
  </div>
</template>

<script>
export default {
  computed: {
    status() {
      if (this.$colorMode.preference === 'dark') {
        return 'on'
      }

      return 'off'
    },
    darkMode: {
      get() {
        if (this.$colorMode.preference === 'dark') return true
        else return false
      },
      set(on) {
        this.$toast.clear()
        if (on) this.activateDarkMode()
        else this.activateLightMode()
      }
    }
  },
  methods: {
    activateDarkMode() {
      this.$colorMode.preference = 'dark'
      // this.$toast.success('Dark mode is on 🌙')
    },
    activateLightMode() {
      this.$colorMode.preference = 'light'
      // this.$toast.success('Dark mode is off 🌞')
    }
  }
}
</script>