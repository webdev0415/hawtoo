<template>
  <nav :class="[navClass]" :style="fixed && !view.atTopOfPage ? 'background : white' : fixed ? 'background : transparent' : '' ">
    <div class="container ">
      <div class="flex items-center justify-between h-20">
        <div class="flex items-center">

          <div id="main-header-nav" class="flex-shrink-0">
            <NuxtLink to="/" class="flex items-center text-lg font-bold text-gray-600 flex-no-shrink">
              <Logo width="160px" />
              <span class="text-xl font-bold sr-only">HawToo</span>
            </NuxtLink>
          </div>

          <p v-if="sponsor" class="hidden pl-6 ml-6 text-sm border-l border-gray-200 lg:block">
            <a href="/#product-ecommerce" class="relative flex items-center hover:text-gray-900">
              <svg aria-hidden="true" width="19" height="16" fill="none" class="mr-2">
                <g opacity=".7" fill="#A5B4FC">
                  <path d="M2 4.5h10l1 8H1l1-8z"></path>
                  <path d="M2 4.5V4a.5.5 0 00-.496.438L2 4.5zm10 0l.496-.062A.5.5 0 0012 4v.5zm1 8v.5a.5.5 0 00.496-.562L13 12.5zm-12 0l-.496-.062A.5.5 0 001 13v-.5zm8.5-6a.5.5 0 001 0h-1zm-6 0a.5.5 0 001 0h-1zM2 5h10V4H2v1zm9.504-.438l1 8 .992-.124-1-8-.992.124zM13 12H1v1h12v-1zm-11.504.562l1-8-.992-.124-1 8 .992.124zM9.5 3.5v3h1v-3h-1zm-5 3v-3h-1v3h1zM7 1a2.5 2.5 0 012.5 2.5h1A3.5 3.5 0 007 0v1zm0-1a3.5 3.5 0 00-3.5 3.5h1A2.5 2.5 0 017 1V0z"></path>
                </g>
                <g style="mix-blend-mode:multiply" opacity=".7" fill="#38BDF8">
                  <path d="M7 7.5h10l1 8H6l1-8z"></path>
                  <path d="M7 7.5V7a.5.5 0 00-.496.438L7 7.5zm10 0l.496-.062A.5.5 0 0017 7v.5zm1 8v.5a.5.5 0 00.496-.562L18 15.5zm-12 0l-.496-.062A.5.5 0 006 16v-.5zm8.5-6a.5.5 0 001 0h-1zm-6 0a.5.5 0 001 0h-1zM7 8h10V7H7v1zm9.504-.438l1 8 .992-.124-1-8-.992.124zM18 15H6v1h12v-1zm-11.504.562l1-8-.992-.124-1 8 .992.124zM14.5 6.5v3h1v-3h-1zm-5 3v-3h-1v3h1zM12 4a2.5 2.5 0 012.5 2.5h1A3.5 3.5 0 0012 3v1zm0-1a3.5 3.5 0 00-3.5 3.5h1A2.5 2.5 0 0112 4V3z"></path>
                </g>
              </svg>
              Tailwind UI Ecommerce is available now
              <svg aria-hidden="true" width="11" height="11" fill="currentColor" class="ml-1.5">
                <path d="M5.593 10.139L10.232 5.5 5.593.862l-.895.89 3.107 3.102H0v1.292h7.805L4.698 9.254l.895.885z"></path>
              </svg>
            </a>
          </p>

          <div class="hidden lg:block">
            <div class="flex items-baseline ml-10 space-x-4">
              <div v-for="route in navigation" :key="route.path">
                <NuxtLink v-if="!route.auth" :to="route.path" class="px-3 py-2 font-medium text-gray-600 rounded-md dark:text-white hover:bg-gray-200 dark:hover:bg-gray-900 hover:bg-opacity-75">
                  {{ route.text }}
                </NuxtLink>
                <NuxtLink v-if="route.auth && user" :to="route.path" class="px-3 py-2 font-medium text-gray-600 rounded-md dark:text-white hover:bg-gray-200 dark:hover:bg-gray-900 hover:bg-opacity-75">
                  {{ route.text }}
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>

        <div class="hidden lg:block">
          <div class="flex items-center ml-4 md:ml-6">
            <!-- <div class="relative ml-3">
              <MiscSettingsMenu />
            </div> -->

            <!-- buttons -->
            <div v-if="!user" class="flex items-center">
              <NuxtLink class="font-bold border-b border-gray-200" to="/submit-project">Submit a project</NuxtLink>
              <AppButton variant="primary" size="small" class="ml-8 desktop-primary-button" to="/connect">Sign up free</AppButton>
            </div>

            <!-- Profile dropdown -->
            <div class="relative ml-3" v-click-outside="() => userMenuOpen = false">
              <div v-if="user">
                <button type="button" class="flex items-center max-w-xs bg-indigo-600 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-indigo-600 focus:ring-white" :aria-expanded="userMenuOpen" aria-haspopup="true" @click="userMenuOpen = !userMenuOpen" >
                  <span class="sr-only">Open user menu</span>
                  <Avatar :size="36" :fullname="displayName" :image="avatarUrl" />
                </button>
              </div>

              <!-- Profile menu -->
              <transition enter-active-class="transition duration-100 ease-out" enter-from-class="transform scale-95 opacity-0" enter-to-class="transform scale-100 opacity-100" leave-active-class="transition duration-75 ease-in" leave-from-class="transform scale-100 opacity-100" leave-to-class="transform scale-95 opacity-0">
                >
                <div v-if="userMenuOpen" id="user-menu-nav" class="absolute right-0 z-50 w-48 py-1 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button" tabindex="-1">
                  <!-- Active: "bg-gray-100", Not Active: "" -->
                  <NuxtLink v-for="route in userMenuNavigation" :key="route.path" :to="route.path" class="block px-4 py-2 text-gray-700 hover:bg-gray-100">
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
          <!-- Hamburger -->
          <button type="button" class="inline-flex items-center justify-center p-2 text-gray-400 bg-white rounded-md dark:bg-gray-800 dark:hover:text-white hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white" aria-controls="mobile-menu" aria-expanded="false" @click="mobileMenuOpen = !mobileMenuOpen">
            <span class="sr-only">Open main menu</span>
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
    <div id="mobile-menu" :class="{ 'hidden': !mobileMenuOpen }" class="absolute left-0 z-50 w-full h-full pt-2 pl-0 pr-3 text-gray-600 bg-white border-t border-gray-200 dark:border-gray-700 dark:text-white dark:bg-black lg:hidden top-18">
      <div id="main-mobile-nav" class="container px-2 pt-2 pb-3 mx-auto space-y-1 sm:px-3">
        <span class="block px-3 py-2 text-base font-bold uppercase rounded-md ">Menu</span>
        <!-- Current: "bg-white ", Default: " hover:bg-gray-600 hover:bg-opacity-75" -->
        <NuxtLink v-for="route in mobileNavigation" :key="route.path" :to="route.path" class="block px-3 py-2 text-base font-medium rounded-md hover:bg-gray-200 dark:hover:bg-gray-900 hover:bg-opacity-75">
          {{ route.text }}
        </NuxtLink>
      </div>

      <!--- Mobile Menu: User -->
      <div v-if="user" id="main-mobile-user-nav" class="container pt-4 pb-3 mx-auto border-t border-gray-200 dark:border-gray-700">
        <div class="flex items-center px-5">
          <div class="flex items-center">
            <NuxtLink to="/account">
              <Avatar :size="48" :fullname="displayName" :image="avatarUrl" />
            </NuxtLink>
          </div>
          <div class="ml-3">
            <div v-if="displayName" class="text-base font-medium ">
              {{ displayName }}
            </div>

            <div class="font-medium text-gray-400 dark:text-gray-600">
              {{ user.email }}
            </div>
          </div>
        </div>
        <div id="main-mobile-user-nav" class="px-2 mt-3 space-y-1">
          <NuxtLink v-for="route in userMenuNavigation" :key="route.path" :to="route.path" class="block px-3 py-2 text-base font-medium rounded-md hover:bg-gray-200 dark:hover:bg-gray-900 hover:bg-opacity-75">
            {{ route.name }}
          </NuxtLink>
          <span class="block px-3 py-2 text-base font-medium rounded-md cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-900 hover:bg-opacity-75" @click="logout">
            Logout
          </span>
        </div>
      </div>

      <!-- <div class="container pt-4 pb-3 mx-auto border-t border-gray-200 dark:border-gray-700">
        <DarkModeToggle class="px-5" />
      </div> -->
    </div>
  </nav>
</template>

<script>
import vClickOutside from 'v-click-outside'
import {
  navigation,
  mobileNavigation,
  userMenuNavigation
} from '@/utils/navigation'

export default {
  name: 'Header',
  props: {
    fixed: { type: Boolean, default: false }
  },
  directives: {
    clickOutside: vClickOutside.directive
  },
  data() {
    return {
      mobileMenuOpen: false,
      userMenuOpen: false,
      navigation,
      mobileNavigation,
      userMenuNavigation,
      sponsor: false,
      isOpen: false,
      view: {
        atTopOfPage: true
      }
    }
  },
  computed: {
    user() {
      if (!this.$auth.user) return false
      else return this.$auth.user
    },
    displayName() {
      if (!this.$auth.user.user_metadata.full_name) return ''

      return this.$auth.user.user_metadata.full_name
    },
    avatarUrl() {
      if (!this.$auth.user.user_metadata.avatar_url) return ''

      return this.$auth.user.user_metadata.avatar_url
    },
    navClass() {
      return {
        'bg-white': true,
        'fixed z-50 w-full': this.fixed === true
      }
    }
  },
  watch: {
    $route() {
      this.mobileMenuOpen = false
    }
  },
  beforeMount() {
    window.addEventListener('scroll', this.handleScroll)
  },
  mounted() {
    console.log('navbar is ' + this.fixed)
  },
  methods: {
    async logout() {
      this.$store.commit("setIsNewUser", true)
      await this.$auth.logout()
    },
    handleScroll() {
      // when the user scrolls, check the pageYOffset
      if (window.pageYOffset > 0) {
        // user is scrolled
        if (this.view.atTopOfPage) {
          this.view.atTopOfPage = false
        }
      } else {
        // user is at top of page
        // eslint-disable-next-line no-lonely-if
        if (!this.view.atTopOfPage) {
          this.view.atTopOfPage = true
        }
      }
      // console.log(this.view.atTopOfPage)
    }
  }
}
</script>

