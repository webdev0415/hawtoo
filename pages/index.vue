<template>
  <main class="flex flex-col flex-grow min-h-screen overflow-hidden">

    <section class="relative pt-32 overflow-hidden lg:pt-36 pb-36 bg-gray-50">
      <div class="container">
        <div class="max-w-5xl mx-auto text-center">
          <!-- heading -->
          <h2 class="mb-4 text-3xl md:text-4xl md:mb-10 text-gradient lg:text-6xl font-heading">
            <span class="block text-violet-500"><span class="text-violet-500">Discover & Bookmark </span>
              <typical class="typing" :steps="['NFT', 2000, 'Crypto', 4000]" :wrapper="'span'" :loop="Infinity"></typical>
            </span>
            <span class="block">projects all in one place.</span>
          </h2>
          <!-- subheading -->
          <div class="mx-auto md:max-w-2xl lg:max-w-4xl">
            <p class="mb-6 text-lg lg:mb-12 md:text-xl lg:text-2xl">
              Aped 🦍 in on a lot of projects? Having trouble keeping track? We gotchu.
              Keep info about your investments in one single place. Best of all? it's free
            </p>
            <AppButton variant="primary" size="large" class="w-full mb-2 sm:w-auto sm:mb-0" to="/connect">Get started (free forever)</AppButton>
            <AppButton variant="outline" size="large" class="w-full mb-2 ml-0 md:ml-4 sm:w-auto sm:mb-0" to="/explore">Explore projects</AppButton>
            <NuxtLink class="block mt-4 mb-6 font-bold text-gray-300 underline border-0 outline-none lg:hidden" to="/connect">Already a member? Login here</NuxtLink>
          </div>
        </div>
      </div>
    </section>

    <section class="relative -mt-24">
      <div class="max-w-[400px] sm:max-w-full md:max-w-[1200px] mx-auto px-4 mb-40">
        <div class="flex flex-col items-center justify-between font-sans leading-5 text-gray-800 opacity-100 sm:flex-row">
          <div class="w-full text-center sm:mt-0">
            <div class="box-border mb-2 text-sm font-semibold leading-4 tracking-wide md:text-base">
              💥 Discover Crypto Projects
            </div>
            <img src="~/assets/images/home/discover-projects.svg" alt="" class="inline-block w-full align-middle" />
          </div>
          <img src="~/assets/images/arrow-drawn-right.svg" alt="" class="hidden w-16 h-16 max-w-full leading-5 align-middle border-0 sm:inline-block" />
          <div class="w-full mt-4 text-center sm:mt-0">
            <div class="box-border mb-2 text-sm font-semibold leading-4 tracking-wide md:text-base">
              👀 Bookmark your investments
            </div>
            <img src="~/assets/images/home/bookmark-projects.svg" alt="" class="inline-block w-full align-middle" />
          </div>
          <img src="~/assets/images/arrow-drawn-right.svg" alt="" class="hidden w-16 h-16 max-w-full leading-5 align-middle border-0 sm:inline-block" />
          <div class="w-full mt-4 text-center sm:mt-0">
            <div class="box-border mb-2 text-sm font-semibold leading-4 tracking-wide md:text-base">
              🎉 Your investments at your fingertips
            </div>
            <img src="~/assets/images/home/my-watchlist.svg" alt="" class="inline-block w-full align-middle" />
          </div>
        </div>

        <div class="mt-8 text-center sm:hidden">
          <p class="mb-3 text-xl font-bold">
            Ready to jump in?
          </p>
          <AppButton variant="primary" size="large" class="w-full mb-2 " to="/connect">Get started (free forever)</AppButton>
          <AppButton variant="outline" size="large" class="w-full mb-2 ml-0 md:ml-4 " to="/explore">Explore projects</AppButton>
        </div>

      </div>
    </section>
  </main>
</template>

<script>
import typical from 'vue-typical'

export default {
  name: 'Home',
  components: {
    typical
  },
  layout: 'landing',
  middleware({ redirect, $auth, store }) {
    /**
     * The index.vue (homepage) is a landing page for non-logged in users.
     * We can safely redirect them after login to the explore page.
     */
    if ($auth.loggedIn && $auth.user !== null) {
      redirect('/explore')
    }
  },
  mounted() {
    // eslint-disable-next-line no-console
    console.log(`✨ Thanks for visiting ${process.env.TITLE}`)
  }
}
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
