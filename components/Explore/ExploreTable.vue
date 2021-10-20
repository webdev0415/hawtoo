<template>
  <section class="bg-white">
    <div
      class="
        mb-10
        grid grid-cols-2
        sm:grid-cols-3
        lg:grid-cols-4
        xl:grid-cols-5
        gap-7
        justify-items-center
      "
    >
      <button
        v-for="card in data"
        :key="card.id"
        class="
          rounded-lg
          overflow-hidden
          bg-gray-500
          text-white
          h-20
          w-full
          flex
          items-center
          justify-center
          capitalize
          bg-explore-categories
          cursor-pointer
          relative
        "
        @click="handleTagClick(card.id)"
      >
        <div
          :class="
            selectedTag === card.id
              ? 'w-full h-full opacity-40 absolute z-0 bg-blue-700'
              : 'w-full h-full opacity-40 absolute z-0 bg-black'
          "
        />
        <span class="z-10">{{ card.name }}</span>
      </button>
    </div>
    <div ref="tableRef" class="overflow-x-auto">
      <header class="mb-5 p-4 grid grid-cols-1 md:grid-cols-3 gap-3">
        <div class="relative flex w-full flex-wrap items-stretch md:col-span-2">
          <span
            class="
              z-10
              h-full
              leading-snug
              font-normal
              text-center text-gray-500
              absolute
              bg-transparent
              rounded
              text-base
              flex
              items-center
              justify-center
              w-8
              pl-3
              py-3
            "
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </span>
          <input
            v-model="searchInput"
            type="text"
            placeholder="Search"
            class="
              px-3
              py-3
              placeholder-gray-400
              relative
              bg-white
              rounded
              text-sm
              border border-gray-300
              outline-none
              focus:outline-none
              w-full
              pl-10
              leading-none
            "
            @input="handleChange"
          />
        </div>

        <div class="relative inline-block w-full text-gray-700">
          <select
            v-model="sortByValue"
            class="
              w-full
              pl-3
              pr-6
              py-3
              text-sm
              placeholder-gray-400
              border border-gray-300
              rounded
              appearance-none
              focus:shadow-outline
            "
            @change="handleSort"
          >
            <option
              v-for="option in sortByOptions"
              :key="option.value"
              :value="option.value"
            >
              {{ option.label }}
            </option>
          </select>
        </div>
      </header>
      <AppTable
        remote
        :columns="columns"
        :rows="rows"
        :sorted="true"
        current-sort="floor_price"
        current-sort-dir="desc"
        paginated
        :per-page="perPage"
        :total-count="totalCount"
        @sort="onSort"
        @page-changed="currentPage = $event"
      >
        <template #row="props">
          <AppTableRow
            v-for="(top, idx) in topProject"
            :key="top.id + idx"
            :index="idx"
          >
            <AppTableCell>
              <span
                v-if="topProject"
                v-tooltip="`Sponsored`"
                class="
                  inline-flex
                  items-center
                  px-2.5
                  py-0.5
                  rounded-full
                  text-xs
                  font-medium
                  bg-yellow-200
                  text-yellow-900
                  mr-2
                "
              >
                AD
              </span>
            </AppTableCell>
            <AppTableCell>
              <NuxtLink :to="'/@' + top.slug">
                <div class="flex items-center">
                  <ProjectAvatar
                    :verified="top.verified"
                    :name="top.name"
                    :avatar-color="top.avatar_color"
                    :avatar-name="top.avatar_name"
                  />
                  <span class="ml-3">{{ top.name }}</span>
                </div>
              </NuxtLink>
            </AppTableCell>
            <AppTableCell v-for="(fld, i) in footerFields" :key="i">
              <div class="flex items-center justify-between md:block lg:flex">
                <div
                  class="flex items-center text-xl font-semibold text-gray-900"
                >
                  {{ fld.prefix }}
                  {{ toFixed(top.nft_stats[fld.field]) }}
                  <span class="ml-2 text-sm font-medium text-gray-500">
                    {{ fld.suffix }}
                  </span>
                </div>
              </div>
            </AppTableCell>
          </AppTableRow>
          <AppTableRow
            v-for="(row, index) in props.data"
            :key="index"
            :index="index"
          >
            <!-- Cell: Count -->
            <AppTableCell>
              <span>{{ index + 1 }}</span>
            </AppTableCell>

            <!-- Cell: Avatar -->
            <AppTableCell>
              <NuxtLink :to="'/@' + row.slug">
                <div class="flex items-center">
                  <ProjectAvatar
                    :verified="row.verified"
                    :name="row.name"
                    :avatar-color="row.avatar_color"
                    :avatar-name="row.avatar_name"
                  />
                  <span class="ml-3">{{ row.name }}</span>
                </div>
              </NuxtLink>
            </AppTableCell>

            <!-- Cell: Sales data -->
            <AppTableCell v-for="(fld, i) in footerFields" :key="i">
              <div class="flex items-center justify-between md:block lg:flex">
                <div
                  class="flex items-center text-xl font-semibold text-gray-900"
                >
                  {{ fld.prefix }} {{ toFixed(row.nft_stats[fld.field]) }}
                  <span class="ml-2 text-sm font-medium text-gray-500">
                    {{ fld.suffix }}
                  </span>
                </div>
              </div>
            </AppTableCell>
          </AppTableRow>
        </template>
      </AppTable>
    </div>
  </section>
</template>

<script>
import _ from 'lodash'
import AppTable from '~/components/Table/AppTable'
import AppTableCell from '~/components/Table/AppTableCell'
import AppTableRow from '~/components/Table/AppTableRow'

export default {
  components: {
    AppTableRow,
    AppTableCell,
    AppTable,
  },
  props: {
    data: {
      type: Array,
      default: () => {},
      required: true,
    },
  },
  data() {
    return {
      columns: [
        {
          label: '#',
          field: 'count',
        },
        {
          label: 'Name',
          field: 'name',
        },
        {
          label: 'Floor price',
          field: 'floor_price',
        },
        {
          label: '24 hour volume',
          field: 'one_day_volume',
        },
        {
          label: '7-day avg. Price',
          field: 'one_day_volume',
        },
        {
          label: '30-day avg. Price',
          field: 'one_day_volume',
        },
      ],
      rows: [],
      currentPage: 1,
      perPage: 50,
      totalCount: 0,
      sortField: 'floor_price',
      sortOrder: 'desc',
      footerFields: [
        {
          title: 'Floor Price',
          field: 'floor_price',
          suffix: 'ETH',
          prefix: 'Ξ',
          color: 'text-violet-400',
        },
        {
          title: '24 hour volume',
          field: 'one_day_volume',
          suffix: 'ETH',
          prefix: 'Ξ',
          color: 'text-blue-400',
        },
        {
          title: '7-day avg. Price',
          field: 'seven_day_average_price',
          suffix: 'ETH',
          prefix: 'Ξ',
          color: 'text-gray-900',
        },
        {
          title: '30-day avg. Price',
          field: 'thirty_day_average_price',
          suffix: 'ETH',
          prefix: 'Ξ',
          color: 'text-gray-900',
        },
      ],
      searchInput: '',
      sortByValue: 'updated_at',
      selectedTag: null,
      sortByOptions: [
        {
          label: 'Recently Added (date)',
          value: 'updated_at',
        },
        {
          label: 'Most Viewed (number)',
          value: 'view_count',
        },
        // {
        //   label: 'Most Watchlisted (number)',
        //   value: 'updated_at_new',
        // },
        {
          label: 'Oldest (date)',
          value: 'published_at',
        },
        {
          label: 'Floor Low To High (number)',
          value: 'current_price_high',
        },
        {
          label: 'Floor High To Low (number)',
          value: 'current_price_low',
        },
        {
          label: 'Verified (boolean)',
          value: 'verified',
        },
      ],
      statics: [],
      topProject: [],
      // topProjectExist: false,
    }
  },
  async fetch() {
    const topIds = [170, 174]

    const { data: spotData } = await this.$supabase
      .from('projects')
      .select('*, nft_stats ( * )')
      .in('id', topIds)

    if (spotData) {
      this.topProject = spotData
      // this.topProjectExist = spotData.length > 0 ? true : false
    }
    // await this.fetchMoviesData()
  },
  watch: {
    currentPage() {
      this.fetchMoviesData()
      this.goTo('tableRef')
    },
  },
  created() {
    this.fetchMoviesData()
  },
  mounted() {
    this.searchInput =
      this.$router.history.current.query._search !== undefined
        ? this.$router.history.current.query._search
        : ''
    this.sortByValue =
      this.$router.history.current.query._sortby !== undefined
        ? this.$router.history.current.query._sortby
        : 'updated_at'
    this.selectedTag =
      this.$router.history.current.query._tag !== null &&
      this.$router.history.current.query._tag !== undefined
        ? Number(this.$router.history.current.query._tag)
        : null
  },
  methods: {
    goTo(refName) {
      const element = this.$refs[refName]
      const top = element?.offsetTop
      window.scrollTo({ top, behavior: 'smooth' })
    },
    onSort(field, order) {
      this.sortField = field
      this.sortOrder = order
      // this.fetchMoviesData()
    },
    async validateSearch(
      searchInput,
      selectedTag,
      sortVal,
      rangeStart,
      rangeEnd
    ) {
      if (sortVal === undefined) {
        sortVal = 'updated_at'
      }
      if (searchInput && selectedTag !== null) {
        const { count: totalCount } = await this.$supabase
          .from('projects')
          .select('*', { head: true, count: 'exact' })
          .contains('tags', [selectedTag])
          .ilike('name', `%${searchInput}%`)
        this.totalCount = totalCount
        if (sortVal === 'current_price_high') {
          const result = await this.$supabase
            .from('projects')
            .select('*, nft_stats ( * )')
            .contains('tags', [selectedTag])
            .ilike('name', `%${searchInput}%`)
          if (result.error) {
            this.$toast.error('Something went wrong getting your watch list.')
          }
          if (result.data) {
            this.rows = result.data
              .sort((a, b) => a.nft_stats.floor_price - b.nft_stats.floor_price)
              .slice(rangeStart, rangeEnd - 1)
          }
        } else if (sortVal === 'current_price_low') {
          const result = await this.$supabase
            .from('projects')
            .select('*, nft_stats ( * )')
            .contains('tags', [selectedTag])
            .ilike('name', `%${searchInput}%`)

          if (result.error) {
            this.$toast.error('Something went wrong getting your watch list.')
          }
          if (result.data) {
            this.rows = result.data
              .sort((a, b) => b.nft_stats.floor_price - a.nft_stats.floor_price)
              .slice(rangeStart, rangeEnd - 1)
          }
        } else {
          return await this.$supabase
            .from('projects')
            .select('*, nft_stats ( * )')
            .contains('tags', [selectedTag])
            .ilike('name', `%${searchInput}%`)
            .order(sortVal, { ascending: false })
            .range(rangeStart, rangeEnd - 1)
            .then((response) => {
              if (response.error) {
                this.$toast.error(
                  'Something went wrong getting your watch list.'
                )
              }
              if (response.data) {
                this.rows = response.data
              }
            })
            .catch((e) => console.log(e))
        }
      } else if (searchInput) {
        const { count: totalCount } = await this.$supabase
          .from('projects')
          .select('*', { head: true, count: 'exact' })
          .ilike('name', `%${searchInput}%`)
        this.totalCount = totalCount

        if (sortVal === 'current_price_high') {
          const result = await this.$supabase
            .from('projects')
            .select('*, nft_stats ( * )')
            .ilike('name', `%${searchInput}%`)
          if (result.error) {
            this.$toast.error('Something went wrong getting your watch list.')
          }
          if (result.data) {
            this.rows = result.data
              .sort((a, b) => a.nft_stats.floor_price - b.nft_stats.floor_price)
              .slice(rangeStart, rangeEnd - 1)
          }
        } else if (sortVal === 'current_price_low') {
          const result = await this.$supabase
            .from('projects')
            .select('*, nft_stats ( * )')
            .ilike('name', `%${searchInput}%`)

          if (result.error) {
            this.$toast.error('Something went wrong getting your watch list.')
          }
          if (result.data) {
            this.rows = result.data
              .sort((a, b) => b.nft_stats.floor_price - a.nft_stats.floor_price)
              .slice(rangeStart, rangeEnd - 1)
          }
        } else {
          return await this.$supabase
            .from('projects')
            .select('*, nft_stats ( * )')
            .ilike('name', `%${searchInput}%`)
            .order(sortVal, { ascending: false })
            .range(rangeStart, rangeEnd - 1)
            .then((response) => {
              // console.log(response)
              if (response.error) {
                this.$toast.error(
                  'Something went wrong getting your watch list.'
                )
              }
              if (response.data) {
                this.rows = response.data
              }
            })
            .catch((e) => console.log(e))
        }
      } else if (selectedTag !== null) {
        const { count: totalCount } = await this.$supabase
          .from('projects')
          .select('*', { head: true, count: 'exact' })
          .contains('tags', [selectedTag])
        this.totalCount = totalCount

        if (sortVal === 'current_price_high') {
          const result = await this.$supabase
            .from('projects')
            .select('*, nft_stats ( * )')
            .contains('tags', [selectedTag])
          if (result.error) {
            this.$toast.error('Something went wrong getting your watch list.')
          }
          if (result.data) {
            this.rows = result.data
              .sort((a, b) => a.nft_stats.floor_price - b.nft_stats.floor_price)
              .slice(rangeStart, rangeEnd - 1)
          }
        } else if (sortVal === 'current_price_low') {
          const result = await this.$supabase
            .from('projects')
            .select('*, nft_stats ( * )')
            .contains('tags', [selectedTag])

          if (result.error) {
            this.$toast.error('Something went wrong getting your watch list.')
          }
          if (result.data) {
            this.rows = result.data
              .sort((a, b) => b.nft_stats.floor_price - a.nft_stats.floor_price)
              .slice(rangeStart, rangeEnd - 1)
          }
        } else {
          return await this.$supabase
            .from('projects')
            .select('*, nft_stats ( * )')
            .contains('tags', [selectedTag])
            .order(sortVal, { ascending: false })
            .range(rangeStart, rangeEnd - 1)
            .then((response) => {
              if (response.error) {
                this.$toast.error(
                  'Something went wrong getting your watch list.'
                )
              }
              if (response.data) {
                this.rows = response.data
              }
            })
            .catch((e) => console.log(e))
        }
      } else {
        const { count: totalCount } = await this.$supabase
          .from('projects')
          .select('*', { head: true, count: 'exact' })
        this.totalCount = totalCount

        if (sortVal === 'current_price_high') {
          const result = await this.$supabase
            .from('projects')
            .select('*, nft_stats ( * )')
          if (result.error) {
            this.$toast.error('Something went wrong getting your watch list.')
          }
          if (result.data) {
            this.rows = result.data
              .sort((a, b) => a.nft_stats.floor_price - b.nft_stats.floor_price)
              .slice(rangeStart, rangeEnd - 1)
          }
        } else if (sortVal === 'current_price_low') {
          const result = await this.$supabase
            .from('projects')
            .select('*, nft_stats ( * )')

          if (result.error) {
            this.$toast.error('Something went wrong getting your watch list.')
          }
          if (result.data) {
            this.rows = result.data
              .sort((a, b) => b.nft_stats.floor_price - a.nft_stats.floor_price)
              .slice(rangeStart, rangeEnd - 1)
          }
        } else {
          return await this.$supabase
            .from('projects')
            .select('*, nft_stats ( * )')
            .order(sortVal, { ascending: false })
            .range(rangeStart, rangeEnd - 1)
            .then((response) => {
              // console.log(response)
              if (response.error) {
                this.$toast.error(
                  'Something went wrong getting your watch list.'
                )
              }
              if (response.data) {
                this.rows = response.data
              }
            })
            .catch((e) => console.log(e))
        }
      }
    },
    async handleTagClick(id) {
      const perPage = this.perPage
      let currentPage = this.currentPage

      currentPage = currentPage - 1 || 0
      if (currentPage <= 0) {
        currentPage = 0
      }

      const rangeStart = perPage * currentPage
      const rangeEnd = rangeStart + perPage

      if (this.selectedTag === id) {
        this.selectedTag = null
        const query = { ...this.$route.query, _tag: null }
        this.$router.push({ path: 'explore', query })
        const { count: totalCount } = await this.$supabase
          .from('projects')
          .select('*', { head: true, count: 'exact' })
        this.totalCount = totalCount
        return await this.validateSearch(
          this.searchInput,
          null,
          this.sortByValue,
          rangeStart,
          rangeEnd
        )
      }
      this.selectedTag = id
      const query = { ...this.$route.query, _tag: id }
      this.$router.push({ path: 'explore', query })
      const { count: totalCount } = await this.$supabase
        .from('projects')
        .select('*', { head: true, count: 'exact' })
        .contains('tags', [this.selectedTag])
      this.totalCount = totalCount
      return await this.validateSearch(
        this.searchInput,
        id,
        this.sortByValue,
        rangeStart,
        rangeEnd
      )
    },
    async handleSort(e) {
      const query = { ...this.$route.query, _sortby: e.target.value }
      this.$router.push({ path: 'explore', query })
      this.sortByValue = e.target.value

      const perPage = this.perPage
      let currentPage = this.currentPage

      currentPage = currentPage - 1 || 0
      if (currentPage <= 0) {
        currentPage = 0
      }

      const rangeStart = perPage * currentPage
      const rangeEnd = rangeStart + perPage
      await this.validateSearch(
        this.searchInput,
        this.selectedTag,
        e.target.value,
        rangeStart,
        rangeEnd
      )
    },
    async handleSearch(e) {
      const query = { ...this.$route.query, _search: e.target.value }

      this.$router.push({ path: 'explore', query })
      this.searchInput = e.target.value
      const perPage = this.perPage
      let currentPage = this.currentPage

      currentPage = currentPage - 1 || 0
      if (currentPage <= 0) {
        currentPage = 0
      }

      const rangeStart = perPage * currentPage
      const rangeEnd = rangeStart + perPage
      // this.searchInput = e.target.value

      await this.validateSearch(
        this.searchInput,
        this.selectedTag,
        this.sortByValue,
        rangeStart,
        rangeEnd
      )
    },
    async fetchMoviesData() {
      const perPage = this.perPage
      let currentPage = this.currentPage

      const { count: totalCount } = await this.$supabase
        .from('projects')
        .select('*', { head: true, count: 'exact' })
      this.totalCount = totalCount

      currentPage = currentPage - 1 || 0
      if (currentPage <= 0) {
        currentPage = 0
      }

      const rangeStart = perPage * currentPage
      const rangeEnd = rangeStart + perPage

      await this.validateSearch(
        this.searchInput,
        this.selectedTag,
        this.sortByValue,
        rangeStart,
        rangeEnd
      )
    },
    toFixed(val) {
      if (isNaN(val)) {
        return val
      } else if (Number.isInteger(val)) {
        return val
      } else {
        return Number(val).toFixed(2)
      }
    },
    handleChange: _.debounce(function (e) {
      this.handleSearch(e)
    }, 800),
  },
}
</script>
