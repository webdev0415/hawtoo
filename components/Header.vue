<template>
  <nav class="bg-white dark:bg-black border-b border-gray-200 dark:border-gray-700">
    <div class="container px-4 mx-auto sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-20">
        <div class="flex items-center">

          <div id="main-header-nav" class="flex-shrink-0">
            <NuxtLink to="/" class="flex items-center text-lg font-bold text-gray-600 flex-no-shrink">
              <Logo width="160px" />
              <span class="text-xl font-bold sr-only">HawToo</span>
            </NuxtLink>
          </div>

          <div class="hidden lg:block">
            <div class="flex items-baseline ml-10 space-x-4">
              <NuxtLink v-for="route in navigation" :key="route.path" :to="route.path" class="px-3 py-2 font-medium text-gray-600 dark:text-white rounded-md hover:bg-gray-200 hover:bg-opacity-75">
                {{ route.text }}
              </NuxtLink>
            </div>
          </div>
        </div>

        <div class="hidden lg:block">
          <div class="flex items-center ml-4 md:ml-6">
            <select v-model="$colorMode.preference" class="border w-24 h-10 dark:bg-gray-900 dark:text-white dark:border-gray-700">
              <option value="system">System</option>
              <option value="light">Light</option>
              <option value="dark">Dark</option>
            </select>

            <!-- buttons -->
            <div v-if="!user" class="flex items-center md:ml-12">
              <AppButton variant="secondary" variant-type="outline" size="small" class="desktop-primary-button ml-8" to="/login">Login</AppButton>
              <AppButton variant="primary" size="small" class="desktop-primary-button ml-4" to="/account/submit-project">Submit project</AppButton>
            </div>
            <!-- Profile dropdown -->
            <div class="relative ml-3">
              <div v-if="user">
                <button type="button" class="flex items-center max-w-xs bg-indigo-600 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-indigo-600 focus:ring-white" aria-expanded="false" aria-haspopup="true" @click="userMenuOpen = !userMenuOpen">
                  <span class="sr-only">Open user menu</span>
                  <Avatar v-if="user" :size="36" :fullname="user.displayName" :image="user.photoURL" />
                </button>
              </div>

              <transition enter-active-class="transition duration-100 ease-out" enter-from-class="transform scale-95 opacity-0" enter-to-class="transform scale-100 opacity-100" leave-active-class="transition duration-75 ease-in" leave-from-class="transform scale-100 opacity-100" leave-to-class="transform scale-95 opacity-0">
                >
                <div v-if="userMenuOpen" id="user-menu-nav" class="absolute right-0 z-50 w-48 py-1 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button" tabindex="-1">
                  <!-- Active: "bg-gray-100", Not Active: "" -->
                  <NuxtLink v-for="route in userNavigation" :key="route.path" :to="route.path" class="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                    {{ route.name }}
                  </NuxtLink>
                  <span class="block px-4 py-2 text-gray-700 cursor-pointer hover:bg-gray-100" @click="logout">
                    Logout
                  </span>
                </div>
              </transition>
            </div>
          </div>
        </div>
        <div class="flex -mr-2 lg:hidden">
          <!-- Mobile menu button -->
          <button type="button" class="inline-flex items-center justify-center p-2 text-gray-400 bg-white rounded-md hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white" aria-controls="mobile-menu" aria-expanded="false" @click="mobileMenuOpen = !mobileMenuOpen">
            <span class="sr-only">Open main menu</span>

            <!--
              Heroicon name: outline/menu

              Menu open: "hidden", Menu closed: "block"
            -->
            <span v-if="!mobileMenuOpen">
              <svg class="block w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </span>
            <span v-else>
              <svg class="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </span>
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile menu, show/hide based on menu state. -->
    <div id="mobile-menu" :class="{ 'hidden': !mobileMenuOpen }" class="absolute left-0 z-50 w-full h-full pt-2 pl-0 pr-3 bg-white lg:hidden top-18">
      <div id="main-mobile-nav" class="container px-2 pt-2 pb-3 mx-auto space-y-1 sm:px-3">
        <span class="block px-3 py-2 text-base font-bold text-gray-600 uppercase rounded-md ">Menu</span>
        <!-- Current: "bg-white text-gray-600", Default: "text-gray-600 hover:bg-gray-600 hover:bg-opacity-75" -->
        <NuxtLink v-for="route in mobileNavigation" :key="route.path" :to="route.path" class="block px-3 py-2 text-base font-medium text-gray-600 rounded-md hover:bg-gray-200 hover:bg-opacity-75">
          {{ route.text }}
        </NuxtLink>
      </div>
      <!--- Mobile Menu: User -->
      <div v-if="user" id="main-mobile-user-nav" class="container pt-4 pb-3 mx-auto border-t border-gray-700">
        <div class="flex items-center px-5">
          <div class="flex items-center">
            <NuxtLink to="/account">
              <Avatar :size="48" :fullname="user.displayName" :image="user.photoURL" />
            </NuxtLink>
          </div>
          <div class="ml-3">
            <div class="text-base font-medium text-gray-600">
              {{ user.displayName }}
            </div>

            <div class=" font-medium text-indigo-300">
              {{ user.email }}
            </div>
          </div>
        </div>
        <div id="main-mobile-user-nav" class="px-2 mt-3 space-y-1">
          <NuxtLink v-for="route in userNavigation" :key="route.path" :to="route.path" class="block px-3 py-2 text-base font-medium text-gray-600 rounded-md hover:bg-gray-200 hover:bg-opacity-75">
            {{ route.name }}
          </NuxtLink>
          <span class="block px-3 py-2 text-base font-medium text-gray-600 rounded-md cursor-pointer hover:bg-gray-200 hover:bg-opacity-75" @click="logout">
            Logout
          </span>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
const navigation = [
  {
    name: 'Home',
    text: 'Home',
    path: '/'
  },
  {
    name: 'Popular',
    text: 'Popular',
    path: '/popular'
  }
]

const mobileNavigation = [
  {
    name: 'Home',
    text: 'Home',
    path: '/'
  },
  {
    name: 'Popular',
    text: 'Popular',
    path: '/popular'
  },
  {
    name: 'SubmitProject',
    text: 'Submit a project',
    path: '/account/submit-project'
  },
  {
    name: 'Signup',
    text: 'Signup',
    path: '/signup'
  },
  {
    name: 'Login',
    text: 'Login',
    path: '/login'
  }
]

const userNavigation = [
  { name: 'Your Profile', path: '/account' },
  { name: 'Popular', path: '/popular' }
]

export default {
  name: 'Header',
  data() {
    return {
      mobileMenuOpen: false,
      userMenuOpen: false,
      navigation,
      mobileNavigation,
      userNavigation,
      user: false
    }
  },
  watch: {
    $route() {
      this.mobileMenuOpen = false
    }
  },
  methods: {
    logout() {
      this.$firebase.signOutAction().then(() => {
        this.$router.push({
          path: '/'
        })
      })
    }
  }
}
</script>

