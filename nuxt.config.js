/* eslint-disable no-console */

// import getLocalIdent from './getLocalIdent'
require('dotenv').config()

const path = require('path');
require('dotenv').config({ path: path.resolve(process.cwd(), `.env.${process.env.NODE_ENV}`) });

// console.log("Path to ENV: " + path.resolve(process.cwd(), `.env.${process.env.NODE_ENV}`));

const isDev = process.env.NODE_ENV !== "production";
const isServerlessEnvironment = !!process.env.NOW_REGION

const SITE_TITLE = 'HawToo'
const SITE_DESCRIPTION = '# Helping Humans Safely Enter The Digital World of Crypto';

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
    BASEURL: process.env.BASE_URL || 'http://localhost:3000',
    TITLE: process.env.TITLE,
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
    { src: '~/plugins/vuex-persistedstate.js', ssr: true },
    { src: '~/plugins/filters.js' },
    { src: '~/plugins/tooltips.js' },
    { src: '~/plugins/clipboard.js' },
    { src: '~/plugins/vue-toast-notification.js' },
    { src: '~/plugins/font-awesome.js' },
    { src: '~/plugins/vue-skeleton-loader.js' },
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
    // ["@nuxtjs/color-mode"],
    // https://go.nuxtjs.dev/pwa
    ['@nuxtjs/pwa'],
    ['vue-sweetalert2/nuxt/no-css'],
    ['@nuxtjs/axios'],
    ['@nuxtjs/auth-next'],
  ],

  auth: {
    cookie: {
      prefix: 'auth_'
    },
    redirect: {
      login: '/login',
      logout: '/login',
      callback: false,
      home: '/'
    },
    strategies: {
      hawtoo: { scheme: '~/schemes/supabaseScheme' },
    }
  },

  router: {
    extendRoutes(routes, resolve) {
      routes.push({
        name: 'Project',
        path: '/@:id',
        component: resolve(__dirname, 'pages/project.vue')
      })
    }
  },

  serverMiddleware: isServerlessEnvironment ? [] : ['~/api/index.js'],

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    icon: {
      source: './static/maskable_icon.png',
      plugin: false,
    },
    meta: {
      name: SITE_TITLE,
      description: SITE_DESCRIPTION,
      theme_color: '#ffffff',
    },
    manifest: {
      name: SITE_TITLE,
      short_name: SITE_TITLE,
      description: SITE_DESCRIPTION,
      lang: 'en',
      display: 'Standalone',
      theme_color: '#ffffff',
      background_color: '#151515',
    },
    workbox: {
      swURL: '/service-worker.js',
      enabled: false,
      autoRegister: false,
      runtimeCaching: [
        {
          urlPattern: '.*',
          handler: 'NetworkFirst',
        },
      ],
    },
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {},

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    devMiddleware: {
      headers: {
        'Cache-Control': 'no-store',
        Vary: '*'
      }
    },
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
