<template>
  <nav class="bg-white" :class="{ 'bg-black border-0 border-transparent': mobileMenuOpen }">
    <div class="w-full px-4">
      <div class="flex items-center justify-between h-[52px]">
        <!--- Desktop menu -->
        <div class="flex-row items-center justify-center hidden w-full lg:flex">
          <!-- Left -->
          <div class="flex items-center justify-start w-full h-full">
            <div class="items-center hidden lg:flex">

              <div class="flex-shrink-0 ">
                <NuxtLink to="/" class="flex items-center text-lg font-bold text-gray-600 flex-no-shrink">
                  <Logo width="120px" :fill="mobileMenuOpen ? 'white' : '#000000'" />
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

            </div>
          </div>
          <!-- Center -->
          <div class="flex items-center justify-center w-full h-full">
            <div class="hidden lg:flex">
              <div class="flex items-baseline">
                <NuxtLink to="/projects" class="px-3 py-2 mx-2 font-medium text-gray-600 rounded-md dark:text-white hover:bg-gray-200 dark:hover:bg-gray-900 hover:bg-opacity-75" @click="openWatchlistModal">
                  Browse
                </NuxtLink>
                <a href="javascript:void(0)" class="px-3 py-2 mx-2 font-medium text-gray-600 rounded-md dark:text-white hover:bg-gray-200 dark:hover:bg-gray-900 hover:bg-opacity-75" @click="openWatchlistModal">
                  My Watchlists
                </a>
                <NuxtLink to="/about" class="px-3 py-2 mx-2 font-medium text-gray-600 rounded-md dark:text-white hover:bg-gray-200 dark:hover:bg-gray-900 hover:bg-opacity-75" @click="openWatchlistModal">
                  About
                </NuxtLink>
              </div>
            </div>
          </div>
          <!-- Right -->
          <div class="flex items-center justify-end w-full h-full">
            <div class="">
              <div class="flex items-center ml-4 md:ml-6">
                <!-- <div class="relative ml-3">
              <MiscSettingsMenu />
            </div> -->

                <!-- buttons -->
                <div v-if="!user" class="flex items-center">
                  <span class="font-bold border-b border-gray-200" @click="login">Login</span>
                </div>

                <!-- Profile menu: Toggle -->
                <div v-if="user" class="relative ml-3">
                  <div>
                    <button type="button" class="flex items-center max-w-xs bg-indigo-600 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-indigo-600 focus:ring-white" :aria-expanded="userMenuOpen" aria-haspopup="true" @click="userMenuOpen = !userMenuOpen">
                      <span class="sr-only">Open user menu</span>
                      <UserAvatar :user-id="user.id" :size="36" />

                    </button>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>

        <!--- Mobile menu -->
        <div class="flex flex-row items-center justify-center w-full lg:hidden">
          <!-- Hamburger -->
          <div class="flex items-center justify-start w-full h-full">
            <button type="button" class="inline-flex items-center justify-center p-2 text-gray-400" :class="{ 'text-white': mobileMenuOpen }" aria-controls="mobile-menu" aria-expanded="false" @click="mobileMenuOpen = !mobileMenuOpen">
              <span class="sr-only">Open main menu</span>
              <span v-if="!mobileMenuOpen">
                <img src="~/assets/images/icons/menu.svg" alt="">
              </span>
              <span v-else>
                <img src="~/assets/images/icons/close_white.svg" alt="">
              </span>
            </button>
          </div>

          <div class="flex items-center justify-center w-full h-full">
            <NuxtLink to="/">
              <LogoIcon width="38px" :fill="mobileMenuOpen ? 'blue' : '#201F1F'" />
            </NuxtLink>
          </div>

          <div class="flex items-center justify-end w-full h-full">
            <span v-if="!user" class="text-sm font-bold" :class="mobileMenuOpen ? 'text-white' : 'border-gray-200 border-b'" @click="login">Login</span>
            <!-- Profile menu: Toggle -->
            <button v-if="user" type="button" class="flex items-center max-w-xs bg-indigo-600 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-indigo-600 focus:ring-white" :aria-expanded="userMenuOpen" aria-haspopup="true" @click="userMenuOpen = !userMenuOpen">
              <span class="sr-only">Open user menu</span>
              <UserAvatar :user-id="user.id" :size="36" />
            </button>
          </div>

        </div>
      </div>
    </div>

    <!-- Profile menu -->
    <transition enter-active-class="transition duration-100 ease-out" enter-from-class="transform scale-95 opacity-0" enter-to-class="transform scale-100 opacity-100" leave-active-class="transition duration-75 ease-in" leave-from-class="transform scale-100 opacity-100" leave-to-class="transform scale-95 opacity-0">
      <div v-if="userMenuOpen" v-click-outside="() => userMenuOpen = false" class="absolute top-[43px] right-[30px] z-50 w-48 py-1 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button" tabindex="-1">
        <span class="block px-4 py-2 text-gray-700 cursor-pointer hover:bg-gray-100" @click="showEditProfileModal">
          Account Settings
        </span>
        <span class="block px-4 py-2 text-gray-700 cursor-pointer hover:bg-gray-100" @click="logout">
          Logout
        </span>
      </div>
    </transition>

    <!-- Mobile menu, show/hide based on menu state. -->
    <div id="mobile-menu" :class="{ 'hidden': !mobileMenuOpen }" class="absolute left-0 z-50 w-full h-full pt-2  bg-black border-0 lg:hidden top-[52px]">
      <div id="main-mobile-nav" class="container pt-2 pb-3 space-y-1">
        <NuxtLink to="/projects" class="block py-4 text-4xl font-extrabold text-white rounded-md">
          Browse
        </NuxtLink>
        <a href="javascript:void(0)" class="block py-4 text-4xl font-extrabold text-white rounded-md" @click="openWatchlistModal">
          My Watchlists
        </a>
        <NuxtLink to="/about" class="block py-4 text-4xl font-extrabold text-white rounded-md">
          About
        </NuxtLink>
      </div>

      <!-- <div class="container pt-4 pb-3 mx-auto border-t border-gray-200 dark:border-gray-700">
        <DarkModeToggle class="px-5" />
      </div> -->
    </div>
  </nav>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import vClickOutside from 'v-click-outside'
import LogoIcon from '@/components/Site/Logo/LogoIcon'
import UserAvatar from '@/components/Site/UserAvatar'

import {
  navigation,
  mobileNavigation,
  userMenuNavigation
} from '@/utils/navigation'

export default {
  name: 'Header',
  components: {
    LogoIcon,
    UserAvatar
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
    ...mapGetters({
      isAuthenticated: 'auth/loggedIn',
      user: 'auth/user'
    })
  },
  watch: {
    $route() {
      this.mobileMenuOpen = false
    }
  },
  methods: {
    ...mapMutations({
      toggleLoginModal: 'general/TOGGLE_LOGIN_MODAL',
      toggleWatchlistModal: 'general/TOGGLE_WATCHLIST_MODAL',
      toggleEditProfileModal: 'general/TOGGLE_EDIT_PROFILE_MODAL'
    }),
    openWatchlistModal() {
      if (this.isAuthenticated) {
        this.mobileMenuOpen = false
        this.toggleWatchlistModal({
          open: true,
          saveMode: false,
          title: 'My Watchlists'
        })
      } else {
        this.promptLogin()
      }
    },

    promptLogin() {
      this.toggleLoginModal({
        open: true,
        title: 'Connect your account',
        description: 'In order to collect you need to connect your account'
      })
    },

    async logout() {
      const { error } = await this.$supabase.auth.signOut()
      if (error) {
        throw new Error(error.message)
      }

      this.$router.push('/login')
    },

    showEditProfileModal() {
      this.toggleEditProfileModal({
        open: true
      })
    },

    login() {
      this.toggleLoginModal({
        open: true,
        title: 'Log in or sign up',
        description: '',
        referrer: this.$route.path
      })
    }
  }
}
</script>

