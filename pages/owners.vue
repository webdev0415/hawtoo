<template>
  <main class="flex flex-col flex-grow min-h-screen overflow-hidden">

    <section class="relative overflow-hidden pt-52 pb-52 bg-gray-50">
      <div class="absolute bottom-0 transform -translate-x-1/2 pointer-events-none left-1/2 dark:hidden" aria-hidden="true">
        <svg width="1360" height="578" viewBox="0 0 1360 578" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="illustration-01" x1="50%" y1="0%" x2="50%" y2="100%">
              <stop stop-color="#FFF" offset="0%"></stop>
              <stop stop-color="#EAEAEA" offset="77.402%"></stop>
              <stop stop-color="#DFDFDF" offset="100%"></stop>
            </linearGradient>
          </defs>
          <g fill="url(#illustration-01)" fill-rule="evenodd">
            <circle cx="1232" cy="200" r="60"></circle>
            <circle cx="155" cy="443" r="64"></circle>
          </g>
        </svg>
      </div>

      <div class="container">
        <div class="">

          <h1 class="max-w-4xl mx-auto mb-4 text-4xl font-extrabold tracking-tighter text-center md:text-5xl lg:text-6xl leading-tighter " @mouseover="hoveringOnTitle = true" @mouseleave="hoveringOnTitle = false">
            <span class>Get </span>
            <span class="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-violet-400">more investors</span>
            <span> to </span>
            <span v-tooltip="{ content: 'APE', show: hoveringOnTitle, placement: 'top' }"><span class="emoji-ape">🦍</span></span><span class="inline-block ml-2 md:hidden">ape </span>
            <span> in on your </span>
            <span class="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-pink-600">blockchain project</span>
          </h1>

          <div class="max-w-3xl mx-auto">
            <p class="mb-8 text-xl text-gray-600 dark:text-gray-100 md:text-2xl">
              Use our FREE forever tools and help your investors easily find important links, step-by-step buying instructions and more.
            </p>
            <div class="max-w-xs mx-auto sm:max-w-none sm:flex sm:justify-center">
              <AppButton variant="primary" size="large" class="w-full mb-2 sm:w-auto sm:mb-0" to="/submit-project">Submit your project</AppButton>
              <AppButton variant="primary" variant-type="outline" size="large" class="w-full mb-2 ml-0 md:ml-4 sm:w-auto sm:mb-0" href="#examples">See examples</AppButton>

            </div>
          </div>
        </div>
      </div>
    </section>

    <AdminHero class="md:-mt-40" :has-loaded="notEmptyObject(featuredProject)" :project="featuredProject" />
    <AdminPopular id="examples" :has-loaded="notEmptyObject(popularProjects)" :projects="popularProjects" />

  </main>
</template>

<script>
import global from '@/mixins/global'

export default {
  name: 'Admins',
  mixins: [global],
  layout: 'fixednavbar',
  async asyncData({ $supabase, $config, error, $content }) {
    const popularResp = await $supabase
      .from('projects')
      .select('*')
      .eq('verified', true)
      .limit(6)

    const featuredResp = await $supabase
      .from('projects')
      .select('*')
      .eq('verified', true)
      .limit(1)
      .single()

    return {
      popularProjects: popularResp.data,
      featuredProject: featuredResp.data
    }
  },

  data() {
    return {
      hoveringOnTitle: false,
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
