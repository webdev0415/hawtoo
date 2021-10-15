<template>
  <section v-if="!$fetchState.pending" class="bg-white">
    <div class="container py-16 mx-auto ">
      <h2 class="mb-4">On the come up</h2>
      <div class="grid grid-cols-1 gap-10 auto-cols-fr lg:grid-cols-2">
        <MintCard v-for="project in projects" :key="project.id" :data="project" :event-time="2 * 24 * 60 * 60 * 1000" event-name="Mint" />
      </div>
    </div>
  </section>
</template>

<script>
import MintCard from '@/components/Site/Cards/MintCard'

export default {
  components: {
    MintCard
  },
  data() {
    return {
      projects: {}
    }
  },
  fetchDelay: 250,
  async fetch() {
    // const [r1, r2] = await Promise.all([
    //   this.$axios.get('/api/spot', { params: { id: 3 } }),
    //   this.$axios.get('/api/spot', { params: { id: 4 } })
    // ])

    // const topIds = [r1.data.response, r2.data.response]
    const topIds = [180, 194]

    const { data, error } = await this.$supabase
      .from('projects')
      .select('*')
      .in('id', topIds)

    if (error) {
      throw new Error('No project found')
    }

    if (data) {
      this.projects = data
    }
  }
}
</script>

<style lang="scss" scoped>
</style>