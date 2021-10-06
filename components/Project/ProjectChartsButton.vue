<template>
  <div>
    <button class="flex items-center justify-center w-auto h-12 px-4 mx-1 my-auto text-black align-middle bg-gray-200 rounded-full" @click="openModal">
      <span> Charts </span>
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
        <div class="flex flex-col items-center justify-between w-full">
          <AppButton v-for="(url, title) in chartLinks" :key="title" :href="url" variant="outline" size="small" target="_blank" class="w-full mt-3">
            View on {{ title  }}
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
    chartLinks() {
      if (!this.data.contract_address) return []
      const chart = helper.createChartLinks(this.data.contract_address)
      return chart[this.data.chain]
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