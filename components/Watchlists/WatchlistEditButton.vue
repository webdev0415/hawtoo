<template>
  <div>
    <button class="flex items-center justify-center w-10 h-10 mx-1 my-auto text-black bg-gray-200 rounded-full" @click="openModal">
      <img src="~/assets/images/icons/edit.svg" height="24" width="24" class="block h-4 m-auto cursor-pointer">
    </button>

    <!-- Modal -->
    <Modal :showing="show" :css="{ 'modal': 'max-w-md' }" @close="closeModal">
      <h1 class="p-0 mx-0 mt-8 mb-0 font-sans text-2xl font-bold text-black">
        Edit Watchlist
      </h1>
      <h3 class="mx-0 mt-4 mb-2 font-sans text-sm font-medium leading-5 text-gray-600">
        Update watchlist details or delete the watchlist.
      </h3>

      <FormulateInput type="file" name="file" label="Select your documents to upload" help="Select one or more PDFs to upload" validation="mime:application/pdf" multiple />

      <FormulateForm v-slot="{ isLoading }" v-model="formValues" @submit="handleEditWatchlist">
        <FormulateInput type="text" name="name" label="Watchlist name" />
        <FormulateInput type="textarea" name="description" label="Watchlist description" error-behavior="submit" />
        <FormulateInput type="checkbox" name="public" label="Public watchlist" error-behavior="submit" />
        <FormulateInput :disabled="isLoading" type="submit" :label="isLoading ? 'Saving...' : 'Save changes'" class="text-right mt-7" />
      </FormulateForm>

      <div class="py-2 mt-8 border-t border-gray-200"></div>

      <div class="sm:flex sm:items-start">
        <div class="mt-3">
          <h3 class="text-lg font-medium leading-6 text-gray-900">
            Delete watchlist
          </h3>
          <div class="my-2">
            <p class="text-sm text-gray-500">
              Permanently delete this watchlist and all of its content
            </p>
          </div>
          <button type="button" class="inline-flex justify-center w-full px-4 py-2 text-base font-medium text-white bg-red-600 border border-transparent rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:w-auto sm:text-sm" @click="handleDelete">
            Delete
          </button>
        </div>
      </div>
    </Modal>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      required: true,
      default: () => {}
    }
  },

  data: () => ({
    show: false,
    formValues: {}
  }),
  mounted() {
    this.formValues = {
      name: this.data.name,
      description: this.data.description,
      public: this.data.public
    }
  },
  methods: {
    async handleEditWatchlist(data) {
      try {
        const watchlistId = this.data.id
        await this.$supabase
          .from('watchlists')
          .update({
            name: data.name,
            description: data.description,
            public: data.public
          })
          .match({ id: watchlistId })

        this.show = false

        this.$toast.success('Your changes were saved')
      } catch (e) {
        this.$toast.error('Unable to save watchlist')
      }
    },

    handleDelete() {
      this.$swal
        .fire({
          title: 'Are you sure?',
          text: "You won't be able to revert this!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, delete it!'
        })
        .then((result) => {
          if (result.isConfirmed) {
            this.deleteWatchlist()
          }
        })
    },

    async deleteWatchlist() {
      try {
        const watchlistId = this.data.id
        await this.$supabase
          .from('watchlists')
          .delete()
          .match({ id: watchlistId })

        this.show = false
        this.$toast.success('Your watchlist was deleted')
        this.$store.commit('watchlists/DELETE_SINGLE_WATCHLIST', watchlistId)
      } catch (e) {
        this.$toast.error('Unable to delete watchlist')
      }
    },

    openModal() {
      this.show = true
    },

    closeModal() {
      this.show = false
    }
  }
}
</script>