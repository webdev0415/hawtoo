<template>
  <main class="flex flex-col flex-grow min-h-screen overflow-hidden">
    <section class="relative">
      <div class="max-w-6xl px-4 mx-auto sm:px-6">
        <div class="pt-16 md:pt-28">
          <div class="pb-12 text-center md:pb-16">
            <h1
              class="
                max-w-5xl
                mx-auto
                mb-6
                text-4xl
                font-extrabold
                tracking-tighter
                dark:text-white
                md:text-5xl
                lg:text-6xl
                leading-tighter
              "
            >
              Your <span class="text-yellow-400">FREE</span> personalized
              dashboard to quickly access all the projects you're
              <span class="line-through">aped</span> invested in.
            </h1>

            <div class="max-w-4xl mx-auto">
              <p
                class="
                  mb-8
                  text-2xl text-gray-600
                  dark:text-gray-100
                  md:text-2xl
                "
              >
                <span class="block"
                  >Aped 🦍 in on a lot of projects? Having trouble keeping
                  track? We gotchu.</span
                >
                <span class="block"
                  >Keep info about your investments in one single place. Best of
                  all? it's free</span
                >
              </p>
              <div
                class="max-w-xs mx-auto sm:max-w-none sm:flex sm:justify-center"
              >
                <AppButton
                  variant="primary"
                  class="w-full mb-2 sm:w-auto sm:mb-0"
                  to="/login"
                  >Create a free account</AppButton
                >
              </div>
            </div>
          </div>
        </div>

        <div
          v-if="notEmptyObject(popularProjects)"
          class="
            grid
            items-start
            max-w-sm
            gap-6
            mx-auto
            mb-20
            md:grid-cols-2
            lg:grid-cols-3
            md:max-w-2xl
            lg:max-w-none
          "
        >
          <div v-for="project in popularProjects" :key="project.id">
            <ProjectCard :data="project" :has-loaded="true" />
          </div>
        </div>
      </div>
    </section>

    <HomeTopProjects
      class="bg-gray-100 dark:bg-gray-900"
      :has-loaded="notEmptyObject(topProjects)"
      :projects="topProjects"
    />
  </main>
</template>

<script>
import global from '@/mixins/global'

export default {
  name: 'Home',
  mixins: [global],

  middleware({ redirect, $auth }) {
    // check if user is new
    if ($auth.user && !$auth.user.last_sign_in_at) {
      redirect('/onboarding')
    }
  },

  async asyncData({ $supabase, $config, error, $content }) {
    const popularResp = await $supabase
      .from('projects')
      .select('*')
      .eq('verified', true)
      .limit(3)

    const topProjectsResp = await $supabase
      .from('projects')
      .select(
        `id,
        name,
        slug,
        chain,
        type,
        avatar_name,
        verified,
        avatar_color,
        view_count,
        published_at`
      )
      .order('view_count', { ascending: false })
      .limit(12)

    return {
      popularProjects: popularResp.data,
      topProjects: topProjectsResp.data,
    }
  },

  data() {
    return {
      allProjects: [],
      hasLoaded: false,
    }
  },

  mounted() {
    // eslint-disable-next-line no-console
    console.log(this.$auth.user)
    console.log(`✨ Thanks for visiting ${process.env.TITLE}`)
  },
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
