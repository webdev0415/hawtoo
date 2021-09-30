<template>
  <div>

    <main class="min-h-screen overflow-hidden bg-gray-100 profile-page">
      <section class="relative block -mb-64 h-80 md:h-96 bg-gray-50">

        <div v-if="data.avatar_color" class="absolute top-0 w-full h-full bg-center bg-cover" :style="{ backgroundColor: data.avatar_color }"></div>
        <div class="absolute bottom-0 transform -translate-x-1/2 pointer-events-none left-1/2" aria-hidden="true">
          <svg style="opacity:0.07" width="1360" height="578" viewBox="0 0 1360 578" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="illustration-01" x1="50%" y1="0%" x2="50%" y2="100%">
                <stop stop-color="#FFF" offset="0%"></stop>
                <stop stop-color="#EAEAEA" offset="77.402%"></stop>
                <stop stop-color="#DFDFDF" offset="100%"></stop>
              </linearGradient>
            </defs>
            <g fill="url(#illustration-01)" fill-rule="evenodd">
              <circle cx="832" cy="128" r="128"></circle>
              <circle cx="155" cy="443" r="64"></circle>
              <circle cx="1300" cy="543" r="88"></circle>
            </g>
          </svg>
        </div>
      </section>

      <div class="max-w-[700px] mx-auto">
        <ProjectLinkInBio :data="data" :has-loaded="hasLoaded" />
      </div>

      <ProjectFooter />
    </main>

    <ProjectReturnButton />
  </div>
</template>

<script>
// import axios from 'axios'
import getMeta from '~/utils/get-meta'
import global from '@/mixins/global'

// import visitorService from '@/utils/visitorService'

export default {
  name: 'Project',
  mixins: [global],
  layout: 'empty',
  colorMode: 'light',
  async asyncData({ $supabase, params, error }) {
    const pageSlug = params.id

    const projectResp = await $supabase
      .from('projects')
      .select('*')
      .eq('slug', pageSlug)
      .single()

    if (projectResp.error) {
      const projectError = projectResp.error
      if (projectError.details.startsWith('Results contain 0 rows')) {
        error({ statusCode: 404 })
      } else {
        error({ statusCode: 500, projectError })
      }
    }

    return {
      data: projectResp.data
    }
  },

  // fetchOnServer: false,
  // async fetch() {
  //   // if (!visitorService.hasVisited()) {
  //   //   visitorService.saveVisited()
  //   //   await this.$supabase.rpc('increment_page_view', {
  //   //     page_slug: this.$route.params.id
  //   //   })
  //   // }
  //   await axios.post('/api/increment_page_view', {
  //     slug: this.$route.params.id
  //   })
  // },

  head: {
    title: 'Test',
    meta: getMeta({
      slug: '@cyberkongz',
      verified: true,
      title: 'View CyberKongz Links, Stats And How To Buy',
      authorName: 'CyberKongz',
      authorNameBadge: 'NFT',
      authorNameDesc: 'Lives on OpenSea',
      authorImage:
        'https://lh3.googleusercontent.com/LIpf9z6Ux8uxn69auBME9FCTXpXqSYFo8ZLO1GaM8T7S3hiKScHaClXe0ZdhTv5br6FE2g5i-J5SobhKFsYfe6CIMCv-UfnrlYFWOM4=s130'
    })
  },

  computed: {
    hasLoaded() {
      return this.notEmptyObject(this.data)
    },
    user() {
      if (!this.$auth.user) return false
      else return this.$auth.user
    }
  }
}
</script>

