const extendWebpack = require('./extendWebpack');

module.exports = () => ({
  supportTS: false,

  boot: [
    'init',
    'i18n',
    'fragment',
    'gmap',
    'vue-clamp',
    'vue-constants',
    'async-computed',
    'vue-formulate',
    'dev-dialog',
    'dev-tools',
    'custom-notify',
    'mirage',
  ],

  css: [
    'app.scss',
  ],

  extras: [
    'roboto-font',
    'material-icons',
    'material-icons-outlined',
    'material-icons-sharp',
    'material-icons-round',
  ],

  build: {
    vueRouterMode: 'history',
    extendWebpack: extendWebpack('quasar'),
    transpileDependencies: ['vue-clamp', 'resize-detector'],
  },

  devServer: {
    https: false,
    port: 3000,
    open: true,
    writeToDisk: true,
  },

  framework: {
    importStrategy: 'all',
    plugins: ['Notify', 'Loading', 'Dialog', 'LocalStorage'],
    config: {},

    iconSet: 'material-icons',
    lang: 'ru',
    cssAddon: true,
  },

  animations: 'all',

  ssr: {
    pwa: false,
  },

  pwa: {
    workboxPluginMode: 'GenerateSW',
    workboxOptions: {},
    manifest: {
      name: 'Market Place',
      short_name: 'Market Place',
      description: 'Market Place front-end app',
      display: 'standalone',
      orientation: 'portrait',
      background_color: '#ffffff',
      theme_color: '#027be3',
      icons: [
        {
          src: 'icons/icon-128x128.png',
          sizes: '128x128',
          type: 'image/png',
        },
        {
          src: 'icons/icon-192x192.png',
          sizes: '192x192',
          type: 'image/png',
        },
        {
          src: 'icons/icon-256x256.png',
          sizes: '256x256',
          type: 'image/png',
        },
        {
          src: 'icons/icon-384x384.png',
          sizes: '384x384',
          type: 'image/png',
        },
        {
          src: 'icons/icon-512x512.png',
          sizes: '512x512',
          type: 'image/png',
        },
      ],
    },
  },

  cordova: {},

  capacitor: {
    hideSplashscreen: true,
  },

  electron: {
    bundler: 'packager',
    packager: {},
    builder: {
      appId: 'mplace',
    },
    nodeIntegration: true,
    extendWebpack() {
    },
  },
});
