<template>
  <div>
    <header class="py-8 text-center bg-white border-b border-gray-200">
      <div class="container xl:flex xl:items-center xl:justify-between">
        <div class="flex-1 min-w-0">
          <h1 class="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
            ✏ Edit profile
          </h1>
        </div>
      </div>
    </header>

    <section class="bg-white">
      <div class="container pt-12 max-w-[800px] pb-20 overflow-x-auto">
        <FormulateForm v-slot="{ isLoading }" v-model="formValues" class="submit-profile" @submit="handleEditProfile">
          <div class="sm:col-span-6">
            <div class="flex flex-col items-center mt-4 mb-5 sm:flex-row">
              <div class="mb-4 avatar sm:mb-0">
                <div class="rounded-full w-14 h-14 ring ring-info ring-offset-base-100 ring-offset-1">
                  <img :src="
                      localAvatarURL
                        ? localAvatarURL
                        : require('~/assets/images/default-avatar-empty.png')
                    " alt="" />
                </div>
              </div>
              <div class="flex flex-col items-center ml-4 sm:flex-row">
                <div class="relative flex items-center px-3 py-2 bg-white border border-gray-300 rounded-md cursor-pointer hover:bg-gray-50 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-blue-gray-50 focus-within:ring-blue-500">
                  <formulate-input name="avatarTemp" type="file" :label="avatarFieldLabel" upload-behavior="delayed" validation="mime:image/jpeg,image/png,image/gif" :uploader="handleFileUpload" @change="onFileChange" />
                </div>
                <div class="flex flex-col items-center mt-4 text-xs text-center sm:text-md sm:ml-5 sm:text-left sm:items-start sm:mt-0">
                  <span>Recommended size: 256 x 256 pixels (jpg, png or gif)</span>
                  <span class="text-gray-700">(TIP: Upload a GIF to stand-out ✨)</span>
                </div>
              </div>
            </div>
          </div>

          <FormulateInput type="text" name="display name" label="Display name" validation="required|min:3" placeholder="Your display name" />

          <FormulateInput type="email" name="email" label="Email" validation="required|email" placeholder="Your email" error-behavior="submit" />

          <FormulateInput :disabled="isLoading" type="submit" :label="isLoading ? 'Please wait...' : 'Update profile'" class="text-right mt-7" />
        </FormulateForm>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  middleware: 'user-auth',
  data: () => ({
    localAvatarURL: '',
    localSignedURL: '',
    avatarFieldLabel: 'Upload avatar',
    uploadedAvatarFileName: '',
    bailSubmission: false,
    formValues: {}
  }),
  mounted() {
    const user = { ...this.$auth.user }
    this.formValues = {
      email: user.email,
      'display name': user.user_metadata.display_name || ''
    }
    if (user.user_metadata?.avatar) {
      this.localAvatarURL = user.user_metadata.avatar_url
    }
  },
  methods: {
    async handleEditProfile(data) {
      if (this.bailSubmission) {
        return
      }
      try {
        const formData = data
        delete formData.avatarTemp
        const updatedData = {
          email: formData.email,
          user_metadata: {
            full_name: formData['display name'],
            display_name: formData['display name']
          }
        }

        if (this.localAvatarURL) {
          updatedData.user_metadata.avatar = this.localAvatarURL
        }

        await this.$supabase.auth.update({
          data: {
            full_name: formData['display name'],
            display_name: formData['display name'],
            avatar_url: this.localSignedURL
          }
        })

        await this.$supabase
          .from('profiles')
          .update({
            display_name: formData['display name'],
            avatar_url: this.localSignedURL
          })
          .match({ id: this.$auth.user.id })

        this.$toast.success('Updated profile')
      } catch (e) {
        this.$toast.success('There was an error')
      }
    },
    async handleFileUpload(file, progress, formError, option) {
      const bucketName = 'public'
      const userId = this.$auth.user.id
      const finalFileName = `avatars/profiles/${userId}`

      const { data, error } = await this.$supabase.storage
        .from(bucketName)
        .upload(finalFileName, file, {
          cacheControl: '450',
          upsert: true
        })

      if (error) {
        this.$toast.error('Something went wrong with saving your profile')
        this.bailSubmission = true
      }

      if (data) {
        const avatarUrlResp = await this.$supabase.storage
          .from(bucketName)
          .getPublicUrl(finalFileName)

        if (avatarUrlResp.data) {
          this.localSignedURL = avatarUrlResp.data.publicURL
        }
      }
      this.uploadedAvatarFileName = finalFileName
    },
    onFileChange(e) {
      const file = e.target.files[0]
      this.avatarFieldLabel = 'Change avatar'
      this.localAvatarURL = URL.createObjectURL(file)
    }
  }
}
</script>
<style>
ul.formulate-files {
  display: none !important;
}
</style>
