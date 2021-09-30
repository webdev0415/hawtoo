<template>
  <section class="">
    <div class="container">
      <div class="pt-12 pb-24">
        <div class="pb-8 text-center lg:text-left">
          <h2 class="dark:text-white h2">Hot projects 🔥</h2>
        </div>
        <div class="grid items-start grid-cols-1 gap-6 mx-auto sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 md:max-w-2xl lg:max-w-none">
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
