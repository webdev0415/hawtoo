<template>
  <NuxtLink :to="`/@${project.slug}/`" class="block mt-4 bg-white rounded-lg hover:bg-gray-50">
    <div class="flex items-center px-4 py-4 sm:px-6">
      <div class="flex-1 min-w-0 sm:flex sm:items-center sm:justify-between">
        <div class="truncate">
          <div class="flex text-sm">
            <ProjectTitleAvatar :verified="project.verified" :name="project.name" :avatar-color="project.avatar_color" :avatar-name="project.avatar_name" :type="project.type" :chain="project.chain" :slug="project.slug" />
          </div>
        </div>
        <div class="flex-shrink-0 mt-4 sm:mt-0 sm:ml-5">

        </div>
      </div>
      <div class="flex-shrink-0 ml-5">
        <!-- Heroicon name: solid/chevron-right -->
        <svg class="w-5 h-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
        </svg>
      </div>
    </div>
  </NuxtLink>
</template>

<script>
import ProjectTitleAvatar from '@/components/ProjectTitleAvatar.vue'

export default {
  components: {
    ProjectTitleAvatar
  },
  props: {
    project: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    formattedDate() {
      if (this.project.published_at) {
        return new Intl.DateTimeFormat('en-US', {
          dateStyle: 'long'
        }).format(Date.parse(this.project.published_at))
      } else {
        return 'INVALID DATE'
      }
    }
  }
}
</script>
