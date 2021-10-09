<template>
  <section class="flex items-center min-h-screen py-20 overflow-hidden bg-gray-900 2xl:py-40">
    <div class="container relative px-4 mx-auto">
      <div class="flex flex-col items-center justify-center">
        <img class="absolute top-0 left-0 hidden -mt-12 lg:block -ml-80" src="~/assets/images/lines/circle.svg" alt="">
        <div class="relative max-w-5xl mx-auto">
          <div class="flex flex-wrap -m-4">
            <div class="w-full p-4 mb-12 lg:w-1/2 lg:mb-0">
              <a class="inline-block text-xl font-bold text-white" href="#">
                <Logo fill="white" />
              </a>
              <h2 class="mt-10 mb-6 text-4xl font-bold text-white lg:text-5xl font-heading">We're in closed beta!</h2>
              <p class="max-w-xs text-gray-200">Soon you will be able to discover and keep track of your NFT investments all in one place. </p>
              <form :action="redirectPath" method="GET" class="mt-6 sm:max-w-lg sm:w-full sm:flex">
                <div class="flex-1 min-w-0">
                  <label for="hero-email" class="sr-only">Password</label>
                  <input type="password" name="_pw" class="block w-full px-5 py-3 text-base text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500" placeholder="Access code">
                </div>
                <div class="mt-4 sm:mt-0 sm:ml-3">
                  <button type="submit" class="block w-full px-5 py-3 text-base font-medium text-white bg-gray-600 border border-transparent rounded-md shadow hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 sm:px-10">Login</button>
                </div>
              </form>
            </div>
            <div class="w-full p-4 lg:w-1/2">
              <div class="relative px-6 pt-24 pb-20 bg-violet-400 lg:px-16 rounded-3xl">
                <img class="absolute top-0 right-0 mr-12 -mt-12" src="~/assets/images/zospace/stars.svg" alt="">
                <div>
                  <span class="text-base font-bold text-white lg:text-lg">Join now!</span>
                  <h3 class="mt-6 mb-2 text-2xl font-bold text-white lg:text-3xl font-heading">Get notified when HawToo launches</h3>
                  <div class="mb-6"> <a href="https://twitter.com/HawTooApp" target="_blank" class="font-extrabold text-white underline ">Follow on Twitter</a></div>
                  <EmailForm />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  layout: 'empty',
  data() {
    return {
      methodLoginValue: '',
      isAuthorised: false
    }
  },
  computed: {
    redirectPath() {
      const path = this.$route.query.previousPath
      return path || this.localePath('/')
    }
  },
  mounted() {
    this.isAuthorised = this.$passwordProtect.isAuthorised()
  },
  methods: {
    loginUser() {
      this.$passwordProtect.authorise(this.methodLoginValue)
      this.isAuthorised = this.$passwordProtect.isAuthorised()
      this.$router.push(this.redirectPath)
    },
    removeAuthorisation() {
      this.$passwordProtect.removeAuthorisation()
      this.isAuthorised = this.$passwordProtect.isAuthorised()
    }
  }
}
</script>

