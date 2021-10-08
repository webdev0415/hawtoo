<template>
  <div class="flex items-start justify-center h-screen min-h-screen px-2 bg-gray-100">
    <section>
      <div class="container py-12">
        <div class="max-w-2xl mx-auto">
          <div class="flex flex-col items-center justify-center px-10 py-16 bg-white shadow-md ">

            <h2 class="mb-2">Enter OpenSea slug </h2>

            <div v-if="errorMessage" class="p-4 rounded-md bg-red-50">
              <div class="flex">
                <div class="flex-shrink-0">
                  <!-- Heroicon name: solid/information-circle -->
                  <svg class="w-5 h-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" />
                  </svg>
                </div>
                <div class="flex-1 ml-3 md:flex md:justify-between">
                  <p class="text-sm text-red-700">
                    {{ errorMessage }}
                  </p>
                </div>
              </div>
            </div>

            <form class="mt-4 mb-8 sm:flex">
              <label for="opensea-slug" class="sr-only">OpenSea slug</label>
              <input id="opensea-slug" v-model="slug" autofocus name="text" type="text" autocomplete="off" required="true" class="w-full px-5 py-3 placeholder-gray-500 border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs" placeholder="Enter OpenSea slug">
              <div class="mt-3 rounded-md shadow sm:mt-0 sm:ml-3 sm:flex-shrink-0">
                <button type="submit" class="inline-flex items-center px-5 py-3 text-base font-medium leading-6 text-white transition duration-150 ease-in-out bg-gray-900 border border-transparent rounded-md hover:bg-gray-700 focus:border-gray-700 active:bg-gray-700" :disabled="loading" @click="searchOpenSea">
                  <svg v-if="loading" class="w-5 h-5 mr-3 -ml-1 text-white animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Check OpenSea
                </button>
              </div>
            </form>

            <div v-if="found" class="flex flex-col items-center w-full">
              <h3 class="mb-2 text-xl">Here's what we found. Looks good?</h3>

              <!-- no contract address -->
              <div v-if="noAddress" class="w-full max-w-md p-4 my-3 bg-gray-100 rounded-md shadow">
                <p class="mb-1 text-sm text-center text-red-700">
                  🚨 No contract address was found. Please manually supply it.
                </p>
                <input v-model="contractAddress" name="text" type="text" autocomplete="off" class="w-full px-5 py-3 placeholder-gray-500 border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500" :placeholder="`Enter ${slug} contract address`">
              </div>

              <!-- additional checkboxes -->
              <div class="max-w-md p-4 my-3 bg-gray-100 rounded-md shadow">
                <fieldset class="mt-5 mb-5">
                  <legend class="sr-only">Notifications</legend>
                  <div class="relative flex items-start">
                    <div class="flex items-center h-5">
                      <input v-model="verified" name="verified" type="checkbox" class="w-6 h-6 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500">
                    </div>
                    <div class="ml-3 text-md">
                      <label for="comments" class="font-medium text-gray-700">Verify this project</label>
                      <p class="text-gray-500">Only tick this box when a payment has been confirmed</p>
                    </div>
                  </div>
                </fieldset>
                <fieldset class="mt-5 mb-5">
                  <legend class="sr-only">Notifications</legend>
                  <div class="">
                    <p class="mb-2 text-gray-500">Select tags</p>
                    <VSelect v-model="selectedTags" multiple placeholder="Choose up to 3 tags!" :selectable="() => selectedTags.length < 3" :options="tagOptions"></VSelect>
                  </div>
                </fieldset>
              </div>

              <!--- submit the data --->
              <div class="inline-flex my-2">
                <button type="button" class="inline-flex items-center px-5 py-3 text-base font-medium leading-6 text-white transition duration-150 ease-in-out bg-blue-600 border border-transparent rounded-md hover:bg-blue-500 focus:border-blue-700 active:bg-blue-700" :disabled="loading" @click="submit">
                  <svg v-if="loading" class="w-5 h-5 mr-3 -ml-1 text-white animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Submit to database
                </button>
                <button type="button" class="inline-flex items-center px-5 py-3 ml-3 text-base font-medium leading-6 text-white transition duration-150 ease-in-out bg-red-600 border border-transparent rounded-md hover:bg-red-500 focus:border-red-700 active:bg-red-700" :disabled="loading" @click="reset">
                  <svg v-if="loading" class="w-5 h-5 mr-3 -ml-1 text-white animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Cancel
                </button>
              </div>

              <!-- data found -->
              <pre class="w-full code"><code>{{ foundData }}</code></pre>
            </div>

            <div v-if="!found" class="p-4 border-2 border-red-300 border-dotted">
              <p class="mb-2 text-md">Your slug should look like this</p>
              <div class="flex mt-1 rounded-md shadow-sm">
                <span class="inline-flex items-center px-3 text-gray-500 border border-r-0 border-gray-300 bg-gray-50 rounded-l-md sm:text-sm">
                  https://opensea.io/collections/
                </span>
                <input type="text" name="url" placeholder="cyberkongz 👈" disabled class="flex-grow block w-full min-w-0 border-gray-300 rounded-none focus:ring-sky-500 focus:border-sky-500 rounded-r-md sm:text-sm" :value="slug">
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import Vue from 'vue'
import vSelect from 'vue-select'
import { decode } from 'base64-arraybuffer'
import slugify from 'slugify'
import randomcolor from 'randomcolor'
import { getOpenSeaBasicInfo } from '@/utils/opensea'
import 'vue-select/dist/vue-select.css'
const strip = require('strip-markdown')
const remark = require('remark')

Vue.component('VSelect', vSelect)

export default {
  layout: 'empty',
  data: () => ({
    slug: '',
    loading: false,
    foundData: null,
    errorMessage: '',
    found: false,
    verified: false,
    projectNameSlug: '',
    blobbedImage: null,
    noAddress: true,
    contractAddress: '',
    tagOptions: ['test', 'test2', 'test3', 'test4'],
    selectedTags: []
  }),
  async mounted() {
    const { data, error } = await this.$supabase.from('tags').select('id, name')
    const tagArray = []

    if (error) {
      this.$toast.error(error.message.detail)
    }

    if (data) {
      data.forEach((element) => {
        tagArray.push({ label: element.name, id: element.id })
      })

      this.tagOptions = tagArray
    }
  },
  methods: {
    searchOpenSea() {
      this.loading = true
      this.errorMessage = null
      setTimeout(() => {
        this.opensea(this.slug)
      }, 500)
    },

    submit() {
      this.handleSubmit()
    },

    async handleSubmit() {
      if (this.noAddress && !this.contractAddress) {
        this.errorMessage = 'Please provide the missing contract address'
        return
      }

      const payload = {}
      const formData = this.foundData
      const projectTags = []

      this.projectNameSlug = slugify(formData.name, {
        replacement: '-',
        lower: true,
        strict: true
      })

      remark()
        .use(strip)
        .process(formData.description, function (err, file) {
          if (err) throw err
          payload.description = String(file)
        })

      if (this.selectedTags) {
        this.selectedTags.forEach((tag) => {
          projectTags.push(tag.id)
        })

        payload.tags = projectTags
      }

      payload.contract_address = formData.contractAddress
        ? formData.contractAddress
        : this.contractAddress

      payload.slug = this.projectNameSlug
      payload.name = formData.name
      payload.verified = this.verified
      payload.current_price = formData.floorPrice
      payload.symbol = formData.symbol
      payload.sales_stats = [formData.stats]
      payload.socials = []
      payload.sites = []
      payload.marketplaces = []
      payload.type = 'nft'
      payload.chain = 'ethereum'
      payload.author_id = this.$auth.user.id
      payload.avatar_color = randomcolor({
        luminosity: 'bright',
        format: 'rgb'
      })

      payload.marketplaces.push({
        name: 'OpenSea',
        slug: formData.slug
      })

      if (formData.social.discord) {
        payload.socials.push({
          url: `${formData.social.discord}`,
          name: 'Discord'
        })
      }

      if (formData.social.twiter) {
        payload.socials.push({
          url: `https://twitter.com/${formData.social.twitter}`,
          name: 'Twitter'
        })
      }

      if (formData.social.medium) {
        payload.socials.push({
          url: `https://medium.com/@${formData.social.medium}`,
          name: 'Medium'
        })
      }

      if (formData.social.instagram) {
        payload.socials.push({
          url: `https://instagram.com/${formData.social.instagram}`,
          name: 'Instagram'
        })
      }

      if (formData.social.telegram) {
        payload.socials.push({
          url: `${formData.social.telegram}`,
          name: 'Telegram'
        })
      }

      if (formData.social.wiki) {
        payload.socials.push({
          url: `${formData.social.wiki}`,
          name: 'Wiki'
        })
      }

      if (formData.social.website) {
        payload.sites.push({
          url: `${formData.social.website}`,
          name: 'Official website'
        })
      }

      /** Handle avatar image  */
      const avatarBlob = await this.getBase64(formData.imageUrl)
      await this.handleAvatarUpload(avatarBlob).then((response) => {
        payload.avatar_name = response
      })

      /** Handle banner image  */
      const bannerImageBlob = await this.getBase64(formData.bannerImageUrl)
      await this.handleBannerUpload(bannerImageBlob).then((response) => {
        payload.banner_name = response
      })

      console.log('--- FINAL PAYLOAD ---')
      console.log(payload)

      /** Upload he payload  */
      const { data, error } = await this.$supabase
        .from('projects')
        .upsert([{ ...payload }])

      if (data) {
        this.$toast.open({
          message: `Saved! <span class="ml-1 underline">View ></span>`,
          type: 'info',
          onClick: () => {
            this.$router.push({
              path: `/@${this.projectNameSlug}`
            })
          },
          position: 'top'
        })
        this.reset()
      }

      if (error) {
        this.$toast.open({
          message: `${this.slug} was successfully submitted`,
          type: 'info',
          position: 'top'
        })
        this.$toast.error(error.message)
      }
    },

    /**
     * Handles the avatar file uploads.
     * Gets fired before `handleSubmit()`
     */
    async handleAvatarUpload(blob) {
      const bucketName = 'public'
      const projectSlug = this.projectNameSlug
      const time = new Date().getTime()
      const finalFileName = `avatars/projects/${projectSlug}-${time}`

      const { data, error } = await this.$supabase.storage
        .from(bucketName)
        .upload(finalFileName, decode(blob), {
          contentType: 'image/png'
        })

      if (error) {
        this.$toast.error('Something went wrong uploading the avatar')
        this.reset()
        return error
      }

      if (data) {
        return finalFileName
      }
    },

    /**
     * Handles the avatar file uploads.
     * Gets fired before `handleSubmit()`
     */
    async handleBannerUpload(blob) {
      const bucketName = 'public'
      const projectSlug = this.projectNameSlug
      const time = new Date().getTime()
      const finalFileName = `banners/projects/${projectSlug}-banner-${time}`

      const { data, error } = await this.$supabase.storage
        .from(bucketName)
        .upload(finalFileName, decode(blob), {
          contentType: 'image/png'
        })

      if (error) {
        this.$toast.error('Something went wrong uploading the banner')
        this.reset()
        return error
      }

      if (data) {
        return finalFileName
      }
    },

    reset() {
      this.foundData = null
      this.loading = false
      this.found = false
      this.errorMessage = null
      this.slug = ''
      this.noAddress = false
    },

    async opensea(slug) {
      try {
        await getOpenSeaBasicInfo(slug).then((response) => {
          this.found = true

          if (response.contractAddress) {
            this.noAddress = false
          } else {
            this.noAddress = true
          }
          this.foundData = response
        })
      } catch (e) {
        this.$toast.error(`Error: ${e.message}`)
        if (e.message.includes('404')) {
          this.errorMessage = 'This collection was not found on OpenSea.'
        }
      } finally {
        this.loading = false
      }
    },

    async getBase64(url) {
      return await this.$axios
        .get(url, {
          responseType: 'arraybuffer'
        })
        .then((response) =>
          Buffer.from(response.data, 'binary').toString('base64')
        )
    },
    toDataUrl(url, callback) {
      const xhr = new XMLHttpRequest()
      xhr.onload = function () {
        const reader = new FileReader()
        reader.onloadend = function () {
          callback(reader.result)
        }
        reader.readAsDataURL(xhr.response)
      }
      xhr.open('GET', url)
      xhr.responseType = 'blob'
      xhr.send()
    }
  }
}
</script>

<style scoped>
pre {
  background: #333;
  white-space: pre;
  word-wrap: break-word;
  overflow: auto;
}
pre.code {
  margin: 20px 25px;
  border-radius: 4px;
  border: 1px solid #292929;
  position: relative;
}
pre.code label {
  font-family: sans-serif;
  font-weight: bold;
  font-size: 13px;
  color: #ddd;
  position: absolute;
  left: 1px;
  top: 15px;
  text-align: center;
  width: 60px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  pointer-events: none;
}
pre.code code {
  font-family: 'Inconsolata', 'Monaco', 'Consolas', 'Andale Mono',
    'Bitstream Vera Sans Mono', 'Courier New', Courier, monospace;
  display: block;
  margin: 0;
  padding: 15px 16px 14px;
  overflow-x: auto;
  font-size: 13px;
  line-height: 19px;
  color: #ddd;
}
pre::after {
  content: 'double click to select';
  padding: 0;
  width: auto;
  height: auto;
  position: absolute;
  right: 18px;
  top: 14px;
  font-size: 12px;
  color: #ddd;
  line-height: 20px;
  overflow: hidden;

  transition: all 0.3s ease;
}
pre:hover::after {
  opacity: 0;
  visibility: visible;
}

pre.css-code code {
  color: #ff4242;
}

pre.html-code code {
  color: #00ca02;
}

pre.javascript-code code {
  color: #ff8000;
}

pre.jquery-code code {
  color: #1da1f2;
}
@media (max-width: 750px) {
  pre::after {
    content: '';
  }
}
</style>