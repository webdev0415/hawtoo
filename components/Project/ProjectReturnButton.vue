<template>
  <div class="absolute z-20 top-4 left-4">
    <div @mouseover="showBackBtntext = true" @mouseleave="showBackBtntext = false">
      <button class="inline-flex items-center w-auto" @click="$router.go(-1)">
        <span class="flex p-3 bg-gray-200" :class="{ 'rounded-lg ': !showBackBtntext, 'rounded-l-lg  bg-gray-200': showBackBtntext }">
          <!-- Heroicon name: outline/speakerphone -->
          <FontAwesome class="text-gray-700" :icon="['fal', 'arrow-left']" />
        </span>

        <p v-if="showBackBtntext" class="flex items-center self-stretch px-4 font-medium text-gray-600 truncate bg-white flesx" :class="{ 'rounded-r-lg': showBackBtntext }">
          <span class="opacity-70">
            Back to HawToo
          </span>
        </p>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FloatingReturnButton',
  data() {
    return {
      showBackBtntext: false
    }
  }
}
</script>