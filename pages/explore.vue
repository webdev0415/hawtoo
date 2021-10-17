<template>
  <main>
    <div @click="filteredProjectsByTag(3)">Test Click</div>
    <div class="container py-8">
      <ExploreCards :data="data" />
      <ExploreTable />
    </div>
  </main>
</template>

<script>
import ExploreTable from '@/components/Explore/ExploreTable'
import ExploreCards from '@/components/Explore/ExploreCards'

export default {
  async asyncData({ $supabase, error }) {
    const tagsResp = await $supabase.from('tags').select('id, name')

    if (tagsResp.error) {
      const tagsError = tagsResp.error
      if (tagsError.details.startsWith('Results contain 0 rows')) {
        error({ statusCode: 404 })
      } else {
        error({ statusCode: 500, tagsError })
      }
    }
    return {
      data: tagsResp.data,
    }
  },
  components: {
    ExploreTable,
    ExploreCards,
  },
  data: () => ({
    subscriber: null,
  }),
  methods: {
    async filteredProjectsByTag(tagID) {
      const { error: projectErr, data: projects } = await this.$supabase
        .from('projects')
        .select('*', { head: true, count: 'exact' })
        // .eq('id', 11)
        .contains('socials', ['meka'])
      console.log('projectErr', projectErr, 'projects', projects)
    },
  },
}
</script>
