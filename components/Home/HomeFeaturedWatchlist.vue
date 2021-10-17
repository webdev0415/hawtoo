<template>
  <NuxtLink to="/">
    <div class="relative pt-64 pb-10 overflow-hidden shadow-xl rounded-2xl">
      <img class="absolute inset-0 object-cover w-full h-full" :src="data.backgroundImage" alt="">
      <!-- <div class="absolute inset-0 bg-red-200 mix-blend-multiply"></div> -->
      <div class="absolute inset-0 bg-gradient-to-b from-transparent to-gray-900"></div>
      <div class="relative px-8">
        <h3 class="text-xl text-white">
          {{ data.title }}
        </h3>
        <div class="mt-2">
          <p class="text-base font-semibold text-red-200">
            {{ data.desc }}
          </p>
        </div>
      </div>
    </div>

    <div class="flex items-center justify-between mt-2 text-sm leading-normal tracking-wide text-white cursor-pointer" style='font-feature-settings: "salt", "ss01", "ss02", "ss03"; word-break: break-word;'>
      <div class="flex items-center justify-start leading-5 tracking-wide cursor-pointer" style="word-break: break-word;">
        <img :src="data.userAvatar" loading="lazy" alt="" class="object-contain w-6 max-w-full mr-2 leading-5 border-none" style="border-radius: 16px; word-break: break-word;" />
        {{ data.userName }}
      </div>
      <div class="ml-2 leading-5 tracking-wide whitespace-no-wrap cursor-pointer" style="word-break: break-word;">
        {{ data.views }}
      </div>
    </div>

  </NuxtLink>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      default: () => {},
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
</style>