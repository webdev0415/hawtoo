<template>
  <Transition name="fade">
    <div v-if="showing" class="fixed inset-0 z-50 flex items-center justify-center w-full h-screen bg-modal" :class="customCSS.background" @click.self="closeIfShown">
      <div class="relative flex w-full max-h-screen p-6 m-2 bg-white shadow-lg rounded-xl sm:p-8" :class="customCSS.modal">
        <button v-if="showClose" aria-label="close" class="absolute top-0 right-0 mx-4 my-2 text-xl text-gray-500" :class="customCSS.close" @click.prevent="close">
          <img src="~/assets/images/icons/close.svg" alt="Close">
        </button>
        <div class="w-full max-h-screen overflow-auto">
          <slot />
        </div>
      </div>
    </div>
  </Transition>
</template>

<script>
export default {
  props: {
    showing: {
      required: true,
      type: Boolean
    },
    showClose: {
      type: Boolean,
      default: true
    },
    allowEsc: {
      type: Boolean,
      default: true
    },
    backgroundClose: {
      type: Boolean,
      default: true
    },
    css: {
      type: Object,
      required: false,
      default: () => {}
    }
  },
  computed: {
    customCSS() {
      return {
        ...{
          background: '',
          modal: '',
          close: ''
        },
        ...this.css
      }
    }
  },
  watch: {
    $route() {
      this.close()
    },
    showing(value) {
      if (value) {
        return document.querySelector('body').classList.add('overflow-hidden')
      }
      return document.querySelector('body').classList.remove('overflow-hidden')
    }
  },
  mounted() {
    if (this.showClose && this.allowEsc) {
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
          this.close()
        }
      })
    }
  },
  methods: {
    close() {
      document.querySelector('body').classList.remove('overflow-hidden')
      this.$emit('close')
    },
    closeIfShown() {
      if (this.showClose && this.backgroundClose) {
        this.close()
      }
    }
  }
}
</script>

<style scoped>
.bg-modal {
  background-color: rgba(0, 0, 0, 0.75);
}
.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>