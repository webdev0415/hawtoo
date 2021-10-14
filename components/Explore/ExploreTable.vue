<template>
  <section class="bg-white">
    <div class="overflow-x-auto">
      <AppTable remote :columns="columns" :rows="rows" :sorted="true" current-sort="floor_price" current-sort-dir="desc" paginated :per-page="perPage" :total-count="totalCount" @sort="onSort" @page-changed="currentPage = $event">
        <template #row="props">
          <AppTableRow v-for="(row, index) in props.data" :key="index" :index="index">
            <!-- Cell: Count -->
            <AppTableCell>
              <span>{{ index + 1 }}</span>
            </AppTableCell>

            <!-- Cell: Avatar -->
            <AppTableCell>
              <NuxtLink :to="'/@' + row.slug">
                <div class="flex items-center">
                  <ProjectAvatar :verified="row.verified" :name="row.name" :avatar-color="row.avatar_color" :avatar-name="row.avatar_name" />
                  <span class="ml-3">{{ row.name }}</span>
                </div>
              </NuxtLink>
            </AppTableCell>

            <!-- Cell: Sales data -->
            <AppTableCell v-for="(fld, i) in footerFields" :key="i">
              <div class="flex items-center justify-between md:block lg:flex">
                <div class="flex items-center text-xl font-semibold text-gray-900">
                  {{ fld.prefix }} {{ toFixed( row.sales_stats[0][fld.field] ) }}
                  <span class="ml-2 text-sm font-medium text-gray-500">
                    {{fld.suffix}}
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
import AppTable from '~/components/Table/AppTable'
import AppTableCell from '~/components/Table/AppTableCell'
import AppTableRow from '~/components/Table/AppTableRow'

export default {
  components: {
    AppTableRow,
    AppTableCell,
    AppTable
  },
  data() {
    return {
      columns: [
        {
          label: '#',
          field: 'count'
        },
        {
          label: 'Name',
          field: 'name'
        },
        {
          label: 'Floor price',
          field: 'floor_price'
        },
        {
          label: '24 hour volume',
          field: 'one_day_volume'
        },
        {
          label: '7-day avg. Price',
          field: 'one_day_volume'
        },
        {
          label: '30-day avg. Price',
          field: 'one_day_volume'
        }
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
          color: 'text-violet-400'
        },
        {
          title: '24 hour volume',
          field: 'one_day_volume',
          suffix: 'ETH',
          prefix: 'Ξ',
          color: 'text-blue-400'
        },
        {
          title: '7-day avg. Price',
          field: 'seven_day_average_price',
          suffix: 'ETH',
          prefix: 'Ξ',
          color: 'text-gray-900'
        },
        {
          title: '30-day avg. Price',
          field: 'thirty_day_average_price',
          suffix: 'ETH',
          prefix: 'Ξ',
          color: 'text-gray-900'
        }
      ]
    }
  },
  watch: {
    currentPage() {
      this.fetchMoviesData()
    }
  },
  created() {
    this.fetchMoviesData()
  },
  methods: {
    onSort(field, order) {
      console.log('SORTING NOW')
      this.sortField = field
      this.sortOrder = order
      // this.fetchMoviesData()
    },
    async fetchMoviesData() {
      const perPage = this.perPage
      let currentPage = this.currentPage

      const { count: totalCount } = await this.$supabase
        .from('projects')
        .select('*', { head: true, count: 'exact' })

      this.totalCount = totalCount

      // console.log(this.totalCount)
      // console.log(`Current page: ${currentPage}`)

      currentPage = currentPage - 1 || 0
      if (currentPage <= 0) {
        currentPage = 0
      }

      const rangeStart = perPage * currentPage
      const rangeEnd = rangeStart + perPage

      // console.log(`Current page modified: ${currentPage}`)
      // console.log(`Range start: ${rangeStart}`)
      // console.log(`Range end: ${rangeEnd}`)
      // console.log(`Current range: ${rangeStart} & ${rangeEnd - 1}`)

      return await this.$supabase
        .from('projects')
        .select('*')
        .range(rangeStart, rangeEnd - 1)
        .then((response) => {
          console.log(response)
          if (response.error) {
            this.$toast.error('Something went wrong getting your watch list.')
          }
          if (response.data) {
            this.rows = response.data
          }
        })
        .catch((e) => console.log(e))
    },
    toFixed(val) {
      if (isNaN(val)) {
        return val
      } else if (Number.isInteger(val)) {
        return val
      } else {
        return Number(val).toFixed(2)
      }
    }
  }
}
</script>