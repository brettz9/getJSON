module.exports = {
  "extends": ["ash-nazg"],
  "parserOptions": {
    "sourceType": "module",
    "ecmaVersion": "2017"
  },
  "settings": {
  "polyfills": [
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
  "env": {
    "node": false,
    "browser": true
  },
  "overrides": [
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
  "rules": {
  }
};
