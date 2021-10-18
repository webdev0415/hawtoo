<template>
  <div class="border-b border-gray-200">
    <div class="min-h-[120px] max-h-[120px] sm:min-h-[198px] sm:max-h-[198px] overflow-hidden relative flex bg-white">
      <div class="relative flex items-center justify-center w-full max-w-full max-h-full ">
        <img :src="bannerUrl" class="object-cover w-full h-full">
        <div class="absolute top-0 bottom-0 left-0 right-0 w-full h-full opacity-10 bg-gradient-to-b from-transparent to-gray-900"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    bannerUrl: {
      type: String,
      required: true,
      default: ''
    }
  }
}
</script>
