<template>
  <Transition name="fade">
    <div v-if="showing" class="fixed inset-0 z-50 flex items-center justify-center w-full h-screen bg-modal" :class="customCSS.background" @click.self="closeIfShown">
      <div class="relative flex w-full max-h-screen p-6 m-2 bg-white shadow-lg cursor-auto rounded-3xl sm:p-8" :class="customCSS.modal">
        <button type="button" class="absolute flex items-center justify-center w-8 h-8 text-gray-400 bg-white rounded-full top-4 right-4 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" @click="open = false">
          <span class="sr-only">Close</span>
          <img src="~/assets/images/icons/close.svg" width="18" alt="Close">
        </button>
        <div class="w-full max-h-screen overflow-auto">
          <slot />
        </div>
      </div>
    </div>
  </Transition>
</template>

<script>
// Modals
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
        this.$emit('open')
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
  background-color: rgba(0, 0, 0, 0.25);
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