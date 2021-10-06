<template>
  <Modal :showing="getCollectionModal.open" :allow-esc="false" :background-close="false" :css="{ 'modal': 'max-w-xl' }" @close="closeModal">
    <div class="p-4">
      <h2 class="mb-1 text-xl font-extrabold text-left ">
        {{ getCollectionModal.title }}
      </h2>

      <input v-model="searchTerm" type="text">

      <div v-if="filteredBottles">
        <div v-for="collection in filteredBottles" :key="collection.id">
          <span @click="addToCollection(collection.id)">{{ collection.collection_name }}</span>
        </div>
      </div>
    </div>
  </Modal>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'
import { addProjectToCollection } from '@/api/lib/collections'
import global from '@/mixins/global'

export default {
  name: 'Loginmodal',
  mixins: [global],
  data() {
    return {
      selected: null,
      searchTerm: ''
    }
  },
  computed: {
    ...mapGetters({
      getCollectionModal: 'general/collectionModal',
      getCollections: 'collections/collections'
    }),

    filteredBottles(value) {
      return this.getCollections.filter((collection) => {
        return collection.collection_name
          .toLowerCase()
          .includes(this.searchTerm.toLowerCase())
      })
    }
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

    addToCollection(id) {
      if (this.getCollectionModal.saveMode) {
        console.log('Collection ID is: ' + id)
      }
    },

    async addToCollection2() {
      try {
        await addProjectToCollection(
          this.name,
          this.cellar,
          this.vintage,
          this.country,
          this.region,
          this.apellation,
          this.type,
          this.qty,
          this.date,
          true
        )
      } catch (e) {
        console.log(e)
      } finally {
        this.$emit('addedProjectToCollection')
      }
    },

    closeModal() {
      this.toggleCollectionModal({
        open: false
      })
    }
  }
}
</script>