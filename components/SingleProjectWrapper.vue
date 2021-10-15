<template>
  <div v-if="hasLoaded">
    <ProjectBanner :data="data" />
    <div class="pb-16 -mt-16">
      <div class="container">
        <ProjectSectionInfo :data="data" />

        <ProjectActions :data="data" />

        <div class="relative flex max-w-xl px-6 py-4 mx-auto mt-6 mb-4 text-center text-red-500 bg-red-100 border-0 rounded">
          <span class="inline-block mr-8 align-middle">
            This project is not verified yet! Please be aware that anyone
            can submit a project on HawToo. Please take extra caution and
            do your research. Always double check the contract address.
          </span>
        </div>

        <!-- Project: Bottom--->
        <div class="px-8 pt-8 pb-12 mt-6">
          <div class="max-w-lg mx-auto">

            <!--- Project: Main links -->
            <h4 class="mb-2 text-left h4">Quick links</h4>
            <ProjectMainLinks :data="data" />

            <h4 class="mt-6 mb-2 text-left h4">Stats</h4>
            <ProjectStats v-if="salesData" :stats="salesData" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ProjectSectionInfo from '~/components/Project/ProjectSectionInfo'
import ProjectActions from '~/components/Project/ProjectActions'
import ProjectStats from '~/components/Project/ProjectStats'
import ProjectBanner from '~/components/Project/ProjectBanner'
// import visitorService from '@/utils/visitorService'

export default {
  name: 'ProjectLinkInBio',
  components: {
    ProjectActions,
    ProjectSectionInfo,
    ProjectStats,
    ProjectBanner
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
  },
  computed: {
    salesData() {
      const statsObject = this.data.sales_stats[0]

      if (!statsObject) {
        return null
      }
      // if (this.data.current_price) {
      //   statsObject.floor_price = this.data.current_price
      // }
      // console.log(statsObject)

      return statsObject
    }
  }
}
</script>

