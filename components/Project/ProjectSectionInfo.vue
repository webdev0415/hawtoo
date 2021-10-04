<template>
  <div class="flex flex-col items-center">
    <div class="flex flex-wrap justify-center mb-3">
      <avatar class="" :size="128" :size-badge="36" :verified-tooltip="`${data.name} is verified on HawToo`" :color="data.avatar_color" :verified="data.verified" :fullname="data.name" :image="avatarUrl" />
    </div>

    <h1 class="mb-4 text-3xl font-semibold leading-tight text-center md:text-4xl">
      {{ data.name }}
    </h1>

    <ProjectBadge class="mb-3" :link="blockExplorer" :icon="['fal', 'file']" icon-class="text-binance-yellow" :copy-button="true" :copy-text="data.contractAddress" copy-success-message="Successfully copied contract address">
      <div class="box-border inline-flex items-center justify-center h-5 px-2 mr-1 text-sm leading-5 text-center uppercase transition duration-200 ease-in-out bg-gray-200 border border-transparent border-solid rounded-full cursor-pointer badge badge-info badge-chain-initials">
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

    <p class="max-w-[600px] pb-1 mx-auto mb-3 text-sm leading-relaxed text-center md:text-lg ">
      {{ data.description }}
    </p>
  </div>
</template>

<script>
import helper from '@/utils/projectsHelpers.js'

export default {
  props: {
    data: {
      type: Object,
      required: false,
      default: () => {}
    }
  },
  data() {
    return {
      avatarUrl: ''
    }
  },
  computed: {
    user() {
      if (!this.$auth.user) return false
      else return this.$auth.user
    },
    blockExplorer() {
      if (!this.data.chain || !this.data.contractAddress) return null
      return helper.getBlockExplorerUrl(
        this.data.chain,
        this.data.contractAddress
      )
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