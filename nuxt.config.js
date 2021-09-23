/* eslint-disable no-console */

// import getLocalIdent from './getLocalIdent'
require('dotenv').config()

const path = require('path');
require('dotenv').config({ path: path.resolve(process.cwd(), `.env.${process.env.NODE_ENV}`) });

console.log("Path to ENV: " + path.resolve(process.cwd(), `.env.${process.env.NODE_ENV}`));

const isDev = process.env.NODE_ENV !== "production";

export default {

  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: true,
  target: 'server',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'hawtoo',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  publicRuntimeConfig: {
    paginate: 50,
    baseURL: process.env.BASE_URL || 'http://localhost:3000',
    supabase: {
      // url: process.env.BASE_URL || 'http://localhost:3000', //
      url: process.env.NUXT_ENV_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL,
      anonKey:
        process.env.NUXT_ENV_PUBLIC_SUPABASE_KEY || process.env.SUPABASE_KEY,
    },
  },

  env: {
    baseURL: process.env.BASE_URL,
    TITLE: process.env.TITLE,
    FIREBASE_RECAPTCHA_KEY: process.env.FIREBASE_RECAPTCHA_KEY,
    FIREBASE_API_KEY: process.env.FIREBASE_API_KEY,
    FIREBASE_KEY_AUTH_DOMAIN: process.env.FIREBASE_KEY_AUTH_DOMAIN,
    FIREBASE_KEY_DATABASE_URL: process.env.FIREBASE_KEY_DATABASE_URL,
    FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID,
    FIREBASE_STORAGE_BUCKET: process.env.FIREBASE_STORAGE_BUCKET,
    FIREBASE_MESSAGING_SENDER_ID: process.env.FIREBASE_MESSAGING_SENDER_ID,
    FIREBASE_APP_ID: process.env.FIREBASE_APP_ID,
    FIREBASE_MEASUREMENT_ID: process.env.FIREBASE_MEASUREMENT_ID,
    SUPABASE_PUBLIC_KEY: process.env.SUPABASE_PUBLIC_KEY,
    SUPABASE_PUBLIC_URL: process.env.SUPABASE_PUBLIC_URL
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@/assets/css/app.scss'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/supabase.js',
    { ssr: false, src: '~/plugins/aos.js' },
    { src: '~/plugins/tooltips.js' },
    { src: '~/plugins/vue-formulate.js' },
    { src: '~/plugins/vue-placeholders.js' },
    { src: '~/plugins/vue-observe-visibility.client.js' },
  ],


  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // Doc: https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // Doc: https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
    ['@layer0/nuxt/module', { layer0SourceMaps: true }]
  ],

  tailwindcss: {
    cssPath: '~/assets/css/plugins/tailwind.css',
    configPath: '~/assets/css/plugins/tailwind.config.js',
  },

  colorMode: {
    classSuffix: ""
  },

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // Doc: https://github.com/nuxt-community/color-mode-module
    "@nuxtjs/color-mode",
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    '@nuxtjs/axios',
    '@nuxtjs/auth-next',
    'cookie-universal-nuxt',
  ],

  auth: {
    strategies: {
      supabase: { scheme: '~/schemes/supabaseScheme' },
    }
  },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'en'
    }
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {},

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    extractCSS: !isDev,
    // extend(config) {
    //   const cssLoader = config.module.rules.find((rule) => {
    //     return rule.test.toString() === '/\\.css$/i'
    //   })
    //   cssLoader.oneOf = cssLoader.oneOf.map((loader) => {
    //     loader.use = loader.use.map((item) => {
    //       if (item.options.modules) {
    //         if (process.env.NODE_ENV === 'production') {
    //           item.options.modules.getLocalIdent = getLocalIdent
    //         }
    //       }
    //       return item
    //     })
    //     return loader
    //   })
    // },
  },
}
