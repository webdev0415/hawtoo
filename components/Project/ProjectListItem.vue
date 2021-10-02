<template>
  <NuxtLink :to="`/@${episode.slug}/`" class="block mt-4 bg-white rounded-lg hover:bg-gray-50">
    <div class="flex items-center px-4 py-4 sm:px-6">
      <div class="flex-1 min-w-0 sm:flex sm:items-center sm:justify-between">
        <div class="truncate">
          <div class="flex text-sm">
            <ProjectTitleAvatar :verified="episode.verified" :name="episode.name" :avatar-color="episode.avatar_color" :avatar-nam="episode.avatar_name" :type="episode.type" :chain="episode.chain" :slug="episode.slug" />
          </div>
        </div>
        <div class="flex-shrink-0 mt-4 sm:mt-0 sm:ml-5">
          <div class="flex -space-x-1 overflow-hidden">
            <img class="inline-block w-6 h-6 rounded-full ring-2 ring-white" src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="Dries Vincent">

            <img class="inline-block w-6 h-6 rounded-full ring-2 ring-white" src="https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="Lindsay Walton">

            <img class="inline-block w-6 h-6 rounded-full ring-2 ring-white" src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="Courtney Henry">

            <img class="inline-block w-6 h-6 rounded-full ring-2 ring-white" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="Tom Cook">
          </div>
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
export default {
  props: {
    episode: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    formattedDate() {
      if (this.episode.published_at) {
        return new Intl.DateTimeFormat('en-US', {
          dateStyle: 'long'
        }).format(Date.parse(this.episode.published_at))
      } else {
        return 'INVALID DATE'
      }
    }
  }
}
</script>
