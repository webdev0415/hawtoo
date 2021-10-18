<template>
  <section v-if="!$fetchState.pending" class="bg-white">
    <div class="container">
      <h2 class="mb-4">On the come up</h2>
      <div class="grid grid-cols-1 gap-10 auto-cols-fr lg:grid-cols-2">
        <MintCard v-for="project in sortedProjects" :key="project.id" :data="project" />
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
    // const topIds = [180, 194]

    const { data, error } = await this.$supabase.from('projects').select('*')
    // .in('id', topIds)

    if (error) {
      throw new Error('No project found')
    }

    if (data) {
      this.projects = data
    }
  },
  computed: {
    sortedProjects() {
      return this.projects
        .slice(0)
        .filter((e) => {
          return Date.parse(e.event_time) >= new Date()
        })
        .slice(0, 2)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>