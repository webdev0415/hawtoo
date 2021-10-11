<template>
  <Transition name="fade">
    <div v-if="isOpen" role="combobox" aria-haspopup="listbox" aria-expanded="true" class="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24">
      <div class="fixed inset-0 w-full h-screen transition-opacity bg-modal" @click.self="closeIfShown"></div>
      <div class="relative w-full max-w-lg px-4 transition-all transform">
        <div class="bg-white rounded-lg shadow-md">
          <InputSearch />
        </div>
      </div>
    </div>
  </Transition>
</template>

<script>
import hotkeys from 'hotkeys-js'

import { mapGetters, mapMutations } from 'vuex'
import InputSearch from '@/components/InputSearch'

export default {
  components: {
    InputSearch
  },
  data() {
    return {
      isOpen: false
    }
  },
  computed: {
    ...mapGetters({
      getSearchmodal: 'general/searchModal'
    })
  },
  watch: {
    $route() {
      this.closeModal()
    },
    isOpen(value) {
      if (value) {
        return document
          .querySelector('body')
          .classList.add('overflow-hidden', 'modal-open')
      }
      return document
        .querySelector('body')
        .classList.remove('overflow-hidden', 'modal-open')
    }
  },
  mounted() {
    const vm = this
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.closeModal()
      }
    })
    hotkeys('cmd+k, ctrl+r', (event, handler) => {
      event.preventDefault()
      // Prevent the default refresh event under WINDOWS system
      vm.openModal()
    })
  },
  methods: {
    ...mapMutations({
      toggleSearchModal: 'general/TOGGLE_SEARCH_MODAL'
    }),

    closeModal() {
      this.isOpen = false
    },

    openModal() {
      this.isOpen = true
    },

    closeIfShown() {
      this.closeModal()
    }
  }
}
</script>

<style scoped>
.modal-open {
  padding-right: 13px;
}
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