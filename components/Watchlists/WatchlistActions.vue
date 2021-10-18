<template>
  <section class="flex flex-row items-center justify-center w-full mb-8 font-sans text-black cursor-pointer">
    <WatchlistEditButton v-if="isAuthenticated" class="ml-4" />
    <ProjectShareButton />
  </section>
</template>

<script>
import { mapGetters } from 'vuex'
import WatchlistEditButton from '@/components/Watchlists/WatchlistEditButton'
import ProjectShareButton from '@/components/Project/ProjectShareButton'

export default {
  components: {
    WatchlistEditButton,
    ProjectShareButton
  },
  props: {
    data: {
      type: Object,
      required: true,
      default: () => {}
    }
  },
  computed: {
    ...mapGetters({
      isAuthenticated: 'auth/loggedIn'
    })
  }
}
</script>