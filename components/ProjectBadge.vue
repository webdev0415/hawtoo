<template>
  <div class="box-border inline-flex items-center justify-center h-6 px-3 py-4 text-base leading-6 text-center duration-200 ease-in-out border border-gray-300 border-solid rounded-lg shadow-sm ">
    <!-- badge / icon -->
    <FontAwesome v-if="icon" class="mr-2 fa" :class="iconClass" :icon="icon" />

    <div class="badge-content" style="max-width: 400px;">
      <!-- badge / content -->
      <a v-if="link" :href="link" target="_blank" class="flex flex-row items-center">
        <slot></slot>
      </a>
      <span v-else class="flex flex-row items-center">
        <slot></slot>
      </span>
    </div>

    <!-- badge / copy button -->
    <button v-if="copyButton" v-tooltip="'Copy to clipboard'" v-clipboard="() => copyText" v-clipboard:success="clipboardSuccessHandler" v-clipboard:error="clipboardErrorHandler">
      <FontAwesome class="ml-2 cursor-pointer" :icon="['fal', 'copy']" />
    </button>
  </div>
</template>

<script>
export default {
  name: 'ProjectBadge',
  props: {
    link: {
      type: String,
      default: null
    },
    icon: {
      type: Array,
      default: null
    },
    iconClass: {
      type: String,
      default: null
    },
    copyButton: {
      type: Boolean,
      default: false
    },
    copyText: {
      type: String,
      default: null
    },
    copySuccessMessage: {
      type: String,
      default: 'Copied successfully!'
    },
    chainTitle: {
      type: String,
      default: null
    },
    chainAddress: {
      type: String,
      default: null
    },
    chainImage: {
      type: String,
      default: null
    }
  },

  data() {
    return {
      copyContent: null
    }
  },

  methods: {
    clipboardSuccessHandler() {
      this.$toast.open({
        message: `${this.copySuccessMessage} ✨`,
        type: 'success',
        position: 'top-right',
        duration: 2030234
      })
    },

    clipboardErrorHandler() {
      this.$toast.open({
        message: 'Something went wrong trying to copy this text 😮',
        type: 'error',
        position: 'top-right'
      })
    }
  }
}
</script>
