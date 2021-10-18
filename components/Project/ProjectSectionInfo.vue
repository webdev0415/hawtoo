<template>
  <section class="max-w-xl mx-auto">
    <div class="flex flex-col items-center ">
      <div class="flex flex-wrap justify-center mb-3">
        <ProjectAvatar :verified="data.verified" verified-tooltip :size="128" :size-badge="36" :name="data.name" :avatar-color="data.avatar_color" :avatar-name="data.avatar_name" :slug="data.slug" />
      </div>

      <h1 class="mb-2 text-3xl font-semibold leading-tight text-center md:text-4xl">
        {{ data.name }}
      </h1>

      <ProjectTotalCount :id="data.id" class="mb-4" />

      <ProjectContractBadge class="mb-3" :link="blockExplorer" :icon="['fal', 'file']" icon-class="text-binance-yellow" :copy-button="true" :copy-text="data.contractAddress" copy-success-message="Successfully copied contract address">
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
      </ProjectContractBadge>

      <ProjectNotVerifiedAlert v-if="!data.verified" />

      <div class="max-w-[680px] pb-1 mx-auto mb-3 text-sm leading-relaxed text-center md:text-lg ">
        <p v-if="!readMore">{{data.description | strLimit(160) }} </p>
        <a v-if="!readMore" class="mt-1 underline" href="javascript:void(0);" @click="readMore = true">
          Read more
        </a>
        <!-- Full descripotion --->
        <p v-if="readMore">{{ data.description }}</p>
        <a v-if="readMore" class="mt-1 underline" href="javascript:void(0);" @click="readMore = false">
          Read less
        </a>
      </div>

    </div>
  </section>
</template>

<script>
import { mapGetters } from 'vuex'
import helper from '@/utils/projectsHelpers.js'
import ProjectAvatar from '@/components/ProjectAvatar.vue'
import ProjectTotalCount from '@/components/Project/ProjectTotalCount'
import ProjectNotVerifiedAlert from '@/components/Project/ProjectNotVerifiedAlert'
import ProjectContractBadge from '@/components/Project/ProjectContractBadge'

export default {
  components: {
    ProjectAvatar,
    ProjectTotalCount,
    ProjectContractBadge,
    ProjectNotVerifiedAlert
  },
  props: {
    data: {
      type: Object,
      required: false,
      default: () => {}
    }
  },
  data() {
    return {
      readMore: false
    }
  },
  computed: {
    ...mapGetters({
      user: 'auth/user'
    }),
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
  }
}
</script>