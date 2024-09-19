// @ts-expect-error Awaiting
import {parser} from '@babel/eslint-parser';

export default [
  {
    languageOptions: {
      parser
    },
    rules: {
      // Intrusive
      'no-global-assign': ['error'],

      // Vulnerable
      'no-eval': ['error']
    }
  }
];
