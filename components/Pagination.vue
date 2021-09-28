<template>
  <div class="min-w-max">
    <section class="flex justify-between px-6 py-3 text-gray-700 rounded-lg font-montserrat">

      <div>
        <button :disabled="!hasPrev()" class="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-400 border-2 border-transparent rounded-full hover:text-gray-700 hover:border-gray-400" @click.prevent="changePage(prevPage)">
          <svg class="w-4 h-4 mr-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
          Previous
        </button>
      </div>

      <nav class="hidden md:-mt-px md:flex">
        <button v-if="hasFirst()" class="pr-6">
          <a href="#" @click.prevent="changePage(1)">
            <div class="flex items-center justify-center w-8 h-8 transform rounded-md hover:bg-gray-200">
              <span class="transform">
                1
              </span>
            </div>
          </a>
        </button>
        <button v-if="hasFirst()" class="pr-6">...</button>
        <button v-for="page in pages" :key="page" class="pr-6">
          <a href="#" @click.prevent="changePage(page)">
            <div :class="{'bg-gradient-to-r bg-gray-200 text-black': current == page}" class="flex items-center justify-center w-8 h-8 transform rounded-md hover:bg-gray-200">
              <span class="transform">{{ page }}</span>
            </div>
          </a>
        </button>
        <button v-if="hasLast()" class="pr-6">...</button>
        <button v-if="hasLast()" class="pr-6">
          <a href="#" @click.prevent="changePage(totalPages)">
            <div class="flex items-center justify-center w-8 h-8 transform rounded-md hover:bg-gray-200">
              <span class="transform ">
                {{ totalPages }}
              </span>
            </div>
          </a>
        </button>
      </nav>

      <div>
        <button :disabled="!hasNext()" class="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-400 border-2 border-transparent rounded-full hover:text-gray-700 hover:border-gray-400" @click.prevent="changePage(nextPage)">
          Next
          <svg class="w-4 h-4 ml-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      <div v-if="jumpToPage" class="flex items-center">
        <div class="pr-2 font-medium text-gray-400">
          <span id="text-before-input">
            {{ textBeforeInput }}
          </span>
        </div>
        <div class="px-1 py-1 w-14">
          <input v-model.number="input" class="w-12 px-2 focus:outline-none" type="text">
        </div>
        <div class="flex items-center pl-4 font-medium cursor-pointer" @click.prevent="changePage(input)">
          <span id="text-after-input">
            {{ textAfterInput }}
          </span>
          <svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'Pagination',
  props: {
    current: {
      type: Number,
      default: 1
    },
    total: {
      type: Number,
      default: 0
    },
    perPage: {
      type: Number,
      default: 9
    },
    pageRange: {
      type: Number,
      default: 2
    },
    jumpToPage: {
      type: Boolean,
      default: false
    },
    textBeforeInput: {
      type: String,
      default: 'Go to page'
    },
    textAfterInput: {
      type: String,
      default: 'Go'
    }
  },
  data() {
    return {
      input: ''
    }
  },
  computed: {
    pages() {
      const pages = []
      for (let i = this.rangeStart; i <= this.rangeEnd; i++) {
        pages.push(i)
      }
      return pages
    },
    rangeStart() {
      const start = this.current - this.pageRange
      return start > 0 ? start : 1
    },
    rangeEnd() {
      const end = this.current + this.pageRange
      return end < this.totalPages ? end : this.totalPages
    },
    totalPages() {
      return Math.ceil(this.total / this.perPage)
    },
    nextPage() {
      return this.current + 1
    },
    prevPage() {
      return this.current - 1
    }
  },
  methods: {
    hasFirst() {
      return this.rangeStart !== 1
    },
    hasLast() {
      return this.rangeEnd < this.totalPages
    },
    hasPrev() {
      return this.current > 1
    },
    hasNext() {
      return this.current < this.totalPages
    },
    changePage(page) {
      if (page > 0 && page <= this.totalPages) {
        this.$emit('page-changed', page)
      }
    }
  }
}
</script>

<style scoped>
button:disabled {
  opacity: 0;
}
</style>