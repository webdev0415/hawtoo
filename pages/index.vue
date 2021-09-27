<template>
  <main class="flex flex-col flex-grow min-h-screen overflow-hidden">

    <section class="relative">
      <div class="absolute bottom-0 transform -translate-x-1/2 pointer-events-none left-1/2 dark:hidden" aria-hidden="true"><svg width="1360" height="578" viewBox="0 0 1360 578" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="illustration-01" x1="50%" y1="0%" x2="50%" y2="100%">
              <stop stop-color="#FFF" offset="0%"></stop>
              <stop stop-color="#EAEAEA" offset="77.402%"></stop>
              <stop stop-color="#DFDFDF" offset="100%"></stop>
            </linearGradient>
          </defs>
          <g fill="url(#illustration-01)" fill-rule="evenodd">
            <circle cx="1232" cy="128" r="128"></circle>
            <circle cx="155" cy="443" r="64"></circle>
          </g>
        </svg>
      </div>
      <div class="max-w-6xl px-4 mx-auto sm:px-6">
        <div class="pt-16 pb-12 md:pt-28 md:pb-20">
          <div class="pb-12 text-center md:pb-16">

            <h1 class="max-w-4xl mx-auto mb-6 text-4xl font-extrabold tracking-tighter dark:text-white md:text-5xl lg:text-6xl leading-tighter">
              Keep important links from crypto projects in one place
            </h1>

            <div class="max-w-4xl mx-auto">
              <p class="mb-8 text-2xl text-gray-600 dark:text-gray-100 md:text-2xl">
                <span class="block">Aped 🦍 in on a lot of projects? Having trouble keeping track? We gotchu.</span>
                <span class="block">Keep info about your investments in one single place. Best of all? it's free</span>
              </p>
              <div class="max-w-xs mx-auto sm:max-w-none sm:flex sm:justify-center">
                <AppButton variant="primary" class="w-full mb-2 sm:w-auto sm:mb-0" to="/login">Create a free account</AppButton>
              </div>
            </div>
          </div>
          <HomeTopProjects :has-loaded="notEmptyObject(topProjects)" :projects="topProjects" />

        </div>
      </div>
    </section>

    <section class="relative">
      <div class="absolute inset-0 mb-16 bg-gray-100 pointer-events-none dark:bg-gray-900" aria-hidden="true"></div>
      <div class="absolute left-0 right-0 w-px h-20 p-px m-auto transform -translate-y-1/2 bg-gray-200"></div>
      <div class="relative max-w-6xl px-4 mx-auto sm:px-6">
        <div class="pt-12 md:pt-20">
          <div class="max-w-3xl pb-12 mx-auto text-center md:pb-16">
            <h2 class="mb-4 dark:text-white">Here's how we can help you 👇</h2>
            <p class="mb-3 text-xl dark:text-gray-100">Every day you get a sh*t ton of questions in your community. From: “How do I buy?“, to “Where can I find XYZ”, all the way up to “What slippage or gas do I use?“.</p>
            <p class="text-xl dark:text-white">What if we told you there is a way to offload these common questions...</p>
          </div>
          <div class="md:grid md:grid-cols-12 md:gap-6">
            <div class="max-w-xl mx-auto md:max-w-none md:w-full md:col-span-7 lg:col-span-6 md:mt-6 ">
              <div class="mb-8 md:pr-4 lg:pr-12 xl:pr-16">
                <h3 class="mb-3 dark:text-white">Explore HawToo products</h3>
                <p class="text-xl dark:text-gray-100">Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa.</p>
              </div>
              <div class="mb-8 md:mb-0"><a class="flex items-center p-5 mb-3 text-lg transition duration-300 ease-in-out bg-gray-200 border border-transparent rounded" href="#0" style="outline: none;">
                  <div>
                    <div class="mb-1 font-bold leading-snug tracking-tight">Smart Link In Bio</div>
                    <div class="text-gray-600">Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros</div>
                  </div>
                  <div class="flex items-center justify-center flex-shrink-0 w-8 h-8 ml-3 bg-white rounded-full shadow"><svg class="w-3 h-3 fill-current" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                      <path d="M11.953 4.29a.5.5 0 00-.454-.292H6.14L6.984.62A.5.5 0 006.12.173l-6 7a.5.5 0 00.379.825h5.359l-.844 3.38a.5.5 0 00.864.445l6-7a.5.5 0 00.075-.534z"></path>
                    </svg></div>
                </a><a class="flex items-center p-5 mb-3 text-lg transition duration-300 ease-in-out bg-white border border-gray-200 rounded shadow-md hover:shadow-lg" href="#0" style="outline: none;">
                  <div>
                    <div class="mb-1 font-bold leading-snug tracking-tight">Smart How To Buy Guide</div>
                    <div class="text-gray-600">Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros</div>
                  </div>
                  <div class="flex items-center justify-center flex-shrink-0 w-8 h-8 ml-3 bg-white rounded-full shadow"><svg class="w-3 h-3 fill-current" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                      <path d="M11.854.146a.5.5 0 00-.525-.116l-11 4a.5.5 0 00-.015.934l4.8 1.921 1.921 4.8A.5.5 0 007.5 12h.008a.5.5 0 00.462-.329l4-11a.5.5 0 00-.116-.525z" fill-rule="nonzero"></path>
                    </svg></div>
                </a><a class="flex items-center p-5 mb-3 text-lg transition duration-300 ease-in-out bg-white border border-gray-200 rounded shadow-md hover:shadow-lg" href="#0" style="outline: none;">
                  <div>
                    <div class="mb-1 font-bold leading-snug tracking-tight">Coming soon</div>
                    <div class="text-gray-600">Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros</div>
                  </div>
                  <div class="flex items-center justify-center flex-shrink-0 w-8 h-8 ml-3 bg-white rounded-full shadow"><svg class="w-3 h-3 fill-current" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                      <path d="M11.334 8.06a.5.5 0 00-.421-.237 6.023 6.023 0 01-5.905-6c0-.41.042-.82.125-1.221a.5.5 0 00-.614-.586 6 6 0 106.832 8.529.5.5 0 00-.017-.485z" fill="#191919" fill-rule="nonzero"></path>
                    </svg></div>
                </a></div>
            </div>
            <div class="max-w-xl mx-auto mb-8 md:max-w-none md:w-full md:col-span-5 lg:col-span-6 md:mb-0 md:order-1 ">
              <div class="relative flex flex-col text-center lg:text-right">
                <div class="w-full" style="">
                  <div class="relative inline-flex flex-col"><img class="mx-auto rounded md:max-w-none" src="~assets/images/placeholder-hawtoo-product-image.png" width="500" height="462" alt="Features bg"></div>
                </div>
                <div class="w-full" style="display:none">
                  <div class="relative inline-flex flex-col"><img class="mx-auto rounded md:max-w-none" src="~assets/images/placeholder-hawtoo-product-image.png" width="500" height="462" alt="Features bg"></div>
                </div>
                <div class="w-full" style="display:none">
                  <div class="relative inline-flex flex-col"><img class="mx-auto rounded md:max-w-none" src="~assets/images/placeholder-hawtoo-product-image.png" width="500" height="462" alt="Features bg"></div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="relative">
      <div class="absolute bottom-0 -mb-32 transform -translate-x-1/2 pointer-events-none left-1/2 dark:hidden" aria-hidden="true"><svg width="1760" height="518" viewBox="0 0 1760 518" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="illustration-02" x1="50%" y1="0%" x2="50%" y2="100%">
              <stop stop-color="#FFF" offset="0%"></stop>
              <stop stop-color="#EAEAEA" offset="77.402%"></stop>
              <stop stop-color="#DFDFDF" offset="100%"></stop>
            </linearGradient>
          </defs>
          <g transform="translate(0 -3)" fill="url(#illustration-02)" fill-rule="evenodd">
            <circle cx="1630" cy="128" r="128"></circle>
            <circle cx="178" cy="481" r="40"></circle>
          </g>
        </svg></div>
      <div class="max-w-6xl px-4 mx-auto sm:px-6">
        <div class="py-12 md:py-20">
          <div class="max-w-3xl pb-12 mx-auto text-center md:pb-16">
            <div class="max-w-xs mx-auto mb-12 md:max-w-md">
              <img src="~assets/images/team_work.svg" class="w-full" />
            </div>
            <h2 class="mb-4 dark:text-white">Trusted by hundreds of blockchain endeavours all over the world 🌍</h2>
            <p class="text-xl dark:text-gray-100">Arcu cursus vitae congue mauris rhoncus viverra nibh cras pulvinar mattis blandit libero cursus mattis.</p>
          </div>

          <div class="grid max-w-sm grid-cols-4 gap-2 mx-auto md:max-w-4xl md:grid-cols-5">
            <div class="flex items-center justify-center col-span-2 py-2 md:col-auto">
              <img src="~assets/images/logo-cumrocket.svg" class="w-full" />
            </div>
            <div class="flex items-center justify-center col-span-2 py-2 md:col-auto">
              <img src="~assets/images/logo-cumrocket.svg" class="w-full" />
            </div>
            <div class="flex items-center justify-center col-span-2 py-2 md:col-auto">
              <img src="~assets/images/logo-cumrocket.svg" class="w-full" />
            </div>
            <div class="flex items-center justify-center col-span-2 py-2 md:col-auto">
              <img src="~assets/images/logo-cumrocket.svg" class="w-full" />
            </div>
            <div class="flex items-center justify-center col-span-2 col-start-2 col-end-4 py-2 md:col-auto">
              <img src="~assets/images/logo-cumrocket.svg" class="w-full" />
            </div>
          </div>

          <testimonial full-name="Lydia Lane" :avatar-url="require('~/assets/images/avatar-cumrocket-lydia.png')" name-title="CEO" company-name="CumRocket" company-url="/@cumrocket" :external-url="false" class="max-w-3xl mx-auto mt-20 ">
            " HawToo's link in bio and buying guide has helped us a great deal. Especially when you pair it up with a Discord or Telegram bot it can really help to onboard new investors. "
          </testimonial>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
import global from '@/mixins/global'

export default {
  name: 'Home',
  mixins: [global],
  async asyncData({ $supabase, $config, error, $content }) {
    const topProjectsResp = await $supabase
      .from('projects')
      .select(
        `id,
        name,
        slug,
        chain,
        type,
        verified,
        avatar_color,
        view_count,
        published_at`
      )
      .order('view_count', { ascending: false })
      .limit(12)

    return {
      topProjects: topProjectsResp.data
    }
  },

  data() {
    return {
      allProjects: [],
      hasLoaded: false
    }
  },

  mounted() {
    // eslint-disable-next-line no-console
    console.log(this.$auth.user)
    console.log(`✨ Thanks for visiting ${process.env.TITLE}`)
  }
}
</script>

<style lang="scss">
.emoji-ape {
  -webkit-animation: moversmall 1.25s infinite alternate !important;
  animation: moverSmall 1.25s infinite alternate !important;
}

@-webkit-keyframes moverSmall {
  0% {
    transform: translateY(0);
  }

  100% {
    transform: translateY(-6px);
  }
}

@keyframes moverSmall {
  0% {
    transform: translateY(0);
  }

  100% {
    transform: translateY(-6px);
  }
}
</style>
