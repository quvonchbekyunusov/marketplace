module.exports = {
  root: true,

  settings: {
    'import/extensions': [
      '.js',
      '.vue',
    ],
    'import/resolver': {
      alias: {
        map: [
          ['@', './src'],
          ['@common', '../common/src'],
        ],
        extensions: ['.js', '.vue'],
      },
    },
  },

  parserOptions: {
    parser: 'babel-eslint',
    ecmaVersion: 2018,
    sourceType: 'module',
  },

  env: {
    browser: true,
  },

  extends: [
    'plugin:vue/recommended',
    'plugin:vue-types/recommended',
    'airbnb-base',
  ],

  plugins: [
    'vue',
  ],

  globals: {
    ga: true,
    cordova: true,
    __statics: true,
    process: true,
    Capacitor: true,
    chrome: true,
  },

  rules: {
    'func-names': 'off',
    'no-prototype-builtins': 'off',
    'no-else-return': ['error', { allowElseIf: true }],
    'no-plusplus': 'off',
    'no-use-before-define': ['error', 'nofunc'],
    'linebreak-style': 'off',
    'max-len': ['error', {
      code: 120,
      tabWidth: 2,
      ignoreComments: true,
      ignoreTrailingComments: true,
      ignoreUrls: true,
      ignoreStrings: true,
      ignoreTemplateLiterals: true,
      ignoreRegExpLiterals: true,
    }],
    'no-param-reassign': 'off',
    'prefer-promise-reject-errors': 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'object-curly-newline': ['error', {
      ObjectExpression: { multiline: true, consistent: true },
      ObjectPattern: { multiline: true, consistent: true },
      ImportDeclaration: 'never',
      ExportDeclaration: { multiline: true, consistent: true },
    }],

    'import/first': 'off',
    'import/named': 'error',
    'import/namespace': 'error',
    'import/default': 'error',
    'import/export': 'error',
    'import/extensions': 'off',
    'import/no-unresolved': 'error',
    'import/no-extraneous-dependencies': 'off',
    'import/prefer-default-export': 'off',

    'vue/max-attributes-per-line': ['error', {
      'singleline': 10,
      'multiline': {
        'max': 1,
        'allowFirstLine': false,
      },
    }],
  },
};
