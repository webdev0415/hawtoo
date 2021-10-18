<template>
  <div>

    <button class="flex items-center justify-center w-12 h-12 mx-1 my-auto text-black bg-gray-200 rounded-full" @click="openModal">
      <img src="~/assets/images/icons/edit.svg" height="24" width="24" class="block h-4 m-auto cursor-pointer" />
    </button>

    <!-- Modal -->
    <Modal :showing="show" :css="{ 'modal': 'max-w-md' }" @close="closeModal">

      <h1 class="p-0 mx-0 mt-8 mb-0 font-sans text-2xl font-bold text-black">
        Edit Watchlist
      </h1>

      <h3 class="mx-0 mt-4 mb-2 font-sans text-sm font-medium leading-5 text-gray-600">
        Update watchlist details or delete the watchlist.
      </h3>

      <FormulateForm v-slot="{ isLoading }" v-model="formValues" name="watchlist_edit" @submit="handleEditWatchlist">
        <FormulateInput type="image" name="banner" :value="banner" label="Change banner" help="Select a png, jpg or gif to upload." :uploader="handleFileUpload" upload-behavior="delayed" />
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
          <button type="button" class="inline-flex justify-center w-full px-4 py-2 text-base font-medium text-white bg-red-600 border border-transparent rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:w-auto sm:text-sm" @click="handleConfirmDelete">
            Delete
          </button>
        </div>
      </div>
    </Modal>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { v4 as uuidv4 } from 'uuid'
import { deleteWatchlist } from '@/utils/supabase/watchlists'

export default {
  data: () => ({
    show: false,
    bannerURL: ''
  }),
  computed: {
    ...mapGetters({
      getWatchlist: 'watchlists/watchlist'
    }),
    formValues: {
      get() {
        return {
          name: this.getWatchlist.name,
          description: this.getWatchlist.description,
          public: this.getWatchlist.public
        }
      },
      set(obj) {}
    },
    banner() {
      if (this.getWatchlist.banner_url) {
        return [{ url: this.getWatchlist.banner_url }]
      } else {
        return null
      }
    }
  },
  methods: {
    async handleEditWatchlist(data) {
      try {
        const watchlistId = this.$route.params.watchlists
        await this.$supabase
          .from('watchlists')
          .update({
            name: data.name,
            description: data.description,
            public: data.public
          })
          .match({ id: watchlistId })

        const payload = {
          ...this.getWatchlist,
          name: data.name,
          description: data.description,
          public: data.public,
          banner_url: this.bannerURL
        }

        this.$store.commit('watchlists/SET_SINGLE_WATCHLIST', payload)
      } catch (e) {
        this.$toast.error('Unable to save watchlist')
      }
    },
    async handleFileUpload(file, progress, formError, option) {
      const watchlistId = this.$route.params.watchlists
      const bucketName = 'public'
      const fileName = `banners/watchlists/${uuidv4()}`

      const { data, error } = await this.$supabase.storage
        .from(bucketName)
        .upload(fileName, file, { cacheControl: '0', upsert: true })

      if (error) {
        this.$toast.error('Something went wrong with saving your profile')
      }

      if (data) {
        const { data: bannerData } = await this.$supabase.storage
          .from(bucketName)
          .getPublicUrl(fileName)

        if (bannerData) {
          this.bannerURL = bannerData.publicURL

          const { error: profileUpdateErr } = await this.$supabase
            .from('watchlists')
            .update({ banner_url: this.bannerURL }, { returning: 'minimal' })
            .match({ id: watchlistId })

          if (profileUpdateErr) {
            throw new Error(error.message)
          }

          return [{ url: this.bannerURL }]
        }
      }
      return [{}]
    },
    handleConfirmDelete() {
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
            this.handleDeleteWatchlist()
          }
        })
    },
    async handleDeleteWatchlist() {
      try {
        const watchlistId = this.$route.params.watchlists

        await deleteWatchlist(watchlistId)

        location.reload()
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

