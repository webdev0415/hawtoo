<template>
  <section class="flex flex-row items-center justify-center w-full pt-4 font-sans text-black cursor-pointer">
    <ProjectSaveButton :data="data" />
    <ProjectShareButton :data="data" />
    <ProjectBuyButton :data="data" />
    <ProjectChartsButton v-if="data.type === 'coin'" :data="data" />
  </section>
</template>

<script>
import ProjectSaveButton from '@/components/Project/ProjectSaveButton'
import ProjectShareButton from '@/components/Project/ProjectShareButton'
import ProjectBuyButton from '@/components/Project/ProjectBuyButton'
import ProjectChartsButton from '@/components/Project/ProjectChartsButton'

export default {
  components: {
    ProjectSaveButton,
    ProjectShareButton,
    ProjectBuyButton,
    ProjectChartsButton
  },
  props: {
    data: {
      type: Object,
      required: true,
      default: () => {}
    }
  },
  mounted() {
    console.log(this.data)
  }
}
</script>