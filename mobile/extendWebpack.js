const path = require('path');
const eslint = require('eslint');

const configChunks = {
  aliases: {
    common: {
      '@': path.resolve(__dirname, 'src'),
      '@common': path.resolve(__dirname, '../common/src'),

      ...(process.env.NODE_ENV === 'production' && {
        'vue-types': require.resolve('vue-types/dist/shim.m.js'),
      }),
    },

    storybook: {
      assets: path.resolve(__dirname, 'src', 'assets'),
      src: path.resolve(__dirname, 'src'),
    },

    getFinal(target) {
      return { ...this.common, ...(this[target] || {}) };
    },
  },

  loaders: {
    common: [
      {
        enforce: 'pre',
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        exclude: /node_modules/,
        options: {
          formatter: eslint.CLIEngine.getFormatter('stylish'),
        },
      },
      {
        resourceQuery: /blockType=i18n/,
        type: 'javascript/auto',
        use: ['@intlify/vue-i18n-loader', 'yaml-loader'],
      },
      {
        test: /\.ya?ml$/,
        type: 'json',
        use: 'yaml-loader',
      },
    ],

    storybook: [
      {
        test: /\.s([ca])ss$/,
        use: [
          'vue-style-loader',
          'css-loader',
          'sass-loader',
          require.resolve('@quasar/app/lib/webpack/loader.quasar-scss-variables'),
        ],
      },
    ],

    getFinal(target) {
      return [...this.common, ...(this[target] || [])];
    },
  },
};

module.exports = (target) => (config) => {
  config.resolve.alias = {
    ...config.resolve.alias,
    ...configChunks.aliases.getFinal(target),
  };

  config.module.rules.push(...configChunks.loaders.getFinal(target));

  return config;
};
