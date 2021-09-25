<template>
  <section class="relative">
    <div class="container relative px-4 mx-auto sm:px-6">
      <div class="py-12 md:py-20">
        <div class="pb-8 text-left">
          <h2 class="dark:text-white h2">Hot projects 🔥</h2>
        </div>

        <div class="grid items-start max-w-sm gap-6 mx-auto md:grid-cols-3 lg:grid-cols-4 md:max-w-2xl lg:max-w-none">
          <div v-for="(project, key) in projects" :key="project.id">
            <ProjectCardMini :data="project" :index="key + 1" :has-loaded="hasLoaded" />
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
  }
}
</script>
