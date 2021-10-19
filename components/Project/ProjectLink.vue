<template>
  <a :href="data.url" target="_blank" rel="noopener noreferer" :title="data.name" class="flex items-center px-2 py-2 text-lg font-medium text-gray-800 rounded-md hover:bg-gray-200 hover:text-gray-900 group">
    <div v-if="icon" class="flex items-center justify-start w-5 h-5 mr-2 ">
      <FontAwesome v-if="icon && icon.type" :icon="icon.type" :style="{ color: icon.color }" />
      <img v-else :src="icon" height="16" width="16" class="inline-block" alt="icon">
    </div>
    {{ data.name }}
  </a>
</template>

<script>
import { faGlobe } from '@fortawesome/pro-light-svg-icons'
import {
  faDiscord,
  faTwitter,
  faMedium,
  faInstagram,
  faTelegram,
  faYoutubeSquare,
  faReddit,
  faTwitch
} from '@fortawesome/free-brands-svg-icons'

export default {
  props: {
    data: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    icon() {
      switch (this.data.name) {
        case 'Official website':
          return { type: faGlobe, color: 'inherit' }
        case 'Discord':
          return { type: faDiscord, color: '#5663F7' }
        case 'Twitter':
          return { type: faTwitter, color: '#1DA1F2' }
        case 'Medium':
          return { type: faMedium, color: '#000000' }
        case 'Instagram':
          return { type: faInstagram, color: '#C13584' }
        case 'YouTube':
          return { type: faYoutubeSquare, color: '#FF0000' }
        case 'Telegram':
          return { type: faTelegram, color: '#0088CC' }
        case 'Reddit':
          return { type: faReddit, color: '#FF4500' }
        case 'Twitch':
          return { type: faTwitch, color: '#6441a5' }
        case 'OpenSea':
          return require('@/assets/images/icons/opensea-icon.svg')
        case 'rarity.tools':
          return require('@/assets/images/icons/raritytools-icon.svg')
        case 'RarityMon':
          return require('@/assets/images/icons/raritymon-icon.png')
        default:
          return ''
      }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>