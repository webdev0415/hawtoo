<template>
  <section>
    <div class="relative pt-16 overflow-hidden bg-white pb-60">
      <div class="container">
        <div class="max-w-5xl mx-auto text-center">
          <!-- heading -->
          <h2 class="mb-4 text-3xl md:text-4xl md:mb-8 text-gradient lg:text-6xl font-heading">
            <span class="block "><span class="">Discover & Bookmark </span>
              <span class="inline-block text-blue-500 md:hidden">NFT & Crypto</span>
              <typical class="hidden text-blue-500 md:inline-block typing" :steps="['NFT', 2000, 'Crypto', 4000]" :wrapper="'span'" :loop="Infinity"></typical>
            </span>
            <span class="block">projects all in one place.</span>
          </h2>
          <!-- subheading -->
          <div class="max-w-xl mx-auto">
            <p class="mb-6 text-lg lg:mb-10 md:text-2xl">
              Save hours of research. Collect projects and keep a close eye on your blue chips.
            </p>
            <AppButton variant="primary" size="large" to="/connect">Log in or sign up</AppButton>
          </div>
        </div>
      </div>
    </div>

    <div class="relative -mt-44">
      <div class="max-w-[400px] sm:max-w-full md:max-w-[1200px] mx-auto px-4 mb-20">
        <div class="flex flex-col items-center justify-between font-sans leading-5 text-gray-800 opacity-100 sm:flex-row">
          <div class="w-full text-center sm:mt-0">
            <div class="box-border mb-2 text-base font-semibold leading-4 tracking-wide">
              💥 Discover NFT and ICO gems
            </div>
            <img src="~/assets/images/home/discover-projects.svg" alt="" class="inline-block w-full align-middle" />
          </div>
          <img src="~/assets/images/arrow-drawn-right.svg" alt="" class="hidden w-16 h-16 max-w-full leading-5 align-middle border-0 sm:inline-block" />
          <div class="w-full mt-4 text-center sm:mt-0">
            <div class="box-border mb-2 text-base font-semibold leading-4 tracking-wide">
              🙌 Save them to your collection
            </div>
            <img src="~/assets/images/home/bookmark-projects.svg" alt="" class="inline-block w-full align-middle" />
          </div>
          <img src="~/assets/images/arrow-drawn-right.svg" alt="" class="hidden w-16 h-16 max-w-full leading-5 align-middle border-0 sm:inline-block" />
          <div class="w-full mt-4 text-center sm:mt-0">
            <div class="box-border mb-2 text-base font-semibold leading-4 tracking-wide">
              🔥 Stay up to date in one place
            </div>
            <img src="~/assets/images/home/my-watchlist.svg" alt="" class="inline-block w-full align-middle" />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import typical from 'vue-typical'

export default {
  components: {
    typical
  }
}
</script>

</script>

<style lang="scss">
.typing::after {
  content: '|';
  animation: blink 1s infinite step-start;
}

@keyframes blink {
  50% {
    opacity: 0;
  }
}
</style>
