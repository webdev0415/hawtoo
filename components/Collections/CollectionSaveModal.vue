<template>
  <Modal :showing="getCollectionModal.open" :allow-esc="false" :background-close="false" :css="{ 'modal': 'max-w-xl' }" @close="closeModal">
    <div>

      <h2 class="mb-3 text-2xl font-extrabold text-left ">
        {{ getCollectionModal.title }}
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
        <!--- Search through collections -->
        <li v-for="( collection, i ) in filteredCollections" :key="collection.id" :aria-selected="(selected === i).toString()" class="bg-white">
          <div class="flex justify-between p-4 cursor-pointer" :class="{ 'bg-gray-100': selected === i }" @mouseenter="selected = i" @mouseleave="selected = null" @click="handleCollectionClick(collection.id)">
            <span class="text-gray-900 whitespace-nowrap">{{ collection.collection_name }}</span>
            <span class="inline-flex px-2 ml-4 text-xs font-semibold leading-5 text-right text-green-800 uppercase bg-green-100 rounded-full">Add</span>
          </div>
        </li>
        <!-- No collection found after search -->
        <li v-if="noSearchResults" class="bg-white">
          <div class="flex justify-between p-4 cursor-pointer" :class="{ 'bg-gray-100': selected }" @mouseleave="selected = false" @mouseenter="selected = true" @click="handleNewCollection">
            <span class="text-gray-900 whitespace-nowrap">{{ newCollectionText }}</span>
            <span class="inline-flex px-2 ml-4 text-xs font-semibold leading-5 text-right text-green-800 uppercase bg-green-100 rounded-full">New</span>
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
  addProjectToCollection,
  createNewCollection
} from '@/api/lib/collections'
import global from '@/mixins/global'

export default {
  name: 'Loginmodal',
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
      getCollectionModal: 'general/collectionModal',
      getCollections: 'collections/collections'
    }),

    filteredCollections() {
      return this.getCollections.filter((collection) => {
        return collection.collection_name
          .toLowerCase()
          .includes(this.searchQuery.toLowerCase())
      })
    },

    newCollectionText() {
      if (this.getCollectionModal.saveMode) {
        return `Create new collection and add to "${this.searchQuery}"`
      }

      return `Create new collection "${this.searchQuery}"`
    }
  },
  watch: {
    filteredCollections: debounce(function (item) {
      if (item.length === 0) {
        this.noSearchResults = true
      } else {
        this.noSearchResults = false
      }
    }, 25)
  },
  created() {
    if (this.$auth.loggedIn) {
      this.fetchCollections(this.$auth.user.id)
    }
  },
  methods: {
    ...mapActions({
      fetchCollections: 'collections/fetchCollections'
    }),
    ...mapMutations({
      toggleCollectionModal: 'general/TOGGLE_COLLECTION_MODAL'
    }),

    handleCollectionClick(id) {
      const saveMode = this.getCollectionModal.saveMode
      if (saveMode) {
        this.addToCollection(id)
      } else {
        this.$router.push({ path: `/collections/${id}` })
      }
    },

    async addToCollection(collectionId) {
      const userId = this.$auth.user.id
      const projectId = this.getCollectionModal.projectId
      const collection = this.getCollections.find((item) => {
        return collectionId === item.id
      })

      if (!collection) {
        this.$toast.error('Something went wrong adding')
        return
      }

      const collectedArray = collection.collected_projects ?? []

      if (!collectedArray.includes(projectId)) {
        collectedArray.push(projectId)
      }

      const { error, data } = await addProjectToCollection(
        userId,
        collectionId,
        collectedArray
      )

      if (error) {
        this.$toast.error('Something went wrong. Try again later')
        return
      }

      if (data) {
        this.$toast.success(`Saved to "${data[0].collection_name}"`)
      }
    },
    async handleNewCollection() {
      const userId = this.$auth.user.id
      const saveMode = this.getCollectionModal.saveMode
      const newName = this.searchQuery
      let collectionId

      const { error, data } = await createNewCollection(userId, newName)

      if (error) {
        this.$toast.error('Something went wrong. Try again later')
        return
      }

      if (data) {
        collectionId = data[0].id
      }

      if (saveMode) {
        await this.addToCollection(collectionId)
      } else {
        this.$router.push({ path: `/collections/${collectionId}` })
      }

      this.searchQuery = ''
    },
    closeModal() {
      this.toggleCollectionModal({
        open: false
      })
    }
  }
}
</script>