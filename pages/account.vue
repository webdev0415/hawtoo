<template>
  <main>
    <!-- This example requires Tailwind CSS v2.0+ -->
    <div class="container">
      <div class="py-4 overflow-hidden rounded-lg">
        <h2 class="sr-only">Profile Overview</h2>

        <div class="sm:flex sm:items-center sm:justify-between">
          <div class="sm:flex sm:space-x-5">
            <div class="flex-shrink-0 text-center md:text-left">
              <Avatar v-if="user" :size="80" :fullname="user.user_metadata.full_name" :image="user.user_metadata.avatar_url" />
            </div>
            <div class="mt-4 text-center sm:mt-0 sm:pt-1 sm:text-left">
              <p class="text-sm font-medium text-gray-600">Welcome back,</p>
              <p class="text-xl font-bold text-gray-900 sm:text-2xl">{{ user.user_metadata.full_name }}</p>
              <p class="text-sm font-medium text-gray-600">{{ user.email }}</p>
            </div>
          </div>
          <div class="flex justify-center mt-5 sm:mt-0">
            <NuxtLink to="/account/watchlist" class="flex items-center justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50">
              My Watchlist
            </NuxtLink>
            <NuxtLink to="/submit-project" class="flex items-center justify-center px-4 py-2 ml-4 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50">
              Submit project
            </NuxtLink>
            <NuxtLink to="/account/edit-profile" class="flex items-center justify-center px-4 py-2 ml-4 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50">
              Edit Profile
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
    <NuxtChild />
  </main>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  middleware: 'user-auth',
  head: {
    bodyAttrs: {
      class:
        'tracking-semitight min-w-xs min-h-screen antialiased bg-gray-100 dark:bg-black'
    }
  },
  computed: {
    ...mapGetters({
      isAuthenticated: 'auth/loggedIn',
      user: 'auth/user'
    })
  }
}
</script>