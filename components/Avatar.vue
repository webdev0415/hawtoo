
<template>
  <div class="avatar">
    <svg v-if="verified" v-tooltip="verifiedTooltip" class="z-10 verified-badge" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" :style="styleBadge">
      <polygon fill="#42a5f5" points="29.62,3 33.053,8.308 39.367,8.624 39.686,14.937 44.997,18.367 42.116,23.995 45,29.62 39.692,33.053 39.376,39.367 33.063,39.686 29.633,44.997 24.005,42.116 18.38,45 14.947,39.692 8.633,39.376 8.314,33.063 3.003,29.633 5.884,24.005 3,18.38 8.308,14.947 8.624,8.633 14.937,8.314 18.367,3.003 23.995,5.884" />
      <polygon fill="#fff" points="21.396,31.255 14.899,24.76 17.021,22.639 21.428,27.046 30.996,17.772 33.084,19.926" />
    </svg>
    <div v-if="!hasImage" :style="style" class="flex items-center justify-center w-full text-center rounded-full bg-neutral-focus text-neutral-content">
      <span class="flex items-center justify-center w-full h-full">{{
        initials
      }}</span>
    </div>
    <div v-else :style="style" class="relative rounded-full avatar-wrap">
      <img class="rounded-full" :src=" `${image}`" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Avatar',
  props: {
    fullname: { type: String, default: '' },
    size: { type: Number, default: 48 },
    sizeBadge: { type: Number, default: 24 },
    color: { type: String, default: '' },
    image: { type: String, default: '' },
    verified: { type: Boolean, default: false },
    verifiedTooltip: { type: String, default: '' }
  },
  computed: {
    initials() {
      const words = this.fullname.split(/[\s-]+/)

      return words
        .map((word) => word.substr(0, 1))
        .join('')
        .substr(0, 3)
        .toUpperCase()
    },
    styleBadge() {
      return {
        width: this.sizeBadge + 'px',
        height: this.sizeBadge + 'px',
        position: 'absolute',
        top: '-5px',
        right: '-5px'
      }
    },
    style() {
      const fontSize = this.initials.length > 2 ? this.size / 3 : this.size / 2

      return {
        width: this.size + 'px',
        height: this.size + 'px',
        'font-size': fontSize + 'px',
        'background-color':
          this.color === '' ? this.toColor(this.fullname) : this.color
      }
    },
    hasImage() {
      return this.image !== ''
    }
  },
  methods: {
    toColor(str) {
      let hash = 0
      if (!str) {
        return 'black'
      }

      for (const char of str.split('')) {
        hash = (hash << (8 - hash)) + char.charCodeAt(0)
      }

      return '#' + Math.abs(hash).toString(16).substr(0, 6)
    }
  }
}
</script>

<style scoped>
.verified-badge {
  z-index: 20;
}
.avatar-wrap {
  overflow: hidden !important;
  transition: transform 500ms ease-out;
}
.avatar-wrap::before {
  content: '';
  background: rgba(255, 255, 255, 0.4);
  width: 60%;
  height: 100%;
  top: 0%;
  left: -125%;
  transform: skew(45deg);
  position: absolute;
  z-index: 10;
  transition: left 500ms ease-out;
}
.avatar-wrap:hover::before {
  left: 150%;
}
.avatar > div {
  overflow: initial;
}
</style>



