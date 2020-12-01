const path = require('path');

module.exports = {
  stories: [
    '../stories/**/*.stories.js',
  ],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
  ],
  webpackFinal: async (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': path.resolve(__dirname, '../src'),
      '@common': path.resolve(__dirname, '../../common/src'),
    };

    return config;
  },
};
