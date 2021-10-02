<template>
  <div>
    <ProjectListItem v-for="project in projects" :key="project.id" :episode="project" />
    <StaticPagination class="mt-5" :path="path" :total="count" :per-page="$config.paginate" />
  </div>
</template>
<script>
import StaticPagination from '@/components/Site/StaticPagination.vue'

export default {
  components: {
    StaticPagination
  },
  props: {
    projects: {
      type: Array,
      default: () => []
    },
    count: {
      type: Number,
      default: 0
    },
    path: {
      type: String,
      default: '/projects/page/'
    }
  }
}
</script>
