<template>
  <div v-if="hasLoaded">

    <main class="min-h-screen overflow-hidden bg-gray-100 dark:bg-gray-900 profile-page">
      <section class="relative block h-80 md:h-96 bg-gray-50 dark:bg-gray-900">

        <div v-if="data.avatar_color" class="absolute top-0 w-full h-full bg-center bg-cover" :style="{ backgroundColor: data.avatar_color }"></div>
        <div class="absolute bottom-0 transform -translate-x-1/2 pointer-events-none left-1/2" aria-hidden="true">
          <svg style="opacity:0.07" width="1360" height="578" viewBox="0 0 1360 578" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="illustration-01" x1="50%" y1="0%" x2="50%" y2="100%">
                <stop stop-color="#FFF" offset="0%"></stop>
                <stop stop-color="#EAEAEA" offset="77.402%"></stop>
                <stop stop-color="#DFDFDF" offset="100%"></stop>
              </linearGradient>
            </defs>
            <g fill="url(#illustration-01)" fill-rule="evenodd">
              <circle cx="832" cy="128" r="128"></circle>
              <circle cx="155" cy="443" r="64"></circle>
              <circle cx="1300" cy="543" r="88"></circle>
            </g>
          </svg>
        </div>
      </section>

      <section class="relative pt-16 pb-2">
        <div class="max-w-2xl px-4 mx-auto md:max-w-3xl">
          <div class="relative flex flex-col w-full min-w-0 mb-6 -mt-64 break-words bg-white rounded-lg shadow dark:bg-black">
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

                  <h1 class="text-4xl font-semibold leading-normal dark:text-white">
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
                <Badge class="mb-3" :link="blockExplorer" :icon="['fal', 'file']" icon-class="text-binance-yellow" :copy-button="true" :copy-text="data.contractAddress" copy-success-message="Successfully copied contract address">
                  <div class="box-border inline-flex items-center justify-center h-5 px-2 mr-1 text-sm leading-5 text-center uppercase transition duration-200 ease-in-out bg-blue-200 border border-transparent border-solid cursor-pointer dark:bg-gray-700 dark:text-white badge badge-info badge-chain-initials">
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
                </Badge>

                <!-- Description --->
                <p class="w-9/12 pb-1 mx-auto mb-3 text-sm leading-relaxed dark:text-gray-400 md:text-lg ">
                  {{ data.description }}
                </p>

                <!-- <ProjectToolsMenu :data="data.socialLinks" /> -->
              </div>

              <!-- Project: Bottom--->
              <div class="px-8 pt-8 pb-12 mt-8 bg-white border-t border-gray-300 dark:bg-black">
                <div class="max-w-lg mx-auto">

                  <!--- Project: Main links -->
                  <h4 class="mb-2 text-left h4">Quick links</h4>
                  <ProjectMainLinks :data="data" />

                  <!-- how to buy -->
                  <div class="pt-2 pb-2 mt-6 text-center">
                    <AppButton v-if="hasLoaded" variant="primary" :to="'/@/how-to-buy/' + data.slug">Learn how to invest in {{ data.name }}</AppButton>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>
      <ProjectFooter />
    </main>

    <ProjectReturnButton />
  </div>
</template>

<script>
import axios from 'axios'
import global from '@/mixins/global'
import helper from '@/utils/projectsHelpers.js'

// import visitorService from '@/utils/visitorService'

export default {
  name: 'Project',
  mixins: [global],
  layout: 'empty',
  async asyncData({ $supabase, params, error }) {
    const pageSlug = params.id
    let avatarUrlResp

    const projectResp = await $supabase
      .from('projects')
      .select('*')
      .eq('slug', pageSlug)
      .single()

    if (projectResp.error) {
      const projectError = projectResp.error
      if (projectError.details.startsWith('Results contain 0 rows')) {
        error({ statusCode: 404 })
      } else {
        error({ statusCode: 500, projectError })
      }
    }
    // https://lrtrmaovmdqddfvsukeh.supabase.in/storage/v1/object/sign/avatars/projects/dogepound-1632610656084?

    if (projectResp.data.avatar_name) {
      avatarUrlResp = await $supabase.storage
        .from('avatars')
        .getPublicUrl(projectResp.data.avatar_name)

      avatarUrlResp = avatarUrlResp.data
    }

    return {
      data: projectResp.data,
      avatar: avatarUrlResp
    }
  },

  data() {
    return {
      pageViewCounter: null
    }
  },

  fetchOnServer: false,
  async fetch() {
    // if (!visitorService.hasVisited()) {
    //   visitorService.saveVisited()
    //   await this.$supabase.rpc('increment_page_view', {
    //     page_slug: this.$route.params.id
    //   })
    // }
    await axios.post('/api/increment_page_view', {
      slug: this.$route.params.id
    })
  },

  computed: {
    hasLoaded() {
      return this.notEmptyObject(this.data)
    },
    hasFavoritedProject() {
      if (this.$auth.user.id) {
        return this.data.favorites.includes(this.$auth.user.id)
      } else {
        return false
      }
    },
    avatarUrl() {
      if (this.avatar && this.avatar.publicURL) {
        console.log(this.avatar.publicURL)
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
  }
}
</script>

