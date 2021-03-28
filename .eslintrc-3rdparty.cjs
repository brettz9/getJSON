'use strict';

module.exports = {
  parser: '@babel/eslint-parser',
  rules: {
    // Intrusive
    'no-global-assign': ['error'],

    // Vulnerable
    'no-eval': ['error']
  }
};
