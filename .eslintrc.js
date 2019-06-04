module.exports = {
  "extends": "ash-nazg/sauron-node",
  "parserOptions": {
    "sourceType": "module",
    "ecmaVersion": "2017"
  },
  "parser": "babel-eslint",
  "settings": {
  "polyfills": [
    "Array.from",
    "Array.isArray",
    "console",
    "document.body",
    "fetch",
    "Promise",
    "Promise.all"
  ],
  "coverage": true
  },
  "env": {
    // Set both to false to avoid assuming globals
    "node": false,
    "browser": false
  },
  "overrides": [
    {
      "files": ["tests/test*.js"],
      "globals": {
        "getJSON": true
      },
      "rules": {
        "no-console": "off"
      }
    },
    {
      files: ["**/*.md"],
      rules: {
        "eol-last": ["off"],
        "no-console": ["off"],
        "no-undef": ["off"],
        "no-unused-vars": ["warn"],
        "padded-blocks": ["off"],
        "import/unambiguous": ["off"],
        "import/no-unresolved": ["off"],
        "node/no-missing-import": ["off"],
        "no-multi-spaces": "off",
        "promise/prefer-await-to-callbacks": "off",
        "node/no-unsupported-features/es-syntax": "off",
        "no-unused-vars": ["error", {varsIgnorePattern: "getJSON|optionallyKeepPromiseGoingWithAnotherPromise"}],
        // Disable until may fix https://github.com/gajus/eslint-plugin-jsdoc/issues/211
        "indent": "off"
      }
    }
  ],
  "rules": {
  }
};
