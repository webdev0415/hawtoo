<template>
  <div>
    <div class="flex items-center justify-center w-12 h-12 mx-1 my-auto text-black bg-gray-200" style="border-radius: 24px;" @click="openModal">
      <img src="~/assets/images/icons/save.svg" height="24" width="24" class="block h-4 m-auto cursor-pointer" />
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import global from '@/mixins/global'

export default {
  mixins: [global],
  props: {
    data: {
      type: Object,
      required: true,
      default: () => {}
    }
  },

  // data() {
  //   return {
  //     allCollected: () => {}
  //   }
  // },

  // async fetch() {
  //   const { data, error } = await this.$supabase
  //     .from('collections')
  //     .select('*')
  //     .eq('author_id', this.userId)

  //   console.log(error)

  //   this.allCollected = data
  // },

  computed: {
    userId() {
      return this.$auth.user.id
    }
  },

  // mounted() {
  //   console.log(this.allCollected)
  // },

  methods: {
    ...mapActions({
      useModal: 'general/toggleCollectionModal'
    }),

    openModal() {
      if (this.userId) {
        this.useModal({
          open: true,
          saveMode: true,
          title: 'Save this project to a collection'
        })
      } else {
        this.promptLogin()
      }
    },

    promptLogin() {
      this.$store.dispatch('SET_LOGIN_MODAL', {
        open: true,
        title: 'Connect your account',
        description: 'In order to collect you need to connect your account'
      })
    }
  }
}
</script>
