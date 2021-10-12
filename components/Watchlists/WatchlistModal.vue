<template>
  <Modal :showing="getWatchlistModal.open" :css="{ 'modal': 'max-w-xl' }" @open="openModal" @close="closeModal">
    <div>

      <h2 class="mb-3 text-2xl font-extrabold text-left ">
        {{ getWatchlistModal.title }}
      </h2>

      <div class="bg-white">
        <div role="search" class="relative flex items-center pr-4">
          <input v-model="searchQuery" type="search" aria-autocomplete="list" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" style="caret-color: #6b7280" class="flex-auto py-3 pl-4 pr-12 text-base text-gray-600 placeholder-gray-500 bg-transparent rounded-lg appearance-none -mr-9 sm:text-sm focus:outline-none" placeholder="Find anything..." aria-label="Search components" aria-controls="search-results">
          <svg width="20" height="20" fill="none" class="flex-none text-gray-400 pointer-events-none">
            <circle cx="8.5" cy="8.5" r="5.75" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></circle>
            <path d="M17.25 17.25L13 13" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
          </svg>
        </div>
      </div>

      <ul rule="lixtbox" class="text-md font-medium overflow-y-auto border-t border-gray-200 divide-y divide-gray-200 rounded-b-lg max-h-[18.375rem]">
        <!--- Search through watchlists -->
        <li v-for="( watchlist, i ) in filteredWatchlists" :key="watchlist.id" :aria-selected="(selected === i).toString()" class="bg-white">
          <div class="flex justify-between p-4 cursor-pointer" :class="{ 'bg-gray-100': selected === i }" @mouseenter="selected = i" @mouseleave="selected = null" @click="handleWatchlistClick(watchlist.id)">
            <span class="text-gray-900 whitespace-nowrap">{{ watchlist.name }}</span>
            <span class="inline-flex items-center px-2 ml-4 text-xs font-semibold leading-5 text-white uppercase bg-gray-900 rounded-full items-centertext-right">{{ ctaBadge }}</span>
          </div>
        </li>
        <!-- No watchlist found after search -->
        <li v-if="noSearchResults" class="bg-white">
          <div class="flex justify-between p-4 cursor-pointer" :class="{ 'bg-gray-100': selected }" @mouseleave="selected = false" @mouseenter="selected = true" @click="handleNewWatchlist">
            <span class="text-gray-900 whitespace-nowrap">{{ newWatchlistText }}</span>
            <span class="inline-flex items-center px-2 ml-4 text-xs font-semibold leading-5 text-right text-green-800 uppercase bg-green-200 rounded-full">{{ ctaBadge }}</span>
          </div>
        </li>
      </ul>

    </div>
  </Modal>
</template>

<script>
import debounce from 'lodash.debounce'
import { mapActions, mapGetters, mapMutations } from 'vuex'
import {
  addProjectToWatchlist,
  createNewWatchlist
} from '@/utils/supabase/watchlists'
import global from '@/mixins/global'

export default {
  mixins: [global],
  data() {
    return {
      selected: null,
      hover: false,
      searchQuery: '',
      noSearchResults: false
    }
  },
  computed: {
    ...mapGetters({
      isAuthenticated: 'auth/loggedIn',
      user: 'auth/user',
      getWatchlistModal: 'general/watchlistModal',
      getWatchlists: 'watchlists/watchlists'
    }),

    filteredWatchlists() {
      return this.getWatchlists.filter((watchlist) => {
        return watchlist.name
          .toLowerCase()
          .includes(this.searchQuery.toLowerCase())
      })
    },

    ctaBadge() {
      if (this.getWatchlistModal.saveMode && !this.noSearchResults) {
        return `Add`
      }

      if (this.noSearchResults) {
        return 'New'
      }

      return `View`
    },

    newWatchlistText() {
      if (this.getWatchlistModal.saveMode) {
        return `Create new watchlist and add to "${this.searchQuery}"`
      }
      return `Create new watchlist "${this.searchQuery}"`
    }
  },
  watch: {
    filteredWatchlists: debounce(function (item) {
      if (item.length === 0) {
        this.noSearchResults = true
      } else {
        this.noSearchResults = false
      }
    }, 25)
  },
  methods: {
    ...mapActions({
      fetchUserWatchlists: 'watchlists/fetchUserWatchlists'
    }),
    ...mapMutations({
      toggleWatchlistModal: 'general/TOGGLE_WATCHLIST_MODAL'
    }),

    async openModal() {
      if (this.isAuthenticated) {
        await this.fetchUserWatchlists(this.user.id)
      }
    },

    handleWatchlistClick(id) {
      const saveMode = this.getWatchlistModal.saveMode
      if (saveMode) {
        this.addToWatchlist(id)
      } else {
        this.$router.push({ path: `/watchlists/${id}` })
      }
    },

    async addToWatchlist(watchlistId) {
      const userId = this.user.id
      const projectId = this.getWatchlistModal.projectId
      const watchlist = this.getWatchlists.find((item) => {
        return watchlistId === item.id
      })

      if (!watchlist) {
        this.$toast.error('Something went wrong adding')
        return
      }

      const collectedArray = watchlist.collected ?? []

      if (!collectedArray.includes(projectId)) {
        collectedArray.push(projectId)
      }

      const { error, data } = await addProjectToWatchlist(
        userId,
        watchlistId,
        collectedArray
      )

      if (error) {
        this.$toast.error('Something went wrong. Try again later')
        return
      }

      if (data) {
        this.$toast.open({
          message: `Saved to "${data[0].name}" <span class="ml-1 underline">View ></span>`,
          type: 'success',
          onClick: () => {
            this.$router.push({ path: `/watchlists/${watchlistId}` })
          }
          // all of other options may go here
        })
      }
    },
    async handleNewWatchlist() {
      const userId = this.user?.id
      const saveMode = this.getWatchlistModal.saveMode
      const newName = this.searchQuery
      let watchlistId

      const { error, data } = await createNewWatchlist(userId, newName)

      if (error) {
        this.$toast.error('Something went wrong. Try again later')
        return
      }

      if (data) {
        watchlistId = data[0].id
      }

      if (saveMode) {
        await this.addToWatchlist(watchlistId)
      } else {
        this.$router.push({ path: `/watchlists/${watchlistId}` })
      }

      this.searchQuery = ''
    },
    closeModal() {
      this.toggleWatchlistModal({
        open: false
      })
    }
  }
}
</script>