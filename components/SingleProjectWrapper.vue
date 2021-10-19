<template>
  <div v-if="hasLoaded">
    <ProjectBanner :data="data" />
    <div class="pb-16 -mt-16">
      <div class="container">

        <ProjectSectionInfo :data="data" />
        <ProjectActions :data="data" />
        <!-- Project: Bottom--->
        <div class="px-8 pt-8 pb-12">
          <div class="max-w-lg mx-auto">

            <ProjectStats2 :id="data.id" />

            <!--- Project: Main links -->
            <h4 class="mb-2 text-left h4">Quick links</h4>
            <ProjectMainLinks :data="data" />

            <!-- <ProjectStats v-if="salesData" :stats="salesData" /> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ProjectSectionInfo from '~/components/Project/ProjectSectionInfo'
import ProjectActions from '~/components/Project/ProjectActions'
import ProjectStats2 from '~/components/Project/ProjectStats2'
// import ProjectStats from '~/components/Project/ProjectStats'
import ProjectBanner from '~/components/Project/ProjectBanner'
// import visitorService from '@/utils/visitorService'

export default {
  name: 'ProjectLinkInBio',
  components: {
    ProjectActions,
    ProjectSectionInfo,
    ProjectBanner,
    ProjectStats2
  },
  mixins: [global],
  props: {
    data: {
      type: Object,
      default: () => {},
      required: true
    },
    index: {
      type: Number,
      default: null,
      required: false
    },
    hasLoaded: {
      type: Boolean,
      default: false,
      required: false
    }
  }
}
</script>

