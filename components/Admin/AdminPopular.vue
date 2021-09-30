<template>
  <section class="relative">
    <div class="absolute inset-0 pointer-events-none white dark:bg-gray-900 top-1/2 md:mt-24 lg:mt-0" aria-hidden="true"></div>

    <div class="container mb-20">
      <div class="py-12 md:py-20">
        <div class="max-w-3xl pb-12 mx-auto text-center md:pb-20">
          <h2 class="mb-4 dark:text-white">See examples</h2>
          <p class="text-xl">Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur excepteur sint occaecat cupidatat.</p>
        </div>
        <div class="grid items-start max-w-sm gap-6 mx-auto md:grid-cols-2 lg:grid-cols-3 md:max-w-2xl lg:max-w-none">
          <div v-for="project in projects" :key="project.id">
            <ProjectCard :data="project" :has-loaded="hasLoaded" />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    projects: {
      type: Array,
      default: () => []
    },
    hasLoaded: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    sortedProjects() {
      return this.projects
        .slice(0)
        .sort((a, b) => {
          if (a.published_at > b.published_at) return 1
          if (a.published_at < b.published_at) return -1
          return 0
        })
        .filter((e) => {
          return Date.parse(e.published_at) >= new Date()
        })
        .slice(0, 2)
    }
  }
}
</script>
