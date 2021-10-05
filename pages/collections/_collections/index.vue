<template>
  <main>
    <div class="container py-8">
      <CollectionSectionInfo :data="data" />
      <ProjectListItem v-for="project in data.projects" :key="project.id" :project="project" />
    </div>
  </main>
</template>

<script>
import CollectionSectionInfo from '@/components/Collections/CollectionSectionInfo'
import ProjectListItem from '@/components/Projects/ProjectListItem'

export default {
  components: {
    CollectionSectionInfo,
    ProjectListItem
  },
  async asyncData({ $supabase, $config, params, error, $auth }) {
    const collectionResponse = await $supabase
      .from('collections')
      .select('*')
      .eq('id', params.collections)
      .single()

    if (collectionResponse.error) {
      const collectionError = collectionResponse.error
      if (collectionError.details.startsWith('Results contain 0 rows')) {
        error({ statusCode: 404 })
      } else {
        error({ statusCode: 500, collectionError })
      }
    }

    const authorId = collectionResponse.data.author_id
    const canEdit = authorId === $auth.user?.id
    const isPrivateCollection = !collectionResponse.data.public && !canEdit
    const collectedArray = collectionResponse.data.collected_projects

    // Return 404 if the collection is not set to `public`
    // Unless the logged in user is the author of the collection.
    if (isPrivateCollection) {
      error({ statusCode: 404 })
    }

    // Get author details.
    const userResponse = await $supabase
      .from('profiles')
      .select('*')
      .eq('id', authorId)
      .single()

    collectionResponse.data.authorMeta = { ...userResponse.data }

    // Get each project that has been collected by the user.
    const collectedResponse = await $supabase
      .from('projects')
      .select('*')
      .in('id', collectedArray)

    collectionResponse.data.projects = { ...collectedResponse.data }

    return {
      data: collectionResponse.data
    }
  },
  mounted() {
    console.log(this.data)
  }
}
</script>