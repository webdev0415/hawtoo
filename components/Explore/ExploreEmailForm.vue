<template>

  <section class="relative py-20 overflow-hidden 2xl:py-30" :class="customCSS.wrapper">

    <div class="absolute top-0 left-0 hidden lg:block -ml-96 mt-80 opacity-40">
      <svg width="914" height="914" viewBox="0 0 914 914" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="457" cy="457" r="456.5" stroke="#000000" />
      </svg>
    </div>

    <div class="container relative px-4 mx-auto">
      <div class="max-w-3xl mx-auto text-center">
        <h2 class="mb-4 text-4xl font-bold lg:text-5xl font-heading" :class="customCSS.heading">Join the newsletter!</h2>
        <p class="max-w-xl mx-auto mb-6 text-xl" :class="customCSS.subheading">In general, dignissim accumsan, lacus vel dictum semper, ipsum justo fermentum ex, sagittis sollicitudin.</p>
        <div class="max-w-xl mx-auto mb-2">
          <EmailForm :css="customCSS.button" />
        </div>
        <p class="text-gray-300">
          <span>1-click unsubscribe and no spam</span>
        </p>
      </div>
    </div>
  </section>

</template>

<script>
export default {
  props: {
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
          wrapper: 'bg-gray-800',
          heading: 'text-white',
          subheading: 'text-violet-100',
          button: ''
        },
        ...this.css
      }
    }
  }
}
</script>