<template>
  <NuxtLink :to="`/@${project.slug}`" class="block mt-4 bg-white rounded-lg hover:bg-gray-50">
    <div class="flex items-center px-4 py-4 sm:px-6">
      <div class="flex-1 min-w-0 sm:flex sm:items-center sm:justify-between">
        <div class="flex items-center">
          <div>
            <div class="flex items-center">
              <ProjectAvatar :verified="project.verified" :size="64" :name="project.name" :avatar-color="project.avatar_color" :avatar-name="project.avatar_name" :slug="project.slug" />
              <div class="ml-3">

                <h4 class=" text-[17px] font-bold leading-7 text-gray-900 sm:leading-9 sm:truncate">
                  {{ project.name }}
                </h4>
                {{ project.description | strLimit(40) }}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="flex-shrink-0 ml-5">
        <svg class="w-5 h-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
        </svg>
      </div>
    </div>
  </NuxtLink>
</template>

<script>
import ProjectAvatar from '@/components/ProjectAvatar.vue'

export default {
  components: {
    ProjectAvatar
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
