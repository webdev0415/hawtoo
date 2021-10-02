<template>
  <div>
    <AppSubNav title="Projects">
      <AppSubNavLink to="/projects/">All</AppSubNavLink>
      <AppSubNavLink v-for="key of tags" :key="key" :to="`/projects/tag/${key}/`">{{ key | capitalize }}</AppSubNavLink>
    </AppSubNav>
  </div>
</template>

<script>
import AppSubNav from '@/components/Site/SubNav/AppSubNav.vue'

export default {
  components: {
    AppSubNav
  },
  props: {
    tags: {
      type: Array,
      default: () => []
    }
  }
}
</script>
