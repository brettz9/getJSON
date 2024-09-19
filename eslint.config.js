import ashNazg from 'eslint-config-ash-nazg';
import globals from 'globals';

export default [
  {
    ignores: [
      'dist',
      'coverage'
    ]
  },
  ...ashNazg(['sauron']),
  {
    files: ['src/index-polyglot.js'],
    languageOptions: {
      globals: globals.node
    }
  },
  {
    files: ['*.html'],
    rules: {
      'import/unambiguous': 0
    }
  },
  {
    files: ['test/**/*.js'],
    languageOptions: {
      globals: {
        assert: 'readonly'
      }
    }
  },
  {
    files: ['*.md/*.js'],
    languageOptions: {
      globals: {
        require: true,
        getJSON: true,
        args: true,
        url: true,
        url1: true,
        url2: true
      }
    },
    rules: {
      'import/unambiguous': 0,
      'import/no-commonjs': 0,
      'no-console': 0,
      'no-shadow': ['error', {
        allow: ['getJSON']
      }],
      'n/no-unsupported-features/es-builtins': 0,
      'n/no-unsupported-features/es-syntax': 0,
      'n/no-missing-import': 0,
      'n/no-missing-require': 0,
      'promise/prefer-await-to-callbacks': 0,
      'padded-blocks': 0,
      'import/no-unresolved': 0,
      'promise/catch-or-return': 0,
      'promise/always-return': 0,
      'handle-callback-err': 0,
      'no-unused-vars': ['error', {
        varsIgnorePattern: String.raw`getJSON|obj1|obj2|urlObj\d`,
        argsIgnorePattern: String.raw`data|obj\d|objsArr|err`,
        caughtErrorsIgnorePattern: 'err'
      }],
      'unicorn/prefer-top-level-await': 0
    }
  },
  {
    rules: {
      // Disable for now
      '@stylistic/max-len': 0,
      'eslint-comments/require-description': 0
    }
  }
];
