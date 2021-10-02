<template>
  <main>
    <!--- projects/tag/_tag.vue -->
    <div class="container py-20">
      <ProjectsSubNav :tags="$config.tagNames" />
      <ProjectsWithFilter :title="$route.params.tag" :projects="projects" :count="count" :total-count="totalCount" :path="`/projects/tag/${$route.params.tag}/`" />
    </div>
  </main>
</template>

<script>
import useFilteredProjects from '~/utils/useFilteredProjects'
import ProjectsSubNav from '@/components/Projects/ProjectsSubNav'
import ProjectsWithFilter from '@/components/Projects/ProjectsWithFilter'

export default {
  components: {
    ProjectsSubNav,
    ProjectsWithFilter
  },
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
      params.tag,
      params.page
    )
    if (err) {
      error({ statusCode: 500, message: err })
    }
    return {
      // latestProject: projects ? projects[0] : {},
      projects,
      count,
      totalCount
    }
  },
  head() {
    return {
      title: `Projects | Page ${this.$route.params.tag}`
    }
  }
}
</script>
