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
              <h2 class="mt-10 text-6xl font-bold text-white mb-14 lg:text-7xl font-heading">Join the newsletter!</h2>
              <p class="max-w-xs text-gray-200">In general, dignissim accumsan, lacus vel dictum semper, ipsum justo fermentum ex, sagittis sollicitudin.</p>
            </div>
            <div class="w-full p-4 lg:w-1/2">
              <div class="relative px-6 pt-24 pb-20 bg-violet-400 lg:px-16 rounded-3xl">
                <img class="absolute top-0 right-0 mr-12 -mt-12" src="~/assets/images/zospace/stars.svg" alt="">
                <div>
                  <span class="text-base font-bold text-white lg:text-lg">Join now!</span>
                  <h3 class="mt-6 mb-12 text-5xl font-bold text-white lg:text-5xl font-heading">Subscribe now</h3>
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
  layout: 'empty'
}
</script>