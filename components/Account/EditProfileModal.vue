<template>
  <Modal :showing="getEditProfileModal.open" :css="{ 'modal': 'max-w-md' }" @close="closeModal">

    <div class="col-span-6">
      <div class="flex flex-col items-center mt-4 mb-5 ">
        <div class="mb-4 avatar ">
          <div class="rounded-full w-14 h-14 ring ring-info ring-offset-base-100 ring-offset-1">
            <img :src="user.user_metadata.avatar_url ? user.user_metadata.avatar_url : require('~/assets/images/default-avatar-empty.png')" alt="" />
          </div>
        </div>
        <div class="flex flex-col items-center ml-4 ">
          <div class="relative flex items-center px-3 py-2 bg-white border border-gray-300 rounded-md cursor-pointer hover:bg-gray-50 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-blue-gray-50 focus-within:ring-blue-500">
            <formulate-input id="avatar-upload" name="avatarTemp" type="file" :label="avatarFieldLabel" upload-behavior="live" validation="mime:image/jpeg,image/png,image/gif" :uploader="handleFileUpload" @change="onFileChange" />
          </div>
          <div class="flex flex-col items-center mt-4 text-xs text-center ">
            <span>Recommended size: 256 x 256 pixels (jpg, png or gif)</span>
            <span class="text-gray-700">(TIP: Upload a GIF to stand-out ✨)</span>
          </div>
        </div>
      </div>
    </div>

    <FormulateForm v-slot="{ isLoading }" v-model="formValues" class="submit-profile" @submit="handleEditProfile">
      <FormulateInput type="text" name="display_name" label="Display name" validation="required|min:3" placeholder="Your display name" />
      <FormulateInput type="email" name="email" label="Email" validation="required|email" placeholder="Your email" error-behavior="submit" />
      <FormulateInput :disabled="isLoading" type="submit" :label="isLoading ? 'Please wait...' : 'Update profile'" class="text-right mt-7" />
    </FormulateForm>
  </Modal>
</template>

<script>
import { v4 as uuidv4 } from 'uuid'
import { mapGetters, mapMutations } from 'vuex'

export default {
  data: () => ({
    formValues: () => {},
    userAvatarURL: '',
    avatarFieldLabel: 'Upload avatar'
  }),
  fetch() {
    this.formValues = {
      email: this.$store.getters['auth/user'].email,
      display_name: this.$store.getters['auth/user'].public_profile.display_name
    }
  },
  computed: {
    ...mapGetters({
      user: 'auth/user',
      getEditProfileModal: 'general/editProfileModal'
    })

    // displayName: {
    //   set(val) {
    //     this.$store.commit('auth/SET_DISPLAY_NAME', val)
    //   },
    //   get() {
    //     return this.$store.getters['auth/user'].public_profile.display_name
    //   }
    // },
    // emailAddress: {
    //   set(val) {
    //     this.$store.commit('auth/SET_EMAIL', val)
    //   },
    //   get() {
    //     return this.$store.getters['auth/user'].email
    //   }
    // }
  },
  methods: {
    ...mapMutations({
      toggleEditProfileModal: 'general/TOGGLE_EDIT_PROFILE_MODAL'
    }),
    async handleEditProfile(formData) {
      try {
        await this.$supabase
          .from('profiles')
          .update({
            display_name: formData.display_name
          })
          .match({ id: this.user.id })

        await this.$supabase.auth
          .update({
            data: {
              email: formData.email,
              full_name: formData.display_name,
              display_name: formData.display_name
            }
          })
          .then((res) => {
            if (res.error) {
              throw new Error(res.error)
            }
          })
          .catch((error) => {
            throw new Error(error.message)
          })

        // location.reload()
        this.$toast.success('Updated profile')
      } catch (e) {
        this.$toast.success('There was an error')
      }
    },
    async handleFileUpload(file, progress, formError, option) {
      const bucketName = 'public'
      const fieName = `avatars/profiles/${uuidv4()}`

      const { data, error } = await this.$supabase.storage
        .from(bucketName)
        .upload(fieName, file, {
          cacheControl: '0',
          upsert: true
        })

      if (error) {
        this.$toast.error('Something went wrong with saving your profile')
      }

      if (data) {
        const avatarUrlResp = await this.$supabase.storage
          .from(bucketName)
          .getPublicUrl(fieName)

        if (avatarUrlResp.data) {
          const avatarURL = avatarUrlResp.data.publicURL
          // Update the avatar in the offiicia auth.user user_meta table.
          await this.$supabase.auth
            .update({
              data: { avatar_url: avatarURL }
            })
            .then((res) => {
              if (res.error) {
                throw new Error(error.message)
              }
            })
            .catch((error) => {
              throw new Error(error.message)
            })

          // Update the avatar in the public profiles table.
          await this.$supabase
            .from('profiles')
            .update({
              avatar_url: avatarURL
            })
            .match({ id: this.user.id })
            .then((res) => {
              if (res.error) {
                throw new Error(error.message)
              }
            })
            .catch((error) => {
              throw new Error(error.message)
            })

          this.$toast.success('Updated avatar')

          location.reload()
        }
      }
    },
    onFileChange(e) {
      const file = e.target.files[0]
      this.avatarFieldLabel = 'Change avatar'
      this.userAvatarURL = URL.createObjectURL(file)
    },
    closeModal() {
      this.toggleEditProfileModal({
        open: false
      })
    }
  }
}
</script>
