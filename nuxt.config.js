/* eslint-disable no-console */
const path = require('path');
require('dotenv').config({ path: path.resolve(process.cwd(), `.env.${process.env.NODE_ENV}`) });

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
    paginate: 5,
    baseURL: process.env.BASE_URL || 'http://localhost:3000',
    supabase: {
      // url: process.env.BASE_URL || 'http://localhost:3000', //
      url: process.env.NUXT_ENV_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL,
      anonKey:
        process.env.NUXT_ENV_PUBLIC_SUPABASE_KEY || process.env.SUPABASE_KEY,
    },
    tagNames: [
      'metaverses',
      'defi',
      'utility',
      'nsfw',
      'collectibles',
      'punks',
      'art',
      'domains',
      'gaming'
    ],
    homepageTagNames: [
      15, // 'soulection-radio'
    ],
    axios: {
      browserBaseURL: process.env.BASE_URL
    }
  },

  privateRuntimeConfig: {
    axios: {
      baseURL: process.env.BASE_URL
    }
  },

  env: {
    BASE_URL: process.env.BASE_URL || 'http://localhost:3000',
    TITLE: process.env.TITLE,
    SUPABASE_PUBLIC_KEY: process.env.SUPABASE_PUBLIC_KEY,
    SUPABASE_PUBLIC_URL: process.env.SUPABASE_PUBLIC_URL
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@/assets/css/app.scss',
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '@/plugins/swiper.js' },
    { src: '@/plugins/supabase.js' },
    { src: '@/plugins/vuex-persistedstate.js', ssr: true },
    { src: '@/plugins/filters.js' },
    { src: '@/plugins/tooltips.js' },
    { src: '@/plugins/clipboard.js' },
    { src: '@/plugins/vue-toast-notification.js' },
    { src: '@/plugins/font-awesome.js' },
    { src: '@/plugins/vue-formulate.js' },
    { src: '@/plugins/vue-placeholders.js' },
    { src: "@/plugins/v-click-outside", ssr: false }
  ],


  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // Doc: https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // Doc: https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss'
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
    ['nuxt-password-protect']
  ],

  sweetalert: {
    customClass: {
      confirmButton: 'btn btn-primary',
      cancelButton: 'btn'
    },
  },

  passwordProtect: {
    enabled: !isDev,
    formPath: '/password',
    password: 'hello-world123',
    tokenSeed: 101010,
    queryString: '_pw',
    cookieName: '_password',
    cookie: {
      prefix: '',
      expires: 5
    },
  },

  router: {
    middleware: ['password-protect'],
    extendRoutes(routes, resolve) {
      routes.push({
        path: '/@:id',
        component: resolve(__dirname, 'pages/linkinbio.vue')
      })
    }
  },

  // serverMiddleware: isServerlessEnvironment ? [] : ['~/api/index.js'],

  serverMiddleware: {
    '/api': '~/api'
  },

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
  axios: {
    baseURL: process.env.BASE_URL, // Used as fallback if no runtime config is provided
  },


  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    devMiddleware: {
      headers: {
        'Cache-Control': 'no-store',
        Vary: '*'
      }
    },
    extractCSS: !isDev,
  },
}
