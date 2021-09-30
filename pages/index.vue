<template>
  <main class="flex flex-col flex-grow min-h-screen overflow-hidden">

    <section class="relative pt-32 overflow-hidden pb-36 bg-gray-50">
      <div class="container">
        <div class="max-w-5xl mx-auto text-center">
          <h2 class="my-10 text-4xl text-gradient lg:text-6xl font-heading">
            Save important information from projects you <span class="line-through">aped</span> invested in, in one simple dashboard.
          </h2>
          <div class="max-w-4xl mx-auto">
            <p class="mb-12 text-2xl text-gray-200">
              Aped 🦍 in on a lot of projects? Having trouble keeping track? We gotchu.
              Keep info about your investments in one single place. Best of all? it's free
            </p>
            <AppButton variant="primary" size="large" class="w-full mb-2 sm:w-auto sm:mb-0" to="/connect">Create account</AppButton>
            <AppButton variant="outline" size="large" class="w-full mb-2 sm:w-auto sm:mb-0" to="/connect">Explore projects</AppButton>
          </div>
        </div>
      </div>
    </section>

    <section class="relative -mt-24">
      <div class="container">
        <div v-if="notEmptyObject(popularProjects)" class="grid items-start max-w-sm gap-6 mx-auto md:grid-cols-2 lg:grid-cols-3 md:max-w-2xl lg:max-w-none">
          <div v-for="project in popularProjects" :key="project.id">
            <ProjectCard :data="project" :has-loaded="true" />
          </div>
        </div>
      </div>
    </section>

    <HomeTopProjects :has-loaded="notEmptyObject(topProjects)" :projects="topProjects" />
  </main>
</template>

<script>
import global from '@/mixins/global'

export default {
  name: 'Home',
  mixins: [global],
  layout: 'fixednavbar',
  middleware({ redirect, $auth, store }) {
    // check if user is new
    if (
      $auth.loggedIn &&
      $auth.user !== null &&
      $auth.user.last_sign_in_at.split('.')[0] ===
        $auth.user.email_confirmed_at.split('.')[0] &&
      store.state.isNewUser === true
    ) {
      redirect('/onboarding')
    }
  },

  async asyncData({ $supabase, $config, error, $content, $auth }) {
    await $auth.fetchUser()
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
      topProjects: topProjectsResp.data
    }
  },

  data() {
    return {
      allProjects: [],
      hasLoaded: false,
    }
  },

  mounted() {
    this.$store.dispatch('SET_FIXED_HEADER', true)
    // eslint-disable-next-line no-console
    console.log(`✨ Thanks for visiting ${process.env.TITLE}`)
  }
}
</script>

<style lang="scss">
// .text-gradient {
//   background: linear-gradient(
//     94.23deg,
//     #5374fa 12.41%,
//     #fd9179 52.55%,
//     #ff6969 89.95%
//   );
//   -webkit-background-clip: text;
//   -webkit-text-fill-color: transparent;
// }
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
