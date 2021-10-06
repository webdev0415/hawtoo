<template>
  <div>
    <div class="flex items-center justify-center w-12 h-12 mx-1 my-auto text-black bg-gray-200" style="border-radius: 24px;" @click="openModal">
      <img src="~/assets/images/icons/save.svg" height="24" width="24" class="block h-4 m-auto cursor-pointer" />
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
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
  methods: {
    ...mapMutations({
      toggleCollectionModal: 'general/TOGGLE_COLLECTION_MODAL',
      toggleLoginModal: 'general/TOGGLE_LOGIN_MODAL'
    }),
    openModal() {
      if (this.$auth.loggedIn) {
        this.toggleCollectionModal({
          open: true,
          saveMode: true,
          title: 'Save this project to a collection'
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
    }
  }
}
</script>
