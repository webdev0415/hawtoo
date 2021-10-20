<template>
  <Loader v-if="$fetchState.pending" :width="80" :height="20" rounded :radius="8" animation="fade" />
  <dl v-else class="flex flex-row gap-4">
    <div v-for="(stat, index) in stats" :key="index" class="overflow-hidden">
      <dd class="flex flex-row items-center mt-1 text-xl font-semibold text-gray-900">
        <div class="flex flex-col items-center justify-center w-5 h-5 mr-1 overflow-hidden">
          <img v-if="stat.icon" :src="stat.icon" height="24" width="24" class="object-contain h-5" />
        </div>
        <span v-if="data[stat.field]">{{ data[stat.field] }}</span>
      </dd>
      <dt class="text-sm font-medium text-right text-gray-500 truncate">
        {{stat.title}}
      </dt>
    </div>
  </dl>
</template>

<script>
import { getStatsById } from '@/utils/useStats'
import Loader from '@/components/Site/Loader/SkeletonLoader'

export default {
  components: {
    Loader
  },
  props: {
    id: {
      type: Number,
      required: true
    },
    color: {
      type: String,
      required: false,
      default: 'text-gray-900'
    }
  },
  data() {
    return {
      data: () => {},
      fetchDelay: 200,
      stats: [
        {
          title: 'Floor Price',
          field: 'floor_price',
          suffix: 'ETH',
          icon: require('@/assets/images/icons/ethereum-icon.svg'),
          color: 'text-violet-400'
        },
        {
          title: 'Volume',
          field: 'volume_traded',
          suffix: 'ETH',
          icon: require('@/assets/images/icons/ethereum-icon.svg'),
          color: 'text-violet-400'
        }
      ]
    }
  },
  async fetch() {
    try {
      await getStatsById(this.id).then(({ data, error }) => {
        if (error) {
          throw new Error(error)
        }
        if (data) {
          this.data = data[0]
        }
      })
    } catch (e) {
      throw new Error(e.message)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>