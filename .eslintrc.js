'use strict';
module.exports = {
  extends: ['ash-nazg/sauron-node'],
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: '2017'
  },
  settings: {
    polyfills: [
      'Array.from',
      'Array.isArray',
      'console',
      'document.body',
      'fetch',
      'JSON',
      'Promise',
      'Promise.all'
    ]
  },
  env: {
    node: false,
    browser: true
  },
  overrides: [
    {
      files: 'src/index-polyglot.js',
      globals: {
        require: true,
        __dirname: true
      },
      env: {
        node: true
      }
    },
    {
      files: '.eslintrc.js',
      extends: ['plugin:node/recommended-script'],
      rules: {
        'import/no-commonjs': 0
      }
    },
    {
      files: ['*.md'],
      globals: {
        getJSON: true,
        args: true,
        url: true,
        url1: true,
        url2: true
      },
      rules: {
        'import/unambiguous': 0,
        'no-console': 0,
        'no-shadow': ['error', {
          allow: ['getJSON']
        }],
        'node/no-unsupported-features/es-builtins': 0,
        'node/no-unsupported-features/es-syntax': 0,
        'promise/prefer-await-to-callbacks': 0,
        'node/no-missing-import': 0,
        'padded-blocks': 0,
        'import/no-unresolved': 0,
        'promise/catch-or-return': 0,
        'promise/always-return': 0,
        'handle-callback-err': 0,
        'no-unused-vars': ['error', {
          varsIgnorePattern: 'getJSON|urlObj\\d',
          argsIgnorePattern: 'data|obj\\d|objsArr|err',
          caughtErrorsIgnorePattern: 'err'
        }]
      }
    }
  ],
  rules: {
    // Disable for now
    'max-len': 0
  }
};
