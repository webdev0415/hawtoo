<template>
  <article>
    <div class="mb-4">
      <h3 class="mb-3 font-mono text-base font-normal">{{ title }}</h3>
    </div>
    <div :class="[columns]" class="grid items-start gap-6 mx-auto">
      <div v-for="project in projects" :key="project.id">
        <ProjectCard :data="project" :has-loaded="hasLoaded" />
      </div>
    </div>
  </article>
</template>

<script>
import global from '@/mixins/global'

export default {
  mixins: [global],
  props: {
    data: {
      type: Array,
      default: () => []
    },
    hasLoaded: {
      type: Boolean,
      default: false
    },
    cols: {
      type: Number,
      default: 4
    },
    title: {
      type: String,
      default: '',
      required: true
    }
  },
  computed: {
    projects() {
      if (this.hasLoaded) {
        return this.data
      }

      return this.createEmptyObject(this.cols)
    },
    columns() {
      const columnSizeMobile = this.cols / 2
      const columnSizeDesktop = this.cols

      return {
        // Column size: 2
        'grid-cols-1': columnSizeMobile === 1,
        'md:grid-cols-2': columnSizeDesktop === 2,
        // Column size: 4
        'grid-cols-2': columnSizeMobile === 2,
        'md:grid-cols-4': columnSizeDesktop === 4,
        // Column size: 6
        'grid-cols-3': columnSizeMobile === 3,
        'md:grid-cols-6': columnSizeDesktop === 6,
        // Column size: 8
        'grid-cols-4': columnSizeMobile === 4,
        'md:grid-cols-8': columnSizeDesktop === 6
      }
    }
  }
}
</script>
