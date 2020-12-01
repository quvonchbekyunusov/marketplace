const extendWebpack = require('../extendWebpack');

module.exports = {
  stories: [
    '../stories/**/*.stories.js',
  ],
  addons: [
    {
      name: '@storybook/addon-essentials',
      options: {
        backgrounds: false,
        docs: false,
        controls: false,
      },
    },
    '@storybook/addon-viewport/register',
  ],
  webpackFinal: extendWebpack('storybook'),
};
