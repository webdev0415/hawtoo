<template>
  <main class="flex flex-col flex-grow min-h-screen overflow-hidden">

    <ExploreFeatured v-if="featuredProjects" :has-loaded="notEmptyObject(featuredProjects)" :data="featuredProjects" :cols="2" />

    <section class="pt-6 pb-8">
      <div class="container">
        <div class="mb-4">
          <h2 class="mb-6">NFT's</h2>
        </div>
        <ProjectCardGrid title="Test" :has-loaded="notEmptyObject(gamingProjects)" :data="gamingProjects" />
      </div>
    </section>

    <ExploreEmailForm v-if="!$auth.loggedIn" :css="emailFormOptions" />

  </main>
</template>


<script>
// import axios from 'axios'
import global from '@/mixins/global'
import ExploreEmailForm from '@/components/Explore/ExploreEmailForm.vue'
import ProjectCardGrid from '~/components/ProjectCardGrid.vue'

export default {
  name: 'Home',
  components: {
    ExploreEmailForm,
    ProjectCardGrid
  },
  mixins: [global],
  middleware({ redirect, $auth, store }) {
    /**
     * Supabase redirects users to /explore after login.
     * This redirects all users who are new and need onboarding.
     */
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
      .limit(6)

    return {
      featuredProjects: featuredgProjectsResp.data,
      gamingProjects: nftGamingProjectsResp.data
    }
  },
  data() {
    return {
      allProjects: [],
      hasLoaded: false,
      emailFormOptions: {
        wrapper: 'bg-violet-50',
        heading: '',
        subheading: '',
        button: {
          btnBackground: 'bg-gray-700',
          btnText: 'text-white'
        }
      }
    }
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
