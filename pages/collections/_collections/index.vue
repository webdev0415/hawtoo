<template>
  <main>
    <div class="container py-8">
      <CollectionSectionInfo :data="data" />
      <div v-if="data.projects">
        <ProjectListItem v-for="project in data.projects" :key="project.id" :project="project" />
      </div>
      <div v-else class="">
        <CollectionEmpty />
      </div>
    </div>
  </main>
</template>

<script>
import getMeta from '~/utils/get-meta'
import CollectionSectionInfo from '@/components/Collections/CollectionSectionInfo'
import CollectionEmpty from '@/components/Collections/CollectionEmpty'
import ProjectListItem from '@/components/Projects/ProjectListItem'

export default {
  components: {
    CollectionSectionInfo,
    CollectionEmpty,
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
    const collectedArray = collectionResponse.data.collected_projects ?? []

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
    if (collectedArray && collectedArray.length !== 0) {
      const collectedArray = collectionResponse.data.collected_projects
      const collectedResponse = await $supabase
        .from('projects')
        .select('*')
        .in('id', collectedArray)

      collectionResponse.data.projects = { ...collectedResponse.data }
    }

    return {
      data: collectionResponse.data
    }
  },
  head() {
    return {
      bodyAttrs: {
        class: 'antialiased bg-white text-body font-body min-w-xs min-h-screen'
      },
      title: `${this.data.collection_name}`,
      description: this.data.collection_description,
      meta: getMeta({
        title: `Watchlist: ${this.data.collection_name}`,
        authorName: this.data.author_id,
        authorNameDesc: this.data.collection_description,
        authorImage: this.avatarUrl
      })
    }
  }
}
</script>