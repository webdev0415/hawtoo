<template>
  <div class="mx-auto w-full">
    <div class="relative flex items-start bg-white dark:bg-gray-900 dark:border-black border-2 border-gray-200 rounded text-gray-600 dark:text-white">
      <div class="px-12 py-8 pt-20 mx-4 text-center md:mx-0">
        <div class="absolute top-0 -mt-8 transform -translate-x-1/2 left-1/2">
          <svg class="absolute top-0 right-0 w-16 h-16 -mt-3 -mr-8 text-blue-500 dark:text-gray-600 fill-current" viewBox="0 0 64 64" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
            <path d="M37.89 58.338c-2.648-5.63-3.572-10.045-2.774-13.249.8-3.203 8.711-13.383 23.737-30.538l2.135.532c-6.552 10.033-10.532 17.87-11.939 23.515-.583 2.34.22 6.158 2.41 11.457l-13.57 8.283zm-26.963-6.56c-2.648-5.63-3.572-10.046-2.773-13.25.799-3.203 8.71-13.382 23.736-30.538l2.136.533c-6.552 10.032-10.532 17.87-11.94 23.515-.583 2.339.22 6.158 2.41 11.456l-13.57 8.283z"></path>
          </svg>
          <avatar :size="96" :size-badge="20" :fullname="fullName" :image="avatarUrl" />
        </div>
        <blockquote class="mb-4 text-xl font-medium ">
          <slot></slot>
        </blockquote>
        <cite class="block mb-1 text-lg not-italic font-bold ">{{ fullName }}</cite>
        <div class="">
          <span>{{ nameTitle }}</span>
          <span v-if="companyUrl"> - </span>
          <a v-if="externalUrl" :href="companyUrl" target="_blank" class="text-blue-600 hover:underline" style="outline: none;">{{ companyName }}</a>
          <router-link v-else :to="companyUrl" class="text-blue-600 hover:underline" style="outline: none;">{{ companyName }}</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  nmae: 'Testimonial',
  props: {
    fullName: {
      type: String,
      default: '',
      required: true
    },
    nameTitle: {
      type: String,
      default: '',
      required: false
    },
    companyName: {
      type: String,
      default: '',
      required: false
    },
    companyUrl: {
      type: String,
      default: '',
      required: false
    },
    avatarUrl: {
      type: String,
      default: '',
      required: false
    },
    externalUrl: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {}
  }
}
</script>