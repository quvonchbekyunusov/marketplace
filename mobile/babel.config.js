module.exports = {
  presets: [
    '@quasar/babel-preset-app',
  ],

  plugins: [
    '@babel/plugin-proposal-nullish-coalescing-operator',
    '@babel/plugin-proposal-optional-chaining',
    ['@babel/plugin-proposal-pipeline-operator', { proposal: 'minimal' }],
    '@babel/plugin-proposal-partial-application',
    ['@babel/plugin-proposal-private-methods', { loose: process.env.NODE_ENV === 'storybook' }],
    ['@babel/plugin-proposal-private-property-in-object', { loose: process.env.NODE_ENV === 'storybook' }],
  ],
};
