<template>
  <div class="flex flex-col pt-32 pb-32 bg-gray-100 dark:bg-gray-900">
    <main class="flex flex-col justify-center flex-grow w-full px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
      <div class="flex justify-center flex-shrink-0">
        <NuxtLink to="/">
          <Logo class="h-auto mx-auto" />
        </NuxtLink>
        {{ error }}
      </div>
      <div class="py-16">
        <div class="text-center">
          <div v-if="error.statusCode === 404">
            <p class="text-sm font-semibold tracking-wide uppercase dark:text-white">404 error</p>
            <h1 class="mt-2 text-4xl font-extrabold tracking-tight dark:text-white sm:text-5xl">Page not found 🤔</h1>
            <p class="mt-2 text-base dark:text-gray-200">Sorry, we couldn’t find the page you’re looking for.</p>
          </div>
          <div v-else>
            <p class="text-sm font-semibold tracking-wide uppercase dark:text-white">Whoops!</p>
            <h1 class="mt-2 text-4xl font-extrabold tracking-tight dark:text-white sm:text-5xl">Error 😭</h1>
            <p class="mt-2 text-base dark:text-gray-200">{{ message }}</p>
          </div>
          <div class="mt-6">
            <AppButton variant="primary" class="w-full mb-2 sm:w-auto sm:mb-0" to="/">Go back home <span aria-hidden="true"> &rarr;</span></AppButton>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>
<script>
export default {
  layout: 'error',
  props: {
    error: {
      type: Object,
      default: null
    }
  },
  head() {
    return {
      title: this.message
    }
  },
  computed: {
    message() {
      if (this.error.isMissingShow) {
        return 'Sorry to say - this tracklist is not available yet.'
      } else if (this.error.statusCode === 500) {
        return 'We’re sorry - something has gone wrong on our side.'
      } else if (this.error.statusCode === 404) {
        return 'Oops - this page doesn’t exist'
      } else if (this.error.statusCode === 403) {
        return "Errm - you're not authenticated to be here."
      } else {
        return this.error.message
      }
    }
  }
  //   beforeMount() {
  //     if (this.error.err) {
  //       this.$sentry.captureException(this.error.err)
  //     }
  //   }
}
</script>
