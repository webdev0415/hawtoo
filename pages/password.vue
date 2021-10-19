<template>
  <div class="relative min-h-screen overflow-hidden bg-black">
    <section class="py-32">
      <div class="mx-auto max-w-[1400px]">
        <div class="lg:grid lg:grid-cols-12 lg:gap-8 ">
          <div class="px-4 sm:px-6 sm:text-center md:max-w-2xl md:mx-auto lg:col-span-5 lg:text-left lg:flex lg:items-center">
            <div>
              <Logo fill="white" class="mb-6" />
              <div class="inline-flex items-center p-1 pr-2 text-white bg-gray-900 rounded-full sm:text-base lg:text-sm xl:text-base hover:text-gray-200">
                <span class="px-3 py-0.5 text-white text-xs font-semibold leading-5 uppercase tracking-wide bg-blue-500 rounded-full">Coming soon</span>
                <span class="ml-4 text-sm">Follow us to get notified</span>
              </div>
              <h1 class="mt-4 text-3xl font-extrabold tracking-tight text-white sm:mt-5 sm:leading-none lg:mt-6 lg:text-4xl xl:text-5xl">
                Discover and keep track of your NFT’s— all in one place!
              </h1>
              <p class="mt-3 text-base text-gray-300 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
                Add projects to your personal watchlist(s) and have prices and other information at your fingertips. It's the perfect tool to keep a bird's eye view on all the projects you aped into 🐒
              </p>

              <div class="mt-10 sm:flex sm:justify-center lg:justify-start">
                <div class="rounded-md shadow">

                  <AppButton to="https://discord.gg/umreARYGDT" href variant="primary" target="_blank" class="w-full">
                    <FontAwesome :icon="discordIcon" class="mr-2" /> Join Discord
                  </AppButton>
                </div>
                <div class="mt-3 rounded-md shadow sm:mt-0 sm:ml-3">

                  <AppButton to="https://twitter.com/hawtooapp" href variant="outline" target="_blank" class="w-full">
                    <FontAwesome :icon="twitterIcon" class="mr-2" style="color:#1DA1F2" /> Follow on Twitter
                  </AppButton>
                </div>
              </div>

            </div>
          </div>
          <div class="flex items-center justify-center mt-16 sm:mt-24 lg:mt-0 lg:col-span-6">
            <img :src="require('@/assets/images/beta-macbook-mockup-1.png')" alt="">
          </div>
        </div>
      </div>
    </section>

    <!-- This example requires Tailwind CSS v2.0+ -->
    <section class="py-24 overflow-hidden bg-white lg:py-24">
      <div class="relative max-w-xl px-4 mx-auto sm:px-6 lg:px-8 lg:max-w-7xl">
        <svg class="absolute hidden transform -translate-x-1/2 lg:block left-full -translate-y-1/4" width="404" height="784" fill="none" viewBox="0 0 404 784" aria-hidden="true">
          <defs>
            <pattern id="b1e6e422-73f8-40a6-b5d9-c8586e37e0e7" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
              <rect x="0" y="0" width="4" height="4" class="text-gray-200" fill="currentColor" />
            </pattern>
          </defs>
          <rect width="404" height="784" fill="url(#b1e6e422-73f8-40a6-b5d9-c8586e37e0e7)" />
        </svg>

        <div class="relative lg:grid lg:grid-cols-2 lg:gap-8 lg:items-center">
          <div class="relative">
            <h3 class="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">
              Your own, personalized NFT watchlists 🤩
            </h3>

            <dl class="mt-10 space-y-10">
              <div class="relative">
                <dt>
                  <div class="absolute flex items-center justify-center w-12 h-12 text-white bg-blue-500 rounded-md">
                    <!-- Heroicon name: outline/globe-alt -->
                    <svg class="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                    </svg>
                  </div>
                  <p class="ml-16 text-lg font-medium leading-6 text-gray-900">Stay in the loop</p>
                </dt>
                <dd class="mt-2 ml-16 text-base text-gray-500">
                  Add NFT projects to your personal watchlist and keep a close eye on your blue chips.
                </dd>
              </div>

              <div class="relative">
                <dt>
                  <div class="absolute flex items-center justify-center w-12 h-12 text-white bg-blue-500 rounded-md">
                    <!-- Heroicon name: outline/scale -->
                    <svg class="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                    </svg>
                  </div>
                  <p class="ml-16 text-lg font-medium leading-6 text-gray-900">Everything you need in one place</p>
                </dt>
                <dd class="mt-2 ml-16 text-base text-gray-500">
                  Keep track of critical data, updates, and announcements from a single dashboard.
                </dd>
              </div>

              <div class="relative">
                <dt>
                  <div class="absolute flex items-center justify-center w-12 h-12 text-white bg-blue-500 rounded-md">
                    <!-- Heroicon name: outline/lightning-bolt -->
                    <svg class="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <p class="ml-16 text-lg font-medium leading-6 text-gray-900">
                    Discover and explore
                  </p>
                </dt>
                <dd class="mt-2 ml-16 text-base text-gray-500">
                  Discover new projects to 🦍 in before the hype cycle begins.
                </dd>
              </div>
            </dl>
          </div>

          <div class="relative mt-10 -mx-4 lg:mt-0" aria-hidden="true">
            <svg class="absolute transform -translate-x-1/2 translate-y-16 left-1/2 lg:hidden" width="784" height="404" fill="none" viewBox="0 0 784 404">
              <defs>
                <pattern id="ca9667ae-9f92-4be7-abcb-9e3d727f2941" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                  <rect x="0" y="0" width="4" height="4" class="text-gray-200" fill="currentColor" />
                </pattern>
              </defs>
              <rect width="784" height="404" fill="url(#ca9667ae-9f92-4be7-abcb-9e3d727f2941)" />
            </svg>
            <img class="relative px-4 mx-auto" width="490" :src="require('@/assets/images/beta-macbook-mockup-2.png')" alt="">
          </div>
        </div>

      </div>
    </section>

    <!-- This example requires Tailwind CSS v2.0+ -->
    <section class="bg-black">
      <div class="container py-16 bg-black border border-gray-700 rounded-b-lg lg:py-24">
        <div class="mb-6 ">
          <h2 class="text-3xl font-extrabold leading-8 tracking-tight text-center text-white sm:text-4xl">
            Get more investors to 🦍 in on your project
          </h2>
          <p class="max-w-3xl mx-auto mt-4 text-xl text-center text-white">
            Help investors easily discover your project and access important links, updates, announcements, and more.
          </p>
        </div>
        <div class="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8 lg:grid lg:grid-cols-3 lg:gap-x-8">

          <div class="flex items-center md:justify-right">
            <div class="mb-10 text-left md:text-right md:mb-0">
              <h2 class="text-base font-semibold tracking-wide text-gray-300 uppercase">Introducing</h2>
              <p class="mt-2 text-3xl font-extrabold text-white">The "LinkTree" for NFT Projects</p>
              <p class="mt-4 text-lg text-white">
                Give your investors a place where they can quickly access your important links, add your project to their NFT watchlist, and more.
              </p>
            </div>
          </div>
          <div class="">
            <img class="relative mx-auto" width="290" :src="require('@/assets/images/beta-phone-mockup1.png')" alt="">
          </div>
          <div class="flex items-center mt-12 lg:mt-0">
            <dl class="flex flex-col">
              <div class="relative">
                <dt>
                  <!-- Heroicon name: outline/check -->
                  <svg class="absolute w-6 h-6 text-green-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <p class="text-lg font-medium leading-6 text-white ml-9">Keep it simple</p>
                </dt>
                <dd class="mt-2 text-base text-gray-200 ml-9">
                  A single URL where investors can access all your important links
                </dd>
              </div>

              <div class="relative mt-5">
                <dt>
                  <!-- Heroicon name: outline/check -->
                  <svg class="absolute w-6 h-6 text-green-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <p class="text-lg font-medium leading-6 text-white ml-9">Sales at a glance</p>
                </dt>
                <dd class="mt-2 text-base text-gray-200 ml-9">
                  Show your collection stats: Holders, Floor Price, Volume, and more…
                </dd>
              </div>

              <div class="relative mt-5">
                <dt>
                  <!-- Heroicon name: outline/check -->
                  <svg class="absolute w-6 h-6 text-green-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <p class="text-lg font-medium leading-6 text-white ml-9">Get discovered on HawToo</p>
                </dt>
                <dd class="mt-2 text-base text-gray-200 ml-9">
                  Soon, thousands of (potential) investors will be able to find your project on HawToo.
                </dd>
              </div>

              <div class="relative mt-5">
                <dt>
                  <!-- Heroicon name: outline/check -->
                  <svg class="absolute w-6 h-6 text-green-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <p class="text-lg font-medium leading-6 text-white ml-9">
                    Wen mint? Wen reveal?
                  </p>
                </dt>
                <dd class="mt-2 text-base text-gray-200 ml-9">
                  Activate timers to countdown to your next event, milestone, reveal, or mint. (coming soon)
                </dd>
              </div>

            </dl>
          </div>
        </div>
      </div>
    </section>

    <section>
      <div class="container py-8">
        <div class="flex flex-col items-center justify-center md:flex-row">
          <h4 class="mb-5 text-white md:mr-4">Private Beta access</h4>
          <form :action="redirectPath" method="GET" class="sm:max-w-lg sm:w-full sm:flex">
            <div class="flex-1 min-w-0">
              <label for="hero-email" class="sr-only">Password</label>
              <input type="password" name="_pw" class="block w-full px-5 py-3 text-base text-white placeholder-gray-500 border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500" placeholder="Access code">
            </div>
            <div class="mt-4 sm:mt-0 sm:ml-3">
              <button type="submit" class="block w-full px-5 py-3 text-base font-medium text-white bg-blue-400 border border-transparent rounded-md shadow hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 sm:px-10">Login</button>
            </div>
          </form>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { faDiscord, faTwitter } from '@fortawesome/free-brands-svg-icons'

export default {
  layout: 'empty',
  data() {
    return {
      twitterIcon: faTwitter,
      discordIcon: faDiscord,
      methodLoginValue: '',
      isAuthorised: false
    }
  },
  computed: {
    redirectPath() {
      const path = this.$route.query.previousPath
      return path
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

