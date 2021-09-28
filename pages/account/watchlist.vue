
<template>
  <div>
    <header class="py-8 bg-white border-b border-gray-200">
      <div class="container xl:flex xl:items-center xl:justify-between">
        <div class="flex-1 min-w-0">
          <h1 class="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
            👀 My Watchlist
            <span v-if="totalCount">({{ totalCount }})</span>
          </h1>
        </div>
      </div>
    </header>

    <section class="bg-white">
      <div class="container pt-12 pb-20">
        <AppTable remote :columns="columns" :rows="rows" paginated :per-page="perPage" :total-count="totalCount" @page-changed="currentPage = $event">
          <template #row="props">
            <AppTableRow v-for="(row, index) in props.data" :key="index" :index="index" striped>
              <AppTableCell>
                <div class="text-center">
                  {{ index + 1 }}
                </div>
              </AppTableCell>

              <AppTableCell>
                <ProjectTitleAvatar :verified="row.verified" :name="row.name" :avatar-color="row.avatar_color" :type="row.type" :chain="row.chain" :slug="row.slug" />
              </AppTableCell>

              <AppTableCell>
                {{ row.description | strLimit(80) }}
              </AppTableCell>

              <AppTableCell>
                <FavoriteButton :id="row.id" :user-id="user.id" class="ml-3" />
              </AppTableCell>

              <AppTableCell>
                <AppButton variant="secondary" variant-type="outline" size="tiny" :to="'/@' + row.slug">View</AppButton>
              </AppTableCell>
            </AppTableRow>
          </template>
        </AppTable>
      </div>
    </section>
  </div>
</template>

<script>
import AppTable from '~/components/Table/AppTable'
import AppTableCell from '~/components/Table/AppTableCell'
import AppTableRow from '~/components/Table/AppTableRow'
/* eslint-disable no-unused-vars */

export default {
  components: {
    AppTableRow,
    AppTableCell,
    AppTable
  },
  middleware: 'user-auth',
  data() {
    return {
      columns: [
        {
          label: '',
          field: 'count'
        },
        {
          label: 'Name',
          field: 'name'
        },
        {
          label: 'Description',
          field: 'description'
        },
        {
          label: 'Manage',
          field: 'manage'
        },
        {
          label: 'details',
          field: 'details'
        }
      ],
      rows: [],
      currentPage: 1,
      perPage: 10,
      totalCount: 0
    }
  },
  computed: {
    user() {
      if (!this.$auth.user) return false
      else return this.$auth.user
    }
  },
  watch: {
    currentPage() {
      this.fetchMoviesData()
    }
  },
  mounted() {
    this.fetchMoviesData()
  },
  methods: {
    async fetchMoviesData() {
      const perPage = this.perPage
      const favoritesArray = []
      let currentPage = this.currentPage

      const favoritesResp = await this.$supabase
        .from('watch_list')
        .select('project_id, user_id')
        .eq('user_id', this.$auth.user.id)

      favoritesResp.data.forEach((element) => {
        favoritesArray.push(element.project_id)
      })

      const { count: totalCount } = await this.$supabase
        .from('watch_list')
        .select('*', { head: true, count: 'exact' })
        .eq('user_id', this.$auth.user.id)

      this.totalCount = totalCount

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
        .in('id', favoritesArray)
        .range(rangeStart, rangeEnd - 1)
        .then((response) => {
          if (response.error) {
            this.$toast.error('Something went wrong getting your watch list.')
          }
          if (response.data) {
            this.rows = response.data
          }
        })
        .catch((e) => console.log(e))
    }
  }
}
</script>