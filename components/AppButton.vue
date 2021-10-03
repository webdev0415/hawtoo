<script>
/**
 * Modelled version of:
 * @see: https://dev.to/abhisheksarmah/creating-a-button-component-using-vue-and-tailwindcss-ico
 *
 * ## PROPS ##
 * variant	-> String -> Color scheme of the button	primary, danger, success, warning, secondary
 * variant -> String -> Normal button or ghost button	normal, outline
 * rounded	-> String -> border radius of the button	medium, large
 * size	-> String -> padding of the button	normal, small

 * ## METHODS ##
 * startLoading -> start loading state of the button
 * stopLoading -> stop loading state of the button

 * ## NOTES ##
 * Only primary, danger and success variant accepts a disabled prop.
 * secondary variant is only available for outline button.
*/

export default {
  name: 'AppButton',
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    variant: {
      type: String,
      default: 'primary'
    },
    variantType: {
      type: String,
      default: 'normal'
    },
    size: {
      type: String,
      default: 'normal'
    },
    href: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: ''
    },
    to: {
      type: String,
      default: ''
    }
  },

  data() {
    return {
      loading: false,
      disableButton: this.disabled
    }
  },

  computed: {
    btnClass() {
      return {
        'base-spinner': this.loading === true,
        'cursor-not-allowed': this.disableButton === true,
        'btn base-button': true,

        'px-8 py-3 md:px-10 md:py-4': this.size === 'large',
        'px-8 py-3': this.size === 'normal',
        'px-6 py-2': this.size === 'small',
        'px-4 py-1 text-xs': this.size === 'tiny'
      }
    },

    // eslint-disable-next-line
    colorVariants() {
      switch (this.variant) {
        case 'primary':
          switch (this.variantType) {
            case 'normal':
              switch (this.disableButton) {
                case true:
                  return 'border-blue-300 bg-blue-300 text-white'

                default:
                  break
              }
              return 'bg-blue-500 hover:bg-blue-600 text-white'

            case 'outline':
              return 'border-gray-200 hover:border-gray-200 text-gray-500'

            default:
              break
          }
          break

        case 'danger':
          switch (this.variantType) {
            case 'normal':
              switch (this.disableButton) {
                case true:
                  return 'border-red-300 bg-red-300 text-white'

                default:
                  break
              }
              return 'border-red-600 bg-red-600 hover:bg-red-700 hover:border-red-700 text-white'

            case 'outline':
              return 'border-gray-200 text-red-500 hover:text-red-600'

            default:
              break
          }
          break

        case 'warning':
          switch (this.variantType) {
            case 'normal':
              return 'border-orange-600 bg-orange-600 hover:bg-orange-700 hover:border-orange-700 text-white'

            default:
              break
          }
          break

        case 'success':
          switch (this.variantType) {
            case 'normal':
              switch (this.disableButton) {
                case true:
                  return 'border-green-300 bg-green-300 text-white'

                default:
                  break
              }
              return 'border-green-600 bg-green-600 hover:bg-green-700 hover:border-green-700 text-white'

            case 'outline':
              return 'border-2 border-gray-200 text-green-500 hover:text-green-700'

            default:
              break
          }
          break

        case 'white':
          switch (this.variantType) {
            case 'normal':
              return 'border-white bg-white text-blue-600 hover:text-blue-800'

            default:
              break
          }
          break

        case 'secondary':
          switch (this.variantType) {
            case 'outline':
              return 'border-gray-400 dark:border-white dark:text-white text-gray-600 hover:text-blue-500'

            default:
              break
          }
          break

        case 'outline':
          return 'border-gray-500 text-gray-500 hover:border-gray-500 hover:text-gray-600'

        default:
          break
      }
    }
  },

  methods: {
    startLoading() {
      this.loading = true
      this.disableButton = true
    },
    stopLoading() {
      this.loading = false
      this.disableButton = false
    }
  }
}
</script>

<template>
  <component :is="to ? 'nuxt-link' : href ? 'a' : 'button'" :to="to" :type="type" :disabled="disableButton" :class="[btnClass, colorVariants]" :variant="variant" :variant-type="variantType" :size="size" :href="to" v-on="$listeners">
    <slot />
  </component>
</template>
