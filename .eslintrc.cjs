'use strict';

module.exports = {
  extends: ['ash-nazg/sauron-node'],
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: '2017'
  },
  parser: 'babel-eslint',
  settings: {
    polyfills: [
      'Array.from',
      'Array.isArray',
      'console',
      'document.body',
      'fetch',
      'JSON',
      'Promise',
      'Promise.all',
      'window'
    ]
  },
  env: {
    node: false,
    browser: true
  },
  overrides: [
    {
      files: 'test/**',
      env: {
        mocha: true
      }
    },
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
      files: ['.eslintrc.cjs', 'test/bootstrap/node.cjs'],
      extends: ['plugin:node/recommended-script'],
      rules: {
        'import/no-commonjs': 0
      }
    },
    {
      files: ['*.html'],
      rules: {
        'import/unambiguous': 0
      }
    },
    {
      files: ['*.md'],
      globals: {
        require: true,
        getJSON: true,
        args: true,
        url: true,
        url1: true,
        url2: true
      },
      rules: {
        'import/unambiguous': 0,
        'import/no-commonjs': 0,
        'no-console': 0,
        'no-shadow': ['error', {
          allow: ['getJSON']
        }],
        'node/no-unsupported-features/es-builtins': 0,
        'node/no-unsupported-features/es-syntax': 0,
        'node/no-missing-import': 0,
        'node/no-missing-require': 0,
        'promise/prefer-await-to-callbacks': 0,
        'padded-blocks': 0,
        'import/no-unresolved': 0,
        'promise/catch-or-return': 0,
        'promise/always-return': 0,
        'handle-callback-err': 0,
        'no-unused-vars': ['error', {
          varsIgnorePattern: 'getJSON|obj1|obj2|urlObj\\d',
          argsIgnorePattern: 'data|obj\\d|objsArr|err',
          caughtErrorsIgnorePattern: 'err'
        }]
      }
    }
  ],
  rules: {
    // Disable for now
    'max-len': 0,
    'eslint-comments/require-description': 0
  }
};
