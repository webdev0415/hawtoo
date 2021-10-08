
<template>
  <tr :class="[striped && (index+1) % 2 === 0 ? 'bg-gray-50' : trClass, (index+1) % 2 === 0 ? 'py-4' : '' ]" class="divide-gray-100">
    <slot />
  </tr>
</template>

<script>
/* eslint-disable vue/require-default-prop */

export default {
  name: 'AppTableRow',
  props: {
    index: Number,
    trClass: String,
    striped: Boolean
  }
}
</script>

<style scoped>
</style>