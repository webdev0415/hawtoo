<template>
  <div class="relative">
    <span class="absolute top-0 left-0 w-full h-full mt-1 ml-1 bg-blue-500 rounded-lg"></span>
    <nav aria-label="Sidebar" class="relative mt-2 bg-white border-2 border-blue-500 rounded-lg">
      <div class="max-w-2xl mx-auto ">
        <dl class="grid grid-cols-1 mt-5 overflow-hidden bg-white divide-y divide-gray-200 rounded-lg shadow md:grid-cols-2 md:divide-y-0 md:divide-x">
          <div v-for="(fld, index) in footerFields" :key="index" class="px-4 py-5 sm:p-6">
            <dt class="text-base font-normal " :class="fld.color">
              {{ fld.title }}
            </dt>
            <dd class="flex items-baseline justify-between mt-1 md:block lg:flex">
              <div class="flex items-baseline text-2xl font-semibold text-indigo-600">
                {{ fld.prefix }} {{ toFixed( stats[fld.field] ) }}
                <span class="ml-2 text-sm font-medium text-gray-500">
                  {{fld.suffix}}
                </span>
              </div>

              <!-- <div class="inline-flex items-baseline px-2.5 py-0.5 rounded-full text-sm font-medium bg-green-100 text-green-800 md:mt-2 lg:mt-0">
            <svg class="-ml-1 mr-0.5 flex-shrink-0 self-center h-5 w-5 text-green-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fill-rule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clip-rule="evenodd" />
            </svg>
            <span class="sr-only">
              Increased by
            </span>
            --%
          </div> -->
            </dd>
          </div>
        </dl>
      </div>
    </nav>
  </div>
</template>


<script>
export default {
  name: 'ProjectFooter',
  props: {
    stats: {
      type: Object,
      default: () => {},
      required: false
    }
  },
  data() {
    return {
      footerFields: [
        {
          title: 'Floor Price',
          field: 'floor_price',
          suffix: 'ETH',
          prefix: 'Ξ',
          color: 'text-violet-400'
        },
        {
          title: 'Market Cap',
          field: 'market_cap',
          suffix: 'ETH',
          prefix: 'Ξ',
          color: 'text-orange-500'
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
        },
        {
          title: 'Monthly price trend',
          field: 'thirty_day_average_price',
          suffix: 'ETH',
          prefix: 'Ξ',
          color: 'text-yellow-500'
        },
        {
          title: 'Total owners',
          field: 'num_owners',
          suffix: '',
          prefix: '',
          color: 'text-red-600'
        },
        {
          title: 'NFTs in collection',
          field: 'count',
          suffix: '',
          prefix: '',
          color: 'text-gray-900'
        },
        {
          title: 'Total sales',
          field: 'total_sales',
          suffix: '',
          prefix: '',
          color: 'text-red-600'
        }
      ]
    }
  },
  methods: {
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