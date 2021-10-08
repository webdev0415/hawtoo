<template>
  <main>
    <section v-if="filtered" class="p-3 mb-3 border-0 rounded-lg">
      <div class="flex items-center">
        <svg class="w-5 h-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input v-model="search" class="w-full pl-2 text-gray-500 outline-none" type="text" placeholder="Поиск">
      </div>
    </section>
    <section class="overflow-auto border-0 rounded-lg">
      <table class="w-full divide-y divide-gray-100">
        <thead :class="theadClass" class="bg-white">
          <slot name="head" :data="columns">
            <AppTableRow>
              <AppTableCell v-for="(col, index) in columns" :key="index" td-class="text-xs font-medium tracking-wider text-left uppercase" @click="sorted && sort(col.field)">
                <div class="flex items-center">
                  {{ col.label }}
                  <div v-if="$data._currentSort === col.field">
                    <svg v-if="$data._currentSortDir === 'desc'" class="w-4 h-4 ml-2 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                    </svg>
                    <svg v-if="$data._currentSortDir === 'asc'" class="w-4 h-4 ml-2 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7" />
                    </svg>
                  </div>
                </div>
              </AppTableCell>
            </AppTableRow>
          </slot>
        </thead>
        <tbody :class="tbodyClass" class="bg-white divide-y divide-gray-200">
          <slot name="row" :data="computedRows">
            <div v-if="computedRows.length > 0">
              <AppTableRow v-for="(row, index) in computedRows" :key="index" :index="index" :tr-class="trClass" :striped="striped">
                <AppTableCell v-for="(col, index2) in columns" :key="index2" :value="row[col]" :td-class="tdClass">
                  {{ row[col] }}
                </AppTableCell>
              </AppTableRow>
            </div>
          </slot>
          <tr v-if="computedRows.length === 0">
            <td colspan="100%">
              <div class="flex justify-center w-full px-6 py-4 text-gray-500 whitespace-nowrap">
                Data not found
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </section>
    <section v-if="paginated" class="mt-3 overflow-auto">
      <Pagination :current="$data._currentPage" :total="remote ? totalCount : filteredRows.length" :per-page="perPage" @page-changed="changePage($event)" />
    </section>
  </main>
</template>

<script>
/* eslint-disable vue/require-default-prop */
/* eslint-disable vue/no-side-effects-in-computed-properties */
/* eslint-disable vue/no-mutating-props */
/*  eslint-disable array-callback-return */

import AppTableRow from './AppTableRow.vue'
import AppTableCell from './AppTableCell.vue'
import Pagination from '@/components/Pagination'

export default {
  name: 'AppTable',
  components: { AppTableRow, AppTableCell, Pagination },
  props: {
    remote: Boolean,

    columns: {
      type: Array,
      required: true
    },
    rows: {
      type: Array,
      required: true
    },

    theadClass: String,
    tbodyClass: String,
    trClass: String,
    tdClass: String,

    striped: Boolean,
    filtered: Boolean,

    sorted: Boolean,
    currentSort: String,
    currentSortDir: {
      type: String,
      default: 'asc'
    },

    paginated: Boolean,
    currentPage: {
      type: Number,
      default: 1
    },
    totalCount: {
      type: Number,
      default: 20
    },
    perPage: {
      type: Number,
      default: 5
    }
  },
  data() {
    return {
      // eslint-disable-next-line vue/no-reserved-keys
      _currentPage: this.currentPage,
      // eslint-disable-next-line vue/no-reserved-keys
      _currentSort: this.currentSort,
      // eslint-disable-next-line vue/no-reserved-keys
      _currentSortDir: this.currentSortDir,
      search: ''
    }
  },
  computed: {
    sortedRows() {
      return this.sorted
        ? this.rows.sort((a, b) => {
            let modifier = 1
            if (this.$data._currentSortDir === 'desc') modifier = -1
            if (a[this.$data._currentSort] < b[this.$data._currentSort])
              return -1 * modifier
            if (a[this.$data._currentSort] > b[this.$data._currentSort])
              return 1 * modifier
            return 0
          })
        : this.rows
    },
    filteredRows() {
      return this.sortedRows.filter(
        (row) =>
          Object.values(row).filter((value) =>
            value.toString().toLowerCase().includes(this.search.toLowerCase())
          ).length > 0
      )
    },
    paginatedRows() {
      return this.paginated
        ? this.filteredRows.filter((row, index) => {
            const start = (this.$data._currentPage - 1) * this.perPage
            const end = this.$data._currentPage * this.perPage
            if (index >= start && index < end) return true
          })
        : this.filteredRows
    },
    computedRows() {
      return this.remote ? this.rows : this.paginatedRows
    }
  },
  methods: {
    sort(s) {
      if (s === this.$data._currentSort) {
        this.$data._currentSortDir =
          this.$data._currentSortDir === 'asc' ? 'desc' : 'asc'
      }
      this.$data._currentSort = s
      this.$emit('sort', this.$data._currentSort, this.$data._currentSortDir)
    },
    changePage($event) {
      this.$data._currentPage = $event
      this.$emit('page-changed', $event)
    }
  }
}
</script>

<style scoped>
</style>