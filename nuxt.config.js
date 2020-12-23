/* eslint-disable */
require('dotenv').config() // Using .env in nuxt.config.js requires this
export default {
  /*
   ** Nuxt rendering mode
   ** See https://nuxtjs.org/api/configuration-mode
   */
  // mode: 'universal', // Deprecated
  ssr: true,
  /*
   ** Nuxt target
   ** See https://nuxtjs.org/api/configuration-target
   */
  target: 'static',
  /*
   ** Nuxt server
   ** See https://nuxtjs.org/api/configuration-server
   */
  server: {
    port: process.env.PORT || 3000,
    host: process.env.HOST || `0.0.0.0`,
    /*
     ** Nuxt timing api
     ** See https://nuxtjs.org/api/configuration-server/#using-timing-api
     */
    timing: false,
  },
  /*
   ** Nuxt root directory
   ** See https://nuxtjs.org/api/configuration-srcdir
   */
  srcDir: 'client/',
  /*
   ** Headers of the page
   ** See https://nuxtjs.org/api/configuration-head
   */
  head: {
    title: 'A Covid-19 map',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: 'A simple Covid-19 tracking map',
      },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        href: 'https://fonts.gstatic.com',
        rel: 'preconnect'
      },
      {
        href: `https://fonts.googleapis.com/css2?family=Google+Sans:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap`,
        rel: 'stylesheet'
      }
    ],
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: 'green' },
  /*
   ** Customize how page and layout transition looks
   */
  layoutTransition: {
    // Is "layout" by default
    name: 'fade',
    mode: 'out-in'
  },
  pageTransition: {
    // Is "page" by default
    name: 'slide-fade',
    mode: 'out-in',
  },
  /*
   ** Global CSS
   */
  css: [
    '~/assets/css/animate.css/all.min.css',
    '~/assets/scss/main.scss', // CSS class customization can cause confliction with other ui package
  ],
  /*
   ** Import scss resource in every component
   ** For global color variables, use CSS variables in :root{}
   ** For color configuration, go to ~/assets/scss/base/utitlities/_variants.scss
   */
  styleResources: {
    scss: ['~/assets/scss/base/styleResources/mixins.scss'],
  },
  /*
   ** Plugins to load before mounting the App
   ** https://nuxtjs.org/guide/plugins
   */
  plugins: [
    // Services
    '~/services/auth.js',
    '~/services/client.js',
    // Plugins
    '~/plugins/element-ui',
    '~/plugins/i18n.js',
    '~/plugins/vee-validate.js',
    { src: '~/plugins/google-maps.js', ssr: false },
    // Utilities
    '~/utils/directives', // Vue directives
    '~/utils/filters', // Filters for custom text formating
    '~/utils/global-components', // Global components
    '~/utils/bus.js', // Event bus
  ],
  /*
   ** Auto import components
   ** See https://nuxtjs.org/api/configuration-components
   */
  components: false,
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
    // Doc: https://github.com/nuxt-community/nuxt-tailwindcss
    '@nuxtjs/tailwindcss',
  ],
  /*
  ** Nuxt.js modules
  */
 modules: [
   // Doc: https://axios.nuxtjs.org/usage
   '@nuxtjs/axios',
   // Doc: https://github.com/nuxt-community/dotenv-module
   // Doc: https://github.com/nuxt-community/dotenv-module#path
   // '@nuxtjs/dotenv',
   ['@nuxtjs/dotenv', { path: './' }],
    [
      'nuxt-fontawesome',
      {
        component: 'fa',
        imports: [
          {
            set: '@fortawesome/free-solid-svg-icons',
            icons: ['fas']
          },
          {
            set: '@fortawesome/free-brands-svg-icons',
            icons: ['fab']
          }
        ]
      }
    ],
    '@nuxtjs/style-resources'
  ],
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {},
  /*
   ** Build configuration
   ** See https://nuxtjs.org/api/configuration-build/
   */
  build: {
    transpile: [/^element-ui/, 'vee-validate', /^vue2-google-maps($|\/)/],
    /*
     ** You can extend webpack config here
     */
    babel: {
      plugins: [
        '@babel/plugin-proposal-optional-chaining'
      ]
    },
    extend(config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/,
          options: {
            fix: true
          }
        })
      }
      config.node = {
        fs: 'empty',
      }
    }
  },
  router: {
    // base: '.'
    middleware: []
  },
  generate: {
    /*
     ** Declare specific routes for static generator
     */
    routes: [
      '/',
      '/vietnam'
    ]
    /*
     ** Or dynamic routes
     */
    // routes () {
    //   return axios.get('https://my-api/users')
    //     .then((res) => {
    //       return res.data.map((user) => {
    //         return '/users/' + user.id
    //       })
    //     })
    // }
  }
}
