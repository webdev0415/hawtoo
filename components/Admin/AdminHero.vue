<template>
  <section class="relative w-full px-6 py-12">
    <div class="max-w-[1440px]  mx-auto w-full">
      <div class="gradient mx-auto overflow-hidden px-6 md:px-0 flex flex-col pt-[41px] pb-[33px] md:pb-[49px] md:pt-[40px] md:mt-md rounded-xl lg:items-center lg:flex-row">
        <h2 class="md:hidden text-[32px] leading-9 text-white text-center max-w-2xl md:mx-8 mx-auto">
          A single source of truth for all your important links.
        </h2>

        <div class="md:max-w-[620px] md:ml-8 lg:ml-20 mt-10 md:mt-0 md:mr-10">
          <ProjectLinkInBio :data="project" :has-loaded="hasLoaded" />
        </div>

        <div class="text-center md:max-w-lg d: px-7 md:pl-6 md:py-5 lg:pl-0 md:text-left">
          <h2 class=" lg:text-5xl md:text-4xl text-3xl font-bold leading-[60px]  hidden md:block text-white">A single source of truth for all your important links.</h2>
          <p class="leading-[25px] text-[18px] md:pt-6 md:text-2xl text-white">Let investors easily find links to your most important blabla some other text here you know what i mean..</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
// md:-ml-16 lg:-ml-24
export default {
  props: {
    project: {
      type: Object,
      default: () => {}
    },
    hasLoaded: {
      type: Boolean,
      default: false
    }
  }
}
</script>
<style scoped>
.gradient {
  background-color: #622aff !important;
  background: linear-gradient(45deg, #622aff, #dd04d1);
}
</style>
