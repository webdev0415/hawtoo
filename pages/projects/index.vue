<template>
  <main>
    <!--- projects/index.vue -->
    <div class="container py-20">
      <ProjectsSubNav :tags="$config.tagNames" />
      <ProjectsWithFilter :projects="projects" :count="count" :total-count="totalCount" />
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
  async asyncData({ $supabase, $config, error }) {
    const {
      error: err,
      projects,
      totalCount,
      count
    } = await useFilteredProjects({
      $supabase,
      $config
    })
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
      title: 'Tracklists'
    }
  }
}
</script>
