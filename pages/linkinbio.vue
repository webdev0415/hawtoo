<template>
  <main class="relative flex flex-row justify-center">
    <div class="container">
      <ProjectLinkInBio :data="data" :has-loaded="hasLoaded" />
      <ProjectFooter />
      <ProjectReturnButton />
    </div>
  </main>
</template>

<script>
import axios from 'axios'
import getMeta from '~/utils/get-meta'
import global from '@/mixins/global'
// import visitorService from '@/utils/visitorService'

export default {
  name: 'Project',
  mixins: [global],
  colorMode: 'light',
  async asyncData({ $supabase, params, error }) {
    const pageSlug = params.id
    let avatarResp = ''

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

    if (projectResp.data.avatar_name) {
      avatarResp = await $supabase.storage
        .from('avatars')
        .getPublicUrl(projectResp.data.avatar_name)
    }

    return {
      data: projectResp.data,
      avatarUrl: avatarResp.data.publicURL
    }
  },

  head() {
    return {
      bodyAttrs: {
        class: 'antialiased bg-white text-body font-body min-w-xs min-h-screen'
      },
      title: `View ${this.data.name} Links, Stats And How To Buy`,
      description: this.data.description,
      meta: getMeta({
        slug: `@${this.data.slug}`,
        verified: this.data.verified,
        title: `View ${this.data.name} Links, Stats And How To Buy`,
        authorName: this.data.name,
        authorNameBadge: this.data.type.toUpperCase(),
        authorNameDesc: this.data.contractAddress,
        authorImage: this.avatarUrl
      })
    }
  },

  computed: {
    hasLoaded() {
      return this.notEmptyObject(this.data)
    },
    user() {
      if (!this.$auth.user) return false
      else return this.$auth.user
    }
  },

  async mounted() {
    const slug = this.$route.params.id
    const data = await axios.post('/api/increment_page_view', {
      slug
    })
    if (data.status === 200 && data.statusText === 'OK') {
      console.log('data', data)
    }
  }
}
</script>

