<template>
  <NuxtLink to="/projects" class="absolute flex items-center justify-center w-10 h-10 font-sans text-indigo-700 bg-gray-200 rounded-full cursor-pointer" style="top: 24px; left: 24px; border-radius: 20px;">
    <img src="~/assets/images/icons/back.svg" height="24" width="24" class="block h-4 m-auto" />
  </NuxtLink>
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