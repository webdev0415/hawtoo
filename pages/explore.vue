<template>
  <main>
    <div class="container py-8">
      <ExploreTable />
    </div>
  </main>
</template>

<script>
import ExploreTable from '@/components/Explore/ExploreTable'

export default {
  components: {
    ExploreTable
  },
  data: () => ({
    subscriber: null
  })
}
</script>
