<template>
  <section class="py-16">
    <ClientOnly>
      <VueSlickCarousel v-if="projects.length" v-bind="slickOptions">
        <div v-for="project in projects" :key="project.id">
          <ProjectCard :data="project" :has-loaded="true" class="m-6" />
        </div>
      </VueSlickCarousel>
    </ClientOnly>
  </section>
</template>

<script>
import ProjectCard from '@/components/ProjectCard'

export default {
  components: {
    ProjectCard
  },
  data() {
    return {
      projects: {},
      slickOptions: {
        arrows: false,
        dots: false,
        infinite: true,
        slidesToShow: 5,
        slidesToScroll: 1,
        autoplay: true,
        speed: 7000,
        autoplaySpeed: 10,
        cssEase: 'linear',
        pauseOnFocus: true,
        pauseOnHover: true,
        responsive: [
          {
            breakpoint: 1400,
            settings: {
              slidesToShow: 4,
              infinite: true,
              dots: true
            }
          },
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 3,
              infinite: true,
              dots: true
            }
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 2,
              initialSlide: 2
            }
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1
            }
          }
        ]
      }
    }
  },
  async fetch() {
    const { data, error } = await this.$supabase.from('projects').select('*')
    if (error) {
      //   this.$nuxt.error(error)
      console.log(error)
    }
    if (data) {
      this.projects = data
    }

    console.log(this.projects)
  }
}
</script>

<style scoped>
.slick-list {
  overflow: inherit !important;
}
.carousel-wrapper {
  padding: 40px;
}
</style>
