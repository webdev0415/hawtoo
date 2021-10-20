<template>
  <div class="w-full mb-5">
    <Loader v-if="$fetchState.pending" :width="512" :height="98" rounded :radius="8" animation="fade" />
    <div v-else>
      <div v-if="latestData && previousData">

        <dl class="grid grid-cols-1 text-center bg-white border border-gray-200 divide-y divide-gray-200 rounded-lg md:grid-cols-3 md:divide-y-0 md:divide-x">
          <div v-for="(stat, index) in stats" :key="index" class="px-4 py-2 text-center">
            <dt class="font-normal text-gray-900 text-md ">
              {{ stat.title }}
            </dt>
            <dd class="flex flex-col items-center justify-between mt-1 text-center md:block lg:flex">
              <div class="flex items-baseline text-xl font-semibold text-center text-indigo-600">
                <div v-if="stat.icon" class="flex flex-col items-center justify-center w-5 h-5 mr-1 overflow-hidden">
                  <img :src="stat.icon" height="24" width="24" class="object-contain h-5" />
                </div>
                {{ latestData[stat.field]  }}
              </div>
              <span v-if="stat.field in previousData && stat.field in latestData " v-tooltip="`${calculateDifference(previousData[stat.field], latestData[stat.field] )} compared to ${yesterdaysLatestFetchTime}`" class="text-sm font-medium text-center text-gray-500 ">
                from {{ stat.prefix }}{{ previousData[stat.field] }}
              </span>
            </dd>
          </div>
        </dl>
        <div v-if="latestFetchTime" class="w-full mt-1 text-xs text-center text-gray-400">
          Updated {{ latestFetchTime }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import dayjs from 'dayjs'
import Loader from '@/components/Site/Loader/SkeletonLoader'
import { getStatsBetweenDatesById } from '@/utils/useStats'
import { absoluteDifferenceBetween } from '@/utils/usePercentage'

const relativeTime = require('dayjs/plugin/relativeTime')
dayjs.extend(relativeTime)

export default {
  components: {
    Loader
  },
  props: {
    id: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      now: dayjs().startOf('day'),
      previousData: null,
      latestData: null,
      stats: [
        {
          title: 'Floor Price',
          field: 'floor_price',
          prefix: 'Ξ',
          icon: require('@/assets/images/icons/ethereum-icon.svg'),
          color: 'text-violet-400'
        },
        {
          title: 'Volume',
          field: 'volume_traded',
          prefix: 'Ξ',
          icon: require('@/assets/images/icons/ethereum-icon.svg'),
          color: 'text-violet-400'
        },
        {
          title: 'Owners',
          field: 'owners',
          prefix: '',
          icon: '',
          color: 'text-violet-400'
        }
      ]
    }
  },
  async fetch() {
    const id = this.id
    const tomorrow = this.now.add(1, 'day').toISOString()
    const yesterday = this.now.add(-1, 'day').toISOString()

    const { data: previousData } = await getStatsBetweenDatesById(
      id,
      yesterday,
      this.now
    )

    if (previousData.length > 0) {
      this.previousData = previousData[0]
    }

    const { data: latestData } = await getStatsBetweenDatesById(
      id,
      this.now,
      tomorrow
    )

    if (latestData.length > 0) {
      this.latestData = latestData[0]
    }
  },
  computed: {
    latestFetchTime() {
      if (this.latestData) return dayjs(this.latestData.created_at)
      return ''
    },
    yesterdaysLatestFetchTime() {
      if (this.previousData)
        return dayjs(this.previousData.created_at).fromNow()
      return ''
    }
  },
  methods: {
    calculateDifference(a, b) {
      return absoluteDifferenceBetween(a, b, { verbose: true })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>