<template>
  <div v-if="hasLoaded">
    <article class="overflow-hidden">

      <section class="relative pt-16 pb-2">
        <div class="">
          <div class="relative flex flex-col w-full min-w-0 mb-6 break-words bg-white rounded-lg shadow ">
            <div>
              <!-- Project: Avatar --->
              <div class="flex flex-wrap justify-center">
                <div class="flex justify-center w-full px-4 lg:w-3/12 lg:order-2">
                  <div class="relative">
                    <div class="absolute w-full -m-16 -ml-22 lg:-ml-16 project-avatar">
                      <avatar class="" :size="128" :size-badge="36" :verified-tooltip="`${data.name} is verified on HawToo`" :color="data.avatar_color" :verified="data.verified" :fullname="data.name" :image="avatarUrl" />
                    </div>
                  </div>
                </div>
                <div class="w-full px-4 lg:w-4/12 lg:order-3 lg:text-right lg:self-center"></div>
                <div class="w-full px-4 lg:w-4/12 lg:order-1">
                  <div class="flex justify-center py-4 pt-8 lg:pt-4"></div>
                </div>
              </div>

              <!-- Project: Top--->
              <div class="mt-8 text-center lg:mt-10">
                <div class="flex flex-row items-center justify-center mx-auto mb-2">

                  <h1 class="text-4xl font-semibold leading-normal ">
                    {{ data.name }}
                  </h1>

                  <!-- <Favorite :favorited="hasFavoritedProject" class="ml-3" @favorite-change="onFavoriteChange" /> -->
                </div>

                <Alert v-if="!data.verified" rounded class="max-w-xl mx-auto mb-4 text-red-500 bg-red-100">
                  This project is not verified yet! Please be aware that anyone
                  can submit a project on HawToo. Please take extra caution and
                  do your research. Always double check the contract address.
                </Alert>

                <!-- Project: Contract address -->
                <ProjectBadge class="mb-3" :link="blockExplorer" :icon="['fal', 'file']" icon-class="text-binance-yellow" :copy-button="true" :copy-text="data.contractAddress" copy-success-message="Successfully copied contract address">
                  <div class="box-border inline-flex items-center justify-center h-5 px-2 mr-1 text-sm leading-5 text-center uppercase transition duration-200 ease-in-out bg-blue-200 border border-transparent border-solid cursor-pointer badge badge-info badge-chain-initials">
                    {{ chainAbbrevation }}
                  </div>
                  <div class="contract-addres">
                    <span class="hidden md:inline">
                      {{ data.contract_address | strLimit(30) }}
                    </span>
                    <span class="flex md:hidden">
                      {{ data.contract_address | strLimit(16) }}
                    </span>
                  </div>
                </ProjectBadge>

                <!-- Description --->
                <p class="w-9/12 pb-1 mx-auto mb-3 text-sm leading-relaxed md:text-lg ">
                  {{ data.description }}
                </p>

                <!-- <ProjectToolsMenu :data="data.socialLinks" /> -->
              </div>

              <!-- Project: Bottom--->
              <div class="px-8 pt-8 pb-12 mt-8 bg-white border-t border-gray-300 ">
                <div class="max-w-lg mx-auto">

                  <!--- Project: Main links -->
                  <h4 class="mb-2 text-left h4">Quick links</h4>
                  <ProjectMainLinks :data="data" />

                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

    </article>
  </div>
</template>

<script>
import helper from '@/utils/projectsHelpers.js'

// import visitorService from '@/utils/visitorService'

export default {
  name: 'ProjectLinkInBio',
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
  data() {
    return {
      pageViewCounter: null
    }
  },
  computed: {
    avatarUrl() {
      if (this.avatar && this.avatar.publicURL) {
        return this.avatar.publicURL
      }
      return ''
    },
    blockExplorer() {
      if (!this.data.chain || !this.data.contractAddress) return null
      return helper.getBlockExplorerUrl(
        this.data.chain,
        this.data.contractAddress
      )
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
    },
    chainAbbrevation() {
      if (!this.data.chain) return null
      const chainAbbr = helper.createChainAbbrevation()
      return chainAbbr[this.data.chain]
    }
  },
  created() {
    if (this.data.avatar_name) {
      this.getAvatar(this.data.avatar_name)
    }
  },
  methods: {
    async getAvatar() {
      const avatarUrlResp = await this.$supabase.storage
        .from('avatars')
        .getPublicUrl(this.data.avatar_name)

      this.avatarUrl = avatarUrlResp.data.publicURL
    }
  }
}
</script>

