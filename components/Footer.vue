<template>
  <footer class="bg-white border-t border-gray-200 dark:bg-black dark:border-gray-800">
    <div class="container px-4 py-12 mx-auto overflow-hidden sm:px-6 lg:px-8">
      <nav class="flex flex-wrap justify-center -mx-5 -my-2" aria-label="Footer">
        <div v-for="route in navigation" :key="route.path" class="px-5 py-2">
          <NuxtLink :to="route.path" class="text-base text-gray-500 hover:text-gray-90">
            {{ route.name }}
          </NuxtLink>
        </div>
      </nav>
      <p class="mt-8 text-base text-center text-gray-400">
        &copy; {{ currentYear }} HawToo, Inc. All rights reserved.
      </p>
    </div>
  </footer>
</template>

<script>
const navigation = [
  { name: 'Home', path: '/' },
  { name: 'Popular', path: '/popular' },
  { name: 'SubmitProject', path: '/submit' },
  { name: 'Signup', path: '/signup' },
  { name: 'Login', path: '/login' }
]

export default {
  name: 'Footer',

  data() {
    return {
      navigation
    }
  },
  computed: {
    currentYear() {
      return new Date().getFullYear()
    }
  }
}
</script>
