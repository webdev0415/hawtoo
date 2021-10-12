<template>
  <div>
    <button v-clipboard="`Save to watchlist`" class="flex items-center justify-center w-auto h-12 px-4 mx-1 my-auto text-black align-middle bg-gray-200 rounded-full" @click="openModal">
      <span> Buy now </span>
    </button>
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
        <div v-if="data.type === 'nft'" class="flex flex-col items-center justify-between w-full">
          <AppButton v-for="link in data.marketplaces" :key="link.name" :to="marketplaceLink(link.name, link.slug)" href variant="outline" size="small" target="_blank" class="w-full mt-3">
            Buy on {{ link.name }}
          </AppButton>
        </div>
      </div>
    </Modal>
  </div>
</template>

<script>
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
  methods: {
    marketplaceLink(name, slug) {
      switch (name) {
        case 'OpenSea':
          return `https://opensea.io/collection/${slug}`
        case 'Rarible':
          return `https://rarible.com/${slug}`
        default:
          break
      }
    },
    openModal() {
      this.show = true
    },
    closeModal() {
      this.show = false
    }
  }
}
</script>