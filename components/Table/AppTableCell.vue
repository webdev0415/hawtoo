
<template>
  <td :class="tdClass" class="px-6 py-4 text-gray-500 whitespace-nowrap">
    <slot></slot>
  </td>
</template>

<script>
/* eslint-disable vue/require-default-prop */

export default {
  name: 'AppTableCell',
  props: {
    tdClass: String
  }
}
</script>

<style scoped>
</style>