<template>
  <div>
    <button v-for="(provider, key) in providers" :key="key" class="inline-flex items-center justify-center w-full h-10 mt-2 font-bold text-gray-700 rounded-sm shadow-md bg-whiteborder" :class="{ 'opacity-95': isProcessing === key ? true : false }" :disabled="isProcessing === key ? true : false" @click="handleLoginWithProvider(key)">
      <FontAwesome v-if="isProcessing !== key" :icon="provider.icon" class="mr-2" :style="{ 'color': provider.color }" />
      <FontAwesome v-if="isProcessing === key" :icon="['fad', 'spinner-third']" class="mr-2 animate-spin" :style="{ 'color': provider.color }" />
      <span v-if="isProcessing === key ? false : true">
        Continue with {{ provider.name }}
      </span>
      <span v-else>
        Giving {{ provider.name }} a call...
      </span>
    </button>
  </div>
</template>

<script>
export default {
  name: 'LoginProvidersButton',
  data() {
    return {
      providers: {
        twitter: {
          name: 'Twitter',
          icon: ['fab', 'twitter'],
          color: '#1e9bf0'
        },
        discord: {
          name: 'Discord',
          icon: ['fab', 'discord'],
          color: '#7289DA'
        }
      },
      error: '',
      isProcessing: ''
    }
  },
  watch: {
    error() {
      this.$toast.error(this.error)
    }
  },
  methods: {
    async handleLoginWithProvider(type) {
      const redirectSlug = this.$route.query.redirect || '/'
      let redirectURL = process.env.BASE_URL + redirectSlug

      if (process.env.VERCEL_ENV === 'preview') {
        redirectURL = ''
      }

      try {
        const { user, error } = await this.$supabase.auth.signIn(
          {
            provider: type
          },
          {
            redirectTo: redirectURL
          }
        )
        if (user) {
          this.isProcessing = type
        }
        if (error) throw error
      } catch (err) {
        this.error = err.message
      }
    }
  }
}
</script>