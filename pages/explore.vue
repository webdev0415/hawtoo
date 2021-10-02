<template>
  <main class="flex flex-col flex-grow min-h-screen overflow-hidden">
    Explore!
  </main>
</template>


<script>
// import axios from 'axios'
import global from '@/mixins/global'

export default {
  name: 'Home',
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
      hasLoaded: false
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
