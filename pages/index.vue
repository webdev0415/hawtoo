
<template>
  <main class="flex flex-col flex-grow min-h-screen overflow-hidden">
    <HomeHero v-if="!isAuthenticated" />
    <div class="container">

      <InputSearch />
    </div>
    <HomeFeatured v-if="featuredProjects" :has-loaded="true" :data="featuredProjects" :cols="2" />
    <HomeNewProjects />
    <section class="pt-6 pb-8">
      <div class="container">
        <div class="mb-4">
          <h2 class="mb-6">NFT's</h2>
        </div>
        <ProjectCardGrid title="Gaming" :has-loaded="true" :data="gamingProjects" />

      </div>
    </section>
    <HomeEmailForm :css="emailForm" />
  </main>
</template>

<script>
import { mapGetters } from 'vuex'
import global from '@/mixins/global'
import HomeFeatured from '@/components/Home/HomeFeatured.vue'
import HomeNewProjects from '@/components/Home/HomeNewProjects.vue'
import HomeEmailForm from '@/components/Home/HomeEmailForm.vue'
import ProjectCardGrid from '@/components/ProjectCardGrid.vue'

export default {
  components: {
    HomeEmailForm,
    HomeNewProjects,
    HomeFeatured,
    ProjectCardGrid
  },
  mixins: [global],
  // middleware({ redirect, $auth, store }) {
  //   if (
  //     $auth.loggedIn &&
  //     $auth.user !== null &&
  //     $auth.user.last_sign_in_at.split('.')[0] ===
  //       $auth.user.email_confirmed_at.split('.')[0] &&
  //     store.getters['auth/newUser'] === true
  //   ) {
  //     redirect('/onboarding')
  //   }
  // },
  async asyncData({ $supabase, $config, error, $content, $auth }) {
    const featuredgProjectsResp = await $supabase
      .from('projects')
      .select('*')
      .eq('verified', true)
      .eq('featured', true)
      .limit(2)

    const nftGamingProjectsResp = await $supabase
      .from('projects')
      .select('*')
      .eq('verified', true)
      .limit(4)

    return {
      featuredProjects: featuredgProjectsResp.data,
      gamingProjects: nftGamingProjectsResp.data
    }
  },
  data() {
    return {
      allProjects: [],
      hasLoaded: false,
      emailForm: {
        wrapper: 'bg-violet-50',
        heading: '',
        subheading: '',
        button: {
          btnBackground: 'bg-gray-700',
          btnText: 'text-white'
        }
      }
    }
  },
  computed: {
    ...mapGetters({
      isAuthenticated: 'auth/loggedIn',
      isNewUser: 'auth/newUser'
    })
  },
  mounted() {
    // eslint-disable-next-line no-console
    console.log(`✨ Thanks for visiting ${process.env.TITLE}`)
  }
}
</script>