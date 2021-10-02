<template >
  <div>
    <div class="flex flex-row items-end mt-4 leading-none">
      <h2 class="text-xl font-normal">{{ title }}</h2>
    </div>

    <ProjectsList :projects="projects" :count="count" :path="path" />
  </div>
</template>
<script>
export default {
  props: {
    totalCount: {
      type: Number,
      default: 0
    },
    count: {
      type: Number,
      default: 0
    },
    tagsWithCounts: {
      type: Object,
      default: () => undefined
    },
    projects: {
      type: Array,
      default: () => []
    },
    path: {
      type: String,
      default: () => undefined
    }
  },
  computed: {
    title() {
      const tag = this.$route.params.tag
      if (tag) {
        if (this.count <= 1) {
          return `Browse ${this.count} ${this.$route.params.tag} project`
        } else {
          return `Browse ${this.count} ${this.$route.params.tag} projects`
        }
      }
      return `Browse all projects`
    }
  }
}
</script>
