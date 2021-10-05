<template>
  <section>

    <div class="flex flex-col">
      <div class="mb-4 sm:items-center sm:flex sm:space-x-5">
        <div class="flex-shrink-0 text-center md:text-left">
          <Avatar :size="60" :fullname="data.authorMeta.display_name" :image="data.authorMeta.avatar_url" />
        </div>
        <div class="mt-4 text-center sm:mt-0 sm:pt-1 sm:text-left">
          <p class="text-sm font-medium text-gray-600">A collection by:</p>
          <p class="font-bold text-gray-900 text-md">{{ data.authorMeta.display_name }}</p>
        </div>
      </div>
      <div>
        <div class="pb-5 text-center border-b border-gray-200 sm:text-left">
          <div class="flex flex-col items-center justify-center sm:items-start">
            <div class="flex flex-row mb-2">
              <h1 class="text-3xl leading-6 text-gray-900">
                {{ data.collection_name}}
              </h1>
              <CollectionEditButton v-if="$auth.loggedIn" :data="data" class="ml-4" />
            </div>
          </div>
          <p class="max-w-4xl mt-2 text-sm text-center sm:text-left">
            {{ data.collection_description}}
          </p>
        </div>
      </div>

    </div>
  </section>
</template>

<script>
import CollectionEditButton from '@/components/Collections/CollectionEditButton'

export default {
  components: {
    CollectionEditButton
  },
  props: {
    data: {
      type: Object,
      required: false,
      default: () => {}
    }
  }
}
</script>