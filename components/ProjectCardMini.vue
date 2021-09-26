<template>
  <div class="box-border flex flex-row items-center flex-auto flex-shrink-0 max-w-full min-w-0 min-h-0 p-0 m-0 leading-6 text-black border-0 border-black border-solid outline-none dark:text-white">
    <div v-if="index" class="box-border flex flex-col items-stretch flex-shrink-0 max-w-full p-0 mx-4 my-0 border-0 border-black border-solid" style="min-width:20px">
      <span class="box-border p-0 m-0 text-base text-gray-600 border-0" style="outline: none;">{{ index }}</span>
    </div>
    <div class="box-border flex flex-col items-stretch flex-shrink-0 w-12 h-12 max-w-full p-0 m-0 border-0 border-black border-solid">
      <NuxtLink :to="'/@' + data.slug" class="box-border p-0 m-0 text-blue-600 no-underline bg-transparent border-0" style="outline: none;">
        <avatar v-if="hasLoaded" :verified="data.verified" :fullname="data.name" :color="data.avatar_color" :image="avatarUrl" />
      </NuxtLink>
    </div>
    <div class="box-border flex flex-col items-stretch flex-auto max-w-full p-0 my-0 ml-4 mr-0 border-0 border-black border-solid" style="outline: none; min-height: 0px; min-width: 0px;">
      <NuxtLink :to="'/@' + data.slug" class="box-border max-w-full p-0 m-0 no-underline truncate bg-transparent border-0" style="outline: none; transition: all 0.12s ease-in-out 0s;">
        <span class="box-border p-0 m-0 text-sm font-black leading-5 whitespace-no-wrap border-0 cursor-pointer" style="outline: none;">
          {{ data.name }}
        </span>
      </NuxtLink>
      <span class="box-border p-0 m-0 text-sm leading-5 text-gray-600 border-0" style="outline: none;">
        <div class="box-border inline-flex items-center justify-center h-4 px-1 text-xs leading-5 text-center uppercase transition duration-200 ease-in-out bg-blue-200 border border-transparent border-solid rounded-full dark:bg-gray-700 dark:text-white ">
          {{ chainAbbrevation }}
        </div>
        <div class="box-border inline-flex items-center justify-center h-4 px-1 text-xs leading-5 text-center uppercase transition duration-200 ease-in-out bg-blue-200 border border-transparent border-solid rounded-full dark:bg-gray-700 dark:text-white ">
          {{ data.type }}
        </div>
      </span>
    </div>
  </div>
</template>

<script>
import helper from '@/utils/projectsHelpers.js'

export default {
  nmae: 'ProjectCardMini',
  props: {
    data: {
      type: Object,
      default: () => {},
      required: true
    },
    index: {
      type: Number,
      default: null,
      required: false
    },
    hasLoaded: {
      type: Boolean,
      default: false,
      required: false
    }
  },
  data() {
    return {
      avatarUrl: ''
    }
  },
  computed: {
    chainAbbrevation() {
      if (!this.data.chain) return null
      const chainAbbr = helper.createChainAbbrevation()
      return chainAbbr[this.data.chain]
    }
  },
  created() {
    if ('avatar_name' in this.data && this.data.avatar_name) {
      this.getAvatar(this.data.avatar_name)
    }
  },
  methods: {
    async getAvatar() {
      const avatarUrlResp = await this.$supabase.storage
        .from('public')
        .getPublicUrl(this.data.avatar_name)

      this.avatarUrl = avatarUrlResp.data.publicURL
    }
  }
}
</script>