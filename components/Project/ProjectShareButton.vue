<template>
  <button v-tooltip="'Copy & Share URL'" v-clipboard="() => copyText" v-clipboard:success="clipboardSuccessHandler" v-clipboard:error="clipboardErrorHandler" class="flex items-center justify-center w-12 h-12 mx-1 my-auto text-black bg-gray-200 rounded-full">
    <img src="~/assets/images/icons/share.svg" height="24" width="24" class="block h-4 m-auto cursor-pointer" />
  </button>
</template>

<script>
export default {
  computed: {
    copyText() {
      return process.env.BASE_URL + this.$route.fullPath
    }
  },
  mounted() {},
  methods: {
    clipboardSuccessHandler() {
      this.$toast.open({
        message: `Copied URL to clipboard ✨`,
        type: 'success',
        position: 'top-right'
      })
    },

    clipboardErrorHandler() {
      this.$toast.open({
        message: 'Something went wrong trying to the contract 😮',
        type: 'error',
        position: 'top-right'
      })
    }
  }
}
</script>