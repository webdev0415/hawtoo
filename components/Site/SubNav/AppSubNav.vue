<template>
  <div>
    <div class="flex flex-col items-start pb-4 border-b border-gray-300 xl:flex-row xl:items-center">
      <h1 class="flex-1 text-4xl">
        {{ title }}
      </h1>
      <div class="relative flex flex-row w-full xl:w-auto site-sub-nav__menu">
        <div class="flex-1 overflow-x-auto ">
          <nav class="relative flex flex-row w-full xl:w-auto">
            <slot></slot>
          </nav>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AppSubNav',
  props: {
    title: {
      type: String,
      default: 'Untitled'
    }
  }
}
</script>
<style>
</style>
