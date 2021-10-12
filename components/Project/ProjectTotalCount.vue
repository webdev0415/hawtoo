<template>
  <Loader v-if="$fetchState.pending" :width="200" :height="34" rounded :radius="100" animation="fade" />
  <div v-else class="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-full shadow-sm text-red-800 bg-red-50 ">
    <span v-if="emoji" class="inline-block mr-1">{{emoji}}</span> Added to
    <span class="inline-block mx-1">
      <number ref="number1" :from="0" :to="countTo" :format="theFormat" :duration="5" :delay="1" easing="Power1.easeOut" />
    </span> watchlists
  </div>
</template>

<script>
import Loader from '@/components/Site/Loader/SkeletonLoader'
import { abbreviateNumber, round } from '@/utils/numbers'
import { getWatchlistCountByProjectId } from '@/utils/supabase/watchlists'

export default {
  components: {
    Loader
  },
  props: {
    id: {
      type: Number,
      default: 0,
      required: true
    }
  },
  data() {
    return {
      countTo: 0,
      emoji: ''
    }
  },
  async fetch() {
    try {
      await getWatchlistCountByProjectId(this.id).then(({ count, error }) => {
        if (error) {
          throw new Error(error)
        }
        if (count) {
          this.countTo = count
        }
      })
    } catch (e) {
      throw new Error(e.message)
    }
  },
  watch: {
    countTo(val) {
      if (val >= 50) {
        this.emoji = '✨'
      }
      if (val >= 100) {
        this.emoji = '👀'
      }
      if (val >= 200) {
        this.emoji = '🔥'
      }
    }
  },
  methods: {
    theFormat(number) {
      return abbreviateNumber(round(number))
    }
  }
}
</script>

<style lang="scss" scoped>
</style>