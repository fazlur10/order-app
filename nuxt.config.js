export default {
  // Disable server-side rendering (https://go.nuxtjs.dev/ssr-mode)
  ssr: false,

  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: 'orderapplication',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [
  ],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    [
      // https://go.nuxtjs.dev/axios
      '@nuxtjs/axios'
    ],
    [
      '@nuxtjs/firebase',
      {
        config: {
          apiKey: 'AIzaSyBNOphNBJh5AHkllB-6p7_FfKTbAeQ6vDc',
          authDomain: 'shopping-scrap.firebaseapp.com',
          databaseURL: 'https://shopping-scrap.firebaseio.com/',
          projectId: 'shopping-scrap',
          storageBucket: 'shopping-scrap.appspot.com',
          messagingSenderId: '321873157011',
          appId: '1:321873157011:web:3f74f92dd33db29f9aa666',
          measurementId: 'G-L49EZ7RY3Y'
        },
        services: {
          auth: true, // Just as example. Can be any other service.
          firestore: true,
          functions: true,
          storage: true
        }
      }
    ]
  ],

  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  axios: {},

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
  }
}
