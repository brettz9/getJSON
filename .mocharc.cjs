'use strict';

module.exports = {
  // exclude: 'test/*/**',
  reporter: 'cypress-multi-reporters',
  'reporter-option': [
    'configFile=mocha-multi-reporters.json'
  ],
  require: [
    'test/bootstrap/node.cjs'
  ]
};
