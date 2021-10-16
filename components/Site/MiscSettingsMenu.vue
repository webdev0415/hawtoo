<template>
  <div>
    <button type="button" class="flex items-center max-w-xs rounded-full focus:outline-none" aria-haspopup="true" @click="userMenuOpen = !userMenuOpen">
      <span class="sr-only">Open user menu</span>
      <span class="flex p-3">
        <FontAwesome size="lg" class="text-gray-700 dark:text-white" :icon="['fal', 'cog']" />
      </span>
    </button>

    <transition enter-active-class="transition duration-100 ease-out" enter-from-class="transform scale-95 opacity-0" enter-to-class="transform scale-100 opacity-100" leave-active-class="transition duration-75 ease-in" leave-from-class="transform scale-100 opacity-100" leave-to-class="transform scale-95 opacity-0">
      <div v-if="userMenuOpen" class="absolute right-0 z-50 w-48 py-1 mt-2 text-gray-900 origin-top-right bg-white rounded-md shadow-lg dark:text-white dark:bg-gray-900 ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button" tabindex="-1">
        <div class="block px-4 py-2">
          <DarkModeToggle />
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userMenuOpen: false
    }
  }
}
</script>