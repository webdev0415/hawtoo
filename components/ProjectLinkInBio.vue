<template>
  <div v-if="hasLoaded" class="py-20">
    <ProjectSectionInfo :data="data" />
    <ProjectActionsMobile :data="data" />

    <Alert v-if="!data.verified" class="max-w-xl mx-auto mt-6 mb-4 text-center text-red-500 bg-red-100">
      This project is not verified yet! Please be aware that anyone
      can submit a project on HawToo. Please take extra caution and
      do your research. Always double check the contract address.
    </Alert>

    <!-- Project: Bottom--->
    <div class="px-8 pt-8 pb-12 mt-6">
      <div class="max-w-lg mx-auto">

        <!--- Project: Main links -->
        <h4 class="mb-2 text-left h4">Quick links</h4>
        <ProjectMainLinks :data="data" />

      </div>
    </div>

  </div>
</template>

<script>
import helper from '@/utils/projectsHelpers.js'
import ProjectSectionInfo from '~/components/Project/ProjectSectionInfo.vue'
import ProjectActionsMobile from '~/components/Project/ProjectActions.vue'
// import visitorService from '@/utils/visitorService'

export default {
  name: 'ProjectLinkInBio',
  components: {
    ProjectActionsMobile,
    ProjectSectionInfo
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
    user() {
      if (!this.$auth.user) return false
      else return this.$auth.user
    },
    chartLinks() {
      if (!this.data.contractAddress) return []
      const chart = helper.createChartLinks(this.data.contractAddress)
      return chart[this.data.chain]
    },
    buyOnDexLinks() {
      if (!this.data.contractAddress) return []
      const buy = helper.createBuyLinks(this.data.contractAddress)
      return buy[this.data.chain]
    }
  }
}
</script>

