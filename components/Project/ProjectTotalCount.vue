<template>
  <Loader v-if="$fetchState.pending" :width="160" :height="loaderHeight" rounded :radius="100" animation="fade" />
  <div v-else :class="badgeClasses">
    <client-only>
      <span v-if="emoji" class="inline-block mr-1">{{emoji}}</span>

      <span v-if="animated" class="inline-block mx-1">
        On
        <number ref="number1" :from="0" :to="countTo" :format="theFormat" :duration="5" :delay="1" easing="Power1.easeOut" /> watchlists
      </span>

      <span v-else class="inline-block">
        On {{ totalCount }} watchlists
      </span>
    </client-only>
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
    },
    animated: {
      type: Boolean,
      default: true
    },
    type: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      countTo: 0,
      emoji: '',
      compClasses: ''
    }
  },
  fetchDelay: 100,
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
  computed: {
    totalCount() {
      return abbreviateNumber(round(this.countTo))
    },
    badgeClasses() {
      if (this.type === 'empty') {
        return ''
      }
      return 'inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-full shadow-sm text-red-800 bg-red-50'
    },
    loaderHeight() {
      switch (this.type) {
        case 'empty':
          return '14'

        default:
          return '36'
      }
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