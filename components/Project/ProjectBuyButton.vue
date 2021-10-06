<template>
  <div>
    <button class="flex items-center justify-center w-auto h-12 px-4 mx-1 my-auto text-black align-middle bg-gray-200 rounded-full" @click="openModal">
      <span> Buy now </span>
    </button>
    <!-- Modal -->
    <Modal :showing="show" :css="{ 'modal': 'max-w-md' }" @close="closeModal">

      <div class="flex items-center justify-center mb-2">
        <ProjectAvatar :verified="data.verified" :size="64" :name="data.name" :avatar-color="data.avatar_color" :avatar-name="data.avatar_name" :slug="data.slug" />
      </div>

      <div class="mb-3 text-center">
        <h3 class="text-2xl">
          Buy {{ data.name }}
        </h3>
      </div>

      <div class="mb-4">
        <div v-if="data.type === 'coin'" class="flex flex-col items-center justify-between w-full">
          <AppButton v-for="(url, title) in buyOnDexLinks" :key="title" :href="url" variant="outline" size="small" target="_blank" class="w-full mt-3">
            Buy on {{ title  }}
          </AppButton>
        </div>

        <div v-if="data.type === 'nft'" class="flex flex-col items-center justify-between w-full">
          <AppButton v-for="link in data.marketplaces" :key="link.name" :href="link.url" variant="outline" size="small" target="_blank" class="w-full mt-3">
            Buy on {{ link.name }}
          </AppButton>
        </div>
      </div>
    </Modal>
  </div>
</template>

<script>
import helper from '@/utils/projectsHelpers.js'

export default {
  props: {
    data: {
      type: Object,
      required: true,
      default: () => {}
    }
  },

  data() {
    return {
      show: false
    }
  },
  computed: {
    buyOnDexLinks() {
      if (!this.data.contract_address) return []
      const buy = helper.createBuyLinks(this.data.contract_address)
      return buy[this.data.chain]
    }
  },
  methods: {
    openModal() {
      this.show = true
    },
    closeModal() {
      this.show = false
    }
  }
}
</script>