<template>
  <div>
    <NuxtLink :to="`/@${data.slug}`" class="flex items-center ">
      <div class="flex-1 min-w-0 sm:flex sm:items-center sm:justify-between">
        <div class="flex items-center">
          <span v-if="sponsored" v-tooltip="`Sponsored`" class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-200 text-yellow-900 mr-2">
            AD
          </span>
          <span v-if="index && !sponsored" class="inline-flex items-center px-2.5 py-0.5 rounded-full text-md font-medium bg-transparent  text-gray-800 mr-2">
            {{ indexPrefix }}{{ index }}
          </span>

          <ProjectAvatar :verified="data.verified" :size="46" :name="data.name" :avatar-color="data.avatar_color" :avatar-name="data.avatar_name" :slug="data.slug" />
          <div class="ml-3">

            <h4 class=" text-[17px] font-bold leading-7 text-gray-900 sm:leading-9 sm:truncate">
              {{ data.name }}
            </h4>

            <ProjectTotalCount :id="data.id" :animated="false" type="empty" class="text-gray-500" />
          </div>
        </div>
        <div class="stats">
          <Stats :id="data.id" />
        </div>
      </div>

      <div class="flex-shrink-0 ml-5">
        <svg class="w-5 h-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
        </svg>
      </div>
    </NuxtLink>
  </div>
</template>

<script>
import ProjectAvatar from '@/components/ProjectAvatar.vue'
import Stats from '@/components/Home/Stats.vue'

export default {
  components: {
    ProjectAvatar,
    Stats
  },
  props: {
    data: {
      type: Object,
      default: () => {},
      required: true
    },
    sponsored: {
      type: Boolean,
      default: false,
      required: false
    },
    index: {
      type: Number,
      default: 1,
      required: false
    },
    indexPrefix: {
      type: String,
      default: '',
      required: false
    }
  }
}
</script>
