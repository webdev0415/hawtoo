<template>
  <section class="flex-1">
    <nav class="flex justify-between w-full px-4 py-3 space-x-4 bg-white border-b border-gray-200 sm:px-6 lg:px-8" aria-label="Breadcrumb">
      <ol role="list" class="flex w-full mx-auto ">
        <li class="flex">
          <div class="flex items-center">
            <NuxtLink to="/" class=" hover:text-gray-500">
              <Logo width="100px" />
              <span class="sr-only">Home</span>
            </NuxtLink>
          </div>
        </li>

        <li class="flex">
          <div class="flex items-center">
            <svg class="ml-4" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
            <span class="ml-4 text-sm font-medium ">Submit Project</span>
          </div>
        </li>

        <li v-if="projectName" class="flex">
          <div class="flex items-center">
            <svg class="ml-4" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
            <span class="ml-4 text-sm font-medium " aria-current="page">{{ projectName }}</span>
          </div>
        </li>

      </ol>
      <AppButton variant="secondary" variant-type="outline" size="small" to="/account">Cancel</AppButton>
    </nav>

    <div class="container mx-auto">
      <div class="max-w-4xl mx-auto my-12 bg-white rounded-lg">
        <div class="px-16 pt-8 pb-8 bg-white border-b border-gray-200 ">
          <div class="flex flex-row">
            <h1 class="text-2xl font-extrabold text-gray-900">Create a new project</h1>
            <span v-tooltip="`You can create a maximum of 2 projects`" class="inline-flex items-center px-3 py-0.5 ml-4 rounded-full text-sm font-medium bg-red-100 text-red-800">
              1 of 2 left
            </span>
          </div>
          <p class="mt-2 text-gray-500 text-md">Your project will have it's own dedicated landing page.</p>
        </div>

        <div class="px-16 py-2 mt-6 space-y-8">
          <formulate-form v-slot="{ isLoading }" v-model="formFields" :form-errors="formErrors" :errors="inputErrors" @submit="handleSubmit">

            <div class="grid grid-cols-1 gap-y-6 sm:grid-cols-6 sm:gap-x-6">

              <!--- Form: Avatar --->
              <div class="sm:col-span-6">
                <div class="flex flex-col items-center my-4 sm:flex-row">
                  <div class="mb-4 avatar sm:mb-0">
                    <div class="rounded-full w-14 h-14 ring ring-info ring-offset-base-100 ring-offset-1">
                      <img :src="localAvatarURL ? localAvatarURL : require('~/assets/images/default-avatar-empty.png')" alt="">
                    </div>
                  </div>
                  <div class="flex flex-col items-center ml-4 sm:flex-row">
                    <div class="relative flex items-center px-3 py-2 bg-white border border-gray-300 rounded-md cursor-pointer hover:bg-gray-50 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-blue-gray-50 focus-within:ring-blue-500">
                      <formulate-input name="avatarTemp" type="file" :label="avatarFieldLabel" upload-behavior="delayed" validation="mime:image/jpeg,image/png,image/gif" :uploader="handleFileUpload" @change="onFileChange" />
                    </div>
                    <div class="flex flex-col items-center mt-4 text-xs text-center sm:text-md sm:ml-5 sm:text-left sm:items-start sm:mt-0">
                      <span>Recommended size: 256 x 256 pixels (jpg, png or gif)</span>
                      <span class="text-gray-700 ">(TIP: Upload a GIF to stand-out ✨)</span>
                    </div>
                  </div>
                </div>
              </div>

              <!--- Form: Name --->
              <div class="sm:col-span-3">
                <formulate-input v-model="projectName" name="name" type="text" label="Project name" error-behavior="value" placeholder="Project name" validation="bail|required|noSpecialChars|max:28|min:3" :validation-messages="{ noSpecialChars: 'No can do 😭! Project name can only consist of letters, numbers and spaces' }" />
                <p v-if="$store.state.is_project_exist" class="p-3 mt-2 text-red-800 bg-red-100 rounded-md">This name has already been taken. Are you the owner of {{ projectName }} and trying to claim this HawToo project? <a class="underline" href="mailto:hello@hawtoo.com" target="_blank">Get in touch ></a></p>
              </div>

              <!--- Form: Type --->
              <div class="sm:col-span-3">
                <formulate-input name="type" :options="{ coin: ' Coin', nft: 'NFT' }" type="select" validation="required" placeholder="Select an option" label="Project type" />
              </div>

              <!--- Form: Project Slug --->
              <div class="sm:col-span-6">
                <label for="project" class="block text-sm font-medium ">
                  Project URL
                </label>
                <div class="flex mt-1 rounded-md ">
                  <div class="inline-flex items-center px-3 text-gray-500 bg-gray-200 border border-r-0 border-gray-300 bg-200 rounded-l-md sm:text-sm">
                    <span>
                      hawtoo.com/@
                    </span>
                  </div>
                  <formulate-input v-model="projectSlug" name="slug" type="text" placeholder="..." class="flex-1 block w-full mb-0" style="margin-bottom:0!important" readonly />
                </div>
              </div>

              <!--- Form: Project Description --->
              <div class="sm:col-span-6">
                <formulate-input v-model="formFields.description" name="description" type="textarea" rows="4" label="Project description" placeholder="Tell us a little about your project" validation="required|min:30|max:240,length" validation-name="description" :help="`Brief description of your profile. Keep it under 240 characters. ${240 - formFields.description.length} left.`" />
              </div>

              <!--- Form: Project Chain --->
              <div class="sm:col-span-6">
                <formulate-input name="chain" :options="{ binance: 'Binance Smart Chain', ethereum: 'Ethereum' }" type="select" placeholder="Select an option" label="Network" />
              </div>

              <!--- Form: Project Contract address --->
              <div class="sm:col-span-6">
                <formulate-input name="contract_address" type="text" label="Contract address" placeholder="Contract address" validation="required" />
              </div>

            </div>

            <!--- Form Group: Links --->

            <div class="mb-6 sm:col-span-6">
              <h2 class="h2">Links &amp; Social Media</h2>
              <p v-if="projectSlug" class="mt-1 text-sm text-blue-gray-500">These will be visible on hawtoo.com/@{{ projectSlug }}.</p>
            </div>

            <!--- Form Subgroup: NFT Marketplace links --->
            <div class="p-4 mb-8 bg-gray-100 rounded-md">
              <h4 class="mb-3 h4">Official website</h4>
              <formulate-input type="group" name="sites">
                <div class="sm:col-span-6">
                  <div class="relative grid grid-cols-1 pt-1 auto-cols-max gap-y-2 sm:grid-cols-8 sm:gap-x-2">
                    <div class="sm:col-span-8">
                      <formulate-input name="url" type="url" label="URL" placeholder="https://myproject.io" validation="url|required" error-behavior="submit" />
                    </div>
                  </div>
                </div>
              </formulate-input>
            </div>

            <!--- Form Subgroup: NFT Marketplace links --->
            <div v-if="formFields.type === 'nft'" class="p-4 mb-8 bg-gray-100 rounded-md">
              <h4 class="mb-1 h4">Add links to NFT Marketplaces</h4>
              <formulate-input type="group" name="marketplaces" validation="noSameMarketPlace" error-behavior="value" :validation-messages="{ noSameMarketPlace: 'You cannot enter a duplicate marketplace link' }" :repeatable="true" add-label="+ Add Marketplace">
                <div class="sm:col-span-6">
                  <div class="relative grid grid-cols-1 py-4 border-b border-gray-300 auto-cols-max gap-y-2 sm:grid-cols-8 sm:gap-x-2">
                    <div class="sm:col-span-3">
                      <formulate-input name="name" type="select" :options="marketplaceLinks" label="Platform" placeholder="Select a marketplace" validation="noSameMarketPlace|required" error-behavior="submit" />
                    </div>
                    <div class="sm:col-span-4">
                      <formulate-input name="url" type="url" label="URL to watchlist" placeholder="Enter a url" validation="url|required" error-behavior="submit" />
                    </div>
                  </div>
                </div>
              </formulate-input>
            </div>

            <!--- Form Subgroup: Social Links --->
            <div class="p-4 mb-8 bg-gray-100 rounded-md">
              <h4 class="mb-1 h4">Add links to social media</h4>
              <formulate-input type="group" name="socials" validation="noSameSocialLink" error-behavior="value" :validation-messages="{ noSameSocialLink: 'You cannot enter a duplicate social link' }" :repeatable="true" add-label="+ Add Links">
                <div class="sm:col-span-6">
                  <div class="relative grid grid-cols-1 py-4 border-b border-gray-300 auto-cols-max gap-y-2 sm:grid-cols-8 sm:gap-x-2">
                    <div class="sm:col-span-3">
                      <formulate-input name="name" type="select" :options="socialLinks" label="Platform" placeholder="Select" validation="required" error-behavior="submit" />
                    </div>
                    <div class="sm:col-span-4">
                      <formulate-input name="url" type="url" label="URL to platform" placeholder="Enter a url" validation="url|required" error-behavior="submit" />
                    </div>
                  </div>
                </div>
              </formulate-input>
            </div>

            <!--- Form: Submit --->
            <div class="flex justify-end pt-8">
              <formulate-errors />
              <formulate-input type="submit" :disabled="isLoading" :label="isLoading ? 'Submitting...' : 'Submit project'" />
            </div>
          </formulate-form>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
/* eslint-disable */
import randomcolor from 'randomcolor'

export default {
  middleware: 'user-auth',
  name: 'SubmitProject',
  colorMode: 'light',
  layout: 'empty',
  head: {
    bodyAttrs: {
      class: 'tracking-semitight min-w-xs min-h-screen antialiased bg-gray-100'
    }
  },
  // middleware: 'user-auth',
  data() {
    return {
      bailSubmission: false,
      formErrors: [],
      inputErrors: {},
      addedProjectData: [],
      // This is for prod.
      formFields: {
        description: ''
      },
      projectName: '',
      selectedSocialLink: '',
      selectedMarketplaceLink: '',
      localAvatarURL: '',
      avatarFieldLabel: 'Upload a project avatar',
      uploadedAvatarFileName: '',
      socialLinks: {
        Telegram: 'Telegram',
        Discord: 'Discord',
        Twitter: 'Twitter',
        YouTube: 'YouTube',
        Instagram: 'Instagram',
        Medium: 'Medium',
        Reddit: 'Reddit',
        Twitch: 'Twitch'
      },
      marketplaceLinks: { OpenSea: 'OpenSea', Rarible: 'Rarible' },
      // This is for dev to quickly submit af orm. Uncomment for default fields
      formFields2: {
        description:
          'CyberKongz are unique and randomly generated 2D/3D NFT Social Avatars for your online experiences. Some appear normal. Some look weird. Some are just damn cool!',
        type: 'nft',
        name: 'CyberKongz',
        slug: 'cyberkongz',
        chain: 'ethereum',
        contract_address: '0x57a204aa1042f6e66dd7730813f4024114d74f37',

        sites: [
          {
            url: 'https://www.cyberkongz.com/'
          }
        ],
        marketplaces: [
          {
            name: 'OpenSea',
            url: 'https://opensea.io/watchlist/cyberkongz/'
          },
          {
            name: 'Rarible',
            url: 'https://opensea.io/watchlist/cyberkongz/'
          }
        ],
        socials: [
          {
            name: 'Telegram',
            url: 'https://opensea.io/watchlist/cyberkongz/'
          },
          {
            name: 'Discord',
            url: 'https://opensea.io/watchlist/cyberkongz/'
          },
          {
            name: 'Twitter',
            url: 'https://opensea.io/watchlist/cyberkongz/'
          },
          {
            name: 'YouTube',
            url: 'https://opensea.io/watchlist/cyberkongz/'
          },
          {
            name: 'Instagram',
            url: 'https://opensea.io/watchlist/cyberkongz/'
          }
        ]
      }
    }
  },

  computed: {
    user() {
      return this.$auth.user
    },
    projectSlug: {
      // getter
      get() {
        const projectName = this.projectName

        if (projectName) {
          return this.formatProjectSlug(projectName)
        }

        return ''
      },
      // setter
      set(value) {
        return this.formatProjectSlug(value)
      }
    }
  },
  methods: {
    handleSubmit(data) {
      const formData = data

      if (this.bailSubmission) {
        console.log('Stopping submission')
        return
      }

      /**
       * Delete temporary file upload data, because VueFormulate adds this automatically...
       */
      delete formData.avatarTemp

      /**
       * Temporary add the name attribute to first index of the `sites` URL array. Until we allow repeatable `sites` form.
       **/
      if (formData.sites) {
        formData.sites[0].name = 'Official website'
      }

      this.addProject(formData)
        .then(() => {
          console.log('published')
        })
        .catch((error) => {
          if (error) {
            console.log(error)
          }
        })
    },

    /**
     * Adds the project to the database.
     */
    async addProject(formData) {
      const userId = this.$auth.user.id
      const projectId = formData.slug

      if (!projectId) {
        throw new Error('Missing project ID')
      }

      if (!userId) {
        throw new Error('Could not retrieve user ID')
      }

      const { data, error } = await this.$supabase.from('projects').insert(
        [
          {
            ...formData,
            author_id: userId,
            avatar_name: this.uploadedAvatarFileName,
            avatar_color: randomcolor({
              luminosity: 'bright',
              format: 'rgb'
            })
          }
        ],
        { returning: 'minimal' }
      )
    },

    /**
     * Handles the avatar file uploads.
     * Gets fired before `handleSubmit()`
     */
    async handleFileUpload(file, progress, formError, option) {
      const bucketName = 'public'
      const projectSlug = this.projectSlug
      const time = new Date().getTime()
      const finalFileName = `avatars/projects/${projectSlug}-${time}`

      const { data, error } = await this.$supabase.storage
        .from(bucketName)
        .upload(finalFileName, file)

      this.uploadedAvatarFileName = finalFileName

      if (error) {
        console.log(error)
        this.bailSubmission = true
      }
    },

    /**
     * Format the project slug, this becomes the final ID.
     */
    formatProjectSlug(oldValue) {
      let newValue = oldValue.replace(/\s*$/, '')
      newValue = newValue.replace(/\s+/g, '-').toLowerCase()
      return newValue
    },

    /**
     * Set the project avatar preview in the upload form.
     */
    onFileChange(e) {
      const file = e.target.files[0]
      this.avatarFieldLabel = 'Change project avatar'
      this.localAvatarURL = URL.createObjectURL(file)
    }
  }
}
/* eslint-enable */
</script>

<style>
ul.formulate-files {
  display: none !important;
}
[data-classification='file'] .formulate-input-wrapper label {
  margin-bottom: 0;
}
.formulate-input-group-add-more button {
  margin-top: 10px;
  background-color: black;
  color: white;
  width: auto;
}
</style>
