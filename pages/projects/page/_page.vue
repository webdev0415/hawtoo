<template>
  <main>
    <!--- projects/page/_page.vue -->
    <div class="container py-20">
      <ProjectsSubNav :tags="$config.tagNames" />
      <ProjectsWithFilter :projects="projects" :count="count" :total-count="totalCount" />
    </div>
  </main>
</template>

<script>
import useFilteredProjects from '~/utils/useFilteredProjects'

export default {
  async asyncData({ $supabase, $config, params, error }) {
    const {
      error: err,
      projects,
      totalCount,
      count
    } = await useFilteredProjects(
      {
        $supabase,
        $config
      },
      null,
      params.page
    )
    if (err) {
      error({ statusCode: 500, message: err })
    }
    return {
      projects,
      count,
      totalCount
    }
  },
  head() {
    return {
      title: `Projects | Page ${this.$router.currentRoute.params.page}`
    }
  }
}
</script>
