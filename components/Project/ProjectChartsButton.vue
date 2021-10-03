<template>
  <div>
    <div class="flex items-center justify-center w-auto h-12 px-4 mx-1 my-auto text-black align-middle bg-gray-200 rounded-full" @click="openModal">
      <span> Charts </span>
    </div>
    <!-- Modal -->
    <Modal :showing="show" :css="{ 'modal': 'max-w-md' }" @close="closeModal">
      <div class="flex flex-col items-center justify-between w-auto h-30">
        <a v-for="(url, title) in chartLinks" :key="title" :href="url" target="blank" class="relative inline-flex items-center px-4 py-2 my-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-l-md hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500">
          {{ title }}
        </a>
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