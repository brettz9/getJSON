'use strict';

module.exports = {
  // exclude: 'test/*/**',
  reporter: 'mocha-multi-reporters',
  'reporter-option': [
    'configFile=mocha-multi-reporters.json'
  ],
  require: [
    'test/bootstrap/node.js'
  ]
};
