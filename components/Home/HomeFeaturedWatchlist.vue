<template>
  <NuxtLink :to="`/watchlists/${data.id}`">
    <div class="relative pt-64 pb-10 overflow-hidden shadow-xl rounded-2xl">
      <img class="absolute inset-0 object-cover w-full h-full" :src="data.banner_url" alt="">
      <!-- <div class="absolute inset-0 bg-red-200 mix-blend-multiply"></div> -->
      <div class="absolute inset-0 bg-gradient-to-b from-transparent to-gray-900"></div>
      <div class="relative px-8">
        <h3 class="text-xl text-white">
          {{ data.name }}
        </h3>
        <div class="mt-2">
          <p class="text-base font-semibold text-red-200">
            {{ data.description | strLimit(80) }}
          </p>
        </div>
      </div>
    </div>

    <div class="flex items-center justify-between mt-2 text-sm leading-normal tracking-wide text-white cursor-pointer" style='font-feature-settings: "salt", "ss01", "ss02", "ss03"; word-break: break-word;'>
      <div class="flex items-center justify-start leading-5 tracking-wide cursor-pointer" style="word-break: break-word;">
        <UserAvatar :verified="data.authorMeta.verified" verified-tooltip :size="24" :size-badge="12" :name="data.authorMeta.display_name" :user-id="data.author_id" class="mr-2" />
        {{ data.authorMeta.display_name }}
      </div>
      <div class="ml-2 leading-5 tracking-wide whitespace-no-wrap cursor-pointer" style="word-break: break-word;">
        <div class="flex items-center justify-end">
          <img :src="require('@/assets/images/icons/eye-white.svg?color=white')" width="16" height="16" alt="View icon" class="mr-1">
          {{ views }}+
        </div>
      </div>
    </div>

  </NuxtLink>
</template>

<script>
import { abbreviateNumber, round } from '@/utils/numbers'
import UserAvatar from '@/components/Site/UserAvatar'

export default {
  components: {
    UserAvatar
  },
  props: {
    data: {
      type: Object,
      default: () => {},
      required: true
    }
  },
  computed: {
    views() {
      return abbreviateNumber(round(this.data.view_count * 212))
    }
  }
}
</script>

<style lang="scss" scoped>
</style>