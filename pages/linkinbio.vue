<template>
  <main class="relative flex flex-col justify-center">
    <SingleProjectWrapper :data="data" :has-loaded="hasLoaded" />
    <NuxtLink to="/projects" class="absolute flex items-center justify-center w-10 h-10 font-sans text-indigo-700 bg-gray-200 rounded-full cursor-pointer" style="top: 24px; left: 24px; border-radius: 20px;">
      <img src="~/assets/images/icons/back.svg" height="24" width="24" class="block h-4 m-auto" />
    </NuxtLink>
  </main>
</template>

<script>
import axios from 'axios'
import getMeta from '~/utils/get-meta'
import global from '@/mixins/global'
import SingleProjectWrapper from '~/components/SingleProjectWrapper.vue'

// import visitorService from '@/utils/visitorService'

export default {
  name: 'Project',
  components: {
    SingleProjectWrapper
  },
  mixins: [global],
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

    if (projectResp.data.avatar_name) {
      avatarResp = await $supabase.storage
        .from('avatars')
        .getPublicUrl(projectResp.data.avatar_name)
    }
    
    return {
      data: projectResp.data
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
    }
  },

  async mounted() {
    const slug = this.$route.params.id

    await axios.post('/api/increment_page_view', {
      slug
    })
  }
}
</script>

