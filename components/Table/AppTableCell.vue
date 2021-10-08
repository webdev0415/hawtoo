
<template>
  <td :class="tdClass" class="px-4 py-2 text-gray-900 whitespace-nowrap">
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